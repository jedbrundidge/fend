/**
 * Created by JedBr on 1/22/2018.
 */
var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

angular.module('myApp').controller('DatepickerCtrl', function ($scope) {
    $scope.minDate = new Date();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    $scope.open2 = function() {
        $scope.minDate = $scope.dt;
        $scope.popup2.opened = true;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.format = 'dd-MMMM-yyyy';
    $scope.popup1 = {
        opened: false
    };
    $scope.popup2 = {
        opened: false
    };
});


app.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            'templateUrl' : 'views/home.html'
        })

        .when('/cabin1', {
            'templateUrl' : 'views/cabin1.html'
        })

        .otherwise({
            'templateUrl' : 'views/home.html'
        });
});