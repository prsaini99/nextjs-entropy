#!/usr/bin/env node
/**
 * LinkedIn poster — publishes the oldest APPROVED draft from
 * docs/ai-seo/linkedin-queue/ to Prateek's profile, uploads the draft's
 * chart image when present, then marks the file STATUS: posted.
 *
 * Only STATUS: approved files are ever posted (approval = PR merge / edit).
 *
 * Env: LINKEDIN_ACCESS_TOKEN
 * Usage: node scripts/linkedin-post.mjs [--dry]
 */

import fs from "node:fs";
import path from "node:path";

const TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const dry = process.argv.includes("--dry");
const QUEUE = path.join("docs", "ai-seo", "linkedin-queue");

if (!TOKEN) {
  console.error("LINKEDIN_ACCESS_TOKEN missing — run scripts/linkedin-auth.mjs (token lapses every ~60 days).");
  process.exit(1);
}

const files = fs.existsSync(QUEUE)
  ? fs.readdirSync(QUEUE).filter((f) => f.endsWith(".post.md")).sort()
  : [];
const pick = files.find((f) =>
  /^STATUS:\s*approved/m.test(fs.readFileSync(path.join(QUEUE, f), "utf8"))
);
if (!pick) {
  console.log("No approved drafts in the queue — nothing to post.");
  process.exit(0);
}

const file = path.join(QUEUE, pick);
const raw = fs.readFileSync(file, "utf8");
const imageM = raw.match(/^IMAGE:\s*(.+)$/m);
const imageUrl = imageM && imageM[1].trim() !== "none" ? imageM[1].trim() : null;
const text = raw.split(/^---$/m).pop().trim();

const li = (url, opts = {}) =>
  fetch(url, {
    ...opts,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
      ...(opts.headers || {}),
    },
  });

// who am I
const meRes = await li("https://api.linkedin.com/v2/userinfo");
if (!meRes.ok) {
  console.error(`userinfo ${meRes.status}: ${(await meRes.text()).slice(0, 200)} — token likely expired.`);
  process.exit(1);
}
const me = await meRes.json();
const author = `urn:li:person:${me.sub}`;

if (dry) {
  console.log(`[dry] would post as ${me.name} (${author})${imageUrl ? " with image" : ""}:\n\n${text}`);
  process.exit(0);
}

// optional image upload
let asset = null;
if (imageUrl) {
  try {
    const reg = await li("https://api.linkedin.com/v2/assets?action=registerUpload", {
      method: "POST",
      body: JSON.stringify({
        registerUploadRequest: {
          owner: author,
          recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
          serviceRelationships: [{ relationshipType: "OWNER", identifier: "urn:li:userGeneratedContent" }],
        },
      }),
    });
    if (reg.ok) {
      const regData = await reg.json();
      const uploadUrl =
        regData.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl;
      asset = regData.value.asset;
      const img = await fetch(imageUrl);
      const buf = Buffer.from(await img.arrayBuffer());
      const up = await fetch(uploadUrl, {
        method: "PUT",
        headers: { Authorization: `Bearer ${TOKEN}` },
        body: buf,
      });
      if (!up.ok) asset = null;
    }
  } catch {
    asset = null; // post without image rather than fail
  }
}

// publish
const post = {
  author,
  lifecycleState: "PUBLISHED",
  specificContent: {
    "com.linkedin.ugc.ShareContent": {
      shareCommentary: { text },
      shareMediaCategory: asset ? "IMAGE" : "NONE",
      ...(asset && {
        media: [{ status: "READY", media: asset }],
      }),
    },
  },
  visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
};

const res = await li("https://api.linkedin.com/v2/ugcPosts", {
  method: "POST",
  body: JSON.stringify(post),
});
if (!res.ok) {
  console.error(`post failed ${res.status}: ${(await res.text()).slice(0, 300)}`);
  process.exit(1);
}
const postId = res.headers.get("x-restli-id") || "unknown";

fs.writeFileSync(
  file,
  raw.replace(/^STATUS:\s*approved/m, `STATUS: posted\nPOSTED: ${new Date().toISOString().slice(0, 10)}\nPOST_ID: ${postId}`)
);
console.log(`Posted ✓ ${postId}${asset ? " (with image)" : ""} — ${pick}`);
