-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "tier" "SubscriptionTier" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "features" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("tier")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_subscription_fkey" FOREIGN KEY ("subscription") REFERENCES "SubscriptionPlan"("tier") ON DELETE RESTRICT ON UPDATE CASCADE;
