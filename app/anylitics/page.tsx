"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TrendingUp, TrendingDown, Users, Activity, Search, Copy, ExternalLink, DollarSign, BarChart3, PieChart, AlertCircle, CheckCircle } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

interface AnalysisResult {
  address: string
  tokenInfo: any
  isContract: boolean
  contractName: string
  recentTransfers: any[]
  metrics: {
    uniqueAddresses: number
    transfers24h: number
    volume24h: string
    totalTransfers: number
  }
  lastUpdated: string
  rateLimitInfo: {
    remaining: string
    resetTime: string
  }
}

export default function AnalyticsPage() {
  const searchParams = useSearchParams()
  const [contractAddress, setContractAddress] = useState(searchParams?.get('address') || "")
  const [userTier] = useState<"basic" | "pro" | "enterprise">("enterprise")
  const [loading, setLoading] = useState(false)
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyzeContract = async () => {
    if (!contractAddress) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: contractAddress }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze contract')
      }

      setAnalysisData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (contractAddress && /^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
      analyzeContract()
    }
  }, [])

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
  }

  const formatValue = (value: string, decimals: number = 18) => {
    const num = parseFloat(value) / Math.pow(10, decimals)
    return num.toLocaleString(undefined, { maximumFractionDigits: 6 })
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/placeholder.svg?height=40&width=40" 
              alt="Avalanche Logo" 
              width={40} 
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold text-gray-900">AVAX Analytics</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant={userTier === "enterprise" ? "destructive" : "default"}>
              {userTier.charAt(0).toUpperCase() + userTier.slice(1)} Tier
            </Badge>
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Real-Time Contract Analysis</CardTitle>
            <CardDescription>
              Enter any Avalanche contract address to get live blockchain data via Snowtrace API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Enter contract address (0x...)"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && analyzeContract()}
              />
              <Button onClick={analyzeContract} disabled={loading || !contractAddress}>
                <Search className="h-4 w-4 mr-2" />
                {loading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
            
            {/* Rate Limit Info */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Using Snowtrace API with rate limiting (5 calls/minute). Real blockchain data only.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card className="mb-8">
            <CardContent className="py-8">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                <p>Fetching real blockchain data from Snowtrace API...</p>
                <p className="text-sm text-gray-600">This may take a moment due to rate limiting</p>
                <Progress value={65} className="w-full max-w-md mx-auto" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Alert className="mb-8" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error: {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Analysis Results */}
        {analysisData && !loading && (
          <>
            {/* Contract Overview */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      {analysisData.tokenInfo?.tokenName || analysisData.contractName || 'Contract'}
                      {analysisData.tokenInfo?.symbol && (
                        <span className="text-lg text-gray-600">({analysisData.tokenInfo.symbol})</span>
                      )}
                      {analysisData.isContract && (
                        <Badge variant="outline" className="ml-2">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified Contract
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <span className="font-mono text-sm">{analysisData.address}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyAddress(analysisData.address)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <a 
                        href={`https://snowtrace.io/address/${analysisData.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {analysisData.tokenInfo ? 'ERC-20 Token' : 'Smart Contract'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {analysisData.metrics.uniqueAddresses.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Unique Addresses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {analysisData.metrics.transfers24h.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">24h Transfers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {analysisData.metrics.totalTransfers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Transfers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {analysisData.tokenInfo?.totalSupply ? 
                        formatValue(analysisData.tokenInfo.totalSupply, parseInt(analysisData.tokenInfo.divisor || '18')) :
                        'N/A'
                      }
                    </div>
                    <div className="text-sm text-gray-600">Total Supply</div>
                  </div>
                </div>

                {/* Token Info */}
                {analysisData.tokenInfo && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Token Information</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Type:</span> {analysisData.tokenInfo.tokenType}
                      </div>
                      <div>
                        <span className="text-gray-600">Decimals:</span> {analysisData.tokenInfo.divisor}
                      </div>
                      {analysisData.tokenInfo.website && (
                        <div>
                          <span className="text-gray-600">Website:</span>{' '}
                          <a href={analysisData.tokenInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {analysisData.tokenInfo.website}
                          </a>
                        </div>
                      )}
                      {analysisData.tokenInfo.tokenPriceUSD && (
                        <div>
                          <span className="text-gray-600">Price:</span> ${analysisData.tokenInfo.tokenPriceUSD}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analytics Tabs */}
            <Tabs defaultValue="transfers" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="transfers">
                  <Activity className="h-4 w-4 mr-2" />
                  Recent Transfers
                </TabsTrigger>
                <TabsTrigger value="holders">
                  <Users className="h-4 w-4 mr-2" />
                  Holders
                </TabsTrigger>
                <TabsTrigger value="traders">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  P&L Analysis
                </TabsTrigger>
                <TabsTrigger value="clusters">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Advanced
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transfers">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transfers</CardTitle>
                    <CardDescription>
                      Latest {analysisData.recentTransfers.length} transfers from Snowtrace API
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analysisData.recentTransfers.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Hash</TableHead>
                            <TableHead>From</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {analysisData.recentTransfers.map((tx, index) => (
                            <TableRow key={tx.hash || index}>
                              <TableCell className="font-mono text-sm">
                                <a 
                                  href={`https://snowtrace.io/tx/${tx.hash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  {tx.hash?.slice(0, 10)}...
                                </a>
                              </TableCell>
                              <TableCell className="font-mono text-sm">
                                {tx.from?.slice(0, 6)}...{tx.from?.slice(-4)}
                              </TableCell>
                              <TableCell className="font-mono text-sm">
                                {tx.to?.slice(0, 6)}...{tx.to?.slice(-4)}
                              </TableCell>
                              <TableCell>
                                {formatValue(tx.value, parseInt(tx.tokenDecimal || '18'))} {tx.tokenSymbol}
                              </TableCell>
                              <TableCell>{formatTimestamp(tx.timeStamp)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Activity className="h-12 w-12 mx-auto mb-4" />
                        <p>No recent transfers found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="holders">
                <Card>
                  <CardContent className="py-12 text-center">
                    <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Holder Analysis</h3>
                    <p className="text-gray-600 mb-4">
                      Detailed holder analysis requires additional API calls. 
                      {analysisData.metrics.uniqueAddresses} unique addresses found in recent transfers.
                    </p>
                    <Button onClick={analyzeContract} disabled={loading}>
                      Refresh Data
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="traders">
                {userTier === "basic" ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Upgrade Required</h3>
                      <p className="text-gray-600 mb-4">
                        P&L trader analysis requires Pro or Enterprise tier
                      </p>
                      <Button>Upgrade to Pro</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">P&L Analysis</h3>
                      <p className="text-gray-600 mb-4">
                        Advanced P&L analysis requires additional processing of transaction data.
                        This feature analyzes profit/loss patterns from real blockchain data.
                      </p>
                      <Button disabled>
                        Coming Soon
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="clusters">
                {userTier !== "enterprise" ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Enterprise Feature</h3>
                      <p className="text-gray-600 mb-4">
                        Advanced analytics and wallet clustering available with Enterprise tier
                      </p>
                      <Button>Upgrade to Enterprise</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
                      <p className="text-gray-600 mb-4">
                        Wallet clustering and advanced pattern analysis using real blockchain data.
                        This feature requires extensive data processing.
                      </p>
                      <Button disabled>
                        Coming Soon
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

            {/* API Info */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-sm">Data Source Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Last Updated:</strong> {new Date(analysisData.lastUpdated).toLocaleString()}</p>
                  <p><strong>Data Source:</strong> Snowtrace API (Real Avalanche blockchain data)</p>
                  <p><strong>Rate Limit:</strong> {analysisData.rateLimitInfo.remaining}</p>
                  <p><strong>Contract Address:</strong> <span className="font-mono">{analysisData.address}</span></p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* No Data State */}
        {!analysisData && !loading && !error && (
          <Card>
            <CardContent className="py-12 text-center">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Enter Contract Address</h3>
              <p className="text-gray-600 mb-4">
                Enter any Avalanche EVM contract address above to get real blockchain analytics
              </p>
              <div className="text-sm text-gray-500">
                <p>Examples:</p>
                <p className="font-mono">0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7 (USDt)</p>
                <p className="font-mono">0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E (USDC)</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
