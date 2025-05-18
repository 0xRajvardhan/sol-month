const { Connection,
    clusterApiUrl,
    Keypair,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
} = require('@solana/web3.js');

const fs = require('fs');

// Load the sender's keypair (payer)
const secret = JSON.parse(fs.readFileSync('../../../wallet/id.json'));
const sender = Keypair.fromSecretKey(Uint8Array.from(secret));

//receive public key
const recieverPublicKey = new PublicKey('uTo6DVXrSoopNvfBfofWrfc4umXyV6kKGTeWj71JFwd');

//devnet connection
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

async function main() {
    //amt in sols
    const amount = 4;

    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: sender.publicKey,
            toPubkey: recieverPublicKey,
            lamports: LAMPORTS_PER_SOL * amount,
        })
    )

    const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
    console.log(`✅ Transaction successful: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
}

main().catch(console.error);