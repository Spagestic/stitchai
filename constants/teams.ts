import { austriaBundesliga } from "./leagues/austria";
import { belgiumJupilerProLeague } from "./leagues/belgium";
import { bulgariaEfbetLiga } from "./leagues/bulgaria";
import { croatiaSuperSportHnl } from "./leagues/croatia";
import { czechRepublicChanceLiga } from "./leagues/czechRepublic";
import { denmarkSuperliga } from "./leagues/denmark";
import { englandPremierLeague } from "./leagues/england";
import { franceLigue1 } from "./leagues/france";
import { germanyBundesliga } from "./leagues/germany";
import { greeceSuperLeague1 } from "./leagues/greece";
import { israelLigatHaAl } from "./leagues/israel";
import { italySerieA } from "./leagues/italy";
import { netherlandsEredivisie } from "./leagues/netherlands";
import { norwayEliteserien } from "./leagues/norway";
import { polandEkstraklasa } from "./leagues/poland";
import { portugallLigaPortugal } from "./leagues/portugal";
import { romaniaSuperLiga } from "./leagues/romania";
import { russiaPremierLiga } from "./leagues/russia";
import { scotlandScottishPremiership } from "./leagues/scotland";
import { serbiaSuperLiga } from "./leagues/serbia";
import { spainLaLiga } from "./leagues/spain";
import { swedenAllsvenskan } from "./leagues/sweden";
import { switzerlandSuperLeague } from "./leagues/switzerland";
import { turkiyeSuperLig } from "./leagues/turkiye";
import { ukrainePremierLiga } from "./leagues/ukraine";

export type Team = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  league: string;
  logo: Record<string, unknown>;
};

// All teams organized by league
export const allTeams: Team[] = [
  ...austriaBundesliga,
  ...belgiumJupilerProLeague,
  ...bulgariaEfbetLiga,
  ...croatiaSuperSportHnl,
  ...czechRepublicChanceLiga,
  ...denmarkSuperliga,
  ...englandPremierLeague,
  ...franceLigue1,
  ...germanyBundesliga,
  ...greeceSuperLeague1,
  ...israelLigatHaAl,
  ...italySerieA,
  ...netherlandsEredivisie,
  ...norwayEliteserien,
  ...polandEkstraklasa,
  ...portugallLigaPortugal,
  ...romaniaSuperLiga,
  ...russiaPremierLiga,
  ...scotlandScottishPremiership,
  ...serbiaSuperLiga,
  ...spainLaLiga,
  ...swedenAllsvenskan,
  ...switzerlandSuperLeague,
  ...turkiyeSuperLig,
  ...ukrainePremierLiga,
];

export const leagues = [
  "All",
  "Premier League",
  "La Liga",
  "Bundesliga",
  "Serie A",
  "Ligue 1",
  "Liga Portugal",
] as const;

export const popularTeams: Team[] = [
  allTeams.find((t) => t.id === "real-madrid") ?? allTeams[0],
  allTeams.find((t) => t.id === "barcelona") ?? allTeams[1],
  allTeams.find((t) => t.id === "man-united") ?? allTeams[10],
  allTeams.find((t) => t.id === "liverpool") ?? allTeams[11],
  allTeams.find((t) => t.id === "bayern") ?? allTeams[20],
  allTeams.find((t) => t.id === "psg") ?? allTeams[30],
  allTeams.find((t) => t.id === "juventus") ?? allTeams[40],
  allTeams.find((t) => t.id === "sporting") ?? allTeams[48],
];
