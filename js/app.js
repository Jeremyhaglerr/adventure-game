/*-------------------------------- Constants --------------------------------*/

import { getRandomEncounter, fighter, rogue, skeletonCommander, optionalBoss, mainBoss } from "../data/reference-arrays.js"


/*---------------------------- Variables (state) ----------------------------*/

let
  currentPlayerName,
  currentPlayerHealth,
  currentPlayerImage,
  currentPlayerLowAttack,
  currentPlayerHighAttack,
  currentPlayerDefense,
  currentPlayerPotions,
  currentRoomsExplored

let currentEnemyName,
  currentEnemyImage,
  currentEnemyHealth,
  currentEnemyLowAttack,
  currentEnemyHighAttack,
  currentEnemyDefense,
  treasureHasWeapon,
  treasureHasArmor,
  treasurePotions

/*------------------------ Cached Element References ------------------------*/

const mainGameArea = document.getElementById('main-game-area')
const topMessage = document.querySelector('.top-message')
const btnGroup = document.querySelector('.btn-group')

/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- General Functions --------------------------------*/

init()
function init() {
  currentPlayerHealth = 0
  currentPlayerLowAttack = 0
  currentPlayerHighAttack = 0
  currentPlayerDefense = 0
  currentPlayerPotions = 0
  currentRoomsExplored = 0
  classChoices()
}

function classChoices() {
  topMessage.innerHTML = `Choose your Class`
  mainGameArea.innerHTML = `
    <div class="card" id="left-card">
      <div class="card-inner-area">
        <div class="card-image"><img src=${fighter.image} alt=""></div>
        <div class="card-name">${fighter.name}</div>
        <div class="card-stats">
          health:${fighter.health}<br>
          AttackRange:${fighter.lowAttackRange}-${fighter.highAttackRange}<br>
          defense:${fighter.defense}<br>
          potions:${fighter.potions}
        </div>
        <div class="card-about">
          "Break their bones, take what remains"
        </div>
      </div>
    </div>
    <div class="card" id="right-card">
      <div class="card-inner-area">
        <div class="card-image"><img src=${rogue.image} alt=""></div>
        <div class="card-name">${rogue.name}</div>
        <div class="card-stats">
          health:${rogue.health}<br>
          Attack Range:${rogue.lowAttackRange}-${rogue.highAttackRange}<br>
          defense:${rogue.defense}<br>
          potions:${rogue.potions}
        </div>
        <div class="card-about">
          "Combat is a dance and I always lead"
        </div>
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
    render()
    encounterRoom()
  }))

}

function render() {
  mainGameArea.innerHTML =
    `
    <div class="card" id="left-card">
      <div class="card-inner-area">
        <div class="card-image">
          <img src=${currentPlayerImage} alt="">
        </div>
        <div class="card-name">
          ${currentPlayerName}
        </div>
        <div class="card-stats">
          health:${currentPlayerHealth}<br>
          AttackRange:${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
          defense:${currentPlayerDefense}<br>
          potions:${currentPlayerPotions}
        </div>
        <div class="card-about">
          "Break their bones, take what remains"
        </div>
      </div>
    </div>
    <div class="card" id="right-card">
      <div class="card-inner-area">
        <div class="card-image">
        <img src=${currentEnemyImage} alt="">
      </div>
        <div class="card-name">
          ${currentEnemyName}
        </div>
        <div class="card-stats">
          health:${currentEnemyHealth}<br>
          Attack Range:${currentEnemyLowAttack}-${currentPlayerHighAttack}<br>
          defense:${currentEnemyDefense}<br>
        </div>
        <div class="card-about">
          "Combat is a dance and I always lead"
        </div>
      </div>
    </div>
    `
}

function checkWin() {
  if (currentEnemyHealth <= 0) {
    topMessage.innerHTML =
      `
      The ${currentEnemyName} lies dead before you! Congratulations! Do you continue your adventure, or retreat to safety?
      `
      btnGroup.innerHTML = 
      `
      <button type="button" class="btn btn-primary" id = "continue-btn">Continue?</button>
      <button type="button" class="btn btn-danger" id = "replay-btn">Retreat?</button>

      `
    if (currentEnemyName === "Skeleton Commander" || currentEnemyName === "Lich" || currentEnemyName === "Uthvard the Giant King"){
      document.getElementById('continue-btn').addEventListener('click', storyCombatWin)
    } else { 
      document.getElementById('continue-btn').addEventListener('click', encounterRoom)}
      document.getElementById('replay-btn').addEventListener('click', init)
  } else if (currentPlayerHealth <= 0) {
      topMessage.innerHTML =
      `
      You lie dead before the ${currentEnemyName}. There are many more that seek to make their fortune in these depths, continue on and guide their story!
      `
      btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-primary" id = "replay-btn">Replay</button>
      `
    document.getElementById('replay-btn').addEventListener('click', init)
  } else return
}

function encounterRoom() {
  currentRoomsExplored = currentRoomsExplored + 1
  let enemy = getRandomEncounter()
  console.log(enemy);
  currentEnemyName = enemy.name
  currentEnemyImage = enemy.image
  currentEnemyHealth = enemy.health
  currentEnemyLowAttack = enemy.lowAttackRange
  currentEnemyHighAttack = enemy.highAttackRange
  currentEnemyDefense = enemy.defense
  treasureHasWeapon = enemy.hasWeapon
  treasureHasArmor = enemy.hasArmor
  treasurePotions = enemy.potions

  if ([3, 7, 9, 15].includes(currentRoomsExplored)) {
    storyEvents()
  } else if (currentEnemyName === "Treasure") {
    treasureRoom()
  } else {
    render()
    btnGroup.innerHTML =
`
  <button type="button" class="btn btn-danger" id="fight-btn" >Attack</button>
  <button type="button" class="btn btn-warning" id="flee-btn" >Flee</button>
`
    document.getElementById('fight-btn').addEventListener('click', combatRoom)
    document.getElementById('flee-btn').addEventListener('click', damageToPlayer)
  }
}

/*------------------------ Combat functions ------------------------*/

function combatRoom() {
 btnGroup.innerHTML =
    `
    <button type="button" class="btn btn-primary combat-btns" id="attack-btn">Attack</button>
    <button type="button" class="btn btn-secondary combat-btns" id="defend-btn">Defend</button>
    <button type="button" class="btn btn-success combat-btns" id="heal-btn">Heal</button>
    `

  document.getElementById('attack-btn').addEventListener('click', damageToEnemy)
  document.getElementById('defend-btn').addEventListener('click', damageToPlayer)
  document.getElementById('heal-btn').addEventListener('click', healPlayer)
}

function damageToPlayer(evt) {
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
      topMessage.innerHTML =
        `
        The ${currentEnemyName}'s Attack goes wide and misses!
        <br>
        You ready yourself for your next action!
        `
        combatRoom()
    } else {
      currentPlayerHealth = currentPlayerHealth - (playerDamage - currentPlayerDefense)
      topMessage.innerHTML =
        `
        The ${currentEnemyName} attacks you for ${playerDamage - currentPlayerDefense} Damage!
        <br>
        You ready yourself for your next action!
        `
        combatRoom()
    }
  }
  render()
  checkWin()
}

function damageToEnemy() {
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
      You attack the ${currentEnemyName} for ${enemyDamage - currentEnemyDefense} Damage!
      <br>
      They lunge at you to Retaliate!
      `
      btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-secondary" id="continue-combat-btn">Continue</button>
      `
  }
  render()
  checkWin()
  document.getElementById('continue-combat-btn').addEventListener('click', damageToPlayer)
}

function healPlayer() {
  let potionHealing = (Math.floor(Math.random() * (10 - 5 + 1) + 5))
  if (currentPlayerPotions >= 1){
  currentPlayerHealth = currentPlayerHealth + potionHealing
  currentPlayerPotions = currentPlayerPotions - 1
  topMessage.innerHTML =
    `
    You quickly drink one of your health potions and are healed for ${potionHealing} points!
    <br>
    You see wounds start to close before your eyes!
    <br>
    seeing an opening, the ${currentEnemyName} rushes you to Attack!
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
document.getElementById('continue-combat-btn').addEventListener('click', damageToPlayer)
}

/*------------------------ Treasure functions ------------------------*/

function treasureRoom() {
  topMessage.innerHTML = 
  `
  You enter a storage room, you rifle around to see if there is anything worthwhile. Do you take anything? 
  `
  mainGameArea.innerHTML =
    `
    <div class="card" id="left-card">
      <div class="card-inner-area">
        <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
        <div class="card-name">${currentPlayerName}</div>
        <div class="card-stats">
          health:${currentPlayerHealth}<br>
          AttackRange:${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
          defense:${currentPlayerDefense}<br>
          potions:${currentPlayerPotions}
        </div>
        <div class="card-about">
          "Break their bones, take what remains"
        </div>
      </div>
    </div>
      `
      btnGroup.innerHTML =
      `
    <button type="button" class="btn btn-primary" id= "weapon-btn">Weapon: ${treasureHasWeapon}</button>
    <button type="button" class="btn btn-secondary" id= "armor-btn">Armor: ${treasureHasArmor}</button>
    <button type="button" class="btn btn-success" id= "potion-btn">Potions: ${treasurePotions}</button>
    <button type="button" class="btn btn-secondary" id="continue-btn">Continue On</button>
      `
  document.getElementById('continue-btn').addEventListener('click', encounterRoom)
  document.getElementById('weapon-btn').addEventListener('click', updateAttackRange)
  document.getElementById('armor-btn').addEventListener('click', updateDefense)
  document.getElementById('potion-btn').addEventListener('click', updatePotions) 
}

function updateAttackRange(evt) {
  evt.target.style.visibility = "hidden"
  if (treasureHasWeapon === false) {
    treasureHasWeapon = `none`
  } else {
    currentPlayerLowAttack = treasureHasWeapon[0]
    currentPlayerHighAttack = treasureHasWeapon[1]
  }
}

function updateDefense(evt) {
  evt.target.style.visibility = "hidden"
  if (treasureHasArmor === false) {
    treasureHasArmor = `none`
  } else {
    currentPlayerDefense = treasureHasArmor
  }
}

function updatePotions(evt) {
  evt.target.style.visibility = "hidden"
  currentPlayerPotions = currentPlayerPotions + treasurePotions
}

/*------------------------ Story Functions ------------------------*/

function storyEvents() {
  if (currentRoomsExplored === 3) {
  topMessage.innerHTML =
      `
      You see a flailing explorer being dragged down a corridor by several skeletons! Do you follow down the side path, or leave the poor soul to his fate and continue on?</h3>
      `
    mainGameArea.innerHTML =
      `
      <div class="card" id="left-card">
      <div class="card-inner-area">
        <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
        <div class="card-name">${currentPlayerName}</div>
        <div class="card-stats">
          health:${currentPlayerHealth}<br>
          AttackRange:${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
          defense:${currentPlayerDefense}<br>
          potions:${currentPlayerPotions}
        </div>
        <div class="card-about">
          "Break their bones, take what remains"
        </div>
      </div>
      </div>
      `
    btnGroup.innerHTML =
      `
      <button type="button" class="btn btn-secondary" id="follow-story-btn">Follow the side path</button>
      <button type="button" class="btn btn-secondary" id="continue-btn">Continue On</button>
      `
    currentRoomsExplored = currentRoomsExplored + 1
    document.getElementById("follow-story-btn").addEventListener('click', storyEventOne)
    document.getElementById("continue-btn").addEventListener('click', encounterRoom)
  
  } else if (currentRoomsExplored === 7) {
    topMessage.innerHTML =
      `
      As you enter the room you see a figure slumped in the far corner across from the door onwards. Do you sneak past the figure in an attempt to avoid another fight or approach and investigate the figure?
      `
    mainGameArea.innerHTML =
      `
      <div class="card" id="left-card">
        <div class="card-inner-area">
          <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
          <div class="card-name">${currentPlayerName}</div>
          <div class="card-stats">
            health:${currentPlayerHealth}<br>
            AttackRange:${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
            defense:${currentPlayerDefense}<br>
            potions:${currentPlayerPotions}
          </div>
          <div class="card-about">
            "Break their bones, take what remains"
          </div>
        </div>
      </div>
      `
    btnGroup.innerHTML = 
      `
      <button type="button" class="btn btn-secondary" id="continue-btn">Sneak Past</button>
      <button type="button" class="btn btn-secondary" id="follow-story-btn">Investigate</button>
      `
    currentRoomsExplored = currentRoomsExplored + 1
    document.getElementById("follow-story-btn").addEventListener('click', storyEventTwo)
    document.getElementById("continue-btn").addEventListener('click', encounterRoom)
  } else if (currentRoomsExplored === 9) {
    topMessage.innerHTML =
    `
    You come to a fork in the path and pause to assess your options. To the left, you hear distant chanting and the pained screams of what you can only assume is other explorers. If you step close to the entrance, you can sense a thick aura of magic that seems to sap the life force from you on contact. To the right, you see a similar path that you have been travelling thus far complete with the distant sounds of enemies and challenges ahead.
    `
    mainGameArea.innerHTML = 
      `
      <div class="card" id="left-card">
        <div class="card-inner-area">
          <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
          <div class="card-name">${currentPlayerName}</div>
          <div class="card-stats">
            health:${currentPlayerHealth}<br>
            AttackRange:${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
            defense:${currentPlayerDefense}<br>
            potions:${currentPlayerPotions}
          </div>
          <div class="card-about">
            "Break their bones, take what remains"
          </div>
        </div>
      </div>
      `
    btnGroup.innerHTML = 
      `
      <button type="button" class="btn btn-secondary" id="follow-story-btn">Go left</button>
      <button type="button" class="btn btn-secondary" id="continue-btn">Continue Right</button>
      `
    document.getElementById("follow-story-btn").addEventListener('click', storyEventThree)
    document.getElementById("continue-btn").addEventListener('click', encounterRoom)
  } else if (currentRoomsExplored === 15) {
    topMessage.innerHTML =
    `
    As you leave the previous room and step through the door, you find yourself in the crumbled remains of a great hall. Tattered banners hang from the walls and massive columns that once stood sturdy now crumbled and clutter the sides of the room. at the far end you see a massive throne and the skeleton of what you assume to be the Giant King still sitting atop it. No danger is immediately apparent in the room so you begin to search through the rubble in search of anthing valuable left. You continue this search until you near the throne, you see the king's goblet wedged beneath some rubble and lean in to grab it. As you do, you hear a cracking above you, you recoil to see the gigantic Skeleton of the King begin to collect itself, grab its massive sword and begin to stand. You turn to run toward the exit, but the king hurls a piece of their throne over you into the archway supporting the entrance to the hall. The archway crumbles into itself blocking the exit. You have no other option but to turn and face the shambling remains of the king. Prepare yourself!
    `
    mainGameArea.innerHTML = 
      `
      <div class="card" id="left-card">
        <div class="card-inner-area">
          <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
          <div class="card-name">${currentPlayerName}</div>
          <div class="card-stats">
            health:${currentPlayerHealth}<br>
            AttackRange:${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
            defense:${currentPlayerDefense}<br>
            potions:${currentPlayerPotions}
          </div>
          <div class="card-about">
            "Break their bones, take what remains"
          </div>
        </div>
      </div>
      `
    btnGroup.innerHTML = 
      `
      <button type="button" class="btn btn-secondary" id="follow-story-btn">Fight</button>
      `
    document.getElementById("follow-story-btn").addEventListener('click', bossCombat)
  }
}
function storyCombatWin(){
  if (currentEnemyName === 'Skeleton Commander') {
    treasureHasWeapon = [10,18]
    topMessage.innerHTML =
      `
      As the ${currentEnemyName} crumbles into a disparate collection of bones and armor, you see the other remaining skeletons dissapear into the open space in the wall with the explorer in tow. You notice that the adventurer is no longer moving and must have succumbed to whatever wounds they sustained in battle before capture. The wall shuts behind them. You begin to examine the room and find the ${currentEnemyName}'s sword, which is razor sharp and deadly.Do you pick it up or leave well enough alone and move back to the main path.
      `
    mainGameArea.innerHTML = 
      `
      <div class="card" id="left-card">
        <div class="card-inner-area">
          <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
          <div class="card-name">${currentPlayerName}</div>
          <div class="card-stats">
            health:${currentPlayerHealth}<br>
            AttackRange:${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
            defense:${currentPlayerDefense}<br>
            potions:${currentPlayerPotions}
          </div>
          <div class="card-about">
            "Break their bones, take what remains"
          </div>
        </div>
      </div>
      `
    btnGroup.innerHTML = 
      `
      <button type="button" class="btn btn-primary" id= "weapon-btn">Pick up Sword? (Attack Range: ${treasureHasWeapon[0]}-${treasureHasWeapon[1]}) </button>
      <button type="button" class="btn btn-secondary" id="continue-btn">Go Back</button>
      `
    document.getElementById('weapon-btn').addEventListener('click', updateAttackRange)
    document.getElementById('continue-btn').addEventListener('click', encounterRoom)
  } else if (currentEnemyName === "Lich") {
    topMessage.innerHTML =
      `
      You slash into the ${currentEnemyName} with all of your might and watch as the figure begins to twist and contort from pain. you see the ${currentEnemyName} dried skin begin to flake and fall off as the figure slowly disintegrates in front of you. as you are regaining your breath and surveying your surroundings, you see a heavy door on the far side of the room with scratch marks and blood trailing beyond it on the floor. You sense things will get harder if you continue. Do you continue on this path or go back to the path you were on before?
      `
    mainGameArea.innerHTML = 
      `
      <div class="card" id="left-card">
        <div class="card-inner-area">
          <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
          <div class="card-name">${currentPlayerName}</div>
          <div class="card-stats">
            health:${currentPlayerHealth}<br>
            AttackRange:${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
            defense:${currentPlayerDefense}<br>
            potions:${currentPlayerPotions}
          </div>
          <div class="card-about">
            "Break their bones, take what remains"
          </div>
        </div>
      </div>
      `
    btnGroup.innerHTML = 
      `
      <button type="button" class="btn btn-primary" id= "continue-btn">Continue Deeper</button>
      <button type="button" class="btn btn-secondary" id="go-back-btn">Go Back</button>
      `
    mainGameArea.appendChild(storyEventAfterWinMessage)
    document.getElementById('continue-btn').addEventListener('click', goToNextChapter)
    document.getElementById("go-back-btn").addEventListener('click', encounterRoom)
  } else if (currentEnemyName === "Uthvard the Giant King") {
    topMessage.innerHTML =
      `
      The massive size of the Giant King is imposing at first, but then as you continue fighting you notice that many of the bones that made up the king's remains were cracked and breaking at certain points. You use this to your advantage and aim for the weakspots and eventually the king crumbles under his own weight, falling to the floor. As you regain your breath realizing that the danger has passed, you begin to survey the room in earnest. The king's body itself is enough of an artifact to set yourself up for life if you go back now. As you continue to search, more out of burning off the remaining adrenaline than actually searching you notice a crumbling portion of the wall towards the rear of the hall that reveals another massive hallway beyond. do you choose to return to the surface victorious in your efforts, or do you continue to search and see what mysteries lie deeper in the caves and dungeons below? 
      `
    mainGameArea.innerHTML = 
      `
      <div class="card" id="left-card">
        <div class="card-inner-area">
          <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
          <div class="card-name">${currentPlayerName}</div>
          <div class="card-stats">
            health:${currentPlayerHealth}<br>
            AttackRange:${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
            defense:${currentPlayerDefense}<br>
            potions:${currentPlayerPotions}
          </div>
          <div class="card-about">
            "Break their bones, take what remains"
          </div>
        </div>
      </div>
      `
    btnGroup.innerHTML = 
      `
      <button type="button" class="btn btn-primary" id= "continue-btn">Continue</button>
      <button type="button" class="btn btn-secondary" id="go-back-btn">Go Back To The Surface</button>
      `
    document.getElementById('continue-btn').addEventListener('click', goToNextChapter)
    document.getElementById("go-back-btn").addEventListener('click', init)
  }
}

/*------------------------ Story Event One Helper Functions ------------------------*/

function storyEventOne() {
  topMessage.innerHTML =
    `
    As you peer around a bend in the path, you see the more armored of the  and seemingly high-ranking skeletons cast a spell and a portion of the wall opens to reveal a secret passage. You realize that if you dont act now, both the life of the captured explorer and your potential access to this secret passage will be gone. Do you reveal yourself and fight, or do you favor caution and return to the main path?
    `
  mainGameArea.innerHTML = 
    `
    <div class="card" id="left-card">
      <div class="card-inner-area">
        <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
        <div class="card-name">${currentPlayerName}</div>
        <div class="card-stats">
          health:${currentPlayerHealth}<br>
          AttackRange:${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
          defense:${currentPlayerDefense}<br>
          potions:${currentPlayerPotions}
        </div>
        <div class="card-about">
          "Break their bones, take what remains"
        </div>
      </div>
    </div>
    `
  btnGroup.innerHTML = 
    `
    <button type="button" class="btn btn-secondary" id="follow-story-btn">Fight</button>
    <button type="button" class="btn btn-secondary" id="continue-btn">Go Back</button>
    `
  document.getElementById("follow-story-btn").addEventListener('click', storyCombatOne)
  document.getElementById("continue-btn").addEventListener('click', encounterRoom)
}

function storyCombatOne(){
  currentEnemyName = skeletonCommander.name
  currentEnemyHealth = skeletonCommander.health
  currentEnemyImage = skeletonCommander.image
  currentEnemyLowAttack = skeletonCommander.lowAttackRange
  currentEnemyHighAttack = skeletonCommander.highAttackRange
  currentEnemyDefense = skeletonCommander.defense
  combatRoom()
}

/*------------------------ Story Event Two Helper Functions ------------------------*/
function storyEventTwo() {
  topMessage.innerHTML =
      `
      As you carefully approach the figure slumped in the room, you see that the figure is humanoid and moving slightly. The figure sits up as they notice you, startled the figure guards themselves and pleads "Please, I've only just survived the path ahead. I have nothing of value!" It would be easy to end their life, it appears they are only barely clinging onto it as is. Do you end their life so they cannot possibly attack you as you exit the room, or do you lower your guard and approach the figure?
      `
  mainGameArea.innerHTML = 
    `
    <div class="card" id="left-card">
      <div class="card-inner-area">
        <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
        <div class="card-name">${currentPlayerName}</div>
        <div class="card-stats">
          health:${currentPlayerHealth}<br>
          AttackRange:${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
          defense:${currentPlayerDefense}<br>
          potions:${currentPlayerPotions}
        </div>
        <div class="card-about">
          "Break their bones, take what remains"
        </div>
      </div>
    </div>
    `
  btnGroup.innerHTML = 
    `
    <button type="button" class="btn btn-secondary" id="continue-btn">Kill the figure!</button>
    <button type="button" class="btn btn-secondary" id="follow-story-btn">Approach peacefully</button>
    `

  document.getElementById("follow-story-btn").addEventListener('click', storyEventTwoPartTwo)
  document.getElementById("continue-btn").addEventListener('click', encounterRoom)
}

function storyEventTwoPartTwo() {
  topMessage.innerHTML =
      `
      The figure thanks you for your benevolence and relaxes their guard. They tell you they were captured and taken to a chamber up the path from here. They tell of a horrible magical experimentation chamber and of the undead mage that called this chmaber his domain. They say that all manner of magical items were taken in and out of the rooms beyond the chamber. The explorer explains that if they were better equipped, they might have attempted to kill the Mage and take their fortune waiting beyond, but the best they could do was escape their bindings and make it to here. They thank you for your benevolence and for clearing the path out to safety. they raise and limp their way towards the surface. 
      `
  mainGameArea.innerHTML = 
    `
    <div class="card" id="left-card">
      <div class="card-inner-area">
        <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
        <div class="card-name">${currentPlayerName}</div>
        <div class="card-stats">
          health:${currentPlayerHealth}<br>
          AttackRange:${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
          defense:${currentPlayerDefense}<br>
          potions:${currentPlayerPotions}
        </div>
        <div class="card-about">
          "Break their bones, take what remains"
        </div>
      </div>
    </div>
    `
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
      You cautiously creep into the left corridor, every instinct is telling you to got back, but you presson. As the pathway widens you find yourself in a horrific magical laboratory, experiments and test subjects of all kinds scattered around the room. in the center, with its back to you looking across a cluttered desk, you see a figure hovering a few inches off of the ground and studying something. as you approach, a voice snakes its way into your head, "Ahh, we have another brave soul come to seek their fortune...or did you come to cleanse this terrible place of monsters. Either way, I always appreciate new test subjects." Your eyes shut tight as a ringing fills your head, only to open to see the figure standing above you, posed to attack! 
      `
  mainGameArea.innerHTML = 
    `
    <div class="card" id="left-card">
      <div class="card-inner-area">
        <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
        <div class="card-name">${currentPlayerName}</div>
        <div class="card-stats">
          health:${currentPlayerHealth}<br>
          AttackRange:${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
          defense:${currentPlayerDefense}<br>
          potions:${currentPlayerPotions}
        </div>
        <div class="card-about">
          "Break their bones, take what remains"
        </div>
      </div>
    </div>
    `
  btnGroup.innerHTML = 
    `
    <button type="button" class="btn btn-secondary" id="follow-story-btn">Fight!</button>
    `
  mainGameArea.appendChild(storyEventOneContent)
  document.getElementById("follow-story-btn").addEventListener('click', storyEventThreeCombat)
}

function storyEventThreeCombat(){
  currentEnemyName = optionalBoss.name
  currentEnemyHealth = optionalBoss.health
  currentEnemyImage = optionalBoss.image
  currentEnemyLowAttack = optionalBoss.lowAttackRange
  currentEnemyHighAttack = optionalBoss.highAttackRange
  currentEnemyDefense = optionalBoss.defense
  combatRoom()
}

/*------------------------ Main Chapter One Boss Helper Functions ------------------------*/

function bossCombat(){
  currentEnemyName = mainBoss.name
  currentEnemyHealth = mainBoss.health
  currentEnemyImage = mainBoss.image
  currentEnemyLowAttack = mainBoss.lowAttackRange
  currentEnemyHighAttack = mainBoss.highAttackRange
  currentEnemyDefense = mainBoss.defense
  combatRoom()
}


/*------------------------ Next Chapter Helper Functions ------------------------*/


function goToNextChapter() {
  topMessage.innerHTML =
    `
    Thank You For Playing this game thus far, this is the finish of the first chapter of "The Giant King's Catacombs" and the second chapter is yet to come! Replay this chapter and choose other options and see what events may unfold!
    `
  mainGameArea.innerHTML = 
    `
    <div class="card" id="left-card">
      <div class="card-inner-area">
        <div class="card-image"><img src=${currentPlayerImage} alt=""></div>
        <div class="card-name">${currentPlayerName}</div>
        <div class="card-stats">
          health:${currentPlayerHealth}<br>
          AttackRange:${currentPlayerLowAttack}-${currentPlayerHighAttack}<br>
          defense:${currentPlayerDefense}<br>
          potions:${currentPlayerPotions}
        </div>
        <div class="card-about">
          "Break their bones, take what remains"
        </div>
      </div>
    </div>
    `
  btnGroup.innerHTML = 
    `
    <button type="button" class="btn btn-secondary" id="follow-story-btn">Replay</button>
    `
    document.getElementById("follow-story-btn").addEventListener('click', init)
}