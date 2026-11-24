/**
 * TikTok & TikTok Shop (OEC) Global Multi-Country API — Node.js Example (43 Endpoints)
 * - Get FREE Production API Key: https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video
 * - Run Bulk on Apify Store:     https://apify.com/nghianguyen2/tiktok-shop-scraper-no-watermark-video-transcript
 */

const RAPIDAPI_KEY = (process.env.RAPIDAPI_KEY || "").trim();
const IS_TRIAL = !RAPIDAPI_KEY || RAPIDAPI_KEY.startsWith("YOUR_");
const RAPIDAPI_HOST = "tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com";
const BASE_URL = `https://${RAPIDAPI_HOST}`;

const RAPIDAPI_URL = "https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video";
const APIFY_URL = "https://apify.com/nghianguyen2/tiktok-shop-scraper-no-watermark-video-transcript";

async function callTikTokApi(endpoint, params = {}) {
  if (IS_TRIAL) {
    const targetUrl = params.url || "https://www.tiktok.com/@hasaki.vn/video/7708707570608835861";
    const resp = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(targetUrl)}&hd=1`);
    const json = await resp.json();
    const d = json.data || {};
    return {
      ok: true,
      _trial_notice: `⚡ FREE DEMO PREVIEW (1 item) — Get your FREE Production Key for all 43 TikTok Shop & Whisper VTT endpoints at ${RAPIDAPI_URL} or run on Apify: ${APIFY_URL}`,
      data: {
        video_id: d.id,
        title: d.title,
        author: d.author?.unique_id,
        views: d.play_count,
        likes: d.digg_count,
        no_watermark_hd_mp4: d.hdplay || d.play,
        audio_mp3: d.music,
      },
    };
  }
  const qs = new URLSearchParams(params).toString();
  const url = `${BASE_URL}${endpoint}${qs ? `?${qs}` : ""}`;
  const resp = await fetch(url, {
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": RAPIDAPI_HOST,
      Accept: "application/json",
    },
  });
  return resp.json();
}

async function demo() {
  console.log("=".repeat(78));
  console.log("🚀 TikTok & TikTok Shop (OEC) 43-Endpoint API — Live Zero-Config Demo");
  console.log(`🔑 Get FREE API Key (RapidAPI):   ${RAPIDAPI_URL}`);
  console.log(`🕷️ Run Bulk Scraper (Apify Store): ${APIFY_URL}`);
  console.log("=".repeat(78));

  console.log("\n1. Fetching Live No-Watermark 1080p MP4 & Engagement Metrics...");
  const video = await callTikTokApi("/api/v1/tiktok/video", {
    url: "https://www.tiktok.com/@hasaki.vn/video/7708707570608835861",
  });
  console.log(video);

  console.log(`\n✅ Live Demo Succeeded! Subscribe for FREE at ${RAPIDAPI_URL} to unlock all 43 endpoints.`);
}

demo().catch(console.error);
