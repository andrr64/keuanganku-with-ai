use crate::db::DB_CONNECTION;
use crate::models::category::{Category, CategoryType};
use rusqlite::{params, Result};
use std::error::Error;
use std::fmt;

// Definisikan struct error kustom untuk konversi yang gagal.
#[derive(Debug)]
pub struct InvalidCategoryTypeError(i16);

// Implementasikan Display agar error bisa dicetak dengan format yang bagus.
impl fmt::Display for InvalidCategoryTypeError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Nilai tidak valid untuk CategoryType: {}", self.0)
    }
}

// Implementasikan trait Error agar struct ini bisa digunakan sebagai error.
impl Error for InvalidCategoryTypeError {}

// Implementasi konversi dari i16 (nilai dari DB) ke enum CategoryType.
// Sekarang menggunakan tipe error kustom.
impl TryFrom<i16> for CategoryType {
    type Error = InvalidCategoryTypeError; // Diubah dari String

    fn try_from(value: i16) -> std::result::Result<Self, Self::Error> {
        match value {
            1 => Ok(CategoryType::Income),
            2 => Ok(CategoryType::Expense),
            // Kembalikan instance dari error kustom
            _ => Err(InvalidCategoryTypeError(value)),
        }
    }
}

/// Membuat entri kategori baru di database.
pub fn create(name: &str, category_type: CategoryType) -> Result<(), String> {
    let conn = DB_CONNECTION.lock().unwrap();
    conn.execute(
        "INSERT INTO categories (name, category_type) VALUES (?1, ?2)",
        // Simpan enum sebagai integer (1 atau 2)
        params![name, category_type as i16],
    )
    .map(|_| ())
    .map_err(|e| e.to_string())
}

/// Mengambil semua data kategori dari database.
pub fn find_all() -> Result<Vec<Category>, String> {
    let conn = DB_CONNECTION.lock().unwrap();
    let mut stmt = conn
        .prepare("SELECT id, name, category_type FROM categories")
        .map_err(|e| e.to_string())?;

    let category_iter = stmt
        .query_map([], |row| {
            let type_val: i16 = row.get(2)?;
            // Sekarang `e` adalah tipe error kustom kita yang mengimplementasikan `Error`,
            // sehingga `Box::new(e)` valid.
            let category_type = CategoryType::try_from(type_val).map_err(|e| {
                rusqlite::Error::FromSqlConversionFailure(
                    2,
                    rusqlite::types::Type::Integer,
                    Box::new(e),
                )
            })?;

            Ok(Category {
                id: row.get(0)?,
                name: row.get(1)?,
                category_type,
            })
        })
        .map_err(|e| e.to_string())?;

    category_iter
        .collect::<rusqlite::Result<Vec<Category>>>()
        .map_err(|e| e.to_string())
}

/// Mengambil satu data kategori berdasarkan ID.
pub fn find_by_id(id: i64) -> Result<Category, String> {
    let conn = DB_CONNECTION.lock().unwrap();
    conn.query_row(
        "SELECT id, name, category_type FROM categories WHERE id = ?1",
        params![id],
        |row| {
            let type_val: i16 = row.get(2)?;
            let category_type = CategoryType::try_from(type_val).map_err(|e| {
                rusqlite::Error::FromSqlConversionFailure(
                    2,
                    rusqlite::types::Type::Integer,
                    Box::new(e),
                )
            })?;

            Ok(Category {
                id: row.get(0)?,
                name: row.get(1)?,
                category_type,
            })
        },
    )
    .map_err(|e| e.to_string())
}

/// Memperbarui data kategori yang ada di database.
pub fn update(id: i64, name: &str, category_type: CategoryType) -> Result<(), String> {
    let conn = DB_CONNECTION.lock().unwrap();
    conn.execute(
        "UPDATE categories SET name = ?1, category_type = ?2 WHERE id = ?3",
        params![name, category_type as i16, id],
    )
    .map(|_| ())
    .map_err(|e| e.to_string())
}

/// Menghapus data kategori dari database berdasarkan ID.
pub fn delete(id: i64) -> Result<(), String> {
    let conn = DB_CONNECTION.lock().unwrap();
    conn.execute("DELETE FROM categories WHERE id = ?1", params![id])
        .map(|_| ())
        .map_err(|e| e.to_string())
}
