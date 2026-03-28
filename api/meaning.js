export default async function handler(req, res) {
  try {
    const { name } = req.body;

    const prompt = `Give a short, clear meaning and cultural origin of the first name "${name}".`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: prompt }] }
          ]
        })
      }
    );

    const data = await response.json();

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    res.status(200).json({ result: answer });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server crashed" });
  }
}
