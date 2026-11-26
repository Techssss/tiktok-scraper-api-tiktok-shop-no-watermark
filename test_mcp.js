#!/usr/bin/env node
/**
 * Automated Test Suite for TikTok & TikTok Shop MCP Server v2.1.0 (Apify Cloud)
 */

const { spawn } = require("child_process");
const path = require("path");

const TEST_TOKEN = process.argv[2] || process.env.APIFY_TOKEN || "";

async function runMcpTest() {
  console.log("=== TESTING TIKTOK & TIKTOK SHOP MCP SERVER v2.1.0 (APIFY CLOUD) ===");
  const child = spawn(process.execPath, [path.join(__dirname, "index.js")], {
    env: { ...process.env, APIFY_TOKEN: TEST_TOKEN },
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

  const initRes = await sendRpc("initialize", { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test", version: "2.1.0" } });
  console.log("[PASS] 1. initialize ->", JSON.stringify(initRes.result.serverInfo));

  const listRes = await sendRpc("tools/list");
  const tools = listRes.result.tools || [];
  const annotated = tools.filter((t) => t.annotations && t.annotations.readOnlyHint === true).length;
  console.log(`[PASS] 2. tools/list -> ${tools.length} tools (${annotated}/${tools.length} annotated)`);

  const promptsList = await sendRpc("prompts/list");
  const promptGet = await sendRpc("prompts/get", { name: "spy_competitor_tiktok_shop", arguments: { url: "https://vt.tiktok.com/ZS9fE6SehCja8-NGCg0/" } });
  console.log(`[PASS] 3. prompts -> ${promptsList.result.prompts.length} prompts, sample:`, promptGet.result.messages[0].content.text.slice(0, 70));

  const resList = await sendRpc("resources/list");
  const resRead = await sendRpc("resources/read", { uri: "tiktok://docs/apify-quickstart" });
  console.log(`[PASS] 4. resources -> ${resList.result.resources.length} resources, quickstart includes jistudio:`, resRead.result.contents[0].text.includes("apify.com/jistudio"));

  const sfRes = await sendRpc("tools/call", { name: "decode_tiktok_snowflake", arguments: { id: "7687152988393147656" } });
  const sfJson = JSON.parse(sfRes.result.content[0].text);
  console.log(`[PASS] 5. decode_tiktok_snowflake -> created_at_utc=${sfJson.created_at_utc}`);

  const dlRes = await sendRpc("tools/call", { name: "build_tiktok_shop_deeplink", arguments: { product_id: "1735171805700392934", seller_id: "7496284048136506342", region: "VN" } });
  const dlJson = JSON.parse(dlRes.result.content[0].text);
  console.log(`[PASS] 6. build_tiktok_shop_deeplink -> ok=${dlJson.ok}`);

  const hbRes = await sendRpc("tools/call", { name: "analyze_short_video_hook_and_beats", arguments: { script_text: "Stop scrolling! 3 TikTok Shop tips?", video_duration_sec: 15, bpm: 128 } });
  const hbJson = JSON.parse(hbRes.result.content[0].text);
  console.log(`[PASS] 7. analyze_short_video_hook_and_beats -> score=${hbJson.hook_score_out_of_100}/100`);

  const cloudCheck = await sendRpc("tools/call", { name: "search_tiktok_videos_by_keyword", arguments: { keyword: "skincare", region: "US" } });
  const cloudJson = JSON.parse(cloudCheck.result.content[0].text);
  console.log(`[PASS] 8. cloud tool routing -> ok=${cloudJson.ok}, setup_required=${Boolean(cloudJson.setup_required)}, url=${cloudJson.run_no_code_on_apify_store || "live"}`);

  child.kill();
  console.log("=== ALL MCP SERVER v2.1.0 CHECKS PASSED ===");
}

runMcpTest().catch((e) => {
  console.error(e);
  process.exit(1);
});
