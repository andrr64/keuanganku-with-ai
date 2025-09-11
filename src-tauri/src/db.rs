use rusqlite::{Connection, Result};
use std::sync::Mutex;
use lazy_static::lazy_static;

// Mengganti nama database agar lebih relevan
lazy_static! {
    pub static ref DB_CONNECTION: Mutex<Connection> =
        Mutex::new(Connection::open("finance.db").expect("failed to open database"));
}

// 1. Variabel DDL (Data Definition Language) untuk setiap model
const CREATE_CATEGORIES_TABLE: &str = r#"
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        category_type INTEGER NOT NULL CHECK(category_type IN (1, 2))
    )
"#;

const CREATE_INCOME_TABLE: &str = r#"
    CREATE TABLE IF NOT EXISTS income (
        id INTEGER PRIMARY KEY,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories (id)
    )
"#;

const CREATE_EXPENSES_TABLE: &str = r#"
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories (id)
    )
"#;


// Fungsi untuk inisialisasi & migrasi database
pub fn init_database() -> Result<()> {
    let conn = DB_CONNECTION.lock().unwrap();

    // 2. Menjalankan setiap query DDL untuk membuat tabel
    //    Penting untuk membuat tabel 'categories' terlebih dahulu
    //    karena tabel lain memiliki foreign key ke sana.
    conn.execute(CREATE_CATEGORIES_TABLE, [])?;
    conn.execute(CREATE_INCOME_TABLE, [])?;
    conn.execute(CREATE_EXPENSES_TABLE, [])?;
    
    Ok(())
}
