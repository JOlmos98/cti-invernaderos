import { IParam, BParam, SParam } from "../parametros/tiposGlobales";

// ========== PARTE 1 IT: INTERFACES ==========

// Interfaces para la configuración de calefacción
export interface ItCalConfig {
    numeroCAL: number;                             // 0 1 2 3 4 5
}

export interface ItCalInfluenciaHumedad {
    influHumOffOn: IParam;                         // Configura si activamos o desactivamos la influencia
    influHumInit: IParam;                          // Humedad inicio influencia
    influHumFin: IParam;                           // Humedad fin influencia
    calInfluHumInit: number;                       // Calculador humedad inicial
    calInfluHumFin: number;                        // Cálculo humedad final
    influHumIncrementoTemperatura: IParam;         // Incremento de temperatura por influencia
    correccionCalefacDesPorHumedad: number;        // Corrección aplicada
}

export interface ItCalVarLocales {
    contadorSegPrimeraEntrada: number;             // Tiempo antes de activar contacto térmico
}

export interface ItCalCalculados {
    tempDeseadaFuncionamiento: number;             // Temperatura deseada con corrección
    tempDeseadaSinCorreccion: number;              // Temperatura deseada antes de corrección
    porcentajeCalculadoFuncionamiento: number;     // Porcentaje calculado de salida
    porcentaje010: number;                         // Porcentaje 0-10 de salida
    infuenciaEstado: number;                       // Estado de influencia
    estadoCalefaccion: BParam;                     // Estado de la calefacción
    estadoContactoRele: BParam;                    // Estado del relé
}

export interface ItCalValvula3Vias {
    estadoMaquina: number;                         // Estado de la máquina
    estadoValvula: EnCalVal3Vias;                  // Estado de la válvula
    contadorTemporal: number;                      // Contador temporal
    estadoAlarma: BParam;                          // Estado de alarma
    contadorPulsosCalentar: number;                // Pulsos calentamiento
    contadorPulsosEnfriar: number;                 // Pulsos enfriamiento
    numeroPulsosSaltaAlarma: IParam;               // Límite para alarma
    alarmaOnOff: IParam;                           // Activar/desactivar alarma
    onOff: IParam;                                 // Estado ON/OFF
    releCalentar: IParam;                          // Relé calentamiento
    releEnfriar: IParam;                           // Relé enfriamiento
    tiempoPulso: IParam;                           // Tiempo por pulso
    tiempoEspera: IParam;                          // Tiempo de espera
}

export interface ItCalefaccion {
    stCalConfig: ItCalConfig;                      // Configuración principal
    stCalInfluenciaHumedad: ItCalInfluenciaHumedad;// Configuración de humedad
    itLocal: ItCalVarLocales;                      // Variables locales
    itCal: ItCalCalculados;                        // Valores calculados
    itValvula3Vias: ItCalValvula3Vias;             // Configuración de la válvula
    disponible: BParam;                            // Disponibilidad
    tempDeseadaSinConectar: IParam;                // Temperatura sin conectar
    tempDeseadaCorreccion: IParam;                 // Corrección de temperatura
    histeresis: IParam;                            // Histeresis
    rango: IParam;                                 // Rango de temperatura
    max: IParam;                                   // Máximo permitido
    min: IParam;                                   // Mínimo permitido
    tipoCalefaccion: IParam;                       // Tipo de calefacción (enum)
    asignaSal010: IParam;                          // Salida 0-10 asignada
    releAsociado: IParam;                          // Relé asociado
    asignaTriac: IParam;                           // TRIAC asignado
    stemp: unknown;                                // «Estructura para la sonda, no definida»
    conectado: IParam;                             // Estado de conexión (enum)
    nombre: SParam;                                // Nombre del módulo
}

// ========== PARTE 2 EN: ENUMS ==========

export enum EnCalConectado {
    EN_CAL_NO_CONECTADO,                           // No conectado
    EN_CAL_CONECTADO_CLIMA_RECINTO,                // Conectado al clima del recinto
    EN_CAL_CONECTADO_ELEMENTOS_MAXIMOS,            // Conectado a elementos máximos
}

export enum EnCalTipo {
    EN_CAL_TIPO_TODO_NADA,                         // -Todo o nada
    EN_CAL_TIPO_SOLO_REGULADA,                     // Solo regulada
    EN_CAL_TIPO_DUAL,                              // Doble función
}

export enum EnCalVal3Vias {
    EN_CAL_VAL_3_VIAS_PARADA,                      // Válvula parada
    EN_CAL_VAL_3_VIAS_CALENTANDO,                  // Válvula calentando
    EN_CAL_VAL_3_VIAS_ENFRIANDO,                   // Válvula enfriando
}

// ========== PARTE 3 FN: FUNCIONES ==========

export function calTiempoSeg(cal: ItCalefaccion): void {
    if (cal.itLocal.contadorSegPrimeraEntrada < 3) {
        cal.itLocal.contadorSegPrimeraEntrada++;    // Incrementa contador si es menor que 3
    }

    if (cal.itValvula3Vias.contadorTemporal !== 0) {
        cal.itValvula3Vias.contadorTemporal--;      // Decrementa contador temporal si no es 0
    }
}

export function calTick(cal: ItCalefaccion): void {
    // «Implementar calCalculaTemperaturaFuncionamiento una vez definida»
    //calCalculaTemperaturaFuncionamiento(cal);     // NO ESTÁ DEFINIDA.

    // «HW_lee_grupo_sondas_temp no está definida, su funcionalidad depende de otros módulos»
    // HW_lee_grupo_sondas_temp(&cal.stemp);

    if (cal.itLocal.contadorSegPrimeraEntrada < 3) {
        return;                                     // Sale si el contador es menor que 3
    }

    // «Las siguientes funciones necesitan ser implementadas»
    // calLocalInfluenciaHumedad(cal);
    // calLocalCalculaEstadosCalefaccion(cal);
    // calLocalCalculaSal010(cal);

    if (cal.disponible.valor === false) {
        cal.itCal.estadoCalefaccion.valor = false;  // Apaga la calefacción si no está disponible
        cal.itCal.estadoContactoRele.valor = false; // Apaga el relé
        cal.itCal.porcentaje010 = 0;                // Resetea el porcentaje a 0
    }

    // «calLocalValvula3ViasTick necesita ser implementada»
    // calLocalValvula3ViasTick(cal);
}

// «Otras funciones serán traducidas e integradas según se avance»
