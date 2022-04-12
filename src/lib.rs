use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;

near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]

pub struct Contract {}

#[near_bindgen]
impl Contract {
  pub fn hello(&self, name: String) -> std::string::String {
    return "Hello ".to_string() + &name + "!";
  }
}
