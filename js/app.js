/*-------------------------------- Constants --------------------------------*/

import { 
  getRandomEncounter, 
  getWeaponChance, 
  getArmorChance, 
  getPotionNumber, 
  fighter, 
  rogue, 
  skeletonCommander, 
  optionalBoss, 
  mainBoss 
} from "../data/reference-arrays.js"


/*---------------------------- Variables (state) ----------------------------*/

let
  currentPlayerName,
  currentPlayerHealth,
  currentPlayerImage,
  currentPlayerLowAttack,
  currentPlayerHighAttack,
  currentPlayerDefense,
  currentPlayerPotions,
  currentPlayerAbout,
  currentRoomsExplored
  

let currentEnemyName,
  currentEnemyImage,
  currentEnemyHealth,
  currentEnemyLowAttack,
  currentEnemyHighAttack,
  currentEnemyDefense,
  currentEnemyAbout,
  treasureHasWeapon,
  treasureHasArmor,
  treasurePotions

/*------------------------ Cached Element References ------------------------*/

const mainGameArea = document.getElementById('main-game-area')
const topMessage = document.querySelector('.top-message')
const btnGroup = document.querySelector('.btn-group')
const attack = new Audio('../assets/Sounds/sword-swing.wav');
const heal = new Audio('../assets/Sounds/heal.wav');
const playerDeath = new Audio('../assets/Sounds/player-death.wav');
const enemyDeath = new Audio('../assets/Sounds/enemy-death.wav');
const win = new Audio('../assets/Sounds/win.wav');
const treasure = new Audio('../assets/Sounds/treasure.wav');
const cardSlide = new Audio('../assets/Sounds/card-slide.wav')

/*-------------------------------- Game State Functions --------------------------------*/

init()
function init() {
  currentPlayerHealth = 0
  currentPlayerLowAttack = 0
  currentPlayerHighAttack = 0
  currentPlayerDefense = 0
  currentPlayerPotions = 0
  currentRoomsExplored = 0
  gameStart()
}

function classChoices() {
  cardSlide.play()
  cardSlide.currentTime = 0
  cardSlide.volume = 0.3
  topMessage.style.fontSize = null
  topMessage.style.height = null
  topMessage.style.overflow = null
  topMessage.style.overflowWrap = null
  mainGameArea.style.display = null
  topMessage.innerHTML = `Choose your Class`
  mainGameArea.innerHTML = 
    `
    <div class="card animate__animated animate__backInLeft" id="left-card">
      <div class="card-inner-area">
        <div class="card-image"><img src=${fighter.image} alt=""></div>
        <div class="card-name">${fighter.name}</div>
        <div class="card-stats">
          Health: ${fighter.health}<br>
          Attack: ${fighter.lowAttackRange}-${fighter.highAttackRange}<br>
          Defense: ${fighter.defense}<br>
          Potions: ${fighter.potions}
        </div>
        <div class="card-about">
          ${fighter.about}
        </div>
      </div>
    </div>
    <div class="card animate__animated animate__backInRight" id="right-card">
      <div class="card-inner-area">
        <div class="card-image"><img src=${rogue.image} alt=""></div>
        <div class="card-name">${rogue.name}</div>
        <div class="card-stats">
          Health: ${rogue.health}<br>
          Attack: ${rogue.lowAttackRange}-${rogue.highAttackRange}<br>
          Defense: ${rogue.defense}<br>
          Potions: ${rogue.potions}
        </div>
        <div class="card-about">
          ${rogue.about}
        </div>
      </div>
    </div>
    `
  btnGroup.innerHTML =
    `
    <button type="button" class="btn btn-danger" id="fighter-btn" >Fighter</button>
    <button type="button" class="btn btn-warning" id="rogue-btn" >Rogue</button>
    `
  document.getElementById('rogue-btn').addEventListener('click', (() => {
    currentEnemyName = rogue.name
    currentPlayerHealth = rogue.health
    currentPlayerImage = rogue.image
    currentPlayerLowAttack = rogue.lowAttackRange
    currentPlayerHighAttack = rogue.highAttackRange
    currentPlayerDefense = rogue.defense
    currentPlayerPotions = rogue.potions
    currentPlayerAbout = rogue.about
    render()
    encounterRoom()
  }))
  document.getElementById('fighter-btn').addEventListener('click', (() => {
    currentPlayerName = fighter.name
    currentPlayerHealth = fighter.health
    currentPlayerImage = fighter.image
    currentPlayerLowAttack = fighter.lowAttackRange
    currentPlayerHighAttack = fighter.highAttackRange
    currentPlayerDefense = fighter.defense
    currentPlayerPotions = fighter.potions
    currentPlayerAbout = fighter.about
    render()
    encounterRoom()
  }))

}

function render() {
  topMessage.style.height = null
  topMessage.style.overflow = null
  topMessage.style.overflowWrap = null
  mainGameArea.style.display = null
  cardSlide.play()
  cardSlide.currentTime = 0
  cardSlide.volume = 0.3
  if (currentPlayerHealth <= 0) {
    currentPlayerHealth = 0
  }
  if (currentEnemyHealth <= 0) {
    currentEnemyHealth = 0
  }
  mainGameArea.innerHTML =
    `
    <div class="card player" id="left-card">
      <div class="card-inner-area">
        <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
        <div class="card-name">${currentPlayerName}</div>
        <div class="card-stats">
          health: ${currentPlayerHealth}<br>
          Attack: ${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
          defense: ${currentPlayerDefense}<br>
          potions: ${currentPlayerPotions}
        </div>
        <div class="card-about">
          ${currentPlayerAbout}
        </div>
      </div>
    </div>
    <div class="card enemy" id="right-card">
      <div class="card-inner-area">
        <div class="card-image"><img src=${currentEnemyImage} alt=""></div>
        <div class="card-name">${currentEnemyName}</div>
        <div class="card-stats">
          health: ${currentEnemyHealth}<br>
          Attack: ${currentEnemyLowAttack}-${currentEnemyHighAttack}<br>
          defense: ${currentEnemyDefense}<br>
          <br>
        </div>
        <div class="card-about">
          ${currentEnemyAbout}
        </div>
      </div>
    </div>
    `
}

function checkWin() {
  if (currentEnemyHealth <= 0) {
    enemyDeath.play()
    enemyDeath.volume = 0.3
    document.getElementById('right-card').classList.add('animate__animated', 'animate__backOutRight')
    topMessage.innerHTML =
      `
      The ${currentEnemyName} lies dead before you! Congratulations! Do you continue your adventure, or retreat to safety?
      `
    btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-secondary" id = "continue-btn">Continue?</button>
      <button type="button" class="btn btn-danger" id = "replay-btn">Retreat?</button>

      `
    if (currentEnemyName === "Skeleton Commander" || currentEnemyName === "Lich" || currentEnemyName === "Uthvard the Giant King") {
      document.getElementById('continue-btn').addEventListener('click', storyEventsCombatWin)
    } else {
      document.getElementById('continue-btn').addEventListener('click', encounterRoom)
    }
    document.getElementById('replay-btn').addEventListener('click', init)

  } else if (currentPlayerHealth <= 0 && currentEnemyName === 'Lich') {
    endlessWander()
  }else if (currentPlayerHealth <=0) {
    playerDeath.play()
    playerDeath.volume = 0.3
    document.getElementById('left-card').classList.add('animate__animated', 'animate__backOutLeft')
    
    topMessage.innerHTML =
      `
      You lie dead before the ${currentEnemyName}. There are many more that seek their fortune in these depths, play again and guide their story!
      `
    btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-danger" id = "replay-btn">Replay</button>
      `
    document.getElementById('replay-btn').addEventListener('click', init)
  } else return
}

function encounterRoom() {
  currentRoomsExplored = currentRoomsExplored + 1
  let enemy = getRandomEncounter()
  currentEnemyName = enemy.name
  currentEnemyImage = enemy.image
  currentEnemyHealth = enemy.health
  currentEnemyLowAttack = enemy.lowAttackRange
  currentEnemyHighAttack = enemy.highAttackRange
  currentEnemyDefense = enemy.defense
  currentEnemyAbout = enemy.about
  treasureHasWeapon = getWeaponChance()
  treasureHasArmor = getArmorChance()
  treasurePotions = getPotionNumber()


  if ([3, 7, 9, 15].includes(currentRoomsExplored)) {
    storyEvents()
  } else if (currentEnemyName === "Treasure") {
    treasureRoom()
  } else {
    topMessage.innerHTML =
      `
      A ${currentEnemyName} approaches from the darkness! Do you stand and fight, or attempt to flee?
      `
    render()
    btnGroup.innerHTML =
    `
    <button type="button" class="btn btn-danger" id="fight-btn" >Fight</button>
    <button type="button" class="btn btn-warning" id="flee-btn" >Flee</button>
    `
    document.getElementById('fight-btn').addEventListener('click', combatRoom)
    document.getElementById('flee-btn').addEventListener('click', damageToPlayer)
  }
  document.getElementById('right-card').classList.add('animate__animated', 'animate__backInRight')
  document.getElementById('left-card').classList.add('animate__animated', 'animate__backInLeft')
}

/*------------------------ Combat functions ------------------------*/

function combatRoom() {
  topMessage.innerHTML =
    `
    Ready Yourself!
    `
  btnGroup.innerHTML =
    `
    <button type="button" class="btn btn-danger combat-btns" id="attack-btn">Attack</button>
    <button type="button" class="btn btn-warning combat-btns" id="defend-btn">Defend</button>
    <button type="button" class="btn btn-primary combat-btns" id="heal-btn">Heal</button>
    `

  document.getElementById('attack-btn').addEventListener('click', damageToEnemy)
  document.getElementById('defend-btn').addEventListener('click', damageToPlayer)
  document.getElementById('heal-btn').addEventListener('click', healPlayer)
}

function damageToPlayer(evt) {
  heal.pause()
  attack.pause()
  attack.play()
  attack.currentTime = 0
  attack.volume = 0.3
  let playerDamage = (Math.floor(Math.random() * (currentEnemyHighAttack - currentEnemyLowAttack + 1) + currentEnemyLowAttack))
  if (evt.target.id === 'defend-btn') {
    if ((playerDamage - (currentPlayerDefense + 2)) <= 0) {
      topMessage.innerHTML =
        `
        You blocked the ${currentEnemyName}'s attack and took no damage!
        `
    } else {
      currentPlayerHealth = currentPlayerHealth - (playerDamage - (currentPlayerDefense + 2))
      topMessage.innerHTML =
        `
        The ${currentEnemyName}'s attack slips past your defenses for ${playerDamage - (currentPlayerDefense + 2)} Damage!
        `
    }
  } else if (evt.target.id === 'flee-btn') {
    if ((playerDamage - currentPlayerDefense) <= 0) {
      playerDamage = 0
      topMessage.innerHTML =
        `
        You dodged the ${currentEnemyName}'s attack and make it clear of the room!
        `
      btnGroup.innerHTML =
        `
        <button type="button" class="btn btn-secondary" id="continue-btn">Continue</button>
        `

    } else {
      currentPlayerHealth = currentPlayerHealth - (playerDamage - currentPlayerDefense)
      topMessage.innerHTML =
        `
        As you are fleeing the room, the ${currentEnemyName} attacks you for ${playerDamage - currentPlayerDefense} Damage!
        `
      btnGroup.innerHTML =
        `
        <button type="button" class="btn btn-secondary" id="continue-btn">Continue</button>
        `
    }
    document.getElementById('continue-btn').addEventListener('click', encounterRoom)
  } else if (evt.target.id === 'continue-combat-btn') {
    if ((playerDamage - currentPlayerDefense) <= 0) {
      playerDamage = 0
      combatRoom()
      topMessage.innerHTML =
        `
        The ${currentEnemyName}'s attack goes wide and misses!
        <br>
        You ready yourself for your next action!
        `
    } else {
      currentPlayerHealth = currentPlayerHealth - (playerDamage - currentPlayerDefense)
      combatRoom()
      topMessage.innerHTML =
        `
        The ${currentEnemyName} attacks you for ${playerDamage - currentPlayerDefense} Damage!
        <br>
        You ready yourself for your next action!
        `
    }
  }
  render()
  document.getElementById('right-card').classList.add('animate__animated', 'animate__tada')
  checkWin()
}

function damageToEnemy() {
  heal.pause()
  attack.pause()
  attack.play()
  attack.currentTime = 0
  attack.volume = 0.3
  let enemyDamage = (Math.floor(Math.random() * (currentPlayerHighAttack - currentPlayerLowAttack + 1) + currentPlayerLowAttack))
  if ((enemyDamage - currentEnemyDefense) <= 0) {
    enemyDamage = 0
    topMessage.innerHTML =
      `
      The ${currentEnemyName} dodged your attack! 
      <br>
      They pivot and come in for an attack!
      `
    btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-secondary" id="continue-combat-btn">Continue</button>
      `
  } else {
    currentEnemyHealth = currentEnemyHealth - (enemyDamage - currentEnemyDefense)
    topMessage.innerHTML =
      `
      You attack the ${currentEnemyName} for ${enemyDamage - currentEnemyDefense} damage!
      <br>
      They lunge at you to Retaliate!
      `
    btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-secondary" id="continue-combat-btn">Continue</button>
      `
  }
  render()
  document.getElementById('left-card').classList.add('animate__animated', 'animate__tada')
  checkWin()
  if (currentEnemyHealth !== 0){document.getElementById('continue-combat-btn').addEventListener('click', damageToPlayer)}
}

function healPlayer() {
  attack.pause()
  heal.play()
  heal.currentTime = 0
  heal.volume = 0.3
  let potionHealing = (Math.floor(Math.random() * (10 - 5 + 1) + 5))
  if (currentPlayerPotions >= 1) {
    currentPlayerHealth = currentPlayerHealth + potionHealing
    currentPlayerPotions = currentPlayerPotions - 1
    topMessage.innerHTML =
      `
      You quickly drink one of your health potions and are healed for ${potionHealing} points!
      <br>
      You see wounds start to close before your eyes!
      <br>
      Seeing an opening, the ${currentEnemyName} rushes you to attack!
      `
    btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-secondary" id="continue-combat-btn">Continue</button>
      `
  } else if (currentPlayerPotions < 1) {
    topMessage.innerHTML =
      `
      You reach for a health potion and realize you have none!
      <br>
      In your confusion, the ${currentEnemyName} readies an attack! 
      `
    btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-secondary" id="continue-combat-btn">Continue</button>
      `
  }
  render()
  document.getElementById('left-card').classList.add('animate__animated', 'animate__tada')
  document.getElementById('continue-combat-btn').addEventListener('click', damageToPlayer)
}

/*------------------------ Treasure functions ------------------------*/

function treasureRoom() {
  topMessage.style.height = null
  topMessage.style.overflow = null
  topMessage.style.overflowWrap = null
  mainGameArea.style.display = null
  treasure.pause()
  treasure.play()
  treasure.currentTime = 0
  treasure.volume = 0.3
  topMessage.innerHTML =
    `
    You enter a storage room and search to see if there is anything worthwhile. Do you take anything? 
    `
  mainGameArea.innerHTML =
    `
    <div class="card" id="left-card">
      <div class="card-inner-area">
        <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
        <div class="card-name">${currentPlayerName}</div>
        <div class="card-stats">
          health: ${currentPlayerHealth}<br>
          AttackRange: ${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
          defense: ${currentPlayerDefense}<br>
          potions: ${currentPlayerPotions}
        </div>
        <div class="card-about">
         ${currentPlayerAbout}
        </div>
      </div>
    </div>
    `
  btnGroup.innerHTML =
    `
    <button type="button" class="btn btn-danger" id= "weapon-btn">Weapon: Attack (${treasureHasWeapon})</button>
    <button type="button" class="btn btn-warning" id= "armor-btn">Armor: Defense (${treasureHasArmor})</button>
    <button type="button" class="btn btn-primary" id= "potion-btn">Potions: ${treasurePotions}</button>
    <button type="button" class="btn btn-secondary" id="continue-btn">Continue On</button>
    `
  if (treasureHasWeapon === false) {
    document.getElementById('weapon-btn').remove()
  } else document.getElementById('weapon-btn').addEventListener('click', updateAttackRange)
  if (treasureHasArmor === false) {
    document.getElementById('armor-btn').remove()
  } else document.getElementById('armor-btn').addEventListener('click', updateDefense)
  document.getElementById('continue-btn').addEventListener('click', encounterRoom)
  document.getElementById('potion-btn').addEventListener('click', updatePotions)
}

function updateAttackRange(evt) {
  evt.target.remove()
  if (treasureHasWeapon === false) {
    return
  } else {
    currentPlayerLowAttack = treasureHasWeapon[0]
    currentPlayerHighAttack = treasureHasWeapon[1]
  }
}

function updateDefense(evt) {
  evt.target.remove()
  if (treasureHasArmor === false) {
    return
  } else {
    currentPlayerDefense = treasureHasArmor
  }
}

function updatePotions(evt) {
  evt.target.remove()
  currentPlayerPotions = currentPlayerPotions + treasurePotions
}

/*------------------------ Story Functions ------------------------*/

function storyEvents() {
  if (currentRoomsExplored === 3) {
    topMessage.innerHTML =
      `
      As you turn the corner into the next room, you see an unconscious body being dragged down a corridor by several skeletons! Do you follow down the side path after them, or leave the poor soul to his fate and continue on?
      `
    topMessage.style.height = '80vh'
    topMessage.style.overflow = 'auto'
    topMessage.style.overflowWrap = 'word break'
    mainGameArea.style.display = 'none'
    btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-danger" id="follow-story-btn">Follow the side path</button>
      <button type="button" class="btn btn-secondary" id="continue-btn">Continue On</button>
      `
    currentRoomsExplored = currentRoomsExplored + 1
    document.getElementById("follow-story-btn").addEventListener('click', storyEventOne)
    document.getElementById("continue-btn").addEventListener('click', encounterRoom)

  } else if (currentRoomsExplored === 7) {
    topMessage.innerHTML =
      `
      As you enter the room you see a figure slumped in the far corner nearest to the door onwards. It will be difficult to leave the room without them noticing. Do you sneak past the figure in an attempt to avoid another fight or approach and investigate the figure?
      `
    topMessage.style.height = '80vh'
    topMessage.style.overflow = 'auto'
    topMessage.style.overflowWrap = 'word break'
    mainGameArea.style.display = 'none'
    btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-danger" id="follow-story-btn">Investigate</button>
      <button type="button" class="btn btn-secondary" id="continue-btn">Sneak Past</button>
      `
    currentRoomsExplored = currentRoomsExplored + 1
    document.getElementById("follow-story-btn").addEventListener('click', storyEventTwo)
    document.getElementById("continue-btn").addEventListener('click', encounterRoom)
  } else if (currentRoomsExplored === 9) {
    topMessage.innerHTML =
      `
      You come to a fork in the path and pause to assess your options. To the left, you hear distant chanting and the pained screams of what you can only assume is other explorers. If you step close to the entrance, you can sense a thick aura of magic that seems to sap the life force from you on contact. To the right, you see a similar path that you have been travelling thus far complete with the distant sounds of enemies and challenges ahead.
      `
    topMessage.style.height = '80vh'
    topMessage.style.overflow = 'auto'
    topMessage.style.overflowWrap = 'word break'
    mainGameArea.style.display = 'none'
    btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-danger" id="follow-story-btn">Go left</button>
      <button type="button" class="btn btn-secondary" id="continue-btn">Continue Right</button>
      `
    document.getElementById("follow-story-btn").addEventListener('click', storyEventThree)
    document.getElementById("continue-btn").addEventListener('click', encounterRoom)
  } else if (currentRoomsExplored === 15) {
    topMessage.innerHTML =
      `
      As you step through the next door, you find yourself in the crumbled remains of a great hall. Tattered banners hang from the walls and massive columns that once stood sturdy now clutter the sides of the room. At the far end you see a massive throne and the skeleton of what you assume to be the Giant King still sitting atop it. No danger is immediately apparent in the room, so you begin to search through the rubble in search of leftover valuables. You continue this search until you near the throne and see the king's goblet wedged beneath some rubble. You lean in to grab it and hear a cracking above you, you immediately recoil to see the gigantic Skeleton of the King begin to collect itself, grab its massive sword and begin to stand. Abandoning your treasure, you turn to flee, but the force of the king's footsteps behind you begin to shake the room. The archway supporting the entrance to the hall collapses. You could clear the rubble given more time, but currently you have no other option but to turn and face the massive king who is closing the distance between you. Prepare yourself!
      `
    topMessage.style.height = '80vh'
    topMessage.style.overflow = 'auto'
    topMessage.style.overflowWrap = 'word break'
    mainGameArea.style.display = 'none'
    btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-danger" id="follow-story-btn">Fight</button>
      `
    document.getElementById("follow-story-btn").addEventListener('click', bossCombat)
  }
}
function storyEventsCombatWin() {
  if (currentEnemyName === 'Skeleton Commander') {
    treasureHasArmor = [7]
    topMessage.innerHTML =
      `
      As the ${currentEnemyName} crumbles into a disparate collection of bones and armor, you see the others dissapear into the opened wall with the explorer in tow. You see that the adventurer is no longer moving and must have succumbed to whatever wounds they sustained in battle before capture. You take some solice in knowing they won't be be aware of whatever comes next. Before you can close the gap and follow, the  shuts behind them. You begin to examine the room and find only the ${currentEnemyName}'s armor , it seems sturdy and well made .Do you take it or leave well enough alone and move back to the main path.
      `
    topMessage.style.height = '80vh'
    topMessage.style.overflow = 'auto'
    topMessage.style.overflowWrap = 'word break'
    mainGameArea.style.display = 'none'
    btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-danger" id= "weapon-btn">Pick up Armor? (Defense: ${treasureHasArmor}) </button>
      <button type="button" class="btn btn-secondary" id="continue-btn">Go Back</button>
      `
    document.getElementById('weapon-btn').addEventListener('click', updateAttackRange)
    document.getElementById('continue-btn').addEventListener('click', encounterRoom)
  } else if (currentEnemyName === "Lich") {
    treasureHasWeapon = [10,18]
    topMessage.innerHTML =
      `
      You slash into the ${currentEnemyName} with all of your might and watch as the figure begins to twist and contort from pain. you see the ${currentEnemyName}'s dried skin begin to flake and fall as the figure slowly disintegrates in front of you. The ${currentEnemyName}'s weapon remains, and a part of you wants to pick it up. you find your hand slowly reaching of it's own will towards it. Do you take the weapon?
      `
    topMessage.style.height = '80vh'
    topMessage.style.overflow = 'auto'
    topMessage.style.overflowWrap = 'word break'
    mainGameArea.style.display = 'none'
    btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-danger" id= "continue-btn">Take the Weapon: Attack ${treasureHasWeapon[0]}-${treasureHasWeapon[1]}</button>
      <button type="button" class="btn btn-secondary" id="go-back-btn">Go Back</button>
      `
    document.getElementById('continue-btn').addEventListener('click', endlessWander)
    document.getElementById("go-back-btn").addEventListener('click', encounterRoom)
  } else if (currentEnemyName === "Uthvard the Giant King") {
    topMessage.innerHTML =
      `
      The massive size of the Giant King is imposing at first, but then as you continue fighting you notice that many of the bones that made up the king's remains were cracked and breaking at certain points. You use this to your advantage and aim for the weakspots and eventually the king crumbles under his own weight, falling to the floor. As you regain your breath realizing that the danger has passed, you begin to survey the room in earnest. The king's body itself is enough of an artifact to set yourself up for life if you go back now. As you continue to search, more out of burning off the remaining adrenaline than actually searching you notice a crumbling portion of the wall towards the rear of the hall that reveals another massive hallway beyond. Do you return to the surface victorious in your efforts and live comfortably, or do you continue to search and see what mysteries lie deeper in the caves and dungeons below? 
      `
    topMessage.style.height = '80vh'
    topMessage.style.overflow = 'auto'
    topMessage.style.overflowWrap = 'word break'
    mainGameArea.style.display = 'none'
    btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-danger" id= "continue-btn">Continue</button>
      <button type="button" class="btn btn-secondary" id="go-back-btn">Go Back</button>
      `
    document.getElementById('continue-btn').addEventListener('click', goToNextChapter)
    document.getElementById("go-back-btn").addEventListener('click', liveComfortable)
  }
}

/*------------------------ Story Event One Helper Functions ------------------------*/

function storyEventOne() {
  topMessage.innerHTML =
    `
    As you peer around a bend in the path, you see the more armored skeleton cast a spell and a portion of the wall opens to reveal a secret passage. You realize that if you dont act now, both the life of the captured explorer and your potential access to this secret passage will be gone. Do you reveal yourself and fight, or do you favor caution and return to the main path?
    `
  topMessage.style.height = '80vh'
  topMessage.style.overflow = 'auto'
  topMessage.style.overflowWrap = 'word break'
  mainGameArea.style.display = 'none'
  btnGroup.innerHTML =
    `
    <button type="button" class="btn btn-danger" id="follow-story-btn">Fight</button>
    <button type="button" class="btn btn-secondary" id="continue-btn">Go Back</button>
    `
  document.getElementById("follow-story-btn").addEventListener('click', storyCombatOne)
  document.getElementById("continue-btn").addEventListener('click', encounterRoom)
}

function storyCombatOne() {
  currentEnemyName = skeletonCommander.name
  currentEnemyHealth = skeletonCommander.health
  currentEnemyImage = skeletonCommander.image
  currentEnemyLowAttack = skeletonCommander.lowAttackRange
  currentEnemyHighAttack = skeletonCommander.highAttackRange
  currentEnemyDefense = skeletonCommander.defense
  currentEnemyAbout = skeletonCommander.about
  render()
document.getElementById('left-card').classList.add('animate__animated', 'animate__backInLeft')
document.getElementById('right-card').classList.add('animate__animated', 'animate__backInRight')
  combatRoom()
}

/*------------------------ Story Event Two Helper Functions ------------------------*/
function storyEventTwo() {
  topMessage.innerHTML =
    `
    As you carefully approach the figure, you see that the figure is humanoid and moving slightly. The figure sits up as they notice you, startled the figure guards themselves and pleads "Please, I've only just survived the path ahead. I have nothing of value!" It would be easy to end their life, as it appears they are only barely clinging onto it as is. Do you end their life so they cannot possibly attack you as you exit the room, or do you lower your guard and approach the figure?
    `
  topMessage.style.height = '80vh'
  topMessage.style.overflow = 'auto'
  topMessage.style.overflowWrap = 'word break'
  mainGameArea.style.display = 'none'
  btnGroup.innerHTML =
    `
    <button type="button" class="btn btn-danger" id="continue-btn">Kill the figure!</button>
    <button type="button" class="btn btn-secondary" id="follow-story-btn">Approach peacefully</button>
    `

  document.getElementById("follow-story-btn").addEventListener('click', storyEventTwoPartTwo)
  document.getElementById("continue-btn").addEventListener('click', encounterRoom)
}

function storyEventTwoPartTwo() {
  topMessage.innerHTML =
    `
    The figure thanks you for your benevolence and relaxes their guard. They tell you they were captured along with several others and taken to a chamber up the path from here. They tell of a horrible magical experimentation chamber and of the undead mage that called this chamber his domain. The explorer explains that if they were better equipped, they might have attempted to kill the Mage and free their comrades that were dragged through the door beyond, but the best they could do was escape their bindings and make it back to here. They thank you for your benevolence and for clearing the path out to surface. They stand and limp away towards the surface. 
    `
  topMessage.style.height = '80vh'
  topMessage.style.overflow = 'auto'
  topMessage.style.overflowWrap = 'word break'
  mainGameArea.style.display = 'none'
  btnGroup.innerHTML =
    `
    <button type="button" class="btn btn-secondary" id="continue-btn">Continue On</button>
    `
  document.getElementById("continue-btn").addEventListener('click', encounterRoom)
}

/*------------------------ Story Event Three Helper Functions ------------------------*/

function storyEventThree() {
  topMessage.innerHTML =
    `
    You cautiously creep into the left corridor, every instinct is telling you to go back, but you press on. As the pathway widens you find yourself in a horrific magical laboratory, experiments and test subjects of all kinds scattered around the room. In the center, with it's back to you looking across a cluttered desk, you see a figure hovering a few inches off of the ground and studying something. As you approach, a voice snakes its way into your head, "Ahh, another brave soul come to seek their fortune...or did you come to cleanse this terrible place of monsters. Either way, I always appreciate new test subjects." Your eyes shut tight as a ringing fills your head, only to open and see the figure standing above you, poised to attack! 
    `
  topMessage.style.height = '80vh'
  topMessage.style.overflow = 'auto'
  topMessage.style.overflowWrap = 'word break'
  mainGameArea.style.display = 'none'
  btnGroup.innerHTML =
    `
    <button type="button" class="btn btn-danger" id="follow-story-btn">Fight!</button>
    `
  document.getElementById("follow-story-btn").addEventListener('click', storyEventThreeCombat)
}

function storyEventThreeCombat() {
  currentEnemyName = optionalBoss.name
  currentEnemyHealth = optionalBoss.health
  currentEnemyImage = optionalBoss.image
  currentEnemyLowAttack = optionalBoss.lowAttackRange
  currentEnemyHighAttack = optionalBoss.highAttackRange
  currentEnemyDefense = optionalBoss.defense
  currentEnemyAbout  = optionalBoss.about
  render()
document.getElementById('left-card').classList.add('animate__animated', 'animate__backInLeft')
document.getElementById('right-card').classList.add('animate__animated', 'animate__backInRight')
  combatRoom()
}

/*------------------------ Main Chapter One Boss Helper Functions ------------------------*/

function bossCombat() {
  currentEnemyName = mainBoss.name
  currentEnemyHealth = mainBoss.health
  currentEnemyImage = mainBoss.image
  currentEnemyLowAttack = mainBoss.lowAttackRange
  currentEnemyHighAttack = mainBoss.highAttackRange
  currentEnemyDefense = mainBoss.defense
  currentEnemyAbout = mainBoss.about
  render()
  document.getElementById('left-card').classList.add('animate__animated', 'animate__backInLeft')
  document.getElementById('right-card').classList.add('animate__animated', 'animate__backInRight')
  combatRoom()
}


/*------------------------ Ending Helper Functions ------------------------*/


function goToNextChapter() {
  win.play()
  win.volume = 0.3
  topMessage.innerHTML =
    `
    As you break through the rubble and open the door beyond, you are caught off guard by sounds of other people. You close the door behind you as quietly as possible as to not make your presence known. As you creep further into the room you can hear laughter, conversation, and you smell...food. You wonder who this group of people is that can survive and keep their spirits so high in this hellish place. As you round a corner, your question gives way to many more. Before you is the castle dining room, only its not in shambles like the rooms you've seen thus far. Everything from the ceiling to the hearth at the other end of the room are perfectly maintained, and the huge stained glass windows are letting in beautiful arrays of colors across the room. Wait, how can there be light this far underground, but you swear you see clouds outside the window nearest to you.
    <br>
    You are so enamored by the clouds, you fail to see the person approaching behind you. "Good tidings!", they say as all of the air leaves your body out of fear. "Oh, my apologies! I didn't mean to frighten you" they continue. As you regain your breath and your compusure they outstretch a hand towards you. "Welcome, friend! You must be one of the new recruits the King, Uthvard has requested. Always happy to see new faces."
    <br> 
    `
  topMessage.style.height = '80vh'
  topMessage.style.overflow = 'auto'
  topMessage.style.overflowWrap = 'word break'
  mainGameArea.style.display = 'none'
  btnGroup.innerHTML =
    `
    <button type="button" class="btn btn-danger" id="follow-story-btn">Continue</button>
    `
  document.getElementById("follow-story-btn").addEventListener('click', thankYou)
}

function endlessWander() {
  topMessage.innerHTML =
    `
    The ${currentEnemyName} slashes into your gut and upwards. You feel the pain cut through you like a hot knife. You know this is the end. As you fall, the ${currentEnemyName} cackles. The last thing you hear before you drift off is, 'Don't worry, I will give you a new purpose." When you wake, you expect to feel...pain. Why is there is pain? You were dying, right? Confused and panicking, you check your stomach where the wound was and find the gash still in your armor but don't feel any wound underneath. You stand and look around. You seem to have been dropped in a random room somewhere in the catacombs. Determining that nothing will come of you standing around press on with a newfound purpose set in your mind. None shall leave this place, they must be brought as fuel for the legions. 
    <br> 
    <br>
    Another soul is doomed to wander the catacombs at the behest of the forces that lie within. Perhaps you will have better luck next time. Try Again?
    `
  topMessage.style.height = '80vh'
  topMessage.style.overflow = 'auto'
  topMessage.style.overflowWrap = 'word break'
  mainGameArea.style.display = 'none'
  btnGroup.innerHTML =
    `
    <button type="button" class="btn btn-danger" id="follow-story-btn">Try Again</button>
    `
  document.getElementById("follow-story-btn").addEventListener('click', init)
}

function liveComfortable() {
  topMessage.innerHTML =
    `
    As you climb out of the darkness and back into the light, your eyes burn as they adjust. You expect to find encampments of hundreds of treasure seekers like yourself like there was when you entered, instead you see only the battered and snow covered remains of what is left. You call out and ... no response. Where could everyone have gone? You have only been down in the depths for a couple days by your estimate. They couldn't have packed up so quickly and why wouldn't they have taken the supply crates if they did? You begin to search the remains of your former campsite only to find what is left crumbles to dust when you touch it as if it is hundreds of years old. That doesn't make any sense, but as you look around you find the same in other places too. There is no way that you could have been down there for that long! Even if you had, why have you not aged? The wind and cold bite into you as these questions run through your head. What do you do now? Brave the frozen landscape that from your memory spans at least two days travel before the next town, or do you go back into the catacombs hoping to find answers there?
    `
    topMessage.style.height = '80vh'
    topMessage.style.overflow = 'auto'
    topMessage.style.overflowWrap = 'word break'
    mainGameArea.style.display = 'none'
  btnGroup.innerHTML =
    `
    <button type="button" class="btn btn-secondary" id="follow-story2-btn">Into the Northlands</button>
    <button type="button" class="btn btn-danger" id="replay-btn">Replay?</button>
    `
  document.getElementById("replay-btn").addEventListener('click', init)
  document.getElementById("follow-story2-btn").addEventListener('click', goToNextChapterSurvival)

}
// Icebox Feature 
function goToNextChapterSurvival() {
  thankYou()
}

function thankYou() {
  topMessage.innerHTML =
    `
    Congratulations! You have finished the Giant King's Catacombs! Thank you for playing my game, I had a tremendous amount of fun making it and hope it was fun to play as well. This game will eventually be the first chapter in a much longer story and I hope you will return to play when it is finished. For now, return to the dpeths of the catacombs below and choose other paths, who knows what secrets may lie in store.
    `
    topMessage.style.height = '80vh'
    topMessage.style.overflow = 'auto'
    topMessage.style.overflowWrap = 'word break'
    mainGameArea.style.display = 'none'
  btnGroup.innerHTML =
    `
    <button type="button" class="btn btn-danger" id="replay-btn">Replay?</button>
    `
  document.getElementById("replay-btn").addEventListener('click', init)
}
/*------------------------ Game Start Functions ------------------------*/

function gameStart() { 
  topMessage.innerHTML =
    `
    The Giant King's Catacombs 
    `
  topMessage.style.fontSize = '90px'
  topMessage.style.height = '80vh'
  topMessage.style.overflow = 'auto'
  topMessage.style.overflowWrap = 'word break'
  mainGameArea.style.display = 'none'
  btnGroup.innerHTML =
    `
    <button type="button" class="btn btn-danger" id="play-btn">Delve into the Darkness</button>
    `
  document.getElementById("play-btn").addEventListener('click', classChoices)
}
