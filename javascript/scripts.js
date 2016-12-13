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
    createDeck();

    $('.deal-button').click(function() {
        console.log(this);
        // When deal is pushed, we call the shuffleDeck function.
        shuffleDeck();
    });

    $('.hit-button').click(function() {
        console.log(this);
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
        console.log(theDeck);
    }
});
