module MyEcoSteps::Marketplace {
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::coin::{transfer};
    use aptos_std::signer;
    use aptos_std::vector; // <-- Importing the vector module from the standard library

    // Struct to store transactions
    struct TransactionLog has key {
        transactions: vector<Transaction>,
    }

    struct Transaction has copy, drop, store {
        sender: address,
        recipient: address,
        amount: u64,
    }

    // Initialize the TransactionLog resource
    public fun initialize_account(account: &signer) {
        move_to(account, TransactionLog {
            transactions: vector::empty<Transaction>() // Using vector::empty to initialize
        });
    }

    // Function to record a transaction
    fun record_transaction(sender: &signer, recipient: address, amount: u64) acquires TransactionLog {
        let txn_log = borrow_global_mut<TransactionLog>(signer::address_of(sender));
        vector::push_back(&mut txn_log.transactions, Transaction { sender: signer::address_of(sender), recipient, amount }); // Using vector::push_back
    }

    // Function to perform the purchase
    public fun make_purchase(sender: &signer, recipient: address, amount: u64) acquires TransactionLog {
        // Transfer the APT coin
        transfer<AptosCoin>(sender, recipient, amount);
        // Record the transaction
        record_transaction(sender, recipient, amount);
    }
}
