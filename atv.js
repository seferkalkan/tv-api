export default async function handler(req, res) {
  const r = await fetch("https://www.atv.com.tr/canli-yayin", {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  const html = await r.text();

  const match = html.match(/https:\/\/trkvz\.daioncdn\.net\/.*?\.m3u8\?.*?/);

  if (!match) return res.status(500).send("Yok");

  const stream = await fetch(match[0], {
    headers: {
      "Referer": "https://www.atv.com.tr/",
      "Origin": "https://www.atv.com.tr"
    }
  });

  const body = await stream.text();

  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  res.send(body);
}
