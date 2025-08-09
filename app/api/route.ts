import { snowscan } from "@/lib/blockexplorer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: "Address is required" },
        { status: 400 }
      );
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return NextResponse.json(
        { error: "Invalid address format" },
        { status: 400 }
      );
    }

    console.log(`Analyzing contract: ${address}`);

    const [tokenInfo, recentTransfers, contractSource] =
      await Promise.allSettled([
        snowscan.getTokenInfo(address),
        snowscan.getTokenTransfers(address, undefined, "0", "latest", 1, 50),
        snowscan.getContractSource(address),
      ]);

    const tokenData = tokenInfo.status === "fulfilled" ? tokenInfo.value : null;
    const transfers =
      recentTransfers.status === "fulfilled" ? recentTransfers.value : [];
    const sourceCode =
      contractSource.status === "fulfilled" ? contractSource.value : null;

    const uniqueHolders = new Set();
    const last24Hours = Date.now() - 24 * 60 * 60 * 1000;
    let volume24h = 0;
    let transfers24h = 0;

    transfers.forEach((tx) => {
      const txTime = parseInt(tx.timeStamp) * 1000;
      if (txTime > last24Hours) {
        transfers24h++;
        volume24h += parseFloat(tx.value) || 0;
      }
      if (tx.to) uniqueHolders.add(tx.to.toLowerCase());
      if (tx.from) uniqueHolders.add(tx.from.toLowerCase());
    });

    const analysisResult = {
      address,
      tokenInfo: tokenData,
      isContract: sourceCode?.ContractName ? true : false,
      contractName: sourceCode?.ContractName || "Unknown",
      recentTransfers: transfers.slice(0, 20), // Latest 20 transfers
      metrics: {
        uniqueAddresses: uniqueHolders.size,
        transfers24h,
        volume24h: volume24h.toString(),
        totalTransfers: transfers.length,
      },
      lastUpdated: new Date().toISOString(),
      rateLimitInfo: {
        remaining: "Rate limited to 5 calls/minute",
        resetTime: new Date(Date.now() + 60000).toISOString(),
      },
    };

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("Analysis API error:", error);
    return NextResponse.json(
      {
        error: "Failed to analyze contract",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { error: "Address parameter required" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Use POST method for analysis" },
    { status: 405 }
  );
}
