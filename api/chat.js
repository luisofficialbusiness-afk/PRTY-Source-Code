export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(200).json({ reply: "Say something first." });
    }

    // 🔁 REPLACE THIS with your Cloudflare Worker URL
    const CLOUDFLARE_AI_URL = "https://prty-ai.luisofficialbusiness.workers.dev/";

    const response = await fetch(CLOUDFLARE_AI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (!data || !data.reply) {
      return res.status(200).json({
        reply: "PRTY AI is thinking too hard rn 😵‍💫"
      });
    }

    return res.status(200).json({ reply: data.reply });

  } catch (err) {
    return res.status(200).json({
      reply: "PRTY AI is offline rn 😴"
    });
  }
}

