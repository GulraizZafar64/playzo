import HomeGameGrid from "./HomeGameGrid";
import type { Game } from "@/lib/types";

export default function HomeGameGridShell({ initialGames }: { initialGames: Game[] }) {
  return <HomeGameGrid initialGames={initialGames} />;
}
