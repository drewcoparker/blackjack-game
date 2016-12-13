$(document).ready(function() {
    // Get deal working
    // Need a way to make the deck
    // Shuffle the new deck
    // Update the DOM with the player cards
    // Get hit working
    // Put the card in the right place
    // Update the total
    // Check if the player busted
    // Get stand working
    // Run the dealer “hit” until it has more than 16
    // Once dealer has more than 16, checkwin
    // Post a message after checkwin

    //**Globals**
    var theDeck = [];
    var playersHand = [];
    var dealersHand = [];
    createDeck();

    $('.deal-button').click(function() {
        console.log(this);
        // When deal is pushed, we call the shuffleDeck function.
        shuffleDeck();

        // Now update the DOM:
        // Deal the first card to the player, face up
        playersHand.push(theDeck[0]);
        // Deal the second card to the dealer, face up
        dealersHand.push(theDeck[1]);
        // Deal the third card to the player, face up
        playersHand.push(theDeck[2]);
        // Deal the forth card to the dealer, face down
        dealersHand.push(theDeck[3]);

        // Put the first card in the players hand
        placeCard(playersHand[0], 'player', 'one');
        placeCard(playersHand[1], 'player', 'two');

        placeCard(dealersHand[0], 'dealer', 'one');
        placeCard(dealersHand[1], 'dealer', 'two');

        calculateTotal('player', playersHand);
        calculateTotal('dealer', dealersHand);

    });

    $('.hit-button').click(function() {
        // console.log(this);
        playersHand.push(theDeck[4]);
        placeCard(playersHand[2], 'player', 'three');
        calculateTotal('player', playersHand);
    });

    $('.stand-button').click(function() {
        console.log(this);
    });


    function createDeck() {
        var suits = ['h', 's', 'd', 'c'];
        // Loop thru all 4 suits
        for (let s = 0; s < suits.length; s++) {
            for (let c = 1; c <= 13; c++) {
                theDeck.push(c + suits[s]);

            }
        }
    }


    function shuffleDeck() {
        // Pick 2 random cards and switch them. This mutates theDeck. Do this
        // one thousand times.
        for (let i = 0; i < 1000; i++) {
            var rando1 = Math.floor(Math.random() * theDeck.length);
            var rando2 = Math.floor(Math.random() * theDeck.length);
            var temp = theDeck[rando1];
            theDeck[rando1] = theDeck[rando2];
            theDeck[rando2] = temp;
        }
    }


    function placeCard(whatCard, who, whichSlot) {
        var classToTarget = '.' + who + '-cards .card-' + whichSlot;
        $(classToTarget).html('<img src="images/' + whatCard + '.png">');
    }



    function calculateTotal(who, hand) {
        var cardValue = 0;
        var total = 0;
        for (let i = 0; i < hand.length; i++) {
            cardValue = Number(hand[i].slice(0, -1));
            // Any card numbered higher than 10 is a Queen, Jack, or King.
            // Set these to 10 and add to total.
            if (cardValue > 10) {
                total += 10;
            // Check if card is Ace. It can be 1 or 11 depending on the total.
            } else if (cardValue === 1) {
                if (total < 11) {
                    total += 11;
                } else {
                    total += 1;
                }
            } else {
                total += cardValue;
            }
        }
        var classToTarget = '.' + who + '-total-number';
        $(classToTarget).text(total);
    }

});
