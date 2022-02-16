function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

function getRandomArray (length) {
    const randArray = [];
    do {
        const randNumber = getRandomIntInclusive (1 , length);
        if ( !randArray.includes(randNumber) ){
            randArray.push(randNumber);
        }
    } while (randArray.length < length)
    return randArray;
}

function buildGrid (length , randArray) {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    for (let i = 0; i < length**2; i++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('grid__cell');
        cellElement.style.width = `calc(100% / ${length})`
        document.getElementById('grid').append(cellElement);

        cellElement.addEventListener('click',
        
            function () {
                this.classList.add('safe');
            }

        )
    }
    gridElement.classList.add('FadeInScale');
}


document.getElementById('play-btn').addEventListener('click',

    function () {

        const gameDifficultyIndex = document.getElementById('difficulty').selectedIndex;

        console.log (gameDifficultyIndex);

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
                break;
        }

        const randArray = getRandomArray(dimension ** 2);
        console.log (randArray);

        buildGrid(dimension,randArray);
        
    }
    
)