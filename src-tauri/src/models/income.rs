use serde::Serialize;
use chrono::NaiveDateTime;

/// Merepresentasikan satu entri pemasukan.
#[derive(Serialize, Debug)]
pub struct Income {
    pub id: i64,
    pub description: String,
    pub amount: f64, // Menggunakan f64 untuk nilai moneter
    pub date: NaiveDateTime,
    pub category_id: i64, // Foreign key yang terhubung ke Category
}
