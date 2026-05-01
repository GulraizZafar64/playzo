export interface GameDescription {
  title: string;
  genre: string;
  metaDescription: string;
  description: string;
  howToPlay: string;
  tips: string[];
  audience: string;
  relatedGenre: string;
}

/** ~100 words — matches catalog / remote meta trimming in `scripts/generate-games.mjs`. */
const CATALOG_ABOUT_MAX_WORDS = 100;

function truncateToWords(text: string, maxWords: number): string {
  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}…`;
}

export const MANUAL_DESCRIPTIONS: Record<string, GameDescription> = {
  "1v1-lol": {
    title: "1v1 LOL",
    genre: "Shooting / Building",
    metaDescription:
      "1v1 LOL: competitive building and shooting in the browser. Face a live opponent — outbuild their cover and win the duel. Free to play.",
    description:
      "1v1 LOL is a competitive online game combining third-person shooting with real-time building. You face a live opponent and must outbuild their cover while outshooting their position. Matches are short, skill-based, and highly replayable.",
    howToPlay: `- WASD to move your character
- Left-click to shoot
- Q to place a wall instantly
- E to place a ramp
- F to place a floor
- G to enter edit mode on a placed structure
- Scroll wheel to switch between weapons`,
    tips: [
      "Build a ramp above your opponent immediately — high ground gives you a shooting angle they cannot easily block from below.",
      "Memorize the wall key (Q by default) and press it the instant you take damage — reactive walling stops follow-up shots.",
      "Never reload while standing still — strafe sideways during every reload animation so you are harder to hit.",
      "Edit your own walls to open a window, shoot through it, then close it again — opponents cannot predict when you will peek.",
    ],
    audience:
      "Players who enjoy fast competitive games and want to improve both aim and building speed at the same time.",
    relatedGenre: "shooting",
  },
  // BATCH 1 — ACTION/SHOOTING
  "among-us": {
    title: "Among Us",
    genre: "Action",
    metaDescription: "Play Among Us free online! Find the impostor or complete your tasks as a crewmate in this thrilling social deduction game. No download required on Playverse.",
    description: "Among Us is a legendary social deduction game where players work together as crewmates to maintain a spaceship while one or more hidden impostors attempt to sabotage the mission. It is a masterpiece of psychological tension and teamwork that turns friends into rivals in a race for survival.",
    howToPlay: "Use WASD or Arrow keys to move your character. Click the 'Use/Report' button or press Space to interact with tasks. Impostors use the 'Kill' button to eliminate crewmates.",
    tips: [
      "Innocent crewmates should always travel in pairs to witness each other's actions.",
      "As an impostor, fake tasks by standing near interactive objects for a realistic duration.",
      "Pay close attention to the vent locations to identify suspicious movements from the impostor.",
    ],
    audience: "Perfect for fans of mystery and social strategy who enjoy testing their intuition and bluffing skills.",
    relatedGenre: "action",
  },
  "apple-shooter-1": {
    title: "Apple Shooter",
    genre: "Shooting",
    metaDescription: "Test your archery skills in Apple Shooter. Aim carefully to hit the apple on your friend's head. Play this free browser game with no download needed.",
    description: "Apple Shooter is a classic physics-based archery game that rewards precision and steady hands. Your objective is simple but dangerous: shoot the apple off the top of your brave partner's head without causing an accidental tragedy.",
    howToPlay: "Hold the Left Mouse Button to draw your bow. Move the mouse to adjust your angle and power. Release the button to fire your arrow.",
    tips: [
      "Aim slightly above the apple to account for the arrow's natural gravity over long distances.",
      "Start with low power to gauge the distance, then increase it slowly for subsequent shots.",
      "Stay calm; high-pressure rounds require a steady hand to avoid hitting your friend.",
    ],
    audience: "Ideal for players who enjoy precision challenges and physics-based skill games.",
    relatedGenre: "shooting",
  },
  "armed-forces-io": {
    title: "Armed Forces.io",
    genre: "Shooting",
    metaDescription: "Join the elite squad in Armed Forces.io. Experience intense multiplayer combat in this free browser game. No download or account required to play online.",
    description: "Armed Forces.io is a fast-paced multiplayer FPS that brings tactical combat straight to your browser. With various weapon loadouts and competitive maps, it challenges players to master their reflexes and outshoot opponents in real-time battles.",
    howToPlay: "Use WASD to move and your Mouse to aim and fire. Press 'R' to reload, 'Space' to jump, and 'Shift' to sprint through dangerous zones.",
    tips: [
      "Always aim for the head to eliminate enemies efficiently and conserve your ammunition.",
      "Use environmental cover like walls and crates to reload safely during heavy firefights.",
      "Keep an eye on the mini-map to anticipate enemy troop movements and flanking maneuvers.",
    ],
    audience: "Great for competitive players who enjoy first-person shooters and tactical team combat.",
    relatedGenre: "shooting",
  },
  "blockpost": {
    title: "Blockpost",
    genre: "Shooting",
    metaDescription: "Enter the cubic battlefield of Blockpost. A tactical block-styled FPS with diverse weapons. Play this free browser game with no download on Playverse.",
    description: "Blockpost combines the aesthetics of block-building worlds with the intense mechanics of a competitive shooter. Featuring a massive arsenal and customizable loadouts, it offers a deep tactical experience in a charmingly pixelated environment.",
    howToPlay: "Control movement with WASD and aim with the Mouse. Left-click to fire, Right-click to aim down sights. Use scroll wheel or numbers 1-5 to switch your weapons.",
    tips: [
      "Experiment with different weapon types to find the best fit for your specific playstyle.",
      "Crouching while firing significantly improves your accuracy by reducing weapon recoil.",
      "Learn the layouts of the maps to find the best sniping spots and defensive choke points.",
    ],
    audience: "Appeals to fans of retro aesthetics and high-stakes competitive first-person shooters.",
    relatedGenre: "shooting",
  },
  "battle-royale-noob-vs-pro": {
    title: "Battle Royale: Noob vs Pro",
    genre: "Action",
    metaDescription: "Survivor the arena in Battle Royale: Noob vs Pro. A comical take on the survival genre. Play free online with no download or install required today.",
    description: "In Battle Royale: Noob vs Pro, you enter a chaotic arena where only one player can emerge victorious. This game parodies the survival genre with goofy character interactions and fast-paced combat that requires both luck and quick thinking to win.",
    howToPlay: "Move with WASD or Arrow keys. Use the Mouse to aim at targets and click to interact with the environment. Press 'E' to pick up weapons and health kits.",
    tips: [
      "Avoid the center of the map early in the game to minimize your risk of being spotted.",
      "Prioritize finding a reliable weapon as soon as you land to defend yourself against attackers.",
      "Stay within the safe zone circle to avoid taking massive damage from the encroaching storm.",
    ],
    audience: "Suits players who enjoy lighthearted survival games and comical character-based action.",
    relatedGenre: "action",
  },
  "awesome-tanks": {
    title: "Awesome Tanks",
    genre: "Arcade",
    metaDescription: "Total destruction awaits in Awesome Tanks. Upgrade your machine and blast through enemies in this free browser game. Play with no download right now.",
    description: "Awesome Tanks is a classic top-down shooter where you control a powerful tank on a mission of total destruction. Navigate through enemy-filled levels, destroy bunkers, and collect gold to upgrade your tank into an unstoppable war machine.",
    howToPlay: "Move your tank using WASD or Arrow keys. Aim your turret with the Mouse and click to fire your main cannon. Collect gold dropped by defeated enemies.",
    tips: [
      "Prioritize upgrading your armor first to survive longer in the more difficult later stages.",
      "Destroy crates and walls to find hidden gold and power-ups that boost your temporary firing speed.",
      "Use the 'fog of war' to your advantage by peeking around corners before fully committing.",
    ],
    audience: "Perfect for fans of classic arcade shooters who love upgrading their gear and causing mayhem.",
    relatedGenre: "arcade",
  },
  "awesome-tanks-2": {
    title: "Awesome Tanks 2",
    genre: "Arcade",
    metaDescription: "The tanks are back in Awesome Tanks 2. More upgrades, bigger explosions, and better maps. Play this free browser game with no download on Playverse.",
    description: "Awesome Tanks 2 builds upon the success of its predecessor with more weapons, tougher enemies, and more intricate level designs. It delivers a refined top-down combat experience that rewards both aggressive play and careful resource management.",
    howToPlay: "Drive with WASD or Arrow keys. Aim with the Mouse and click to fire. Use the numbers 1-9 to quickly switch between different heavy weapon types.",
    tips: [
      "Save your heavy rockets for boss enemies and heavily fortified bunkers to save time.",
      "Upgrade your visibility range early to spot enemies before they have a chance to fire at you.",
      "Stay mobile; a stationary tank is an easy target for enemy mortars and kamikaze units.",
    ],
    audience: "Ideal for players who enjoyed the first game and want more depth and destructive options.",
    relatedGenre: "arcade",
  },
  "arcane-archer": {
    title: "Arcane Archer",
    genre: "Shooting",
    metaDescription: "Master magical arrows in Arcane Archer. A unique blend of archery and fantasy spells. Play this free browser game with no download or install today.",
    description: "Arcane Archer puts a mystical twist on the classic archery genre. You play as an elite elven archer who must defend the realm using a variety of enchanted arrows, each with unique elemental properties and destructive capabilities.",
    howToPlay: "Move with WASD or Arrow keys. Use the Mouse to aim your bow. Click to fire standard arrows or use number keys to activate your magical abilities.",
    tips: [
      "Combine elemental arrows for maximum damage; try freezing enemies before using an explosive shot.",
      "Keep an eye on your mana pool to ensure you have enough energy for critical defensive spells.",
      "Focus on eliminating fast-moving flying enemies first as they are the hardest to hit under pressure.",
    ],
    audience: "Great for fans of fantasy settings who enjoy skill-based shooting and magical ability combos.",
    relatedGenre: "shooting",
  },
  "archer-master-3d-castle-defense": {
    title: "Archer Master 3D: Castle Defense",
    genre: "Shooting",
    metaDescription: "Defend the walls in Archer Master 3D. Protect your kingdom from waves of enemies in this free browser game. Play online now with no download.",
    description: "Archer Master 3D: Castle Defense is an immersive first-person defense game. As the lead archer on the castle ramparts, you must fend off hordes of invading monsters and soldiers using your incredible speed and pinpoint accuracy.",
    howToPlay: "Move your view with the Mouse to aim. Click and hold to draw your bow, then release to fire. Use the spacebar to activate your ultimate defensive skills.",
    tips: [
      "Aim for the head of larger monsters to deal critical damage and knock them back.",
      "Prioritize siege engines and ladders to prevent the enemy from breaching the castle walls.",
      "Upgrade your firing speed from the shop between waves to handle the increasing enemy density.",
    ],
    audience: "Suits players who enjoy defensive strategy and high-energy first-person shooting challenges.",
    relatedGenre: "shooting",
  },
  "avoid-dying": {
    title: "Avoid Dying",
    genre: "Action",
    metaDescription: "Survival is the only goal in Avoid Dying. Navigate lethal traps and escape death in this free browser game. No download or account required to play.",
    description: "Avoid Dying is a high-stakes action game that tests your reflexes and spatial awareness. Each level is a gauntlet of lethal traps, moving blades, and bottomless pits that you must navigate with perfect timing to stay alive.",
    howToPlay: "Use WASD or Arrow keys to move and jump through the environment. Time your movements to pass through traps when they are inactive or moving away.",
    tips: [
      "Observe the patterns of moving traps for several cycles before attempting a daring jump.",
      "Short, controlled leaps are often safer than long jumps when navigating narrow platforms.",
      "Stay calm; many levels are designed to provoke panic which often leads to fatal mistakes.",
    ],
    audience: "Perfect for fans of hard platformers who love the challenge of overcoming extreme difficulty.",
    relatedGenre: "action",
  },

  // BATCH 2 — PUZZLE/STRATEGY
  "bloxorz": {
    title: "Bloxorz",
    genre: "Puzzle",
    metaDescription: "Master spatial logic in Bloxorz. Roll the block into the hole across challenging levels. Play this free browser game with no download needed today.",
    description: "Bloxorz is a legendary spatial puzzle game that challenges you to navigate a 3D block across a series of floating platforms. The goal is simple: drop the block into a final square hole, but the path is filled with fragile tiles and complex switches.",
    howToPlay: "Use the Arrow keys to move and flip the block in four directions. Be careful not to let any part of the block fall off the edges of the platform.",
    tips: [
      "Plan your route several steps ahead to avoid ending up in a position where you cannot turn.",
      "Understand the difference between heavy and light switches; some only activate if you stand vertically.",
      "Break the level into smaller sections mentally to make the complex late-game stages more manageable.",
    ],
    audience: "Ideal for players who love spatial reasoning and meditative but difficult logic puzzles.",
    relatedGenre: "puzzle",
  },
  "b-cubed": {
    title: "B-Cubed",
    genre: "Puzzle",
    metaDescription: "Pass every tile in B-Cubed. A minimalist logic challenge for brainy players. Play this free browser game with no download or install required.",
    description: "B-Cubed is a minimalist puzzle game where you must navigate a cube to touch every single tile on the grid before reaching the final goal. It requires a perfect path and leaves absolutely no room for error.",
    howToPlay: "Use the Arrow keys to slide your cube across the grid. Each tile disappears after you touch it, so you must carefully plan your entire journey.",
    tips: [
      "Identify the 'one-way' tiles early on as they will dictate the start and end of your path.",
      "If you get stuck, try working backward from the goal to see which tiles must be touched last.",
      "Pay attention to the color of the tiles; different colors may represent unique tile behaviors.",
    ],
    audience: "Great for fans of pathfinding puzzles and minimalist, focus-driven brain teasers.",
    relatedGenre: "puzzle",
  },
  "2048": {
    title: "2048",
    genre: "Puzzle",
    metaDescription: "Slide tiles and reach 2048 in this addictive math puzzle. A classic of logic and strategy. Play free online with no download or account needed.",
    description: "2048 is a modern classic that combined simple math with addictive sliding mechanics. By merging tiles with the same number, players aim to reach the elusive 2048 tile, requiring careful position management and forward-thinking logic.",
    howToPlay: "Use the Arrow keys or WASD to slide all tiles in a specific direction. Tiles with the same value will merge into one when they collide.",
    tips: [
      "Keep your highest-value tile in one of the corners to maintain a structured board layout.",
      "Try to keep your tiles organized in a 'snake' pattern to make merging multiple tiers easier.",
      "Avoid sliding tiles 'Up' unless absolutely necessary to keep your largest numbers at the bottom.",
    ],
    audience: "Suits players who enjoy casual math puzzles and strategic board management games.",
    relatedGenre: "puzzle",
  },
  "balloon-tower-defense-5": {
    title: "Bloons TD 5",
    genre: "Strategy",
    metaDescription: "Pop every bloon in Bloons TD 5. A deep strategy game with endless upgrades. Play this free browser game with no download on Playverse today.",
    description: "Bloons Tower Defense 5 is the peak of classic tower defense. With a huge variety of monkey towers, specialized upgrade paths, and diverse maps, it tasks players with defending against infinite waves of colorful balloons (bloons).",
    howToPlay: "Use the Mouse to select towers and place them along the track. Click on placed towers to access upgrade menus and sell unwanted units for cash.",
    tips: [
      "Place 'Ninja Monkeys' early to handle Camo bloons without needing expensive radar upgrades.",
      "Use 'Banana Farms' in the early rounds to build a strong economy for the expensive late-game towers.",
      "Position towers at bends or loops in the track to maximize the time they spend firing at targets.",
    ],
    audience: "Perfect for fans of tower defense who love deep upgrade systems and tactical optimization.",
    relatedGenre: "strategy",
  },
  "bloons-tower-defense-3": {
    title: "Bloons TD 3",
    genre: "Strategy",
    metaDescription: "The classic Bloons TD 3 is here. Experience the origins of the legendary tower defense series. Play free online with no download or install required.",
    description: "Bloons Tower Defense 3 is where the series truly found its stride. It introduced iconic tracks and the powerful 'Super Monkey,' offering a nostalgic and challenging survival experience for strategy enthusiasts.",
    howToPlay: "Click to select a tower from the sidebar and click again on the map to place it. Upgrade your towers to increase their range, speed, and popping power.",
    tips: [
      "The 'Spike Factory' is a reliable last line of defense for any bloons that slip past your main towers.",
      "Upgrade your 'Tack Shooters' for high-density fire at intersections where bloons cluster together.",
      "Save up for the 'Super Monkey' as soon as possible to handle the massive late-game bloon waves.",
    ],
    audience: "Great for players who appreciate retro strategy games and the classic origins of the series.",
    relatedGenre: "strategy",
  },
  "bloons-tower-defense-4": {
    title: "Bloons TD 4",
    genre: "Strategy",
    metaDescription: "Strategy goes mobile-style in Bloons TD 4. New towers and a refined interface. Play this free browser game with no download today at Playverse.",
    description: "Bloons Tower Defense 4 introduced a major graphical overhaul and a brand-new leveling system. It expanded the arsenal with more specialized towers, making the fight against the bloons more tactical and visually engaging than ever before.",
    howToPlay: "Use the Mouse to drag and drop towers onto the battlefield. Manage your money and life totals displayed at the top of the interface as you progress.",
    tips: [
      "Use the 'Mortar Monkey' to target specific clusters of high-health bloons anywhere on the map.",
      "Investment in the 'Monkey Village' is essential in the late game to buff all surrounding towers.",
      "Experiment with the 'Ice Tower' to slow down fast-moving bloons, giving your attackers more time.",
    ],
    audience: "Ideal for fans of refined tower defense who want a mix of nostalgic gameplay and better visuals.",
    relatedGenre: "strategy",
  },
  "block-the-pig": {
    title: "Block the Pig",
    genre: "Puzzle",
    metaDescription: "Outsmart the escapee in Block the Pig. A turn-based strategy puzzle. Play this free browser game with no download or account needed today.",
    description: "Block the Pig is a clever turn-based puzzle game where your goal is to trap a clever pig by placing stone blocks. The pig will try to find the shortest path to an exit, so you must anticipate its moves to win.",
    howToPlay: "Click on any empty hexagonal tile to place a stone block. After each of your turns, the pig will move one space toward the edge of the board.",
    tips: [
      "Place your initial blocks far away from the pig to pre-emptively block off the largest escape routes.",
      "Try to create a 'bottleneck' where the pig only has one path, then close that path on your final move.",
      "Observe the pig's preferred direction; it often prioritizes paths with fewer existing obstacles.",
    ],
    audience: "Suits players who enjoy turn-based puzzles and strategic 'cat and mouse' gameplay challenges.",
    relatedGenre: "puzzle",
  },
  "brain-test-tricky-puzzles": {
    title: "Brain Test: Tricky Puzzles",
    genre: "Puzzle",
    metaDescription: "Think outside the box in Brain Test. A series of lateral thinking challenges. Play free online with no download or install required right now.",
    description: "Brain Test: Tricky Puzzles challenges you with levels that are designed to deceive. It requires lateral thinking and interaction with the environment in ways that standard logic puzzles never would, making it a hilarious brain workout.",
    howToPlay: "Use the Mouse to click, drag, and shake elements on the screen. Read the prompt carefully and try interacting with things that don't look like buttons.",
    tips: [
      "Don't take the instructions literally; many puzzles use puns or wordplay to hide the true solution.",
      "Try moving objects off the screen or clicking on the UI elements themselves to find hidden clues.",
      "Restart the level if you get stuck; sometimes a fresh perspective makes the non-obvious answer clear.",
    ],
    audience: "Perfect for fans of lateral thinking puzzles and humorous, unexpected gameplay solutions.",
    relatedGenre: "puzzle",
  },
  "brain-test-2-tricky-stories": {
    title: "Brain Test 2: Tricky Stories",
    genre: "Puzzle",
    metaDescription: "The stories continue in Brain Test 2. More puzzles and funny narrative levels. Play this free browser game with no download at Playverse today.",
    description: "Brain Test 2: Tricky Stories expands on the original formula by introducing characters and multi-part narrative puzzles. Each 'story' follows a unique theme, combining riddle-solving with lighthearted interactive storytelling.",
    howToPlay: "Click and drag objects to interact with the characters. Solve the tasks displayed in each story panel to progress to the next chapter of the adventure.",
    tips: [
      "Pay attention to the expressions of the characters; they often give clues about what they need next.",
      "Some puzzles require you to use multiple fingers or click multiple objects at the exact same time.",
      "Remember that gravity and physics often play a hidden role in finding the solution to a level.",
    ],
    audience: "Ideal for players who enjoyed the first Brain Test and want puzzles with a bit more story context.",
    relatedGenre: "puzzle",
  },
  "brain-test-3-tricky-quests": {
    title: "Brain Test 3: Tricky Quests",
    genre: "Puzzle",
    metaDescription: "Go on an epic riddle quest in Brain Test 3. Deep puzzles and complex levels. Play free online with no download or account required right now.",
    description: "Brain Test 3: Tricky Quests introduces a world-spanning adventure mode where solving puzzles earns you items and progresses an epic storyline. It's the most ambitious entry in the series, merging RPG elements with lateral thinking.",
    howToPlay: "Interact with the game world using your Mouse. Collect items to your inventory and drag them onto other objects to solve complex, multi-stage riddles.",
    tips: [
      "Keep an inventory of items you find; you never know when a weird object will solve a future riddle.",
      "Talk to every character in the quest mode as they provide essential hints for the more cryptic puzzles.",
      "The 'Help' button is legitimately useful in this version if you've tried everything and are truly stuck.",
    ],
    audience: "Suits players who love deep puzzle adventures and games that reward thorough experimentation.",
    relatedGenre: "puzzle",
  },

  // BATCH 3 — RACING/DRIVING
  "3d-arena-racing": {
    title: "3D Arena Racing",
    genre: "Racing",
    metaDescription: "Speed through the arena in 3D Arena Racing. Compete in high-energy races with smooth controls. Play free online with no download or install today.",
    description: "3D Arena Racing is a high-octane competitive racer that puts you on a circuit filled with sharp turns and aggressive AI. It focuses on pure speed and the thrill of overtaking rivals in a beautifully rendered 3D environment.",
    howToPlay: "Use the Arrow keys or WASD to steer, accelerate, and brake. Press 'Space' to use your handbrake for tighter turns and drifting around corners.",
    tips: [
      "Take the inside line during sharp turns to minimize the distance traveled and stay ahead of rivals.",
      "Avoid collisions with the arena walls; even a small bump can significantly reduce your current speed.",
      "Save your nitro boost for long straightaways where it can provide the maximum impact on your time.",
    ],
    audience: "Great for fans of classic circuit racing who enjoy competitive AI and smooth driving mechanics.",
    relatedGenre: "racing",
  },
  "3d-car-simulator": {
    title: "3D Car Simulator",
    genre: "Driving",
    metaDescription: "Free-roaming fun in 3D Car Simulator. Explore a huge environment with realistic cars. Play this free browser game with no download needed now.",
    description: "3D Car Simulator offers a relaxing but realistic driving experience. With multiple vehicles to choose from and a large open map to explore, it's the perfect game for players who just want to cruise and enjoy the physics of high-performance cars.",
    howToPlay: "Drive using WASD or Arrow keys. Use the numbers 1-3 to switch between cars, and press 'C' to change your camera view for better visibility.",
    tips: [
      "Test each car's handling on different terrain; the sports car is fast on roads but poor on dirt.",
      "Experiment with the different camera angles to find the one that makes high-speed turns easiest.",
      "Don't be afraid to go off-road; the map is filled with hidden ramps and secrets for curious drivers.",
    ],
    audience: "Perfect for players who enjoy sandbox driving and exploring a 3D world at their own pace.",
    relatedGenre: "driving",
  },
  "18-wheeler-cargo-simulator": {
    title: "18 Wheeler Cargo Simulator",
    genre: "Driving",
    metaDescription: "Deliver heavy goods in 18 Wheeler Cargo Simulator. A test of trucking skill and precision. Play this free browser game with no download today.",
    description: "18 Wheeler Cargo Simulator is a precision-based trucking game where you must transport heavy cargo across challenging routes. It requires a steady hand and excellent spatial awareness to navigate large trucks through narrow city streets.",
    howToPlay: "Use WASD or Arrow keys to steer your truck. Press 'Space' for the air brake, and 'T' to hitch or unhitch your cargo trailer when at a loading zone.",
    tips: [
      "Take wide turns to ensure your trailer doesn't catch on corners or street-side obstacles.",
      "Check your mirrors frequently to monitor traffic and ensure your cargo remains stable on the trailer.",
      "Slow down well before your destination; stopping a fully loaded 18-wheeler takes a lot of distance.",
    ],
    audience: "Ideal for fans of simulation games who love the technical challenge of heavy-duty vehicle driving.",
    relatedGenre: "driving",
  },
  "18-wheeler-driving-sim": {
    title: "18 Wheeler Driving Sim",
    genre: "Driving",
    metaDescription: "Master the long haul in 18 Wheeler Driving Sim. High-fidelity truck physics in your browser. Play free online with no download or install needed.",
    description: "18 Wheeler Driving Sim focuses on the technical aspects of maneuvering a semi-truck. From backing into tight loading docks to navigating highway traffic, it provides a realistic look at the life of a professional long-haul driver.",
    howToPlay: "Control your truck with WASD or Arrows. Use 'C' to switch to a cabin view for a more immersive experience, and 'Space' for emergency braking.",
    tips: [
      "Use the external camera view when performing difficult reverses into tight parking spaces.",
      "Maintain a consistent speed on highways to improve your fuel efficiency and overall cargo safety.",
      "Pay attention to road signs; some bridges or turns may be inaccessible for a vehicle of your size.",
    ],
    audience: "Great for players who enjoy realistic driving physics and complex spatial-navigation challenges.",
    relatedGenre: "driving",
  },
  "18-wheeler-truck-parking": {
    title: "18 Wheeler Truck Parking",
    genre: "Driving",
    metaDescription: "The ultimate parking test is 18 Wheeler Truck Parking. Extreme precision and patience. Play this free browser game with no download required now.",
    description: "18 Wheeler Truck Parking strips away the highway driving and focuses purely on the hardest part of being a trucker: parking. Navigate through obstacle-filled lots and place your massive trailer perfectly in the designated spot.",
    howToPlay: "Drive with the Arrow keys. Follow the yellow directional indicators to find your parking spot, then carefully maneuver your truck into the box.",
    tips: [
      "Small, incremental movements are much better than large steering adjustments when backing up.",
      "Remember that a trailer turns in the opposite direction of your steering wheel when in reverse.",
      "Wait for moving obstacles to pass before attempting a complex maneuver to avoid failing the level.",
    ],
    audience: "Suits players who love focused, high-precision driving puzzles and simulation challenges.",
    relatedGenre: "driving",
  },
  "boat-drift": {
    title: "Boat Drift",
    genre: "Racing",
    metaDescription: "Slide across the water in Boat Drift. A unique high-speed drifting challenge. Play this free browser game with no download or account needed today.",
    description: "Boat Drift takes the mechanics of car drifting and applies them to the unpredictable physics of water. Speed around a circular track and see how many consecutive drifts you can perform without crashing into the shoreline.",
    howToPlay: "Click and hold the Left Mouse Button or press the Spacebar to begin drifting. Release at the right moment to regain control and straighten your boat.",
    tips: [
      "Wait until you are halfway through a turn before starting your drift to maintain a better line.",
      "Timing is everything; releasing too late will cause you to oversteer and hit the outer wall.",
      "Chain your drifts together in quick succession to massively increase your total score multiplier.",
    ],
    audience: "Perfect for fans of arcade high-score games who love simple, addicting one-button mechanics.",
    relatedGenre: "racing",
  },
  "burnin-rubber-5-xs": {
    title: "Burnin' Rubber 5 XS",
    genre: "Racing",
    metaDescription: "Race with weapons in Burnin' Rubber 5 XS. High-octane destruction and speed. Play free online with no download or install required right now.",
    description: "Burnin' Rubber 5 XS is a combat-racing masterpiece. It's not just about being the fastest; it's about being the best armed. Equipping your car with machine guns and rockets, you must destroy your rivals to secure first place.",
    howToPlay: "Drive with WASD or Arrow keys. Use 'X' or 'Left Click' to fire your primary weapon and 'Z' or 'Right Click' to use your secondary special weapon.",
    tips: [
      "Aim for the tires of your opponents to spin them out without wasting all your heavy ammunition.",
      "Collect the blue repair power-ups frequently; even the best driver can't win with a smoking engine.",
      "Use your nitro during industrial straightaways after you've cleared out any nearby aggressive racers.",
    ],
    audience: "Ideal for players who love 'kart racers with teeth' and destructive, weapon-based racing games.",
    relatedGenre: "racing",
  },
  "burnout-drift-hilltop": {
    title: "Burnout Drift: Hilltop",
    genre: "Racing",
    metaDescription: "Extreme hill drifting in Burnout Drift: Hilltop. Master the mountain roads today. Play this free browser game with no download on Playverse.",
    description: "Burnout Drift: Hilltop takes the intense drifting action to dangerous mountain roads. With narrow paths and steep drops, you must maintain your slide for as long as possible to earn points and upgrade your high-performance vehicle.",
    howToPlay: "Steer with Arrows or WASD. Use 'Space' for the handbrake and 'Shift' or 'CTRL' to shift gears if using a manual transmission setup.",
    tips: [
      "Feather your throttle during a long drift to maintain your angle without spinning completely around.",
      "Stay near the center of the road when drifting on hills to give yourself a safety margin from the edge.",
      "Upgrade your tires as a priority to increase your grip and allow for much longer, controlled slides.",
    ],
    audience: "Great for fans of professional drifting simulators who want a challenging, high-stakes environment.",
    relatedGenre: "racing",
  },
  "car-drift-racers-2": {
    title: "Car Drift Racers 2",
    genre: "Racing",
    metaDescription: "Refined drifting and customization in Car Drift Racers 2. Build your dream drift car. Play free online with no download or install needed now.",
    description: "Car Drift Racers 2 offers a polished drifting experience with a focus on car customization and high-fidelity physics. Compete across urban tracks and prove your status as the ultimate drift king through style and speed.",
    howToPlay: "Control your car with WASD. Use 'Space' to initiate a tactical drift and 'F' to activate your nitrous boost for a quick burst of getaway speed.",
    tips: [
      "Enter turns with high speed to make initiating the drift easier and more visually impressive.",
      "Adjust your suspension in the garage to find the perfect balance between stability and slide control.",
      "Avoid hitting the curbs, as they will instantly break your drift chain and reset your score multiplier.",
    ],
    audience: "Suits players who enjoy tuning their cars and mastering the technical nuances of drift physics.",
    relatedGenre: "racing",
  },
  "cartoon-mini-racing": {
    title: "Cartoon Mini Racing",
    genre: "Racing",
    metaDescription: "Colorful micro-racing in Cartoon Mini Racing. Fun for all ages on tiny tracks. Play this free browser game with no download at Playverse today.",
    description: "Cartoon Mini Racing is a delightful and fast-paced micro-racer. Featuring vibrant graphics and quirky car designs, it offers a fun and competitive experience that is easy to pick up but difficult to master on its twisty, miniature tracks.",
    howToPlay: "Steer and accelerate using the Arrow keys. Use the keyboard to navigate the main menu and select your favorite tiny car and track combination.",
    tips: [
      "Use the smaller size of your car to take tight shortcuts that larger vehicles simply cannot manage.",
      "Wait for the perfect moment to overtake on narrow sections to avoid getting stuck behind the AI.",
      "Practice on the time-trial mode to learn every bump and shortcut before entering a full race.",
    ],
    audience: "Perfect for casual players and younger gamers who want a high-energy, colorful racing experience.",
    relatedGenre: "racing",
  },

  // BATCH 4 — SPORTS
  "basketball-legends": {
    title: "Basketball Legends",
    genre: "Sports",
    metaDescription: "Play as the greats in Basketball Legends. Slam dunk your way to victory in this free sports game. No download or account required to play online.",
    description: "Basketball Legends features caricatures of legendary NBA players in intense 1-on-1 or 2-on-2 matches. With flashy special moves and high-flying dunks, it captures the fun of arcade basketball in a smooth browser-based format.",
    howToPlay: "Move with WASD or Arrow keys. Use 'X' or 'L' to shoot/steal and 'Z' or 'K' to perform a tactical dash or a game-changing 'Super Shot'.",
    tips: [
      "Time your jumps perfectly when defending to block shots and secure essential rebounds.",
      "Perform a pump-fake by tapping the shoot button quickly to lure the defender into the air.",
      "Use your 'Super Shot' only when it is fully charged and you have a clear line to the basket.",
    ],
    audience: "Ideal for fans of arcade sports who love seeing their favorite basketball stars in a comedic light.",
    relatedGenre: "sports",
  },
  "basketball-stars": {
    title: "Basketball Stars",
    genre: "Sports",
    metaDescription: "Competitive 2nd-gen hoops in Basketball Stars. More players and better moves. Play this free browser game with no download needed on Playverse.",
    description: "Basketball Stars is the polished sequel to the legends series. It features a larger roster, more intricate special moves, and refined physics that make every three-pointer and block feel more impactful and rewarding.",
    howToPlay: "Control your player with Arrow keys. Use 'V' for a super shot, 'B' to perform an action, and 'S' to pump fake or steal the ball from your opponent.",
    tips: [
      "Moving while shooting can improve your chances of evading a block, but it lowers your shot accuracy.",
      "Wait for your teammate to be open before passing to create a high-percentage scoring opportunity.",
      "Watch the shot meter carefully; releasing the ball at the peak of your jump maximizes your score chance.",
    ],
    audience: "Great for players who want a more competitive and mechanically deep arcade basketball experience.",
    relatedGenre: "sports",
  },
  "basketball-slam-dunk": {
    title: "Basketball Slam Dunk",
    genre: "Sports",
    metaDescription: "Extreme dunks only in Basketball Slam Dunk. Fast-paced, aerial sports action. Play free online with no download or install required right now.",
    description: "Basketball Slam Dunk focuses purely on the most exciting part of the game: the dunk. Launch your player into the air and perform incredible aerial acrobatics to slam the ball home in this physics-based sports challenge.",
    howToPlay: "Use a one-button control scheme: Click or press Space to jump, then Click again to reach for the hoop and perform a powerful offensive slam dunk.",
    tips: [
      "Timing your first jump is the most critical part; jump too late and you'll miss the ball entirely.",
      "Try to angle your player's body in mid-air to gain more momentum for a more powerful slam.",
      "Pay attention to the height of the rim, as it changes between stages to keep the challenge fresh.",
    ],
    audience: "Perfect for fans of physics-based sports games and quick, one-button arcade challenges.",
    relatedGenre: "sports",
  },
  "basket-random": {
    title: "Basket Random",
    genre: "Sports",
    metaDescription: "Chaos on the court in Basket Random. Physics-based 2-player madness. Play this free browser game with no download or account required today.",
    description: "Basket Random takes the rules of basketball and throws them out the window. With unpredictable physics, changing court conditions, and hilarious character movement, every match is a chaotic and funny battle for 5 points.",
    howToPlay: "Use the Up Arrow key or 'W' to jump and swing your player's arms. The physics are randomized, so you must adapt to how your player moves in each round.",
    tips: [
      "Focus on timing your jumps so that your player's arms are swinging upward when they touch the ball.",
      "The environment changes each round; adapt your strategy for slippery ice or low-gravity courts.",
      "Don't worry about being precise; often the most chaotic movements lead to the most surprising goals.",
    ],
    audience: "Excellent for players who love funny, unpredictable physics and competitive local multiplayer.",
    relatedGenre: "sports",
  },
  "basket-champs": {
    title: "Basket Champs",
    genre: "Sports",
    metaDescription: "Tournament hoops in Basket Champs. Compete as your country and win the gold. Play free online with no download or install required today.",
    description: "Basket Champs is a refined free-throw tournament game. Select your nation and compete in a high-pressure bracket where accuracy and nerves of steel are the only things that will lead you to the championship trophy.",
    howToPlay: "Use the Mouse to click and drag to set your shot's power and trajectory. Release to launch the basketball toward the hoop and score consistently.",
    tips: [
      "Watch the movement of the hoop; it often oscillates horizontally or vertically in later tournament rounds.",
      "Pay attention to the wind indicators if available, as they will push your ball off its intended path.",
      "Consistent power is better than changing your style often; find a rhythm that works for you.",
    ],
    audience: "Suits players who enjoy focused accuracy challenges and tournament-style sports progression.",
    relatedGenre: "sports",
  },
  "american-football-challenge": {
    title: "American Football Challenge",
    genre: "Sports",
    metaDescription: "Catch the winning touchdown in American Football Challenge. A test of reflexes. Play this free browser game with no download on Playverse.",
    description: "American Football Challenge puts you in the position of a receiver in the final seconds of a big game. Test your reflexes and hand-eye coordination as you attempt to catch high-speed passes in front of a roaring crowd.",
    howToPlay: "Move your player's hands using the Mouse to align with the incoming football. Click at the exact moment of impact to secure the catch and score.",
    tips: [
      "Keep your eyes on the ball from the moment it leaves the quarterback's hands to track its flight.",
      "Anticipate the 'wobble' of the ball, as wind or a poor throw can make the catching point move.",
      "Stay calm in the later rounds when balls are thrown faster and from more difficult, varying angles.",
    ],
    audience: "Ideal for players who enjoy reflex-based challenges and the high pressure of sports finales.",
    relatedGenre: "sports",
  },
  "bobblehead-soccer": {
    title: "Bobblehead Soccer",
    genre: "Sports",
    metaDescription: "Big heads, big goals in Bobblehead Soccer. Fast 1-on-1 soccer action. Play free online with no download or account needed today at Playverse.",
    description: "Bobblehead Soccer features comical characters with oversized heads in a fast-paced 1-on-1 soccer duel. It's an arcade take on the world's most popular sport, emphasizing aerial play and powerful special abilities.",
    howToPlay: "Move with the Arrow keys. Press 'Up' to jump and use 'Space' or 'X' to kick the ball. Each character has a unique special move activated by specific keys.",
    tips: [
      "Use your head to keep the ball in the air; this prevents the opponent from easily stealing it.",
      "Jump right before kicking for a 'power shot' that travels much faster and is harder to block.",
      "Wait for the opponent to commit to a jump before sliding the ball under them for an easy goal.",
    ],
    audience: "Perfect for fans of arcade soccer who enjoy quick matches and humorous character designs.",
    relatedGenre: "sports",
  },
  "bumper-cars-soccer": {
    title: "Bumper Cars Soccer",
    genre: "Sports",
    metaDescription: "Vehicular sports mayhem in Bumper Cars Soccer. Collide and score to win. Play this free browser game with no download needed on Playverse.",
    description: "Bumper Cars Soccer combines the fun of the fairground with the competition of the soccer pitch. Drive your bumper car into the giant ball and out-maneuver your opponents in this chaotic vehicular sports mashup.",
    howToPlay: "Drive your car using WASD or Arrow keys. Use the momentum of your vehicle to push the ball toward the opponent's goal and defend your own net.",
    tips: [
      "Hitting the ball at an angle will cause it to pop upward, allowing you to bypass defensive bumper cars.",
      "Use your nitro in short bursts to surprise the defense and push the ball home at high speed.",
      "Remember that you can't reverse as fast as you can drive forward; always try to stay facing the ball.",
    ],
    audience: "Great for fans of Rocket League and players who love vehicular combat and sports hybrids.",
    relatedGenre: "sports",
  },
  "big-shot-boxing": {
    title: "Big Shot Boxing",
    genre: "Sports",
    metaDescription: "Climb the ranks in Big Shot Boxing. A retro-style boxing simulation. Play free online with no download or install required right now.",
    description: "Big Shot Boxing is a deep, retro-inspired boxing simulator. Manage your fighter's career, train their stats, and fight your way through various weight classes to become the undisputed champion of the world.",
    howToPlay: "Use 'Left/Right' Arrows to move and 'Up' to block. Press 'X' for a jab, 'Z' for a cross, and keep an eye on your stamina bar to avoid getting winded.",
    tips: [
      "Don't just spam punches; wait for your opponent to miss, then counter-attack for double damage.",
      "Work the body in the early rounds to lower your opponent's stamina for a late-game knockout.",
      "Keep your hands up! A good defense is the best way to prevent taking unnecessary head trauma.",
    ],
    audience: "Suits players who enjoy career-based sports games and tactical, high-stakes combat simulations.",
    relatedGenre: "sports",
  },
  "boxing-random": {
    title: "Boxing Random",
    genre: "Sports",
    metaDescription: "Wacky physics boxing in Boxing Random. A hilarious and unpredictable duel. Play this free browser game with no download or account required today.",
    description: "Boxing Random is a physics-based boxing game where anything can happen. From oversized gloves to slippery courts, the rules change every round, making each bout a laughable and unpredictable test of luck and timing.",
    howToPlay: "Use the Up Arrow or 'W' key to jump and punch simultaneously. The movement is simplified, so you must use the environment to fall into your opponent.",
    tips: [
      "Timing your jump so that your glove makes contact with the opponent's head is an instant win.",
      "Pay attention to the gloves; if you get long-range gloves, keep your distance to win easily.",
      "The terrain matters; use the slopes of the mountain courts to gain momentum for a killer punch.",
    ],
    audience: "Ideal for players who love funny physics and quick, chaotic multiplayer games for two people.",
    relatedGenre: "sports",
  },

  // BATCH 5 — ARCADE/ADVENTURE
  "age-of-war": {
    title: "Age of War",
    genre: "Strategy",
    metaDescription: "Evolve through the ages in Age of War. A legendary base defense game. Play free online with no download or account required today on Playverse.",
    description: "Age of War is a classic strategy game where you must defend your base through different historical eras. From cavemen with clubs to futuristic super-soldiers, you must evolve faster than your enemy to win the war.",
    howToPlay: "Use the Mouse to click on icons and spawn units or build base defenses. Use your special attack sparingly by clicking the lighting icon at the top.",
    tips: [
      "Balanced unit composition is key; always keep a mix of melee and ranged units on the field.",
      "Save your 'Special Attack' for when a large cluster of enemy troops reaches your front door.",
      "Evolve as soon as you have the experience points, as higher-age units are significantly more powerful.",
    ],
    audience: "Perfect for strategy fans who love base defense and historical progression systems.",
    relatedGenre: "strategy",
  },
  "baldi": {
    title: "Baldi's Basics",
    genre: "Adventure",
    metaDescription: "Survive detention in Baldi's Basics. A quirky horror-adventure in a school. Play free online with no download or install required at Playverse.",
    description: "Baldi's Basics in Education and Learning is a surreal horror-comedy. Collect all 7 notebooks while avoiding the terrifying schoolteacher Baldi, who gets faster and smarter with every math problem you answer.",
    howToPlay: "WASD to move, Mouse to look around. Left-click to interact with doors and items. Right-click to use an item from your inventory to hinder Baldi.",
    tips: [
      "Listen for the sound of Baldi's ruler; it tells you exactly how close he is and how fast he's moving.",
      "Use items like the 'Quarter' or 'Zesty Bar' strategically to gain a lead when Baldi is nearby.",
      "Never miss a math problem if you can help it—each wrong answer makes Baldi move significantly faster.",
    ],
    audience: "Great for fans of indie horror and quirky, meme-filled adventure games with high difficulty.",
    relatedGenre: "adventure",
  },
  "big-tower-tiny-square": {
    title: "Big Tower Tiny Square",
    genre: "Arcade",
    metaDescription: "One massive tower, one tiny square in Big Tower Tiny Square. A platforming epic. Play this free browser game with no download on Playverse today.",
    description: "Big Tower Tiny Square is a platforming masterpiece where the entire game is one massive, seamless tower. Navigate through lethal traps and vertical challenges to reclaim your pineapple from the top of the world.",
    howToPlay: "Move with AD or Arrow keys. Use the spacebar to jump. You can wall-jump by pressing jump again when touching a vertical surface during your ascent.",
    tips: [
      "The game is one long level; use the checkpoints frequently so you don't lose too much progress.",
      "Wall jumping is the most critical skill; practice the timing to climb vertical shafts efficiently.",
      "Observe the patterns of moving red lasers; they are lethal and require perfect timing to pass.",
    ],
    audience: "Suits players who enjoy high-difficulty platformers and the feeling of overcoming a massive climb.",
    relatedGenre: "arcade",
  },
  "big-tower-tiny-square-2": {
    title: "Big Tower Tiny Square 2",
    genre: "Arcade",
    metaDescription: "The climb continues in Big Tower Tiny Square 2. New traps and a bigger tower. Play free online with no download or install required right now.",
    description: "The tiny square is back for an even bigger challenge. Big Tower Tiny Square 2 offers refined platforming mechanics and a brand-new tower that pushes your jumping skills to their absolute breaking point.",
    howToPlay: "AD or Arrow keys to move, Space to jump. Utilize the new environmental objects like vents and fans to boost your square to previously unreachable heights.",
    tips: [
      "Fans can be used to dramatically extend your jump distance; aim for the center of the air current.",
      "Some platforms are temporary and will disappear shortly after you land, so keep moving at all times.",
      "Don't give up! Every section of the tower is a puzzle that can be solved with enough practice.",
    ],
    audience: "Ideal for fans of the first game who crave even more pixel-perfect platforming and a fresh challenge.",
    relatedGenre: "arcade",
  },
  "bob-the-robber": {
    title: "Bob the Robber",
    genre: "Adventure",
    metaDescription: "The master of stealth returns in Bob the Robber. Outsmart the security in this free adventure game. No download or account required to play online.",
    description: "Bob the Robber is a clever stealth-puzzle game. Help Bob, the modern-day Robin Hood, steal from the corrupt to give to the poor by avoiding guards, cameras, and sophisticated high-tech security systems.",
    howToPlay: "Move Bob using WASD or Arrow keys. Hide in shadows to avoid cameras. Use the spacebar to knock out guards or interact with safe-cracking mini-games.",
    tips: [
      "Wait for cameras to point away before moving; their detection zone is clearly marked on the floor.",
      "Read the level-notes scattered throughout; they often contain codes for doors and hidden safes.",
      "Shadows are your best friend; standing perfectly still in a dark area makes Bob invisible to guards.",
    ],
    audience: "Perfect for fans of stealth games and narrative-driven puzzles that reward patience and planning.",
    relatedGenre: "adventure",
  },
  "bob-the-robber-2": {
    title: "Bob the Robber 2",
    genre: "Adventure",
    metaDescription: "More heists in Bob the Robber 2. Bigger buildings and better security. Play this free browser game with no download on Playverse today.",
    description: "Bob the Robber 2 takes the stealth action and expands it with new gadgets and more complex levels. Face off against aggressive dogs and new electronic locks as you continue Bob's mission of justice.",
    howToPlay: "Use WASD or Arrows to move. Interact with objects using the keyboard prompts that appear. Buy new equipment from the shop between missions to aid your escape.",
    tips: [
      "Invest in the 'Shadow Cloak' early to make sneaking past guards significantly easier in brightly lit halls.",
      "Avoid making noise near sleeping dogs; they will wake up and alert the guards to your presence.",
      "Use the 'Stun Gun' gadget sparingly as a last resort when you're cornered by multiple guards.",
    ],
    audience: "Great for players who loved the first game and want more gadgets and challenging heist missions.",
    relatedGenre: "adventure",
  },
  "bob-the-robber-3": {
    title: "Bob the Robber 3",
    genre: "Adventure",
    metaDescription: "Sneak into secret labs in Bob the Robber 3. High-stakes stealth in your browser. Play free online with no download or install needed now.",
    description: "In Bob the Robber 3, Bob goes underground to infiltrate secret government facilities. This entry introduces a darker atmosphere and even more high-tech gadgets, including night-vision and hacking tools.",
    howToPlay: "Move with WASD or Arrows. Press 'Up' to use elevators or hide in doorways. Use the Mouse to interact with the hacking and lock-picking mini-games.",
    tips: [
      "In darkened areas, use your flashlight sparingly to avoid drawing attention to your specific location.",
      "The hacking mini-game is timed; plan your moves quickly to avoid triggering a facility-wide alarm.",
      "Observe the movement of scientists; they don't fight but will run to the nearest alarm if they see you.",
    ],
    audience: "Ideal for fans of tech-thriller stealth and complex, multi-stage environmental puzzles.",
    relatedGenre: "adventure",
  },
  "bob-the-robber-4": {
    title: "Bob the Robber 4",
    genre: "Adventure",
    metaDescription: "Bob takes on France in Bob the Robber 4. A global heist adventure today. Play this free browser game with no download on Playverse.",
    description: "Bob the Robber 4 takes our hero to international locations, starting with the city of Paris. It features a complete graphical overhaul and a new clothes system that grants Bob unique stealth and speed bonuses.",
    howToPlay: "Control Bob with WASD. Use the menu to equip different hats and suits you've unlocked. Click on interactive screens to initiate the advanced hacking sequences.",
    tips: [
      "Certain outfits are better for specific levels; choose the 'Grey Suit' for urban missions with many shadows.",
      "Watch out for the 'Gendarme' guards; they move faster than standard guards from previous games.",
      "Collect the hidden coins in every level to afford the high-end legendary equipment from the shop.",
    ],
    audience: "Suits players who love the series and want to see how the mechanics evolve with new gear and settings.",
    relatedGenre: "adventure",
  },
  "bitlife-life-simulator": {
    title: "BitLife",
    genre: "Sim",
    metaDescription: "Live a thousand lives in BitLife. A deep text-based life simulator for your browser. Play free online with no download or install required now.",
    description: "BitLife is the ultimate text-based life simulator. Start from birth and make every choice—from your childhood activities to your career and retirement—experiencingthousands of unique and often hilarious life outcomes.",
    howToPlay: "Navigate the game menus using your Mouse. Click on the 'Age' button to progress through the years and make choices when prompted by specific life events.",
    tips: [
      "Keep your 'Health' and 'Happiness' bars high by visiting the doctor and engaging in fun social activities.",
      "A high 'Smart' stat in early life pays off with better scholarship opportunities and high-paying careers.",
      "Be careful with criminal activities; one wrong move can land you in prison and derail your entire life story.",
    ],
    audience: "Perfect for fans of narrative games and simulators who enjoy seeing the long-term consequences of their choices.",
    relatedGenre: "sim",
  },
  "cluster-rush": {
    title: "Cluster Rush",
    genre: "Action",
    metaDescription: "High-adrenaline parkour in Cluster Rush. Jump across moving trucks to survive. Play this free browser game with no download on Playverse today.",
    description: "Cluster Rush is an intense first-person parkour game where you must jump between the tops of moving trucks. One slip means a fall to the road and instant failure, requiring absolute focus and perfect jump timing.",
    howToPlay: "Use the Arrow keys or WASD to steer yourself while in the air. Press the Spacebar to jump. Your square character moves forward automatically at high speed.",
    tips: [
      "Observe the direction the trucks are turning; jumping toward the inside of a turn is much safer than the outside.",
      "You can 'slide' for a short distance by holding the crouch key, allowing you to pass under low obstacles.",
      "Don't panic if a truck explodes; often another truck is moving into position just in time for you to land.",
    ],
    audience: "Great for fans of fast-paced platformers and players who love a high-stakes, adrenaline-fueled challenge.",
    relatedGenre: "action",
  },
};

export function getFallbackDescription(game: {
  slug: string;
  title: string;
  genre: string;
  shortDescription?: string;
}): GameDescription {
  const { title, genre, slug } = game;
  const genreLower = genre.toLowerCase();

  const config: Partial<GameDescription> = {
    title,
    genre,
    metaDescription: `Play ${title} free in your browser on Playverse — no install.`,
    description: `${title} runs in your browser. Use the on-screen or in-game prompts for controls; each title varies slightly.`,
    relatedGenre: genreLower,
  };

  switch (genre.toUpperCase()) {
    case "SHOOTING":
      config.howToPlay = "Aim with your mouse and click to fire. Use WASD to move and spacebar to jump or dodge. Reload with R and switch weapons with the number keys or scroll wheel.";
      config.tips = [
        "Aim for the center of the enemy hitbox — most shooting games reward body shots with faster kill times than trying for headshots.",
        "Keep moving between shots — a stationary target is the easiest kind to hit, so stay unpredictable.",
        "Learn the reload timing for your weapon so you never get caught empty in the middle of a fight.",
      ];
      config.audience = "Great for players who enjoy fast reflexes, aim training, and competitive browser-based shooting games.";
      break;

    case "STRATEGY":
      config.howToPlay = "Click to select units, buildings, or menu options. Right-click to move or attack. Use the minimap to monitor your base and enemy positions.";
      config.tips = [
        "Spend your resources early — saving currency while enemies scale up puts you behind on unit count and upgrades.",
        "Protect your highest-damage units with cheaper defensive ones placed in front as a buffer.",
        "Scout the map in the first 30 seconds — knowing enemy starting position lets you plan your expansion safely.",
      ];
      config.audience = "Perfect for players who enjoy planning ahead, managing resources, and outsmarting opponents over time.";
      break;

    case "RACING":
    case "DRIVING":
      config.howToPlay = "Arrow keys or WASD to steer and accelerate. Up/W to accelerate, Down/S to brake or reverse. Some titles use spacebar for handbrake turns.";
      config.tips = [
        "Brake before corners, not during them — entering a turn too fast forces a wider arc and costs you more time than a clean slower entry.",
        "Take the inside line (apex) on curves to minimize the distance your car actually travels around the bend.",
        "If the game has a boost mechanic, save it for straight sections where you can use the full speed without steering.",
      ];
      config.audience = "Ideal for players who love speed, precision driving, and chasing faster lap times.";
      break;

    case "PUZZLE":
      config.howToPlay = "Click or drag elements to interact with the puzzle. Most levels have a clear objective shown at the start — solve it using the objects or moves available.";
      config.tips = [
        "Try the move that seems obviously wrong first — puzzle designers often hide the solution behind your instinct to avoid something.",
        "If you're stuck, count your available moves or pieces before acting — understanding your constraints reveals the path.",
        "Work backwards from the goal state — ask what position needs to be true one step before the win, then work to that.",
      ];
      config.audience = "Perfect for players who enjoy logical thinking, spatial reasoning, and satisfying aha moments.";
      break;

    case "SPORTS":
      config.howToPlay = "Arrow keys to move your player. Spacebar or click to kick, shoot, or perform the main action. Some games use A/D to strafe and W to jump.";
      config.tips = [
        "Timing beats power in most browser sports games — a well-timed release or kick connects more reliably than spamming the action button.",
        "Position yourself before the ball arrives rather than chasing it — anticipating trajectory gives you a better angle.",
        "Watch your opponent's movement pattern for two or three rounds before committing to an aggressive play.",
      ];
      config.audience = "Great for fans of quick sports competitions who want an instant browser experience without app downloads.";
      break;

    case "ARCADE":
      config.howToPlay = "Arrow keys or WASD to move. Spacebar to jump, shoot, or activate the primary action. Check the in-game control overlay for title-specific bindings.";
      config.tips = [
        "Focus on survival in the first 60 seconds to learn the obstacle patterns — most arcade games cycle them predictably.",
        "Chase multipliers or combo systems early — bonus scoring windows are usually front-loaded to teach you the mechanic.",
        "When health gets low, play defensively for one life cycle rather than risking your remaining lives on aggressive plays.",
      ];
      config.audience = "Perfect for anyone wanting a quick, high-energy session with clear goals and fast restarts.";
      break;

    case "ACTION":
      config.howToPlay = "WASD or arrow keys to move. Click or spacebar to attack. Many action games use E to interact and shift to sprint or dodge.";
      config.tips = [
        "Clear smaller enemies before focusing on the main target — getting hit from behind by a minion while fighting a boss is the most common reason for losing a run.",
        "Learn the attack telegraph — most enemies have a wind-up animation before hitting you, and that's your window to dodge.",
        "Upgrade defense or health on your first purchase, not damage — staying alive longer gives you more time to deal the same total damage.",
      ];
      config.audience = "Best for players who enjoy responsive combat, quick decision-making, and satisfying action mechanics.";
      break;

    default:
      config.howToPlay =
        "Follow the in-game control overlay or tutorial. Most titles use WASD or arrow keys to move and the mouse or spacebar for the main action.";
      config.tips = [
        "Read the first screen of instructions before the match starts — many games explain a key mechanic there.",
        "If you are stuck, try a different approach or route rather than repeating the same mistake.",
        "Lower graphics or effects in the options menu if the frame rate drops.",
      ];
      config.audience = "Anyone who wants a quick browser game without installing software.";
      break;
  }

  return config as GameDescription;
}

export function getGameDescription(game: {
  slug: string;
  title: string;
  genre: string;
  /** From `data/games.json` — usually meta text from classroom-6x-online.github.io, ~100 words at build. */
  catalogDescription?: string;
}): GameDescription {
  const normalizedSlug = (game.slug || "").toLowerCase().replace(/_/g, "-");
  const base = MANUAL_DESCRIPTIONS[normalizedSlug] ?? getFallbackDescription(game);
  const raw = game.catalogDescription?.trim();
  if (raw) {
    const about = truncateToWords(raw, CATALOG_ABOUT_MAX_WORDS);
    const meta = about.length > 160 ? `${about.slice(0, 157).trim()}…` : about;
    return {
      ...base,
      description: about,
      metaDescription: meta,
    };
  }
  return base;
}
