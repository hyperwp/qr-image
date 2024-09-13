#!/usr/bin/env node

import fs from 'node:fs';
import url from 'node:url';
import path from 'node:path';

import {qr_image, qr_image_sync} from '../lib/qr.js';

function file(name) {
    const dirname = path.dirname(url.fileURLToPath(import.meta.url));
    return fs.createWriteStream(dirname + '/' + name);
}

var text = 'I \u2764\uFE0F QR code!';
var text = 'https://yadi.sk/d/FuzPeEg-QyaZN?qr';
var ec_level = 'Q';

qr_image(text, { type: 'png', ec_level: ec_level, parse_url: false, margin: 1}).pipe(file('qr_f.png'));
qr_image(text, { type: 'png', ec_level: ec_level, parse_url: true,  margin: 1}).pipe(file('qr_t.png'));
qr_image(text, { type: 'svg', ec_level: ec_level}).pipe(file('qr.svg'));
qr_image(text, { type: 'eps', ec_level: ec_level}).pipe(file('qr.eps'));
qr_image(text, { type: 'pdf', ec_level: ec_level}).pipe(file('qr.pdf'));

fs.writeFileSync('qr_sync.png', qr_image_sync(text));
