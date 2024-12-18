#include <config_componentes.h>
#include "clima.h"
#include "EEPROM_gest_IN.h"
#include "clima_curva.h"
//Tclima_recinto clima;

//tipos definidos /////////////////////////////////////////////////////////////////////////////////


typedef enum{

	EN_CR_CURVAS_DESCONECTADAS,
	EN_CR_CURVAS_CONECTADAS,

}EN_CR_CURVAS;



//FUNCIONESL locales /////////////////////////////////////////////////////////////////////////////////

//uint8_t clima_comprueba_config_clima(ST_clima_recinto *st_clima_recinto);


void clima_calcula_valores_clima(ST_clima_recinto *st_clima_recinto,EN_CR_CURVAS esta_conectado);

void clima_reset_offset(ST_clima_recinto *st_clima_recinto);


//////////////////////////////////////////////////////////////////////////////////////////////////////////


void init_clima_despues_carga_datos(ST_clima_recinto *st_clima_recinto)
{
  
	//st_clima_recinto->st_clima_recinto_curvas_CO2_NH3.numero_puntos_tabla=calculo_curvas_ordena_tabla(st_clima_recinto->st_clima_recinto_curvas_CO2_NH3.tabla_ordenada,st_clima_recinto->st_clima_recinto_curvas_CO2_NH3.dia_curva,DEF_CO2_NH3_MAX_PUNTOS_CURVA);

	//return(OK_c);
	clima_curvas_init_despues_carga_datos();
}


/*FUNCION*------------------------------------------------------------
*
*
*END------------------------------------------------------------------*/

void clima_tick(ST_clima_recinto *st_clima_recinto)
{
	if(st_crianza.inicio_crianza_on_off.val!=0)
	{//crianza conectada

		if(st_clima_recinto->st_clima_recinto_calculados.clima_recinto_conectado_curvas==SI_c)
		{//esta conectado a las curvas

			if(st_clima_curvas.curvas_ON_OFF.val==OFF_c || st_clima_curvas.punto_ejecucion_crianza==0)
			{//se han desconectado las curvas
				st_clima_recinto->st_clima_recinto_calculados.clima_recinto_conectado_curvas=NO_c;
			}

			clima_calcula_valores_clima(st_clima_recinto,EN_CR_CURVAS_CONECTADAS);

		}
		else
		{//esta desconectado de las curvas

			if(st_clima_curvas.curvas_ON_OFF.val==ON_c && st_clima_curvas.punto_ejecucion_crianza!=0)
			{//se han conectado las curvas
				st_clima_recinto->st_clima_recinto_calculados.clima_recinto_conectado_curvas=SI_c;
				clima_calcula_valores_clima(st_clima_recinto,EN_CR_CURVAS_CONECTADAS);
				//reseteamos valores de offset
				clima_reset_offset(st_clima_recinto);

			}
			else
				clima_calcula_valores_clima(st_clima_recinto,EN_CR_CURVAS_DESCONECTADAS);

		}
	}
	else
	{//crianza desconectada
		if(st_clima_recinto->st_clima_recinto_calculados.clima_recinto_conectado_curvas==SI_c)
		{
			st_clima_recinto->st_clima_recinto_calculados.clima_recinto_conectado_curvas=NO_c;
			clima_reset_offset(st_clima_recinto);
		}
		
		
		clima_calcula_valores_clima(st_clima_recinto,EN_CR_CURVAS_DESCONECTADAS);
	}



	clima_curvas_tick();

	
}

/*FUNCION*------------------------------------------------------------
*
* Function Name  : clima_calcula_valores_clima
* valores entrada: st_clima_recinto: puntero 
* 				 esta_conectado: 0: tenenmos crianza y no estamos conectado a curvas   
* 				 				 1: tenenmos crianza y tenemos curvas 
* 				 				 2: no tenemos crianza
* 
* valores salida :
*
* Comments       : 
*
*END------------------------------------------------------------------*/

void clima_calcula_valores_clima(ST_clima_recinto *st_clima_recinto,EN_CR_CURVAS esta_conectado)
{
	/* minimo de la ventilacion */
	int16_t   hum_relativa;
	int32_t   CO2,NH3;
	float temp_des=25;

	switch (esta_conectado)
	{
	    default:
		case EN_CR_CURVAS_DESCONECTADAS://tenenmos crianza y no estamos conectado a curvas
			temp_des=st_clima_recinto->temp_des.val;
			hum_relativa=st_clima_recinto->hum_relativa.val;
			CO2=st_clima_recinto->CO2_des.val;
			NH3=st_clima_recinto->NH3_des.val;
		break;
		case EN_CR_CURVAS_CONECTADAS:
			temp_des=st_clima_recinto->temp_des.val+st_clima_recinto->temp_des_offset.val;
			hum_relativa=st_clima_recinto->hum_relativa.val+st_clima_recinto->hum_relativa_offset.val;
			CO2=st_clima_recinto->CO2_des.val+st_clima_recinto->CO2_des_offset.val;
			NH3=st_clima_recinto->NH3_des.val+st_clima_recinto->NH3_des_offset.val;
		break;
	}
	  
	
	///////////////////////////////////////////////////////////////////////////////////////
	
	if(hum_relativa<0)
		hum_relativa=0;
	if(hum_relativa>100)
		hum_relativa=100;

	if(CO2<0)
		CO2=0;

	if(NH3<0)
		NH3=0;

	/////////////////////////////////////////////////////////////////////////////////////////

	st_clima_recinto->st_clima_recinto_calculados.temp_des=temp_des;
	st_clima_recinto->st_clima_recinto_calculados.hum_relativa=(uint8_t)hum_relativa;
	st_clima_recinto->st_clima_recinto_calculados.CO2=CO2;
	st_clima_recinto->st_clima_recinto_calculados.NH3=NH3;

	
}

/*FUNCION*------------------------------------------------------------
*
* Function Name  : clima_reset_offset
* valores entrada: st_clima_recinto: puntero 
* 				   
* 
* valores salida :
*
* Comments       :  resetea tods los valores de offset
*
*END------------------------------------------------------------------*/

void clima_reset_offset(ST_clima_recinto *st_clima_recinto)
{
	st_clima_recinto->temp_des_offset.val=0;
	st_clima_recinto->hum_relativa_offset.val=0;
	st_clima_recinto->CO2_des_offset.val=0;
	st_clima_recinto->NH3_des_offset.val=0;
	
	EEG_WriteMem_float(&st_clima_recinto->temp_des_offset);
	EEG_WriteMem_int8(&st_clima_recinto->hum_relativa_offset);
	EEG_WriteMem_int16(&st_clima_recinto->CO2_des_offset);
	EEG_WriteMem_int16(&st_clima_recinto->NH3_des_offset);
	
}


void clima_recinto_reinicia_correcciones_curvas(ST_clima_recinto *st_clima_recinto)
{
	st_clima_recinto->temp_des_offset.val=0;
	EEG_WriteMem_float(&st_clima_recinto->temp_des_offset);

	st_clima_recinto->hum_relativa_offset.val=0;
	EEG_WriteMem_int8(&st_clima_recinto->hum_relativa_offset);

	st_clima_recinto->CO2_des_offset.val=0;
	EEG_WriteMem_int16(&st_clima_recinto->CO2_des_offset);

	st_clima_recinto->NH3_des_offset.val=0;
	EEG_WriteMem_int16(&st_clima_recinto->NH3_des_offset);

}

