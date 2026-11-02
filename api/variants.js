// Vercel serverless function — keeps MONGODB_URI server-side
const { MongoClient } = require('mongodb');

// Connection cache (reused across warm Lambda invocations)
let cachedClient = null;

async function getCollection() {
  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGODB_URI);
    await cachedClient.connect();
  }
  return cachedClient.db('ad-dashboard').collection('variants');
}

// Default seed data — inserted once on first GET if collection is empty
const DEFAULT_VARIANTS = [
  // Real Meta results as of Nov 1, 2026 (CPL $8.58). Clicks not yet pulled from Ads Manager.
  {
    id: 'ad-1',
    name: 'AI Receptionist - Sacramento Contractors',
    platform: 'Meta',
    status: 'Paused',
    headline: 'Never Miss a Business Lead Again',
    primaryText: 'Sac AI Receptionist answers all your incoming customer calls 24/7, schedules appointments directly to your CRM, and routes urgent calls. Try it risk-free today!',
    cta: 'Book Demo',
    targetAudience: 'Contractors in Sacramento',
    budget: 34.31, impressions: 344, clicks: 0, leads: 4, spend: 34.31, customerValue: 299,
  },
  {
    id: 'ad-2',
    name: 'Cost Saver vs Human Receptionist',
    platform: 'Google',
    status: 'Active',
    headline: 'Cut Front Desk Costs by 80% with AI',
    primaryText: 'Why pay $3,500/mo for a front-desk receptionist when Sac AI handles instant phone responses, FAQs, and instant booking at a fraction of the cost?',
    cta: 'Calculate Savings',
    targetAudience: 'Law Firms, Medical Practices & Real Estate',
    budget: 600, impressions: 18900, clicks: 915, leads: 72, spend: 580.00, customerValue: 299,
  },
  {
    id: 'ad-3',
    name: 'After-Hours Emergency Answering',
    platform: 'TikTok',
    status: 'Paused',
    headline: 'Capture Every Midnight Customer Call',
    primaryText: 'Over 40% of high-intent callers go to voicemail after hours. Sac AI Receptionist picks up instantly, screens leads, and locks in bookings while you sleep.',
    cta: 'Start Free Trial',
    targetAudience: 'Home Services, Plumbers, HVAC & Emergency Repairs',
    budget: 300, impressions: 9800, clicks: 290, leads: 14, spend: 285.00, customerValue: 299,
  },
  {
    id: 'ad-4',
    name: 'LinkedIn B2B Enterprise Bot',
    platform: 'LinkedIn',
    status: 'Active',
    headline: 'Autonomous Phone Agents for Modern Teams',
    primaryText: 'Deploy human-like AI voice receptionists trained on your exact business documentation. Intelligent routing, multi-language support, and seamless Calendar sync.',
    cta: 'Contact Sales',
    targetAudience: 'B2B SaaS, Agency Owners & Enterprise Executives',
    budget: 800, impressions: 11400, clicks: 340, leads: 31, spend: 740.00, customerValue: 499,
  }
];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const col = await getCollection();

    // GET — return all variants (seed defaults if first visit)
    if (req.method === 'GET') {
      let variants = await col.find({}, { projection: { _id: 0 } }).toArray();
      if (variants.length === 0) {
        await col.insertMany(DEFAULT_VARIANTS);
        variants = DEFAULT_VARIANTS;
      }
      return res.status(200).json(variants);
    }

    // POST — create new variant
    if (req.method === 'POST') {
      const variant = req.body;
      if (!variant || !variant.id) return res.status(400).json({ error: 'variant.id required' });
      await col.insertOne(variant);
      return res.status(201).json(variant);
    }

    // PUT — update fields on existing variant (send { id, ...fields })
    if (req.method === 'PUT') {
      const { id, ...update } = req.body || {};
      if (!id) return res.status(400).json({ error: 'id required' });
      await col.updateOne({ id }, { $set: update });
      return res.status(200).json({ success: true });
    }

    // DELETE — remove variant by id (send { id })
    if (req.method === 'DELETE') {
      const { id } = req.body || {};
      if (!id) return res.status(400).json({ error: 'id required' });
      await col.deleteOne({ id });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('variants error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
