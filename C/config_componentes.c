/*
 *
 * Autor:                       JFG
 * Fecha creacion:              25 marzo 2013
 * Fecha ultima actualizacion:  25 marzo 2013
 * Version                      1.0
 * 
 * Comentario:
 *
 *        funciones SPI
 *
 * 
 */



#include <config_componentes.h>
#include <ventilacion2IN.h>
#include <ventilacion_partida.h>
/*DEFINE***************************************************************************************/



/*STRUCT***************************************************************************************/
Tctermico ct[TOTAL_CONTACTO_TERMICO];
ST_calefaccion cal[TOTAL_CALEFACCIONES];

ST_refrigeracion refri[TOTAL_REFRIGERACIONES];

ST_Eaire	ea[TOTAL_ENTRADAS_DE_AIRE];

ST_clima_recinto st_clima;
ST_clima_curvas st_clima_curvas;

ST_vent	vent;
ST_vent_curvas vent_curvas;

ST_iluminacion iluminacion[TOTAL_ILUMINACIONES];

ST_relojes st_relojes[N_MAX_RELOJES];

ST_motor st_ea_motores_directos[TOTAL_MOTORES_DIRECTOS_CON_RELES];

ST_humidificacion st_humidificacion;
/*VARIABLES*********************************************************************************************/ 
struct{

	uint8_t contador_segundos;

}VA_config_componenetes;

/*FUNCIONES**********************************************************************************/

void config_componenetes_tiempo_seg(void);
//void Cont_general_guarda_valores_para_no_perder(void);

//////////////////////////////////////////////////////////////////////////////////////////////////////




void config_componenetes_init_despues_carga_eeprom(void)
{
	uint8_t i;

	init_clima_despues_carga_datos(&st_clima);
	crianza_init_despues_carga_datos();
	vent_init_despues_carga_datos(&vent);
	Cont_agua_init_despues_carga_datos();
	Cont_general_init_despues_carga_datos();
	iluminacion_init_despues_carga_datos(iluminacion);
	vent_curvas_init_despues_carga_datos();

	calefaccion_curvas_init_despues_carga_datos();

	for (i = 0; i < TOTAL_CALEFACCIONES; ++i)
	{
		cal[i].st_CAL_config.numero_CAL=i;
	}

	for (i = 0; i < TOTAL_MOTORES_DIRECTOS_CON_RELES; ++i)
	{
		init_motor_despues_carga_datos(&st_ea_motores_directos[i]);
	}



}

void config_componenetes_tiempo_dec(void)
{
	//uint8_t i;
	//componentes tiempo deciams////////////////////////////////////////////////////////////
	depresiometro_tiempo_decimas();

	humidificacion_tiempo_decimas(&st_humidificacion);


	/////////////////////////////////////////////////////////////////////
	VA_config_componenetes.contador_segundos++;
	if(VA_config_componenetes.contador_segundos>=10)
	{
		VA_config_componenetes.contador_segundos=0;
		config_componenetes_tiempo_seg();
	}




}

void config_componenetes_tiempo_seg(void)
{
	uint8_t i;
	//componentes tiempo segundos////////////////////////////////////////////////////////////

	for (i = 0; i < TOTAL_CONTACTO_TERMICO; ++i)
	{
		ct_tiempo_seg(&ct[i]);
	}

	/////////////////////////////////////////////////////////////////////

	clima_tick(&st_clima);

	/////////////////////////////////////////////////////////////////////

	for (i = 0; i < TOTAL_CALEFACCIONES; ++i)
	{
		cal_tiempo_seg(&cal[i]);
	}

	calefaccion_curva_dinamica_tiempo_segundos(&st_calefaccion_curva_dinamica);
	calefaccion_influ_ambiente_tiempo_seg();
	/////////////////////////////////////////////////////////////////////

	for (i = 0; i < TOTAL_REFRIGERACIONES; ++i)
	{
		ref_tiempo_seg(&refri[i]);
	}


	for (i = 0; i < TOTAL_ENTRADAS_DE_AIRE; ++i)
	{
		ea_tiempo_segundos(&ea[i]);
	}

	vent_tiempo_seg(&vent);
	vent_partida_tiempo_segundos();
	Cont_agua_tiempo_segundos();

	vent_partida_tick();


}



void config_componenetes_decimas(void)
{
	uint8_t i;

	for (i = 0; i < TOTAL_CONTACTO_TERMICO; ++i)
	{
		ct_tick(&ct[i]);
	}

	for (i = 0; i < TOTAL_CALEFACCIONES; ++i)
	{
		cal_tick(&cal[i]);
	}

	for (i = 0; i < TOTAL_REFRIGERACIONES; ++i)
	{
		ref_tick(&refri[i]);
	}

	for (i = 0; i < TOTAL_ENTRADAS_DE_AIRE; ++i)
	{
		ea_tick(&ea[i]);
	}

	vent_tick_deci(&vent);

	Cont_agua_tick_decimas();

	depresiometro_tick();

	humidificacion_tick(&st_humidificacion);
}

void config_componenetes_seg(void)
{
	uint8_t i;

	crianza_tick_segundos();

	Cont_agua_tick_segundos();
	Cont_general_tick_segundos();

	iluminacion_tick_recalculo(iluminacion);

	for (i = 0; i < N_MAX_RELOJES; ++i)
	{
		relojes_tick(&st_relojes[i]);
	}

	vent_curvas_tick();


	calefaccion_curva_dinamica_tick(&st_calefaccion_curva_dinamica);
	calefaccion_curvas_tick();
	calefaccion_influ_ambiente_tick();

	depresiometro_tick_segundos();
}



/*notas ediciones*-----------------------------------------------------------------
*
*
*END------------------------------------------------------------------*/
/*Posibles errores*-----------------------------------------------------------------
*
*   
*END------------------------------------------------------------------*/
