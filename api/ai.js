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
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `You are PRTY AI. Respond casually and clearly.\nUser: ${message}`
        })
      }
    );

    const data = await response.json();

    const reply =
      Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : "PRTY AI is thinking… try again.";

    return res.status(200).json({ reply });

  } catch (e) {
    return res.status(200).json({ reply: "PRTY AI is tired rn 😴" });
  }
}
