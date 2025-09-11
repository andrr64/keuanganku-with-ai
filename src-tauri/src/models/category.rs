use serde::Serialize;

/// Enum untuk merepresentasikan tipe kategori.
/// Akan di-serialize sebagai integer (1 untuk Income, 2 untuk Expense).
#[derive(Serialize, Debug, Clone, Copy)]
#[repr(i16)]
pub enum CategoryType {
    Income = 1,
    Expense = 2,
}

/// Merepresentasikan sebuah kategori untuk pemasukan atau pengeluaran.
#[derive(Serialize, Debug)]
pub struct Category {
    pub id: i64,
    pub name: String,
    pub category_type: CategoryType,
}
