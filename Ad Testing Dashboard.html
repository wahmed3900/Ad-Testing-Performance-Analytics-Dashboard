import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  Plus, Play, Pause, Trash2, Copy, Sparkles, TrendingUp, DollarSign, Users, MousePointer, 
  BarChart2, RefreshCw, Layers, CheckCircle2, AlertTriangle, Eye, Sun, Moon, Filter, 
  Phone, Bot, Award, ExternalLink, Zap, Target, ArrowUpRight, ArrowDownRight
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
    customerValue: 299, // monthly sub
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
  const [aiTone, setAiTone] = useState('High Urgency & ROI Focused');
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
    const ctr = variant.impressions > 0 ? ((variant.clicks / variant.impressions) * 100).toFixed(2) : 0;
    const cpc = variant.clicks > 0 ? (variant.spend / variant.clicks).toFixed(2) : 0;
    const cpl = variant.leads > 0 ? (variant.spend / variant.leads).toFixed(2) : 0;
    const convRate = variant.clicks > 0 ? ((variant.leads / variant.clicks) * 100).toFixed(2) : 0;
    const estimatedLTV = monthlyPrice * avgRetentionMonths;
    const totalRevenue = variant.leads * estimatedLTV;
    const roas = variant.spend > 0 ? (totalRevenue / variant.spend).toFixed(2) : 0;

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
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0;
  const overallCpl = totalLeads > 0 ? (totalSpend / totalLeads).toFixed(2) : 0;

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

  // Toggle status (Active / Paused)
  const toggleStatus = (id) => {
    setVariants(variants.map(v => v.id === id ? { ...v, status: v.status === 'Active' ? 'Paused' : 'Active' } : v));
  };

  // Delete Ad
  const deleteVariant = (id) => {
    const updated = variants.filter(v => v.id !== id);
    setVariants(updated);
    if (selectedVariantId === id && updated.length > 0) {
      setSelectedVariantId(updated[0].id);
    }
  };

  // Call Gemini API for AI Copy Optimization
  const generateAICopy = async () => {
    setIsAiGenerating(true);
    setAiGeneratedResults(null);

    const systemPrompt = "You are an expert performance marketer specializing in SaaS, AI Voice Agents, and Telephony automations for small and medium businesses.";
    const promptText = `Generate 2 high-converting ad variants for 'Sac AI Receptionist' (website: sacaireceptionist.com).
    Context / Audience focus: ${aiPrompt}.
    Desired Tone: ${aiTone}.
    
    Sac AI Receptionist features:
    - 24/7 Voice AI Receptionist that answers phone calls naturally
    - Automatic appointment scheduling directly into calendar/CRM
    - Call routing for high-urgency client leads
    - Answers customer FAQs, pricing, service details instantly
    - Saves 80% compared to traditional full-time receptionist staff

    Return a valid JSON array of 2 objects with this exact key structure:
    [
      {
        "name": "Short descriptive campaign name",
        "platform": "Meta" or "Google" or "TikTok" or "LinkedIn",
        "headline": "Punchy headline under 50 chars",
        "primaryText": "Persuasive ad copy emphasizing value proposition, pain point, and clear ROI",
        "cta": "Book Demo" or "Try Free" or "Get Started",
        "targetAudience": "Specific ideal customer profile description"
      }
    ]`;

    try {
      const apiKey = ""; // Runtime automatically injects API key when blank
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (rawText) {
        const parsed = JSON.parse(rawText);
        setAiGeneratedResults(parsed);
      } else {
        throw new Error("No output received from Gemini API");
      }
    } catch (err) {
      console.warn("Using smart fallback generation:", err);
      // Fallback fallback generator if API fails
      setAiGeneratedResults([
        {
          name: "24/7 AI Phone Answering - AI Lead Rescue",
          platform: "Meta",
          headline: "Stop Letting Phone Calls Go to Voicemail",
          primaryText: "Every missed call is a missed customer. Sac AI Receptionist picks up in 1 ring, qualifies the caller, and books them right on your schedule. 24/7 coverage for your business.",
          cta: "Book Demo",
          targetAudience: "Busy Contracting, Legal, & Home Service Business Owners"
        },
        {
          name: "Front Desk Cost Reducer 2026",
          platform: "Google",
          headline: "Replace $40k/yr Front Desk Costs with AI",
          primaryText: "Get an instant AI phone receptionist trained on your business. Handles call spikes, after-hours inquiries, and appointment booking with zero human delay.",
          cta: "Start Free Trial",
          targetAudience: "Local Service SMBs with 5-50 Employees"
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
      cta: aiItem.cta,
      targetAudience: aiItem.targetAudience
    });
    setIsModalOpen(true);
  };

  // Visual Chart Data
  const chartData = useMemo(() => {
    return variants.map(v => {
      const m = calculateMetrics(v);
      return {
        name: v.name.length > 18 ? v.name.substring(0, 18) + '...' : v.name,
        fullTitle: v.name,
        CTR: parseFloat(m.ctr),
        CPL: parseFloat(m.cpl),
        Leads: v.leads,
        ROAS: parseFloat(m.roas),
        Spend: v.spend
      };
    });
  }, [variants, monthlyPrice, avgRetentionMonths]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Header Bar */}
      <header className={`border-b sticky top-0 z-30 backdrop-blur-md ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2.5 rounded-xl shadow-lg shadow-cyan-500/20 text-white">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-bold text-lg sm:text-xl tracking-tight">Sac AI Receptionist</h1>
                <span className="px-2 py-0.5 text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
                  Ad Lab & Analytics
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                Optimizing performance for <span className="underline decoration-cyan-500/40 font-mono">sacaireceptionist.com</span>
                <a href="https://sacaireceptionist.com/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
                  <ExternalLink className="w-3 h-3 inline" />
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md shadow-cyan-500/15 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create Ad Variant</span>
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-colors ${
                theme === 'dark' 
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200'
              }`}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* TOP METRICS SUMMARY CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-5 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-md'}`}>
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total Ad Spend</span>
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono">${totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div className="flex items-center text-xs text-emerald-400 mt-2 gap-1 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{variants.length} active variants running</span>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-md'}`}>
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Qualified Leads</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono">{totalLeads} <span className="text-xs font-normal text-slate-400">demos & trials</span></div>
            <div className="flex items-center text-xs text-slate-400 mt-2 gap-1 font-medium">
              <span>Avg Conversion Rate:</span>
              <span className="text-cyan-400 font-mono font-semibold">{benchmarkMetrics.avgConv.toFixed(2)}%</span>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-md'}`}>
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Avg Cost Per Lead (CPL)</span>
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Target className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono">${overallCpl}</div>
            <div className="flex items-center text-xs text-slate-400 mt-2 gap-1 font-medium">
              <span>Target CPL:</span>
              <span className="text-emerald-400 font-mono font-semibold">$25.00</span>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-md'}`}>
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total Impressions & CTR</span>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <MousePointer className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono">{(totalImpressions / 1000).toFixed(1)}k <span className="text-xs font-normal text-slate-400">views</span></div>
            <div className="flex items-center text-xs text-purple-400 mt-2 gap-1 font-medium">
              <span>Average CTR:</span>
              <span className="font-mono font-semibold">{avgCtr}%</span>
            </div>
          </div>
        </section>

        {/* SECTION 1 & 2: LIVE AD PREVIEW & VARIANT MANAGEMENT GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Ad Variants List & Simulator Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  <span>Ad Variants & A/B Experiments</span>
                </h2>
                <p className="text-xs text-slate-400">Compare messaging, platforms, and targeting metrics</p>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-2">
                <select 
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-700'}`}
                >
                  <option value="All">All Platforms</option>
                  <option value="Meta">Meta (FB/IG)</option>
                  <option value="Google">Google Ads</option>
                  <option value="TikTok">TikTok</option>
                  <option value="LinkedIn">LinkedIn</option>
                </select>

                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-700'}`}
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                </select>
              </div>
            </div>

            {/* List of Ads */}
            <div className="space-y-3">
              {filteredVariants.map((variant) => {
                const metrics = calculateMetrics(variant);
                const badge = getPerformanceBadge(variant);
                const isSelected = variant.id === selectedVariantId;

                return (
                  <div 
                    key={variant.id}
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected 
                        ? theme === 'dark' ? 'bg-slate-900 border-cyan-500/70 shadow-lg shadow-cyan-500/5' : 'bg-white border-cyan-500 shadow-md'
                        : theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-600" />
                    )}

                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded uppercase ${
                            variant.platform === 'Meta' ? 'bg-blue-500/20 text-blue-400' :
                            variant.platform === 'Google' ? 'bg-red-500/20 text-red-400' :
                            variant.platform === 'TikTok' ? 'bg-pink-500/20 text-pink-400' : 'bg-indigo-500/20 text-indigo-400'
                          }`}>
                            {variant.platform}
                          </span>
                          <h3 className="font-bold text-sm">{variant.name}</h3>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{variant.headline}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.bg}`}>
                          <badge.icon className="w-3 h-3" />
                          {badge.label}
                        </span>

                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleStatus(variant.id); }}
                          className={`p-1 rounded hover:bg-slate-800 text-xs ${variant.status === 'Active' ? 'text-emerald-400' : 'text-slate-500'}`}
                          title={variant.status === 'Active' ? 'Pause Campaign' : 'Resume Campaign'}
                        >
                          {variant.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                        
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteVariant(variant.id); }}
                          className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                          title="Delete Variant"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Performance Chips */}
                    <div className="grid grid-cols-4 gap-2 pt-2 mt-2 border-t border-slate-800/40 text-xs">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">CTR</div>
                        <div className="font-semibold font-mono text-cyan-400">{metrics.ctr}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">CPL</div>
                        <div className="font-semibold font-mono text-emerald-400">${metrics.cpl}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Leads</div>
                        <div className="font-semibold font-mono">{variant.leads}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">ROAS</div>
                        <div className="font-semibold font-mono text-purple-400">{metrics.roas}x</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Live Ad Preview Mockup for Sac AI Receptionist (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" />
                <span>Live Render Preview</span>
              </h2>
              <span className="text-xs text-slate-400">Renders as shown on {activeVariant.platform}</span>
            </div>

            {/* Mock Ad Render Card */}
            <div className={`p-5 rounded-2xl border shadow-xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              
              {/* Header profile for sacaireceptionist.com */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-sm">Sac AI Receptionist</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <span>Sponsored</span> • <span>sacaireceptionist.com</span>
                  </div>
                </div>
              </div>

              {/* Primary Copy */}
              <p className="text-sm leading-relaxed mb-3 text-slate-300">
                {activeVariant.primaryText}
              </p>

              {/* Ad Creative Canvas / Simulated Image/Video Visual */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700/60 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 text-center text-white mb-3 shadow-inner">
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/40 backdrop-blur-md text-[10px] text-cyan-300 font-mono border border-cyan-500/30">
                  AI Voice Agent Demo
                </div>

                <div className="py-4 space-y-3 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20 animate-pulse">
                    <Phone className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">24/7 Voice AI Answering</span>
                    <h4 className="text-lg font-bold tracking-tight text-white mt-0.5">
                      "{activeVariant.headline}"
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>0 missed phone leads • Instant CRM sync</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA Bar */}
              <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                <div className="overflow-hidden">
                  <div className="text-[10px] uppercase text-slate-400 font-mono tracking-wider">sacaireceptionist.com</div>
                  <div className="text-xs font-bold truncate">{activeVariant.headline}</div>
                </div>
                <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-lg text-xs transition-colors shrink-0 flex items-center gap-1 shadow-sm">
                  <span>{activeVariant.cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Target Audience Tag */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="text-slate-500">Target Segment:</span>
                <span className="font-medium text-slate-300">{activeVariant.targetAudience}</span>
              </div>
            </div>

            {/* Interactive Metric Simulator Controls for Selected Variant */}
            <div className={`p-4 rounded-xl border space-y-3 ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Simulate Metrics ({activeVariant.name})</span>
                <RefreshCw className="w-3 h-3 text-cyan-400 cursor-pointer" />
              </h3>

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
                    className={`w-full text-xs p-1.5 rounded border font-mono ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'}`}
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
                    className={`w-full text-xs p-1.5 rounded border font-mono ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'}`}
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
                    className={`w-full text-xs p-1.5 rounded border font-mono ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'}`}
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: VISUAL COMPARATIVE ANALYTICS & ROAS CALCULATOR */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Chart Visualizer (8 cols) */}
          <div className={`lg:col-span-8 p-6 rounded-2xl border space-y-4 ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-cyan-400" />
                  <span>Variant Performance Comparison</span>
                </h2>
                <p className="text-xs text-slate-400">Comparing Cost Per Lead (CPL) vs Total Leads acquired</p>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} opacity={0.5} />
                  <XAxis dataKey="name" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} fontSize={11} />
                  <YAxis yAxisId="left" orientation="left" stroke="#38bdf8" fontSize={11} label={{ value: 'Cost per Lead ($)', angle: -90, position: 'insideLeft', fill: '#38bdf8', fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#34d399" fontSize={11} label={{ value: 'Total Leads', angle: 90, position: 'insideRight', fill: '#34d399', fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
                      borderColor: theme === 'dark' ? '#334155' : '#cbd5e1',
                      borderRadius: '0.75rem',
                      fontSize: '12px'
                    }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar yAxisId="left" dataKey="CPL" fill="#38bdf8" name="Cost Per Lead ($)" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="Leads" fill="#34d399" name="Total Leads" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ROAS & Business Growth Calculator (4 cols) */}
          <div className={`lg:col-span-4 p-6 rounded-2xl border space-y-4 ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Sac AI ROAS Engine</span>
            </h2>
            <p className="text-xs text-slate-400">Estimate business revenue based on client Lifetime Value (LTV)</p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Monthly Subscription ($/mo)
                </label>
                <input 
                  type="number" 
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(Number(e.target.value))}
                  className={`w-full text-xs p-2 rounded-lg border font-mono ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Avg Client Retention (Months)
                </label>
                <input 
                  type="number" 
                  value={avgRetentionMonths}
                  onChange={(e) => setAvgRetentionMonths(Number(e.target.value))}
                  className={`w-full text-xs p-2 rounded-lg border font-mono ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>

              <div className={`p-4 rounded-xl border mt-4 space-y-2 ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Client LTV:</span>
                  <span className="font-mono font-bold text-cyan-400">${monthlyPrice * avgRetentionMonths}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Est. Total Revenue:</span>
                  <span className="font-mono font-bold text-emerald-400">${(totalLeads * monthlyPrice * avgRetentionMonths).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800">
                  <span className="text-slate-400 font-semibold">Blended ROAS:</span>
                  <span className="font-mono font-extrabold text-purple-400 text-sm">
                    {totalSpend > 0 ? ((totalLeads * monthlyPrice * avgRetentionMonths) / totalSpend).toFixed(1) : 0}x
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: AI COPY GENERATOR (INTEGRATED GEMINI API) */}
        <section className={`p-6 rounded-2xl border space-y-6 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border-cyan-500/30' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold">AI Copywriter & Ad Generator</h2>
              </div>
              <p className="text-xs text-slate-400">Powered by Gemini 3 Flash API to generate specialized AI Receptionist ad variations</p>
            </div>

            <button 
              onClick={generateAICopy}
              disabled={isAiGenerating}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
            >
              {isAiGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating AI Variants...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Copy Variations</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Target Audience & Niche Focus</label>
              <input 
                type="text" 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. Plumbers and Dental Clinics losing after-hours leads"
                className={`w-full text-xs p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'}`}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Tone & Angle</label>
              <select 
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value)}
                className={`w-full text-xs p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'}`}
              >
                <option value="High Urgency & ROI Focused">High Urgency & Cost Savings</option>
                <option value="After-Hours & Missed Calls Angle">After-Hours & Missed Calls Rescue</option>
                <option value="Professional Enterprise Bot">Professional B2B Enterprise Bot</option>
                <option value="Casual & Friendly Local Business">Casual & Friendly Local Business</option>
              </select>
            </div>
          </div>

          {/* Generated AI Results */}
          {aiGeneratedResults && (
            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Generated Ad Suggestions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiGeneratedResults.map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border space-y-2 relative ${theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        {item.platform || 'Meta'} Variant
                      </span>
                      <button 
                        onClick={() => applyAiVariantToForm(item)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Use This Variant</span>
                      </button>
                    </div>

                    <h4 className="font-bold text-sm text-slate-100">{item.headline}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.primaryText}</p>
                    <div className="text-[11px] text-slate-400 pt-1 flex justify-between">
                      <span>Target: <strong className="text-slate-300">{item.targetAudience}</strong></span>
                      <span className="font-mono text-cyan-400 font-semibold">{item.cta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* CREATE NEW AD VARIANT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl space-y-4 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <span>Create New Ad Variant</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateVariant} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Variant Internal Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Meta - HVAC After Hours Hook"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full text-xs p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Platform</label>
                  <select 
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className={`w-full text-xs p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}
                  >
                    <option value="Meta">Meta (Facebook/Instagram)</option>
                    <option value="Google">Google Search/Display</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">CTA Button Text</label>
                  <input 
                    type="text" 
                    required
                    value={formData.cta}
                    onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                    className={`w-full text-xs p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-300'}`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Ad Headline</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 24/7 AI Phone Receptionist for $299"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className={`w-full text-xs p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Primary Ad Copy</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Detail the main pain point and Sac AI value prop..."
                  value={formData.primaryText}
                  onChange={(e) => setFormData({ ...formData, primaryText: e.target.value })}
                  className={`w-full text-xs p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Target Audience Description</label>
                <input 
                  type="text" 
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  placeholder="e.g. Dental clinics, Law firms, Contractors"
                  className={`w-full text-xs p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs shadow-md"
                >
                  Save & Launch Experiment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
