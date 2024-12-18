#ifndef __CONFIG_COMPONENETES__
#define __CONFIG_COMPONENETES__

/*
 *
 */

#include "define_LIB.h"
#include "ctermico.h"
#include "clima.h"
#include "calefaccion.h"
#include "refrigeracion.h"
#include "crianza.h"
#include "entradas_aire.h"
#include "depresiometro.h"
#include "ventilacion2.h"
#include "ventilacion2IN.h"
#include "ventilacion2_curva.h"
#include "EEPROM_gest_IN.h"
#include "FUN_GEN.h"
#include "cAgua.h"
#include "contador.h"
#include "iluminacion_lib.h"
#include "relojes_JFG.h"
#include "clima_curva.h"
#include "calefaccion_curva_dinamica.h"
#include "calefaccion_curva.h"
#include "calefaccion_influ_ambiente.h"
#include "ventilacion_partida.h"
#include "Motor_directo_IN.h"
#include "humidificacion.h"
/********************************************************
//DEFINE
*********************************************************/



/**********************************************************

//ESTRUCTURAS

***********************************************************/



/********************************************************
//FUNCIONES
*********************************************************/


void config_componenetes_init_despues_carga_eeprom(void);

//contador de tiempos
void config_componenetes_tiempo_dec(void);


void config_componenetes_seg(void);


void config_componenetes_decimas(void);

/*VARIABLES*********************************************************************************************/ 

extern Tctermico ct[TOTAL_CONTACTO_TERMICO];

extern ST_calefaccion cal[TOTAL_CALEFACCIONES];

extern ST_clima_recinto st_clima;
extern ST_clima_curvas st_clima_curvas;

extern ST_refrigeracion refri[TOTAL_REFRIGERACIONES];

extern ST_Eaire	ea[TOTAL_ENTRADAS_DE_AIRE];

extern ST_vent	vent;
extern ST_vent_curvas vent_curvas;

extern ST_iluminacion iluminacion[TOTAL_ILUMINACIONES];

extern ST_relojes st_relojes[N_MAX_RELOJES];

extern ST_motor st_ea_motores_directos[TOTAL_MOTORES_DIRECTOS_CON_RELES];

extern ST_humidificacion st_humidificacion;

#endif
/********************************************************
//NOTAS DE FUNCIONAMIENTO
*********************************************************
*
*
* 
*
*********************************************************/

