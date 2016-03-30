var app = angular.module('gameMaster', []);

app.controller('MainCtrl', ['$scope', '$interval', function($scope, $interval) {
    $scope.year = 0;
    $scope.health = 100;
    $scope.hunger = 0;
    $scope.stress = 100;
    $scope.thirst = 0;

    $scope.numWater = 3;
    $scope.numHealthyFood = 2;
    $scope.numJunkFood = 0;
    $scope.numCondoms = 1;
    $scope.numWine = 0;
    $scope.dice = 5;

    $scope.condomSwitch = true;


    //--------------------Functions to perform actions--------------------------
    $scope.drinkWater = function() {
        $scope.thirst = 0;
    }
    $scope.eatHealthyFood = function() {
        $scope.hunger = 0;
        checkHealth(10, '+');
    }

    $scope.party = function() {
        checkStress(50)
        checkHealth(20, '-')
    }
    $scope.rollDice = function() {
        $scope.message = Math.floor((Math.random() * 6) + 1);
    }
    $scope.useCondom = function() {
        $scope.message = "Du tok på deg kondom"
        if ($scope.condomSwitch == true) {
            $scope.condomSwitch = false;
        }
        else if ($scope.condomSwitch == false) {
            $scope.condomSwitch = true;
        }
    }
    $scope.useSmoke = function() {
        checkHealth(10, '-');
        checkStress(5)
    }
    $scope.dropContamination = function() {
        checkHealth(30, '-');
    }
    $scope.getStd= function() {
        checkHealth(40, '-');
    }

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
    }, 900)

    $interval(function() {
        $scope.thirst++;
        if ($scope.thirst >= 100) {
            $scope.thirst = 100;
        }
    }, 500)

    $interval(function() {
        if (($scope.hunger >= 90) || ($scope.thirst >= 90) || ($scope.stress <= 20)) {
            $scope.health -= 1;
        }
        if ($scope.health <= 0) {
            $scope.health = 0;
        }
    }, 1000)
}]);
