// ideas




let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'Daschenlambe', power: 5 },
  { name: 'Hamma', power: 30 },
  { name: 'Gasbisdole', power: 50 },
  { name: 'Audi A4', power: 100 }
];
const monsters = [
  {
    name: "Haider",
    level: 2,
    health: 15
  },
  {
    name: "Streifenbolizist",
    level: 8,
    health: 60
  },
  {
    name: "Drache",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "Drachenschanze",
    "button text": ["Gehe zum Rewe nach Emskirchen", "Gehe zur Drachenschanze", "Klettere gleich über die Befestigunganlage und bekämpfe den Drachen"],
    "button functions": [goStore, goCave, fightDragon], 
    text: " Du stehst in Alterschauerberg vor dem Ortsschild und siehst einen Wegweiser, der zum Rewe nach Emskirchen führt, und einen, der zur Drachenschanze führt."
  },
  {
    name: "store",
    "button text": ["Kaufe 10 HP (10 Gold)", "Kaufe eine Waffe (30 Gold)", "Gehe zurück zum Ortschild"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Du betrittst den Laden. Kein Drache in Sicht." /* Couterpart = locations[8] */
  },
  {
    name: "cave",
    "button text": ["Schlag den Haider", "Stress mit der Bolizei", "Gehe zurück zum Ortschild"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Du bist nun in der Straße vor der Drachenschanze. Du siehst einen Haider, der ein YouTube-Video dreht und einen Streifenbolizist."
  },
  {
    name: "fight",
    "button text": ["Angreifen", "Ausweichen", "Davonrennen"],
    "button functions": [attack, dodge, goTown],
    text: "Du kämpfst gegen einen Feind."
  },
  {
    name: "kill monster",
    "button text": ["Gehe zurück zum Ortschild", "Gehe zurück zum Ortschild", "Gehe zurück zum Ortschild"],
    "button functions": [goTown, goTown, easterEgg],
    text: " Der Feind schreit um Hilfe während er davonrennt. Du erhälst XP und Gold."
  },
  {
    name: "lose",
    "button text": ["NOCHMAL?", "NOCHMAL?", "NOCHMAL?"],
    "button functions": [restart, restart, restart],
    text: "Du stirbst. Der Drache lacht dich aus. NOCHMAL?"
  },
  { 
    name: "win", 
    "button text": ["NOCHMAL?", "NOCHMAL?", "NOCHMAL?"], 
    "button functions": [restart, restart, restart], 
    text: "Du hast den Drachen besiegt! Er muss jetzt im Nürnberger Hauptbahnhof leben. MEDDL LOIDE!" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Zurück zum Ortsschild?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Du findest ein EasterEgg. Wähle eine der obigen Nummern. Zehn random Nummern von 0 bis 15 werden ausgewählt. Falls deine Nummer dabei ist, gewinnst du!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  if (Math.random() < 0.66) {
    update(locations[1]);
  } else {
    text.innerText = "Du betrittst den Laden. Leider fährt der Drache hinter dir mit seinem roten Audi A4 vor, lässt die Scheibe herunter und sammelt schon Speichel, um dir ins Gesicht zu spucken.";
    fightDragon();
  }
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    update(locations[4]);
    text.innerText = " Du hast kein Gold mehr, du Rechenmaschine. Du wirst wegen versuchten Betrugs von der Rewe-Kassiererin gekickt.";
    
  }
}
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Du hast eine neue Waffe, nämlich: " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In deinem Inventar hast du nun: " + inventory;
    } else {
      update(locations[4]);
      text.innerText = " Du hast kein Gold mehr, du Rechenmaschine. Du wirst wegen versuchten Betrugs von der Rewe-Kassiererin gekickt.";
    }
  } else {
    text.innerText = "Du hast schon die stärkste Waffe!";
    button2.innerText = "Verkaufe eine Waffe für 15 Gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = " Du hast die Waffe " + currentWeapon + " verkauft.";
    text.innerText += " In deinem Inventar hast du folgende Waffen: " + inventory;
  } else {
    text.innerText = "Verkaufe nicht deine einzige Waffe du Genie!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = " Der " + monsters[fighting].name + " greift an.";
  text.innerText += " Du greifst ihn mit deiner Waffe ("+ weapons[currentWeapon].name + ") an.";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Du triffst ihn nicht.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Deine Waffe " + inventory.pop() + " geht kaputt.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Du weichst dem Angriff von " + monsters[fighting].name + " aus.";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Daschenlambe"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 16));
  }
  text.innerText = "Du hast " + guess + " ausgewählt. Hier sind die random Nummern:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Du hast im Loddo gewonnen! Du erhälst 50 Gold!";
    gold += 50;
    goldText.innerText = gold;
  } else {
    text.innerText += "Falsch! Du verlierst 30 Leben!";
    health -= 30;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}