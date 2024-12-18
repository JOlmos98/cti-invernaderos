#include "calefaccion.h"
#include "config_componentes.h"


#define CAL_TIEMPO_SEG_PRIMERA_ENTRADA  3
/********************************************************************************/
//ST_calefaccion_comun st_calefaccion_comun;


//fun locales
void cal_local_influencia_humedad(ST_calefaccion *cal);
void cal_local_calcula_estados_calefaccion(ST_calefaccion *cal);
void cal_local_calcula_sal_010(ST_calefaccion *cal);
void cal_local_valvula_3_vias_tick(ST_calefaccion *cal);


/** Inicio de la estructura ventilacion *****************************************/

void cal_tiempo_seg(ST_calefaccion *cal)
{

	if(cal->st_local.contador_seg_primera_entrada<CAL_TIEMPO_SEG_PRIMERA_ENTRADA)
		cal->st_local.contador_seg_primera_entrada++;


	if(cal->st_valvula_3_vias.contador_temporal!=0)cal->st_valvula_3_vias.contador_temporal--;


}

//---------
void cal_tick(ST_calefaccion *cal)
{

	cal_calcula_temperatura_funcionamiento(cal);

	HW_lee_grupo_sondas_temp(&cal->stemp);

	if(cal->st_local.contador_seg_primera_entrada<CAL_TIEMPO_SEG_PRIMERA_ENTRADA)
		return;


	cal_local_influencia_humedad(cal);

	cal_local_calcula_estados_calefaccion(cal);

	cal_local_calcula_sal_010(cal);

	if(cal->disponible.val==OFF_c)
	{
		cal->st_cal.estado_calefaccion=OFF_c;
		cal->st_cal.estado_contacto_rele=OFF_c;
		cal->st_cal.porcentaje_010=0;

	}

	cal_local_valvula_3_vias_tick(cal);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	HW_OUT_010_porcentaje(cal->asigna_sal_010.val,cal->st_cal.porcentaje_010);
	HW_triac_fija_porcentaje(cal->asigna_TRIAC.val,cal->st_cal.porcentaje_010);
	HW_RELES_accion(cal->st_cal.estado_contacto_rele, cal->rele_asociado.val);

}



void cal_local_calcula_estados_calefaccion(ST_calefaccion *cal)
{
	switch (cal->st_cal.estado_calefaccion)
	{
		case OFF_c:
			if(cal->stemp.temp_float<cal->st_cal.temp_deseada_funcionamiento-cal->histeresis.val)
			{
				cal->st_cal.estado_calefaccion=ON_c;
				cal->st_cal.estado_contacto_rele=ON_c;

			}
			else
			{
				cal->st_cal.estado_calefaccion=OFF_c;
				cal->st_cal.estado_contacto_rele=OFF_c;
			}
		break;
		case ON_c:

			//tempera_histeresis=cal->temp_deseada_funcionamiento+cal->histeresis.val;

			if(cal->stemp.temp_float>cal->st_cal.temp_deseada_funcionamiento)
			{
				cal->st_cal.estado_calefaccion=OFF_c;
				cal->st_cal.estado_contacto_rele=OFF_c;
			}
			else
			{
				cal->st_cal.estado_calefaccion=ON_c;
				cal->st_cal.estado_contacto_rele=ON_c;
			}
		break;
		default:
		break;
	}

	/////////////////////////////////////////////////////////////////////
	//RELE2
	//////////////////////////////////////////////
//	switch (cal->st_cal.estado_rele2)
//	{
//		case CAL_DECONECTADO:
//			if(cal->stemp.temp_float<cal->st_cal.temp_deseada_funcionamiento_rele2-cal->histeresis_rele_2.val)
//			{
//				cal->estado_rele2=CAL_CONECTADO;
//			}
//			else
//			{
//				cal->estado_rele2=CAL_DECONECTADO;
//			}
//		break;
//		case CAL_CONECTADO:
//
//			//tempera_histeresis=cal->temp_deseada_funcionamiento+cal->histeresis.val;
//
//			if(cal->stemp.temp_float>cal->temp_deseada_funcionamiento_rele2)
//			{
//				cal->estado_rele2=CAL_DECONECTADO;
//			}
//			else
//			{
//				cal->estado_rele2=CAL_CONECTADO;
//			}
//		break;
//		default:
//		break;
//	}


	if(cal->stemp.estado_grupo!=GRUPO_SONDA_OK)
	{//si tenemos las sondas con error no tiene que activar nada de la calefaccion
		cal->st_cal.estado_calefaccion=OFF_c;
		cal->st_cal.estado_contacto_rele=OFF_c;
		//cal->st_cal.estado_rele2=CAL_DECONECTADO;
		//Salida_010_porcentaje(cal->asigna_sal_010.val,0);
	}

}



void cal_local_calcula_sal_010(ST_calefaccion *cal)
{
	float tempF;
	uint8_t temp8;

	if(cal->st_cal.temp_deseada_funcionamiento<=cal->stemp.temp_float)
	{
		cal->st_cal.porcentaje_010=cal->min.val;
	}
	else
	{
		tempF=cal->st_cal.temp_deseada_funcionamiento-cal->rango.val;
		while(1)
		{
			if(cal->stemp.temp_float<tempF)
			{
				cal->st_cal.porcentaje_010=cal->max.val;
				break;
			}

			if(cal->stemp.temp_float>cal->st_cal.temp_deseada_funcionamiento)
			{
				cal->st_cal.porcentaje_010=cal->min.val;
				break;
			}


			if(cal->max.val<cal->min.val)
			{
				cal->st_cal.porcentaje_010=cal->max.val;
				break;
			}


			//si llegamos aqui teneos que calcular progresion

			tempF=cal->st_cal.temp_deseada_funcionamiento-cal->stemp.temp_float;

//			cal->rango.val ------  100%
//			tempF			------   x

			tempF=(tempF*100)/cal->rango.val;


			temp8=cal->max.val-cal->min.val;


//			temp8  --------   100%
//			  x    --------   tempF
			temp8=(tempF*temp8)/100;

			cal->st_cal.porcentaje_010=temp8+cal->min.val;

			break;
		}

	}


	if(cal->stemp.estado_grupo!=GRUPO_SONDA_OK)
	{//si tenemos las sondas con error no tiene que activar nada de la calefaccion
		cal->st_cal.porcentaje_010=0;
	}
}


void cal_local_influencia_humedad(ST_calefaccion *cal)
{
	uint8_t hum_max,hum_min,diferen_hum,diferen_hum_int,porcentaje_hum;
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//influencia humedad
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//influencia

	cal->st_CAL_influ_humedad.correccion_calefac_des_por_humedad=0;

	cal_calcula_valores_influencia_humedad(cal);

	//if((st_estados_nave.estado_nave.val==ENUM_ESTADO_NAVE_PRECALENTAMIENTO && st_estados_nave.nave_precalentamiento.influencias_calefacciones.val==0) ||
	//(st_estados_nave.estado_nave.val==ENUM_ESTADO_NAVE_DESCANSO && st_estados_nave.nave_descanso.influencias_calefacciones.val==0) ||
	//(st_estados_nave.estado_nave.val==ENUM_ESTADO_NAVE_PREPARACION && st_estados_nave.nave_preparacion.influencias_calefacciones.val==0)
	//)
	//{//si se cumple estamos en precalentamiento y se ha indicado que las influencias no tienen que funcionar
	//
	//	//influencia desconectada
	//	cal->infuencia_estado&=(~CALEFACCION_INFLUENCIA_HUME);
	//}
	//else
	//{
		if(cal->st_CAL_influ_humedad.influ_hum_off_on.val==ON_c && sondas.sonda_humedad_inte.sonda_activa.val==ON_c)
		{//influencia activa

				while(1)
				{
					if(sondas.sonda_humedad_inte.humedad>(0))
					{//sonda lista si no se cumple puede ser que no tenga sonda asignada o no tenga la sonda conectada

						if(cal->st_CAL_influ_humedad.cal_influ_hum_init>cal->st_CAL_influ_humedad.cal_influ_hum_fin)
						{
							hum_max=cal->st_CAL_influ_humedad.cal_influ_hum_init;
							hum_min=cal->st_CAL_influ_humedad.cal_influ_hum_fin;
						}
						else
						{
							if(cal->st_CAL_influ_humedad.cal_influ_hum_init<cal->st_CAL_influ_humedad.cal_influ_hum_fin)
							{
								hum_min=cal->st_CAL_influ_humedad.cal_influ_hum_init;
								hum_max=cal->st_CAL_influ_humedad.cal_influ_hum_fin;
							}
							else
							{
								cal->st_cal.infuencia_estado&=(~CALEFACCION_INFLUENCIA_HUME);
								break;
							}
						}

						if(sondas.sonda_humedad_inte.humedad<hum_min)
						{
							//influencia off
							cal->st_cal.infuencia_estado&=(~CALEFACCION_INFLUENCIA_HUME);
							break;
						}

						cal->st_cal.infuencia_estado|=CALEFACCION_INFLUENCIA_HUME;

						diferen_hum=hum_max-hum_min;

						diferen_hum_int=sondas.sonda_humedad_inte.humedad-hum_min;

						//calculamos porcentaje humedad
						porcentaje_hum=(uint8_t)((diferen_hum_int*100)/diferen_hum);

						if((sondas.sonda_humedad_inte.humedad>(hum_max-0.001)))
						{
							porcentaje_hum=100;
						}

						//calculamos porcentaje de correccion
						cal->st_CAL_influ_humedad.correccion_calefac_des_por_humedad=(float)(((float)(porcentaje_hum)*cal->st_CAL_influ_humedad.influ_hum_incremento_temperatura.val)/100);

					}

					break;
				}
			}
			else
			{//influencia desconectada
				cal->st_cal.infuencia_estado&=(~CALEFACCION_INFLUENCIA_HUME);
			}

	//}

}


void cal_calcula_temperatura_funcionamiento(ST_calefaccion *cal)
{

	switch (cal->conectado.val)
	{
		default:
		case CAL_NO_CONECTADO:
			cal->st_cal.temp_deseada_sin_correccion=cal->temp_deseada_sin_conectar.val;
			cal->st_cal.temp_deseada_funcionamiento=cal->temp_deseada_sin_conectar.val+cal->temp_deseada_correccion.val;



			//cal->st_cal.temp_deseada_funcionamiento=cal->temp_deseada_sin_conectar.val;
		break;
		case CAL_CONECTADO_CLIMA_RECINTO:
			cal->st_cal.temp_deseada_sin_correccion=st_clima.st_clima_recinto_calculados.temp_des;
			cal->st_cal.temp_deseada_funcionamiento=cal->temp_deseada_correccion.val+st_clima.st_clima_recinto_calculados.temp_des;



			//cal->st_cal.temp_deseada_funcionamiento=cal->temp_deseada_correccion.val+st_clima.st_clima_recinto_calculados.temp_des;
		break;
//		case CAL_CONECTADO_CURVA_AUXILIAR:
//
//			if(st_calefaccion_comun.st_calefacciones_curva_aux.punto_ejecucion_crianza==0)
//				cal->temp_deseada_funcionamiento=cal->temp_deseada_sin_conectar.val;
//			else
//				cal->temp_deseada_funcionamiento=st_calefaccion_comun.valor_temperatura_curva_aux;
//		break;
	}


	cal->st_cal.temp_deseada_funcionamiento=cal->st_cal.temp_deseada_funcionamiento+cal->st_CAL_influ_humedad.correccion_calefac_des_por_humedad;



	if(cal->st_CAL_config.numero_CAL==N_CALEFACCION_CURVA_DINAMICA)
		cal->st_cal.temp_deseada_funcionamiento+=st_cal_influ_ambiente.correccion_calculada;


	CD_redondea_arriba_bajo_float(&cal->st_cal.temp_deseada_funcionamiento, 1);


//	cal->st_cal.temp_deseada_funcionamiento_rele2=cal->temp_deseada_funcionamiento-cal->histeresis.val+cal->offset_rele_2.val;



//	cal->st_cal.temp_deseada_sin_correccion=cal->st_cal.temp_deseada_funcionamiento;
//	cal->st_cal.temp_deseada_funcionamiento=cal->st_cal.temp_deseada_funcionamiento+cal->st_CAL_influ_humedad.correccion_calefac_des_por_humedad;

	//cal->temp_deseada_funcionamiento_rele2=cal->temp_deseada_funcionamiento-cal->histeresis.val+cal->offset_rele_2.val;

	//calefaccion_calcula_temperatura_rele2(cal);
	//calculamos la temperatura deseada del rele 2
	//cal->temp_deseada_funcionamiento_rele2=cal->temp_deseada_funcionamiento-cal->histeresis.val+cal->offset_rele_2.val;

}



void cal_calcula_valores_influencia_humedad(ST_calefaccion *cal)
{
	int16_t tempi16;

	//calculamos valore humedad
	tempi16=st_clima.st_clima_recinto_calculados.hum_relativa;
	//calculamos valores de inicio y final influencias
	tempi16+=cal->st_CAL_influ_humedad.influ_hum_init.val;

	if(tempi16<0)
		tempi16=0;

	if(tempi16>100)
		tempi16=100;

	cal->st_CAL_influ_humedad.cal_influ_hum_init=tempi16;

	tempi16=st_clima.st_clima_recinto_calculados.hum_relativa;
	tempi16+=cal->st_CAL_influ_humedad.influ_hum_fin.val;

	if(tempi16<0)
		tempi16=0;

	if(tempi16>100)
		tempi16=100;

	cal->st_CAL_influ_humedad.cal_influ_hum_fin=tempi16;

}




void cal_local_valvula_3_vias_tick(ST_calefaccion *cal)
{
	if(cal->st_valvula_3_vias.on_off.val==ON_c && cal->disponible.val==ON_c)
	{//valvula conectada
		switch (cal->st_valvula_3_vias.estado_maquina)
		{
			case 0:
				if(cal->st_valvula_3_vias.contador_temporal==0)
				{
					//cal->st_valvula_3_vias.estado_alarma=FALSE_c;
					if(cal->st_cal.estado_calefaccion==ON_c)
					{
						HW_RELES_accion(ON_c,cal->st_valvula_3_vias.rele_calentar.val);
						cal->st_valvula_3_vias.estado_valvula=EN_CAL_VAL_3_VIAS_CALENTANDO;
						cal->st_valvula_3_vias.contador_pulsos_calentar++;
						cal->st_valvula_3_vias.contador_pulsos_enfriar=0;
						if(cal->st_valvula_3_vias.contador_pulsos_calentar>cal->st_valvula_3_vias.numero_pulsos_salta_alarma.val)
						{//tenemos alarma
							cal->st_valvula_3_vias.estado_alarma=ON_c;
						}
						else
						{
							cal->st_valvula_3_vias.estado_alarma=OFF_c;
						}
					}
					else
					{
						HW_RELES_accion(ON_c,cal->st_valvula_3_vias.rele_enfriar.val);
						cal->st_valvula_3_vias.estado_valvula=EN_CAL_VAL_3_VIAS_ENFRIANDO;
						cal->st_valvula_3_vias.contador_pulsos_enfriar++;
						cal->st_valvula_3_vias.contador_pulsos_calentar=0;
						if(cal->st_valvula_3_vias.contador_pulsos_enfriar>cal->st_valvula_3_vias.numero_pulsos_salta_alarma.val)
						{//tenemos alarma
							cal->st_valvula_3_vias.estado_alarma=ON_c;
						}
						else
						{
							cal->st_valvula_3_vias.estado_alarma=OFF_c;
						}
					}
					cal->st_valvula_3_vias.contador_temporal=cal->st_valvula_3_vias.tiempo_pulso.val;
					cal->st_valvula_3_vias.estado_maquina++;
				}
				else
				{
					cal->st_valvula_3_vias.estado_valvula=EN_CAL_VAL_3_VIAS_PARADA;
					HW_RELES_accion(OFF_c,cal->st_valvula_3_vias.rele_calentar.val);
					HW_RELES_accion(OFF_c,cal->st_valvula_3_vias.rele_enfriar.val);
				}
			break;
			case 1://espera termine pulso
				if(cal->st_valvula_3_vias.contador_temporal==0)
				{
					cal->st_valvula_3_vias.contador_temporal=cal->st_valvula_3_vias.tiempo_espera.val;
					cal->st_valvula_3_vias.estado_maquina=0;
				}
			break;
			default:
			break;
		}
	}
	else
	{
		if(cal->st_valvula_3_vias.contador_temporal>1)
		{//lo colocamos a 1 como el decremento puede estar en otro hilo lo colocamos a 1 y asi nunca tendremos problemas
			cal->st_valvula_3_vias.contador_temporal=1;
		}
		cal->st_valvula_3_vias.estado_valvula=EN_CAL_VAL_3_VIAS_PARADA;
		cal->st_valvula_3_vias.estado_maquina=0;
		cal->st_valvula_3_vias.estado_alarma=OFF_c;
		HW_RELES_accion(OFF_c,cal->st_valvula_3_vias.rele_calentar.val);
		HW_RELES_accion(OFF_c,cal->st_valvula_3_vias.rele_enfriar.val);

	}

}

