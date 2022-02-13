/*-------------------------------- Constants --------------------------------*/

import { getRandomEncounter, fighter, rogue, optionalBoss, mainBoss } from "../data/reference-arrays.js"


/*---------------------------- Variables (state) ----------------------------*/

let currentPlayerHealth,
  currentPlayerLowAttack,
  currentPlayerHighAttack,
  currentPlayerDefense,
  currentPlayerPotions,
  currentRoomsSurvived

let currentEnemyName,
  currentEnemyImage,
  currentEnemyHealth,
  currentEnemyLowAttack,
  currentEnemyHighAttack,
  currentEnemyDefense

/*------------------------ Cached Element References ------------------------*/

const mainGameArea = document.getElementById('main-game-card')
const statBar = document.getElementById('current-stats')

/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/

init()
function init() {//resets the player stats and calls displayClassChoices to display starting screen
  while (mainGameArea.firstChild) {
    mainGameArea.removeChild(mainGameArea.firstChild)
  }
  currentPlayerHealth = 0
  currentPlayerLowAttack = 0
  currentPlayerHighAttack = 0
  currentPlayerDefense = 0
  currentPlayerPotions = 0
  currentRoomsSurvived = 0
  render()
  classChoices()
}

function classChoices() {//displays class choices for user to choose from and updates current player stats accordingly
  let classChoices = document.createElement("div")//creates div container for class choices
  classChoices.classList.add("class-choices")//adds class to div container
  classChoices.innerHTML = //sets the content of div container
    `
    <h3 class="top-message">Choose Your Class<h3>
    <div id = "class-cards">
    <div class="fighter" style="width: 200rem;">
    <img src="assets/images/fighter-avatar.jpg" class="card-img-top" alt="Fighter with heavy armor and a longsword">
    <div>
    <h5>${fighter.name}</h5>
    <h6>Health:${fighter.health} Attack Range: ${fighter.lowAttackRange}-${fighter.highAttackRange} Defense: ${fighter.defense} Potions: ${fighter.potions}</h6>
    <a href="#" class="btn btn-primary" id = "fighter-btn">Choose Class</a>
    </div>
    </div>
    <div class="rogue" style="width: 200rem;">
    <img src="assets/images/rogue-avatar.jpg" class="card-img-top" alt="Ranger with light armor and a bow">
    <div>
    <h5>${rogue.name}</h5>
    <h6>Health:${rogue.health} Attack Range: ${rogue.lowAttackRange}-${rogue.highAttackRange} Defense: ${rogue.defense} Potions: ${rogue.potions}</h6>
    <a href="#" class="btn btn-primary" id = "rogue-btn">Choose Class</a>
    </div>
    </div>
    `
  mainGameArea.appendChild(classChoices)
  document.getElementById('rogue-btn').addEventListener('click', (() => {
    currentPlayerHealth = rogue.health
    currentPlayerLowAttack = rogue.lowAttackRange
    currentPlayerHighAttack = rogue.highAttackRange
    currentPlayerDefense = rogue.defense
    currentPlayerPotions = rogue.potions
    render()
    encounterRoom()
  }))
  document.getElementById('fighter-btn').addEventListener('click', (() => {
    currentPlayerHealth = fighter.health
    currentPlayerLowAttack = fighter.lowAttackRange
    currentPlayerHighAttack = fighter.highAttackRange
    currentPlayerDefense = fighter.defense
    currentPlayerPotions = fighter.potions
    render()
    encounterRoom()
  }))

}

function render() {
  let currentPlayerStats = document.createElement("div")
  currentPlayerStats.classList.add("current-stats")
  currentPlayerStats.innerHTML =
    `<div id = "current-stats-container">
    <div>Health: ${currentPlayerHealth}</div>
    <div>Attack Range: ${currentPlayerLowAttack}-${currentPlayerHighAttack}</div>
    <div>Defense: ${currentPlayerDefense}</div>
    <div>Potions: ${currentPlayerPotions}</div>
    <div>Rooms Survived: ${currentRoomsSurvived}</div>
    </div>
    `
  if (statBar.hasChildNodes) {
    statBar.removeChild(statBar.lastChild)
    statBar.appendChild(currentPlayerStats)
  } else { statBar.appendChild(currentPlayerStats) }
}

function checkWin() {
  if (currentEnemyHealth <= 0) {
    while (mainGameArea.firstChild) {
      mainGameArea.removeChild(mainGameArea.firstChild)
    }
    let killEnemyMessage = document.createElement("div")
    killEnemyMessage.classList.add("defeat-enemy")
    killEnemyMessage.innerHTML =
      `
      <div class="message-container">
      <h3 class="top-message">The ${currentEnemyName} lies dead before you! Congratulations! Do you continue your adventure, or retreat to safety?
      <div class="btn-group">
      <button type="button" class="btn btn-primary" id = "continue-btn">Continue?</button>
      <button type="button" class="btn btn-danger" id = "replay-btn">Retreat?</button>
      </div>
      </div>
      `
    mainGameArea.appendChild(killEnemyMessage)
    currentRoomsSurvived = currentRoomsSurvived + 1
    document.getElementById('continue-btn').addEventListener('click', encounterRoom)
    document.getElementById('replay-btn').addEventListener('click', init)
  } else if (currentPlayerHealth <= 0) {
    while (mainGameArea.firstChild) {
      mainGameArea.removeChild(mainGameArea.firstChild)
    }
    let deathMessage = document.createElement("div")
    deathMessage.classList.add("player-death")
    deathMessage.innerHTML =
      `
      <div class="message-container">
      <h3 class ="top-message">You lie dead before the ${currentEnemyName}. There are many more that seek to make their fortune in these depths, continue on and guide their story!
      <div class="btn-group">
      <button type="button" class="btn btn-primary" id = "replay-btn">Replay</button>
      </div>
      </div>
      `
    mainGameArea.appendChild(deathMessage)
    document.getElementById('replay-btn').addEventListener('click', init)
  } else return
}

function encounterRoom() {
  let enemy = getRandomEncounter()
  console.log(enemy);
  currentEnemyName = enemy.name
  currentEnemyImage = enemy.image
  currentEnemyHealth = enemy.health
  currentEnemyLowAttack = enemy.lowAttackRange
  currentEnemyHighAttack = enemy.highAttackRange
  currentEnemyDefense = enemy.defense
  while (mainGameArea.firstChild) {
    mainGameArea.removeChild(mainGameArea.firstChild)
  }

  if ([3, 7, 13, 15].includes(currentRoomsSurvived)) {
    storyEvents()
  } else if (currentEnemyName === "Treasure") {
    treasureRoom()
  } else {
    let encounter = document.createElement("div")
    encounter.classList.add("encounter")
    encounter.innerHTML =
      `
      <div class = "encounter-container">
      <h3 class="top-message">An angry ${currentEnemyName} rushes towrds you! Do you attack?</h1>
      <img id = "enemy-image" src = ${currentEnemyImage}>
      <h3> Health: ${currentEnemyHealth} Attack Range: ${currentEnemyLowAttack}-${currentEnemyHighAttack} Defense: ${currentEnemyDefense}</h3>
      <div class="btn-group">
      <button type="button" class="btn btn-primary" id = "fight-btn">Fight!</button>
      <button type="button" class="btn btn-secondary" id="flee-btn">Flee!</button>
      </div>
      </div>
      `
    mainGameArea.appendChild(encounter)
    document.getElementById('fight-btn').addEventListener('click', combatRoom)
    document.getElementById('flee-btn').addEventListener('click', damageToPlayer)
  }
}

function combatRoom() {
  while (mainGameArea.firstChild) {
    mainGameArea.removeChild(mainGameArea.firstChild)
  }
  let combatOptions = document.createElement("div")
  combatOptions.classList.add("combat")
  combatOptions.innerHTML =
    `
    <div id = "combat-container">
    <h3 class="top-message">asdadasd</h3>
    <img id = "enemy-image" src = ${currentEnemyImage}>
    <h3> Health: ${currentEnemyHealth} Attack Range: ${currentEnemyLowAttack}-${currentEnemyHighAttack} Defense: ${currentEnemyDefense}</h3>
    <div class="btn-group">
    <button type="button" class="btn btn-primary combat-btns" id="attack-btn">Attack</button>
    <button type="button" class="btn btn-secondary combat-btns" id="defend-btn">Defend</button>
    <button type="button" class="btn btn-success combat-btns" id="heal-btn">Heal</button>
    </div>
    </div>
    `

  mainGameArea.appendChild(combatOptions)
  document.getElementById('attack-btn').addEventListener('click', damageToEnemy)
  document.getElementById('defend-btn').addEventListener('click', damageToPlayer)
  document.getElementById('heal-btn').addEventListener('click', healPlayer)
}

function damageToPlayer(evt) {
  let fightMessage = document.querySelector(".top-message")

  let playerDamage = (Math.floor(Math.random() * (currentEnemyHighAttack - currentEnemyLowAttack + 1) + currentEnemyLowAttack))

  if (evt.target.id === 'defend-btn') {
    if ((playerDamage - (currentPlayerDefense + 2)) <= 0) {
      fightMessage.innerHTML = ''
      fightMessage.innerHTML =
        `
        You blocked the ${currentEnemyName}'s attack and took no damage!
        `
    } else {
      currentPlayerHealth = currentPlayerHealth - (playerDamage - (currentPlayerDefense + 2))
      fightMessage.innerHTML = ''
      fightMessage.innerHTML =
        `
        The ${currentEnemyName}'s attack slips past your defenses for ${playerDamage - (currentPlayerDefense + 2)} Damage!
        `
    }
  } else if (evt.target.id === 'flee-btn') {
    if ((playerDamage - currentPlayerDefense) <= 0) {
      playerDamage = 0
      fightMessage.innerHTML = ''
      fightMessage.innerHTML =
        `
        You dodged the ${currentEnemyName}'s attack and make it clear of the room!
        <br>
        <button type="button" class="btn btn-secondary" id="continue-btn">Continue</button>
        `

    } else {
      currentPlayerHealth = currentPlayerHealth - (playerDamage - currentPlayerDefense)
      fightMessage.innerHTML = ''
      fightMessage.innerHTML =
        `
        As you are fleeing the room, the ${currentEnemyName} attacks you for ${playerDamage - currentPlayerDefense} Damage!
        <br>
        <button type="button" class="btn btn-secondary" id="continue-btn">Continue</button>
        `

    }
    document.getElementById('fight-btn').style.visibility = "hidden"
    document.getElementById('flee-btn').style.visibility = "hidden"
    document.getElementById('continue-btn').addEventListener('click', encounterRoom)
  } else if (evt.target.id === 'continue-combat-btn') {
    if ((playerDamage - currentPlayerDefense) <= 0) {
      playerDamage = 0
      fightMessage.innerHTML = ''
      fightMessage.innerHTML =
        `
        The ${currentEnemyName}'s Attack goes wide and misses!
        <br>
        You ready yourself for your next action!
        `

    } else {
      currentPlayerHealth = currentPlayerHealth - (playerDamage - currentPlayerDefense)
      fightMessage.innerHTML = ''
      fightMessage.innerHTML =
        `
        The ${currentEnemyName} attacks you for ${playerDamage - currentPlayerDefense} Damage!
        <br>
        You ready yourself for your next action!
        `

    }

  }
  render()
  checkWin()
}

function damageToEnemy() {
  let fightMessage = document.querySelector(".top-message")
  let enemyDamage = (Math.floor(Math.random() * (currentPlayerHighAttack - currentPlayerLowAttack + 1) + currentPlayerLowAttack))

  if ((enemyDamage - currentEnemyDefense) <= 0) {
    enemyDamage = 0
    fightMessage.innerHTML = ''
    fightMessage.innerHTML =
      `
      The ${currentEnemyName} dodged your attack! 
      <br>
      They pivot and come in for an attack!
      <br>
      <button type="button" class="btn btn-secondary" id="continue-combat-btn">Continue</button>
      `
  } else {
    currentEnemyHealth = currentEnemyHealth - (enemyDamage - currentEnemyDefense)
    fightMessage.innerHTML = ''
    fightMessage.innerHTML =
      `
      You attack the ${currentEnemyName} for ${enemyDamage - currentEnemyDefense} Damage!
      <br>
      They lunge at you to Retaliate!
      <br>
      <button type="button" class="btn btn-secondary" id="continue-combat-btn">Continue</button>
      `
  }
  render()
  checkWin()
  document.getElementById('continue-combat-btn').addEventListener('click', damageToPlayer)
}

function healPlayer() {
  let fightMessage = document.querySelector(".top-message")
  let potionHealing = (Math.floor(Math.random() * (10 - 5 + 1) + 5))
  if (currentPlayerPotions >= 1){
  currentPlayerHealth = currentPlayerHealth + potionHealing
  currentPlayerPotions = currentPlayerPotions - 1
  fightMessage.innerHTML = ''
  fightMessage.innerHTML =
    `
    You quickly drink one of your health potions and are healed for ${potionHealing} points!
    <br>
    You see wounds start to close before your eyes!
    <br>
    seeing an opening, the ${currentEnemyName} rushes you to Attack!
    <button type="button" class="btn btn-secondary" id="continue-combat-btn">Continue</button>
    `
  } else if (currentPlayerPotions < 1) {
  fightMessage.innerHTML = ''
  fightMessage.innerHTML =
    `
    You reach for a health potion and realize you have none!
    <br>
    In your confusion, the ${currentEnemyName} readies an attack! 

    <button type="button" class="btn btn-secondary" id="continue-combat-btn">Continue</button>
    `
  }
render()
document.getElementById('continue-combat-btn').addEventListener('click', damageToPlayer)
}


function treasureRoom() {
  console.log('Treasure Found');
}

function storyEvents() {
  if (currentRoomsSurvived === 3) {
    console.log('first story event here');
  } else if (currentRoomsSurvived === 7) {
    console.log('Second story event here');
  } else if (currentRoomsSurvived === 13) {
    console.log('third story event here');
  } else if (currentRoomsSurvived === 15) {
    console.log("Boss Event Here!!!!!!");
  }
}




