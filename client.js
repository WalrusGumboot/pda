// Allereerst importeren we de Anchor client-bibliotheek.

const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3 // Herexport van de SystemProgram uit anchor.web3

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
    // We hebben de IDL-definitie van ons programma nodig in 
    this.idl = JSON.parse(
      require("fs").readFileSync("./target/idl/pda.json", "utf8")
    );
  
    this.programId = new anchor.web3.PublicKey("jmvZ2cau7tnjuUSum5ZvAa8dVpoy6B9g5dyNP7gcb2E");
    this.program   = new anchor.Program(this.idl, this.programId);
  }
}

async function main() {
  let p = new AnchorProgramma();
}

console.log("Running client.");
main().then(() => console.log("Success"));