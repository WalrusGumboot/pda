const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3

const provider_devnet = new anchor.Provider(
  new anchor.web3.Connection("https://api.devnet.solana.com", "confirmed"),
  anchor.Wallet.local(),
  {
    commitment: "confirmed",
    preflightCommitment: "confirmed"
  }
);

anchor.setProvider(provider_devnet)

const prov = anchor.Provider.local();

class AnchorProgramma {
  constructor() {
    this.idl = JSON.parse(
      require("fs").readFileSync("./target/idl/pda.json", "utf8")
    );
  
    this.programId = new anchor.web3.PublicKey("J6ePGpGFxu76Ygq1uwvSvLdNqWwhsq4o2uXMJ9GiDm2g");
    this.program   = new anchor.Program(this.idl, this.programId);
  }
}

async function main() {
  let p = new AnchorProgramma();
}

console.log("Running client.");
main().then(() => console.log("Success"));