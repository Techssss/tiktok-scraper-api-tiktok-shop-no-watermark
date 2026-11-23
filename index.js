#!/usr/bin/env node
/**
 * TikTok, TikTok Shop & Creative Analytics MCP Server (Model Context Protocol)
 * ============================================================================
 * Standard JSON-RPC 2.0 over stdio MCP Server for Claude Desktop, Cursor,
 * Windsurf, VS Code Copilot, Smithery.ai, Glama.ai, and mcp.so.
 *
 * Powered by:
 *   https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video
 *
 * Features:
 *   - 3 Instant Offline / Zero-Key Tools (Snowflake 64-bit ID Forensics,
 *     TikTok Shop Universal DeepLink Builder, Viral Hook & Beat-Sync Scorer)
 *   - 9 Real-Time Global Cloud Tools (22+ Markets: US, UK, ID, TH, VN, BR, JP, etc.)
 *     via X-RapidAPI-Key -> tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com
 */

const https = require("https");
const readline = require("readline");

const RAPIDAPI_HOST = "tiktok-data-tiktok-shop-no-watermark-video.p.rapidapi.com";
const RAPIDAPI_URL = "https://rapidapi.com/Techssss/api/tiktok-data-tiktok-shop-no-watermark-video";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || process.env.X_RAPIDAPI_KEY || "";

// ============================================================================
// 1. HELPER: HTTP GET TO RAPIDAPI GATEWAY
// ============================================================================
function callRapidApi(path, queryParams = {}, customKey = "") {
  const apiKey = (customKey || RAPIDAPI_KEY || "").trim();
  if (!apiKey) {
    return Promise.resolve({
      ok: false,
      setup_required: true,
      message:
        "RAPIDAPI_KEY is required for live global cloud queries across 22+ regions. " +
        "Get a FREE API key in 10 seconds at: " + RAPIDAPI_URL,
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
          "Accept": "application/json",
          "User-Agent": "TikTok-Shop-MCP-Server/1.0.0",
        },
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(raw));
          } catch {
            resolve({ ok: res.statusCode === 200, status: res.statusCode, raw });
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
  const reg = String(region || "US").toUpperCase();
  const appSchemeGlobal = ["VN", "ID", "TH", "MY", "PH", "SG", "JP", "KR", "TW"].includes(reg)
    ? "snssdk1180"
    : "snssdk1233";
  return {
    ok: true,
    mode: "offline_zero_key",
    region: reg,
    product_id: pid,
    seller_id: sellerId,
    deeplinks: {
      native_pdp_scheme: `${appSchemeGlobal}://ec/pdp?product_id=${pid}&source_page_type=mcp_agent`,
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
      "Use tool `get_tiktok_commercial_music_and_capcut_templates` with RAPIDAPI_KEY to fetch real TikTok commercial audio tracks and exact millisecond StrongBeat onset arrays.",
  };
}

// ============================================================================
// 3. MCP TOOL DEFINITIONS (12 TOOLS)
// ============================================================================
const TOOLS = [
  {
    name: "decode_tiktok_snowflake",
    description:
      "[FREE OFFLINE - NO API KEY REQUIRED] Decode any 64-bit TikTok Video ID, User ID, Comment ID, Live Room ID, or Product ID into its exact UTC creation timestamp, age in days, and datacenter shard metadata.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "64-bit TikTok Snowflake ID (e.g. '7687152988393147656')",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "build_tiktok_shop_deeplink",
    description:
      "[FREE OFFLINE - NO API KEY REQUIRED] Generate native mobile app deep-links (snssdk1233:// / snssdk1180://) and universal TikTok Shop product URLs for any of 22+ countries.",
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
      "[GLOBAL CLOUD - 22+ REGIONS] Fetch full TikTok video metadata, engagement metrics (views, likes, shares, saves, comments), author info, music details, and clean no-watermark HD video or slideshow images.",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "Full TikTok video URL (e.g. 'https://www.tiktok.com/@khoahocvavutru0/video/7687152988393147656')",
        },
        include_slideshow: { type: "boolean", description: "Also extract photo carousel images if slideshow", default: false },
      },
      required: ["url"],
    },
  },
  {
    name: "get_tiktok_creator_profile_and_analytics",
    description:
      "[GLOBAL CLOUD - 22+ REGIONS] Fetch TikTok creator profile, follower/heart totals, engagement rate analytics, and recent video posts with tagged TikTok Shop products.",
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
      "[GLOBAL CLOUD - 22+ REGIONS] Retrieve viewer comments and nested comment reply threads on any TikTok video for audience sentiment analysis and product FAQ discovery.",
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
      "[GLOBAL CLOUD - 22+ REGIONS] Discover real-time trending TikTok videos, search autocomplete keyword suggestions, or related videos for any of 22+ country markets.",
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
      "[GLOBAL CLOUD - 22+ REGIONS] Extract TikTok Shop product detail, seller store profile, creator showcase items, or forensic affiliate tracking parameters (chain_key / seller_id / product_id).",
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
      "[GLOBAL CLOUD - 22+ REGIONS] Extract WebVTT subtitles/transcripts from a TikTok video, analyze AI curiosity opening hooks, or translate video subtitles and e-commerce copy into any target language.",
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
      "[GLOBAL CLOUD - 22+ REGIONS] Fetch commercial-cleared TikTok music tracks with exact millisecond StrongBeat onset arrays for auto-editing, unlimited music playlists, or videos built with a CapCut template.",
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
      "[GLOBAL CLOUD - 22+ REGIONS] Check whether TikTok live rooms are currently broadcasting (check_alive), fetch live room viewer/stream metadata, or list regional live categories and virtual gift catalogs.",
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

    default:
      return { ok: false, error: `Unknown tool: ${name}` };
  }
}

// ============================================================================
// 5. JSON-RPC 2.0 STDIO SERVER LOOP
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
          name: "tiktok-shop-mcp-server",
          version: "1.0.0",
        },
      });
    } else if (method === "notifications/initialized") {
      // No response needed for notification
    } else if (method === "ping") {
      sendResponse(id, {});
    } else if (method === "tools/list") {
      sendResponse(id, { tools: TOOLS });
    } else if (method === "resources/list") {
      sendResponse(id, {
        resources: [
          {
            uri: "tiktok://docs/rapidapi-key",
            name: "TikTok & TikTok Shop Global API Key Setup (22+ Regions)",
            mimeType: "text/markdown",
            description: "How to get a free RapidAPI key for 35 global TikTok & TikTok Shop endpoints",
          },
        ],
      });
    } else if (method === "resources/read") {
      sendResponse(id, {
        contents: [
          {
            uri: (params && params.uri) || "tiktok://docs/rapidapi-key",
            mimeType: "text/markdown",
            text: `# TikTok & TikTok Shop MCP Server\n\nGet your FREE RapidAPI Key at:\n${RAPIDAPI_URL}\n`,
          },
        ],
      });
    } else if (method === "prompts/list") {
      sendResponse(id, {
        prompts: [
          {
            name: "analyze_tiktok_viral_product",
            description: "Analyze a TikTok video or TikTok Shop product for viral hooks, audience comments, and beat-sync timestamps",
            arguments: [
              { name: "url", description: "TikTok video or product URL", required: true },
            ],
          },
        ],
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
        isError: resData && resData.ok === false && !resData.setup_required,
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
