import fs from 'node:fs';
import path from 'node:path';

function readIndexHtml() {
  const filePath = path.join(process.cwd(), 'index.html');
  return fs.readFileSync(filePath, 'utf8');
}

function extractBetween(source: string, startTag: string, endTag: string) {
  const start = source.indexOf(startTag);
  const end = source.indexOf(endTag);

  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`Could not find ${startTag} ... ${endTag} in index.html`);
  }

  return source.slice(start + startTag.length, end);
}

export function getSiteStyles() {
  const html = readIndexHtml();
  return extractBetween(html, '<style>', '</style>').trim();
}

export function getSiteBody() {
  const html = readIndexHtml();
  const body = extractBetween(html, '<body>', '</body>').trim();
  const bodyWithoutScript = body.replace(/<script[\s\S]*?<\/script>\s*$/i, '').trim();

  return bodyWithoutScript
    .replaceAll('src="logo.jpg"', 'src="/FL2.png"')
    .replaceAll("src='logo.jpg'", "src='/FL2.png'");
}
