import * as fs from "node:fs/promises";
import { generateImage } from "./generator";
import { v4 as uuidv4 } from "uuid";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { parseTemplate } from "./validation";
import { print } from "./printer";

const app = new Hono();

app.get("/ping", (ctx) => {
  return ctx.json({
    success: true,
  });
});

app.post("/print", async (ctx) => {
  const body = await ctx.req.json();
  try {
    const template = parseTemplate(body);
    const imageBuffer = generateImage(template);
    const imgPath = `out/${uuidv4()}.png`;
    await fs.writeFile(imgPath, imageBuffer);
    await print(imgPath);
    return ctx.json({ success: true }, 200);
  } catch (err) {
    return ctx.json({ success: false, err }, 400);
  }
});

app.post("/preview", async (ctx) => {
  const body = await ctx.req.json();
  try {
    const template = parseTemplate(body);
    const imageBuffer = generateImage(template);
    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (err) {
    return ctx.json({ success: false, err }, 400);
  }
});

serve(
  {
    fetch: app.fetch,
    port: parseInt(process.env.PORT || "3000"),
    hostname: process.env.HOSTNAME,
  },
  (info) => {
    console.log(`Server running on port ${info.port}`);
  }
);
