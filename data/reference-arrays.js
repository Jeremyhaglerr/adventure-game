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

const startingClasses = [
{
  name: 'Fighter',
  health:20,
  lowAttackRange:6,
  highAttackRange:10,
  defense:4
},
{
  name: 'Ranger',
  health:10,
  lowAttackRange:8,
  highAttackRange:14,
  defense:2
},
]

function getWeaponChance() {
  let weaponChance= [true, false, false]
  return weaponChance[Math.floor(Math.random() * weaponChance.length)]
}
// console.log(getWeaponChance());

function getArmorChance() {
  let armorChance= [true, false, false]
  return armorChance[Math.floor(Math.random() * armorChance.length)]
}
// console.log(getArmorChance());

function getPotionNumber() {
  let potionNumber= [1,2,3,4]
  return potionNumber[Math.floor(Math.random() * potionNumber.length)]
}
// console.log(getPotionNumber());





















function getRandomEncounter() {
  return randomEncounters[Math.floor(Math.random() *randomEncounters.length)]
}
export{
  getRandomEncounter,
  startingClasses
}