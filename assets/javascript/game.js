
$(document).ready(function () {
    //global vars
    var fighterPicked = false;
    var challengersAvailable = false;
    var challengerPicked = false;
    var Win = false;
    var Lost = false;
    var challengersLeft = 3;
    var multiplier = 1;

    var characterName;
    var characterHP;
    var characterAttack;
    var opponent;
    var opponentName;
    var opponentHP;
    var opponentCounter;


    var availableFighters = $(".fighter")
    var playerFighter = $("#fighterPicked")
    var challengers = $("#challengerstoFight")
    var theChallenger = $("#challenger")
    //objects (characters)
    var fighters = {
        "ryu": {
            name: "Ryu",
            ID: "ryu-card",
            health: 500,
            attack: 25,
            counterAttack: 74,

        },
        "ken": {
            name: "Ken",
            ID: "ken-card",
            health: 450,
            attack: 25,
            counterAttack: 54,

        },
        "chun": {
            name: "Chun Li",
            ID: "chun-card",
            health: 400,
            attack: 28,
            counterAttack: 64,

        },
        "vega": {
            name: "Vega",
            ID: "vega-card",
            health: 350,
            attack: 35,
            counterAttack: 45,

        }
    };


    //create on click fucntion for the cards
    availableFighters.on("click", function () {
        var picked = $(this);
        var pickedID = picked.attr("id");
        console.log(pickedID);

        if (fighterPicked === false) {
            picked.addClass('player');
            picked.insertAfter(playerFighter);
            fighterPicked = true;


            if (challengersAvailable === false) {
                availableFighters.each(function () {
                    if ($(this).attr("id") !== pickedID) {
                        challengers.append(this);
                        $(this).addClass("challengers");

                    };
                });
                challengersAvailable = true;
            }
        } else {
            if (challengerPicked === false) {
                $(".challengers").each(function () {
                    if ($(this).attr("id") === pickedID) {
                        theChallenger.append(this);
                        $(this).removeClass("challengers").addClass("theChallenger");
                    }
                })

                character = $(".player");
                opponent = $(".theChallenger");

                for (var prop in fighters) {
                    if (fighters[prop].ID === $(".player").attr("id")) {
                        characterName = fighters[prop].name;
                        characterHP = fighters[prop].health;
                        characterAttack = fighters[prop].attack;
                    }
                    else if (fighters[prop].ID === $(".theChallenger").attr("id")) {
                        opponentName = fighters[prop].name;
                        opponentHP = fighters[prop].health;
                        opponentCounter = fighters[prop].counterAttack;
                    }

                }
                console.log("Fight's Name: " + characterName);
                console.log("Fighter's Health: " + characterHP);
                console.log(characterAttack);
                console.log("Challenger's Name: " + opponentName);
                console.log("Challenger's Health: " + opponentHP);
                console.log(opponentCounter);
                challengerPicked = true;
            }

        }

    });

    //create a onclick for the fight button and be able to attack
    //and lose health points.
    $("#fightBtn").on("click", function () {
        if (Win || Lost) {
            refreshPage();
        }
        else if (challengerPicked) {
            var totalAttack = characterAttack * multiplier;
            characterHP = characterHP - opponentCounter;
            opponentHP = opponentHP - totalAttack;
            multiplier++;
            for (prop in fighters) {
                if (fighters[prop].ID === $(".player").attr("id")) {
                    fighters[prop].health = characterHP;
                }
                else if (fighters[prop].ID === $(".challengers").attr("id")) {
                    fighters[prop].health = opponentHP;
                }
            }
        }
        $("[class*='theChallenger'] [id*='health']").text(opponentHP);
        $("[class*='player'] [class*='health").text(characterHP);

        if (opponentHP <= 0) {
            opponent.detach();
            challengersLeft--;
            challengerPicked = false;
            
            if(challengersLeft === 0){
                alert("Winner " + characterName + "!");
                Won = true;
            }
        }
        if (characterHP <= 0){
            characterHP = 0;
            alert("You Lose!");
        }
        


    });









});

