export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "POST only" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(200).json({ reply: "Say something first." });
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `You are PRTY AI. Respond casually.\nUser: ${message}`
        })
      }
    );

    const data = await response.json();

    // 🔥 HANDLE ALL HF RESPONSE TYPES
    let reply = "PRTY AI is thinking… try again.";

    if (Array.isArray(data) && data[0]?.generated_text) {
      reply = data[0].generated_text;
    } else if (typeof data?.generated_text === "string") {
      reply = data.generated_text;
    } else if (typeof data === "string") {
      reply = data;
    } else if (data?.error) {
      reply = "PRTY AI hit a rate limit. Try again.";
    }

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(200).json({ reply: "PRTY AI is tired rn 😴" });
  }
}
