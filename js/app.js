/*-------------------------------- Constants --------------------------------*/

import { getRandomEncounter, fighter, ranger, optionalBoss, mainBoss } from "../data/reference-arrays.js"


/*---------------------------- Variables (state) ----------------------------*/

let currentPlayerHealth,
  currentPlayerLowAttack,
  CurrentPlayerHighAttack,
  currentPLayerDefense,
  currentPlayerPotions,
  currentRoomsSurvived

let currentEnemyName,
  currentEnemyHealth,
  currentEnemyLowAttack,
  currentEnemyHighAttack,
  currentEnemyDefense

/*------------------------ Cached Element References ------------------------*/

const mainGameArea = document.getElementById('main-game-area')
const statBar = document.getElementById('current-stats')

/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/

init()
function init() {//resets the player stats and calls displayClassChoices to display starting screen
  currentPlayerHealth = 0
  currentPlayerLowAttack = 0
  CurrentPlayerHighAttack = 0
  currentPLayerDefense = 0
  currentPlayerPotions = 0
  currentRoomsSurvived = 0
  classChoices()
}

function classChoices() {//displays class choices for user to choose from and updates current player stats accordingly
  let classChoices = document.createElement("div")//creates div container for class choices
  classChoices.classList.add("class-choices")//adds class to div container
  classChoices.innerHTML = //sets the content of div container
    `
  <h1>Choose Your Class</h1>
  <div id = "class-cards">
  <div class="card fighter" style="width: 40rem;">
  <img src="assets/images/fighter-avatar.jpg" class="card-img-top" alt="Fighter with heavy armor and a longsword">
  <div class="card-body">
  <h5 class="card-title">${fighter.name}</h5>
  <h6>Health:${fighter.health} Attack Range: ${fighter.lowAttackRange}-${fighter.highAttackRange} Defense: ${fighter.defense} Potions: ${fighter.potions}</h6>
  <a href="#" class="btn btn-primary" id = "fighter-btn">Choose Class</a>
  </div>
  </div>
  <div class="card ranger" style="width: 40rem;">
  <img src="assets/images/ranger.jpg" class="card-img-top" alt="Ranger with light armor and a bow">
  <div class="card-body">
  <h5 class="card-title">${ranger.name}</h5>
  <h6>Health:${ranger.health} Attack Range: ${ranger.lowAttackRange}-${ranger.highAttackRange} Defense: ${ranger.defense} Potions: ${ranger.potions}</h6>
  <a href="#" class="btn btn-primary" id = "ranger-btn">Choose Class</a>
  </div>
  </div>
  `
  mainGameArea.appendChild(classChoices)
  document.getElementById('ranger-btn').addEventListener('click', (() => {
    currentPlayerHealth = ranger.health
    currentPlayerLowAttack = ranger.lowAttackRange
    CurrentPlayerHighAttack = ranger.highAttackRange
    currentPLayerDefense = ranger.defense
    currentPlayerPotions = ranger.potions
    render()
    encounterRoom()
  }))
  document.getElementById('fighter-btn').addEventListener('click', (() => {
    currentPlayerHealth = fighter.health
    currentPlayerLowAttack = fighter.lowAttackRange
    CurrentPlayerHighAttack = fighter.highAttackRange
    currentPLayerDefense = fighter.defense
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
  <div>Attack Range: ${currentPlayerLowAttack}-${CurrentPlayerHighAttack}</div>
  <div>Defense: ${currentPLayerDefense}</div>
  <div>Potions: ${currentPlayerPotions}</div>
  <div>Rooms Survived: ${currentRoomsSurvived}</div>
  </div>
  `
  if (statBar.hasChildNodes) {
    statBar.removeChild(statBar.lastChild)
    statBar.appendChild(currentPlayerStats)
  } else { statBar.appendChild(currentPlayerStats) }
  checkWin()
}

function checkWin() {
  if (currentEnemyHealth === 0) {
    while (mainGameArea.firstChild) {
      mainGameArea.removeChild(mainGameArea.firstChild)
    }
    let killEnemyMessage = document.createElement("div")
    killEnemyMessage.classList.add("defeat-enemy")
    killEnemyMessage.innerHTML =
      `
  <div class="message-container">
  <h3>The ${currentEnemyName} lies dead before you! Congratulations! Do you continue your adventure, or retreat to safety?
  <button type="button" class="btn btn-primary" id = "continue-btn">Continue?</button>
  <button type="button" class="btn btn-danger" id = "replay-btn">Retreat?</button>
  </div>
  `
    mainGameArea.appendChild(killEnemyMessage)
    currentRoomsSurvived = currentRoomsSurvived + 1
    document.getElementById('continue-btn').addEventListener('click', encounterRoom)
    document.getElementById('replay-btn').addEventListener('click', init)
  } else if (currentPlayerHealth === 0) {
    while (mainGameArea.firstChild) {
      mainGameArea.removeChild(mainGameArea.firstChild)
    }
    let deathMessage = document.createElement("div")
    deathMessage.classList.add("player-death")
    deathMessage.innerHTML =
      `
  <div class="message-container">
  <h3>You lie dead before the ${currentEnemyName}. There are many more that seek to make their fortune in these depths, continue on and guide their story!
  <button type="button" class="btn btn-primary" id = "replay-btn">Replay</button>
  </div>
  `
    mainGameArea.appendChild(deathMessage)
    document.getElementById('replay-btn').addEventListener('click', init)
  } else return
}

function encounterRoom() {
  let enemy = getRandomEncounter()
  currentEnemyName = enemy.name
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
    <h1>A ${currentEnemyName} rushes towrds you! Do you attack?</h1>
    <h3> Health: ${currentEnemyHealth} Attack Range: ${currentEnemyLowAttack}-${currentEnemyHighAttack} Defense: ${currentEnemyDefense}</h3>
    <button type="button" class="btn btn-primary" id = "fight-btn">Fight!</button>
    <button type="button" class="btn btn-secondary" id = "flee-btn">Flee</button>
    </div>
    `
    mainGameArea.appendChild(encounter)
    document.getElementById('fight-btn').addEventListener('click', combatRoom)
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
  <h1>Intense Battle!!!!</h1>
  `
  mainGameArea.appendChild(combatOptions)
}

function damageToPlayer() {

}

function damageToEnemy() {

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




