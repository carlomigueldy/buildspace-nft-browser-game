import { Character } from "../../types";

export function transformCharacterData(character: any): Character {
  return {
    imageURI: character.imageURI,
    name: character.name,
    armor: character.armor.toNumber(),
    attackDamage: character.attackDamage.toNumber(),
    healthPoints: character.healthPoints.toNumber(),
    magicDamage: character.magicDamage.toNumber(),
    magicResistance: character.magicResistance.toNumber(),
    maxHealthPoints: character.maxHealthPoints.toNumber(),
  };
}
