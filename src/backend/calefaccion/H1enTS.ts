import { IParam, BParam, SParam } from "../parametros/tiposGlobales";

// Definiciones de enumerados
enum EnCalConectado {
    CalNoConectado,
    CalConectadoClimaRecinto,
    //CalConectadoCurvaAuxiliar,
    CalConectadoElementosMaximos,
}

enum EnCalTipo {
    CalTipoTodoNada,
    CalTipoSoloRegulada,
    CalTipoDual,
}

enum EnCalVal3Vias {
    EnCalVal3ViasParada,
    EnCalVal3ViasCalentando,
    EnCalVal3ViasEnfriando,
}

// Tipos de estructuras
interface StCalConfig {
    numeroCal: number;
}

interface StCalInfluHumedad {
    influHumOffOn: IParam;
    influHumInit: IParam;
    influHumFin: IParam;

    calInfluHumInit: number;
    calInfluHumFin: number;

    influHumIncrementoTemperatura: IParam;
    correccionCalefacDesPorHumedad: number;
}

interface StCalVarLocales {
    contadorSegPrimeraEntrada: number;
}

interface StCalCalculados {
    tempDeseadaFuncionamiento: number;
    tempDeseadaSinCorreccion: number;

    porcentajeCalculadoFuncionamiento: number;
    porcentaje010: number;

    influenciaEstado: number;

    estadoCalefaccion: BParam;
    estadoContactoRele: BParam;
    //estadoRele2: unknown; // Comentar si no está definido
}

interface StCalValvula3Vias {
    estadoMaquina: number;
    estadoValvula: EnCalVal3Vias;

    contadorTemporal: number;
    estadoAlarma: BParam;
    contadorPulsosCalentar: number;
    contadorPulsosEnfriar: number;

    numeroPulsosSaltaAlarma: IParam;
    alarmaOnOff: IParam;
    onOff: IParam;
    releCalentar: IParam;
    releEnfriar: IParam;
    tiempoPulso: IParam;
    tiempoEspera: IParam;
}

interface StCalefaccion {
    stCalConfig: StCalConfig;
    stCalInfluHumedad: StCalInfluHumedad;
    stLocal: StCalVarLocales;
    stCal: StCalCalculados;
    stValvula3Vias: StCalValvula3Vias;

    disponible: IParam;

    tempDeseadaSinConectar: IParam;
    tempDeseadaCorreccion: IParam;

    histeresis: IParam;

    rango: IParam;

    max: IParam;
    min: IParam;

    tipoCalefaccion: IParam;

    asignaSal010: IParam;

    releAsociado: IParam;

    asignaTriac: IParam;

    stemp: any; // Sustituir por el tipo correcto si está definido

    conectado: IParam;

    //switchPanelControl: unknown; // Comentar si no está definido

    nombre: SParam;
}

// Declaración de funciones
function calTiempoSeg(cal: StCalefaccion): void {
    // Implementar lógica
}

function calTick(cal: StCalefaccion): void {
    // Implementar lógica
}

function calCalculaTemperaturaFuncionamiento(cal: StCalefaccion): void {
    // Implementar lógica
}

function calCalculaValoresInfluenciaHumedad(cal: StCalefaccion): void {
    // Implementar lógica
}
