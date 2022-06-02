// Elements to load depending on needs
var playerCountSettings;
var fenrisOptionsButton;
var informationCell;

// Store all library elements and then delete the library
function applicationStart()
{
    playerCountSettings = document.getElementById("player-count-settings");
    fenrisOptionsButton = document.getElementById("fenris-options-button");
    informationCell = document.querySelector('#info-templete');

    let libraryParent = document.getElementById("elements-library").parentElement;
    libraryParent.removeChild(document.getElementById("elements-library"));

}

// Clear non-layout elements
function clearContents(){
    let settingsRegion = document.getElementById("settings-container");
    settingsRegion.innerHTML = "";

    let toggleRegion = document.getElementById("toggle-options-container");
    toggleRegion.innerHTML = "<p>This is a lite version of a bigger project I'm working on in my free time</p> "
                             + "<p>The eventual goal is to be able to randomize all aspects and to filter between all options</p> "
                             + "<p>There is no time table - Please be patient</p>";

    let resultRegion = document.getElementById("randomized-results-container");
    resultRegion.innerHTML = "<h2>Person pressing Randomize is Player 1</h2>";
}

function loadInformationCell(playerNum, faction, mat, vMods){
    
    let newCell = informationCell.content.cloneNode(true);

    // Set playerNum
    newCell.children[0].children[0].innerHTML = playerNum + ")";

    // Set mat
    newCell.children[0].children[1].innerHTML = " " + mat + " ";

    // Set faction
    newCell.children[0].children[1].innerHTML += faction + " ";

    // Set Vesna Mod options
    if(faction.includes("Vesna")){
        newCell.children[1].children[0].innerHTML = "";
        for(let i = 0; i < vMods.length; i++){
            if(i != vMods.length && i != 0){
                newCell.children[1].children[0].innerHTML += ", ";
            }
            newCell.children[1].children[0].innerHTML += " " + vMods[i];
        }
    }
    else{
        newCell.removeChild( newCell.children[1]);
    }

    let cellWrapper = document.createElement("div");
    cellWrapper.classList.add("randomized-info");
    cellWrapper.append(newCell);

    let conatiner = document.getElementById("randomized-results-container");
    conatiner.append(cellWrapper);
}

// Load elements needed for randomizing factions
function loadFactionComponents(){
    clearContents();
    loadPlayerCountSettings(randomizeFactions);
    loadToggleFactionOptions(nonFenrisFactions, true, true);
    loadFenrisSpoilerContainer();
}

// Load elements need for randomizing player mats
function loadPlayerMatComponents(){
    clearContents();    
    loadPlayerCountSettings(randomizeMats);
    loadToggleOptions(playerMats, true, true, "mat-toggle-option");
}

// Load elements need for randomizing both player mats and factions
function loadFactionAndMatComponents(){
    clearContents();
    loadPlayerCountSettings(randomizeFactionsAndMats);
    loadToggleOptions(playerMats, true, true, "mat-toggle-option");
    loadToggleFactionOptions(nonFenrisFactions, false, true);
    loadFenrisSpoilerContainer();

}

//#region Faction loading Region

// Load settings for Player count
function loadPlayerCountSettings(randomizeOption){
    let settings = playerCountSettings;
    let settingsContainer = document.getElementById("settings-container");

    let randomizerButton = settings.children[2];
    randomizerButton.onclick = randomizeOption;

    settingsContainer.append(settings);
}

// Load Factions toggle options
function loadToggleFactionOptions(optionsArray, clearOthers, defaultChecked){
    // Find the proper containers
    // Save any eventual pre-made fenris area
    // Cleanse them
    let baseContainer = document.getElementById("toggle-options-container");
    
    if(clearOthers == true){
        baseContainer.innerHTML = "";
    }

    // Add an element for each toggle option
    for(let i = 0; i < optionsArray.length; i++){

        let toggleOption = document.createElement("div");
        toggleOption.classList.add("faction-toggle-option");
        toggleOption.classList.add("toggle-option");

        let toggleBox = document.createElement("input");
        toggleBox.type = "checkbox";
        toggleBox.id = optionsArray[i][0];
        toggleBox.checked = defaultChecked;

        let toggleLabel = document.createElement("label");
        toggleLabel.for=toggleBox.id;
        toggleLabel.innerHTML=toggleBox.id;

        toggleOption.append(toggleLabel);
        toggleOption.append(toggleBox);
        baseContainer.append(toggleOption);
    }
}


// Load the option to display fenris spoilers
function loadFenrisSpoilerContainer(){
    let fenrisSpoilerArea = fenrisOptionsButton;
    let toggleContainer = document.getElementById("toggle-options-container");

    toggleContainer.append(fenrisSpoilerArea);
}

//Load fenris Factions
function loadFenrisFactions(){

    let fenrisSpoilerArea = document.getElementById("fenris-options-button");
    fenrisSpoilerArea.parentNode.removeChild(fenrisSpoilerArea);
    
    loadToggleFactionOptions(fenrisFactions, false, true);
}

//#endregion

function loadToggleOptions(optionsArray, clearOthers, defaultChecked, toggleSpecificClass){
    // Find the proper containers
    // Save any eventual pre-made fenris area
    // Cleanse them
    let baseContainer = document.getElementById("toggle-options-container");
    
    if(clearOthers == true){
        baseContainer.innerHTML = "";
    }

    // Add an element for each toggle option
    for(let i = 0; i < optionsArray.length; i++){

        let toggleOption = document.createElement("div");
        toggleOption.classList.add(toggleSpecificClass);
        toggleOption.classList.add("toggle-option");

        let toggleBox = document.createElement("input");
        toggleBox.type = "checkbox";
        toggleBox.id = optionsArray[i];
        toggleBox.checked = defaultChecked;

        let toggleLabel = document.createElement("label");
        toggleLabel.for=toggleBox.id;
        toggleLabel.innerHTML=toggleBox.id;

        toggleOption.append(toggleLabel);
        toggleOption.append(toggleBox);
        baseContainer.append(toggleOption);
    }
}
