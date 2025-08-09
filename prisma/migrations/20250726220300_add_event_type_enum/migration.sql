-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('TRANSFER', 'MINT', 'BURN', 'APPROVAL', 'SWAP', 'OTHER');

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "totalSupply" TEXT,
    "holderCount" INTEGER NOT NULL DEFAULT 0,   
    "volume" TEXT DEFAULT '0',
    "decimals" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenEvent" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "from" TEXT,
    "to" TEXT,
    "txHash" TEXT NOT NULL,
    "blockNumber" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenEvent_pkey" PRIMARY KEY ("id")
);

-- Create UserTier table for access control
CREATE TABLE IF NOT EXISTS "UserTier" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "tier" TEXT NOT NULL DEFAULT 'basic',
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "apiKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserTier_pkey" PRIMARY KEY ("id")
);

-- Create WalletCluster table for advanced analytics
CREATE TABLE IF NOT EXISTS "WalletCluster" (
    "id" TEXT NOT NULL,
    "clusterId" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "behavior" TEXT,
    "confidence" DECIMAL(5,4),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WalletCluster_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "Token_address_key" ON "Token"("address");

-- AddForeignKey
ALTER TABLE "TokenEvent" ADD CONSTRAINT "TokenEvent_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
