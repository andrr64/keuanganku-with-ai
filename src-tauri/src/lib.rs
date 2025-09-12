// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod commands;
pub mod db;
pub mod models;
pub mod repositories;
pub mod services;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            commands::account_command::create_account,
            commands::account_command::get_all_accounts,
            commands::account_command::get_account_by_id,
            commands::account_command::update_account,
            commands::account_command::delete_account
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
