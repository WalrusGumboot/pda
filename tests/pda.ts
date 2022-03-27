import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Pda } from "../target/types/pda";

describe("pda", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Pda as Program<Pda>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
