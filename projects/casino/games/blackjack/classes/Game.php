<?php

class Game {
    function __construct($username, $betAmount) {
        $this->deck = [];
        $this->playerScore = 0;
        $this->dealerScore = 0;
        $this->currentBet = $betAmount;
        $this->userName = $username;
        $this->gameState = "";
        $this->permittedActions = ["start"];
        $this->playerCards = [];
        $this->dealerCards = [];
        $this->cardHistory = [];
    }

    public array $deck;
    public int $playerScore;
    public int $dealerScore;
    public array $playerCards;
    public array $dealerCards;
    public int $currentBet;
    public array $permittedActions;
    public string $gameState;
    public string $userName;
    public array $cardHistory;

    function getNewDeck() {
        $symbols = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        $suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
        $deck = [];
    
        foreach ($suits as $suit) {
            foreach ($symbols as $symbol) {
                $card = new Card($suit, $symbol);
                array_push($deck, $card);
            }
        }
    
        return $deck;
    }

    function takeRandomCardFromDeck() {
        $deck = $this->deck;
        $deckSize = sizeof($deck);
        $randomIndex = random_int(0, $deckSize - 1);
        $card = $deck[$randomIndex];
        array_splice($deck, $randomIndex, 1);
        $this->deck = $deck;
    
        return $card;
    }

    function playerTakeCard() {
        $card = $this->takeRandomCardFromDeck();
        $this->playerScore += $card->points;
        array_push($this->playerCards, $card);
        array_push($this->cardHistory, $card);
    }

    function dealerTakeCard() {
        $card = $this->takeRandomCardFromDeck();
        $this->dealerScore += $card->points;
        array_push($this->dealerCards, $card);
        array_push($this->cardHistory, $card);
    }

    function main($action) {
        $this->cardHistory = [];

        if (!in_array($action, $this->permittedActions)) {
            return;
        }

        switch($action) {
            case "start":
                $this->start();
                break;
            case "hit":
                $this->hit();
                break;
            case "stand":
                $this->stand();
                break;
            case "double":
                $this->double();
                break;
            default:
                break;
        }
    }

    function start() {
        $this->deck = $this->getNewDeck();
        $this->gameState = "active";

        $this->playerTakeCard();
        $this->dealerTakeCard();
        $this->playerTakeCard();

        if ($this->playerScore == 21) {
            $this->currentBet *= 1.5;
            $this->win();
            return;
        }
        if ($this->playerScore == 22) {
            $this->lose();
            return;
        }
        
        $this->permittedActions = ["hit", "stand"];
        if ($this->playerScore >= 9 && $this->playerScore <= 11) {
            array_push($this->permittedActions, "double");
        }
    }

    function hit() {
        $this->playerTakeCard();

        if ($this->playerScore > 21) {
            $this->lose();
            return;
        }

        while ($this->dealerScore < 17) {
            $this->dealerTakeCard();
            if ($this->dealerScore > 21) {
                $this->win();
                return;
            }
        }

        if ($this->playerScore >= $this->dealerScore) {
            $this->win();
            return;
        }
        else {
            $this->lose();
            return;
        }
    }

    function stand() {
        while ($this->dealerScore < 17) {
            $this->dealerTakeCard();
            if ($this->dealerScore > 21) {
                $this->win();
                return;
            }
        }

        if ($this->playerScore >= $this->dealerScore) {
            $this->win();
            return;
        }
        else {
            $this->lose();
            return;
        }
    }

    function double() {
        $this-> currentBet *= 2;

        $this->playerTakeCard();

        if ($this->playerScore > 21) {
            $this->lose();
            return;
        }

        while ($this->dealerScore < 17) {
            $this->dealerTakeCard();
            if ($this->dealerScore > 21) {
                $this->win();
                return;
            }
        }

        if ($this->playerScore >= $this->dealerScore) {
            $this->win();
            return;
        }
        else {
            $this->lose();
            return;
        }
    }

    function win() {
        $this->gameState = "win";
        $this->permittedActions = [];
    }

    function lose() {
        $this->gameState = "lose";
        $this->permittedActions = [];
    }
} 