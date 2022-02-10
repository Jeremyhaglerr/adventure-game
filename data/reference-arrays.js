/*---------------------------- Game Arrays ----------------------------*/

const randomEncounters = [
  {
    name:'Skeleton',
    health: 10,
    lowAttackRange: 4,
    highAttackRange: 7,
    defense: 3,
  },
  {
    name:'Zombie Fighter',
    health: 12,
    lowAttackRange: 5,
    highAttackRange: 8,
    defense:3,
  },
  {
    name:'Zombie Mage',
    health:8,
    lowAttackRange:6,
    highAttackRange:8,
    defense:2,
  },
  {
    name:'Rival Explorer',
    health:10,
    lowAttackRange:4,
    highAttackRange:8,
    defense:4,
  },
  {
    name:'Ice Spider',
    health:6,
    lowAttackRange:4,
    highAttackRange:5,
    defense:2,
  },
  {
    name:'Swarm of Bats',
    health:5,
    lowAttackRange:2,
    highAttackRange:5,
    defense:5,
  },
  {
    name:'Treasure',
    hasWeapon: getWeaponChance(),
    hasArmor: getArmorChance(),
    potion: getPotionNumber(),
  }
]

/*---------------------------- Game Objects ----------------------------*/

const Fighter = {
  name: 'Fighter',
  health:20,
  lowAttackRange:6,
  highAttackRange:10,
  defense:4
}

const Ranger = {
  name: 'Ranger',
  health:10,
  lowAttackRange:8,
  highAttackRange:14,
  defense:4
}

const optionalBoss = {
  name: 'Lich',
  health:20,
  lowAttackRange:10,
  highAttackRange:14,
  defense:5
}

const mainBoss = {
name: 'Uthvard the Giant King',
health:30,
lowAttackRange:8,
highAttackRange: 14,
defense:5
}

/*---------------------------- Value Generators ----------------------------*/

function getWeaponChance() {
  let weaponChance= [true, false, false]
  let lowDamage = [1,2,3,4,5,6,7,8,9]
  let highDamage= [10,11,12,13,14,15,16]
  if (weaponChance[Math.floor(Math.random() * weaponChance.length)]=== true) {
    return[(lowDamage[Math.floor(Math.random() * lowDamage.length)]),(highDamage[Math.floor(Math.random() * highDamage.length)])]
  } else return false

}

function getArmorChance() {
  let armorChance= [true, false, false]
  let armorDefense= [3,4,5,6,7]
  if (armorChance[Math.floor(Math.random() * armorChance.length)] === true){
    return armorDefense[Math.floor(Math.random() * armorDefense.length)]
  } else return false
}

function getPotionNumber() {
  let potionNumber= [1,2,3,4]
  return potionNumber[Math.floor(Math.random() * potionNumber.length)]
}


function getRandomEncounter() {
  return randomEncounters[Math.floor(Math.random() *randomEncounters.length)]
}

/*---------------------------- Exports ----------------------------*/

export{
  getRandomEncounter,
  Fighter,
  Ranger,
  optionalBoss,
  mainBoss
}