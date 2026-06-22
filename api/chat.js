export default async function handler(req, res) {
  if (req.method!== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const LYZR_API_KEY = process.env.LYZR_API_KEY;

  try {
    const response = await fetch("https://agent-prod.studio.lyzr.ai/v3/inference/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": LYZR_API_KEY
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy request failed" });
  }
}
