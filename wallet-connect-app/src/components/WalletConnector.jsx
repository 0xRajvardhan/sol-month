import { useEffect, useState } from "react"
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"

const WalletConnector = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [balance, setBalance] = useState(null);

    const connectWallet = async () => {
        if (window.solana?.isPhantom) {
            try {
                const res = await window.solana.connect();
                setWalletAddress(res.publicKey.toString());
            } catch (err) {
                console.log("Wallet connection failed: ", err);
            }
        } else {
            alert("Install phantom wallet");
        }
    };

    const disconnectWallet = async () => {
        await window.solana.disconnect();
        setWalletAddress(null);
        setBalance(null);
    };

    const getBalance = async (pubKey) => {
        const connection = new Connection(clusterApiUrl('devnet'));
        const lamports = await connection.getBalance(new PublicKey(pubKey));
        setBalance(lamports / 1e9); // Convert to SOL
    };

    useEffect(() => {
        if (walletAddress) getBalance(walletAddress);
    }, [walletAddress]);

    return (
        <div className="p-4 border rounded-xl max-w-md mx-auto text-center">
            {!walletAddress ? (
                <button onClick={connectWallet} className="px-4 py-2 bg-purple-600 text-white rounded-lg">
                    Connect Wallet
                </button>
            ) : (
                <div>
                    <p className="mb-2">Wallet: {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</p>
                    <p className="mb-4">Balance: {balance ?? "..."} SOL</p>
                    <button onClick={disconnectWallet} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
};

export default WalletConnector;