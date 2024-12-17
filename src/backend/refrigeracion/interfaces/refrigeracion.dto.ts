import { BParam, IParam, SParam, TP as TipoParametro } from "@/backend/parametros/tiposGlobales";

// -------------------------------------------------- class CalefaccionDto --------------------------------------------------

export class RefrigeracionDto {
     tempSinConectarCR:IParam;
     offset:IParam;
     min:IParam;
     max:IParam;
     rango:IParam;
     //configuracion: CalefaccionConfiguracionDto = new CalefaccionConfiguracionDto();
     //influenciaHumedad:CafelaccionInfluenciaHumedadDto = new CafelaccionInfluenciaHumedadDto();
     //valvula3Vias:Valvula3ViasDto = new Valvula3ViasDto();  
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
