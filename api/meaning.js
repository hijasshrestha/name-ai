export default async function handler(req, res) {
  const { name } = req.body;

  const prompt = `Give a short, clear meaning and cultural origin of the first name "${name}".`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await response.json();
  const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

  res.status(200).json({ result: answer });
}
