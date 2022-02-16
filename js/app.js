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

        // Assegno a ogni cella il numero contenuto nel random array con
        // l'indice corrispondente
        cellElement.dataset.number = randArray[i];
    }
    // Animazione di entrata
    gridElement.classList.add('FadeInScale');
    // Aggiungo listener alla grid
    gridElement.addEventListener('click', playGame);
}


// Funzione per iniziare la partita
function startGame() {
    // Prendo la difficoltà con uno switch
    const gameDifficultyIndex = document.getElementById('difficulty').selectedIndex;
    console.log(gameDifficultyIndex);
    // Creo variabile per la dimensione della grid
    let dimension;

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
    // I numeri dell'Array vengono distribuiti ogni volta in modo
    // casuale. I numeri da 1 a 16 costituiscono le bombe. A ogni
    // cella ho assegnato il valore (come dataset) contenuto nel 
    // randArray con lo stesso indice della cella
    if (event.target.dataset.number <= 16) {
        event.target.classList.add('bomb');
        endGame();
    } else {
        event.target.classList.add('safe');
    }

}

function endGame() {
    // Tolgo il listener
    document.getElementById('grid').removeEventListener('click',playGame);
}

document.getElementById('play-btn').addEventListener('click', startGame);