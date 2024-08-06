import { Command } from "commander";
import { listenOnNewListings, listenOnTrades } from "./listen";
import { grabToken } from "./token";

const program = new Command();

program
  .name("pump-ts")
  .description("CLI interface for pump related stuff in TypeScript")
  .version("1.0.0");

program
  .command("grab-token")
  .description("Grab token information for a given mint address")
  .argument("<mint>", "The mint address of the token")
  .action(async (mint: string) => {
    console.log(`Grabbing token information for mint: ${mint}`);
    try {
      const result = await grabToken(mint);
      console.log("Token information:", result);
    } catch (error) {
      console.error("Error grabbing token:", error);
    }
  });

program
  .command("listen")
  .option("--sniper-url <url>", "sniper url", "http://sniper:6969")
  .description("Listen for new listings")
  .action(async () => {
    console.log("Listening for new listings");
    try {
      await listenOnNewListings(program.opts().sniper);
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("listen-trades")
  .description("Listen on new pump trades")
  .action(async () => {
    console.log("Listening for new trades");
    try {
      await listenOnTrades();
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("health")
  .description("check if the pump service is healthy")
  .option("--sniper-url <url>", "sniper url", "http://sniper:6969")
  .action(async () => {
    try {
      const sniperUrl = program.opts().sniper;
      const res = await fetch(`${sniperUrl}/health`);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });

await (async function main() {
  await program.parseAsync(process.argv);
})();
