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

    Character[] public bosses;

    mapping(uint256 => Character) public tokenIdToCharacter;

    mapping(address => uint256) public ownerToTokenId;

    mapping(uint256 => Character) public tokenIdToBoss;

    constructor(
        Character[] memory _initialCharacters,
        Character[] memory _initialBosses
    ) ERC721("MyCharacters", "MYCHARS") {
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

        for (uint256 index = 0; index < _initialBosses.length; index++) {
            Character memory boss = _initialBosses[index];
            bosses.push(boss);
            console.log(
                "Boss initialized '%s' w/ MaxHP %s, attack damage %s, magic damage %s",
                boss.name,
                boss.attackDamage,
                boss.magicDamage
            );
            _mintBossNFT(index);
        }

        _tokenIds.increment();
    }

    function getCharacters() external view returns (Character[] memory) {
        return characters;
    }

    function getBosses() external view returns (Character[] memory) {
        return bosses;
    }

    function getCharacterByIndex(uint256 _index)
        public
        view
        returns (Character memory)
    {
        return characters[_index];
    }

    function getPlayerCharacter() external view returns (Character memory) {
        return tokenIdToCharacter[ownerToTokenId[msg.sender]];
    }

    function getBoss(uint256 _bossId) external view returns (Character memory) {
        return tokenIdToBoss[_bossId];
    }

    function mintCharacterNFT(uint256 _characterIndex) external {
        uint256 newItemId = _tokenIds.current();

        console.log("newItemId '%s' %s", newItemId, _characterIndex);

        _safeMint(msg.sender, newItemId);

        tokenIdToCharacter[newItemId] = getCharacterByIndex(_characterIndex);
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

    modifier characterAlive() {
        require(
            tokenIdToCharacter[ownerToTokenId[msg.sender]].healthPoints > 0,
            "Character must not have 0 HP to attack."
        );
        _;
    }

    modifier bossAlive(uint256 _bossId) {
        require(
            tokenIdToBoss[_bossId].healthPoints > 0,
            "Boss must not be at 0 HP to attack."
        );
        _;
    }

    function attack(uint256 _bossId)
        external
        characterAlive
        bossAlive(_bossId)
    {
        Character memory boss = tokenIdToBoss[_bossId];
        Character memory player = tokenIdToCharacter[
            ownerToTokenId[msg.sender]
        ];

        if (boss.healthPoints < player.attackDamage) {
            boss.healthPoints = 0;
        } else {
            boss.healthPoints -= player.attackDamage;
        }

        if (player.healthPoints < boss.attackDamage) {
            player.healthPoints = 0;
        } else {
            player.healthPoints -= boss.attackDamage;
        }

        tokenIdToBoss[_bossId] = boss;
        tokenIdToCharacter[ownerToTokenId[msg.sender]] = player;

        console.log(
            "Character %s attacks Boss %s with attack damage %s",
            player.name,
            boss.name,
            player.attackDamage
        );
        console.log("Boss now have %s HP", tokenIdToBoss[_bossId].healthPoints);
        console.log(
            "Player now have %s HP",
            tokenIdToCharacter[ownerToTokenId[msg.sender]].healthPoints
        );
    }

    function _mintBossNFT(uint256 _bossIndex) private {
        uint256 newItemId = _tokenIds.current();

        console.log("newItemId '%s' %s", newItemId, _bossIndex);

        _safeMint(address(this), newItemId);

        tokenIdToBoss[newItemId] = bosses[_bossIndex];
        ownerToTokenId[address(this)] = newItemId;

        console.log(
            "Minted NFT w/ tokenId %s and bossIndex %s",
            newItemId,
            _bossIndex
        );

        _tokenIds.increment();
    }
}
