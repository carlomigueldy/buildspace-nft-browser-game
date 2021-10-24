export enum Class {
  Warrior = "Warrior",
  Paladin = "Paladin",
  DeathKnight = "DeathKnight",
  Priest = "Priest",
  Hunter = "Hunter",
  Warlock = "Warlock",
  DemonHunter = "DemonHunter",
  Rogue = "Rogue",
  Shaman = "Shaman",
  Mage = "Mage",
  Monk = "Monk",
  Druid = "Druid",
}

export type Character = {
  // id?: number;
  // class: Class;
  name: string;
  imageURI: string;
  healthPoints: number;
  maxHealthPoints: number;
  attackDamage: number;
  armor: number;
  magicResistance: number;
  magicDamage: number;
};
