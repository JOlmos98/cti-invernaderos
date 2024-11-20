
//Tipos de datos
export enum TP  {
     INTEGER,
     REAL,
     STRING,
     BOOLEAN,
     DATE,
     TIME,     
     DATETIME,
     LIST,     
} 

//Así funciona internamente el enum:
// INTEGER=0;
// REAL=1;
// STRING=2;
// BOOLEAN=3;
// DATE=4;
// TIME=5;
// DATETIME=6;
// LIST=7;

//Tipos de parámetros
export interface IParam {
     id:bigint, //bigint = long, double, int...
     tipo:TP, //Este es nuestro tipo creado
     min:number,
     max:number,
     valor:number,
     reset:number,
     tipoImportacion:number,
     nombre:string
}

//Estas dos interfaces no son valor:number ni tienen max y min, el resto de info es igual
export interface BParam {
     id:bigint,
     tipo:TP,
     valor:boolean,
     reset:number,
     tipoImportacion:number,
     nombre:string
}

export interface SParam {
     id:bigint,
     tipo:TP,
     valor:string,
     reset:number,
     tipoImportacion:number,
     nombre:string
}