//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

contract MyEpicGame is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

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

    mapping(uint256 => Character) public tokenIdToCharacter;

    mapping(address => uint256) public ownerToTokenId;

    constructor(Character[] memory _initialCharacters)
        ERC721("MyCharacters", "MYCHARS")
    {
        for (uint256 index = 0; index < _initialCharacters.length; index++) {
            Character memory character = _initialCharacters[index];
            characters.push(character);
            console.log(
                "Character initialized '%s' w/ MaxHP %s, attack damage %s, magic damage %s",
                character.name,
                character.attackDamage,
                character.magicDamage
            );
        }

        console.log("Deploying a MyEpicGame deployed by:", msg.sender);
        _tokenIds.increment();
    }

    function mintCharacterNFT(uint256 _characterIndex) external {
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        tokenIdToCharacter[newItemId] = getCharacterByIndex(_characterIndex);

        console.log(
            "Minted NFT w/ tokenId %s and characterIndex %s",
            newItemId,
            _characterIndex
        );

        // Keep an easy way to see who owns what NFT.
        ownerToTokenId[msg.sender] = newItemId;

        // Increment the tokenId for the next person that uses it.
        _tokenIds.increment();
    }

    function getCharacterByIndex(uint256 _index)
        public
        view
        returns (Character memory character)
    {
        for (uint256 index = 0; index < characters.length; index++) {
            if (characters[index].index == _index) {
                character = characters[index];
            }
        }
    }

    function getCharacters() external view returns (Character[] memory) {
        return characters;
    }
}
