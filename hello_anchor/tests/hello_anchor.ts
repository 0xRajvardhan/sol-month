const anchor = require('@coral-xyz/anchor');
const { SystemProgram } = anchor.web3;

describe('hello_anchor', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.HelloAnchor;

  const baseAccount = anchor.web3.Keypair.generate();

  it('Initializes the account', async () => {
    await program.methods.initialize().accounts({
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    }).signers([baseAccount]).rpc();

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Initialized with:', account.data);
  });

  it('Updates the message', async () => {
    await program.methods.update("Solana is fast!").accounts({
      baseAccount: baseAccount.publicKey,
    }).rpc();

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Updated message:', account.data);
  });
});
