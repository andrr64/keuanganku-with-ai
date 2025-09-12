//! Modul ini mendefinisikan fungsi-fungsi yang akan diekspos sebagai command Tauri.
//! Fungsi-fungsi ini bisa dipanggil langsung dari frontend JavaScript.

use crate::models::account::Account;
use crate::services::account_service;

#[tauri::command]
pub fn create_account(
    name: String,
    description: Option<String>,
    balance: f64,
) -> Result<(), String> {
    // Menggunakan as_deref() untuk mengubah Option<String> menjadi Option<&str>
    account_service::create_account(&name, description.as_deref(), balance)
}

#[tauri::command]
pub fn get_all_accounts() -> Result<Vec<Account>, String> {
    account_service::get_all_accounts()
}

#[tauri::command]
pub fn get_account_by_id(id: i64) -> Result<Account, String> {
    account_service::get_account_by_id(id)
}

#[tauri::command]
pub fn update_account(
    id: i64,
    name: String,
    description: Option<String>,
    balance: f64,
) -> Result<(), String> {
    account_service::update_account(id, &name, description.as_deref(), balance)
}

#[tauri::command]
pub fn delete_account(id: i64) -> Result<(), String> {
    account_service::delete_account(id)
}
