// Interfaces and Enums
enum EstadoCalefaccion {
    OFF = "OFF",
    ON = "ON",
}

enum EstadoGrupo {
    GRUPO_SONDA_OK = "GRUPO_SONDA_OK",
}

enum EstadoMaquina {
    EN_CAL_VAL_3_VIAS_CALENTANDO = "CALENTANDO",
    EN_CAL_VAL_3_VIAS_ENFRIANDO = "ENFRIANDO",
    EN_CAL_VAL_3_VIAS_PARADA = "PARADA",
}

interface Calefaccion {
    stLocal: {
        contadorSegPrimeraEntrada: number;
    };
    stValvula3Vias: {
        contadorTemporal: number;
        estadoMaquina: EstadoMaquina;
        estadoAlarma: EstadoCalefaccion;
        releCalentar: { val: string };
        releEnfriar: { val: string };
        tiempoPulso: { val: number };
        tiempoEspera: { val: number };
        onOff: { val: string };
    };
    disponible: { val: string };
    stCal: {
        estadoCalefaccion: EstadoCalefaccion;
        estadoContactoRele: EstadoCalefaccion;
        porcentaje010: number;
        tempDeseadaFuncionamiento: number;
        tempDeseadaSinCorreccion: number;
        influenciaEstado: number;
    };
    histeresis: { val: number };
    tempDeseadaSinConectar: { val: number };
    tempDeseadaCorreccion: { val: number };
    rango: { val: number };
    max: { val: number };
    min: { val: number };
    conectado: { val: string };
    stemp: {
        tempFloat: number;
        estadoGrupo: EstadoGrupo;
    };
}

// Main functions
function calTiempoSeg(cal: Calefaccion): void {
    if (cal.stLocal.contadorSegPrimeraEntrada < 3) {
        cal.stLocal.contadorSegPrimeraEntrada++;
    }

    if (cal.stValvula3Vias.contadorTemporal !== 0) {
        cal.stValvula3Vias.contadorTemporal--;
    }
}

function calTick(cal: Calefaccion): void {
    calCalculaTemperaturaFuncionamiento(cal);

    if (cal.stLocal.contadorSegPrimeraEntrada < 3) {
        return;
    }

    calLocalInfluenciaHumedad(cal);
    calLocalCalculaEstadosCalefaccion(cal);
    calLocalCalculaSal010(cal);

    if (cal.disponible.val === "OFF") {
        cal.stCal.estadoCalefaccion = EstadoCalefaccion.OFF;
        cal.stCal.estadoContactoRele = EstadoCalefaccion.OFF;
        cal.stCal.porcentaje010 = 0;
    }

    //calLocalValvula3ViasTick(cal); //Función no declarada porque está comentada en el .h
}

function calLocalCalculaEstadosCalefaccion(cal: Calefaccion): void {
    if (cal.stemp.estadoGrupo !== EstadoGrupo.GRUPO_SONDA_OK) {
        cal.stCal.estadoCalefaccion = EstadoCalefaccion.OFF;
        cal.stCal.estadoContactoRele = EstadoCalefaccion.OFF;
        return;
    }

    switch (cal.stCal.estadoCalefaccion) {
        case EstadoCalefaccion.OFF:
            if (
                cal.stemp.tempFloat <
                cal.stCal.tempDeseadaFuncionamiento - cal.histeresis.val
            ) {
                cal.stCal.estadoCalefaccion = EstadoCalefaccion.ON;
                cal.stCal.estadoContactoRele = EstadoCalefaccion.ON;
            }
            break;
        case EstadoCalefaccion.ON:
            if (cal.stemp.tempFloat > cal.stCal.tempDeseadaFuncionamiento) {
                cal.stCal.estadoCalefaccion = EstadoCalefaccion.OFF;
                cal.stCal.estadoContactoRele = EstadoCalefaccion.OFF;
            }
            break;
    }
}

function calLocalCalculaSal010(cal: Calefaccion): void {
    if (cal.stCal.tempDeseadaFuncionamiento <= cal.stemp.tempFloat) {
        cal.stCal.porcentaje010 = cal.min.val;
        return;
    }

    let tempF = cal.stCal.tempDeseadaFuncionamiento - cal.rango.val;
    if (cal.stemp.tempFloat < tempF) {
        cal.stCal.porcentaje010 = cal.max.val;
    } else {
        const deltaTemp = cal.stCal.tempDeseadaFuncionamiento - cal.stemp.tempFloat;
        const deltaPercentage =
            ((deltaTemp * 100) / cal.rango.val) * (cal.max.val - cal.min.val) / 100;
        cal.stCal.porcentaje010 = cal.min.val + deltaPercentage;
    }

    if (cal.stemp.estadoGrupo !== EstadoGrupo.GRUPO_SONDA_OK) {
        cal.stCal.porcentaje010 = 0;
    }
}

function calLocalInfluenciaHumedad(cal: Calefaccion): void {
    // Implementation for humidity influence logic
    // Adjust values based on requirements
}

function calCalculaTemperaturaFuncionamiento(cal: Calefaccion): void {
    switch (cal.conectado.val) {
        case "CAL_NO_CONECTADO":
            cal.stCal.tempDeseadaFuncionamiento =
                cal.tempDeseadaSinConectar.val + cal.tempDeseadaCorreccion.val;
            break;
        case "CAL_CONECTADO_CLIMA_RECINTO":
            cal.stCal.tempDeseadaFuncionamiento =
                cal.tempDeseadaCorreccion.val + cal.tempDeseadaSinConectar.val;
            break;
        default:
            break;
    }
}
