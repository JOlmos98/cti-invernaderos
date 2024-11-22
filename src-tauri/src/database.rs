use rusqlite::{Connection, Result};

// Obtener el offset de la calefacción 2
pub fn get_offset_cal2() -> Result<i32, String> {
    // Cambiar la ruta de la base de datos a la correcta
    let conn = Connection::open("/home/jesus/cti-invernaderos/prisma/clima.db").map_err(|e| format!("Error al abrir la base de datos: {}", e))?;
    let mut stmt = conn.prepare("SELECT valor FROM parametros WHERE id = ?").map_err(|e| format!("Error al preparar la consulta: {}", e))?;
    let offset: i32 = stmt.query_row([1], |row| row.get(0)).map_err(|e| format!("Error al obtener el offset: {}", e))?;
    println!("Offset Calefacción 2: {}", offset);
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
