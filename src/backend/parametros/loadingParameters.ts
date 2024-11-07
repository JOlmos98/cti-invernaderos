


import { calefaccion } from "../calefaccion/funcionalidad/calefaccion";
// import { CalefaccionDto2 } from "../calefaccion/interfaces/calefaccion.dto";
import { globals } from "../globals/globals";
import { loadParam4, setCounterLevel } from "./paramLoad";
import { TP } from './tiposGlobales';



//Carga de datos de todos los datos


export const LoadingAllParams = () => {

     

     //Proteccion para que no se vuelva a ejecutar en el inicio
     if (globals.loadedParameters) 
          return;

     globals.loadedParameters = true;
       

     setCounterLevel(0);
     for (let i = 0; i < 3; i++) {
          setCounterLevel(1);
         
          loadParam4(calefaccion[i].tempSinConectarCR,{tipo:TP.REAL,min:0,max:60.0,valor:25.0,reset:0,tipoImportacion:0,nombre:"1"} );
          loadParam4(calefaccion[i].offset,{tipo:TP.REAL,min:0,max:20,valor:0,reset:0,tipoImportacion:0,nombre:"2"});
          
          loadParam4(calefaccion[i].min,{tipo:TP.INTEGER,min:0,max:100,valor:0,reset:0,tipoImportacion:0,nombre:"3"} );
          loadParam4(calefaccion[i].max,{tipo:TP.INTEGER,min:0,max:100,valor:100,reset:0,tipoImportacion:0,nombre:"4"});
          loadParam4(calefaccion[i].rango,{tipo:TP.REAL,min:0,max:15,valor:4.0,reset:0,tipoImportacion:0, nombre:"5"});
          loadParam4(calefaccion[i].configuracion.disponible,{tipo:TP.BOOLEAN,valor:false,reset:0,tipoImportacion:0,nombre:"6"});
          loadParam4(calefaccion[i].configuracion.histeresis,{tipo:TP.REAL,min:0,max:10,valor:1,reset:0,tipoImportacion:0,nombre:"7"});
          loadParam4(calefaccion[i].configuracion.tipoCalefaccion,{tipo:TP.INTEGER,min:0,max:10,valor:0,reset:0,tipoImportacion:0,nombre:"8"});
          // loadPa4am2(calefaccion[i].configuracion.sondas[0], idc());
          loadParam4(calefaccion[i].configuracion.releAsignado,{tipo:TP.INTEGER,min:0,max:10,valor:0,reset:0,tipoImportacion:0,nombre:"9"});
          loadParam4(calefaccion[i].configuracion.salidaAnalogica,{tipo:TP.INTEGER,min:0,max:20,valor:0,reset:0,tipoImportacion:0,nombre:"10"});
          loadParam4(calefaccion[i].configuracion.modo,{tipo:TP.INTEGER,min:0,max:1,valor:0,  reset:0,tipoImportacion:0,nombre:"11"});
          loadParam4(calefaccion[i].configuracion.triacAsignado,{tipo:TP.INTEGER,min:0,max:1,valor:0,reset:0,tipoImportacion:0,nombre:"12"});
          loadParam4(calefaccion[i].configuracion.conectado,{tipo:TP.BOOLEAN,valor:false,reset:0,tipoImportacion:0,nombre:"13"});
          loadParam4(calefaccion[i].valvula3Vias.activada,{tipo:TP.BOOLEAN,valor:false,reset:0,tipoImportacion:0,nombre:"14"});
          loadParam4(calefaccion[i].valvula3Vias.releCalentar,{tipo:TP.INTEGER,min:0,max:10,valor:0,reset:0,tipoImportacion:0,nombre:"15"});
          loadParam4(calefaccion[i].valvula3Vias.releEnfriar,{tipo:TP.INTEGER,min:0,max:10,valor:0,reset:0,tipoImportacion:0,nombre:"16"});
          loadParam4(calefaccion[i].valvula3Vias.tiempoPulso,{tipo:TP.INTEGER,min:0,max:10,valor:3,reset:0,tipoImportacion:0,nombre:"17"});
          loadParam4(calefaccion[i].valvula3Vias.tiempoEspera,{tipo:TP.INTEGER,min:0,max:10,valor:60,reset:0,tipoImportacion:0,nombre:"18"});
          loadParam4(calefaccion[i].valvula3Vias.alarmaOnOff,{tipo:TP.BOOLEAN,valor:false,reset:0,tipoImportacion:0,nombre:"19"});
          loadParam4(calefaccion[i].valvula3Vias.numeroPulsosSaltaAlarma,{tipo:TP.INTEGER,min:0,max:10,valor:20,reset:0,tipoImportacion:0,nombre:"20"});
       
 
     }
     setCounterLevel(0);

     //... more parameters

     //RESOLVER EL TEMA DE LA DIRECCION ****
     console.log("Carga de datos finalizada",)

}


     
     
