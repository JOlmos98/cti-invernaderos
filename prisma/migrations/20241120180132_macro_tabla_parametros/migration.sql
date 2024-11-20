/*
  Warnings:

  - You are about to drop the `Calefaccion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CalefaccionConfiguracion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parameters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parametros1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Valvula3Vias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Calefaccion";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CalefaccionConfiguracion";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Parameters";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Parametros1";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Recipe";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Valvula3Vias";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Parametros" (
    "pkid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id" BIGINT NOT NULL,
    "nombre" TEXT NOT NULL,
    "valor" TEXT NOT NULL DEFAULT '',
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "id" ON "Parametros"("id");
