import { useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@coral-xyz/anchor";

import idl from "../idl.json";
import kp from "../../../keypair.json"

const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl("devnet");
const opts = { preflightCommitment: "processed" };

const MessageBoard = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [message, setMessage] = useState("");
    const [storedMessage, setStoredMessage] = useState("")

    const baseAccount = web3.Keypair.fromSecretKey(Uint8Array.from(kp));

    const getProvider = () => {
        const connection = new Connection(network, opts.preflightCommitment);
        const provider = new AnchorProvider(connection, window.solana, opts);
        return provider;
    };

    const connectWallet = async () => {
        const res = await window.solana.connect();
        setWalletAddress(res.publicKey.toString());
    };

    const sendMessage = async () => {
        try {
            const provider = getProvider();
            const program = new Program(idl, programID, provider);

            await program.methods.update(message).accounts({
                baseAccount: baseAccount.publicKey
            }).rpc();

            console.log("Message sent:", message);
            getMessage();

        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    const getMessage = async () => {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
        setStoredMessage(account.data);
    };

    useEffect(() => {
        if (walletAddress) getMessage();
    }, [walletAddress]);

    return (
        <div className="p-4">
            {!walletAddress ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <div>
                    <p>Wallet: {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</p>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message"
                        className="border px-2 py-1"
                    />
                    <button onClick={sendMessage} className="ml-2 bg-blue-600 text-white px-2 py-1">
                        Submit
                    </button>
                    <div className="mt-4">
                        <h3>Stored Message:</h3>
                        <p>{storedMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageBoard;