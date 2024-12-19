#ifndef __HW_sondas__
#define __HW_sondas__

/*
 *
 *
 * 
 */


#include "define_LIB.h"
#include "HW_sonda_tempe.h"

/********************************************************
//DEFINE
*********************************************************/


typedef enum{
 SONDA_OK,
 SONDA_CORTO,
 SONDA_SIN_SONDA,
 SONDA_NO_ACTIVADA,
 SONDA_NO_ASIGNADA,
}EN_ESTADO_SONDA;


typedef enum{

 GRUPO_SONDA_OK,
 GRUPO_SONDA_SIN_SONDA,
 GRUPO_SONDA_SIN_SONDAS_ASIGNADAS,
}EN_ESTADO_GRUPO_SONDA;




/**********************************************************

//ESTRUCTURAS

***********************************************************/

typedef struct
{
  	uint16_t ValorDigital;

  	float TempSondaFloat;

  	EN_ESTADO_SONDA FalloSonda;//

  	puint8 activa;//CTI_OFF_ON

	pfloat correccion;

	float RT_calculada;

	puint8 sonda_doble;//CTI_SI_NO indica si la sonda es doble, si es doble podemos medir temperaturas mas bajas.

} ST_SondaTemp;


typedef struct
{

  //  uint16_c valor_digital;//valor digital de la media de las sondas indicada
  float   temp_float;
  EN_ESTADO_GRUPO_SONDA estado_grupo;
  //  uint8_c activo;
  puint8 sondas[DEF_HW_SONDA_TEMPE_N_MAX_SONDAS];

} tgstemp;


typedef struct
{

/* estructura para la sonda */
  tgstemp stemp;


} ST_sonda_exterior;







typedef struct
{
  	uint8_t humedad;

  	EN_ESTADO_SONDA estado_sondas;//el estado de todas las sondas

  	EN_ESTADO_SONDA estado_sonda1;//humedad exterior no se utiliza
  	EN_ESTADO_SONDA estado_sonda2;//humedad exterior no se utiliza

  	puint8 sonda_activa;

  	uint8_t humedad1;//indica lo que midde cada sonda en humedad exterior no se utiliza
  	uint8_t humedad2;//humedad exterior no se utiliza


	puint8 N_sonda_asignada;//0: sonda no asignada     !=0 sonda asignada
	puint8 N_sonda_asignada2;//0: sonda no asignada     !=0 sonda asignada  humedad exterior no se utiliza

	puint8 tipo_sonda_05_010_420;//0: 0-5V     1: 0-10V   2:4-20mA

//	puint8 posicion_sonda1_grafica;
//	puint8 posicion_sonda2_grafica;


	pint8 correccion_sonda1;//0: sonda no asignada     !=0 sonda asignada
	pint8 correccion_sonda2;//0: sonda no asignada     !=0 sonda asignada  humedad exterior no se utiliza



} TSondaHumedad;

typedef struct
{
  	//uint16_c ValorDigital;
  	int16_t depresion;//valor en PA

  	//int16_t depresion_mostrar;

  	EN_ESTADO_SONDA estado_sonda;

  	puint8 sonda_activa;
  	puint8 N_sonda_asignada;//0: sonda no asignada     !=0 sonda asignada
  	puint8 Fondo_escala;//0: -100 100PA
  						//1: 100 PA
  						//2: 250 PA
  						//3: 500 PA
  						//4: 1000 PA
  						//5: 1500 PA
  						//6: 2000 PA
  						//7: 2500 PA

  	puint8 sensor_420_010;//indicamos el tipo de sensor  0: 4-20 miliamperios  1: 0-10 Voltios     2 : 0-5  Voltios


  	//esta variable se utiliza para hacer pruebas depuracion si es distinto de 0 int16_t depresion;//valor en PA sera el valor indicado en esta variable
  	int16_t depresion_pruebas;

} ST_Sonda_depresiometro;

typedef struct
{
  	//uint16_c ValorDigital;
  	uint16_t medida_ppm;//valor en PA

  	//uint8_c FalloSonda;  // indica si hay fallo de sonda, puede tener 3 valores
  	EN_ESTADO_SONDA estado_sonda;


  	puint8 sonda_activa;
  	puint8 N_sonda_asignada;//0: sonda no asignada     !=0 sonda asignada

  	puint8 sensor_420_010;//indicamos el tipo de sensor  0: 4-20 miliamperios  1: 0-10 Voltios

  	puint8 Fondo_escala;//indicamos el fondo de escala 0: 5000   1: 10000


 // 	ST_in_Analogica *ea;
//	puint8 posicion_sonda_grafica;

	uint8_t histeresis_sin_sonda;

} ST_Sonda_CO2;



typedef struct
{
  	//uint16_c ValorDigital;
  	uint16_t medida_ppm;//valor en PA

  	EN_ESTADO_SONDA estado_sonda;

  	puint8 sonda_activa;
  	puint8 N_sonda_asignada;//0: sonda no asignada     !=0 sonda asignada

  	puint8 sensor_420_010;//indicamos el tipo de sensor  0: 4-20 miliamperios  1: 0-10 Voltios

  	puint8 Fondo_escala;//indicamos el fondo de escala 0: 5000   1: 10000

	//puint8 posicion_sonda_grafica;

} ST_Sonda_NH3;







typedef struct
{
	ST_SondaTemp st_SondaTemp[DEF_HW_SONDA_TEMPE_N_MAX_SONDAS];
	ST_sonda_exterior sonda_temp_exterior;
	TSondaHumedad sonda_humedad_inte;
	TSondaHumedad sonda_humedad_ext;
	ST_Sonda_depresiometro Sonda_depresiometro;
	ST_Sonda_CO2 Sonda_CO2;
	ST_Sonda_NH3 Sonda_NH3;



} ST_sondas;


/********************************************************
//FUNCIONES
*********************************************************/
void HW_sondas_init(void);
void HW_sondas_decimas_apli(void);

//void HW_sondas_tick(void);







void HW_lee_grupo_sondas_temp(tgstemp *gstemp);



/*VARIABLES*********************************************************************************************/ 

extern ST_sondas sondas;

#endif
/********************************************************
//NOTAS DE FUNCIONAMIENTO
*********************************************************
*
*
* 
*
*********************************************************/

