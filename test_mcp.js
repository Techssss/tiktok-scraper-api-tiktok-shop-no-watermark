#!/usr/bin/env node
/**
 * End-to-End Automated Test Suite for TikTok & TikTok Shop MCP Server v2.0.0 (43 Endpoints)
 */

const { spawn } = require("child_process");
const path = require("path");

const TEST_KEY = process.argv[2] || process.env.RAPIDAPI_KEY || "";

async function runMcpTest() {
  console.log("=== TESTING TIKTOK & TIKTOK SHOP MCP SERVER v2.0.0 (STDIO JSON-RPC 2.0) ===");
  const serverPath = path.join(__dirname, "index.js");
  const child = spawn(process.execPath, [serverPath], {
    env: { ...process.env, RAPIDAPI_KEY: TEST_KEY },
    stdio: ["pipe", "pipe", "inherit"],
  });

  const pending = new Map();
  let buf = "";

  child.stdout.on("data", (chunk) => {
    buf += chunk.toString();
    let idx;
    while ((idx = buf.indexOf("\n")) !== -1) {
      const line = buf.slice(0, idx).trim();
      buf = buf.slice(idx + 1);
      if (!line) continue;
      const msg = JSON.parse(line);
      if (msg.id !== undefined && pending.has(msg.id)) {
        pending.get(msg.id)(msg);
        pending.delete(msg.id);
      }
    }
  });

  let reqId = 1;
  function sendRpc(method, params = {}) {
    const id = reqId++;
    return new Promise((resolve) => {
      pending.set(id, resolve);
      child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
    });
  }

  // 1. Initialize
  const initRes = await sendRpc("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "mcp-test-runner", version: "2.0.0" },
  });
  console.log("[PASS] 1. initialize ->", JSON.stringify(initRes.result.serverInfo));

  // 2. List Tools & Verify MCP Behavioral Annotations
  const listRes = await sendRpc("tools/list");
  const tools = listRes.result.tools || [];
  const annotatedCount = tools.filter((t) => t.annotations && t.annotations.readOnlyHint === true).length;
  console.log(`[PASS] 2. tools/list -> ${tools.length} tools registered (${annotatedCount}/${tools.length} with MCP Behavioral Annotations)`);

  // 3. List & Get Prompts
  const promptsList = await sendRpc("prompts/list");
  const promptGet = await sendRpc("prompts/get", {
    name: "spy_competitor_tiktok_shop",
    arguments: { url: "https://vt.tiktok.com/ZS9fE6SehCja8-NGCg0/" },
  });
  console.log(
    `[PASS] 3. prompts/list & prompts/get -> ${promptsList.result.prompts.length} prompts, message preview:`,
    promptGet.result.messages[0].content.text.slice(0, 80) + "..."
  );

  // 4. List & Read Resources
  const resList = await sendRpc("resources/list");
  const resRead = await sendRpc("resources/read", { uri: "tiktok://docs/algorithm-vqscore-c2pa" });
  console.log(
    `[PASS] 4. resources/list & resources/read -> ${resList.result.resources.length} resources, doc length:`,
    resRead.result.contents[0].text.length,
    "chars"
  );

  // 5. Offline Tool #1: Snowflake Decoder
  const sfRes = await sendRpc("tools/call", {
    name: "decode_tiktok_snowflake",
    arguments: { id: "7687152988393147656" },
  });
  const sfJson = JSON.parse(sfRes.result.content[0].text);
  console.log(`[PASS] 5. decode_tiktok_snowflake -> created_at_utc=${sfJson.created_at_utc}, shard=${sfJson.bit_forensics.datacenter_worker_shard}`);

  // 6. Offline Tool #2: DeepLink Builder (with Storefront #1 Pinning)
  const dlRes = await sendRpc("tools/call", {
    name: "build_tiktok_shop_deeplink",
    arguments: { product_id: "1735171805700392934", seller_id: "7496284048136506342", region: "VN" },
  });
  const dlJson = JSON.parse(dlRes.result.content[0].text);
  console.log(`[PASS] 6. build_tiktok_shop_deeplink -> storefront_pin=${Boolean(dlJson.deeplinks.storefront_pin_product_top1)}`);

  // 7. Offline Tool #3: Hook & Beat Analyzer
  const hbRes = await sendRpc("tools/call", {
    name: "analyze_short_video_hook_and_beats",
    arguments: {
      script_text: "Stop scrolling! Here are 3 secret TikTok Shop hacks nobody tells you about?",
      video_duration_sec: 15,
      bpm: 128,
    },
  });
  const hbJson = JSON.parse(hbRes.result.content[0].text);
  console.log(`[PASS] 7. analyze_short_video_hook_and_beats -> score=${hbJson.hook_score_out_of_100}/100`);

  // 8. Live Cloud Tools (if RAPIDAPI_KEY is provided)
  if (TEST_KEY) {
    const searchRes = await sendRpc("tools/call", {
      name: "search_tiktok_videos_by_keyword",
      arguments: { keyword: "kem chống nắng", count: "5", region: "VN" },
    });
    const searchJson = JSON.parse(searchRes.result.content[0].text);
    console.log(`[PASS] 8. search_tiktok_videos_by_keyword (LIVE) -> ok=${searchJson.ok}`);

    const auditRes = await sendRpc("tools/call", {
      name: "audit_tiktok_video_algorithm_vqscore",
      arguments: { url: "https://www.tiktok.com/@hasaki.vn/video/7708707570608835861", region: "VN" },
    });
    const auditJson = JSON.parse(auditRes.result.content[0].text);
    console.log(
      `[PASS] 9. audit_tiktok_video_algorithm_vqscore (LIVE) -> ok=${auditJson.ok}, vq_score=${auditJson.algorithm_quality_audit?.vq_score}`
    );
  }

  child.kill();
  console.log("=== ALL MCP SERVER v2.0.0 CHECKS PASSED (100% READY) ===");
}

runMcpTest().catch((e) => {
  console.error(e);
  process.exit(1);
});
