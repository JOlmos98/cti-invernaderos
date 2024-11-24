// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

//Añadido:
mod database; // Módulo para la lógica de base de datos
mod commands; // Módulo para los comandos

use tauri::{generate_handler, Builder};

#[tauri::command]
fn greet(name: &str) -> String {
   format!("Hello, {}!", name)
}

fn main() {
  println!(" ===== Tauri iniciado =====");
  Builder::default()
  .invoke_handler(generate_handler![
      commands::get_offset_cal2_command,
      commands::set_offset_cal2_command,
      greet
  ])
  .run(tauri::generate_context!())
  .expect("Error al iniciar la aplicación");

  app_lib::run();

}