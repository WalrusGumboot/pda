// Allereerst importeren we de Anchor client-bibliotheek.

const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3 // Herexport van de SystemProgram uit anchor.web3
const { PublicKey }     = require("@solana/web3.js");

// We maken handmatig een nieuwe connectie met het devnet.
// Overal waar 'confirmed' staat bevestigt dat de connectie daadwerkelijk functioneert
// voordat we ermee gaan werken. Andere opties zijn o.a. 'single' en 'finalized'.
const provider_devnet = new anchor.Provider(
  new anchor.web3.Connection("https://api.devnet.solana.com", "confirmed"),
  anchor.Wallet.local(),
  {
    commitment: "confirmed",
    preflightCommitment: "confirmed"
  }
);

// Daarna gaan we die provider ook echt gebruiken
anchor.setProvider(provider_devnet)

const wallet = provider_devnet.wallet; // we gebruiken de wallet die we daarnet ingegeven hebben

class AnchorProgramma {
  constructor() {
    // We hebben de IDL-definitie van ons programma nodig om
    // communicatie ermeme te vermogenlijken.
    this.idl = JSON.parse(
      require("fs").readFileSync("./target/idl/pda.json", "utf8")
    );
    
    this.programId = new anchor.web3.PublicKey("jmvZ2cau7tnjuUSum5ZvAa8dVpoy6B9g5dyNP7gcb2E");
    this.program   = new anchor.Program(this.idl, this.programId); // met de programma-id en de IDL hebben we genoeg info
  
    // Deze komt later nog, aangezien een constructor niet asynchroon kan zijn
    // (tenminste, niet op een makkelijke manier)
    this.bibliotheekAdres = undefined;
    this.bibliotheekBump  = undefined;
  }

  /// Deze functie derivet een Bibliotheek vanaf de Pubkey van de wallet.
  async maakBibliotheek() {
    // Met de `findProgramAddress` functie op de PublicKey-class kunnen we
    // een PDA "vinden". De seeds worden ingegeven als een array van Buffers
    // en de functie retourneert een array met layout [PDA, bump].

    let [gederiveerdAdres, bump] = await PublicKey.findProgramAddress(
      [Buffer.from("bibliotheek-pda"), wallet.publicKey.toBuffer()],
      this.programId
    );

    // Hierna maken we het ook daadwerkelijk aan binnen ons Anchor-programma.
    await this.program.rpc.maakBibliotheek({
      accounts: {
        bibliotheek:   this.bibliotheekAdres,
        gebruiker:     wallet.publicKey,
        systemProgram: SystemProgram.programId
      }
    });

    // Als dit succesvol gebeurd is, kunnen we de bibliotheekAdres en bibliotheekBump instellen.
    this.bibliotheekAdres = gederiveerdAdres;
    this.bibliotheekBump  = bump;
  }
}

async function main() {
  let p = new AnchorProgramma();
}

console.log("Running client.");
main().then(() => console.log("Success"));