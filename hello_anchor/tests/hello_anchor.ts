const anchor = require('@coral-xyz/anchor');

describe('hello_anchor', () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.HelloAnchor;

  it('Says hello!', async () => {
    const tx = await program.methods.sayHello().rpc();
    console.log("Transaction signature:", tx);
  });
});
