use crate::db::DB_CONNECTION;
use crate::models::account::Account;
use rusqlite::{params, Result};

/// Membuat entri akun baru di database.
pub fn create(name: &str, description: Option<&str>, balance: f64) -> Result<(), String> {
    let conn = DB_CONNECTION.lock().unwrap();
    conn.execute(
        "INSERT INTO accounts (name, description, balance) VALUES (?1, ?2, ?3)",
        params![name, description, balance],
    )
    .map(|_| ())
    .map_err(|e| e.to_string())
}

/// Mengambil semua data akun dari database.
pub fn find_all() -> Result<Vec<Account>, String> {
    let conn = DB_CONNECTION.lock().unwrap();
    let mut stmt = conn
        .prepare("SELECT id, name, description, balance FROM accounts")
        .map_err(|e| e.to_string())?;

    let account_iter = stmt
        .query_map([], |row| {
            Ok(Account {
                id: row.get(0)?,
                name: row.get(1)?,
                description: row.get(2)?, // rusqlite akan menangani Option<String> untuk kolom TEXT yang nullable
                balance: row.get(3)?,
            })
        })
        .map_err(|e| e.to_string())?;

    account_iter
        .collect::<rusqlite::Result<Vec<Account>>>()
        .map_err(|e| e.to_string())
}

/// Mengambil satu data akun berdasarkan ID.
pub fn find_by_id(id: i64) -> Result<Account, String> {
    let conn = DB_CONNECTION.lock().unwrap();
    conn.query_row(
        "SELECT id, name, description, balance FROM accounts WHERE id = ?1",
        params![id],
        |row| {
            Ok(Account {
                id: row.get(0)?,
                name: row.get(1)?,
                description: row.get(2)?,
                balance: row.get(3)?,
            })
        },
    )
    .map_err(|e| e.to_string())
}

/// Memperbarui data akun yang ada di database.
pub fn update(id: i64, name: &str, description: Option<&str>, balance: f64) -> Result<(), String> {
    let conn = DB_CONNECTION.lock().unwrap();
    conn.execute(
        "UPDATE accounts SET name = ?1, description = ?2, balance = ?3 WHERE id = ?4",
        params![name, description, balance, id],
    )
    .map(|_| ())
    .map_err(|e| e.to_string())
}

/// Menghapus data akun dari database berdasarkan ID.
pub fn delete(id: i64) -> Result<(), String> {
    let conn = DB_CONNECTION.lock().unwrap();
    conn.execute("DELETE FROM accounts WHERE id = ?1", params![id])
        .map(|_| ())
        .map_err(|e| e.to_string())
}
