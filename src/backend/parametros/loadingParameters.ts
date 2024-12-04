
import { calefaccion, NUM_CALEFACCIONES } from "../calefaccion/funcionalidad/calefaccion";
import { globals } from "../globals/globals";
import { loadParam as loadParam, setCounterLevel } from "./paramLoad";
import { TP } from './tiposGlobales';

//Carga de todos los datos
/*
     Con esta función, una vez construidos los objetos calefaccion:calefaccionDto, 
     se cargarán los datos con el método loadParam.

     Esta función se llama en el archivo app/layout.tsx
*/
export const LoadingAllParams = () => { 
     //Proteccion para que no se vuelva a ejecutar en el inicio
     if (globals.loadedParameters) 
          return;
     globals.loadedParameters = true;
     
     console.log("Cargando...");
     setCounterLevel(0);
     for (let i = 0; i < NUM_CALEFACCIONES; i++) {
          setCounterLevel(1);
          
          loadParam(calefaccion[i].tempSinConectarCR,{tipo:TP.REAL,min:0,max:60.0,valor:25.0,reset:0,tipoImportacion:0,nombre:"1. tempSinConectarCR Cal:"+(i+1)} );
          loadParam(calefaccion[i].offset,{tipo:TP.REAL,min:0,max:20,valor:0,reset:0,tipoImportacion:0,nombre:"2. offset Cal:"+(i+1)});
          loadParam(calefaccion[i].min,{tipo:TP.INTEGER,min:0,max:100,valor:0,reset:0,tipoImportacion:0,nombre:"3. min Cal:"+(i+1)} );
          loadParam(calefaccion[i].max,{tipo:TP.INTEGER,min:0,max:100,valor:100,reset:0,tipoImportacion:0,nombre:"4. max Cal:"+(i+1)});
          loadParam(calefaccion[i].rango,{tipo:TP.REAL,min:0,max:15,valor:4.0,reset:0,tipoImportacion:0, nombre:"5. rango Cal:"+(i+1)});
          loadParam(calefaccion[i].configuracion.disponible,{tipo:TP.BOOLEAN,valor:false,reset:0,tipoImportacion:0,nombre:"6. configuracion.disponible Cal:"+(i+1)});
          loadParam(calefaccion[i].configuracion.histeresis,{tipo:TP.REAL,min:0,max:10,valor:1,reset:0,tipoImportacion:0,nombre:"7. configuracion.histeresis Cal:"+(i+1)});
          loadParam(calefaccion[i].configuracion.tipoCalefaccion,{tipo:TP.INTEGER,min:0,max:10,valor:0,reset:0,tipoImportacion:0,nombre:"8. configuracion.tipoCalefaccion Cal:"+(i+1)});
          loadParam(calefaccion[i].configuracion.releAsignado,{tipo:TP.INTEGER,min:0,max:10,valor:0,reset:0,tipoImportacion:0,nombre:"9. configuracion.releAsignado Cal:"+(i+1)});
          loadParam(calefaccion[i].configuracion.salidaAnalogica,{tipo:TP.INTEGER,min:0,max:20,valor:0,reset:0,tipoImportacion:0,nombre:"10. configuracion.salidaAnalogica Cal:"+(i+1)});
          loadParam(calefaccion[i].configuracion.modo,{tipo:TP.INTEGER,min:0,max:1,valor:0,  reset:0,tipoImportacion:0,nombre:"11. configuracion.modo Cal:"+(i+1)});
          loadParam(calefaccion[i].configuracion.triacAsignado,{tipo:TP.INTEGER,min:0,max:1,valor:0,reset:0,tipoImportacion:0,nombre:"12. configuracion.triacAsignado Cal:"+(i+1)});
          loadParam(calefaccion[i].configuracion.conectado,{tipo:TP.BOOLEAN,valor:false,reset:0,tipoImportacion:0,nombre:"13. configuracion.conectado Cal:"+(i+1)});
          loadParam(calefaccion[i].valvula3Vias.activada,{tipo:TP.BOOLEAN,valor:false,reset:0,tipoImportacion:0,nombre:"14. valvula3Vias.activada Cal:"+(i+1)});
          loadParam(calefaccion[i].valvula3Vias.releCalentar,{tipo:TP.INTEGER,min:0,max:10,valor:0,reset:0,tipoImportacion:0,nombre:"15. valvula3Vias.releCalentar Cal:"+(i+1)});
          loadParam(calefaccion[i].valvula3Vias.releEnfriar,{tipo:TP.INTEGER,min:0,max:10,valor:0,reset:0,tipoImportacion:0,nombre:"16. valvula3Vias.releEnfriar Cal:"+(i+1)});
          loadParam(calefaccion[i].valvula3Vias.tiempoPulso,{tipo:TP.INTEGER,min:0,max:10,valor:3,reset:0,tipoImportacion:0,nombre:"17. valvula3Vias.tiempoPulso Cal:"+(i+1)});
          loadParam(calefaccion[i].valvula3Vias.tiempoEspera,{tipo:TP.INTEGER,min:0,max:10,valor:60,reset:0,tipoImportacion:0,nombre:"18. valvula3Vias.tiempoEspera Cal:"+(i+1)});
          loadParam(calefaccion[i].valvula3Vias.alarmaOnOff,{tipo:TP.BOOLEAN,valor:false,reset:0,tipoImportacion:0,nombre:"19. valvula3Vias.alarmaOnOff Cal:"+(i+1)});
          loadParam(calefaccion[i].valvula3Vias.numeroPulsosSaltaAlarma,{tipo:TP.INTEGER,min:0,max:10,valor:20,reset:0,tipoImportacion:0,nombre:"20. valvula3Vias.numeroPulsosSaltaAlarma Cal:"+(i+1)});
          loadParam(calefaccion[i].configuracion.passRequerida,{tipo:TP.BOOLEAN,valor:false,reset:0,tipoImportacion:0,nombre:"21. configuracion.passReq Cal:"+(i+1)});
          loadParam(calefaccion[i].configuracion.pass,{tipo:TP.STRING,valor:"",reset:0,tipoImportacion:0,nombre:"22. configuracion.pass Cal:"+(i+1)});
          loadParam(calefaccion[i].tempActual,{tipo:TP.REAL,min:0,max:60.0,valor:15.0,reset:0,tipoImportacion:0,nombre:"23. tempActual Cal:"+(i+1)} );

          
          for (let j = 0; j < NUM_CALEFACCIONES; j++) { //En vez de NUM_CALEFACCIONES supongo que sería otra cosa.
               setCounterLevel(2);

               //loadParam...
               //loadParam...
               //loadParam...

               for (let k = 0; k < NUM_CALEFACCIONES; k++) {
                    setCounterLevel(3);

                    //loadParam...
                    //loadParam...
                    //loadParam...

               }
          }

     }
     setCounterLevel(0);

     console.log("Carga de datos finalizada",)
}


     
     
