/** Category links for the top pill strip and legacy /category/* URLs. */
export const CATEGORY_LINKS: { href: string; label: string }[] = [
  { href: "/category/unblocked-games", label: "Unblocked games" },
  { href: "/category/adventure", label: "Adventure" },
  { href: "/category/arcade", label: "Arcade" },
  { href: "/category/idle", label: "Idle" },
  { href: "/category/running", label: "Running" },
  { href: "/category/strategy", label: "Strategy" },
  { href: "/category/2-players", label: "2 Players" },
  { href: "/category/action", label: "Action" },
  { href: "/category/car", label: "Car" },
  { href: "/category/io", label: ".io" },
  { href: "/category/puzzle", label: "Puzzle" },
  { href: "/category/shooting", label: "Shooting" },
  { href: "/category/simulator", label: "Simulator" },
  { href: "/category/skill", label: "Skill" },
  { href: "/category/sport", label: "Sport" },
  { href: "/category/stickman", label: "Stickman" },
  { href: "/category/multiplayer", label: "Multiplayer" },
  { href: "/category/papas", label: "Papas" },
  { href: "/category/anime", label: "Anime" },
  { href: "/category/flash", label: "Flash" },
  { href: "/category/racing", label: "Racing" },
  { href: "/category/retro", label: "Retro" },
];

/** Larger “browse” tiles on the home page — buttons, not boxed cards (links match /category/*). */
export const BROWSE_CATEGORY_BUTTONS: { href: string; label: string; index: string }[] = [
  { href: "/category/action", label: "Action", index: "01" },
  { href: "/category/racing", label: "Racing", index: "02" },
  { href: "/category/sport", label: "Sports", index: "03" },
  { href: "/category/puzzle", label: "Puzzle", index: "04" },
  { href: "/category/adventure", label: "RPG", index: "05" },
  { href: "/category/strategy", label: "Strategy", index: "06" },
  { href: "/category/arcade", label: "Horror", index: "07" },
  { href: "/category/shooting", label: "Shooting", index: "08" },
];

/** Home “Browse by Categories” cards — Playzo-style row (icon + label + count). */
export const BROWSE_CATEGORY_CARDS: {
  href: string;
  label: string;
  gamesPlus: string;
  icon: string;
  grad: string;
}[] = [
  { href: "/category/action", label: "Action", gamesPlus: "320+", icon: "fa-bolt", grad: "browse-grad--action" },
  { href: "/category/adventure", label: "Adventure", gamesPlus: "180+", icon: "fa-globe", grad: "browse-grad--adventure" },
  { href: "/category/arcade", label: "Arcade", gamesPlus: "250+", icon: "fa-gamepad", grad: "browse-grad--arcade" },
  { href: "/category/racing", label: "Racing", gamesPlus: "120+", icon: "fa-car", grad: "browse-grad--racing" },
  { href: "/category/sport", label: "Sports", gamesPlus: "150+", icon: "fa-futbol-o", grad: "browse-grad--sports" },
  { href: "/category/puzzle", label: "Puzzle", gamesPlus: "200+", icon: "fa-puzzle-piece", grad: "browse-grad--puzzle" },
  { href: "/category/strategy", label: "Strategy", gamesPlus: "100+", icon: "fa-sitemap", grad: "browse-grad--strategy" },
  { href: "/category/multiplayer", label: "Multiplayer", gamesPlus: "80+", icon: "fa-users", grad: "browse-grad--multi" },
];
