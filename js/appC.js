(function () {

    var cards = document.querySelectorAll('.card');

    var cardHand = [];

    var matchedCards = [];
    var vowelLoc = "./sounds/consonants/"
    var board = document.getElementById("card-game");
  	
  	var restartButton;  

    var audios = [];
    var map = {};


    //Shuffle function-------------------------------------

    function shuffleAndAddSoud() {
        cards.forEach(card => {
            let randomNum = Math.floor(Math.random() * 30);
            card.style.order = randomNum;
        });
    }

    //Restart function-------------------------------------

    restartButton = document.querySelector('.fa').addEventListener('click', restart);

    function restart() {
        for (var i in matchedCards) {
            matchedCards[i].classList.remove("matched", "flip");
        }
        for (var i in cardHand) {
            cardHand[i].classList.remove("matched", "flip");
        }
        moves = 0;
        movesCounter.innerHTML = `0 Moves`;
        cardHand = [];
        matchedCards = [];
        setTimeout(shuffleAndAddSoud, 700);

    }

    //Sound variables & functionality-------------------------------------

    var correctSound = new Audio;
    correctSound.src = "sounds/correct.mp3";

    var wrongSound = new Audio;
    wrongSound.src = "sounds/wrong.mp3";

    var winSound = new Audio;
    winSound.src = "sounds/win.mp3";

    var i = 0;
    cards.forEach(card => {
        map[card.dataset.framework] = i;

        audios[i] = new Audio();
        var locc = vowelLoc + card.dataset.framework + ".mp3";
        audios[i++].src = locc;
    });


    function playWrong() {
        wrongSound.play();
    }

    function playCorrect() {
        correctSound.play();
    }

    function playWin() {
        winSound.play();
    }

// move counter function

let moves = 0;
    var movesCounter = document.querySelector(".moves");

    function movesNum() {
        moves++;
        if (moves === 1) {
            movesCounter.innerHTML = `1  Move`;
        } else {
            movesCounter.innerHTML = `${moves}  Moves`;
        }
    }

    
// Initiate the game by making the cards available to click
    function startGame() {
        cards.forEach(card => card.addEventListener('click', flipCard));
        shuffleAndAddSoud();
    }

    //On click add flip class to flip card and add to cardHand array
    function flipCard() {
        let clickedCard = this;
        audios[map[clickedCard.dataset.framework]].play();
        if (clickedCard.classList.contains("card")) {
            clickedCard.classList.add("flip");
            cardHand.push(clickedCard);
        }
        //Once a pair has been chosen, freeze board , increase move counter and run match logic
        if (cardHand.length === 2) {
            board.classList.add('pause');
            movesNum();
            // console.log(cardHand[0].dataset.framework);
            if (cardHand[0].dataset.framework === cardHand[1].dataset.framework) {
                setTimeout(playCorrect, 800);
                matched();
            } else {
                setTimeout(playWrong, 800);
                setTimeout(notMatched, 700);
            }
        }
    }
// if pair are a match add each to matchedCard array and remove freeze
    function matched() {
        cardHand[0].classList.add("matched");
        cardHand[1].classList.add("matched");
        matchedCards.push(cardHand[0]);
        matchedCards.push(cardHand[1]);
        cardHand = [];
        board.classList.remove('pause');
        if (matchedCards.length === 30) {
            setTimeout(playWin, 1000);
        }
    }

//if pair do not match, remove flip class and empty cardHand
    function notMatched() {
        cardHand[0].classList.remove("flip");
        cardHand[1].classList.remove("flip");
        cardHand = [];
        board.classList.remove('pause');

    }

    startGame();
}());