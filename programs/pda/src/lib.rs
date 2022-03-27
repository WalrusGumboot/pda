use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

const MAX_TITEL_LENGTE:  usize = 50;
const MAX_AUTEUR_LENGTE: usize = 30;
const MAX_GENRE_LENGTE:  usize = 20;

const MAX_AANTAL_BOEKEN: usize = 3;



#[program]
pub mod pda {
    use super::*;

    pub fn maak_bibliotheek(ctx: Context<InitialiseerBibliotheek>) -> Result<()> {
        let bibliotheek = &mut ctx.accounts.bibliotheek;

        // dit wordt in principe al gedaan door de implementatie van Default
        bibliotheek.boeken = vec![];
        bibliotheek.aantal_boeken = 0;

        // dit daarentegen niet: de canonical bump die gevonden wordt met de gegeven
        // seeds is te vinden met onderstaande functie, echter is dit een Option<u8> want
        // het kan zijn dat die gegeven key niet bestaat indien er een interne error is
        // hier is dat niet het geval, voor alle duidelijkheid.

        bibliotheek.bump = *ctx.bumps.get("bibliotheek-pda").unwrap();

        Ok(())
    }

    pub fn nieuw_boek(ctx: Context<Bibliothecaris>, titel: String, auteur: String, genre: String, isbn: u64) -> Result<()> {
        require!(titel.len()  < MAX_TITEL_LENGTE,  BoekError::TitelTeLang);
        require!(auteur.len() < MAX_AUTEUR_LENGTE, BoekError::AuteurTeLang);
        require!(genre.len()  < MAX_GENRE_LENGTE,  BoekError::GenreTeLang);
        
        let bibliotheek = &mut ctx.accounts.bibliotheek;
       
        Ok(())
    }
}

// We gebruiken deze account-deserialiser om de bibliotheek van een gebruiker
// te initialiseren. We willen hierbij dat elke gebruiker slechts één bibliotheek
// kan aanmaken (een 1:1 correspondentie dus). Om dit te bereiken deriven we een
// adres van de Pubkey van de gebruiker zelf (die dus altijd hetzelfde is).

#[derive(Accounts)]
pub struct InitialiseerBibliotheek<'info> {
    #[account(
        init,
        payer = gebruiker,
        space = 8 + Bibliotheek::space(), // account discriminator + ruimteberekendende functie

        seeds = [
            b"bibliotheek_pda",
            gebruiker.key().as_ref()
        ],

        bump // door deze constraint zoekt Anchor de canonical bump zelf al
    )]
    pub bibliotheek: Account<'info, Bibliotheek>,

    #[account(mut)]
    pub gebruiker: Signer<'info>,
    pub system_program: Program<'info, System>
}

// We gebruiken hier de Bibliothecaris validator om alle Boek-gerelateerde zaken
// te verzorgen. Aangezien we een PDA gebruiken en de ISBN van een boek altijd uniek
// is, hebben we aan de gebruiker Pubkey genoeg informatie om daarna toegang te hebben
// tot alle verdere Boeken die weer gederived zijn van dit Bibliotheek-account.

#[derive(Accounts)]
pub struct Bibliothecaris<'info> {
    pub gebruiker: Signer<'info>,

    #[account(
        mut,
        seeds = [
            b"bibliotheek_pda",
            gebruiker.key().as_ref()
        ],
        bump = bibliotheek.bump // hier moeten we wel bump opgeven, aangezien dit geen init is
    )]
    pub bibliotheek: Account<'info, Bibliotheek>
}


#[derive(Default)] // aangezien init verwacht dat elk account een Default implementatie heeft
#[account]
pub struct Bibliotheek {
    pub eigenaar: Pubkey,
    pub bump: u8,
    pub aantal_boeken: u8,
    pub boeken: Vec<u8> // een vector van bumps vanuit dit account die naar "onze" boeken wijzen
}

impl Bibliotheek {
    fn space() -> usize {
        32 + // pubkey
        1  + // bump
        1  + // aantal boeken is 8 bit = 1 byte
        4  + MAX_AANTAL_BOEKEN * 32 // vector discriminator + max capaciteit * grootte van vector type

        // NB: die 32 van net is verkregen via std::mem::size_of::<Pubkey>()
    }
}

/// Hier hebben we een BoekenMaker, die vanuit een Bibliotheek vertrekkende een
/// bump voor een Boek-account vindt en aanmaakt. We kunnen unieke bumps garanderen
/// aangezien we de ISBN van het Boek gebruiken, die per definitie uniek is.

#[derive(Accounts)]
pub struct BoekenMaker<'info> {
    #[account(
        init,
        payer = bibliotheek,
        space = 8 + Bibliotheek::space(),
        seeds = [
            b"boek-pda",
            &boek.isbn.to_be_bytes() // eventjes wat handmatige serialisatie
        ],
        bump
    )]
    pub bibliotheek: Account<'info, Bibliotheek>,
    
    #[account(mut)]
    pub boek: Account<'info, Boek>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct Boek {
    pub titel:    String,
    pub auteur:   String,
    pub genre:    String,
    pub isbn:     u64,
    pub bump:     u8
}

impl Boek {
    fn space() -> usize {
        8 +                     // account discriminator (eerste 8 bytes van de public key v/h account)
        4 + MAX_TITEL_LENGTE +  // 4 string discriminator bytes + lengte van titel
        4 + MAX_AUTEUR_LENGTE + // ditto
        4 + MAX_GENRE_LENGTE +  // ditto
        8 +                     // unsigned 64-bit int (= 8 bytes)
        1                       // bump
    }
}

#[error_code]
pub enum BoekError {
    #[msg(format!("De opgegeven titel is langer dan {} karakters.", MAX_TITEL_LENGTE))]
    TitelTeLang,

    #[msg(format!("De opgegeven auteur is langer dan {} karakters.", MAX_AUTEUR_LENGTE))]
    AuteurTeLang,

    #[msg(format!("Het opgegeven genre is langer dan {} karakters.", MAX_GENRE_LENGTE))]
    GenreTeLang,

    #[msg("Het maximum aantal boeken is bereikt.")]
    BoekenplankVol
}