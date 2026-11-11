// Generates public/og-image.png (1200×630), the social preview used by Open Graph / Twitter.
// Run: npm run og
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));
const W = 1200;
const H = 630;
const PAD = 80;
const font = (weight) => root(`public/fonts/Rubik/static/Rubik-${weight}.ttf`);

const text = (markup, weight, width) =>
	sharp({ text: { text: markup, font: 'Rubik', fontfile: font(weight), width, rgba: true, dpi: 72 } })
		.png()
		.toBuffer({ resolveWithObject: true });

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.8">
      <stop offset="0" stop-color="#6366f1" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#07080f" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" x2="1">
      <stop offset="0" stop-color="#6366f1"/><stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#07080f"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect x="${PAD}" y="${PAD + 40}" width="64" height="3" rx="1.5" fill="url(#rule)"/>
</svg>`);

const avatarSize = 380;
const avatar = await sharp(root('src/assets/images/avatar.png'))
	.resize(avatarSize, avatarSize, { fit: 'cover', position: 'top' })
	.composite([
		{
			input: Buffer.from(
				`<svg width="${avatarSize}" height="${avatarSize}"><circle cx="${avatarSize / 2}" cy="${avatarSize / 2}" r="${avatarSize / 2}"/></svg>`,
			),
			blend: 'dest-in',
		},
	])
	.png()
	.toBuffer();

const textWidth = W - PAD * 2 - avatarSize - 40;
const eyebrow = await text('<span foreground="#9aa0b4" size="22pt" letter_spacing="3000">WEB DEVELOPER · FOR GROWING BUSINESSES</span>', 'Medium', textWidth);
const headline = await text('<span foreground="#ffffff" size="68pt">Web development,\n<span foreground="#22d3ee">done right.</span></span>', 'SemiBold', textWidth);
const brand = await text('<span foreground="#ffffff" size="30pt">HustWeb</span>', 'Bold', textWidth);
const tagline = await text('<span foreground="#9aa0b4" size="22pt">Websites · AI &amp; automation · Integrations · Support</span>', 'Regular', textWidth);

await sharp(background)
	.composite([
		{ input: eyebrow.data, left: PAD, top: PAD },
		{ input: headline.data, left: PAD, top: PAD + 80 },
		{ input: brand.data, left: PAD, top: H - PAD - brand.info.height - tagline.info.height - 12 },
		{ input: tagline.data, left: PAD, top: H - PAD - tagline.info.height },
		{ input: avatar, left: W - PAD - avatarSize, top: Math.round((H - avatarSize) / 2) },
	])
	.png({ compressionLevel: 9 })
	.toFile(root('public/og-image.png'));

console.log('Wrote public/og-image.png');
