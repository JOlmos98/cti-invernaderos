#ifndef __CALEFACCION_H__
#define __CALEFACCION_H__

#include "HW.h"
//#include "calefaccion_influ_ambiente.h"


#define CALEFACCION_INFLUENCIA_HUME				0x01


#define DEF_MAX_PUNTOS_CURVA_OFFSET_CALEFACCIONES	7
#define DEF_MAX_PUNTOS_CURVA_AUX_CALEFACCIONES	7



typedef enum{
	CAL_NO_CONECTADO,
	CAL_CONECTADO_CLIMA_RECINTO,
	//CAL_CONECTADO_CURVA_AUXILIAR,
	CAL_CONECTADO_ELEMENTOS_MAXIMOS,
}EN_CAL_CONECTADO;


typedef enum{
	CAL_TIPO_TODO_NADA,
	CAL_TIPO_SOLO_REGULADA,
	CAL_TIPO_DUAL,
}EN_CAL_TIPO;



typedef enum{
	EN_CAL_VAL_3_VIAS_PARADA,
	EN_CAL_VAL_3_VIAS_CALENTANDO,
	EN_CAL_VAL_3_VIAS_ENFRIANDO,
}EN_CAL_VAL_3_VIAS;




typedef struct
{

	uint8_t numero_CAL;// 0 1 2 3 4 5


}ST_CAL_config;


typedef struct
{

	//INFLUECIAS CALEFACCION

	//influencia humedad

  	puint8 influ_hum_off_on;				//configura si activamos o desactivamos la influencia

	puint8 influ_hum_init;			//humedad inicio influencia
	puint8 influ_hum_fin;			//humedad fin influencia

	uint8_t cal_influ_hum_init;			//calculador humedad init
	uint8_t cal_influ_hum_fin;			//calculo humedad fin

	pfloat influ_hum_incremento_temperatura;	//indicamos el incremento que queremos realizar en
	float correccion_calefac_des_por_humedad;//indica la correccion que se tiene que realizar sobre la temperatura deseada de calefaccion cuando esta la influencia activa


}ST_CAL_influ_humedad;



typedef struct
{
	  uint8_t contador_seg_primera_entrada;//este contador se utiliza para que no funcione el el contacto rtermico hasta que no pasen este tiempo

}ST_CAL_var_locales;



typedef struct
{
	float  temp_deseada_funcionamiento;//temperatura deseada a la que funciona el contacto termico

	float  temp_deseada_sin_correccion;//temperatura deseada antes de la correccion


	//porcentaje salida 010
	uint8_t porcentaje_calculado_funcionamiento;

	// porcentaje sal 0-10
	uint8_t porcentaje_010;


	uint8_t infuencia_estado;//0 no hay influencia  !=0 tenemos influencia


	CTI_OFF_ON estado_calefaccion;//el estado real de la calefaccion
	CTI_OFF_ON estado_contacto_rele;//el estado del rele
	//EN_ESTADO_CAL estado_rele2;//estado del rele 2


}ST_CAL_calculados;

typedef struct
{
	//valvula 3 vias

	uint8_t estado_maquina;


	EN_CAL_VAL_3_VIAS estado_valvula;

	uint16_t contador_temporal;
	CTI_OFF_ON estado_alarma;
	uint16_t contador_pulsos_calentar;
	uint16_t contador_pulsos_enfriar;


	puint16 numero_pulsos_salta_alarma;
	puint8 alarma_on_off;
	puint8 on_off;
	puint8 rele_calentar;
	puint8 rele_enfriar;
	puint16 tiempo_pulso;
	puint16 tiempo_espera;

}ST_CAL_valvula_3_vias;



typedef struct
{
	ST_CAL_config st_CAL_config;
	ST_CAL_influ_humedad st_CAL_influ_humedad;
	ST_CAL_var_locales st_local;
	ST_CAL_calculados st_cal;
	ST_CAL_valvula_3_vias st_valvula_3_vias;


	puint8 disponible;//CTI_OFF_ON


	// temperatura deseada sin conectar
	pfloat temp_deseada_sin_conectar;//si no esta conectado esta es la temperatura de funcionamiento
	pfloat temp_deseada_correccion;//correccion sobre la temperatura de conectada

	// histeresis
	pfloat histeresis;



	pfloat rango;

	puint8 max;
	puint8 min;


	puint8 tipo_calefaccion;//EN_CAL_TIPO


	/* Asignamos una salida 010 */
	puint8 asigna_sal_010;


	puint8 rele_asociado;//numero rele asociado

	puint8 asigna_TRIAC;

   /* estructura para la sonda */
	tgstemp stemp;

	puint8 conectado;//EN_CAL_CONECTADO

  //puint8 switch_panel_control;//ENUM_SWITCH_PANEL_CONTROL

  pstring_unicode_16 nombre;


} ST_calefaccion;


//JFG////////////////////////////////////////////////////////////////////////////////////////////

void cal_tiempo_seg(ST_calefaccion *cal);

void cal_tick(ST_calefaccion *cal);


void cal_calcula_temperatura_funcionamiento(ST_calefaccion *cal);

void cal_calcula_valores_influencia_humedad(ST_calefaccion *cal);




#endif
