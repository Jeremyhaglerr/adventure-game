/*---------------------------- Game Arrays ----------------------------*/

const randomEncounters = [
  {
    name:'Skeletal Soldier',
    health: 12,
    image: "../assets/images/skeleton-fighter.jpg",
    lowAttackRange: 5,
    highAttackRange: 7,
    defense: 5,
  },
  {
    name:'Rival Explorer Mage',
    health:12,
    image:"../assets/images/rival-mage.jpg",
    lowAttackRange:8,
    highAttackRange:10,
    defense:3,
  },
  {
    name:'Rival Explorer Knight',
    image:"../assets/images/rival-warrior.jpg",
    health:15,
    lowAttackRange:7,
    highAttackRange:9,
    defense:5,
  },
  {
    name:'Giant Vemonous Spider',
    health:14,
    image:"../assets/images/giant-spider.jpg",
    lowAttackRange:4,
    highAttackRange:7,
    defense:2,
  },
  {
    name:'Wereboar',
    health:18,
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
  image: "../assets/images/fighter-avatar.jpg",
  lowAttackRange:8,
  highAttackRange:10,
  defense:5,
  potions:2
}

const rogue = {
  name: 'Rogue',
  health:15,
  image:"../assets/images/rogue-avatar.jpg",
  lowAttackRange:10,
  highAttackRange:14,
  defense:3,
  potions:4
}

const skeletonCommander = {
  name: 'Skeleton Commander',
  health:25,
  image:"../assets/images/skeleton-frenzied.jpg",
  lowAttackRange:7,
  highAttackRange:8,
  defense:5,
}

const optionalBoss = {
  name: 'Lich',
  health:35,
  image: '../assets/images/lich.jpg',
  lowAttackRange:10,
  highAttackRange:18,
  defense:4
}

const mainBoss = {
name: 'Uthvard the Giant King',
health:40,
image: "../assets/images/skeletal-giant-king.jpg" ,
lowAttackRange:8,
highAttackRange: 18,
defense:7
}

/*---------------------------- Value Generators ----------------------------*/

function getRandomEncounter() {

  return randomEncounters[Math.floor(Math.random() *randomEncounters.length)]
}
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



/*---------------------------- Other Story Elements ----------------------------*/


/*---------------------------- Exports ----------------------------*/

export{
  getRandomEncounter,
  getWeaponChance,
  getArmorChance,
  getPotionNumber,
  fighter,
  rogue,
  skeletonCommander,
  optionalBoss,
  mainBoss
}