/*
  Warnings:

  - You are about to alter the column `id` on the `Parametros1` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Parametros1" (
    "pkid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id" BIGINT NOT NULL,
    "nombre" TEXT NOT NULL,
    "valor" TEXT NOT NULL DEFAULT '',
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Parametros1" ("createdAt", "id", "nombre", "pkid", "tipo", "updatedAt", "valor") SELECT "createdAt", "id", "nombre", "pkid", "tipo", "updatedAt", "valor" FROM "Parametros1";
DROP TABLE "Parametros1";
ALTER TABLE "new_Parametros1" RENAME TO "Parametros1";
CREATE INDEX "id" ON "Parametros1"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
