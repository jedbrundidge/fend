/**
 * Created by JedBr on 1/22/2018.
 */



var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'ngResource', 'angular-growl']);

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

//Route services

app.factory('getReservationsOne', function ($resource) {
    return $resource("http://localhost:5018/api/booking/cabinOne")
});

app.factory('getReservationsTwo', function ($resource) {
    return $resource("http://localhost:5018/api/booking/cabinTwo")
});

app.factory('getReservationsThree', function ($resource) {
    return $resource("http://localhost:5018/api/booking/cabinThree")
});

app.factory('postReservationOne', function ($resource) {
    return $resource('http://localhost:5018/api/booking/addReservation')
});

app.factory('getWeather',  function($resource){
    return $resource('http://localhost:5018/api/weather/averageTemps')
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

app.controller('weatherCtrl', function ($scope, getWeather) {

   $scope.weather = getWeather.query();



    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;

    //$scope.weather = weather;

    /*
    
    $scope.dateFilter = function (property, startDate, endDate) {




        return function (item) {

            if(item[property] === null) return false;

            var itemDate = moment(item[property]);
            var s = moment(document.getElementById("startDate").value, "MMMM-dd");
            var e = moment( document.getElementById("endDate").value, "MMMM-dd");

            if(itemDate >= s && itemDate <= e) return true;
            console.log(s);
            console.log(e);
            return false;

        };

    };
    */
   $scope.dateRange2 = function (item) {
        var date = new Date();

        var startParts = startDate.split('-');
        var endParts = endDate.split('-');
        var start = new Date(startParts[2], getMonth(startParts[0]), startParts[1]);
        var end = new Date(endParts[2], getMonth(endParts[0]), endParts[1]);


        var itemDate = date.setDate(date.getDate() + item.day);

        var meet = itemDate >= start.getTime() && itemDate <= end.getTime();

        return meet;
    };

    var getMonth = function (month) {
        var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        return months.indexOf(month.substring(0, 3).toLowerCase());
    };



});



app.controller('addReservationOne', function ($scope, postReservationOne, $uibModal, growl) {

    $scope.reservation = {};
    $scope.newReservation = function () {
        var reservationOne = new postReservationOne($scope.reservation);

        debugger;
       var request  =  reservationOne.$save();
        request.then(function (resp) {
                /// on success
            growl.success('Your reservation has been submitted.', {title: 'Success!'});
        }).catch(function (error) {
            growl.error('Requested dates are not available.', {title: 'Error!'});
        });


    };

    $scope.showError = function(){
        growl.error('Requested dates are not available.', {title: 'Error!'});
    };

    $scope.init = function () {
        $scope.cabin1 = document.querySelector('#cabin1');
        $scope.cabin2 = document.querySelector('#cabin2');
        $scope.cabin3 = document.querySelector('#cabin3');


        if($scope.cabin1){
            $scope.reservation.cabinNum = 1;

        }else if($scope.cabin2){
            $scope.reservation.cabinNum = 2;

        }else if($scope.cabin3){
            $scope.reservation.cabinNum = 3;
        }
    }

    $scope.openModal = function () {
       $uibModal.open({
           templateUrl: './views/modal.html',
           controller: function ($scope, $uibModalInstance) {
               $scope.ok = function () {
                   $uibModalInstance.close();
               };

           }
       })

    };
    $scope.init()
});


app.filter('ascendingSort', function () {
    return function (input) {
        return input.sort();
    };
});

app.filter('relativedate', ['$filter', function ($filter) {
    return function (rel, format) {
        var date = new Date();
        date.setDate(date.getDate() + rel);
        return $filter('date')(date, format || 'MMMM-dd')
    }
}]);

app.filter('dateRange', function() {
    return function( items) {
        var filtered = [];

        debugger;

        var toDate = document.getElementById("startDate").value;
        var fromDate = document.getElementById("startDate").value;


        var from_date = Date.parse(fromDate);
        var to_date = Date.parse(toDate);

        console.log(from_date);
        console.log(to_date);

        angular.forEach(items, function(item) {
            if(item.completed_date > from_date && item.completed_date < to_date) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});

function relativeDate(rel, format) {
    var date = new Date();
    date.setDate(date.getDate() + rel);
    return $filter('date')(date, format || 'MMMM-dd')
}