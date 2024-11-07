/*
  Warnings:

  - You are about to drop the `parametros1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parametros2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "parametros1";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "parametros2";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Parametros1" (
    "pkid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "valor" TEXT NOT NULL DEFAULT '',
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Parametros2" (
    "pkid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "svalor" TEXT NOT NULL,
    "fvalor" REAL NOT NULL,
    "ivalor" INTEGER NOT NULL,
    "bvalor" BOOLEAN NOT NULL,
    "bigvalor" BIGINT NOT NULL,
    "defaultValue" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "id" ON "Parametros1"("id");
