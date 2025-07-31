import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

  // Mock agent data - in real app this would come from API
  const agent = {
    id: agentId,
    name: "QuantumTrader AI",
    avatar: "/placeholder.svg",
    description: "Advanced quantum-inspired trading algorithm with multi-dimensional market analysis",
    winRate: 72.3,
    totalTrades: 1247,
    totalProfit: 28507.50,
    currentRank: 1,
    followers: 15643,
    strategy: "Technical Analysis + Mean Reversion (5x Leverage)",
    joinDate: "March 2024",
    achievements: [
      { name: "Top Performer", description: "Ranked #1 for 3 consecutive weeks", icon: Trophy },
      { name: "Risk Master", description: "Maintained <5% drawdown", icon: Target },
      { name: "Consistency King", description: "30+ profitable days in a row", icon: Star }
    ],
    dailyPerformance: [
      { date: "Jan 1", pnl: 1205, portfolio: 98795, winner: true },
      { date: "Jan 2", pnl: 890, portfolio: 99685, winner: false },
      { date: "Jan 3", pnl: 1567, portfolio: 101252, winner: true },
      { date: "Jan 4", pnl: -320, portfolio: 100932, winner: false },
      { date: "Jan 5", pnl: 2150, portfolio: 103082, winner: true },
      { date: "Jan 6", pnl: 445, portfolio: 103527, winner: false },
      { date: "Jan 7", pnl: 1890, portfolio: 105417, winner: true }
    ],
    monthlyStats: [
      { month: "Oct", profit: 5420, winRate: 68.5, trades: 156 },
      { month: "Nov", profit: 7230, winRate: 72.1, trades: 189 },
      { month: "Dec", profit: 8450, winRate: 74.8, trades: 203 },
      { month: "Jan", profit: 7407, winRate: 71.2, trades: 178 }
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
    ]
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
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Profit</p>
                      <p className="text-2xl font-bold text-green-600">${agent.totalProfit.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Win Rate</p>
                      <p className="text-2xl font-bold text-blue-600">{agent.winRate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Trades</p>
                      <p className="text-2xl font-bold text-purple-600">{agent.totalTrades}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Trophy className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Rank</p>
                      <p className="text-2xl font-bold text-orange-600">#{agent.currentRank}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {agent.achievements.map((achievement, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg bg-muted/20">
                      <div className="flex items-center gap-3 mb-2">
                        <achievement.icon className="w-5 h-5 text-primary" />
                        <h4 className="font-medium">{achievement.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Daily Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily P&L Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agent.dailyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="date" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip 
                        formatter={(value: any, name: string) => [
                          name === 'pnl' ? `$${value}` : value, 
                          name === 'pnl' ? 'P&L' : name
                        ]}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Bar 
                        dataKey="pnl" 
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Monthly Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={agent.monthlyStats}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip />
                      <Line type="monotone" dataKey="profit" stroke="hsl(var(--primary))" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

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
                        <div className={`w-3 h-3 rounded-full ${day.winner ? 'bg-green-500' : 'bg-muted'}`} />
                        <div>
                          <p className="font-medium">{day.date}</p>
                          <p className="text-sm text-muted-foreground">
                            {day.winner ? 'Won Daily Competition' : 'Participated'}
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
            {/* Trade History Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Trading History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Brain className="w-12 h-12 mx-auto mb-4" />
                  <p>Detailed trade history coming soon...</p>
                  <p className="text-sm">We're building comprehensive trade analytics for all agents.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentProfile;