/**
 * Created by JedBr on 1/22/2018.
 */
var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'ngResource']);

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

    $scope.format = 'MMMM-dd-yyyy';
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
            'templateUrl' : './views/home.html'
        })

        .when('/cabin1', {
            'templateUrl' : './views/cabin1.html'
        })

        .when('/cabin2', {
            'templateUrl' : './views/cabin2.html'
        })

        .when('/cabin3', {
            'templateUrl' : './views/cabin3.html'
        })

        .otherwise({
            'templateUrl' : './views/home.html'
        });
});

app.factory('getReservationsOne', function ($resource) {
    return $resource("http://localhost:5016/api/booking/cabinOne")
});

app.factory('getReservationsTwo', function ($resource) {
    return $resource("http://localhost:5016/api/booking/cabinTwo")
});

app.factory('getReservationsThree', function ($resource) {
    return $resource("http://localhost:5016/api/booking/cabinThree")
});

app.factory('postReservationOne', function ($resource) {
    return $resource('http://localhost:5016/api/booking/addReservation')
});


//Controllers
app.controller('cabinOneResCtrl', function ($scope, getReservationsOne) {
    $scope.res = getReservationsOne.query();
});

app.controller('cabinTwoResCtrl', function ($scope, getReservationsTwo) {
    $scope.res = getReservationsTwo.query();
});


app.controller('cabinThreeResCtrl', function ($scope, getReservationsThree) {
    $scope.res = getReservationsThree.query();
});

app.controller('addReservationOne', function ($scope, postReservationOne) {

    $scope.reservation = {};
    $scope.newReservation = function () {
        var reservationOne = new postReservationOne($scope.reservation);
        reservationOne.$save();
    }
});