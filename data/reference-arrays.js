/*---------------------------- Game Arrays ----------------------------*/

const randomEncounters = [
  {
    name:'Skeletal Soldier',
    health: 10,
    image: "../assets/images/skeleton-fighter.jpg",
    lowAttackRange: 4,
    highAttackRange: 7,
    defense: 5,
  },
  {
    name:'Rival Explorer Mage',
    health:8,
    image:"../assets/images/rival-mage.jpg",
    lowAttackRange:6,
    highAttackRange:8,
    defense:2,
  },
  {
    name:'Rival Explorer Knight',
    image:"../assets/images/rival-warrior.jpg",
    health:10,
    lowAttackRange:4,
    highAttackRange:8,
    defense:6,
  },
  {
    name:'Giant Vemonous Spider',
    health:6,
    image:"../assets/images/giant-spider.jpg",
    lowAttackRange:4,
    highAttackRange:5,
    defense:2,
  },
  {
    name:'Wereboar',
    health:5,
    image:"../assets/images/wereboar.jpg",
    lowAttackRange:2,
    highAttackRange:5,
    defense:5,
  },
  {
    name:'Treasure',
    hasWeapon: getWeaponChance(),
    hasArmor: getArmorChance(),
    potions: getPotionNumber(),
  }
]

/*---------------------------- Game Objects ----------------------------*/

const fighter = {
  name: 'Fighter',
  health:20,
  lowAttackRange:6,
  highAttackRange:10,
  defense:4,
  potions:2
}

const rogue = {
  name: 'Rogue',
  health:10,
  lowAttackRange:8,
  highAttackRange:14,
  defense:4,
  potions:2
}

const skeletonCommander = {
  name: 'Skeleton Commander',
  health:12,
  image:"../assets/images/skeleton-frenzied.jpg",
  lowAttackRange:5,
  highAttackRange:8,
  defense:9,
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

/*---------------------------- Story Elements ----------------------------*/


/*---------------------------- Exports ----------------------------*/

export{
  getRandomEncounter,
  fighter,
  rogue,
  skeletonCommander,
  optionalBoss,
  mainBoss
}