import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Plus, Play, Pause, Trash2, Sparkles, TrendingUp, DollarSign, 
  Users, MousePointer, Sun, Moon, AlertTriangle, Award, Zap, ArrowUpRight
} from 'lucide-react';

// Pre-populated default ad variants tailored for Sac AI Receptionist
const initialVariants = [
  {
    id: 'ad-1',
    name: '24/7 Answering - Small Biz Focus',
    platform: 'Meta',
    status: 'Active',
    headline: 'Never Miss a Business Lead Again',
    primaryText: 'Sac AI Receptionist answers all your incoming customer calls 24/7, schedules appointments directly to your CRM, and routes urgent calls. Try it risk-free today!',
    cta: 'Book Demo',
    targetAudience: 'Small Business Owners, Trades & Dental Clinics',
    budget: 450,
    impressions: 14200,
    clicks: 680,
    leads: 48,
    spend: 420.50,
    customerValue: 299,
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
    budget: 600,
    impressions: 18900,
    clicks: 915,
    leads: 72,
    spend: 580.00,
    customerValue: 299,
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
    budget: 300,
    impressions: 9800,
    clicks: 290,
    leads: 14,
    spend: 285.00,
    customerValue: 299,
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
    budget: 800,
    impressions: 11400,
    clicks: 340,
    leads: 31,
    spend: 740.00,
    customerValue: 499,
  }
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [variants, setVariants] = useState(initialVariants);
  const [selectedVariantId, setSelectedVariantId] = useState(initialVariants[0].id);
  const [platformFilter, setPlatformFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // New/Edit Ad Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    platform: 'Meta',
    headline: '',
    primaryText: '',
    cta: 'Book Demo',
    targetAudience: '',
    budget: 300,
    impressions: 5000,
    clicks: 200,
    leads: 12,
    spend: 180,
    customerValue: 299
  });

  // AI Generation State
  const [aiPrompt, setAiPrompt] = useState('Targeting HVAC and Home Service contractors who lose calls on job sites');
  const [aiTone, setAiTone] = useState('High Urgency & Cost Savings');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiGeneratedResults, setAiGeneratedResults] = useState(null);

  // ROAS Calculator Inputs
  const [monthlyPrice, setMonthlyPrice] = useState(299);
  const [avgRetentionMonths, setAvgRetentionMonths] = useState(8);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Metric Calculation Helper
  const calculateMetrics = (variant) => {
    const ctr = variant.impressions > 0 ? ((variant.clicks / variant.impressions) * 100).toFixed(2) : '0';
    const cpc = variant.clicks > 0 ? (variant.spend / variant.clicks).toFixed(2) : '0';
    const cpl = variant.leads > 0 ? (variant.spend / variant.leads).toFixed(2) : '0';
    const convRate = variant.clicks > 0 ? ((variant.leads / variant.clicks) * 100).toFixed(2) : '0';
    const estimatedLTV = monthlyPrice * avgRetentionMonths;
    const totalRevenue = variant.leads * estimatedLTV;
    const roas = variant.spend > 0 ? (totalRevenue / variant.spend).toFixed(2) : '0';
    return { ctr, cpc, cpl, convRate, roas, totalRevenue };
  };

  // Find overall performance benchmarks
  const benchmarkMetrics = useMemo(() => {
    if (variants.length === 0) return { avgConv: 0, avgCpl: 0 };
    const totalLeads = variants.reduce((acc, v) => acc + v.leads, 0);
    const totalClicks = variants.reduce((acc, v) => acc + v.clicks, 0);
    const totalSpend = variants.reduce((acc, v) => acc + v.spend, 0);
    const avgConv = totalClicks > 0 ? (totalLeads / totalClicks) * 100 : 0;
    const avgCpl = totalLeads > 0 ? totalSpend / totalLeads : 0;
    return { avgConv, avgCpl };
  }, [variants]);

  const getPerformanceBadge = (variant) => {
    const { convRate, cpl } = calculateMetrics(variant);
    const conv = parseFloat(convRate);
    const costPerLead = parseFloat(cpl);

    if (conv >= benchmarkMetrics.avgConv * 1.15 && costPerLead <= benchmarkMetrics.avgCpl * 0.85) {
      return { label: 'Winner', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', icon: Award };
    } else if (conv < benchmarkMetrics.avgConv * 0.75 || costPerLead > benchmarkMetrics.avgCpl * 1.3) {
      return { label: 'Underperforming', bg: 'bg-rose-500/20 text-rose-400 border-rose-500/40', icon: AlertTriangle };
    }
    return { label: 'Average', bg: 'bg-blue-500/20 text-blue-400 border-blue-500/40', icon: TrendingUp };
  };

  const activeVariant = variants.find(v => v.id === selectedVariantId) || variants[0];

  // Filtering
  const filteredVariants = variants.filter(v => {
    const matchPlatform = platformFilter === 'All' || v.platform === platformFilter;
    const matchStatus = statusFilter === 'All' || v.status === statusFilter;
    const matchSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        v.headline.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        v.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPlatform && matchStatus && matchSearch;
  });

  // Calculate Overall Totals
  const totalSpend = variants.reduce((acc, v) => acc + v.spend, 0);
  const totalLeads = variants.reduce((acc, v) => acc + v.leads, 0);
  const totalClicks = variants.reduce((acc, v) => acc + v.clicks, 0);
  const totalImpressions = variants.reduce((acc, v) => acc + v.impressions, 0);
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0';
  const overallCpl = totalLeads > 0 ? (totalSpend / totalLeads).toFixed(2) : '0';

  // Form Submit for New Ad
  const handleCreateVariant = (e) => {
    e.preventDefault();
    const newVariant = {
      ...formData,
      id: `ad-${Date.now()}`,
      status: 'Active',
      impressions: Number(formData.impressions),
      clicks: Number(formData.clicks),
      leads: Number(formData.leads),
      spend: Number(formData.spend),
      budget: Number(formData.budget),
    };
    setVariants([newVariant, ...variants]);
    setSelectedVariantId(newVariant.id);
    setIsModalOpen(false);
  };

  const toggleStatus = (id) => {
    setVariants(variants.map(v => v.id === id ? { ...v, status: v.status === 'Active' ? 'Paused' : 'Active' } : v));
  };

  const deleteVariant = (id) => {
    const updated = variants.filter(v => v.id !== id);
    setVariants(updated);
    if (selectedVariantId === id && updated.length > 0) {
      setSelectedVariantId(updated[0].id);
    }
  };

  // Gemini API Call or Smart Fallback
  const generateAICopy = async () => {
    setIsAiGenerating(true);
    setAiGeneratedResults(null);

    const systemPrompt = "You are an expert performance marketer specializing in SaaS, AI Voice Agents, and Telephony automations for small and medium businesses.";
    const promptText = `Generate 2 high-converting ad variants for 'Sac AI Receptionist' (website: sacaireceptionist.com). Focus: ${aiPrompt}. Tone: ${aiTone}. Return valid JSON array of objects with keys: name, platform, headline, primaryText, cta, targetAudience.`;

    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        setAiGeneratedResults(JSON.parse(rawText));
      } else {
        throw new Error("No payload");
      }
    } catch (err) {
      setAiGeneratedResults([
        {
          name: "24/7 AI Phone Answering - Lead Rescue",
          platform: "Meta",
          headline: "Stop Letting Phone Calls Go to Voicemail",
          primaryText: "Every missed call is a missed customer. Sac AI Receptionist picks up in 1 ring, qualifies the caller, and books them directly onto your calendar.",
          cta: "Book Demo",
          targetAudience: "Contractors, Legal & Medical Business Owners"
        },
        {
          name: "Front Desk Cost Reducer 2026",
          platform: "Google",
          headline: "Replace $40k/yr Front Desk Costs with AI",
          primaryText: "Get an instant AI phone receptionist trained on your business. Handles call spikes, after-hours inquiries, and appointment bookings instantly.",
          cta: "Start Free Trial",
          targetAudience: "Local Service SMBs (5-50 Employees)"
        }
      ]);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const applyAiVariantToForm = (aiItem) => {
    setFormData({
      ...formData,
      name: aiItem.name,
      platform: aiItem.platform || 'Meta',
      headline: aiItem.headline,
      primaryText: aiItem.primaryText,
      cta: aiItem.cta || 'Book Demo',
      targetAudience: aiItem.targetAudience
    });
    setIsModalOpen(true);
  };

  const chartData = useMemo(() => {
    return variants.map(v => {
      const m = calculateMetrics(v);
      return {
        name: v.name.length > 18 ? v.name.substring(0, 18) + '...' : v.name,
        CPL: parseFloat(m.cpl),
        Leads: v.leads,
        ROAS: parseFloat(m.roas)
      };
    });
  }, [variants, monthlyPrice, avgRetentionMonths]);

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen font-sans ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} p-4 md:p-8 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER BAR */}
        <header className={`p-5 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl text-white shadow-lg shadow-cyan-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">Sac AI Receptionist</h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Ad Testing Lab
                </span>
              </div>
              <p className="text-xs text-slate-400">Optimizing ad performance for sacaireceptionist.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md shadow-cyan-500/15 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Plus className="w-4 h-4" /> Create Ad Variant
            </button>
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-colors ${isDark ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-300 text-slate-700'}`}
              title="Toggle Light/Dark Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* TOP METRICS SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Total Spend</span>
              <DollarSign className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-slate-100 dark:text-white">
              ${totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-slate-400 mt-1">{variants.length} active variants running</p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Qualified Leads</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-slate-100 dark:text-white">{totalLeads}</div>
            <p className="text-xs text-slate-400 mt-1">Avg Conv: {benchmarkMetrics.avgConv.toFixed(2)}%</p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Avg Cost Per Lead</span>
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-slate-100 dark:text-white">${overallCpl}</div>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> Target CPL: $25.00
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Total CTR</span>
              <MousePointer className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-slate-100 dark:text-white">{avgCtr}%</div>
            <p className="text-xs text-slate-400 mt-1">{(totalImpressions / 1000).toFixed(1)}k views</p>
          </div>
        </div>

        {/* MAIN TWO COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT: Ad Variants & Filters (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div>
                  <h2 className="text-lg font-bold">Ad Variants & A/B Experiments</h2>
                  <p className="text-xs text-slate-400">Compare copy, platforms, and real-time metrics</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <select 
                    value={platformFilter} 
                    onChange={e => setPlatformFilter(e.target.value)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300'}`}
                  >
                    <option value="All">All Platforms</option>
                    <option value="Meta">Meta</option>
                    <option value="Google">Google</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>

                  <select 
                    value={statusFilter} 
                    onChange={e => setStatusFilter(e.target.value)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300'}`}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                  </select>
                </div>
              </div>

              {/* Variant Cards List */}
              <div className="space-y-3">
                {filteredVariants.map((variant) => {
                  const metrics = calculateMetrics(variant);
                  const badge = getPerformanceBadge(variant);
                  const isSelected = variant.id === selectedVariantId;
                  const BadgeIcon = badge.icon;

                  return (
                    <div 
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                        isSelected 
                          ? isDark ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10' : 'bg-white border-cyan-500 shadow-md'
                          : isDark ? 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                              {variant.platform}
                            </span>
                            <h3 className="text-sm font-bold">{variant.name}</h3>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1">"{variant.headline}"</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.bg}`}>
                            <BadgeIcon className="w-3 h-3" /> {badge.label}
                          </span>
                          
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleStatus(variant.id); }}
                            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                            title="Toggle Status"
                          >
                            {variant.status === 'Active' ? <Pause className="w-4 h-4 text-emerald-400" /> : <Play className="w-4 h-4 text-slate-500" />}
                          </button>

                          <button 
                            onClick={(e) => { e.stopPropagation(); deleteVariant(variant.id); }}
                            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Performance Bar */}
                      <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-800/50 text-center">
                        <div>
                          <div className="text-[10px] text-slate-400">CTR</div>
                          <div className="text-xs font-bold text-slate-200">{metrics.ctr}%</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">CPL</div>
                          <div className="text-xs font-bold text-slate-200">${metrics.cpl}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">Leads</div>
                          <div className="text-xs font-bold text-emerald-400">{variant.leads}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">ROAS</div>
                          <div className="text-xs font-bold text-cyan-400">{metrics.roas}x</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Live Ad Preview & Simulator (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Live Ad Mockup Preview</h2>

              {/* Render Card */}
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-400 text-xs">
                    SAC
                  </div>
                  <div>
                    <div className="text-xs font-bold">Sac AI Receptionist</div>
                    <div className="text-[10px] text-slate-400">Sponsored • sacaireceptionist.com</div>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed mb-3">
                  {activeVariant.primaryText}
                </p>

                <div className="rounded-lg bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700/60 p-4 text-center space-y-2 mb-3">
                  <div className="text-xs text-cyan-400 font-semibold tracking-wide uppercase">24/7 Voice AI Answering</div>
                  <div className="text-base font-bold text-white px-2">"{activeVariant.headline}"</div>
                  <div className="text-[10px] text-slate-400">0 missed phone leads • Instant CRM sync</div>
                </div>

                <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <div>
                    <div className="text-[10px] text-slate-400">sacaireceptionist.com</div>
                    <div className="text-xs font-bold text-slate-200 truncate max-w-[180px]">{activeVariant.headline}</div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded bg-cyan-500 text-white shadow-sm">
                    {activeVariant.cta}
                  </span>
                </div>
              </div>

              {/* Metric Simulator Controls */}
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-slate-400">Simulate Metrics ({activeVariant.name})</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Clicks</label>
                    <input 
                      type="number" 
                      value={activeVariant.clicks}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setVariants(variants.map(v => v.id === activeVariant.id ? { ...v, clicks: val } : v));
                      }}
                      className={`w-full text-xs p-1.5 rounded border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-300'}`}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Leads</label>
                    <input 
                      type="number" 
                      value={activeVariant.leads}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setVariants(variants.map(v => v.id === activeVariant.id ? { ...v, leads: val } : v));
                      }}
                      className={`w-full text-xs p-1.5 rounded border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-300'}`}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Spend ($)</label>
                    <input 
                      type="number" 
                      value={activeVariant.spend}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setVariants(variants.map(v => v.id === activeVariant.id ? { ...v, spend: val } : v));
                      }}
                      className={`w-full text-xs p-1.5 rounded border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-300'}`}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* SECTION 3: ANALYTICS & ROAS ENGINE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Analytics Chart (8 cols) */}
          <div className={`lg:col-span-8 p-5 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-base font-bold mb-1">Variant Performance Comparison</h2>
            <p className="text-xs text-slate-400 mb-4">Comparing Cost Per Lead (CPL) vs Total Leads acquired</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} />
                  <XAxis dataKey="name" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={11} />
                  <YAxis stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={11} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#0f172a' : '#ffffff', 
                      borderColor: isDark ? '#334155' : '#cbd5e1',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                  />
                  <Bar dataKey="Leads" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Leads Generated" />
                  <Bar dataKey="CPL" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Cost Per Lead ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ROAS Engine (4 cols) */}
          <div className={`lg:col-span-4 p-5 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-base font-bold mb-1">Sac AI ROAS Engine</h2>
            <p className="text-xs text-slate-400 mb-4">Estimate revenue based on Lifetime Value (LTV)</p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">Monthly Package Price ($)</label>
                <input 
                  type="number" 
                  value={monthlyPrice}
                  onChange={e => setMonthlyPrice(Number(e.target.value))}
                  className={`w-full text-xs p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-300'}`}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">Avg Client Retention (Months)</label>
                <input 
                  type="number" 
                  value={avgRetentionMonths}
                  onChange={e => setAvgRetentionMonths(Number(e.target.value))}
                  className={`w-full text-xs p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-300'}`}
                />
              </div>

              <div className="pt-3 border-t border-slate-800/60 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Client LTV:</span>
                  <span className="font-bold text-cyan-400">${monthlyPrice * avgRetentionMonths}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Est. Total Pipeline Revenue:</span>
                  <span className="font-bold text-emerald-400">
                    ${(totalLeads * monthlyPrice * avgRetentionMonths).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Blended ROAS:</span>
                  <span className="font-bold text-purple-400">
                    {totalSpend > 0 ? ((totalLeads * monthlyPrice * avgRetentionMonths) / totalSpend).toFixed(1) : '0'}x
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* AI COPYWRITER & AD GENERATOR SECTION */}
        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold">AI Copywriter & Ad Generator</h2>
          </div>
          <p className="text-xs text-slate-400 mb-4">Generate targeted ad angles for Sac AI Receptionist using Gemini AI</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="md:col-span-2">
              <label className="text-xs text-slate-400 block mb-1">Niche Focus / Audience Target</label>
              <input 
                type="text" 
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                placeholder="e.g. Plumbers and Dental Clinics losing after-hours leads"
                className={`w-full text-xs p-2.5 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-300'}`}
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Tone & Angle</label>
              <select 
                value={aiTone}
                onChange={e => setAiTone(e.target.value)}
                className={`w-full text-xs p-2.5 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-300'}`}
              >
                <option value="High Urgency & Cost Savings">High Urgency & Cost Savings</option>
                <option value="After-Hours & Missed Calls Rescue">After-Hours & Missed Calls Rescue</option>
                <option value="Professional B2B Enterprise Bot">Professional B2B Enterprise Bot</option>
                <option value="Casual & Friendly Local Business">Casual & Friendly Local Business</option>
              </select>
            </div>
          </div>

          <button 
            onClick={generateAICopy}
            disabled={isAiGenerating}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-medium shadow-md transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" /> {isAiGenerating ? 'Generating Variants...' : 'Generate Copy Variations'}
          </button>

          {/* AI Results Output */}
          {aiGeneratedResults && (
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-400">Generated Ad Suggestions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiGeneratedResults.map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {item.platform || 'Meta'} Variant
                      </span>
                      <button 
                        onClick={() => applyAiVariantToForm(item)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                      >
                        Use This Variant →
                      </button>
                    </div>
                    <div className="text-xs font-bold mb-1">"{item.headline}"</div>
                    <p className="text-xs text-slate-400 mb-2">{item.primaryText}</p>
                    <div className="text-[10px] text-slate-400">Target: {item.targetAudience}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* MODAL FOR CREATING NEW AD */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`max-w-lg w-full p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold">Create New Ad Variant</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateVariant} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Variant Name</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Legal Practice 24/7 Answering"
                  className={`w-full text-xs p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Platform</label>
                  <select 
                    value={formData.platform}
                    onChange={e => setFormData({ ...formData, platform: e.target.value })}
                    className={`w-full text-xs p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}
                  >
                    <option value="Meta">Meta</option>
                    <option value="Google">Google</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">CTA Text</label>
                  <input 
                    type="text"
                    value={formData.cta}
                    onChange={e => setFormData({ ...formData, cta: e.target.value })}
                    className={`w-full text-xs p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Headline</label>
                <input 
                  type="text"
                  required
                  value={formData.headline}
                  onChange={e => setFormData({ ...formData, headline: e.target.value })}
                  className={`w-full text-xs p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Primary Ad Copy</label>
                <textarea 
                  rows={3}
                  required
                  value={formData.primaryText}
                  onChange={e => setFormData({ ...formData, primaryText: e.target.value })}
                  className={`w-full text-xs p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Target Audience</label>
                <input 
                  type="text"
                  value={formData.targetAudience}
                  onChange={e => setFormData({ ...formData, targetAudience: e.target.value })}
                  placeholder="e.g. Dental Clinics, Law Offices"
                  className={`w-full text-xs p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-xs rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-400"
                >
                  Save Variant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
