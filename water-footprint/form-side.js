let userAddress = '';
let targetAddress = '0xb2033f3c854e54cb7cd1a2ee1f5bae39ec859b3734c071e4330208099204bb7b';
let initialTargetBalance = 0;

const connectButton = document.getElementById('connectButton');
const addressInput = document.getElementById('walletAddress');
const sentCheckbox = document.getElementById('sent-checkbox');
const submitButton = document.getElementById('submitButton');


function updateButton(isConnected, address = '') {
    if (isConnected) {
        connectButton.textContent = "Connected to Petra";
        connectButton.style.backgroundColor = "darkgreen";
        userAddress = address;
        addressInput.value = address;
    } else {
        connectButton.textContent = "Connect Petra Wallet";
        connectButton.style.backgroundColor = "#007bff";
        addressInput.value = '';
        userAddress = '';
    }
}


async function connectPetraWallet() {
    if (typeof window.aptos === 'undefined') {
        alert("Please install the Petra wallet extension to continue.");
        window.open('https://petra.app/', '_blank');
        return;
    }

    try {
        const response = await window.aptos.connect();
        const account = await window.aptos.account();
        updateButton(true, account.address);
        userAddress = account.address;
        console.log("Connected to Petra:", account.address);
    } catch (error) {
        console.error('Error connecting to Petra wallet:', error);
    }
}

connectButton.addEventListener('click', connectPetraWallet);

async function checkConnection() {
    if (typeof window.aptos !== 'undefined') {
        const account = await window.aptos.account();
        if (account) {
            updateButton(true, account.address);
            userAddress = account.address;
        }
    }
    initialTargetBalance = await getBalance(targetAddress);
    console.log(`Initial balance of target address (${targetAddress}): ${initialTargetBalance} APT`);
}

window.onload = checkConnection;

async function getBalance(address) {
    const url = `https://fullnode.mainnet.aptoslabs.com/v1/accounts/${address}/resource/0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const balance = parseInt(data.data.coin.value) / 1e8;
        console.log(`Balance fetched for ${address}: ${balance} APT`);
        return balance;
    } catch (error) {
        console.error('Error fetching balance:', error);
        return 0;
    }
}

async function checkTargetBalance() {
    const newBalance = await getBalance(targetAddress);
    console.log(`Current balance of target address (${targetAddress}): ${newBalance} APT`);

    if (newBalance > initialTargetBalance) {
        console.log("Balance has increased, purchase is successful!");
        alert("Purchase is successful!");
        resetForm();
        clearInterval(balanceCheckInterval);
    } else {
        console.log("No balance change detected.");
    }
}

let balanceCheckInterval;
async function startBalancePolling() {
    balanceCheckInterval = setInterval(checkTargetBalance, 3000);
}

async function startTransaction() {
    if (validateForm()) {
        const aptAmount = 0.001;

        const transaction = {
            type: "entry_function_payload",
            function: "0x1::coin::transfer",
            arguments: [targetAddress, (aptAmount * 1e8).toString()],
            type_arguments: ["0x1::aptos_coin::AptosCoin"]
        };

        try {
            const response = await window.aptos.signAndSubmitTransaction(transaction);
            console.log('Transaction sent:', response.hash);
            alert('Transaction submitted! Hash: ' + response.hash);

            startBalancePolling();
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    } else {
        alert('Please fill out all required fields and confirm the checkbox.');
    }
}

function validateForm() {
    return sentCheckbox.checked &&
        document.getElementById('products').value !== '' &&
        document.getElementById('options').value !== '' &&
        document.getElementById('mail').value !== '' &&
        document.getElementById('phone').value !== '' &&
        document.getElementById('deliveryAddress').value !== '';
}

function resetForm() {
    document.getElementById('products').value = '';
    document.getElementById('options').value = '';
    document.getElementById('mail').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('deliveryAddress').value = '';
    sentCheckbox.checked = false;
}