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

        cellElement.addEventListener('click',

            function () {
                // I numeri da 1 a 16 dell'Array in cui sono distribuiti
                // ogni volta in modo casuale saranno le bombe
                if (randArray[i] <= 16) {
                    this.classList.add('bomb');
                    endGame();
                } else {
                    this.classList.add('safe');
                }
            }

        )
    }
    // Animazione di entrata
    gridElement.classList.add('FadeInScale');
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

document.getElementById('play-btn').addEventListener('click', startGame);