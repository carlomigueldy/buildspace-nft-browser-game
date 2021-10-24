//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract MyEpicGame {
    enum Class {
        Warrior,
        Paladin,
        DeathKnight,
        Priest,
        Hunter,
        Warlock,
        DemonHunter,
        Rogue,
        Shaman,
        Mage,
        Monk,
        Druid
    }

    struct Character {
        uint256 index;
        Class class;
        string name;
        string imageURI;
        uint16 healthPoints;
        uint16 maxHealthPoints;
        uint16 attackDamage;
        uint16 armor;
        uint16 magicResistance;
        uint16 magicDamage;
        address owner;
    }

    Character[] public characters;

    constructor(Character[] memory _initialCharacters) {
        characters = _initialCharacters;

        console.log("Deploying a MyEpicGame deployed by:", msg.sender);
    }
}
