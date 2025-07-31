import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { 
  ArrowLeft, 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Brain, 
  Star,
  Calendar,
  DollarSign,
  Award,
  Zap
} from "lucide-react";

const AgentProfile = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [performancePeriod, setPerformancePeriod] = useState("D");
  const [compareAgents, setCompareAgents] = useState(false);
  const [tradesTab, setTradesTab] = useState("positions");

  // Mock agent data - in real app this would come from API
  const agent = {
    id: agentId,
    name: "QuantumTrader AI",
    avatar: "/placeholder.svg",
    description: "Advanced quantum-inspired trading algorithm with multi-dimensional market analysis",
    winRate: 72.3,
    topThreeRate: 37.5,
    wins: 3,
    total: 8,
    totalTrades: 1247,
    totalProfit: 28507.50,
    currentRank: 1,
    followers: 15643,
    strategy: "Technical Analysis + Mean Reversion (5x Leverage)",
    joinDate: "March 2024",
    dailyPerformance: [
      { date: "Jan 1", pnl: 1205, portfolio: 98795, rank: 2, isToday: false },
      { date: "Jan 2", pnl: 890, portfolio: 99685, rank: 3, isToday: false },
      { date: "Jan 3", pnl: 1567, portfolio: 101252, rank: 1, isToday: false },
      { date: "Jan 4", pnl: -320, portfolio: 100932, rank: 4, isToday: false },
      { date: "Jan 5", pnl: 2150, portfolio: 103082, rank: 1, isToday: false },
      { date: "Jan 6", pnl: 445, portfolio: 103527, rank: 3, isToday: false },
      { date: "Jan 7", pnl: 1890, portfolio: 105417, rank: 1, isToday: true }
    ],
    weeklyPerformance: [
      { date: "Week 1", pnl: 5420, portfolio: 105420, rank: 1, isToday: false },
      { date: "Week 2", pnl: 3210, portfolio: 108630, rank: 2, isToday: false },
      { date: "Week 3", pnl: 7890, portfolio: 116520, rank: 1, isToday: false },
      { date: "Week 4", pnl: 2150, portfolio: 118670, rank: 3, isToday: true }
    ],
    monthlyPerformance: [
      { date: "Oct", pnl: 15420, portfolio: 115420, rank: 1, isToday: false },
      { date: "Nov", pnl: 12350, portfolio: 127770, rank: 2, isToday: false },
      { date: "Dec", pnl: 18900, portfolio: 146670, rank: 1, isToday: false },
      { date: "Jan", pnl: 8507, portfolio: 155177, rank: 1, isToday: true }
    ],
    strategies: [
      {
        day: "Today",
        strategy: "Bullish momentum play on BTC breakout above $87K resistance",
        allocation: { BTC: 40, ETH: 30, SOL: 20, XRP: 5, BNB: 5 },
        leverage: "5x avg",
        confidence: 85
      },
      {
        day: "Yesterday", 
        strategy: "Risk-off positioning before Fed announcement, reduced leverage",
        allocation: { BTC: 35, ETH: 35, SOL: 15, XRP: 10, BNB: 5 },
        leverage: "3x avg",
        confidence: 72
      }
    ],
    // Mock data for multi-agent comparison
    agentComparison: [
      { date: "Jan 1", QuantumTrader: 98795, AlphaBot: 97200, TrendMaster: 99100, CryptoGuru: 96800, RiskMinimizer: 98500 },
      { date: "Jan 2", QuantumTrader: 99685, AlphaBot: 98100, TrendMaster: 98900, CryptoGuru: 97200, RiskMinimizer: 99200 },
      { date: "Jan 3", QuantumTrader: 101252, AlphaBot: 99800, TrendMaster: 100200, CryptoGuru: 98500, RiskMinimizer: 100100 },
      { date: "Jan 4", QuantumTrader: 100932, AlphaBot: 98900, TrendMaster: 99800, CryptoGuru: 97800, RiskMinimizer: 99900 },
      { date: "Jan 5", QuantumTrader: 103082, AlphaBot: 100200, TrendMaster: 101500, CryptoGuru: 99100, RiskMinimizer: 101800 },
      { date: "Jan 6", QuantumTrader: 103527, AlphaBot: 100800, TrendMaster: 102100, CryptoGuru: 99800, RiskMinimizer: 102200 },
      { date: "Jan 7", QuantumTrader: 105417, AlphaBot: 102500, TrendMaster: 103800, CryptoGuru: 101200, RiskMinimizer: 103900 }
    ],
    // Mock user trades data
    userTrades: {
      positions: [
        { id: 1, agent: "QuantumTrader AI", shares: 150, avgPrice: 1.25, currentPrice: 1.45, pnl: 30.00, pnlPercent: 16.0 },
        { id: 2, agent: "AlphaBot", shares: 75, avgPrice: 0.85, currentPrice: 0.92, pnl: 5.25, pnlPercent: 8.2 }
      ],
      history: [
        { id: 1, date: "Jan 7", action: "BUY", agent: "QuantumTrader AI", shares: 100, price: 1.20, total: 120.00 },
        { id: 2, date: "Jan 6", action: "BUY", agent: "QuantumTrader AI", shares: 50, price: 1.35, total: 67.50 },
        { id: 3, date: "Jan 5", action: "SELL", agent: "AlphaBot", shares: 25, price: 0.95, total: 23.75 },
        { id: 4, date: "Jan 4", action: "BUY", agent: "AlphaBot", shares: 100, price: 0.85, total: 85.00 }
      ]
    }
  };

  // Get performance data based on selected period
  const getPerformanceData = () => {
    switch (performancePeriod) {
      case "W": return agent.weeklyPerformance;
      case "M": return agent.monthlyPerformance;
      default: return agent.dailyPerformance;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Trading
          </Button>
          
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarImage src={agent.avatar} alt={agent.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                {getInitials(agent.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{agent.name}</h1>
                <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                  Rank #{agent.currentRank}
                </Badge>
              </div>
              
              <p className="text-muted-foreground text-lg mb-4 max-w-2xl">
                {agent.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {agent.joinDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>{agent.followers.toLocaleString()} followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>{agent.winRate}% win rate</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80">
                <Star className="w-4 h-4 mr-2" />
                Follow Agent
              </Button>
              <Button size="lg" variant="outline">
                <DollarSign className="w-4 h-4 mr-2" />
                Copy Trade
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="trades">Your Trades</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Total Profit with Rank */}
              <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Total Profit</p>
                    <p className="text-xl font-bold text-yellow-500 mb-1">${agent.totalProfit.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Rank: {agent.currentRank}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Win Rate */}
              <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
                    <p className="text-lg font-bold text-foreground">{agent.wins}/{agent.total}</p>
                    <p className="text-sm text-primary">{agent.winRate}% wins</p>
                  </div>
                </CardContent>
              </Card>

              {/* Top 3 Rate */}
              <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Top 3 Rate</p>
                    <p className="text-lg font-bold text-foreground">{agent.wins}/{agent.total}</p>
                    <p className="text-sm text-primary">{agent.topThreeRate}% wins</p>
                  </div>
                </CardContent>
              </Card>

              {/* Current Rank */}
              <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Current Rank</p>
                    <p className="text-xl font-bold text-orange-600">#{agent.currentRank}</p>
                    <p className="text-xs text-muted-foreground">out of 5</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* P&L Performance Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>P&L Performance</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant={performancePeriod === "D" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setPerformancePeriod("D")}
                    >
                      D
                    </Button>
                    <Button 
                      variant={performancePeriod === "W" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setPerformancePeriod("W")}
                    >
                      W
                    </Button>
                    <Button 
                      variant={performancePeriod === "M" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setPerformancePeriod("M")}
                    >
                      M
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getPerformanceData()}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="date" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip 
                        formatter={(value: any, name: string) => [
                          name === 'pnl' ? `$${value}` : value, 
                          name === 'pnl' ? 'P&L' : name
                        ]}
                        labelFormatter={(label, payload) => {
                          const data = payload?.[0]?.payload;
                          return `${label} - Rank #${data?.rank || 'N/A'}`;
                        }}
                      />
                      <Bar 
                        dataKey="pnl" 
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                        shape={({ payload, ...props }) => (
                          <rect 
                            {...props} 
                            fill={payload.isToday ? "hsl(var(--chart-2))" : "hsl(var(--primary))"}
                          />
                        )}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-6">
            {/* Current Strategy */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Core Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-background/50 rounded-lg">
                    <h4 className="font-medium mb-2">Primary Approach</h4>
                    <p className="text-muted-foreground">{agent.strategy}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-background/50 rounded-lg">
                      <h4 className="font-medium mb-2">Risk Management</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Maximum 5% portfolio at risk per trade</li>
                        <li>• Dynamic position sizing based on volatility</li>
                        <li>• Adaptive leverage (2x-10x based on confidence)</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-background/50 rounded-lg">
                      <h4 className="font-medium mb-2">Entry/Exit Criteria</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Multi-timeframe momentum confirmation</li>
                        <li>• Support/resistance level validation</li>
                        <li>• Trailing stops with profit-taking levels</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Strategy Details */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Strategy Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {agent.strategies.map((strategy, index) => (
                    <div key={index} className="border border-border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-lg">{strategy.day}</h4>
                        <Badge variant="outline" className="text-primary border-primary">
                          {strategy.confidence}% Confidence
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{strategy.strategy}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Portfolio Allocation</h5>
                          <div className="space-y-2">
                            {Object.entries(strategy.allocation).map(([asset, percentage]) => (
                              <div key={asset} className="flex justify-between text-sm">
                                <span>{asset}</span>
                                <span>{percentage}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-2">Trading Parameters</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Average Leverage</span>
                              <span>{strategy.leverage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Risk Level</span>
                              <span className={strategy.confidence > 80 ? 'text-green-600' : strategy.confidence > 60 ? 'text-yellow-600' : 'text-red-600'}>
                                {strategy.confidence > 80 ? 'High' : strategy.confidence > 60 ? 'Medium' : 'Low'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Competition History */}
            <Card>
              <CardHeader>
                <CardTitle>Competition History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agent.dailyPerformance.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          day.rank === 1 ? 'bg-yellow-500 text-black' : 
                          day.rank === 2 ? 'bg-gray-400 text-white' :
                          day.rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          #{day.rank}
                        </div>
                        <div>
                          <p className="font-medium">{day.date}</p>
                          <p className="text-sm text-muted-foreground">
                            Rank #{day.rank} - {day.rank === 1 ? 'Winner' : 'Participant'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${day.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {day.pnl >= 0 ? '+' : ''}${day.pnl}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Portfolio: ${day.portfolio.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agent Comparison */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Portfolio Performance vs Other Agents</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="compare-agents" 
                      checked={compareAgents}
                      onCheckedChange={(checked) => setCompareAgents(checked === true)}
                    />
                    <label htmlFor="compare-agents" className="text-sm font-medium">
                      Compare with other agents
                    </label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {compareAgents ? (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={agent.agentComparison}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="date" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio']} />
                        <Line type="monotone" dataKey="QuantumTrader" stroke="hsl(var(--primary))" strokeWidth={3} name="QuantumTrader AI" />
                        <Line type="monotone" dataKey="AlphaBot" stroke="hsl(var(--chart-2))" strokeWidth={2} name="AlphaBot" />
                        <Line type="monotone" dataKey="TrendMaster" stroke="hsl(var(--chart-3))" strokeWidth={2} name="TrendMaster" />
                        <Line type="monotone" dataKey="CryptoGuru" stroke="hsl(var(--chart-4))" strokeWidth={2} name="CryptoGuru" />
                        <Line type="monotone" dataKey="RiskMinimizer" stroke="hsl(var(--chart-5))" strokeWidth={2} name="RiskMinimizer" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Brain className="w-12 h-12 mx-auto mb-4" />
                    <p>Check "Compare with other agents" to see portfolio performance comparison</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trades" className="space-y-6">
            {/* Your Trades Section */}
            <Card>
              <CardHeader>
                <CardTitle>Your Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={tradesTab} onValueChange={setTradesTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="positions">Positions</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>

                  <TabsContent value="positions" className="mt-6">
                    <div className="space-y-4">
                      {agent.userTrades.positions.map((position) => (
                        <div key={position.id} className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{position.agent}</h4>
                              <p className="text-sm text-muted-foreground">
                                {position.shares} shares @ ${position.avgPrice.toFixed(2)} avg
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Current: ${position.currentPrice.toFixed(2)}</p>
                              <p className={`font-medium ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)} ({position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(1)}%)
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="mt-6">
                    <div className="space-y-4">
                      {agent.userTrades.history.map((trade) => (
                        <div key={trade.id} className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{trade.agent}</h4>
                              <p className="text-sm text-muted-foreground">{trade.date}</p>
                            </div>
                            <div className="text-right">
                              <p className={`font-medium ${trade.action === 'BUY' ? 'text-green-600' : 'text-red-600'}`}>
                                {trade.action} {trade.shares} @ ${trade.price.toFixed(2)}
                              </p>
                              <p className="text-sm text-muted-foreground">Total: ${trade.total.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentProfile;