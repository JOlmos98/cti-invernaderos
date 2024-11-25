use tauri::command;
use crate::database;
use crate::database::Parametro; // Reutiliza la estructura del módulo database
use crate::database::User;

#[command]
pub fn get_all_parametros_command() -> Result<Vec<Parametro>, String> {
    database::get_all_parametros()
}

#[command]
pub fn get_user_by_id_command(id: i32) -> Result<User, String> {
    database::get_user_by_id(id)
}
