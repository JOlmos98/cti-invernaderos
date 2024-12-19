import { setTempActualTick} from "@/lib/actionsCalefaccion";
import { calefaccion} from "./calefaccion";
import { globals } from "../../globals/globals";

export let contadorSegundos:number = 0;
export let tempExcedida:boolean=false;
export let contadorCalentamiento:number=0;
// -------------------- evaularTempActual ↓ --------------------
/*

    Esta función se ejecuta cada segundo. Con un contador haremos que
    evalue cada tres segundos, al evaluar comprueba si la tempActual es menor
    menor que 22 (esto posteriormente será la variable tempDesada +- offset y - histéresis).
    Si es menor que 24 dirá que la calefacción se enciende porque ha alcanzado 
    el límite por debajo (teniendo en cuenta la histéresis) y se enciende y haremos 
    imprima por consola console.error("Calentando ${segundos}"); hsta llegar a 5 segundos
    calentando que establecerá la temperatura en 25.

*/
export function evaluarTempActual(idCal: number, valor: number){
    if (globals.resetContadorEvaluarCal===false) contadorSegundos=0;
    globals.resetContadorEvaluarCal=true;

    contadorSegundos++;
    if (contadorSegundos>=3){
        console.log("Calefacción", (idCal+1), `Evaluamos temperatura (han pasado 3 segundos).\nLa temperatura actual es: ${valor}`); 
        valor<22 ? tempExcedida=true : tempExcedida=false;
        contadorSegundos=0;
    } 

    if (tempExcedida) {
        console.error("Calefacción", (idCal+1), "Temperatura excedida, calentando.")
        contadorCalentamiento++;
        console.error("Calefacción", (idCal+1), `Segundos calentando: ${contadorCalentamiento}`);
        if (contadorCalentamiento>=5){
            setTempActualTick(idCal, 25);
            calefaccion[idCal].tempActual.valor=25; //Reiniciar el valor local
            console.log("Calefacción", (idCal+1), `Temperatura restablecida en 25, apagando calefacción.`);
            contadorCalentamiento=0;
        }
    } else console.log("Calefacción", (idCal+1), "Temperatura correcta y no excedida: ", valor);

    console.log(".\n.\n.")
    /*
    console.log("Valor actual: "+valor);
    if (valor>=30) {
        setTempActualTick(idCal, 15);
        calefaccion[idCal].tempActual.valor=15; //Reiniciar el valor local
    }
    */
}

/*
    Esta función recibe por parámetro el id de la calefacción y 
    el valor de su temperatura, si es 30 o mayor lo establece en 
    15 en la DB y en el Dto.
*/