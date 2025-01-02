import { HenloBalance } from "~/components/HenloBalance";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            My <span className="text-[hsl(280,100%,70%)]">HENLO</span>{" "}
            Assessment
          </h1>

          <div className="flex flex-col items-center gap-4">
            <ConnectButton />
            <HenloBalance />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
