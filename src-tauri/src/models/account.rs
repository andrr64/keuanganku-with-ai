use serde::Serialize;

/// Merepresentasikan sebuah akun (misal: dompet, rekening bank).
#[derive(Serialize, Debug)]
pub struct Account {
    pub id: i64,
    pub name: String,
    pub description: Option<String>, // Deskripsi bisa jadi tidak ada (NULL)
    pub balance: f64,
}
