
$(document).ready(function() {

    // Globals
    const freshDeck = createDeck();
    var theDeck = freshDeck;
    var playersHand = [];
    var dealersHand = [];
    var firstDeal = 0;

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


    function reset() {
        // the deck needs to be reset, so we need to call create again
        theDeck = freshDeck;
        // empty the playersHand and dealersHand
        // reset the DOM which includes all the cards and the 2 totals
        playersHand = [];
        dealersHand = [];

        $('.card').html('');
        var playerTotal = calculateTotal('player', playersHand);
        var dealerTotal = calculateTotal('dealer', dealersHand);
        $('.deal-button').attr('disabled', false);
    }

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

    function placeCard(who, where, whatCard) {
        var classSelector = '.' + who + '-cards .card-' + where;
        $(classSelector).html('<img src="images/' + whatCard + '.png">');
    }


    function calculateTotal(who, hand) {
        var classToTarget = '.' + who + '-total-number';
        var total = 0;
        var cardValue = 0;
        var hasAce = false;

        for (let i = 0; i < hand.length; i++) {
            if ((firstDeal === 0) && (who === 'dealer') && (i === 1)) {
                // Skip DOM totaling the dealers face down card
            } else {
                cardValue = Number(hand[i].slice(0, -1));
                if (cardValue > 10) {
                    cardValue = 10;
                }
                if (cardValue === 1) {
                    hasAce = true;
                    cardValue = 11;
                }
                total += cardValue;
            }
        }
        //
        if ((total > 21) && (hasAce)) {
            total -= 10;
        }

        if (total > 21) {
            $(classToTarget).text("BUST!");
        } else {
            $(classToTarget).text(total);
        }
        return total;
    }

// Closes the doc ready function
});
