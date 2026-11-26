#!/usr/bin/env node
/**
 * TikTok & TikTok Shop MCP Server v2.1.0 (Apify Cloud Powered)
 * ============================================================================
 * Standard JSON-RPC 2.0 over stdio MCP Server for:
 *   - Google Antigravity IDE, OpenAI Codex CLI, Claude Desktop, Cursor & Windsurf
 *   - Official MCP Registry, Glama.ai, Smithery.ai & M8ven Index
 *
 * Powered by JiStudio on Apify Store:
 *   - https://apify.com/jistudio/tiktok-shop-scraper
 *   - https://apify.com/jistudio/tiktok-transcript-scraper
 *   - https://apify.com/jistudio/tiktok-trends-scraper
 */

const https = require("https");
const readline = require("readline");

const APIFY_ACTOR_SLUG = "jistudio~tiktok-shop-scraper";
const APIFY_STORE_URL = "https://apify.com/jistudio/tiktok-shop-scraper";
const APIFY_TRANSCRIPT_URL = "https://apify.com/jistudio/tiktok-transcript-scraper";
const APIFY_TRENDS_URL = "https://apify.com/jistudio/tiktok-trends-scraper";
const APIFY_PORTFOLIO_URL = "https://apify.com/jistudio";
const APIFY_TOKEN_URL = "https://console.apify.com/account/integrations";
const APIFY_TOKEN = (process.env.APIFY_TOKEN || process.env.APIFY_API_TOKEN || "").trim();

function callApifyActor(actorSlug, inputObj = {}, customToken = "") {
  const token = (customToken || APIFY_TOKEN || "").trim();
  if (!token || token.startsWith("YOUR_")) {
    return Promise.resolve({
      ok: true,
      setup_required: true,
      notice: "APIFY_TOKEN not configured — set APIFY_TOKEN to execute live TikTok & TikTok Shop cloud runs.",
      run_no_code_on_apify_store: APIFY_STORE_URL,
      get_free_apify_token: APIFY_TOKEN_URL,
      actor: actorSlug.replace("~", "/"),
      sample_input: inputObj,
      hosted_mcp_url: "https://mcp.apify.com/?actors=jistudio/tiktok-shop-scraper",
      sister_actors: {
        tiktok_shop_scraper: APIFY_STORE_URL,
        tiktok_transcript_scraper: APIFY_TRANSCRIPT_URL,
        tiktok_trends_scraper: APIFY_TRENDS_URL,
        all_jistudio_actors: APIFY_PORTFOLIO_URL,
      },
    });
  }

  const bodyBuf = Buffer.from(JSON.stringify(inputObj), "utf-8");
  const path = `/v2/acts/${encodeURIComponent(actorSlug)}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}&clean=true&format=json`;

  return new Promise((resolve) => {
    const req = https.request(
      {
        hostname: "api.apify.com",
        port: 443,
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Length": bodyBuf.length,
          Accept: "application/json",
          "User-Agent": "TikTok-Shop-MCP-Server/2.1.0",
        },
      },
      (res) => {
        let raw = "";
        res.on("data", (c) => (raw += c));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(raw);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve({
                ok: true,
                actor: actorSlug.replace("~", "/"),
                count: Array.isArray(parsed) ? parsed.length : 1,
                items: Array.isArray(parsed) ? parsed : [parsed],
              });
            } else {
              resolve({
                ok: false,
                http_status: res.statusCode,
                error: (parsed && parsed.error && parsed.error.message) || "Apify Actor call failed",
                apify_store_url: APIFY_STORE_URL,
              });
            }
          } catch {
            resolve({
              ok: false,
              http_status: res.statusCode,
              error: "Invalid JSON returned from Apify API",
            });
          }
        });
      }
    );
    req.on("error", (err) => resolve({ ok: false, error: err.message }));
    req.setTimeout(90000, () => {
      req.destroy();
      resolve({ ok: false, error: "Apify Actor request timed out after 90s" });
    });
    req.write(bodyBuf);
    req.end();
  });
}

// ============================================================================
// 1. OFFLINE / ZERO-KEY BUILT-IN TOOLS (100% Free & Instant)
// ============================================================================
function decodeSnowflakeOffline(idStr) {
  const clean = String(idStr || "").trim();
  if (!/^\d{15,21}$/.test(clean)) {
    return { ok: false, error: "Provide a valid 15-21 digit 64-bit Snowflake ID" };
  }
  const big = BigInt(clean);
  const unixSec = Number(big >> 32n);
  const low32 = Number(big & 0xffffffffn);
  const millisSub = (low32 >>> 22) & 0x3ff;
  const workerId = (low32 >>> 12) & 0x3ff;
  const sequence = low32 & 0xfff;
  const isoUtc = new Date(unixSec * 1000).toISOString();
  const ageDays = Math.round(((Date.now() / 1000 - unixSec) / 86400) * 10) / 10;

  return {
    ok: true,
    mode: "offline_free",
    id: clean,
    unix_timestamp_sec: unixSec,
    created_at_utc: isoUtc,
    age_days: ageDays,
    bit_forensics: {
      sub_millisecond_bits: millisSub,
      datacenter_worker_shard: workerId,
      sequence_counter: sequence,
    },
    apify_store_url: APIFY_STORE_URL,
  };
}

function buildShopDeeplinkOffline(productId, sellerId = "", region = "VN") {
  const pid = String(productId || "").replace(/\D/g, "");
  const sid = String(sellerId || "").replace(/\D/g, "");
  const reg = String(region || "VN").toUpperCase();
  if (!pid) return { ok: false, error: "Provide a numeric TikTok Shop product_id" };

  const customParams = encodeURIComponent(JSON.stringify({ custom_id_type: 0, decorate_insert_items: [pid] }));
  return {
    ok: true,
    mode: "offline_free",
    product_id: pid,
    seller_id: sid || null,
    region: reg,
    deeplinks: {
      universal_web_pdp: `https://shop.tiktok.com/view/product/${pid}?region=${reg}`,
      direct_sku_picker_popup: `aweme://ec/sku?product_id=${pid}&url_maker=shop_schema_sdk`,
      one_click_order_submit: `aweme://ec/order_submit_v2?product_id=${pid}&url_maker=shop_schema_sdk`,
      storefront_pin_product_top1: sid
        ? `aweme://ec/store?custom_params=${customParams}&sellerId=${sid}&store_page_version=3&url_maker=shop_schema_sdk`
        : null,
      video_cart_anchor_payload: {
        type: 35,
        keyword: "Shop Now",
        product_id: pid,
      },
    },
    apify_store_url: APIFY_STORE_URL,
  };
}

function analyzeHookAndBeatsOffline(scriptText, durationSec = 15, bpm = 128) {
  const text = String(scriptText || "").trim();
  if (!text) return { ok: false, error: "Provide script_text to analyze" };
  const words = text.split(/\s+/).filter(Boolean);
  const firstTen = words.slice(0, 10).join(" ").toLowerCase();
  let score = 50;
  const triggers = [];
  if (/\b(stop|wait|don't|never|secret|hack|mistake|truth|warning|free)\b/i.test(firstTen)) {
    score += 18;
    triggers.push("Pattern-interrupt opening word");
  }
  if (/\d+/.test(firstTen)) {
    score += 12;
    triggers.push("Specific number / listicle framing");
  }
  if (text.includes("?")) {
    score += 10;
    triggers.push("Open curiosity loop (question)");
  }
  if (words.length >= 10 && words.length <= 80) {
    score += 10;
    triggers.push("Optimal short-form pacing length");
  }
  score = Math.min(100, score);

  const beatInterval = 60 / Math.max(60, Math.min(200, Number(bpm) || 128));
  const dur = Math.max(5, Math.min(180, Number(durationSec) || 15));
  const cuts = [];
  for (let t = 0; t <= dur; t += beatInterval * 4) {
    cuts.push(Number(t.toFixed(2)));
  }

  return {
    ok: true,
    mode: "offline_free",
    hook_score_out_of_100: score,
    word_count: words.length,
    detected_retention_triggers: triggers,
    bpm: Number(bpm) || 128,
    scene_cut_timestamps_sec: cuts,
    apify_store_url: APIFY_STORE_URL,
  };
}

// ============================================================================
// 2. MCP TOOL DEFINITIONS (15 Tools with MCP 2025/2026 Behavioral Annotations)
// ============================================================================
const RO_ANNOT = (title, openWorld = true) => ({
  title,
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: openWorld,
});

const TOOLS = [
  {
    name: "decode_tiktok_snowflake",
    description: "FREE offline tool: decode any 64-bit TikTok Video, User, Seller, or Live Room ID into its exact UTC creation timestamp and shard metadata.",
    annotations: RO_ANNOT("Decode TikTok 64-bit Snowflake ID", false),
    inputSchema: {
      type: "object",
      properties: { id: { type: "string", description: "15-21 digit numeric TikTok ID" } },
      required: ["id"],
    },
  },
  {
    name: "build_tiktok_shop_deeplink",
    description: "FREE offline tool: build TikTok Shop web PDP, direct SKU picker, storefront top-1 pin, and cart anchor links.",
    annotations: RO_ANNOT("Build TikTok Shop Deep-Links", false),
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "string", description: "19-digit TikTok Shop Product ID" },
        seller_id: { type: "string", description: "Optional Seller ID" },
        region: { type: "string", description: "2-letter ISO country code (VN, US, GB, TH, ID)", default: "VN" },
      },
      required: ["product_id"],
    },
  },
  {
    name: "analyze_short_video_hook_and_beats",
    description: "FREE offline tool: score a short-form video hook (0-100) for retention triggers and compute BPM-synced scene cut timestamps.",
    annotations: RO_ANNOT("Analyze Video Hook & BPM Cuts", false),
    inputSchema: {
      type: "object",
      properties: {
        script_text: { type: "string", description: "Opening voiceover script or caption" },
        video_duration_sec: { type: "number", default: 15 },
        bpm: { type: "number", default: 128 },
      },
      required: ["script_text"],
    },
  },
  {
    name: "get_tiktok_video_intelligence",
    description: "Extract no-watermark HD MP4 URL, engagement metrics, creator info, music metadata, and pinned TikTok Shop products via Apify Cloud (jistudio/tiktok-shop-scraper).",
    annotations: RO_ANNOT("Get TikTok Video Intelligence"),
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "TikTok video URL or 19-digit ID" },
        region: { type: "string", default: "VN" },
      },
      required: ["url"],
    },
  },
  {
    name: "get_tiktok_creator_profile_and_analytics",
    description: "Fetch TikTok creator profile, follower/like stats, bio details, and recent posts via Apify Cloud.",
    annotations: RO_ANNOT("Get TikTok Creator Profile"),
    inputSchema: {
      type: "object",
      properties: {
        username: { type: "string", description: "Creator handle without @" },
        region: { type: "string", default: "VN" },
        include_feed: { type: "boolean", default: false },
        max_items: { type: "integer", default: 10 },
      },
      required: ["username"],
    },
  },
  {
    name: "get_tiktok_video_comments_and_replies",
    description: "Extract top viewer comments, likes, commenter handles, and timestamps from any TikTok video via Apify Cloud.",
    annotations: RO_ANNOT("Get TikTok Video Comments"),
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "TikTok video URL or ID" },
        max_items: { type: "integer", default: 20 },
        region: { type: "string", default: "VN" },
      },
      required: ["url"],
    },
  },
  {
    name: "get_tiktok_trending_and_search",
    description: "Fetch regional TikTok trending / For-You viral videos or national hot search keywords via Apify Cloud (jistudio/tiktok-trends-scraper).",
    annotations: RO_ANNOT("Get Regional TikTok Trends"),
    inputSchema: {
      type: "object",
      properties: {
        mode: { type: "string", enum: ["trending_feed", "national_keywords"], default: "trending_feed" },
        region: { type: "string", default: "VN" },
        max_items: { type: "integer", default: 20 },
      },
    },
  },
  {
    name: "get_tiktok_shop_product_and_seller",
    description: "Extract TikTok Shop product detail: SKUs, stock, prices, image gallery, descriptions, and seller rating via Apify Cloud (jistudio/tiktok-shop-scraper).",
    annotations: RO_ANNOT("Get TikTok Shop Product Detail"),
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "TikTok Shop Product URL, vt.tiktok.com shortlink, or 19-digit Product ID" },
        region: { type: "string", default: "VN" },
      },
      required: ["url"],
    },
  },
  {
    name: "get_tiktok_transcript_and_translate",
    description: "Extract voiceover transcripts (WebVTT + plain text) or translate captions via Apify Cloud (jistudio/tiktok-transcript-scraper).",
    annotations: RO_ANNOT("Extract TikTok Transcript / Translate"),
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "TikTok video URL or ID" },
        mode: { type: "string", enum: ["whisper_transcript", "caption_genz_translator"], default: "whisper_transcript" },
        target_language: { type: "string", default: "en" },
        region: { type: "string", default: "VN" },
      },
      required: ["url"],
    },
  },
  {
    name: "get_tiktok_commercial_music_chart",
    description: "Fetch official regional TikTok trending music chart (Top 30 tracks & sound metadata) via Apify Cloud.",
    annotations: RO_ANNOT("Get TikTok Trending Music Chart"),
    inputSchema: {
      type: "object",
      properties: {
        region: { type: "string", default: "VN" },
        max_items: { type: "integer", default: 20 },
      },
    },
  },
  {
    name: "get_tiktok_live_room_intelligence",
    description: "Monitor a TikTok creator's Live Shopping room: pinned products, stream metadata, and viewer counts via Apify Cloud.",
    annotations: RO_ANNOT("Get TikTok Live Shopping Room"),
    inputSchema: {
      type: "object",
      properties: {
        username: { type: "string", description: "Creator username without @" },
        region: { type: "string", default: "VN" },
      },
      required: ["username"],
    },
  },
  {
    name: "search_tiktok_videos_by_keyword",
    description: "Search TikTok videos or TikTok Shop products by keyword across 22+ countries via Apify Cloud.",
    annotations: RO_ANNOT("Search TikTok Videos by Keyword"),
    inputSchema: {
      type: "object",
      properties: {
        keyword: { type: "string", description: "Search keyword" },
        mode: { type: "string", enum: ["search_videos", "shop_search"], default: "search_videos" },
        region: { type: "string", default: "VN" },
        max_items: { type: "integer", default: 15 },
      },
      required: ["keyword"],
    },
  },
  {
    name: "get_tiktok_shop_video_factory_pack",
    description: "Generate a complete AI review video production pack (studio product images, structured script blocks, music & cart anchor) for a TikTok Shop product via Apify Cloud.",
    annotations: RO_ANNOT("Get TikTok Shop AI Video Pack"),
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "TikTok Shop product URL or 19-digit ID" },
        region: { type: "string", default: "VN" },
      },
      required: ["url"],
    },
  },
  {
    name: "harvest_kol_shop_affiliate_products",
    description: "Scan a KOL/creator's recent videos to harvest promoted TikTok Shop affiliate products and transcripts via Apify Cloud.",
    annotations: RO_ANNOT("Harvest KOL Affiliate Shop Products"),
    inputSchema: {
      type: "object",
      properties: {
        username: { type: "string", description: "Creator handle without @" },
        region: { type: "string", default: "VN" },
        max_items: { type: "integer", default: 10 },
      },
      required: ["username"],
    },
  },
  {
    name: "audit_tiktok_video_algorithm_vqscore",
    description: "Audit a TikTok video's quality score (VQScore), audio loudness, viral velocity, and export recommendations via Apify Cloud.",
    annotations: RO_ANNOT("Audit TikTok Video VQScore"),
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "TikTok video URL or ID" },
        region: { type: "string", default: "VN" },
      },
      required: ["url"],
    },
  },
];

async function executeTool(name, args = {}) {
  const country = String(args.region || args.country || "VN").toUpperCase();
  const maxItems = Math.max(1, Math.min(Number(args.max_items || args.count || args.limit || 10), 100));

  switch (name) {
    case "decode_tiktok_snowflake":
      return decodeSnowflakeOffline(args.id);
    case "build_tiktok_shop_deeplink":
      return buildShopDeeplinkOffline(args.product_id, args.seller_id, country);
    case "analyze_short_video_hook_and_beats":
      return analyzeHookAndBeatsOffline(args.script_text, args.video_duration_sec, args.bpm);

    case "get_tiktok_video_intelligence":
      return callApifyActor(APIFY_ACTOR_SLUG, { action: "video_no_watermark", videoUrlOrId: args.url, country, maxItems: 1 });
    case "get_tiktok_creator_profile_and_analytics":
      return callApifyActor(APIFY_ACTOR_SLUG, {
        action: args.include_feed ? "creator_feed" : "user_profile",
        username: String(args.username || "").replace(/^@/, ""),
        country,
        maxItems,
      });
    case "get_tiktok_video_comments_and_replies":
      return callApifyActor(APIFY_ACTOR_SLUG, { action: "video_comments", videoUrlOrId: args.url, country, maxItems });
    case "get_tiktok_trending_and_search":
      return callApifyActor(
        args.mode === "national_keywords" ? APIFY_ACTOR_SLUG : "jistudio~tiktok-trends-scraper",
        { action: args.mode === "national_keywords" ? "national_keywords" : "trending_feed", country, maxItems }
      );
    case "get_tiktok_shop_product_and_seller":
      return callApifyActor(APIFY_ACTOR_SLUG, { action: "shop_product_detail", productId: args.url, country, maxItems: 1 });
    case "get_tiktok_transcript_and_translate":
      return callApifyActor(
        args.mode === "caption_genz_translator" ? APIFY_ACTOR_SLUG : "jistudio~tiktok-transcript-scraper",
        {
          action: args.mode === "caption_genz_translator" ? "caption_genz_translator" : "whisper_transcript",
          videoUrlOrId: args.url,
          targetLanguage: args.target_language || "en",
          country,
          maxItems: 1,
        }
      );
    case "get_tiktok_commercial_music_chart":
      return callApifyActor(APIFY_ACTOR_SLUG, { action: "music_chart", country, maxItems });
    case "get_tiktok_live_room_intelligence":
      return callApifyActor(APIFY_ACTOR_SLUG, {
        action: "live_shopping_spy",
        username: String(args.username || "").replace(/^@/, ""),
        country,
        maxItems: 10,
      });
    case "search_tiktok_videos_by_keyword":
      return callApifyActor(APIFY_ACTOR_SLUG, {
        action: args.mode === "shop_search" ? "shop_search" : "search_videos",
        keyword: String(args.keyword || "").trim(),
        country,
        maxItems,
      });
    case "get_tiktok_shop_video_factory_pack":
      return callApifyActor(APIFY_ACTOR_SLUG, { action: "shop_video_factory_pack", productId: args.url, country, maxItems: 1 });
    case "harvest_kol_shop_affiliate_products":
      return callApifyActor(APIFY_ACTOR_SLUG, {
        action: "kol_shop_harvester",
        username: String(args.username || "").replace(/^@/, ""),
        country,
        maxItems,
      });
    case "audit_tiktok_video_algorithm_vqscore":
      return callApifyActor(APIFY_ACTOR_SLUG, { action: "viral_algorithm_audit", videoUrlOrId: args.url, country, maxItems: 1 });
    default:
      return { ok: false, error: `Unknown tool: ${name}` };
  }
}

const RESOURCES = [
  {
    uri: "tiktok://docs/apify-quickstart",
    name: "Apify Cloud Quickstart (jistudio/tiktok-shop-scraper)",
    mimeType: "text/markdown",
    description: "How to get a free Apify API token and run all 16 TikTok & TikTok Shop extraction modes on Apify Cloud",
  },
  {
    uri: "tiktok://docs/algorithm-vqscore-guide",
    name: "Short-Form Video Quality (VQScore), Loudness & Export Guide",
    mimeType: "text/markdown",
    description: "Practical encoding parameters (1080p, 30fps, -10 LUFS) for high-quality short-form uploads",
  },
  {
    uri: "tiktok://docs/deeplink-schemas",
    name: "TikTok Shop Conversion Deep-Link Reference",
    mimeType: "text/markdown",
    description: "URL patterns for web PDP, SKU picker, storefront pin, and video cart anchors",
  },
];

const PROMPTS = [
  {
    name: "analyze_tiktok_viral_product",
    description: "Analyze a TikTok video or TikTok Shop product for viral hooks, VQScore, comments, and transcripts",
    arguments: [{ name: "url", description: "TikTok video or TikTok Shop product URL", required: true }],
  },
  {
    name: "audit_creator_sponsorship_rate",
    description: "Audit a TikTok creator's engagement metrics, recent posts, and promoted affiliate products",
    arguments: [{ name: "username", description: "TikTok creator username without @", required: true }],
  },
  {
    name: "generate_beat_synced_video_script",
    description: "Pull trending music chart data and build a 3-second curiosity hook with BPM-synced scene cuts",
    arguments: [
      { name: "product_keyword", description: "Product niche or keyword", required: true },
      { name: "region", description: "Target country code (VN, US, ID, TH, BR)", required: false },
    ],
  },
  {
    name: "spy_competitor_tiktok_shop",
    description: "Teardown a competitor TikTok Shop product URL including SKUs, pricing, seller stats, and deep-links",
    arguments: [{ name: "url", description: "TikTok Shop product URL or shortlink", required: true }],
  },
];

function sendResponse(id, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result }) + "\n");
}

function sendError(id, code, message) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } }) + "\n");
}

const rl = readline.createInterface({ input: process.stdin, terminal: false });

rl.on("line", async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  let msg;
  try {
    msg = JSON.parse(trimmed);
  } catch {
    return;
  }
  const { id, method, params } = msg;

  try {
    if (method === "initialize") {
      sendResponse(id, {
        protocolVersion: (params && params.protocolVersion) || "2024-11-05",
        capabilities: {
          tools: { listChanged: false },
          resources: { listChanged: false },
          prompts: { listChanged: false },
        },
        serverInfo: { name: "tiktok-shop-mcp-server", version: "2.1.0" },
      });
    } else if (method === "notifications/initialized") {
      // no-op
    } else if (method === "ping") {
      sendResponse(id, {});
    } else if (method === "tools/list") {
      sendResponse(id, { tools: TOOLS });
    } else if (method === "resources/list") {
      sendResponse(id, { resources: RESOURCES });
    } else if (method === "resources/read") {
      const uri = (params && params.uri) || "tiktok://docs/apify-quickstart";
      let text = "";
      if (uri === "tiktok://docs/algorithm-vqscore-guide") {
        text = [
          "# Short-Form Video Quality & Encoding Guide",
          "- Target 1080x1920, 30fps, H.264 High Profile under 11 Mbps bitrate to avoid heavy re-encoding.",
          "- Normalize voiceover loudness around -10 to -12 LUFS (-1.0 dB True Peak).",
          "- Recommended FFmpeg command: `ffmpeg -r 30 -i input.mp4 -c:v libx264 -crf 18 -maxrate 11000k -bufsize 15000k -g 120 -pix_fmt yuv420p -af loudnorm=I=-10:TP=-1.0:LRA=7 output.mp4`",
        ].join("\n");
      } else if (uri === "tiktok://docs/deeplink-schemas") {
        text = [
          "# TikTok Shop Conversion Deep-Links",
          "- Web PDP: `https://shop.tiktok.com/view/product/<PRODUCT_ID>?region=VN`",
          "- SKU Picker: `aweme://ec/sku?product_id=<PRODUCT_ID>&url_maker=shop_schema_sdk`",
          "- Storefront Top-1 Pin: `aweme://ec/store?custom_params={\"custom_id_type\":0,\"decorate_insert_items\":[\"<PRODUCT_ID>\"]}&sellerId=<SELLER_ID>&store_page_version=3&url_maker=shop_schema_sdk`",
        ].join("\n");
      } else {
        text = [
          "# TikTok & TikTok Shop MCP Server v2.1.0 (Apify Cloud)",
          `- Run No-Code on Apify Store: ${APIFY_STORE_URL}`,
          `- Hosted Remote MCP Server: https://mcp.apify.com/?actors=jistudio/tiktok-shop-scraper`,
          `- Get your free Apify API Token: ${APIFY_TOKEN_URL}`,
          `- Browse all JiStudio Actors: ${APIFY_PORTFOLIO_URL}`,
        ].join("\n");
      }
      sendResponse(id, { contents: [{ uri, mimeType: "text/markdown", text }] });
    } else if (method === "prompts/list") {
      sendResponse(id, { prompts: PROMPTS });
    } else if (method === "prompts/get") {
      const pName = (params && params.name) || "analyze_tiktok_viral_product";
      const pArgs = (params && params.arguments) || {};
      let userInstruction = `Analyze TikTok URL "${pArgs.url || "https://www.tiktok.com/@hasaki.vn/video/7708707570608835861"}" using get_tiktok_video_intelligence and get_tiktok_transcript_and_translate.`;
      if (pName === "audit_creator_sponsorship_rate") {
        userInstruction = `Audit TikTok creator @${pArgs.username || "hasaki.vn"} using get_tiktok_creator_profile_and_analytics and harvest_kol_shop_affiliate_products.`;
      } else if (pName === "generate_beat_synced_video_script") {
        userInstruction = `Fetch trending music for "${pArgs.product_keyword || "skincare"}" in ${pArgs.region || "VN"} via get_tiktok_commercial_music_chart, then score the hook via analyze_short_video_hook_and_beats.`;
      } else if (pName === "spy_competitor_tiktok_shop") {
        userInstruction = `Teardown TikTok Shop product "${pArgs.url || "https://vt.tiktok.com/ZS9fE6SehCja8-NGCg0/"}" using get_tiktok_shop_product_and_seller and build_tiktok_shop_deeplink.`;
      }
      sendResponse(id, {
        description: `Workflow prompt: ${pName}`,
        messages: [{ role: "user", content: { type: "text", text: userInstruction } }],
      });
    } else if (method === "tools/call") {
      const resData = await executeTool(params && params.name, (params && params.arguments) || {});
      sendResponse(id, {
        content: [{ type: "text", text: JSON.stringify(resData, null, 2) }],
        isError: Boolean(resData && resData.ok === false && !resData.setup_required),
      });
    } else if (id !== undefined) {
      sendError(id, -32601, `Method not found: ${method}`);
    }
  } catch (err) {
    if (id !== undefined) {
      sendError(id, -32603, err.message || "Internal error");
    }
  }
});
