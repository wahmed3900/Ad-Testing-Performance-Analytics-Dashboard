// Vercel serverless function — keeps GEMINI_API_KEY server-side
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt, tone } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured in Vercel environment' });
  }

  const promptText = `You are an expert performance marketer for AI SaaS products.
Generate exactly 2 high-converting ad variants for 'Sac AI Receptionist' (website: sacaireceptionist.com).
Target audience: ${prompt || 'small business owners losing calls'}.
Tone & angle: ${tone || 'High Urgency & Cost Savings'}.
Return ONLY a valid JSON array of 2 objects. Each object must have these keys:
  name (string — short campaign name),
  platform (one of: Meta, Google, TikTok, LinkedIn),
  headline (string — max 60 characters),
  primaryText (string — 2-3 punchy sentences),
  cta (string — e.g. "Book Demo"),
  targetAudience (string — who this targets).
No markdown, no extra text — just the raw JSON array.`;

  try {
    // Model: update this string if you upgrade your Gemini tier
    const MODEL = 'gemini-2.0-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('Gemini API error:', errBody);
      return res.status(502).json({ error: 'Gemini API returned an error', detail: errBody });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error('Empty response from Gemini');

    const parsed = JSON.parse(rawText);
    return res.status(200).json(parsed);
  } catch (err) {
    console.error('generate error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
