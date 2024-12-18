#ifndef __CLIMA_H___
#define __CLIMA_H___
#include "define_LIB.h"



typedef struct 
{
	  /* temperatura deseada */
	  float temp_des;
	  /* humedad relativa */
	  uint8_t hum_relativa;
	  
	  uint16_t CO2;
	  uint16_t NH3;



	 CTI_SI_NO clima_recinto_conectado_curvas;

}ST_clima_recinto_calculados;



//typedef struct
//{
// /*
//  uint8_t *estado_curvas_on_off;//le tenemos que pasar el puntero a el estado de la curva para saber si esta conectado a las curvas
//
//  //uint8_t *estado_vent_porcentaje_m3h;//le tenemos que pasar el puntero a el estado de la curva para saber si esta conectado a las curvas
//
//  uint8_t *correccion_vmin_temperatura_exterior;//le tenemos que pasar la correccion de la ventilacion minima
//
//  uint8_t *correccion_vmin_NH3;//le tenemos que pasar la correccion de la ventilacion minima del NH3
//
//  uint8_t *correccion_vmin_CO2;//le tenemos que pasar la correccion de la ventilacion minima del NH3
//*/
//
//
//}ST_clima_recinto_extern;


//typedef struct{
//
//	puint8 curvas_ON_OFF;
//
//	uint8_t tabla_ordenada[DEF_CO2_NH3_MAX_PUNTOS_CURVA];
//	pint16 dia_curva[DEF_CO2_NH3_MAX_PUNTOS_CURVA];
//
//	puint16 CO2_control[DEF_CO2_NH3_MAX_PUNTOS_CURVA];
//	puint16 NH3_control[DEF_CO2_NH3_MAX_PUNTOS_CURVA];
//
//	uint8_t numero_puntos_tabla;
//
//	puint8 modo_hora_escalon;//CC_MODO_CALCULO_DIA    CC_MODO_CALCULO_HORA    modo escalon o modo dia para el calculo
//
//	uint8_t flag_primera_entrada;
//	uint8_t flag_inicio_cambio_hora;
//	int16_c dia_crianza_temp;
//
//	uint8_t punto_ejecucion_crianza;//indica el punto que se esta ejecutando 0 no se ejecuta ninguno
//
//}ST_clima_recinto_curvas_CO2_NH3;



typedef struct 
{
  /* temperatura deseada */
  pfloat temp_des;
  
  /* humedad relativa */
  puint8 hum_relativa;
  
 // puint8 depresion_regulada;
 // puint8 depresion_tunel;
  
  puint16 CO2_des;
  puint16 NH3_des;

  
  /* variables para la correccion de la curva offset*/
  pfloat temp_des_offset;
  pint8 hum_relativa_offset;
  pint16 CO2_des_offset;
  pint16 NH3_des_offset;

  
  
  //uint8_t estado_clima_recinto;
  
  
 // ST_clima_recinto_extern st_clima_recinto_extern;
  ST_clima_recinto_calculados st_clima_recinto_calculados;
  


  //ST_clima_recinto_curvas_CO2_NH3 st_clima_recinto_curvas_CO2_NH3;


}ST_clima_recinto;

//extern Tclima_recinto clima;


void init_clima_despues_carga_datos(ST_clima_recinto *st_clima_recinto);


void clima_tick(ST_clima_recinto *st_clima_recinto);

//void clima_curvas_CO2_NH3_tick_dec(void);
//
//void clima_curvas_CO2_NH3_calcula_curva(void);

void clima_recinto_reinicia_correcciones_curvas(ST_clima_recinto *st_clima_recinto);

#endif
