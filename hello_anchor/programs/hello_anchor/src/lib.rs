use anchor_lang::prelude::*;

declare_id!("3nantEanKHuNfXSY3uCXEPJsQqJDaSjbLEKZjWLtHeG7");

#[program]
pub mod hello_anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.data = "".to_string();
        Ok(())
    }
    pub fn update(ctx: Context<Update>, message: String) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.data = message;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 280)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[account]

pub struct BaseAccount {
    pub data: String,
}
