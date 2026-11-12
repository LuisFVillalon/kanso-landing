// Turns a clip take (rec.mjs clip …) into the landing page's video files.
//
//   node encode.mjs <takeDir> <out-basename> [outWidth=1600] [crf=36]
//
// writes <out-basename>.webm (VP9) and, when the ffmpeg build has libx264, <out-basename>.mp4
// (H.264 fallback for browsers without VP9), both at a constant 30 fps, muted.
// START / END (seconds) trim the take; CROP=w:h:x:y crops in source pixels first.
//
// FFMPEG picks the binary: by default `ffmpeg-static` if it's installed here (npm i ffmpeg-static),
// else `ffmpeg` on the PATH. Playwright's bundled ffmpeg only reads piped images and has no H.264
// or JPEG encoder: it can make the WebM, not the MP4. The poster is the slot's still (rec.mjs still).
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { spawn, spawnSync } from 'node:child_process';

const [dir, outBase, OW = '1600', CRF = '36'] = process.argv.slice(2);
if (!dir || !outBase) { console.error('usage: node encode.mjs <takeDir> <out-basename> [outWidth] [crf]'); process.exit(2); }
const FF = process.env.FFMPEG || (() => { try { return createRequire(import.meta.url)('ffmpeg-static'); } catch { return 'ffmpeg'; } })();

const { fps, frames, endT } = JSON.parse(fs.readFileSync(path.join(dir, 'frames.json'), 'utf8'));
// Resample the uneven capture to a constant frame rate: each output frame shows the newest capture.
const seq = [];
const t0 = frames[0].t + Number(process.env.START || 0);
const t1 = process.env.END ? frames[0].t + Number(process.env.END) : Math.max(frames.at(-1).t + 0.5, endT || 0);
let j = 0;
for (let t = t0; t <= t1; t += 1 / fps) { while (j + 1 < frames.length && frames[j + 1].t <= t) j++; seq.push(frames[j].f); }

const vf = `${process.env.CROP ? `crop=${process.env.CROP},` : ''}scale=${OW}:-2:flags=lanczos,format=yuv420p`;
async function encode(out, codecArgs) {
  const ff = spawn(FF, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(fps), '-i', 'pipe:0', '-vf', vf, ...codecArgs, '-an', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (const f of seq) { if (!ff.stdin.write(fs.readFileSync(f))) await new Promise(r => ff.stdin.once('drain', r)); }
  ff.stdin.end();
  const code = await new Promise(r => ff.on('close', r));
  if (code !== 0) throw new Error(`ffmpeg exited ${code} for ${out}`);
  console.log(path.basename(out), (fs.statSync(out).size / 1024).toFixed(0) + ' KB', seq.length + ' frames', (seq.length / fps).toFixed(1) + ' s');
}

await encode(`${outBase}.webm`, ['-c:v', 'libvpx-vp9', '-crf', CRF, '-b:v', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', '-g', '120']);
const encoders = spawnSync(FF, ['-hide_banner', '-encoders'], { encoding: 'utf8' }).stdout || '';
if (/libx264/.test(encoders)) await encode(`${outBase}.mp4`, ['-c:v', 'libx264', '-crf', '28', '-preset', 'slow', '-profile:v', 'high', '-movflags', '+faststart', '-g', '120']);
else console.log(`no libx264 in ${FF}: skipped the MP4 (install ffmpeg-static or set FFMPEG)`);
