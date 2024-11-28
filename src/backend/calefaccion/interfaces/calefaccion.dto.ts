import { BParam, IParam, SParam, TP as TipoParametro } from "@/backend/parametros/tiposGlobales";

//No utilizada
class CafelaccionInfluenciaHumedadDto {
}

// Inicializar en el constructor los valores para no tener problemas de null o undefined y utilizar modo strict

// -------------------------------------------------- class CalefaccionDto --------------------------------------------------

export class CalefaccionDto {
     tempSinConectarCR:IParam;
     offset:IParam;
     min:IParam;
     max:IParam;
     rango:IParam;
     configuracion: CalefaccionConfiguracionDto = new CalefaccionConfiguracionDto();
     influenciaHumedad:CafelaccionInfluenciaHumedadDto = new CafelaccionInfluenciaHumedadDto();
     valvula3Vias:Valvula3ViasDto = new Valvula3ViasDto();  
     tempActual:IParam;  

     constructor() {
          this.tempSinConectarCR = {id:BigInt(0),tipo:TipoParametro.REAL,min:0,max:100,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.offset = {id:BigInt(0),tipo:TipoParametro.REAL,min:0,max:100,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.min = {id:BigInt(0),tipo:TipoParametro.REAL,min:0,max:100,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.max = {id:BigInt(0),tipo:TipoParametro.REAL,min:0,max:100,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.rango = {id:BigInt(0),tipo:TipoParametro.REAL,min:0,max:100,valor:0,reset:0,tipoImportacion:0,nombre:""} 
          this.tempActual={id:BigInt(0),tipo:TipoParametro.REAL,min:0,max:100,valor:0,reset:0,tipoImportacion:0,nombre:""}         
     }
}

// -------------------------------------------------- class CalefaccionConfiguracionDto --------------------------------------------------

class CalefaccionConfiguracionDto {
     disponible:BParam;
     histeresis:IParam;
     tipoCalefaccion:IParam;
     sondasTemp:number[] = [];
     releAsignado:IParam;
     salidaAnalogica:IParam;
     modo:IParam;
     triacAsignado:IParam;
     conectado:BParam;
     nombre:SParam;
     passRequerida:BParam;
     pass:SParam;

     constructor() {
          this.disponible = {id:0n,tipo:0,valor:false,reset:0,tipoImportacion:0,nombre:""}
          this.histeresis = {id:0n,tipo:0,min:0,max:0,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.tipoCalefaccion = {id:0n,tipo:0,min:0,max:0,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.releAsignado = {id:0n,tipo:0,min:0,max:0,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.salidaAnalogica = {id:0n,tipo:0,min:0,max:0,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.modo = {id:0n,tipo:0,min:0,max:0,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.triacAsignado = {id:0n,tipo:0,min:0,max:0,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.conectado = {id:0n,tipo:0,valor:false,reset:0,tipoImportacion:0,nombre:""}
          this.nombre = {id:0n,tipo:0,valor:"",reset:0,tipoImportacion:0,nombre:""}
          this.passRequerida = {id:0n,tipo:0,valor:false,reset:0,tipoImportacion:0,nombre:""}
          this.pass = {id:0n,tipo:0,valor:"",reset:0,tipoImportacion:0,nombre:""}
     }
}

// -------------------------------------------------- class Valvula3ViasDto --------------------------------------------------

 class Valvula3ViasDto {
     activada:BParam;
     releCalentar:IParam;
     releEnfriar:IParam;
     tiempoPulso:IParam;
     tiempoEspera:IParam;
     alarmaOnOff:BParam;
     numeroPulsosSaltaAlarma:IParam;

     constructor() {
          this.activada = {id:0n,tipo:0,valor:false,reset:0,tipoImportacion:0,nombre:""}
          this.releCalentar = {id:0n,tipo:0,min:0,max:0,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.releEnfriar = {id:0n,tipo:0,min:0,max:0,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.tiempoPulso = {id:0n,tipo:0,min:0,max:0,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.tiempoEspera = {id:0n,tipo:0,min:0,max:0,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.alarmaOnOff = {id:0n,tipo:0,valor:false,reset:0,tipoImportacion:0,nombre:""}
          this.numeroPulsosSaltaAlarma = {id:0n,tipo:0,min:0,max:0,valor:0,reset:0,tipoImportacion:0,nombre:""}
          this.numeroPulsosSaltaAlarma = {id:0n,tipo:0,min:0,max:0,valor:0,reset:0,tipoImportacion:0,nombre:""}
     }
} 

