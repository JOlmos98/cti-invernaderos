use rusqlite::{Connection, Result};
use serde::Serialize;

// -------------------------------------------------- Función consulta get_all_parametros --------------------------------------------------

#[derive(Serialize)] // Necesario para enviar los datos como JSON a TypeScript

pub struct Parametro {
    pub id: i64,
    pub nombre: String,
    pub valor: String,}

pub fn get_all_parametros() -> Result<Vec<Parametro>, String> {
    println!("\n1. Conectando a la base de datos...");
    let conn = Connection::open("/home/jesus/cti-invernaderos/prisma/clima.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    println!("2. Preparando consulta...");
    let mut stmt = conn
        .prepare("SELECT id, nombre, valor FROM Parametros")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    println!("3. Ejecutando consulta...");
    let parametros_iter = stmt
        .query_map([], |row| {
            Ok(Parametro {
                id: row.get(0)?,
                nombre: row.get(1)?,
                valor: row.get(2)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    println!("4. Procesando filas...");
    let mut parametros = Vec::new();
    for parametro in parametros_iter {
        parametros.push(parametro.map_err(|e| format!("Error al procesar fila: {}", e))?);
    }
    print!("5. Parametros obtenidos correctamente en la consola del cliente.\n");
    Ok(parametros)
}

// -------------------------------------------------- Función consulta get_user_by_id --------------------------------------------------

#[derive(Serialize, Clone)]

pub struct User {
    pub id: i32,
    pub name: String,
    pub email: String,}

pub fn get_user_by_id(id: i32) -> Result<User, String> {
    println!("\n1. Conectando a la base de datos...");
    let conn = Connection::open("/home/jesus/cti-invernaderos/prisma/clima.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    println!("2. Preparando consulta...");
    let mut stmt = conn
        .prepare("SELECT id, name, email FROM User WHERE id = ?")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    println!("3. Ejecutando consulta...");
    let user = stmt
        .query_row([id], |row| {
            Ok(User {
                id: row.get(0)?,
                name: row.get(1)?,
                email: row.get(2)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    println!("4. Usuario mostrado.");
    Ok(user)
}
