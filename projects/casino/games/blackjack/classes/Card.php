<?php

class Card {
    function __construct(string $suit, string $symbol)
    {
        $this->suit = $suit;
        $this->symbol = $symbol;
        $this->displayName = $this->generateDisplayName();
        $this->points = $this->calculatePoints();
    }

    public string $suit;
    public string $symbol;
    public string $displayName;
    public int $points;

    function generateDisplayName() {
        $symbol = $this->symbol;
        $suit = $this->suit;
        $displayName = "";
            
        switch($symbol) {
            case "A":
                $displayName .= "Ace ";
                break;
            case "J":
                $displayName .= "Jack ";
                break;
            case "Q":
                $displayName .= "Queen ";
                break;
            case "K":
                $displayName .= "King ";
                break;
            default:
                $displayName .= "$symbol ";
                break;
        }

        $displayName .= "of ";
        $displayName .= strtolower($suit);

        return $displayName;
    }

    function calculatePoints() {
        $points = 0;
        $symbol = $this->symbol;
    
        switch($symbol) {
            case "A":
                $points = 11;
                break;
            case "J":
                $points = 10;
                break;
            case "Q":
                $points = 10;
                break;
            case "K":
                $points = 10;
                break;
            default:
                $points = (int)$symbol;
                break;
        }
        
        return $points;
    }
}