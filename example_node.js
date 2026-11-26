/**
 * Node.js Example for JiStudio TikTok & TikTok Shop Scraper on Apify Store
 * Actor: https://apify.com/jistudio/tiktok-shop-scraper
 * Get free token: https://console.apify.com/account/integrations
 */

const APIFY_TOKEN = process.env.APIFY_TOKEN || "YOUR_APIFY_TOKEN";
const ACTOR_SLUG = "jistudio~tiktok-shop-scraper";

async function runActor(input) {
  const url = `https://api.apify.com/v2/acts/${ACTOR_SLUG}/run-sync-get-dataset-items?token=${encodeURIComponent(APIFY_TOKEN)}&clean=true`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

async function main() {
  const videos = await runActor({
    action: "search_videos",
    keyword: "skincare",
    country: "US",
    maxItems: 10,
  });
  console.log(`Fetched ${videos.length} TikTok videos:`, videos.slice(0, 2));
}

main().catch(console.error);
