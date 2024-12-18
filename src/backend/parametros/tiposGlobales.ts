
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

//Estas dos últimas interfaces no son valor:number ni tienen max y min, el resto de info es igual
