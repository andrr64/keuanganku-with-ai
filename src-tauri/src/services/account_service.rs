//! Modul ini berisi logika bisnis yang terkait dengan akun.
//! Service layer bertindak sebagai perantara antara command layer (API) dan repository layer (database).

use crate::models::account::Account;
use crate::repositories::account_repository;

/// Membuat akun baru.
pub fn create_account(name: &str, description: Option<&str>, balance: f64) -> Result<(), String> {
    // Di sini Anda bisa menambahkan validasi, misalnya:
    if name.trim().is_empty() {
        return Err("Nama akun tidak boleh kosong.".to_string());
    }
    if balance < 0.0 {
        return Err("Saldo awal tidak boleh negatif.".to_string());
    }

    // Panggil repository untuk menyimpan data.
    account_repository::create(name, description, balance)
}

/// Mengambil semua akun yang ada.
pub fn get_all_accounts() -> Result<Vec<Account>, String> {
    account_repository::find_all()
}

/// Mengambil satu akun berdasarkan ID-nya.
pub fn get_account_by_id(id: i64) -> Result<Account, String> {
    account_repository::find_by_id(id)
}

/// Memperbarui akun yang ada.
pub fn update_account(
    id: i64,
    name: &str,
    description: Option<&str>,
    balance: f64,
) -> Result<(), String> {
    // Validasi tambahan bisa diletakkan di sini.
    if name.trim().is_empty() {
        return Err("Nama akun tidak boleh kosong.".to_string());
    }

    account_repository::update(id, name, description, balance)
}

/// Menghapus akun berdasarkan ID.
pub fn delete_account(id: i64) -> Result<(), String> {
    // Mungkin ada logika bisnis tambahan sebelum menghapus,
    // misalnya memeriksa apakah akun masih memiliki transaksi.
    account_repository::delete(id)
}
