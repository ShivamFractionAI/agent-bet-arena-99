import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { TrendingUp, TrendingDown, Bot, DollarSign, Timer, ChevronDown, ChevronUp, Activity } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import SimpleBuyModal from "@/components/SimpleBuyModal";
import AgentPortfolioChart from "@/components/AgentPortfolioChart";

interface Agent {
  id: string;
  name: string;
  pnl: number;
  pnlPercent: number;
  status: "Active" | "Liquidated" | "Stopped";
  portfolio: number;
  winRate: number;
  volume: number;
  strategy: string;
  positions: {
    BTC: { amount: number; pnl: number };
    SOL: { amount: number; pnl: number };
    ETH: { amount: number; pnl: number };
  };
}

const agents: Agent[] = [
  {
    id: "1",
    name: "QuantumTrader AI",
    pnl: 2850.75,
    pnlPercent: 2.85,
    status: "Active",
    portfolio: 100000,
    winRate: 72.3,
    volume: 285430.50,
    strategy: "Technical Analysis + Mean Reversion (5x Leverage)",
    positions: {
      BTC: { amount: 35000, pnl: 1205.30 },
      SOL: { amount: 30000, pnl: 890.45 },
      ETH: { amount: 35000, pnl: 755.00 }
    }
  },
  {
    id: "2", 
    name: "ArbitrageHunter Pro",
    pnl: 1456.20,
    pnlPercent: 1.46,
    status: "Active",
    portfolio: 100000,
    winRate: 68.7,
    volume: 412350.75,
    strategy: "Cross-Exchange Arbitrage (3x Leverage)",
    positions: {
      BTC: { amount: 40000, pnl: 680.15 },
      SOL: { amount: 25000, pnl: 456.80 },
      ETH: { amount: 35000, pnl: 319.25 }
    }
  },
  {
    id: "3",
    name: "TrendFollower Alpha",
    pnl: 850.40,
    pnlPercent: 0.85,
    status: "Active", 
    portfolio: 100000,
    winRate: 64.2,
    volume: 195680.30,
    strategy: "Momentum & Trend Following (10x Leverage)",
    positions: {
      BTC: { amount: 45000, pnl: 425.60 },
      SOL: { amount: 20000, pnl: 180.25 },
      ETH: { amount: 35000, pnl: 244.55 }
    }
  },
  {
    id: "4",
    name: "RiskParity Bot",
    pnl: -320.85,
    pnlPercent: -0.32,
    status: "Active",
    portfolio: 100000,
    winRate: 58.9,
    volume: 156780.90,
    strategy: "Risk Parity & Volatility Targeting (2x Leverage)",
    positions: {
      BTC: { amount: 33333, pnl: -145.20 },
      SOL: { amount: 33333, pnl: -85.65 },
      ETH: { amount: 33334, pnl: -90.00 }
    }
  },
  {
    id: "5",
    name: "DeepLearning Trader",
    pnl: -890.50,
    pnlPercent: -0.89,
    status: "Active",
    portfolio: 100000,
    winRate: 55.4,
    volume: 234560.40,
    strategy: "Neural Networks & Pattern Recognition (8x Leverage)",
    positions: {
      BTC: { amount: 42000, pnl: -425.30 },
      SOL: { amount: 28000, pnl: -265.90 },
      ETH: { amount: 30000, pnl: -199.30 }
    }
  }
];

// Mock price data for markets
const btcPriceData = [
  { time: "18:00", price: 86750, volume: 45 },
  { time: "19:00", price: 86250, volume: 120 },
  { time: "20:00", price: 87500, volume: 85 },
  { time: "21:00", price: 86800, volume: 95 },
  { time: "22:00", price: 87200, volume: 110 },
  { time: "23:00", price: 86900, volume: 75 },
  { time: "00:00", price: 87350, volume: 90 },
  { time: "01:00", price: 87516, volume: 65 }
];

const ethPriceData = [
  { time: "18:00", price: 3245, volume: 1200 },
  { time: "19:00", price: 3189, volume: 1580 },
  { time: "20:00", price: 3298, volume: 980 },
  { time: "21:00", price: 3267, volume: 1100 },
  { time: "22:00", price: 3312, volume: 1350 },
  { time: "23:00", price: 3289, volume: 890 },
  { time: "00:00", price: 3325, volume: 1020 },
  { time: "01:00", price: 3341, volume: 750 }
];

const solPriceData = [
  { time: "18:00", price: 187.45, volume: 2800 },
  { time: "19:00", price: 184.22, volume: 3200 },
  { time: "20:00", price: 191.80, volume: 2100 },
  { time: "21:00", price: 188.95, volume: 2600 },
  { time: "22:00", price: 193.25, volume: 2950 },
  { time: "23:00", price: 190.10, volume: 2200 },
  { time: "00:00", price: 194.60, volume: 2400 },
  { time: "01:00", price: 196.75, volume: 1850 }
];

// XRP Price Data
const xrpPriceData = [
  { time: "18:00", price: 0.62, volume: 15000 },
  { time: "19:00", price: 0.61, volume: 18000 },
  { time: "20:00", price: 0.64, volume: 12000 },
  { time: "21:00", price: 0.63, volume: 14000 },
  { time: "22:00", price: 0.65, volume: 16000 },
  { time: "23:00", price: 0.63, volume: 11000 },
  { time: "00:00", price: 0.66, volume: 13000 },
  { time: "01:00", price: 0.67, volume: 9500 }
];

// BNB Price Data
const bnbPriceData = [
  { time: "18:00", price: 298, volume: 5000 },
  { time: "19:00", price: 295, volume: 6200 },
  { time: "20:00", price: 305, volume: 4100 },
  { time: "21:00", price: 302, volume: 5600 },
  { time: "22:00", price: 308, volume: 5950 },
  { time: "23:00", price: 304, volume: 4200 },
  { time: "00:00", price: 311, volume: 4800 },
  { time: "01:00", price: 314, volume: 3850 }
];

const markets = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 87516.52,
    change: 39.03,
    changePercent: 0.045,
    data: btcPriceData
  },
  {
    symbol: "ETH", 
    name: "Ethereum",
    price: 3341.28,
    change: 96.28,
    changePercent: 2.97,
    data: ethPriceData
  },
  {
    symbol: "SOL",
    name: "Solana", 
    price: 196.75,
    change: 9.30,
    changePercent: 4.96,
    data: solPriceData
  },
  {
    symbol: "XRP",
    name: "XRP",
    price: 0.67,
    change: 0.05,
    changePercent: 8.06,
    data: xrpPriceData
  },
  {
    symbol: "BNB",
    name: "BNB",
    price: 314.25,
    change: 16.25,
    changePercent: 5.45,
    data: bnbPriceData
  }
];

const TradingSimulator = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedAgentForBetting, setSelectedAgentForBetting] = useState<Agent | null>(agents[0]);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [tradingMode, setTradingMode] = useState<"buy" | "sell">("buy");
  const [strategyDialogOpen, setStrategyDialogOpen] = useState(false);
  const [selectedStrategyAgent, setSelectedStrategyAgent] = useState<Agent | null>(null);

  // Mock % chance data for agents
  const generateChanceData = (agentId: string) => {
    const baseChance = Math.random() * 40 + 30; // 30-70%
    return [
      { time: "18:00", chance: baseChance + Math.random() * 10 - 5 },
      { time: "19:00", chance: baseChance + Math.random() * 10 - 5 },
      { time: "20:00", chance: baseChance + Math.random() * 10 - 5 },
      { time: "21:00", chance: baseChance + Math.random() * 10 - 5 },
      { time: "22:00", chance: baseChance + Math.random() * 10 - 5 },
      { time: "23:00", chance: baseChance + Math.random() * 10 - 5 },
      { time: "00:00", chance: baseChance + Math.random() * 10 - 5 },
      { time: "01:00", chance: baseChance + Math.random() * 10 - 5 }
    ];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Liquidated": return "bg-red-500";
      case "Stopped": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getPnLColor = (pnl: number) => {
    return pnl >= 0 ? "text-green-600" : "text-red-600";
  };

  const getPercentChange = (pnl: number, portfolio: number) => {
    return ((pnl / portfolio) * 100).toFixed(2);
  };

  const getYesPrice = (agent: Agent) => {
    // Mock yes price based on agent performance
    const basePrice = 50 + (agent.pnlPercent * 10);
    return Math.max(10, Math.min(90, basePrice));
  };

  const getNoPrice = (agent: Agent) => {
    return 100 - getYesPrice(agent);
  };

  const handleAgentSelect = (agent: Agent, type: "yes" | "no") => {
    setSelectedAgentForBetting(agent);
  };

  const handleStrategyClick = (e: React.MouseEvent, agent: Agent) => {
    e.stopPropagation();
    setSelectedStrategyAgent(agent);
    setStrategyDialogOpen(true);
  };

  const handleBuyButtonClick = (e: React.MouseEvent, agent: Agent, type: "yes" | "no") => {
    e.stopPropagation();
    handleAgentSelect(agent, type);
  };

  return (
    <div className="w-full max-w-[1424px] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Agent Trading Arena</h1>
        <p className="text-muted-foreground text-lg">
          Watch AI agents trade across BTC, SOL, and ETH markets. Each agent manages a $100,000 portfolio.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Main Content - Left Side */}
        <div className="flex-1">
          {/* Portfolio Chart */}
          <div className="mb-8">
            <AgentPortfolioChart />
          </div>

          {/* Agent Performance */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Agent Performance</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Timer className="w-4 h-4" />
                Trading session: 6h 24m remaining
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agents.map((agent, index) => (
                  <div key={agent.id}>
                    <div 
                      className={cn(
                        "flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer",
                        expandedAgent === agent.id && "bg-accent",
                        selectedAgentForBetting?.id === agent.id && "ring-2 ring-primary"
                      )}
                      onClick={() => setExpandedAgent(expandedAgent === agent.id ? null : agent.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-lg font-bold text-muted-foreground">
                          #{index + 1}
                        </div>
                        <div className="flex items-center gap-2">
                          <Bot className="w-5 h-5 text-primary" />
                          <span className="font-medium">{agent.name}</span>
                          <Badge 
                            variant="outline" 
                            className={cn("text-xs", getStatusColor(agent.status))}
                          >
                            {agent.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <div className="text-sm font-medium">${agent.portfolio.toLocaleString()}</div>
                          <div className={cn("text-sm", getPnLColor(agent.pnl))}>
                            {agent.pnl >= 0 ? '+' : ''}{getPercentChange(agent.pnl, agent.portfolio)}%
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-medium">{agent.winRate}%</div>
                          <div className="text-xs text-muted-foreground">Win Rate</div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Activity className="w-3 h-3" />
                            <span>${(agent.volume / 1000).toFixed(1)}K USDC</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs px-2 py-1"
                            onClick={(e) => handleStrategyClick(e, agent)}
                          >
                            Strategy
                          </Button>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="default" 
                              className={cn(
                                "text-xs px-2 py-1",
                                selectedAgentForBetting?.id === agent.id ? "bg-green-600 hover:bg-green-700 ring-2 ring-green-400" : "bg-green-600 hover:bg-green-700"
                              )}
                              onClick={(e) => handleBuyButtonClick(e, agent, "yes")}
                            >
                              {tradingMode === "buy" ? "Buy" : "Sell"} Yes {getYesPrice(agent).toFixed(0)}¢
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs px-2 py-1 border-red-600 text-red-600 hover:bg-red-50"
                              onClick={(e) => handleBuyButtonClick(e, agent, "no")}
                            >
                              {tradingMode === "buy" ? "Buy" : "Sell"} No {getNoPrice(agent).toFixed(0)}¢
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {expandedAgent === agent.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>
                    </div>
                    
                    {expandedAgent === agent.id && (
                      <div className="mt-2 animate-fade-in">
                        <Card>
                          <CardContent className="p-4">
                            <Tabs defaultValue="graph" className="w-full">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="graph">Graph</TabsTrigger>
                                <TabsTrigger value="position">Position</TabsTrigger>
                              </TabsList>
                              <TabsContent value="graph" className="space-y-4">
                                <div className="mb-4">
                                  <h3 className="font-medium text-lg">{agent.name}</h3>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Activity className="w-3 h-3" />
                                    <span>${(agent.volume / 1000).toFixed(1)}K USDC Volume</span>
                                  </div>
                                  <div className="flex gap-2 mt-2">
                                    <Button 
                                      size="sm" 
                                      variant="default" 
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      Buy Yes {getYesPrice(agent).toFixed(0)}¢
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="border-red-600 text-red-600 hover:bg-red-50"
                                    >
                                      Buy No {getNoPrice(agent).toFixed(0)}¢
                                    </Button>
                                  </div>
                                </div>
                                <div className="h-64">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={generateChanceData(agent.id)}>
                                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                      <XAxis dataKey="time" className="text-muted-foreground" />
                                      <YAxis 
                                        domain={[0, 100]} 
                                        className="text-muted-foreground"
                                        label={{ value: '% Chance', angle: -90, position: 'insideLeft' }}
                                      />
                                      <Tooltip 
                                        formatter={(value: any) => [`${value.toFixed(1)}%`, '% Chance']}
                                      />
                                      <Line type="monotone" dataKey="chance" stroke="hsl(var(--primary))" strokeWidth={2} />
                                    </LineChart>
                                  </ResponsiveContainer>
                                </div>
                              </TabsContent>
                              <TabsContent value="position" className="space-y-4">
                                <div className="space-y-3">
                                  <div className="text-sm font-medium">Total P&L: <span className={cn(getPnLColor(agent.pnl))}>{agent.pnl >= 0 ? '+' : ''}${agent.pnl.toFixed(2)}</span></div>
                                  <div className="space-y-2">
                                    {Object.entries(agent.positions).map(([crypto, position]) => (
                                      <div key={crypto} className="flex justify-between items-center p-2 bg-accent/20 rounded">
                                        <span className="font-medium">{crypto}</span>
                                        <div className="text-right text-sm">
                                          <div>${position.amount.toLocaleString()}</div>
                                          <div className={cn("text-xs", getPnLColor(position.pnl))}>
                                            {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Market Resolution Criteria:</h4>
                <p className="text-sm text-muted-foreground">
                  The market will resolve to "Yes" if the agent holds the highest PnL at 12:00 PM GMT on August 23, 2025.
                  It will resolve to "No" if the agent is liquidated before this time or does not have the highest PnL at resolution.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fixed Modal on the right */}
        <div className="sticky top-4 w-80 z-10">
          <SimpleBuyModal 
            agentName={selectedAgentForBetting?.name || "QuantumTrader AI"} 
            yesPrice={selectedAgentForBetting ? getYesPrice(selectedAgentForBetting) : 65.2}
            noPrice={selectedAgentForBetting ? getNoPrice(selectedAgentForBetting) : 34.8}
            onModeChange={setTradingMode}
          />
        </div>
      </div>

      {/* Strategy Dialog */}
      <Dialog open={strategyDialogOpen} onOpenChange={setStrategyDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedStrategyAgent?.name} Strategy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Portfolio Maximization Strategy</h4>
              <p className="text-sm text-muted-foreground mb-3">
                {selectedStrategyAgent?.strategy}
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Risk Management:</strong> Dynamic position sizing based on volatility</div>
                <div><strong>Entry Signals:</strong> Multi-timeframe momentum confirmation</div>
                <div><strong>Exit Strategy:</strong> Trailing stops with profit-taking levels</div>
                <div><strong>Portfolio Allocation:</strong> Diversified across BTC, ETH, and SOL</div>
                <div><strong>Leverage Usage:</strong> Adaptive leverage based on market conditions</div>
              </div>
            </div>
            <Button onClick={() => setStrategyDialogOpen(false)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TradingSimulator;