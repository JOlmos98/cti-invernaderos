use tauri::command;
use crate::database;
use crate::database::Parametro; // Reutiliza la estructura del módulo database

#[command]
pub fn get_all_parametros_command() -> Result<Vec<Parametro>, String> {
    database::get_all_parametros()
}

// Comando para obtener el offset
#[command]
pub fn get_offset_cal2_command(id: i32) -> Result<i32, String> {
    database::get_offset_cal2(id)
}

// Comando para establecer el offset
#[command]
pub fn set_offset_cal2_command(id: i32, valor: i32) -> Result<String, String> {
    database::set_offset_cal2(id, valor)
}
