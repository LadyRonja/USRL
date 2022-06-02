function randomizeFactionsAndMats(){
    
    //Get all factions and all mats toggled
    let factionOptions = getToggledOptions("faction-toggle-option");
    let matOptions = getToggledOptions("mat-toggle-option");

    // Check the count selector to see how many items to randomize
    // Interrupt if -1 is returned.
    let amountToRandomize = getAmountToRandomize(factionOptions.length, matOptions);
    if(amountToRandomize == -1) return;
    if(amountToRandomize > matOptions.length){
        // Also check if enough mats have been toggled as options
        alert("You don't have enough options selected to randomize this many results.");
        return;
    }

    // Detect if only banned combinations are possible
    if(matOptions.length == 1 && factionOptions.length == 1){

        if(matOptions[0].lastChild.id == "Industrial" && factionOptions[0].lastChild.id == "Rusviet"){
            alert("Only illegal combinations possible");
            return;
        }

        if(matOptions[0].lastChild.id == "Patriotic" && factionOptions[0].lastChild.id == "Crimea"){
            alert("Only illegal combinations possible");
            return;
        }
    }

    // Get a random elements from the toggled options
    let pickedFactions = getFactionRandomPicks(amountToRandomize, factionOptions);

    // Get legal mats paired with the selected factions
    let pickedMats = [];
    let combinationsValidated = false;

    while(combinationsValidated == false){
        combinationsValidated = true;
        pickedMats = getRandomPicks(pickedFactions.length, matOptions);

        for(let i = 0; i < pickedMats.length; i++){
            console.log("pickedMats: " + pickedMats[i] + " faction: " + pickedFactions[i]);
            if(pickedMats[i] == "Industrial" && pickedFactions[i] == "Rusviet"){
                combinationsValidated = false;
                matOptions = getToggledOptions("mat-toggle-option");
                break;
            }

            if(pickedMats[i] == "Patriotic" && pickedFactions[i] == "Crimea"){
                combinationsValidated = false;
                matOptions = getToggledOptions("mat-toggle-option");
                break;
            }
        }
    }

    // Check for if Vesna mods are needed
    let vMods = [];
    for(let i = 0; i < pickedFactions.length; i++){
        if(pickedFactions[i].includes("Vesna")){
            let modsNeeded = 6;
            let fromOptions = [...vesnaMods];

            let selectedOptions = [];

            for(let j = 0; j < modsNeeded; j++){
                let rand = getRandomInt(0, fromOptions.length);
                selectedOptions.push(fromOptions[rand]);
                fromOptions.splice(rand, 1);
            }

            vMods = [...selectedOptions];
            break;
        }
    }

    // Remove previous results
    let conatiner = document.getElementById("randomized-results-container");
    conatiner.innerHTML ="";

    // Add the selected factions and mat to the display container
    for(let i = 0; i < pickedFactions.length; i++){
        loadInformationCell(i+1, pickedFactions[i], pickedMats[i], vMods);
    }

}

function getToggledOptions(requiredClass){
        // Check the toggled options for what elements to have available
        let targetedOptions = "toggle-option";
        if(requiredClass != undefined) {
            targetedOptions = requiredClass;
        }

        let allOptions = document.getElementsByClassName(targetedOptions);

        let optionsToPickFrom = [];

        for(let i = 0; i < allOptions.length; i++){
    
            if(allOptions[i].lastChild.checked == true){
                optionsToPickFrom.push(allOptions[i]);
            }
        }

        return optionsToPickFrom;
}

function getAmountToRandomize(userLookingFor){
    // Check the count selector to see how many items to randomize
    // Alert the user if requesting more randomized elements than toggled and return in this case
    let amountToRandomize = document.getElementById("count-selector").value;
    if(amountToRandomize > userLookingFor){
        alert("You don't have enough options selected to randomize this many results.");
        return -1; // Returns -1 as a warning to calling function
    }

    return amountToRandomize;
}

function getRandomPicks(amount, fromOptions){
    // Get a random elements from the toggled options
    // Add them to the selected array
    // Remove the selected option from the available options

    let selectedOptions = [];


    for(let i = 0; i < amount; i++){
        let rand = getRandomInt(0, fromOptions.length);
        selectedOptions.push(fromOptions[rand].lastChild.id);
        fromOptions.splice(rand, 1);
    }

    return selectedOptions;
}

function getFactionRandomPicks(amount, fromOptions){
    let availableStartingPositions = Object.create(nonFenrisFactions);

    // Get a random elements from the toggled options
    // Add them to the selected array
    // Remove the selected option from the available options
    let selectedOptions = [];
    for(let i = 0; i < amount; i++){
        let rand = getRandomInt(0, fromOptions.length);
        selectedOptions.push(fromOptions[rand].lastChild.id);
        fromOptions.splice(rand, 1);

        // Remove selected faction's starting pos from the available list
        for(let j = 0; j < availableStartingPositions.length; j++){
            if(selectedOptions[selectedOptions.length - 1] == availableStartingPositions[j][0]){
                availableStartingPositions.splice(j, 1);
            }
        }
    }

    // Check if selected options contain factions with random starting pos
    // If so give them a starting postion not belonging to a current faction
    for(let i = 0; i < selectedOptions.length; i++){
        for(let j = 0; j < fenrisFactions.length; j ++){
            if(selectedOptions[i] == fenrisFactions[j][0]){
                let randPos = getRandomInt(0, availableStartingPositions.length);
                let startingPos = " (" + availableStartingPositions[randPos][0] + " home base) ";

                selectedOptions[i] += startingPos;

                availableStartingPositions.splice(randPos, 1);
            }
        }
    }

    return selectedOptions;
}