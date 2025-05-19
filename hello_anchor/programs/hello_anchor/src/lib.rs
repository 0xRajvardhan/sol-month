use anchor_lang::prelude::*;

declare_id!("3nantEanKHuNfXSY3uCXEPJsQqJDaSjbLEKZjWLtHeG7");

#[program]
pub mod hello_anchor {
    use super::*;
    pub fn say_hello(_ctx: Context<SayHello>) -> Result<()> {
        msg!("Hello, Anchor World!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SayHello {}
