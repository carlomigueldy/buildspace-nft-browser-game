//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./helpers/Base64.sol";
import "hardhat/console.sol";

contract MyEpicGame is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Character {
        // string class;
        string name;
        string imageURI;
        uint256 healthPoints;
        uint256 maxHealthPoints;
        uint256 attackDamage;
        uint256 armor;
        uint256 magicResistance;
        uint256 magicDamage;
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

        _tokenIds.increment();
    }

    function mintCharacterNFT(uint256 _characterIndex) external {
        uint256 newItemId = _tokenIds.current();

        console.log("newItemId '%s' %s", newItemId, _characterIndex);

        _safeMint(msg.sender, newItemId);

        tokenIdToCharacter[newItemId] = characters[_characterIndex];
        ownerToTokenId[msg.sender] = newItemId;

        console.log(
            "Minted NFT w/ tokenId %s and characterIndex %s",
            newItemId,
            _characterIndex
        );

        _tokenIds.increment();
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        Character memory character = tokenIdToCharacter[_tokenId];

        string memory strHp = Strings.toString(character.healthPoints);
        string memory strMaxHp = Strings.toString(character.maxHealthPoints);
        string memory strAttackDamage = Strings.toString(
            character.attackDamage
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        character.name,
                        " -- NFT #: ",
                        Strings.toString(_tokenId),
                        '", "description": "This is an NFT that lets people play in the game Metaverse Slayer!", "image": "',
                        character.imageURI,
                        '", "attributes": [ { "trait_type": "Health Points", "value": ',
                        strHp,
                        ', "max_value":',
                        strMaxHp,
                        '}, { "trait_type": "Attack Damage", "value": ',
                        strAttackDamage,
                        "} ]}"
                    )
                )
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }

    function getCharacterByIndex(uint256 _index)
        public
        view
        returns (Character memory character)
    {
        for (uint256 index = 0; index < characters.length; index++) {
            Character memory char = characters[index];

            if (index == _index) {
                console.log("getCharacterByIndex: %s", char.name);
                character = char;
            }
        }
    }

    function getCharacters() external view returns (Character[] memory) {
        return characters;
    }
}
