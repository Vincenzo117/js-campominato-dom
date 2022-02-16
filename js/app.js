function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Funzione per generare un array con una lunghezza scelta che abbia all'interno i numeri da 1 a lenght 
// disposti in modo casuale e ripetuti 1 sola volta
function getRandomArray(length) {
    const randArray = [];
    do {
        const randNumber = getRandomIntInclusive(1, length);
        if (!randArray.includes(randNumber)) {
            randArray.push(randNumber);
        }
    } while (randArray.length < length)
    return randArray;
}

// Funzione per generare la grid dopo aver scelto la difficoltà
function buildGrid(length, randArray) {
    // Prendo la grid dalla DOM
    const gridElement = document.getElementById('grid');
    // Svuoto la grid prima di iniziare
    gridElement.innerHTML = '';
    // Creo le celle con un loop
    for (let i = 0; i < length ** 2; i++) {
        // Creo elemnto html
        const cellElement = document.createElement('div');
        cellElement.classList.add('grid__cell');
        cellElement.style.width = `calc(100% / ${length})`
        document.getElementById('grid').append(cellElement);

        // Assegno a ogni cella il numero dell'indice con un dataset
        cellElement.dataset.index = i;

        // Per generare le bombe utilizzo i numeri da 1 a 16
        // contenuti nell'array e distribuiti casualmente ogni volta.
        // Quindi alle celle che hanno lo stesso indice dei numeri 
        // da uno a 16 dell'array assegno il dataset.bomb = 'true'
        if (randArray[i] <= 16){
            cellElement.dataset.bomb = 'true';
            // cellElement.innerHTML = '.';
        }
    }
    // Animazione di entrata
    gridElement.classList.add('FadeInScale');
    // Aggiungo listener alla grid
    gridElement.addEventListener('click', playGame);
}

let dimension;

// Funzione per iniziare la partita
function startGame() {
    // Prendo la difficoltà con uno switch
    const gameDifficultyIndex = document.getElementById('difficulty').selectedIndex;
    console.log(gameDifficultyIndex);
    // Creo variabile per la dimensione della grid

    switch (gameDifficultyIndex) {
        // easy
        case 0:
            dimension = 10;
            break;
        // hard
        case 1:
            dimension = 9;
            break;
        // crazy
        case 2:
            dimension = 7;
            break;
        default:
            dimension = 10;
    }
    // Creo array della giusta lunghezza
    const randArray = getRandomArray(dimension ** 2);
    console.log(randArray);
    // Costruisco la gird
    buildGrid(dimension, randArray);
}

function playGame(event) {
    // Se la cella contiene una bomba allora avrà il dataset.bomb = 'true'
    if (event.target.dataset.bomb === 'true') {
        event.target.classList.add('bomb');
        endGame();
    } else {
        event.target.classList.add('safe');
        const gridElementsArray = document.getElementsByClassName('grid__cell');

        //Controllo quante bombe ci sono nelle 8 celle che circondano quella selezionata
        let currentIndex = parseInt(event.target.dataset.index);
        let j = 0;
        let bombCounter = 0;
        let index = 0;

        for (let i = 0; i < (dimension + 1); i++ ){
            if ( j < 3 && currentIndex > 6){
                index = currentIndex + j - (dimension + 1);
                console.log(gridElementsArray[index]);
                if (gridElementsArray[index] !== undefined && gridElementsArray[index].dataset.bomb === 'true'){
                    bombCounter++;
                }
                j++;
            } else if (j < 4){
                index = currentIndex - 1;
                console.log(gridElementsArray[index]);
                if (gridElementsArray[index] !== undefined && gridElementsArray[index].dataset.bomb === 'true'){
                    bombCounter++;
                }
                j ++;
            } else if (j < 5){
                index = currentIndex + 1;
                console.log(gridElementsArray[index]);
                if (gridElementsArray[index] !== undefined && gridElementsArray[index].dataset.bomb === 'true'){
                    bombCounter++;
                }
                j ++; 
            } else if ( j < 8) {
                index = currentIndex + j + (dimension - 6);
                console.log(gridElementsArray[index]);
                if (gridElementsArray[index] !== undefined && gridElementsArray[index].dataset.bomb === 'true'){
                    bombCounter++;
                }
                j ++;
            }
        }
        event.target.innerHTML = bombCounter;

        // Controllo se sono stati scoperte tutte le safe cell
        if (document.getElementsByClassName('safe').length === (gridElementsArray.length - 16)) {
            endGame('true');
        }
    }

}

function endGame(win) {
    // Tolgo il listener
    document.getElementById('grid').removeEventListener('click',playGame);
    // Tolgo classe animazione
    document.getElementById('grid').classList.remove('FadeInScale');
    // Prendo array celle
    const gridElementsArray = document.getElementsByClassName('grid__cell');
    console.log(gridElementsArray);
    // Scopro le altre bombe
    for (let i = 0; i < gridElementsArray.length; i++){
        if (gridElementsArray[i].dataset.bomb === 'true'){
            gridElementsArray[i].classList.add('bomb');
        }
    }
    if (win){
        alert('Hai vinto!!!');
    }
}

document.getElementById('play-btn').addEventListener('click', startGame);