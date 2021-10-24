//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract MyEpicGame {
    struct Character {
        uint256 index;
        string class;
        string name;
        string imageURI;
        uint16 healthPoints;
        uint16 maxHealthPoints;
        uint16 attackDamage;
        uint16 armor;
        uint16 magicResistance;
        uint16 magicDamage;
    }

    Character[] public characters;

    constructor(Character[] memory _initialCharacters) {
        for (uint256 index = 0; index < _initialCharacters.length; index++) {
            Character memory character = _initialCharacters[index];
            characters.push(character);
            console.log("Character initialized '%s'", character.name);
        }

        console.log("Deploying a MyEpicGame deployed by:", msg.sender);
    }
}
