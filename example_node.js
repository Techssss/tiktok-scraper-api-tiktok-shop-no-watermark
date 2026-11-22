/**
 * TikTok & TikTok Shop (OEC) Global Multi-Country API — Node.js Example (35 Endpoints)
 * Subscribe at: https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video
 */

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "YOUR_RAPIDAPI_KEY";
const RAPIDAPI_HOST = "tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com";
const BASE_URL = `https://${RAPIDAPI_HOST}`;

async function callTikTokApi(endpoint, params = {}) {
  const qs = new URLSearchParams(params).toString();
  const url = `${BASE_URL}${endpoint}${qs ? `?${qs}` : ""}`;
  const resp = await fetch(url, {
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": RAPIDAPI_HOST,
    },
  });
  return resp.json();
}

async function demo() {
  console.log("1. Fetching TikTok Shop PDP (SKUs, Stock, 14+ Studio origin-jpeg Images & 34 Copywriting Blocks)...");
  const pdp = await callTikTokApi("/api/v1/tiktok/shop-product", {
    url: "https://vt.tiktok.com/ZS9fE6SehCja8-NGCg0/",
  });
  console.log(pdp);

  console.log("2. Translating Video WEBVTT Subtitles in 0.11s...");
  const sub = await callTikTokApi("/api/v1/tiktok/translate-subtitle", {
    url: "https://www.tiktok.com/@hasaki.vn/video/7708707570608835861",
    target_lang: "en",
  });
  console.log(sub);
}

demo().catch(console.error);
