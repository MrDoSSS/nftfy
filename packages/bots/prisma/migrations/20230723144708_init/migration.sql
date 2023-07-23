-- CreateTable
CREATE TABLE "Proxy" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,

    CONSTRAINT "Proxy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "proxyId" INTEGER,
    "cookies" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_proxyId_key" ON "User"("proxyId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_proxyId_fkey" FOREIGN KEY ("proxyId") REFERENCES "Proxy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
