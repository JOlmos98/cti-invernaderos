use rusqlite::{Connection, Result};
use serde::Serialize;

#[derive(Serialize)] // Necesario para enviar los datos como JSON a TypeScript
pub struct Parametro {
    pub id: i64,
    pub nombre: String,
    pub valor: String,
}

pub fn get_all_parametros() -> Result<Vec<Parametro>, String> {
    let conn = Connection::open("/home/jesus/cti-invernaderos/prisma/clima.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;

    let mut stmt = conn
        .prepare("SELECT id, nombre, valor FROM parametros")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let parametros_iter = stmt
        .query_map([], |row| {
            Ok(Parametro {
                id: row.get(0)?,
                nombre: row.get(1)?,
                valor: row.get(2)?,
            })
        })
        .map_err(|e| format!("Error al ejecutar la consulta: {}", e))?;

    let mut parametros = Vec::new();
    for parametro in parametros_iter {
        parametros.push(parametro.map_err(|e| format!("Error al procesar fila: {}", e))?);
    }

    Ok(parametros)
}


pub fn get_offset_cal2(id: i32) -> Result<i32, String> {
    let conn = Connection::open("/home/jesus/cti-invernaderos/prisma/clima.db")
        .map_err(|e| format!("Error al abrir la base de datos: {}", e))?;
    print!("Conectando a la base de datos...");

    let mut stmt = conn.prepare("SELECT valor FROM parametros WHERE id = ?")
        .map_err(|e| format!("Error al preparar la consulta: {}", e))?;

    let offset: i32 = stmt.query_row([id], |row| row.get(0))
        .map_err(|e| format!("Error al obtener el offset: {}", e))?;

    println!("Offset Calefacción 2 para id {}: {}", id, offset);
    Ok(offset)
}


// Establecer el offset de la calefacción 2
pub fn set_offset_cal2(id: i32, valor: i32) -> Result<String, String> {
    // Cambiar la ruta de la base de datos a la correcta
    let conn = Connection::open("/home/jesus/cti-invernaderos/prisma/clima.db").map_err(|e| format!("Error al abrir la base de datos: {}", e))?;
    conn.execute("UPDATE parametros SET valor = ? WHERE id = ?", (valor, id))
        .map_err(|e| format!("Error al actualizar el offset: {}", e))?;
    println!("Nuevo valor de Offset Calefacción 2: {}", valor);
    Ok("Offset actualizado correctamente".to_string())
}
