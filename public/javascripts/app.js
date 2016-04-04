var app = angular.module('gameMaster', []);

app.controller('MainCtrl', ['$scope', '$interval', function($scope, $interval) {
    $scope.year = 0;
    $scope.health = 100;
    $scope.hunger = 0;
    $scope.stress = 100;
    $scope.thirst = 0;
    $scope.dice = 5;
    $scope.condomSwitch = true;
    $scope.message = "Spillet starter, lykke til!";

    var waterSound = new Audio("../sound/water.mp3");
    var condomSound = new Audio("../sound/condom.mp3");
    var diceSound = new Audio("../sound/dice.mp3");
    var foodSound = new Audio("../sound/food.mp3");
    var sexSound = new Audio("../sound/sex.mp3");
    var smokeSound = new Audio("../sound/smoke.mp3");
    var sneezeSound = new Audio("../sound/sneeze.mp3");
    var deadSound = new Audio("../sound/dead.mp3");
    var lowHealthSound = new Audio("../sound/lowHealth.mp3");
    var idleSound = new Audio("../sound/idle.mp3");


    //--------------------Functions to perform actions--------------------------
    $scope.drinkWater = function() {
        $scope.thirst = 0;
        $scope.message = "Du drakk vann"
        waterSound.play();
    }
    $scope.eatHealthyFood = function() {
        $scope.hunger = 0;
        checkHealth(10, '+');
        $scope.message = "Du spiste mat"
        foodSound.play();
    }

    $scope.party = function() {
        checkStress(50)
        checkHealth(20, '-')
        $scope.message = "Du hadde en fest. Du ble gladere, men mistet helse."
    }
    $scope.rollDice = function() {
        diceSound.play();
        return(Math.floor((Math.random() * 6) + 1));
    }
    $scope.useCondom = function() {
        if ($scope.condomSwitch == true) {
            $scope.message = "Du tok på deg kondom"
            $scope.condomSwitch = false;
            condomSound.play();
        }
        else if ($scope.condomSwitch == false) {
            $scope.message = "Kondomen er brukt"
            $scope.condomSwitch = true;
        }
    }
    $scope.useSmoke = function() {
        checkHealth(10, '-');
        checkStress(5)
        $scope.message = "Du røykte. Du ble litt mindre stresset, men mistet litt helse"
        smokeSound.play();
    }
    $scope.dropContamination = function() {
        checkHealth(30, '-');
        $scope.message = "Du har blitt smittet av tuberkolose!"
        sneezeSound.play();
    }
    $scope.haveSex = function() {
        if (!$scope.condomSwitch) {
            $scope.message = "Du hadde trygg sex med kondom, bra!"
            $scope.condomSwitch = true;
            checkStress(30)
            sexSound.play();
        }
        else if ($scope.condomSwitch) {
            var n = $scope.rollDice()
            if ((n === 5) || (n === 6)) {
                $scope.message = "Du hadde utrygg sex, men hadde flaks."
                checkStress(30);
                sexSound.play();
            }
            else {
                $scope.getStd()
                checkStress(30);
                sexSound.play();
            }
        }
    }
    $scope.getStd= function() {
        checkHealth(40, '-');
        $scope.message = "Du hadde utrygg sex og ble smittet av en kjønnssykdom."
    }

    //-------------------Functions to sanitize incrementing or decrementing bars

    checkStress = function(n) {
        if (($scope.stress + n) >= 100) {
            $scope.stress = 100;
        }
        else {
            $scope.stress += n;
        }
    }
    checkHealth = function(n, v) {
        if (v === '+') {
            if (($scope.health + n) >= 100) {
                $scope.health = 100;
            }
            else {
                $scope.health += n;
            }
        }
        else if (v === '-') {
            if (($scope.health - n) <= 0) {
                $scope.health = 0;
            }
            else {
                $scope.health -= n;
            }
        }

    }

//--------------------Starting all timers--------------------------
    $interval(function(){
        $scope.year++;
        if ($scope.year >= 100) {
            $scope.year = 100;
        }
    }, 3000)

    $interval(function() {
        $scope.stress -= 1;
        if ($scope.stress <= 0) {
            $scope.stress = 0;
        }
    }, 1000)

    $interval(function() {
        $scope.hunger++;
        if ($scope.hunger >= 100) {
            $scope.hunger = 100;
        }
    }, 900)  /*900*/

    $interval(function() {
        $scope.thirst++;
        if ($scope.thirst >= 100) {
            $scope.thirst = 100;
        }
    }, 500)

    $interval(function() {
        var tempYear = $scope.year;
        if ($scope.hunger >= 90) {
            $scope.health -= 1;
            $scope.message = "Du sulter og mister helse!"
         }
        if ($scope.thirst >= 90) {
            $scope.health -= 1;
            $scope.message = "Du tørster og mister helse!"
         }
        if ($scope.stress <= 30) {
            $scope.health -= 1;
            $scope.message = "Du er veldig ulykkelig og mister helse!"
         }
        if ($scope.health <= 30) {
            lowHealthSound.play();
            idleSound.pause();
        }
        if ($scope.health <= 0) {
            $scope.health = 0;
            idleSound.pause();
            lowHealthSound.pause();
            deadSound.play();
         }
        if ($scope.health >= 31) {
            idleSound.play();
            lowHealthSound.pause();
        }
    }, 1000)

}]);
