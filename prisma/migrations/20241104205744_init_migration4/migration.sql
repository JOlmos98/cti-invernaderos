-- CreateTable
CREATE TABLE "Parameters" (
    "pkid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id" INTEGER NOT NULL,
    "idType" INTEGER NOT NULL,
    "minValue" REAL NOT NULL,
    "maxValue" REAL NOT NULL,
    "dataValue" REAL NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Calefaccion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "calNumber" INTEGER NOT NULL DEFAULT 0,
    "temp" REAL NOT NULL DEFAULT 25.0,
    "offset" REAL NOT NULL DEFAULT 0.0,
    "minRegCal" INTEGER NOT NULL DEFAULT 0,
    "maxRegCal" INTEGER NOT NULL DEFAULT 100,
    "rangoRegCal" REAL NOT NULL DEFAULT 4,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CalefaccionConfiguracion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "disponible" BOOLEAN NOT NULL DEFAULT false,
    "histeresis" REAL NOT NULL DEFAULT 1.0,
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "sondas" TEXT NOT NULL,
    "rele" INTEGER NOT NULL DEFAULT 0,
    "salidaAnalogica" INTEGER NOT NULL DEFAULT 0,
    "modo" INTEGER NOT NULL DEFAULT 0,
    "triac" INTEGER NOT NULL DEFAULT 0,
    "conectado" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Valvula3Vias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activada" BOOLEAN NOT NULL DEFAULT false,
    "releCalentar" INTEGER NOT NULL DEFAULT 0,
    "releEnfriar" INTEGER NOT NULL DEFAULT 0,
    "tiempoPulso" INTEGER NOT NULL DEFAULT 3,
    "tiempoEspera" INTEGER NOT NULL DEFAULT 60,
    "alarmaActiva" BOOLEAN NOT NULL DEFAULT false,
    "numeroPulsos" INTEGER NOT NULL DEFAULT 20,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "parametros1" (
    "pkid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "valor" TEXT NOT NULL DEFAULT '',
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "parametros2" (
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
