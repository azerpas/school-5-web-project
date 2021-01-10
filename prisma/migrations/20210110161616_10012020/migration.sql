-- CreateEnum
CREATE TYPE "t_role" AS ENUM ('ROLE_ADMIN', 'ROLE_USER', 'ROLE_INFLUENCER', 'ROLE_BRAND');

-- CreateEnum
CREATE TYPE "t_status" AS ENUM ('proposed', 'done', 'canceled', 'refused', 'accepted');

-- CreateEnum
CREATE TYPE "t_unite" AS ENUM ('video', 'minute', 'hour', 'photo', 'month', 'publication');

-- CreateTable
CREATE TABLE "Keyword" (
"id" SERIAL,
    "name" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
"id" SERIAL,
    "price" DECIMAL(65,30),
    "unit" "t_unite",
    "custom" BOOLEAN,
    "id_user" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Platform" (
"id" SERIAL,
    "name" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
"id" SERIAL,
    "release_date" TIMESTAMP(3),
    "statut" "t_status",
    "id_influencer" INTEGER NOT NULL,
    "id_offer" INTEGER NOT NULL,
    "id_brand" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "name" TEXT,
    "firstname" TEXT,
    "password" TEXT,
    "email" TEXT,
    "bio" TEXT,
    "url" TEXT,
    "roles" "t_role",

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
"id" SERIAL,
    "url" TEXT,
    "name" TEXT,
    "id_user" INTEGER NOT NULL,
    "thumbnail" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KeywordToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PlatformToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Proposal.id_offer_unique" ON "Proposal"("id_offer");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_KeywordToUser_AB_unique" ON "_KeywordToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_KeywordToUser_B_index" ON "_KeywordToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlatformToUser_AB_unique" ON "_PlatformToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PlatformToUser_B_index" ON "_PlatformToUser"("B");

-- AddForeignKey
ALTER TABLE "Offer" ADD FOREIGN KEY("id_user")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD FOREIGN KEY("id_brand")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD FOREIGN KEY("id_influencer")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD FOREIGN KEY("id_offer")REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD FOREIGN KEY("id_user")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToUser" ADD FOREIGN KEY("A")REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToUser" ADD FOREIGN KEY("B")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlatformToUser" ADD FOREIGN KEY("A")REFERENCES "Platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlatformToUser" ADD FOREIGN KEY("B")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
