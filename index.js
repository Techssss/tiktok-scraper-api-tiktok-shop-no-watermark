#!/usr/bin/env node
/**
 * TikTok, TikTok Shop & CapCut Creative Analytics MCP Server v2.0.0
 * ============================================================================
 * Standard JSON-RPC 2.0 over stdio MCP Server (and Streamable HTTP /mcp) for:
 *   - Google Antigravity IDE (mcp_config.json)
 *   - OpenAI Codex CLI (~/.codex/config.toml)
 *   - Claude Desktop & Claude Code
 *   - Cursor & Windsurf
 *   - Arcade.dev, Smithery.ai, Glama.ai & Official MCP Registry (server.json)
 *
 * Powered by:
 *   https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video
 *
 * Features in v2.0.0:
 *   - 15 MCP Tools with full MCP 2025/2026 Behavioral Annotations (title, readOnlyHint,
 *     destructiveHint, idempotentHint, openWorldHint) for zero-popup agent auto-execution
 *   - 3 Instant Offline / Zero-Key Tools (64-Bit Snowflake Forensics, 16 Native aweme://ec/
 *     Conversion DeepLinks + Storefront #1 Pinning, 3-Second Hook & BPM Beat Scorer)
 *   - 12 Global Cloud & CapCut 9e2c Engine Tools across 22+ Markets (40 Endpoints)
 *   - 4 Built-in AI Agent Workflow Prompts (prompts/list & prompts/get)
 *   - 3 Built-in Technical Knowledge Resources (resources/list & resources/read)
 */

const https = require("https");
const crypto = require("crypto");
const readline = require("readline");

const RAPIDAPI_HOST = "tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com";
const RAPIDAPI_URL = "https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || process.env.X_RAPIDAPI_KEY || "";

// ============================================================================
// 1. HELPER: HTTP GET TO RAPIDAPI GATEWAY + CAPCUT 9e2c DIRECT SIGNER
// ============================================================================
function callRapidApi(path, queryParams = {}, customKey = "") {
  const apiKey = (customKey || RAPIDAPI_KEY || "").trim();
  if (!apiKey) {
    return Promise.resolve({
      ok: false,
      setup_required: true,
      message:
        "RAPIDAPI_KEY is required for live global cloud queries across 22+ regions. " +
        "Get a FREE API key in 10 seconds at: " +
        RAPIDAPI_URL,
      get_free_api_key_url: RAPIDAPI_URL,
      requested_endpoint: path,
      requested_params: queryParams,
    });
  }

  const qs = Object.entries(queryParams)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");

  const fullPath = qs ? `${path}?${qs}` : path;

  return new Promise((resolve) => {
    const req = https.request(
      {
        hostname: RAPIDAPI_HOST,
        port: 443,
        path: fullPath,
        method: "GET",
        rejectUnauthorized: false,
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": RAPIDAPI_HOST,
          Accept: "application/json",
          "User-Agent": "TikTok-Shop-CapCut-MCP-Server/2.0.0",
        },
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(raw);
            resolve({ ...parsed, _http_status: res.statusCode });
          } catch {
            resolve({ ok: res.statusCode === 200, _http_status: res.statusCode, raw });
          }
        });
      }
    );
    req.on("error", (err) => resolve({ ok: false, error: err.message }));
    req.setTimeout(20000, () => {
      req.destroy();
      resolve({ ok: false, error: "Request timeout after 20000ms" });
    });
    req.end();
  });
}

// CapCut Overseas (com.lemon.lvoverseas v20.2.0) 9e2c MD5 Signer
function callCapCutSignedPost(hostname, urlPath, rawJsonBody, region = "VN") {
  const cleanPath = String(urlPath || "").split("?")[0];
  const tail7 = cleanPath.length > 7 ? cleanPath.slice(-7) : cleanPath;
  const dt = String(Math.floor(Date.now() / 1000));
  const tdid = "7348912049182739970";
  const rawSign = `9e2c|${tail7}|0|20.2.0|${dt}|${tdid}|11ac`;
  const sign = crypto.createHash("md5").update(rawSign).digest("hex").toLowerCase();
  const loc = String(region || "VN").toLowerCase();
  const lan = loc === "vn" ? "vi-VN" : "en-US";
  const bodyBuf = Buffer.from(rawJsonBody, "utf-8");

  return new Promise((resolve) => {
    const req = https.request(
      {
        hostname,
        port: 443,
        path: cleanPath,
        method: "POST",
        rejectUnauthorized: false,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 12; SM-A315G Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/119.0.6045.193 Mobile Safari/537.36",
          "Content-Type": "application/json; charset=utf-8",
          "Content-Length": bodyBuf.length,
          Accept: "application/json",
          lan,
          loc,
          pf: "0",
          vr: "31",
          appvr: "20.2.0",
          vc: "20201600",
          "device-time": dt,
          tdid,
          "sign-ver": "1",
          sign,
          "app-sdk-version": "195.0.0",
          appid: "359289",
          "header-content": `${tail7}|0|20.2.0|${dt}|${tdid}`,
          "host-abi": "64",
          "cc-newuser-channel": "common",
        },
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(raw));
          } catch {
            resolve(null);
          }
        });
      }
    );
    req.on("error", () => resolve(null));
    req.setTimeout(12000, () => {
      req.destroy();
      resolve(null);
    });
    req.write(bodyBuf);
    req.end();
  });
}

// ============================================================================
// 2. OFFLINE / ZERO-KEY BUILT-IN TOOLS (100% Free & Instant)
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
    mode: "offline_zero_key",
    snowflake_id: clean,
    unix_timestamp_sec: unixSec,
    created_at_utc: isoUtc,
    age_days: ageDays,
    bit_forensics: {
      subsecond_bits: millisSub,
      datacenter_worker_shard: workerId,
      sequence_counter: sequence,
    },
  };
}

function buildDeeplinksOffline(productId, sellerId = "", region = "US") {
  const pid = String(productId || "").trim();
  const sid = String(sellerId || "").trim();
  const reg = String(region || "US").toUpperCase();
  const appSchemeGlobal = ["VN", "ID", "TH", "MY", "PH", "SG", "JP", "KR", "TW"].includes(reg)
    ? "snssdk1180"
    : "snssdk1233";
  const customParams = encodeURIComponent(
    JSON.stringify({ custom_id_type: 0, decorate_insert_items: [pid] })
  );
  return {
    ok: true,
    mode: "offline_zero_key",
    region: reg,
    product_id: pid,
    seller_id: sid || null,
    deeplinks: {
      storefront_pin_product_top1: sid
        ? `aweme://ec/store?custom_params=${customParams}&sellerId=${sid}&store_page_version=3&url_maker=shop_schema_sdk`
        : null,
      native_pdp_scheme: `${appSchemeGlobal}://ec/pdp?product_id=${pid}&source_page_type=mcp_agent&url_maker=shop_schema_sdk`,
      direct_sku_picker_popup: `aweme://ec/sku?product_id=${pid}&url_maker=shop_schema_sdk`,
      one_click_order_submit_v2: `aweme://ec/order_submit_v2?product_id=${pid}&url_maker=shop_schema_sdk`,
      universal_web_pdp: `https://shop.tiktok.com/view/product/${pid}?region=${reg}`,
      in_app_webview: `${appSchemeGlobal}://webview?url=${encodeURIComponent(
        `https://shop.tiktok.com/view/product/${pid}?region=${reg}`
      )}`,
    },
  };
}

function analyzeHookAndBeatsOffline(scriptText, videoDurationSec = 15, bpm = 128) {
  const text = String(scriptText || "").trim();
  const words = text.split(/\s+/).filter(Boolean);
  const first8Words = words.slice(0, 8).join(" ");
  const hasNumber = /\d/.test(first8Words);
  const hasQuestion = /\?/.test(first8Words);
  const hasUrgency = /(secret|stop|never|why|how|hack|review|truth|best|mistake|warning)/i.test(first8Words);

  let score = 60;
  if (hasNumber) score += 12;
  if (hasQuestion) score += 10;
  if (hasUrgency) score += 15;
  if (words.length >= 6 && words.length <= 45) score += 3;
  score = Math.min(99, score);

  const beatInterval = Math.round((60 / Math.max(60, Math.min(220, Number(bpm) || 128))) * 1000) / 1000;
  const beatCuts = [];
  for (let t = beatInterval; t < Number(videoDurationSec || 15); t += beatInterval * 2) {
    beatCuts.push(Math.round(t * 1000) / 1000);
  }

  return {
    ok: true,
    mode: "offline_zero_key",
    hook_score_out_of_100: score,
    opening_3_second_hook: first8Words,
    diagnostics: {
      has_numeric_anchor: hasNumber,
      has_curiosity_question: hasQuestion,
      has_high_retention_trigger_word: hasUrgency,
      estimated_speaking_duration_sec: Math.round((words.length / 2.6) * 10) / 10,
    },
    auto_cut_beat_timeline_sec: beatCuts.slice(0, 16),
    upgrade_tip:
      "Use tool `get_tiktok_commercial_music_and_capcut_templates` or `get_capcut_template_draft_and_video` with RAPIDAPI_KEY to fetch real commercial audio tracks, StrongBeat onset arrays, and CapCut NLE draft templates.",
  };
}

// ============================================================================
// 3. MCP TOOL DEFINITIONS (15 TOOLS WITH MCP 2025/2026 ANNOTATIONS)
// ============================================================================
const roLocal = (title) => ({
  title,
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
});

const roOpen = (title) => ({
  title,
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: true,
});

const TOOLS = [
  {
    name: "decode_tiktok_snowflake",
    description:
      "[FREE OFFLINE - NO API KEY REQUIRED] Decode any 64-bit TikTok or CapCut Snowflake ID (Video, User, Comment, Live Room, Product, Template) into its exact UTC creation timestamp, age in days, and datacenter shard metadata.",
    annotations: roLocal("Decode TikTok/CapCut 64-Bit Snowflake Timestamp"),
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "64-bit TikTok or CapCut Snowflake ID (e.g. '7687152988393147656')",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "build_tiktok_shop_deeplink",
    description:
      "[FREE OFFLINE - NO API KEY REQUIRED] Generate native mobile app deep-links (aweme://ec/, snssdk1233://, snssdk1180://), Storefront #1 Product Pinning URLs (decorate_insert_items), and universal TikTok Shop product URLs for any of 22+ countries.",
    annotations: roLocal("Build TikTok Shop Native E-Commerce Deep-Links"),
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "string", description: "TikTok Shop Product ID (e.g. '1735171805700392934')" },
        seller_id: { type: "string", description: "Optional Seller ID" },
        region: { type: "string", description: "ISO-2 country code (US, UK, VN, ID, TH, BR, MY, PH, SG, JP)", default: "US" },
      },
      required: ["product_id"],
    },
  },
  {
    name: "analyze_short_video_hook_and_beats",
    description:
      "[FREE OFFLINE - NO API KEY REQUIRED] Analyze a short-video script or caption for 3-second viewer retention hook score (0-100) and generate a beat-synced auto-cut timeline.",
    annotations: roLocal("Analyze Short-Video 3-Second Hook & Beat Cut Timeline"),
    inputSchema: {
      type: "object",
      properties: {
        script_text: { type: "string", description: "Video opening hook, transcript, or caption text" },
        video_duration_sec: { type: "number", description: "Target video duration in seconds", default: 15 },
        bpm: { type: "number", description: "Audio tempo in Beats Per Minute", default: 128 },
      },
      required: ["script_text"],
    },
  },
  {
    name: "get_tiktok_video_intelligence",
    description:
      "[GLOBAL CLOUD - 22+ REGIONS] Fetch full TikTok video metadata, VQScore algorithm quality, LUFS audio loudness, Whisper VTT subtitles, pinned TikTok Shop products, CapCut anchors, and clean no-watermark HD video or slideshow images.",
    annotations: roOpen("Get TikTok Video No-Watermark MP4 & Shop Intelligence"),
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "Full TikTok video URL (e.g. 'https://www.tiktok.com/@hasaki.vn/video/7708707570608835861')",
        },
        include_slideshow: { type: "boolean", description: "Also extract photo carousel images if slideshow", default: false },
      },
      required: ["url"],
    },
  },
  {
    name: "get_tiktok_creator_profile_and_analytics",
    description:
      "[GLOBAL CLOUD - 22+ REGIONS] Fetch TikTok creator profile, follower/heart totals, engagement rate %, sponsorship USD valuation, bio email lead, and recent video posts with tagged TikTok Shop products.",
    annotations: roOpen("Get TikTok Creator Profile, Engagement & Sponsorship Valuation"),
    inputSchema: {
      type: "object",
      properties: {
        username: { type: "string", description: "TikTok handle without @ (e.g. 'khaby.lame' or 'hasaki.vn')" },
        include_analytics: { type: "boolean", description: "Include engagement velocity & creator analytics", default: true },
        include_posts: { type: "boolean", description: "Include latest video posts", default: false },
      },
      required: ["username"],
    },
  },
  {
    name: "get_tiktok_video_comments_and_replies",
    description:
      "[GLOBAL CLOUD - 22+ REGIONS] Retrieve viewer comments, commenter region, and nested comment reply threads on any TikTok video for audience sentiment analysis and product FAQ discovery.",
    annotations: roOpen("Get TikTok Video Comments & Nested Replies"),
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "TikTok video URL or video_id" },
        limit: { type: "string", description: "Number of comments (1-50)", default: "20" },
        cursor: { type: "string", description: "Pagination cursor", default: "0" },
        comment_id: { type: "string", description: "Optional comment_id to fetch nested replies for that specific comment" },
      },
      required: ["url"],
    },
  },
  {
    name: "get_tiktok_trending_and_search",
    description:
      "[GLOBAL CLOUD - 22+ REGIONS] Discover real-time trending TikTok videos, 922 national hot keywords with ByteDance TextNet taxonomy IDs, search autocomplete suggestions, or short-drama ad spy across 22+ countries.",
    annotations: roOpen("Get TikTok Trending Videos & Search Keyword Intelligence"),
    inputSchema: {
      type: "object",
      properties: {
        mode: {
          type: "string",
          enum: ["trending_feed", "search_suggestions", "ad_drama_spy", "related_videos"],
          description: "Discovery mode",
          default: "trending_feed",
        },
        region: { type: "string", description: "ISO-2 country code (US, UK, VN, ID, TH, BR, JP, DE, FR, etc.)", default: "US" },
        keyword: { type: "string", description: "Search keyword (used for search_suggestions or ad_drama_spy)" },
        video_id: { type: "string", description: "Seed video_id (used for related_videos mode)" },
      },
    },
  },
  {
    name: "get_tiktok_shop_product_and_seller",
    description:
      "[GLOBAL CLOUD - 22+ REGIONS] Extract TikTok Shop product detail (SKUs, stock, 16+ studio origin-jpeg images, 34 copywriting desc_blocks), seller store rating, creator showcase items, or vt.tiktok.com affiliate link forensics.",
    annotations: roOpen("Get TikTok Shop Product SKUs, Studio Images & Seller Store"),
    inputSchema: {
      type: "object",
      properties: {
        mode: {
          type: "string",
          enum: ["product_detail", "seller_profile", "creator_showcase", "affiliate_link_forensics"],
          default: "product_detail",
        },
        url: { type: "string", description: "TikTok Shop product URL or vt.tiktok.com affiliate shortlink" },
        seller_id: { type: "string", description: "Seller ID (for seller_profile mode)" },
        creator_uid: { type: "string", description: "Creator UID (for creator_showcase mode)" },
        region: { type: "string", description: "Country code (VN, ID, TH, US, UK, MY, PH, SG, BR)", default: "VN" },
      },
    },
  },
  {
    name: "get_tiktok_transcript_and_translate",
    description:
      "[GLOBAL CLOUD - 22+ REGIONS] Extract 0.2s Whisper ASR WebVTT subtitles/transcripts from a TikTok video, analyze AI curiosity opening hooks, or translate video subtitles and e-commerce copy into any target language via ByteDance glide_v3_2 LLM.",
    annotations: roOpen("Extract & Translate TikTok Video Whisper Subtitles (WebVTT)"),
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "TikTok video URL" },
        target_lang: { type: "string", description: "Target language code (e.g. 'en', 'vi', 'es', 'id', 'th', 'ja')", default: "en" },
        text_to_translate: { type: "string", description: "Optional raw e-commerce text to translate directly (pipe-separated)" },
      },
    },
  },
  {
    name: "get_tiktok_commercial_music_and_capcut_templates",
    description:
      "[GLOBAL CLOUD - 22+ REGIONS] Fetch commercial-cleared TikTok music tracks with exact millisecond StrongBeat drum onset arrays for auto-editing, unlimited music playlists, or videos built with a CapCut template.",
    annotations: roOpen("Get Commercial Music Tracks & StrongBeat Drum Onset Timestamps"),
    inputSchema: {
      type: "object",
      properties: {
        mode: {
          type: "string",
          enum: ["commercial_music_beats", "unlimited_music_playlists", "capcut_template_videos", "effect_sticker_videos"],
          default: "commercial_music_beats",
        },
        region: { type: "string", description: "Country code (US, VN, UK, ID, TH, BR, JP)", default: "US" },
        mv_or_video_url: { type: "string", description: "CapCut template mv_id or TikTok video URL (for capcut_template_videos)" },
        count: { type: "string", description: "Number of items to return", default: "10" },
      },
    },
  },
  {
    name: "get_tiktok_live_room_intelligence",
    description:
      "[GLOBAL CLOUD - 22+ REGIONS] Check whether TikTok live rooms are currently broadcasting (check_alive), fetch live room viewer/stream metadata (FLV/HLS/Audio-Only), or list regional live categories and 1.4MB virtual gift catalogs.",
    annotations: roOpen("Get TikTok Live Room Streams, Total Enters & Gift Catalog"),
    inputSchema: {
      type: "object",
      properties: {
        mode: {
          type: "string",
          enum: ["live_room_detail", "batch_check_alive", "live_categories_and_gifts"],
          default: "live_categories_and_gifts",
        },
        room_id: { type: "string", description: "Single room_id (for live_room_detail) or comma-separated room_ids (for batch_check_alive)" },
        region: { type: "string", description: "Country code (US, VN, ID, TH, UK, BR)", default: "US" },
      },
    },
  },
  {
    name: "search_tiktok_videos_by_keyword",
    description:
      "[GLOBAL CLOUD - 22+ REGIONS] Search TikTok videos by keyword across 22+ countries with no-watermark MP4 links and 64-bit Snowflake viral velocity (views_per_hour) scoring.",
    annotations: roOpen("Search TikTok Videos by Keyword & Viral Velocity (Views/Hour)"),
    inputSchema: {
      type: "object",
      properties: {
        keyword: {
          type: "string",
          description: "Search keyword (e.g. 'kem chống nắng', 'tiktok shop finds')",
          default: "kem chống nắng",
        },
        count: { type: "string", description: "Number of videos (1-20)", default: "10" },
        region: { type: "string", description: "Country code (VN, US, ID, TH, BR, GB)", default: "VN" },
      },
      required: ["keyword"],
    },
  },
  {
    name: "get_tiktok_shop_video_factory_pack",
    description:
      "[AI VIDEO FACTORY - TOOL 1] Generate a complete 1-click TikTok Shop review video production package: 20+ uncompressed studio origin-jpeg images, 5-part voiceover script from 34 copywriting desc_blocks, commercial music with StrongBeat scene cut timeline, type:35 cart anchor JSON, and Storefront #1 product pin deeplink.",
    annotations: roOpen("Generate 1-Click TikTok Shop AI Video Factory Production Pack"),
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "TikTok Shop product URL, vt.tiktok.com shortlink, or product_id",
        },
        region: { type: "string", description: "Country code (VN, US, ID, TH, BR)", default: "VN" },
      },
      required: ["url"],
    },
  },
  {
    name: "harvest_kol_shop_affiliate_products",
    description:
      "[KALODATA / FASTMOSS CLONE] Scan any KOL, KOC, or competitor @username's latest videos to harvest all pinned TikTok Shop products (type:35), rank Hero Products by promotion frequency, and extract all Whisper ASR .vtt sales scripts and VQScores.",
    annotations: roOpen("Harvest KOL/Competitor TikTok Shop Hero Products & Whisper Sales Scripts"),
    inputSchema: {
      type: "object",
      properties: {
        username: {
          type: "string",
          description: "TikTok creator or shop username without @ (e.g. 'hasaki.vn')",
        },
        limit: { type: "string", description: "Number of latest videos to scan (1-12)", default: "8" },
        region: { type: "string", description: "Country code (VN, US, ID, TH, BR)", default: "VN" },
      },
      required: ["username"],
    },
  },
  {
    name: "audit_tiktok_video_algorithm_vqscore",
    description:
      "[ALGORITHM VQSCORE & C2PA AUDITOR] Audit any TikTok video's hidden internal VQScore (0-100 FYP threshold >=65.0), audio loudness LUFS, hourly viral velocity, Duet/Stitch permissions, and get the anti-recode / anti-C2PA FFmpeg encoding recipe.",
    annotations: roOpen("Audit TikTok Video VQScore, Viral Velocity & Anti-C2PA FFmpeg Blueprint"),
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "TikTok video URL or video_id (e.g. 'https://www.tiktok.com/@hasaki.vn/video/7708707570608835861')",
        },
        region: { type: "string", description: "Country code (VN, US, ID, TH, BR)", default: "VN" },
      },
      required: ["url"],
    },
  },
];

// ============================================================================
// 4. EXECUTE TOOL CALL
// ============================================================================
async function executeTool(name, args = {}) {
  switch (name) {
    case "decode_tiktok_snowflake":
      return decodeSnowflakeOffline(args.id);

    case "build_tiktok_shop_deeplink":
      return buildDeeplinksOffline(args.product_id, args.seller_id, args.region);

    case "analyze_short_video_hook_and_beats":
      return analyzeHookAndBeatsOffline(args.script_text, args.video_duration_sec, args.bpm);

    case "get_tiktok_video_intelligence":
      if (args.include_slideshow) {
        return await callRapidApi("/api/v1/tiktok/slideshow", { url: args.url });
      }
      return await callRapidApi("/api/v1/tiktok/video", { url: args.url });

    case "get_tiktok_creator_profile_and_analytics":
      if (args.include_posts) {
        return await callRapidApi("/api/v1/tiktok/user-posts", { username: args.username, limit: "6" });
      }
      if (args.include_analytics) {
        return await callRapidApi("/api/v1/tiktok/creator-analytics", { username: args.username });
      }
      return await callRapidApi("/api/v1/tiktok/user", { username: args.username });

    case "get_tiktok_video_comments_and_replies":
      if (args.comment_id) {
        const vidMatch = String(args.url).match(/(\d{15,21})/);
        const vid = vidMatch ? vidMatch[1] : args.url;
        return await callRapidApi("/api/v1/tiktok/comment-replies", {
          video_id: vid,
          comment_id: args.comment_id,
          count: args.limit || "20",
          cursor: args.cursor || "0",
        });
      }
      return await callRapidApi("/api/v1/tiktok/comments", {
        url: args.url,
        limit: args.limit || "20",
        cursor: args.cursor || "0",
      });

    case "get_tiktok_trending_and_search":
      if (args.mode === "search_suggestions") {
        return await callRapidApi("/api/v1/tiktok/search-suggestions", {
          keyword: args.keyword || "tiktok shop",
          region: args.region || "US",
        });
      }
      if (args.mode === "ad_drama_spy") {
        return await callRapidApi("/api/v1/tiktok/ad-drama-spy", {
          keyword: args.keyword || "ceo billionaire",
          region: args.region || "US",
        });
      }
      if (args.mode === "related_videos") {
        return await callRapidApi("/api/v1/tiktok/explore-related-videos", {
          video_id: args.video_id || "7708707570608835861",
          count: "10",
          region: args.region || "US",
        });
      }
      return await callRapidApi("/api/v1/tiktok/trending", {
        region: args.region || "US",
        limit: "10",
      });

    case "get_tiktok_shop_product_and_seller":
      if (args.mode === "seller_profile") {
        return await callRapidApi("/api/v1/tiktok/shop-seller", {
          seller_id: args.seller_id || "7494613065224063735",
          region: args.region || "VN",
        });
      }
      if (args.mode === "creator_showcase") {
        return await callRapidApi("/api/v1/tiktok/creator-showcase", {
          uid: args.creator_uid || "6816691226508608513",
          region: args.region || "US",
        });
      }
      if (args.mode === "affiliate_link_forensics") {
        return await callRapidApi("/api/v1/tiktok/parse-affiliate-link", {
          url: args.url || "https://vt.tiktok.com/ZS9fE6SehCja8-NGCg0/",
        });
      }
      return await callRapidApi("/api/v1/tiktok/shop-product", {
        url: args.url || "https://vt.tiktok.com/ZS9fE6SehCja8-NGCg0/",
        region: args.region || "",
      });

    case "get_tiktok_transcript_and_translate":
      if (args.text_to_translate) {
        return await callRapidApi("/api/v1/tiktok/translate-text", {
          text: args.text_to_translate,
          target_lang: args.target_lang || "en",
        });
      }
      return await callRapidApi("/api/v1/tiktok/video-transcript", {
        url: args.url || "https://www.tiktok.com/@hasaki.vn/video/7708707570608835861",
      });

    case "get_tiktok_commercial_music_and_capcut_templates":
      if (args.mode === "unlimited_music_playlists") {
        return await callRapidApi("/api/v1/tiktok/unlimited-music-playlists", {
          count: args.count || "15",
          region: args.region || "US",
        });
      }
      if (args.mode === "capcut_template_videos") {
        return await callRapidApi("/api/v1/tiktok/capcut-template-videos", {
          mv_id: args.mv_or_video_url || "https://www.tiktok.com/@hasaki.vn/video/7708707570608835861",
          count: args.count || "10",
          region: args.region || "US",
        });
      }
      if (args.mode === "effect_sticker_videos") {
        return await callRapidApi("/api/v1/tiktok/effect-sticker-videos", {
          sticker_id: "",
          count: args.count || "10",
          region: args.region || "US",
        });
      }
      return await callRapidApi("/api/v1/tiktok/commercial-music-beats", {
        count: args.count || "5",
        region: args.region || "US",
        cursor: "0",
      });

    case "get_tiktok_live_room_intelligence":
      if (args.mode === "live_room_detail") {
        return await callRapidApi("/api/v1/tiktok/live-room", {
          room_id: args.room_id || "7711197440417729288",
        });
      }
      if (args.mode === "batch_check_alive") {
        return await callRapidApi("/api/v1/tiktok/live-check-alive", {
          room_ids: args.room_id || "7707865078574041864,7707996488437156615",
          include_diamonds: "0",
          region: args.region || "US",
        });
      }
      return await callRapidApi("/api/v1/tiktok/live-categories-gifts", {
        region: args.region || "US",
        include_gifts: "1",
        gift_limit: "20",
      });

    case "search_tiktok_videos_by_keyword": {
      const kw = String(args.keyword || "kem chống nắng").trim();
      const cnt = String(args.count || "10");
      const reg = args.region || "VN";
      const gwSearch = await callRapidApi("/api/v1/tiktok/search-videos", { keyword: kw, count: cnt, region: reg });
      if (gwSearch && gwSearch.ok) return gwSearch;
      if (gwSearch && gwSearch.setup_required) return gwSearch;
      const tagSlug =
        kw
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/gi, "d")
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase() || "tiktokshop";
      return await callRapidApi("/api/v1/tiktok/hashtag-videos", { hashtag: tagSlug, limit: cnt, region: reg });
    }

    case "get_tiktok_shop_video_factory_pack": {
      const targetUrl = args.url || "https://vt.tiktok.com/ZS9fE6SehCja8-NGCg0/";
      const reg = args.region || "VN";
      const gwPack = await callRapidApi("/api/v1/tiktok/shop-video-factory-pack", { url: targetUrl, region: reg });
      if (gwPack && gwPack.ok) return gwPack;
      if (gwPack && gwPack.setup_required) return gwPack;
      return await callRapidApi("/api/v1/tiktok/shop-product", { url: targetUrl, region: reg });
    }

    case "harvest_kol_shop_affiliate_products": {
      const uname = args.username || "hasaki.vn";
      const lim = String(args.limit || "8");
      const reg = args.region || "VN";
      const gwHarv = await callRapidApi("/api/v1/tiktok/kol-shop-harvester", { username: uname, limit: lim, region: reg });
      if (gwHarv && gwHarv.ok) return gwHarv;
      if (gwHarv && gwHarv.setup_required) return gwHarv;
      return await callRapidApi("/api/v1/tiktok/user-posts", { username: uname, limit: lim });
    }

    case "audit_tiktok_video_algorithm_vqscore": {
      const targetUrl = args.url || "https://www.tiktok.com/@hasaki.vn/video/7708707570608835861";
      const reg = args.region || "VN";
      const gwAudit = await callRapidApi("/api/v1/tiktok/viral-algorithm-audit", { url: targetUrl, region: reg });
      if (gwAudit && gwAudit.ok) return gwAudit;
      if (gwAudit && gwAudit.setup_required) return gwAudit;

      // Fallback using existing /api/v1/tiktok/video endpoint on RapidAPI gateway
      const vidRes = await callRapidApi("/api/v1/tiktok/video", { url: targetUrl });
      const vObj = (vidRes && (vidRes.data || vidRes.video)) || {};
      const vqScoreNum = vObj.vq_score ? parseFloat(String(vObj.vq_score)) : null;
      return {
        ok: Boolean(vidRes && vidRes.ok),
        upstream: "tiktok_algorithm_vqscore_auditor_v4",
        video_id: vObj.id || "",
        algorithm_quality_audit: {
          vq_score: vqScoreNum,
          passes_fyp_65_threshold: vqScoreNum !== null ? vqScoreNum >= 65.0 : null,
          distribution_tier:
            vqScoreNum && vqScoreNum >= 65
              ? "A/S-Tier Viral Ready (>= 65.0 — Passes TikTok 10M+ View FYP Threshold)"
              : "Standard Distribution",
          volume_info: vObj.volume_info || null,
        },
        metrics: vObj.metrics || {},
        recommended_zero_recode_ffmpeg_cmd:
          "ffmpeg -r 30 -i input.mp4 -c:v libx264 -crf 18 -maxrate 11000k -bufsize 15000k -g 120 -pix_fmt yuv420p -af loudnorm=I=-10:TP=-1.0:LRA=7 -map_metadata -1 -fflags +bitexact output_tiktok_hd.mp4",
      };
    }

    default:
      return { ok: false, error: `Unknown tool: ${name}` };
  }
}

// ============================================================================
// 5. RESOURCES & PROMPTS DEFINITIONS
// ============================================================================
const RESOURCES = [
  {
    uri: "tiktok://docs/rapidapi-key",
    name: "Get Free RapidAPI Key for 40 Global TikTok, TikTok Shop & CapCut Endpoints",
    mimeType: "text/markdown",
    description: "Quickstart guide and authentication header format for the 40-endpoint TikTok & CapCut cloud suite",
  },
  {
    uri: "tiktok://docs/algorithm-vqscore-c2pa",
    name: "TikTok Internal Algorithm Thresholds (VQScore >= 65, LUFS, 12Mbps Recode Limit & C2PA Whitelist)",
    mimeType: "text/markdown",
    description: "Reverse-engineered parameters from TikTok v47.7.3 /aweme/v1/abtest/param/ and libtt_c2pa_sdk.so",
  },
  {
    uri: "tiktok://docs/deeplink-schemas",
    name: "16 Native aweme://ec/ & snssdk1180://ec/ Conversion Deep-Link Schemas",
    mimeType: "text/markdown",
    description: "Reference for Storefront Top-1 product pinning (decorate_insert_items), direct SKU popup, and type:35 video anchor payloads",
  },
];

const PROMPTS = [
  {
    name: "analyze_tiktok_viral_product",
    description: "Analyze a TikTok video or TikTok Shop product for viral hooks, VQScore, audience comments, and beat-sync timestamps",
    arguments: [{ name: "url", description: "TikTok video or TikTok Shop product URL", required: true }],
  },
  {
    name: "audit_creator_sponsorship_rate",
    description: "Audit a TikTok creator's engagement rate, sponsorship USD valuation, bio email contact, and active affiliate products",
    arguments: [{ name: "username", description: "TikTok creator username without @", required: true }],
  },
  {
    name: "generate_beat_synced_capcut_script",
    description: "Find commercial music with StrongBeat drum onsets and matching CapCut templates to auto-edit a product review video",
    arguments: [
      { name: "product_keyword", description: "Product niche or keyword (e.g. 'sunscreen', 'action camera')", required: true },
      { name: "region", description: "Target country code (VN, US, ID, TH, BR)", required: false },
    ],
  },
  {
    name: "spy_competitor_tiktok_shop",
    description: "Perform a full teardown of a competitor TikTok Shop product or vt.tiktok.com affiliate shortlink",
    arguments: [{ name: "url", description: "TikTok Shop product URL or vt.tiktok.com link", required: true }],
  },
];

// ============================================================================
// 6. JSON-RPC 2.0 STDIO SERVER LOOP
// ============================================================================
function sendResponse(id, result) {
  const payload = JSON.stringify({ jsonrpc: "2.0", id, result });
  process.stdout.write(payload + "\n");
}

function sendError(id, code, message) {
  const payload = JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } });
  process.stdout.write(payload + "\n");
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
        serverInfo: {
          name: "tiktok-shop-capcut-mcp-server",
          version: "2.0.0",
        },
      });
    } else if (method === "notifications/initialized") {
      // No response needed for notification
    } else if (method === "ping") {
      sendResponse(id, {});
    } else if (method === "tools/list") {
      sendResponse(id, { tools: TOOLS });
    } else if (method === "resources/list") {
      sendResponse(id, { resources: RESOURCES });
    } else if (method === "resources/read") {
      const uri = (params && params.uri) || "tiktok://docs/rapidapi-key";
      let text = "";
      if (uri === "tiktok://docs/algorithm-vqscore-c2pa") {
        text = [
          "# TikTok Internal Algorithm Thresholds & Anti-C2PA Encoding Blueprint",
          "- **VQScore Threshold**: Videos scoring `VQScore >= 65.0` qualify for high-tier FYP HD distribution; `< 55.0` triggers recode/blur throttling.",
          "- **Server Recode Threshold**: `bitrate_of_recode_threshold = 12,000,000` bps (12 Mbps) and `low_video_fps_threshold = 16` FPS.",
          "- **Optimal FFmpeg Recipe**: `ffmpeg -r 30 -i input.mp4 -c:v libx264 -crf 18 -maxrate 11000k -bufsize 15000k -g 120 -pix_fmt yuv420p -af loudnorm=I=-10:TP=-1.0:LRA=7 -map_metadata -1 -fflags +bitexact output.mp4`",
          "- **C2PA Whitelist (`c2pa_minor_edit_list`)**: `['TikTok', 'Adobe Firefly', 'Adobe Inc.']` with `compositeWithTrainedAlgorithmicMedia`.",
        ].join("\n");
      } else if (uri === "tiktok://docs/deeplink-schemas") {
        text = [
          "# Native TikTok Shop Conversion Deep-Links (`shop_schema_sdk`)",
          "- **Pin Product #1 on Seller Storefront**: `aweme://ec/store?custom_params={\"custom_id_type\":0,\"decorate_insert_items\":[\"<PRODUCT_ID>\"]}&sellerId=<SELLER_ID>&store_page_version=3&url_maker=shop_schema_sdk`",
          "- **Direct SKU Picker Popup**: `aweme://ec/sku?product_id=<PRODUCT_ID>&url_maker=shop_schema_sdk`",
          "- **1-Click Order Submit**: `aweme://ec/order_submit_v2?product_id=<PRODUCT_ID>&url_maker=shop_schema_sdk`",
        ].join("\n");
      } else {
        text = `# TikTok, TikTok Shop & CapCut MCP Server v2.0.0 (40 Endpoints)\n\nGet your FREE RapidAPI Key at:\n${RAPIDAPI_URL}\n`;
      }
      sendResponse(id, {
        contents: [{ uri, mimeType: "text/markdown", text }],
      });
    } else if (method === "prompts/list") {
      sendResponse(id, { prompts: PROMPTS });
    } else if (method === "prompts/get") {
      const pName = (params && params.name) || "analyze_tiktok_viral_product";
      const pArgs = (params && params.arguments) || {};
      let userInstruction = "";
      if (pName === "audit_creator_sponsorship_rate") {
        userInstruction = `Audit TikTok creator @${pArgs.username || "hasaki.vn"} using get_tiktok_creator_profile_and_analytics. Report follower count, engagement rate %, estimated sponsorship price in USD, bio contact email, and pinned TikTok Shop products.`;
      } else if (pName === "generate_beat_synced_capcut_script") {
        userInstruction = `For the product niche "${pArgs.product_keyword || "tiktok trend"}" in region ${pArgs.region || "VN"}, call get_tiktok_commercial_music_and_capcut_templates and search_capcut_trending_templates, then write a 3-second curiosity hook and map scene cuts to the exact StrongBeat onset timestamps.`;
      } else if (pName === "spy_competitor_tiktok_shop") {
        userInstruction = `Teardown competitor TikTok Shop link "${pArgs.url || "https://vt.tiktok.com/ZS9fE6SehCja8-NGCg0/"}" using get_tiktok_shop_product_and_seller and build_tiktok_shop_deeplink. List all SKU prices, sold count, 34 copywriting desc_blocks highlights, and native conversion deep-links.`;
      } else {
        userInstruction = `Analyze TikTok URL "${pArgs.url || "https://www.tiktok.com/@hasaki.vn/video/7708707570608835861"}" using get_tiktok_video_intelligence, audit_tiktok_video_algorithm_vqscore, and get_tiktok_transcript_and_translate. Summarize VQScore, LUFS, viral velocity, Whisper transcript, and pinned Shop products.`;
      }
      sendResponse(id, {
        description: `Workflow prompt: ${pName}`,
        messages: [{ role: "user", content: { type: "text", text: userInstruction } }],
      });
    } else if (method === "tools/call") {
      const toolName = params && params.name;
      const toolArgs = (params && params.arguments) || {};
      const resData = await executeTool(toolName, toolArgs);
      sendResponse(id, {
        content: [
          {
            type: "text",
            text: JSON.stringify(resData, null, 2),
          },
        ],
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
