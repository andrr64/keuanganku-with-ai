use crate::db::DB_CONNECTION;
use crate::models::income::Income;
use chrono::NaiveDateTime;
use rusqlite::{params, Result};

/// Membuat entri pemasukan baru di database.
pub fn create(
    description: &str,
    amount: f64,
    date: NaiveDateTime,
    category_id: i64,
) -> Result<(), String> {
    let conn = DB_CONNECTION.lock().unwrap();

    // Simpan datetime sebagai string dengan format YYYY-MM-DD HH:MM:SS
    let date_str = date.format("%Y-%m-%d %H:%M:%S").to_string();

    conn.execute(
        "INSERT INTO incomes (description, amount, date, category_id) VALUES (?1, ?2, ?3, ?4)",
        params![description, amount, date_str, category_id],
    )
    .map(|_| ())
    .map_err(|e| e.to_string())
}

/// Mengambil semua data pemasukan dari database.
pub fn find_all() -> Result<Vec<Income>, String> {
    let conn = DB_CONNECTION.lock().unwrap();
    let mut stmt = conn
        .prepare("SELECT id, description, amount, date, category_id FROM incomes")
        .map_err(|e| e.to_string())?;

    let income_iter = stmt
        .query_map([], |row| {
            // Kolom date disimpan sebagai TEXT, perlu di-parse kembali ke NaiveDateTime.
            let date_str: String = row.get(3)?;
            let date =
                NaiveDateTime::parse_from_str(&date_str, "%Y-%m-%d %H:%M:%S").map_err(|e| {
                    rusqlite::Error::FromSqlConversionFailure(
                        3,
                        rusqlite::types::Type::Text,
                        Box::new(e),
                    )
                })?;

            Ok(Income {
                id: row.get(0)?,
                description: row.get(1)?,
                amount: row.get(2)?,
                date,
                category_id: row.get(4)?,
            })
        })
        .map_err(|e| e.to_string())?;

    let incomes = income_iter
        .collect::<rusqlite::Result<Vec<Income>>>()
        .map_err(|e| e.to_string())?;

    Ok(incomes)
}

/// Mengambil satu data pemasukan berdasarkan ID.
pub fn find_by_id(id: i64) -> Result<Income, String> {
    let conn = DB_CONNECTION.lock().unwrap();
    conn.query_row(
        "SELECT id, description, amount, date, category_id FROM incomes WHERE id = ?1",
        params![id],
        |row| {
            let date_str: String = row.get(3)?;
            let date =
                NaiveDateTime::parse_from_str(&date_str, "%Y-%m-%d %H:%M:%S").map_err(|e| {
                    rusqlite::Error::FromSqlConversionFailure(
                        3,
                        rusqlite::types::Type::Text,
                        Box::new(e),
                    )
                })?;

            Ok(Income {
                id: row.get(0)?,
                description: row.get(1)?,
                amount: row.get(2)?,
                date,
                category_id: row.get(4)?,
            })
        },
    )
    .map_err(|e| e.to_string())
}

/// Memperbarui data pemasukan yang ada di database.
pub fn update(
    id: i64,
    description: &str,
    amount: f64,
    date: NaiveDateTime,
    category_id: i64,
) -> Result<(), String> {
    let conn = DB_CONNECTION.lock().unwrap();
    let date_str = date.format("%Y-%m-%d %H:%M:%S").to_string();

    conn.execute(
        "UPDATE incomes SET description = ?1, amount = ?2, date = ?3, category_id = ?4 WHERE id = ?5",
        params![description, amount, date_str, category_id, id],
    )
    .map(|_| ())
    .map_err(|e| e.to_string())
}

/// Menghapus data pemasukan dari database berdasarkan ID.
pub fn delete(id: i64) -> Result<(), String> {
    let conn = DB_CONNECTION.lock().unwrap();
    conn.execute("DELETE FROM incomes WHERE id = ?1", params![id])
        .map(|_| ())
        .map_err(|e| e.to_string())
}
