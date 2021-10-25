import * as faker from "faker";
import { Character, Class } from "../types";

export type DataFactory<T> = {
  generateFake: (payload?: Partial<T>) => T;
  generateFakeArray: (length: number) => T[];
};

export const classes: Class[] = [
  Class.Warrior,
  Class.Paladin,
  Class.DeathKnight,
  Class.Priest,
  Class.Hunter,
  Class.Warlock,
  Class.DemonHunter,
  Class.Rogue,
  Class.Shaman,
  Class.Mage,
  Class.Monk,
  Class.Druid,
];

function getImageURI(type: Class): string {
  switch (type) {
    case Class.Warrior:
      return "https://static.wikia.nocookie.net/wowpedia/images/0/0f/Charactercreate-class_warrior.png/revision/latest/scale-to-width-down/120?cb=20200517190030";

    case Class.Paladin:
      return "https://static.wikia.nocookie.net/wowpedia/images/f/fa/Charactercreate-class_paladin.png/revision/latest/scale-to-width-down/120?cb=20200517190005";

    case Class.DeathKnight:
      return "https://static.wikia.nocookie.net/wowpedia/images/d/de/Charactercreate-class_deathknight.png/revision/latest/scale-to-width-down/120?cb=20200517185937";

    case Class.Priest:
      return "https://static.wikia.nocookie.net/wowpedia/images/7/7e/Charactercreate-class_priest.png/revision/latest/scale-to-width-down/120?cb=20200517190009";

    case Class.Hunter:
      return "https://static.wikia.nocookie.net/wowpedia/images/e/e8/Charactercreate-class_hunter.png/revision/latest/scale-to-width-down/120?cb=20200517185951";

    case Class.Warlock:
      return "https://static.wikia.nocookie.net/wowpedia/images/4/4f/Charactercreate-class_warlock.png/revision/latest/scale-to-width-down/120?cb=20200517190024";

    case Class.DemonHunter:
      return "https://static.wikia.nocookie.net/wowpedia/images/9/97/Charactercreate-class_demonhunter.png/revision/latest/scale-to-width-down/120?cb=20200517185942";

    case Class.Rogue:
      return "https://static.wikia.nocookie.net/wowpedia/images/6/66/Charactercreate-class_rogue.png/revision/latest/scale-to-width-down/120?cb=20200517190014";

    case Class.Shaman:
      return "https://static.wikia.nocookie.net/wowpedia/images/1/17/Charactercreate-class_shaman.png/revision/latest/scale-to-width-down/120?cb=20200517190019";

    case Class.Mage:
      return "https://static.wikia.nocookie.net/wowpedia/images/c/cc/Charactercreate-class_mage.png/revision/latest/scale-to-width-down/120?cb=20200517185956";

    case Class.Monk:
      return "https://static.wikia.nocookie.net/wowpedia/images/4/40/Charactercreate-class_monk.png/revision/latest/scale-to-width-down/120?cb=20200517190000";

    case Class.Druid:
      return "https://static.wikia.nocookie.net/wowpedia/images/6/66/Charactercreate-class_druid.png/revision/latest/scale-to-width-down/120?cb=20200517185946";

    default:
      return "";
  }
}

export const CharacterFactory: DataFactory<Character> = {
  generateFake: (data) => {
    const type = classes[faker.datatype.number(classes.length) - 1];
    const maxHealthPoints = faker.datatype.number(1000);
    return {
      ...data,
      name: `${type} ${faker.name.firstName()}`,
      // class: type,
      imageURI: getImageURI(type),
      healthPoints: maxHealthPoints,
      maxHealthPoints: maxHealthPoints,
      armor: faker.datatype.number(75),
      attackDamage: faker.datatype.number(150),
      magicResistance: faker.datatype.number(125),
      magicDamage: faker.datatype.number(225),
    };
  },
  generateFakeArray: (length) => {
    const array: Character[] = [];
    for (let index = 0; index < length; index++) {
      const character = CharacterFactory.generateFake({});
      array.push(character);
    }
    return array;
  },
};

export const CharacterSeeder = CharacterFactory.generateFakeArray(3).map(
  (character) => {
    return {
      // class: String(character.class),
      name: character.name,
      imageURI: character.imageURI,
      healthPoints: character.healthPoints,
      armor: character.armor,
      attackDamage: character.attackDamage,
      magicDamage: character.magicDamage,
      magicResistance: character.magicResistance,
      maxHealthPoints: character.maxHealthPoints,
    };
  }
);

const bossHp = {
  healthPoints: 3000,
  maxHealthPoints: 3000,
};
export const BossSeeder = [
  {
    ...CharacterFactory.generateFake(),
    healthPoints: 3000,
    maxHealthPoints: 3000,
    imageURI:
      "https://wow.zamimg.com/uploads/blog/images/20854-henry-cavill-as-arthas-menethil-by-bosslogic-actor-approves.jpg",
    name: "Arthas",
  },
  {
    ...CharacterFactory.generateFake(),
    healthPoints: 3000,
    maxHealthPoints: 3000,
    imageURI:
      "https://static.wikia.nocookie.net/theworldofblueteam/images/f/f2/Syl.jpg/revision/latest?cb=20180330214606",
    name: "Lady Sylvannas",
  },
  {
    ...CharacterFactory.generateFake(),
    healthPoints: 3000,
    maxHealthPoints: 3000,
    imageURI:
      "https://blizzardwatch.com/wp-content/uploads/2019/12/Jailer-Header.png",
    name: "Jailer",
  },
];
