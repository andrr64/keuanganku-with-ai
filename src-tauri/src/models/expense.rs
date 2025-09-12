use chrono::NaiveDateTime;
use serde::Serialize;

/// Merepresentasikan satu entri pengeluaran.
#[derive(Serialize, Debug)]
pub struct Expense {
    pub id: i64,
    pub description: String,
    pub amount: f64,
    pub date: NaiveDateTime,
    pub category_id: i64, // Foreign key yang terhubung ke Category
}
