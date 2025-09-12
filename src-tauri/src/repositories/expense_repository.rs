use crate::db::DB_CONNECTION;
use crate::models::expense::Expense;
use chrono::NaiveDateTime; // Diubah dari NaiveDate ke NaiveDateTime
use rusqlite::{params, Result};

/// Membuat entri pengeluaran baru di database.
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
        "INSERT INTO expenses (description, amount, date, category_id) VALUES (?1, ?2, ?3, ?4)",
        params![description, amount, date_str, category_id],
    )
    .map(|_| ()) // Mengubah hasil dari execute menjadi ()
    .map_err(|e| e.to_string())
}

/// Mengambil semua data pengeluaran dari database.
pub fn find_all() -> Result<Vec<Expense>, String> {
    let conn = DB_CONNECTION.lock().unwrap();
    let mut stmt = conn
        .prepare("SELECT id, description, amount, date, category_id FROM expenses")
        .map_err(|e| e.to_string())?;

    let expense_iter = stmt
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

            Ok(Expense {
                id: row.get(0)?,
                description: row.get(1)?,
                amount: row.get(2)?,
                date, // Sekarang menjadi NaiveDateTime
                category_id: row.get(4)?,
            })
        })
        .map_err(|e| e.to_string())?;

    let expenses = expense_iter
        .collect::<rusqlite::Result<Vec<Expense>>>()
        .map_err(|e| e.to_string())?;

    Ok(expenses)
}

/// Mengambil satu data pengeluaran berdasarkan ID.
pub fn find_by_id(id: i64) -> Result<Expense, String> {
    let conn = DB_CONNECTION.lock().unwrap();
    conn.query_row(
        "SELECT id, description, amount, date, category_id FROM expenses WHERE id = ?1",
        params![id],
        |row| {
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

            Ok(Expense {
                id: row.get(0)?,
                description: row.get(1)?,
                amount: row.get(2)?,
                date, // Sekarang menjadi NaiveDateTime
                category_id: row.get(4)?,
            })
        },
    )
    .map_err(|e| e.to_string())
}

/// Memperbarui data pengeluaran yang ada di database.
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
        "UPDATE expenses SET description = ?1, amount = ?2, date = ?3, category_id = ?4 WHERE id = ?5",
        params![description, amount, date_str, category_id, id],
    )
    .map(|_| ()) // Mengubah hasil dari execute menjadi ()
    .map_err(|e| e.to_string())
}

/// Menghapus data pengeluaran dari database berdasarkan ID.
pub fn delete(id: i64) -> Result<(), String> {
    let conn = DB_CONNECTION.lock().unwrap();
    conn.execute("DELETE FROM expenses WHERE id = ?1", params![id])
        .map(|_| ()) // Mengubah hasil dari execute menjadi ()
        .map_err(|e| e.to_string())
}
