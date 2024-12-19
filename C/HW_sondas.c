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

#include <HW_sondas.h>
#include <FUN_GEN.h>
#include <HW_IN_0_10.h>
/*DEFINE***************************************************************************************/




/*STRUCT***************************************************************************************/
struct{
	uint8_t contador_decimas;


}VA_sondas;


/*VARIABLES*********************************************************************************************/ 



ST_sondas sondas;





/*FUNCIONES**********************************************************************************/



uint8_t getSondaHumedad(void) ;
uint8_t getSonda_depresiometro(void) ;
uint8_t getSonda_CO2(void);
uint8_t getSonda_NH3(void);
//uint8_t getSonda_metano(void);
uint8_t getSonda_humedad_ext(void) ;







void HW_sondas_init(void)
{

}
void HW_sondas_decimas_apli(void)
{

	//lectura de sondas temperatura
	HW_sondas_tempe_tiempo_decimas();
	HW_sondas_tempe_tick();


	HW_lee_grupo_sondas_temp(&sondas.sonda_temp_exterior.stemp);


	VA_sondas.contador_decimas++;
	switch (VA_sondas.contador_decimas)
	{
		case 1:

		break;
		case 3:
			getSondaHumedad();
		break;
		case 5:
			getSonda_depresiometro();
		break;
		case 7:
			getSonda_CO2();
		break;
		case 9:
			getSonda_NH3();
		break;
		case 11:
			getSonda_humedad_ext();
		break;
		case 12:
			//getSonda_metano();
		break;
		case 20:
			VA_sondas.contador_decimas=0;
		break;

		default:
		break;
	}





}





void HW_lee_grupo_sondas_temp(tgstemp *gstemp)
{
	uint8_t i,total_s=0,total_sondas_declaradas=0;
	float 	temp_float=0;


	   for (i=0;i<DEF_HW_SONDA_TEMPE_N_MAX_SONDAS;i++)
	   {
	      if (gstemp->sondas[i].val!=0)
	      {
			 total_sondas_declaradas++;
			 if (sondas.st_SondaTemp[i].activa.val)
			 {
				   if (sondas.st_SondaTemp[i].FalloSonda!=SONDA_OK)
				   {  //fallo sonda

				   }
				   else
				   {
					   temp_float+=sondas.st_SondaTemp[i].TempSondaFloat;
					   total_s++;
				   }
			 }
	      }
	   }
	   // verificamos si tiene sondas
	   if ((total_s==0)||(total_sondas_declaradas==0))
	   {
	      if (total_sondas_declaradas==0)
	      {
	    	  gstemp->estado_grupo=GRUPO_SONDA_SIN_SONDAS_ASIGNADAS;
	    	  gstemp->temp_float=-50;
	      }
	      else
	      {
	    	  gstemp->estado_grupo=GRUPO_SONDA_SIN_SONDA;
	    	  gstemp->temp_float=-90;
	      }
	   }
	   else
	   {
		   gstemp->estado_grupo=GRUPO_SONDA_OK;
		   gstemp->temp_float=temp_float/total_s;

		   //redondeamos flotante
		   CD_redondea_arriba_bajo_float(&gstemp->temp_float,1);

	   }



}




//******************************************************
/* el valor digital */

uint8_t getSondaHumedad(void)
{

	uint8_t xhu=0;//,xhu2,xajuste;
  // uint16_t temp16;
	uint8_t numero_sondas=0;
	uint16_t suma_sondas=0;
	uint8_t multiplicador_sonda=1;
	int16_t tempi16;

	if(sondas.sonda_humedad_inte.tipo_sonda_05_010_420.val==0)
	{//si es una sonda 0-5 voltios los resultado los multiplicamos por dos para hacer la conversion
		multiplicador_sonda=2;
	}


	if(sondas.sonda_humedad_inte.N_sonda_asignada.val!=0)
	{
		HW_IN_010_420((sondas.sonda_humedad_inte.N_sonda_asignada.val),EN_CONFIG_IN_ANALOG_010);
		//HW_in_010[sondas.sonda_humedad_inte.N_sonda_asignada.val-1].configuracion_in_010=EN_CONFIG_IN_ANALOG_010;
		sondas.sonda_humedad_inte.humedad1=(uint8_t)(HW_in_010[sondas.sonda_humedad_inte.N_sonda_asignada.val-1].tension_entrada_mA_entrada*10*multiplicador_sonda);

		tempi16=(int16_t)sondas.sonda_humedad_inte.humedad1+(int16_t)sondas.sonda_humedad_inte.correccion_sonda1.val;

		if(tempi16<0)
			tempi16=0;
		if(tempi16>100)
			tempi16=100;
		sondas.sonda_humedad_inte.humedad1=tempi16;


//		if(sondas.sonda_humedad_inte.humedad1>100)
//					sondas.sonda_humedad_inte.humedad1=100;

		if(sondas.sonda_humedad_inte.humedad1>2)
		{
			suma_sondas=(uint16_t)(suma_sondas+sondas.sonda_humedad_inte.humedad1);
			numero_sondas++;
			sondas.sonda_humedad_inte.estado_sonda1=SONDA_OK;
		}
		else
		{
			sondas.sonda_humedad_inte.estado_sonda1=SONDA_SIN_SONDA;
		}
	}
	else
	{
		sondas.sonda_humedad_inte.humedad1=0;
		sondas.sonda_humedad_inte.estado_sonda1=SONDA_NO_ACTIVADA;
	}

	if(sondas.sonda_humedad_inte.N_sonda_asignada2.val!=0)
	{


		HW_IN_010_420((uint8_t)(sondas.sonda_humedad_inte.N_sonda_asignada2.val),EN_CONFIG_IN_ANALOG_010);
		//HW_in_010[sondas.sonda_humedad_inte.N_sonda_asignada2.val-1].configuracion_in_010=EN_CONFIG_IN_ANALOG_010;
		sondas.sonda_humedad_inte.humedad2=(uint8_t)(HW_in_010[sondas.sonda_humedad_inte.N_sonda_asignada2.val-1].tension_entrada_mA_entrada*10*multiplicador_sonda);


		tempi16=(int16_t)sondas.sonda_humedad_inte.humedad2+(int16_t)sondas.sonda_humedad_inte.correccion_sonda2.val;

		if(tempi16<0)
			tempi16=0;
		if(tempi16>100)
			tempi16=100;
		sondas.sonda_humedad_inte.humedad2=tempi16;


		//sondas.sonda_humedad_inte.humedad2=tempi16;



//		if(sondas.sonda_humedad_inte.humedad2>100)
//			sondas.sonda_humedad_inte.humedad2=100;

		if(sondas.sonda_humedad_inte.humedad2>2)
		{
			suma_sondas=(uint16_t)(suma_sondas+sondas.sonda_humedad_inte.humedad2);
			numero_sondas++;
			sondas.sonda_humedad_inte.estado_sonda2=SONDA_OK;
		}
		else
		{
			sondas.sonda_humedad_inte.humedad2=0;
			sondas.sonda_humedad_inte.estado_sonda2=SONDA_SIN_SONDA;
		}
	}
	else
	{
		sondas.sonda_humedad_inte.humedad2=0;
		sondas.sonda_humedad_inte.estado_sonda2=SONDA_NO_ACTIVADA;
	}


	if(sondas.sonda_humedad_inte.sonda_activa.val!=0)
	{
		if(sondas.sonda_humedad_inte.N_sonda_asignada.val!=0 || sondas.sonda_humedad_inte.N_sonda_asignada2.val!=0)
		{
			if(numero_sondas!=0)
			{
				if(suma_sondas<2)
				{
					sondas.sonda_humedad_inte.humedad=0;
					sondas.sonda_humedad_inte.estado_sondas=SONDA_SIN_SONDA;
				}
				else
				{
					sondas.sonda_humedad_inte.humedad=(uint8_t)(suma_sondas/numero_sondas);
					sondas.sonda_humedad_inte.estado_sondas=SONDA_OK;
				}
			}
			else
			{
				sondas.sonda_humedad_inte.humedad=0;
				sondas.sonda_humedad_inte.estado_sondas=SONDA_SIN_SONDA;
			}
		}
		else
		{
			sondas.sonda_humedad_inte.estado_sondas=SONDA_NO_ASIGNADA;
		}
	}
	else
	{
		sondas.sonda_humedad_inte.humedad=0;
		sondas.sonda_humedad_inte.estado_sondas=SONDA_NO_ACTIVADA;
	}

	return xhu;
}
/*FUNCION*------------------------------------------------------------
*
* Function Name  : init_in_AD
* valores entrada: 	void
*
* valores salida : void
*
* Comments       :
*    iniciamos las sondas
*
*END------------------------------------------------------------------*/
uint8_t getSonda_depresiometro(void)
{


	float porcentaje_calculado,fondo_escala;
	float fondo_escala_inicio,fondo_escala_fin;


//	uint16_c valor_digital_cero,valor_digital_fondo_escala,valor_PA_fondo_escala;

//	int16_c temp_i16,temp_fondo_escala;



	if(sondas.Sonda_depresiometro.sonda_activa.val!=0)
	{

		if(sondas.Sonda_depresiometro.N_sonda_asignada.val!=0)
		{


				   switch (sondas.Sonda_depresiometro.Fondo_escala.val)
				   {
						case 0://-100 100PA
							fondo_escala_inicio=-100;
							fondo_escala_fin=100;
						break;
						default:
						case 1://0 100PA
							fondo_escala_inicio=0;
							fondo_escala_fin=100;
						break;
						case 2://0 250PA
							fondo_escala_inicio=0;
							fondo_escala_fin=250;
						break;
						case 3://0 500PA
							fondo_escala_inicio=0;
							fondo_escala_fin=500;
						break;
						case 4://0 1000PA
							fondo_escala_inicio=0;
							fondo_escala_fin=1000;
						break;
						case 5://0 1500PA
							fondo_escala_inicio=0;
							fondo_escala_fin=1500;
						break;
						case 6://0 2000PA
							fondo_escala_inicio=0;
							fondo_escala_fin=2000;
						break;
						case 7://0 2500PA
							fondo_escala_inicio=0;
							fondo_escala_fin=2500;
						break;

				   }


				   if(sondas.Sonda_depresiometro.sensor_420_010.val==0)
				   {//4-20mA
					   HW_IN_010_420((uint8_t)(sondas.Sonda_depresiometro.N_sonda_asignada.val),EN_CONFIG_IN_ANALOG_420);
					   //HW_in_010[sondas.Sonda_depresiometro.N_sonda_asignada.val-1].configuracion_in_010=EN_CONFIG_IN_ANALOG_420;

					   if(HW_in_010[sondas.Sonda_depresiometro.N_sonda_asignada.val-1].tension_entrada_mA_entrada<=3)
					   {
						   sondas.Sonda_depresiometro.estado_sonda=SONDA_SIN_SONDA;
					   }
					   else
					   {
						   sondas.Sonda_depresiometro.estado_sonda=SONDA_OK;
					   }

						//20ma-4					--	100%
						//miliamperios-4			--   x

						if(HW_in_010[sondas.Sonda_depresiometro.N_sonda_asignada.val-1].tension_entrada_mA_entrada<=4)
						{
							porcentaje_calculado=0;
						}
						else
						{
							porcentaje_calculado=HW_in_010[sondas.Sonda_depresiometro.N_sonda_asignada.val-1].tension_entrada_mA_entrada-4;
							porcentaje_calculado=(porcentaje_calculado*100)/16;
						}

						//fondo_escala			--  		100%						//200 esla diferencia de fondo de escala
						//	X					--			porcentaje_calculado
						fondo_escala=fondo_escala_fin-fondo_escala_inicio;
						porcentaje_calculado=(porcentaje_calculado*fondo_escala)/100;

						sondas.Sonda_depresiometro.depresion=(int16_t)(porcentaje_calculado+fondo_escala_inicio);

				   }
				   else
				   {//0-10

					   sondas.Sonda_depresiometro.estado_sonda=SONDA_OK;

					   if(HW_in_010[sondas.Sonda_depresiometro.N_sonda_asignada.val-1].tension_entrada_mA_entrada<0.2)
						   porcentaje_calculado=0;

					   HW_IN_010_420((uint8_t)(sondas.Sonda_depresiometro.N_sonda_asignada.val),EN_CONFIG_IN_ANALOG_010);
					   //HW_in_010[sondas.Sonda_depresiometro.N_sonda_asignada.val-1].configuracion_in_010=EN_CONFIG_IN_ANALOG_010;

					   if(HW_in_010[sondas.Sonda_depresiometro.N_sonda_asignada.val-1].tension_entrada_mA_entrada<0.2)
						   porcentaje_calculado=0;
					   else
					   {
							//10V						--	100%
							//voltios medidos			--   x
							porcentaje_calculado=(HW_in_010[sondas.Sonda_depresiometro.N_sonda_asignada.val-1].tension_entrada_mA_entrada*100)/10;
					   }

						//fondo_escala			--  		100%						//200 esla diferencia de fondo de escala
						//	X					--			porcentaje_calculado
						fondo_escala=fondo_escala_fin-fondo_escala_inicio;
						porcentaje_calculado=(porcentaje_calculado*fondo_escala)/100;


						sondas.Sonda_depresiometro.depresion=(int16_t)(porcentaje_calculado+fondo_escala_inicio);

				   }

				   if(sondas.Sonda_depresiometro.depresion_pruebas!=0)
					   sondas.Sonda_depresiometro.depresion=sondas.Sonda_depresiometro.depresion_pruebas;


		   }
		   else
		   {
			   //no tiene salida 0 10 asignada o no esta activa la sonda
			   sondas.Sonda_depresiometro.depresion=0;
			   sondas.Sonda_depresiometro.estado_sonda=SONDA_NO_ASIGNADA;
		   }

	}
	else
	{
	   sondas.Sonda_depresiometro.depresion=0;
	   sondas.Sonda_depresiometro.estado_sonda=SONDA_NO_ACTIVADA;
	}

	return (0);

}

/*FUNCION*------------------------------------------------------------
*
* Function Name  : init_in_AD
* valores entrada: 	void
*
* valores salida : void
*
* Comments       :
*    iniciamos las sondas
*
*END------------------------------------------------------------------*/
uint8_t getSonda_CO2(void)
{
	float porcentaje_calculado=0,fondo_escala;
	float fondo_escala_inicio,fondo_escala_fin;

	//uint16_c valor_digital_cero,valor_digital_fondo_escala,valor_PA_fondo_escala;
	//int16_c temp_i16,temp_fondo_escala;

	if(sondas.Sonda_CO2.sonda_activa.val!=0)
	{
		if(sondas.Sonda_CO2.N_sonda_asignada.val!=0)
		{
			switch (sondas.Sonda_CO2.Fondo_escala.val)
			{
				default:
				case 0://5000ppm
					fondo_escala_inicio=0;
					fondo_escala_fin=5000;
				break;
				case 1://10000ppm
					fondo_escala_inicio=0;
					fondo_escala_fin=10000;
				break;
		   }

				   if(sondas.Sonda_CO2.sensor_420_010.val==0)
				   {//4-20mA

					   HW_IN_010_420((uint8_t)(sondas.Sonda_CO2.N_sonda_asignada.val),EN_CONFIG_IN_ANALOG_420);

					   //HW_in_010[sondas.Sonda_CO2.N_sonda_asignada.val-1].configuracion_in_010=EN_CONFIG_IN_ANALOG_420;

					   if(HW_in_010[sondas.Sonda_CO2.N_sonda_asignada.val-1].tension_entrada_mA_entrada<=2)
					   {
						   sondas.Sonda_CO2.estado_sonda=SONDA_SIN_SONDA;
					   }
					   else
					   {
						   sondas.Sonda_CO2.estado_sonda=SONDA_OK;
					   }

						//20ma-4					--	100%
						//miliamperios-4			--   x

						if(HW_in_010[sondas.Sonda_CO2.N_sonda_asignada.val-1].tension_entrada_mA_entrada<=4)
						{
							porcentaje_calculado=0;
						}
						else
						{
							porcentaje_calculado=HW_in_010[sondas.Sonda_CO2.N_sonda_asignada.val-1].tension_entrada_mA_entrada-4;
							porcentaje_calculado=(porcentaje_calculado*100)/16;
						}

						//fondo_escala			--  		100%						//200 esla diferencia de fondo de escala
						//	X					--			porcentaje_calculado
						fondo_escala=fondo_escala_fin-fondo_escala_inicio;
						porcentaje_calculado=(porcentaje_calculado*fondo_escala)/100;

						sondas.Sonda_CO2.medida_ppm=(uint16_t)(porcentaje_calculado+fondo_escala_inicio);

				   }
				   else
				   {//0-10

					   sondas.Sonda_CO2.estado_sonda=SONDA_OK;

					  // if(HW_in_010[sondas.Sonda_CO2.N_sonda_asignada.val-1].tension_entrada_mA_entrada<2)
						//   porcentaje_calculado=0;
					   HW_IN_010_420((uint8_t)(sondas.Sonda_CO2.N_sonda_asignada.val),EN_CONFIG_IN_ANALOG_010);
					   //HW_in_010[sondas.Sonda_CO2.N_sonda_asignada.val-1].configuracion_in_010=EN_CONFIG_IN_ANALOG_010;

					   if(HW_in_010[sondas.Sonda_CO2.N_sonda_asignada.val-1].tension_entrada_mA_entrada<0.3)
					   {
						   sondas.Sonda_CO2.estado_sonda=SONDA_SIN_SONDA;
						   porcentaje_calculado=0;
						   sondas.Sonda_CO2.histeresis_sin_sonda=TRUE_c;
					   }
					   else
					   {
						   if(sondas.Sonda_CO2.histeresis_sin_sonda==TRUE_c)
						   {//si venimos de dar alarma de sonda hacemos histeresis
							   if(HW_in_010[sondas.Sonda_CO2.N_sonda_asignada.val-1].tension_entrada_mA_entrada>0.4)
							   {//cuando tension sea superior a 0.4 quitamos la histeresis
								   sondas.Sonda_CO2.histeresis_sin_sonda=FALSE_c;
							   }
							   else
							   {
								   sondas.Sonda_CO2.estado_sonda=SONDA_SIN_SONDA;
								   porcentaje_calculado=0;
							   }
						   }
						   else
						   {
								//10V						--	100%
								//voltios medidos			--   x
								porcentaje_calculado=(HW_in_010[sondas.Sonda_CO2.N_sonda_asignada.val-1].tension_entrada_mA_entrada*100)/10;
						   }

					   }

						//fondo_escala			--  		100%						//200 esla diferencia de fondo de escala
						//	X					--			porcentaje_calculado
						fondo_escala=fondo_escala_fin-fondo_escala_inicio;
						porcentaje_calculado=(porcentaje_calculado*fondo_escala)/100;


						sondas.Sonda_CO2.medida_ppm=(uint16_t)(porcentaje_calculado+fondo_escala_inicio);

				   }

		   }
		   else
		   {
			   //no tiene salida 0 10 asignada o no esta activa la sonda
			   sondas.Sonda_CO2.medida_ppm=0;
			   sondas.Sonda_CO2.estado_sonda=SONDA_NO_ASIGNADA;
		   }

	}
	else
	{
	   sondas.Sonda_CO2.medida_ppm=0;
	   sondas.Sonda_CO2.estado_sonda=SONDA_NO_ACTIVADA;
	}

	return (0);

}

/*FUNCION*------------------------------------------------------------
*
* Function Name  : init_in_AD
* valores entrada: 	void
*
* valores salida : void
*
* Comments       :
*    iniciamos las sondas
*
*END------------------------------------------------------------------*/
uint8_t getSonda_NH3(void)
{
	float porcentaje_calculado,fondo_escala;
	float fondo_escala_inicio,fondo_escala_fin;

	//uint16_t valor_digital_cero,valor_digital_fondo_escala,valor_PA_fondo_escala;
	//int16_t temp_i16,temp_fondo_escala;

	if(sondas.Sonda_NH3.sonda_activa.val!=0)
	{
		if(sondas.Sonda_NH3.N_sonda_asignada.val!=0)
		{

			switch (sondas.Sonda_NH3.Fondo_escala.val)
			{
				default:
				case 0://100ppm
					fondo_escala_inicio=0;
					fondo_escala_fin=100;
				break;
				case 1://200ppm
					fondo_escala_inicio=0;
					fondo_escala_fin=200;
				break;

				break;
		   }


				   if(sondas.Sonda_NH3.sensor_420_010.val==0)
				   {//4-20mA
					   HW_IN_010_420((uint8_t)(sondas.Sonda_NH3.N_sonda_asignada.val),EN_CONFIG_IN_ANALOG_420);
					  // HW_in_010[sondas.Sonda_NH3.N_sonda_asignada.val-1].configuracion_in_010=EN_CONFIG_IN_ANALOG_420;

					   if(HW_in_010[sondas.Sonda_NH3.N_sonda_asignada.val-1].tension_entrada_mA_entrada<=3)
					   {
						   sondas.Sonda_NH3.estado_sonda=SONDA_SIN_SONDA;
					   }
					   else
					   {
						   sondas.Sonda_NH3.estado_sonda=SONDA_OK;
					   }

						//20ma-4					--	100%
						//miliamperios-4			--   x

						if(HW_in_010[sondas.Sonda_NH3.N_sonda_asignada.val-1].tension_entrada_mA_entrada<=4)
						{
							porcentaje_calculado=0;
						}
						else
						{
							porcentaje_calculado=HW_in_010[sondas.Sonda_NH3.N_sonda_asignada.val-1].tension_entrada_mA_entrada-4;
							porcentaje_calculado=(porcentaje_calculado*100)/16;
						}

						//fondo_escala			--  		100%						//200 esla diferencia de fondo de escala
						//	X					--			porcentaje_calculado
						fondo_escala=fondo_escala_fin-fondo_escala_inicio;
						porcentaje_calculado=(porcentaje_calculado*fondo_escala)/100;

						sondas.Sonda_NH3.medida_ppm=(uint16_t)(porcentaje_calculado+fondo_escala_inicio);

				   }
				   else
				   {//0-10

					   sondas.Sonda_NH3.estado_sonda=SONDA_OK;

					   HW_IN_010_420((uint8_t)(sondas.Sonda_NH3.N_sonda_asignada.val),EN_CONFIG_IN_ANALOG_010);


					  if(HW_in_010[sondas.Sonda_NH3.N_sonda_asignada.val-1].tension_entrada_mA_entrada<0.14)
						  porcentaje_calculado=0;
					  else
					  {
					   //10V						--	100%
						//voltios medidos			--   x
						porcentaje_calculado=(HW_in_010[sondas.Sonda_NH3.N_sonda_asignada.val-1].tension_entrada_mA_entrada*100)/10;
					  }
						//fondo_escala			--  		100%						//200 esla diferencia de fondo de escala
						//	X					--			porcentaje_calculado
						fondo_escala=fondo_escala_fin-fondo_escala_inicio;
						porcentaje_calculado=(porcentaje_calculado*fondo_escala)/100;

						porcentaje_calculado+=fondo_escala_inicio;

						CD_redondea_arriba_bajo_float(&porcentaje_calculado,0);

						sondas.Sonda_NH3.medida_ppm=(uint16_t)(porcentaje_calculado+fondo_escala_inicio);

				   }

		   }
		   else
		   {
			   //no tiene salida 0 10 asignada o no esta activa la sonda
			   sondas.Sonda_NH3.medida_ppm=0;
			   sondas.Sonda_NH3.estado_sonda=SONDA_NO_ASIGNADA;
		   }

	}
	else
	{
	   sondas.Sonda_NH3.medida_ppm=0;
	   sondas.Sonda_NH3.estado_sonda=SONDA_NO_ACTIVADA;
	}

	return (0);

}


/*FUNCION*------------------------------------------------------------
*
* Function Name  : init_in_AD
* valores entrada: 	void
*
* valores salida : void
*
* Comments       :
*    iniciamos las sondas
*
*END------------------------------------------------------------------*/
uint8_t getSonda_humedad_ext(void)
{
	uint8_t xhu=0;//,xhu2,xajuste;
	uint8_t multiplicador_sonda=1;
	int16_t tempi16;

	if(sondas.sonda_humedad_ext.tipo_sonda_05_010_420.val==0)
	{//si es una sonda 0-5 voltios los resultado los multiplicamos por dos para hacer la conversion
		multiplicador_sonda=2;
	}

	if(sondas.sonda_humedad_ext.sonda_activa.val!=0)
	{
		if(sondas.sonda_humedad_ext.N_sonda_asignada.val!=0)
		{
			HW_IN_010_420((uint8_t)(sondas.sonda_humedad_ext.N_sonda_asignada.val),EN_CONFIG_IN_ANALOG_010);
			//HW_in_010[sondas.sonda_humedad_ext.N_sonda_asignada.val-1].configuracion_in_010=EN_CONFIG_IN_ANALOG_010;
			sondas.sonda_humedad_ext.humedad=(uint8_t)(HW_in_010[sondas.sonda_humedad_ext.N_sonda_asignada.val-1].tension_entrada_mA_entrada*10*multiplicador_sonda);


			tempi16=(int16_t)sondas.sonda_humedad_ext.humedad+(int16_t)sondas.sonda_humedad_ext.correccion_sonda1.val;

			if(tempi16<0)
				tempi16=0;
			if(tempi16>100)
				tempi16=100;
			sondas.sonda_humedad_ext.humedad=tempi16;

			if(sondas.sonda_humedad_ext.humedad>2)
			{
				sondas.sonda_humedad_ext.estado_sondas=SONDA_OK;
			}
			else
			{
				sondas.sonda_humedad_ext.estado_sondas=SONDA_SIN_SONDA;
			}

//			if(sondas.sonda_humedad_ext.humedad>100)
//				sondas.sonda_humedad_ext.humedad=100;

		}
		else
		{
			sondas.sonda_humedad_ext.humedad=0;
			sondas.sonda_humedad_ext.estado_sondas=SONDA_NO_ASIGNADA;
		}
	}
	else
	{
		sondas.sonda_humedad_ext.humedad=0;
		sondas.sonda_humedad_ext.estado_sondas=SONDA_NO_ACTIVADA;
	}

	return xhu;
}





//******************************************************

/*notas ediciones*-----------------------------------------------------------------
*
*  
*
*END------------------------------------------------------------------*/
/*Posibles errores*-----------------------------------------------------------------
*
*  
*   
*END------------------------------------------------------------------*/
