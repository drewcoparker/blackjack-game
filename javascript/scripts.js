
$(document).ready(function() {

    // Globals
    var theDeck = createDeck();
    var playersHand = [];
    var dealersHand = [];
    var firstDeal = 0;

    // Place card images on board
    placeCard('player', 1, 'deck');
    placeCard('player', 2, 'deck');
    placeCard('player', 3, 'deck');
    placeCard('player', 4, 'deck');
    placeCard('player', 5, 'deck');
    placeCard('player', 6, 'deck');

    placeCard('dealer', 1, 'deck');
    placeCard('dealer', 2, 'deck');
    placeCard('dealer', 3, 'deck');
    placeCard('dealer', 4, 'deck');
    placeCard('dealer', 5, 'deck');
    placeCard('dealer', 6, 'deck');


    // Click events
    $('.deal-button').click(function() {
        $('.deal-button').attr('disabled', true);
        // Deal events goes in here
        // First shuffle the deck
        shuffleDeck();

        // The player gets the first card
        playersHand.push(theDeck.shift());
        // The dealer gets the second card
        dealersHand.push(theDeck.shift());
        // The player gets the third card
        playersHand.push(theDeck.shift());
        // The dealer gets the forth card
        dealersHand.push(theDeck.shift());

        // Place the player's cards onto their divs
        placeCard('player', 1, playersHand[0]);
        placeCard('player', 2, playersHand[1]);


        // Place the dealer's cards onto their divs
        placeCard('dealer', 1, dealersHand[0]);
        placeCard('dealer', 2, 'deck');

        calculateTotal('player', playersHand);
        calculateTotal('dealer', dealersHand);

        firstDeal++;
    });


    $('.hit-button').click(function() {
        // Hit events go here
        // Add a card and update the total
        if (calculateTotal('player', playersHand) <= 21) {
            playersHand.push(theDeck.shift());
            var slotForNewCard = playersHand.length;
            var lastCardIndex = playersHand.length - 1;
            placeCard('player', slotForNewCard, playersHand[lastCardIndex]);
            calculateTotal('player', playersHand);
        }

    });


    $('.stand-button').click(function() {
        // Stand button events go in here
        // You don't want anymore cards so the delaer has to go now
        // If the dealer has less than or equal to 16 he has to hit.
        // If more, he has to stand
        placeCard('dealer', 2, dealersHand[1]);
        var dealerTotal = calculateTotal('dealer', dealersHand);
        while (dealerTotal < 17) {
            dealersHand.push(theDeck.shift());
            var slotForNewCard = dealersHand.length;
            var lastCardIndex = dealersHand.length - 1;
            placeCard('dealer', slotForNewCard, dealersHand[lastCardIndex]);
            var dealerTotal = calculateTotal('dealer', dealersHand);
        }
        // The dealer has 17 or more. Player hit stand. Check who won
        checkWin();
    });


    $('.reset-button').click(function() {
        reset();
    });


    // Simulates a new deck of 52 cards in this example format: 3h = 3 of hearts.
    function createDeck() {
        var newDeck = [];
        var suits = ['h', 's', 'd', 'c'];
        for (let s = 0; s < suits.length; s++) {
            for (c = 1; c <= 13; c++) {
                newDeck.push(c + suits[s]);
            }
        }
        return newDeck;
    }

    // Simulates a shuffle by swapping 2 random cards in the deck, 1000
    // different times.
    function shuffleDeck() {
        for (let i = 0; i < 1000; i++) {
            var rando1 = Math.floor(Math.random() * theDeck.length);
            var rando2 = Math.floor(Math.random() * theDeck.length);
            var temp = theDeck[rando1];
            theDeck[rando1] = theDeck[rando2];
            theDeck[rando2] = temp;
        }
    }

    // Updates the DOM with the card images drawn.
    function placeCard(who, where, whatCard) {
        var classSelector = '.' + who + '-cards .card-' + where;
        $(classSelector).html('<img src="images/' + whatCard + '.png">');
    }

    // Keeps track of the player's and dealer's totals based on what hands were
    // dealt.
    function calculateTotal(who, hand) {
        var classToTarget = '.' + who + '-total-number';
        var total = 0;
        var cardValue = 0;
        var hasAce = 0;

        for (let i = 0; i < hand.length; i++) {
            if ((firstDeal === 0) && (who === 'dealer') && (i === 1)) {
                // Skip DOM totaling the dealers face down card
            } else {
                cardValue = Number(hand[i].slice(0, -1));
                // If it's a face card, make it worth 10.
                if (cardValue > 10) {
                    cardValue = 10;
                }
                // If it's an Ace make it worth 11. Value can change to 1 later.
                if (cardValue === 1) {
                    hasAce++;
                    cardValue = 11;
                }
                total += cardValue;
            }
        }

        // Make the Ace's value daynamic based on the total
        if ((total > 21) && (hasAce === 1)) {
            total -= 10;
        } else if ((total > 21) && (hasAce === 2)) {
            total -= 20;
        } else if ((total > 21) && (hasAce === 3)) {
            total -= 30;
        }

        // Update the DOM element that displays the totals. This should be
        // in a unique function.
        if (total > 21) {
            $(classToTarget).text("BUST!");
        } else {
            $(classToTarget).text(total);
        }
        return total;
    }

    // Checks to see if dealer or player has busted won or tied. Called after
    // the stand button has been pressed.
    function checkWin() {
        playerTotal = calculateTotal('player', playersHand);
        dealerTotal = calculateTotal('dealer', dealersHand);

        // If player has more than 21 , player loses
        if (playerTotal > 21) {
            $('.dealer-wins').text("Dealer wins with: ");
            $('.player-wins').text("You lose with: ")
        } else if (dealerTotal > 21) {
            $('.player-wins').text("You win with: ");
            $('.dealer-wins').text("Dealer loses with: ");
        } else {
            // No one busted, see who is higher
            if (playerTotal > dealerTotal) {
                $('.player-wins').text("You win with: ");
                $('.dealer-wins').text("Dealer loses with: ");
            } else if (dealerTotal > playerTotal) {
                $('.dealer-wins').text("Dealer wins with: ");
                $('.player-wins').text("You lose with: ")
            } else {
                // Tie
                $('.player-wins').text("Push: ");
                $('.dealer-wins').text("Push: ");
            }
        }
    }


    // Resets the bord (DOM), emptys the hands, and creates a new deck.
    function reset() {
        theDeck = createDeck();
        playersHand = [];
        dealersHand = [];
        $('.card').html('');
        var playerTotal = calculateTotal('player', playersHand);
        var dealerTotal = calculateTotal('dealer', dealersHand);
        $('.deal-button').attr('disabled', false);
        firstDeal = 0;

        // Place card images on board
        placeCard('player', 1, 'deck');
        placeCard('player', 2, 'deck');
        placeCard('player', 3, 'deck');
        placeCard('player', 4, 'deck');
        placeCard('player', 5, 'deck');
        placeCard('player', 6, 'deck');

        placeCard('dealer', 1, 'deck');
        placeCard('dealer', 2, 'deck');
        placeCard('dealer', 3, 'deck');
        placeCard('dealer', 4, 'deck');
        placeCard('dealer', 5, 'deck');
        placeCard('dealer', 6, 'deck');
    }

// Closes the doc ready function
});
