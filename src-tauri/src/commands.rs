use tauri::command;
use crate::database;

// Comando para obtener el offset
#[command]
pub fn get_offset_cal2_command() -> Result<i32, String> {
    database::get_offset_cal2()
}

// Comando para establecer el offset
#[command]
pub fn set_offset_cal2_command(id: i32, valor: i32) -> Result<String, String> {
    database::set_offset_cal2(id, valor)
}
