var userModule = angular.module('userModule', ['ngRoute', 'ngStorage']);
userModule.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    // when('/activation', {
    //  title: 'Login',
    //  templateUrl: 'app/users/activation.html',
    //  controller: 'LoginController'
    //      }).
    when('/', {
        title: 'Login',
        templateUrl: 'app/users/login.html',
        controller: 'LoginController'
    }).
    when('/otp', {
        title: 'Enter OTP',
        templateUrl: 'app/users/otp.html',
        controller: 'LoginController'
    }).
    when('/language', {
        title: 'Choose Language',
        templateUrl: 'app/users/language.html',
        controller: 'LoginController'
    });
}]);
userModule.factory('UserService', ['$window', '$http', '$q', '$location', '$rootScope', '$timeout', function($window, $http, $q, $location, $rootScope, $timeout) {
    var service = {};
    var baseApp = 'http://13.126.229.12:8080/novomix/';
    service.getOtp = function(userReg, callback) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: baseApp + 'api/v1/rest/sendOtp?',
            params: {
                phoneNumber: userReg
            }
        }).success(function(data) {
            callback(data);
            deferred.resolve(data);
        }).error(function(data) {
            callback(data);
            deferred.reject(data);
        });
    };
    return service;
}]);
userModule.controller('LoginController', ['$route', '$rootScope', '$scope', '$location', '$timeout', 'LanguageService', 'UserService', '$localStorage', 'ContentService', function($route, $rootScope, $scope, $location, $timeout, LanguageService, UserService, $localStorage, ContentService) {
    $rootScope.my_data = {};

    $rootScope.my_data.home = {};
    $scope.userData = [];
    $scope.loginText = 'Submit';
    $scope.$storage = $localStorage;
    // if (angular.isDefined($scope.$storage.user)) {
    //     $scope.getMobile = $scope.$storage.user[0].mobileNo.substr(-2, 2);
    // }
    var contentPromise = ContentService.getData($scope.$storage.lang);
    contentPromise.then(function(response) {
        $rootScope.my_data = response.data;
    });
    var langPromise = LanguageService.getData();
    $scope.submitTextLang = "Set Language";
    langPromise.then(function(response) {
        $scope.languages = response.data;
    });
    // $scope.checkLanguage = function() {
    //     if (!$scope.$storage.lang) {
    //         $location.path('/language');
    //     } else {
    //         if ($scope.$storage.isLoggedIn) {
    //             $location.path('/menu');
    //         } else {
    //             $location.path('/');
    //         }
    //     }
    // }

    // $scope.activate = function(code){
    //  $scope.isSending = true;
    //  if($scope.$storage.isLoggedIn){
    //      $rootScope.isLoggedIn = true;
    //      $location.path('/menu');
    //  }else{
    //      $scope.formErr = true;
    //  }
    // };   
    $scope.userLogin = function(getName) {
        // console.log($rootScope.my_data.login.loading);
        // if (getName === 'login') {
        //     if (angular.isDefined($scope.mobileNumber)) {
        //         $scope.userData = [];
        //         $scope.loginText = $rootScope.my_data.login.loading;
        //         UserService.getOtp($scope.mobileNumber, function(response) {

        //             if (response.status) {
        //                 $scope.loginText = $rootScope.my_data.login.submitted;
        //                 $scope.userData.push(response.data);
        //                 $scope.$storage.user = $scope.userData;
        //                 $scope.$storage.isLoggedIn = true;
        //                 $location.path('/menu');
        //             } else {
        //                 $scope.loginText = $rootScope.my_data.login.failed;
        //             }
        //         });
        //     } else {
        //         alert($rootScope.my_data.login.alert);
        //     }
        // } else {
        //     $scope.loginText = $rootScope.my_data.login.loading;
        //     $scope.userData = [];
        //     UserService.getOtp($scope.$storage.user[0].mobileNo, function(response) {
        //         if (response.status) {
        //             $scope.loginText = $rootScope.my_data.login.submitted;
        //             $scope.$storage.user = [];
        //             $scope.userData.push(response.data);
        //             $scope.$storage.user = $scope.userData;
        //             console.log($scope.$storage);
        //         } else {
        //             $scope.loginText = $rootScope.my_data.login.failed;
        //         }
        //     });
        // }
        if (getName === 'login') {
            if (angular.isDefined($scope.mobileNumber)) {
                if($scope.mobileNumber === $scope.$storage.password){
                    $scope.$storage.isLoggedIn = true;
                    $location.path('/menu');
                }
                else {
                        $scope.loginError = $rootScope.my_data.login.alert;
                    }
            }
            else {
                alert($rootScope.my_data.login.alert);
            }
        }
    };

    $scope.setlanguage = function(lang) {
        $scope.submitTextLang = "Processing...";
        $timeout(function() {
            $scope.$storage.lang = lang;
            $scope.$storage.password = 'myRyzodeg';
            $location.path('/');
        }, 1000);
    };
    $scope.otpSubmit = function() {
        if (angular.isDefined($scope.otpNum)) {
            if (parseInt($scope.otpNum) === parseInt($scope.$storage.user[0].otp)) {
                $scope.loginText = "Processing...";
                $scope.$storage.user[0].verified = true;
                $timeout(function() {
                    $location.path('/menu');
                }, 1000);
            } else {
                alert("OTP is wrong");
            }
        } else {
            alert("Please Enter OTP");
        }
    };
}]);
"use strict";
var pageModule = angular.module('pageModule', ['ngRoute', 'ngMap', 'ui.bootstrap', 'ngNumberPicker', 'ngStorage', 'ngAnimate']);
pageModule.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/pages/not_found', {
        title: 'Page Not Found',
        templateUrl: 'app/pages/not_found.html',
        controller: 'pageController'
    }).
    when('/menu', {
        title: 'Menu',
        templateUrl: 'app/pages/menu.html',
        controller: 'pageController'
    }).
    when('/home', {
        title: 'Home',
        templateUrl: 'app/pages/home.html',
        controller: 'pageController'
    }).
    when('/languages', {
        title: 'Language',
        templateUrl: 'app/pages/languages.html',
        controller: 'pageController'
    }).
    when('/home_flexpen', {
        title: 'How to use novomix flexpen',
        templateUrl: 'app/pages/novomix_you_flexpen.html',
        controller: 'pageController'
    }).
    when('/home_novopen', {
        title: 'How to use novopen',
        templateUrl: 'app/pages/novomix_you_novopen.html',
        controller: 'pageController'
    }).
    when('/novomix_you', {
        title: 'Ryzodeg & you ',
        templateUrl: 'app/pages/novomix_you.html',
        controller: 'pageController'
    }).
    when('/novomix_you_detail', {
        title: 'Novomix & You',
        templateUrl: 'app/pages/novomix_you_detail.html',
        controller: 'pageController'
    }).
    when('/counselling', {
        title: 'Counselling',
        templateUrl: 'app/pages/counselling.html',
        controller: 'pageController'
    }).
    when('/counselling_detail', {
        title: 'Counselling Detail',
        templateUrl: 'app/pages/counselling_detail.html',
        controller: 'pageController'
    }).
    when('/know_more', {
        title: 'Know More',
        templateUrl: 'app/pages/know_more.html',
        controller: 'pageController'
    }).
    when('/pedometer', {
        title: 'Pedometer',
        templateUrl: 'app/pages/pedometer.html',
        controller: 'pageController'
    }).
    when('/pedo_report', {
        title: 'Pedometer Reports',
        templateUrl: 'app/pages/pedo_reports.html',
        controller: 'pageController'
    }).
    when('/reminder', {
        title: 'Reminder Alarm',
        templateUrl: 'app/pages/reminder.html',
        controller: 'pageController'
    }).
    when('/reports', {
        title: 'Reports',
        templateUrl: 'app/pages/reports.html',
        controller: 'pageController'
    }).
    when('/bmi_calculator', {
        title: 'BMI Calculator',
        templateUrl: 'app/pages/bmi_calculator.html',
        controller: 'pageController'
    }).
    when('/eag_calculator', {
        title: 'EAG Calculator',
        templateUrl: 'app/pages/eag_calculator.html',
        controller: 'pageController'
    }).
    when('/disclaimer', {
        title: 'Disclaimer',
        templateUrl: 'app/pages/disclaimer.html',
        controller: 'pageController'
    }).
    when('/copyright', {
        title: 'Copyright',
        templateUrl: 'app/pages/copyright.html',
        controller: 'pageController'
    }).when('/copyright', {
        title: 'Copyright',
        templateUrl: 'app/pages/copyright.html',
        controller: 'pageController'
    }).
    when('/counselling_diet_charts/:name', {
        title: 'Know More',
        templateUrl: 'app/pages/diet_charts.html',
        controller: 'pageController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);
pageModule.factory('PageService', ['$window', '$http', '$q', '$location', '$localStorage', '$rootScope', '$timeout', function($window, $http, $q, $location, $localStorage, $rootScope, $timeout) {
    var pageService = {};
    var baseApp = 'http://13.126.229.12:8080/novomix/';
    
    // pageService.saveDailyRecord = function(dailyData) {
    //     var deferred = $q.defer();
    //     $http({
    //         method: 'POST',
    //         data: dailyData,
    //         url: baseApp + 'api/v1/rest/addDailyRecord?',
    //         headers: {
    //             'Authorization': $localStorage.user[0].token,
    //             'Content-Type': 'application/json; charset=UTF-8'
    //         }
    //     }).success(function(data) {
    //         callback(data);
    //         deferred.resolve(data);
    //     }).error(function(data) {
    //         callback(data);
    //         deferred.reject(data);
    //     });
     
    // };
    // pageService.retrieveRecord = function(selectDate, callback) {
    //     var deferred = $q.defer();
    //     $http({
    //         method: 'POST',
    //         params: {
    //             date: selectDate
    //         },
    //         url: baseApp + 'api/v1/rest/getRecord',
    //         headers: {
    //             'Authorization': $localStorage.user[0].token
    //         }
    //     }).success(function(data) {
    //         callback(data);
    //         deferred.resolve(data);
    //     }).error(function(data) {
    //         callback(data);
    //         deferred.reject(data);
    //     });
    // };
    pageService.retrievePedoRecord = function(selectDate, callback) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            params: {
                date: selectDate
            },
            url: baseApp + 'api/v1/rest/getPedoRecordsByDate',
            headers: {
                'Authorization': $localStorage.user[0].token
            }
        }).success(function(data) {
            callback(data);
            deferred.resolve(data);
        }).error(function(data) {
            callback(data);
            deferred.reject(data);
        });
    };
    pageService.passPedoRecord = function(selectData, callback) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            data: selectData,
            url: baseApp + 'api/v1/rest/calculatePedometerDetails',
            headers: {
                'Authorization': $localStorage.user[0].token
            }
        }).success(function(data) {
            callback(data);
            deferred.resolve(data);
        }).error(function(data) {
            callback(data);
            deferred.reject(data);
        });
    }
    return pageService;
}]);
pageModule.directive('mapView', function($window, $log) {
    return {
        restrict: 'AC',
        templateUrl: 'app/pages/map.html',
        controller: function($scope, $rootScope, $location,$interval,PageService) {
            var time = 0;
            $scope.Distance = { num: 0 };
            $scope.Steps = { num: 0 };
            $scope.Calories = { num: 0 };
            $scope.Time_Duration = { num: 0 };
            $scope.mapView = true;
            $scope.steps = 0;
            $scope.calories = 0;
            $scope.duration = 0;
            $scope.distance = 0;
            $scope.getPosition = [];
            $scope.isPaused = false;
            $scope.notWalking = false;
            $scope.showData = false;
            $scope.exception = [];
            $scope.totalDistance = [];
            $scope.waypoints = [];
            $scope.getpoint = 0;

            function getPostion(){
                pedometer.startPedometerUpdates(function(success){
                    $scope.steps = success;
                    console.log(success);
                }, function(failureCallback){
                    console.log(failureCallback);
                });
                
                pedometer.isDistanceAvailable(function(success){
                    $scope.distance = success;
                    console.log(success);
                }, function(failureCallback){
                    console.log(failureCallback);
                });
            }

            pedometer.isStepCountingAvailable( function (pedometerData) {
                console.log(pedometerData);
            
                    $scope.startPedometer = function() {
                        $scope.hideStart = true;
                        $scope.showPause = true;
                        $scope.startPedo = true;
                        $scope.isPaused = false;
                        $scope.getStartTime = new Date();
                        $interval.cancel($scope.interval);
                        getPostion();
                    }
                    $scope.startAgainPedo = function() {
                        $interval.cancel($scope.interval);
                        $scope.isPaused = false;
                        $scope.getPosition=[];
                        $scope.exception=[];
                        getPostion();
                        $scope.notWalking = false;

                    }
                    $scope.closePopPedo = function() {
                        $scope.steps = 0;
                        $scope.calories = 0;
                        $scope.duration = 0;
                        $scope.distance = 0;
                        $scope.getPosition = [];
                        $interval.cancel($scope.interval);
                        $scope.hideStart = false;
                        $scope.notWalking = false;
                        $scope.showData = false;
                        $scope.showResume = false;
                        $scope.showPause = false;
                    }
                    $scope.pausePedometer = function() {
                        $scope.showPause = false;
                        $scope.showResume = true;
                        $scope.startPedo = false;
                        $scope.isPaused = true;

                    }
                    $scope.resumePedometer = function() {
                        $scope.showPause = true;
                        $scope.showResume = false;
                        $scope.startPedo = true;
                        $scope.isPaused = false;
                        $interval.cancel($scope.interval);
                        getPostion();
                    }
                    $scope.finishPedometer = function() {
                        $scope.hideResult = true;
                        $scope.hideStart = true;
                        $scope.startPedo = false;
                        $scope.showResume = false;
                        $scope.showData = true;
                        $interval.cancel($scope.interval);
                        $scope.isPaused = false;
                        $scope.notWalking = false;
                        $scope.showData = true;
                        $scope.dateObj = new Date();
                        var month = $scope.monthNames[$scope.dateObj.getMonth()]; //months from 1-12
                        var getMonth = $scope.dateObj.getMonth() + 1;
                        var printMonth = ('0' + getMonth).slice(-2);
                        var day = ('0' + $scope.dateObj.getDate()).slice(-2);
                        var year = $scope.dateObj.getFullYear();
                        $scope.createdSendDate = day + "/" + printMonth + "/" + year;
                        $scope.createdDate = day + "th" + " " + month + " " + year;
                        $scope.startedTime = $scope.getStartTime.getHours() + ":" + $scope.getStartTime.getMinutes();
                        $scope.endedTime = $scope.dateObj.getHours() + ":" + $scope.dateObj.getMinutes();
                    }
            }, function (error) {
                console.log(error);
            });
           // function getPedoDuration(initial,update) {
           //      var startTime = (new Date(initial).getHours() * 60) + new Date(initial).getMinutes();
           //      var updateTime = (new Date(update).getHours() * 60) + new Date(update).getMinutes();
           //      return updateTime - startTime;
           //  }

           //  function distance(lat1, lon1, lat2, lon2, unit) {
           //      var radlat1 = Math.PI * lat1 / 180
           //      var radlat2 = Math.PI * lat2 / 180
           //      var radlon1 = Math.PI * lon1 / 180
           //      var radlon2 = Math.PI * lon2 / 180
           //      var theta = lon1 - lon2
           //      var radtheta = Math.PI * theta / 180
           //      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
           //      dist = Math.acos(dist)
           //      dist = dist * 180 / Math.PI;
           //      dist = dist * 60 * 1.1515;
           //      if (unit == "K") { dist = dist * 1.609344; } else if (unit == "N") { dist = dist * 0.8684; } else if (unit == "M") { dist = dist; }
           //      $scope.totalDistance.push(dist);
           //      return $scope.totalDistance.reduce(getSum);
           //  }

           //  function getSum(total, num) {
           //      return total + num;
           //  }

           //    function calsPerDay(steps) {
           //      //var weight = $scope.$storage.userWeight;
           //      result = parseInt(steps) * 0.063;
           //      return result;
           //  }
           //  // function find_duplicate_in_array(arra1) {
           //  //   var i,
           //  //   len=arra1.length,
           //  //   result = [],
           //  //   obj = {}; 
           //  //   for (i=0; i<len; i++){
           //  //     obj[arra1[i]]=0;
           //  //   }
           //  //   for (i in obj) {
           //  //   result.push(i);
           //  //   }
           //  //   return result;
           //  // }
           //  function compareObj(current, last) {
           //      var getBoolean = false;
           //      if (current.lat === last.lat || current.lng === last.lng) {
           //          getBoolean = false;
           //      } else {
           //          getBoolean = true;
           //      }
           //      return getBoolean;
           //  }
           //  // currentLocation();

           //  function watchPostion() {
           //      if (navigator.geolocation) {
           //          navigator.geolocation.getCurrentPosition(function(position) {
           //              console.log(position);
           //              var currentOrigin = {
           //                  lat: parseFloat(position.coords.latitude),
           //                  lng: parseFloat(position.coords.longitude),
           //                  timestamp:position.timestamp
           //              };
           //              //if ($scope.getPosition.length == 0) {
           //              $scope.getPosition.push(currentOrigin);

           //              //} else {
           //                  // var lastArray = $scope.getPosition[$scope.getPosition.length - 1];
           //                  // var srcLocation = new google.maps.LatLng(currentOrigin.lat, currentOrigin.lng);
           //                  // var dstLocation = new google.maps.LatLng(lastArray.lat, lastArray.lng);
           //                  //var checkData = distance(currentOrigin.lat, currentOrigin.lng, lastArray.lat, lastArray.lng, 'K');
           //                  // var getDistance = google.maps.geometry.spherical.computeDistanceBetween(srcLocation, dstLocation);
           //                  // var cm_distance = ((getDistance/1000) * 100000)/10;
           //                  var getDistance = distance($scope.getPosition[0].lat,$scope.getPosition[0].lng,$scope.getPosition[$scope.getPosition.length - 1].lat, $scope.getPosition[$scope.getPosition.length - 1].lng,"K");
           //                  var cm_distance = getDistance * 100000;
           //                  //1 cm equal to 0.01320 steps;
           //                  var stepsTotal = cm_distance * 0.01320;
           //                  $scope.totalSteps = stepsTotal-10;
           //                  if($scope.totalSteps > 0){
           //                       $scope.$apply(function() {
           //                          $scope.steps = stepsTotal-10;
           //                          $scope.duration = getPedoDuration($scope.getPosition[0].timestamp,$scope.getPosition[$scope.getPosition.length - 1].timestamp);
           //                          $scope.distance = getDistance;
           //                          $scope.calories = calsPerDay($scope.steps);
           //                          currentLocation();
           //                       });
           //                  }
           //                  // if (cm_distance > 68) {
           //                  //     $scope.getPosition.push(currentOrigin);
           //                  //     $scope.$apply(function() {
           //                  //         angular.forEach($scope.getPosition, function(data) {
           //                  //             $scope.waypoints.push([data.lat, data.lng]);
           //                  //         });
           //                  //         var origin = new google.maps.LatLng($scope.getPosition[0].lat, $scope.getPosition[0].lng);
           //                  //         var destination = new google.maps.LatLng($scope.getPosition[$scope.getPosition.length - 1].lat, $scope.getPosition[$scope.getPosition.length - 1].lng);
           //                  //         var getAccDistance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
           //                  //         $scope.steps = $scope.getPosition.length - 1;
           //                  //         $scope.duration = getPedoDuration();
           //                  //         $scope.distance = getAccDistance/1000;
           //                  //         $scope.calories = calsPerDay();
           //                  //     });
           //                  // } else {
           //                  //     //var log = 'Not WALKING';
           //                  //     console.log("Not WALKING");
           //                  //     // $scope.exception.push(log);
           //                  //     // if($scope.exception.length > 5){
           //                  //     //     $scope.$apply(function () {
           //                  //     //         $scope.pausePedometer();
           //                  //     //         $scope.notWalking = true;
           //                  //     //     }); 
           //                  //     // }
                                
           //                  // }
           //          }, function(err) {
           //              if (err.code == 1) {
           //                  alert("User denied geolocation.");
           //              } else if (err.code == 2) {
           //                  alert("Position unavailable.");
           //              } else if (err.code == 3) {
           //                  alert("Timeout expired.");
           //              } else {
           //                  alert("ERROR:" + err.message);
           //              }
           //          });
           //      }
           //  }

           //  function currentLocation() {
           //      if ($scope.Distance > 0 || $scope.Steps > 0 || $scope.Calories > 0 || $scope.Time_Duration > 0) {
           //          if ($scope.Distance <= $scope.distance || $scope.Steps <= $scope.steps || $scope.Calories <= $scope.calories || $scope.Time_Duration <= $scope.duration) {
           //              $scope.finishPedometer();
           //          }  
           //      }
           //  }

           //  function getPostion() {
           //      $scope.interval = $interval(function() {
           //          if (!$scope.isPaused) {
           //              watchPostion();
           //          }
           //      }, 3000);
           //  }
           
           //  $scope.startPedometer = function() {
           //      $scope.hideStart = true;
           //      $scope.showPause = true;
           //      $scope.startPedo = true;
           //      $scope.isPaused = false;
           //      $scope.getStartTime = new Date();
           //      $interval.cancel($scope.interval);
           //      getPostion();
           //  }
           //  $scope.startAgainPedo = function() {
           //      $interval.cancel($scope.interval);
           //      $scope.isPaused = false;
           //      $scope.getPosition=[];
           //      $scope.exception=[];
           //      getPostion();
           //      $scope.notWalking = false;

           //  }
           //  $scope.closePopPedo = function() {
           //      $scope.steps = 0;
           //      $scope.calories = 0;
           //      $scope.duration = 0;
           //      $scope.distance = 0;
           //      $scope.getPosition = [];
           //      $interval.cancel($scope.interval);
           //      $scope.hideStart = false;
           //      $scope.notWalking = false;
           //      $scope.showData = false;
           //      $scope.showResume = false;
           //      $scope.showPause = false;
           //  }
           //  $scope.pausePedometer = function() {
           //      $scope.showPause = false;
           //      $scope.showResume = true;
           //      $scope.startPedo = false;
           //      $scope.isPaused = true;

           //  }
           //  $scope.resumePedometer = function() {
           //      $scope.showPause = true;
           //      $scope.showResume = false;
           //      $scope.startPedo = true;
           //      $scope.isPaused = false;
           //      $interval.cancel($scope.interval);
           //      getPostion();
           //  }
           //  $scope.finishPedometer = function() {
           //      $scope.hideResult = true;
           //      $scope.hideStart = true;
           //      $scope.startPedo = false;
           //      $scope.showResume = false;
           //      $scope.showData = true;
           //      $interval.cancel($scope.interval);
           //      $scope.isPaused = false;
           //      $scope.notWalking = false;
           //      $scope.showData = true;
           //      $scope.dateObj = new Date();
           //      var month = $scope.monthNames[$scope.dateObj.getMonth()]; //months from 1-12
           //      var getMonth = $scope.dateObj.getMonth() + 1;
           //      var printMonth = ('0' + getMonth).slice(-2);
           //      var day = ('0' + $scope.dateObj.getDate()).slice(-2);
           //      var year = $scope.dateObj.getFullYear();
           //      $scope.createdSendDate = day + "/" + printMonth + "/" + year;
           //      $scope.createdDate = day + "th" + " " + month + " " + year;
           //      $scope.startedTime = $scope.getStartTime.getHours() + ":" + $scope.getStartTime.getMinutes();
           //      $scope.endedTime = $scope.dateObj.getHours() + ":" + $scope.dateObj.getMinutes();
           //  }
           //  $scope.startNew = function(){
           //     var time = 0;
           //     $scope.hideResult = false;
           //     $scope.hideStart = false;

           //       $scope.startPedo = true;
           //      $scope.showResume = false;
           //      $scope.showData = false;

           //      $scope.Distance = { num: 0 };
           //      $scope.Steps = { num: 0 };
           //      $scope.Calories = { num: 0 };
           //      $scope.Time_Duration = { num: 0 };
           //      $scope.mapView = true;
           //      $scope.steps = 0;
           //      $scope.calories = 0;
           //      $scope.duration = 0;
           //      $scope.distance = 0;
           //      $scope.getPosition = [];
           //      $scope.isPaused = false;
           //      $scope.notWalking = false;
           //      $scope.showData = false;
           //      $scope.totalDistance = [];
           //      $scope.waypoints = [];
           //      $scope.getpoint = 0;
           //  }
           //  $scope.pedoReports = function() {
           //      $scope.wayPoint = [];
           //      var origin = JSON.parse(JSON.stringify($scope.getPosition[0]));
           //      var destination = JSON.parse(JSON.stringify($scope.getPosition[$scope.getPosition.length - 1]));
           //      angular.forEach($scope.getPosition, function(data) {
           //          var pos = JSON.parse(JSON.stringify(data));
           //          var getDal = {
           //              "lat": pos.lat,
           //              "lng": pos.lng
           //          };
           //          $scope.wayPoint.push(getDal);
           //      });

           //      var getAll = {
           //          "originLatitudeLongitude": {
           //              "lat": origin.lat,
           //              "lng": origin.lng
           //          },
           //          "destinationLatitudeLongitude": {
           //              "lat": destination.lat,
           //              "lng": destination.lng
           //          },
           //          "waypoints": $scope.wayPoint,
           //          "distance": $scope.distance,
           //          "duration": $scope.duration,
           //          "steps": $scope.steps,
           //          "calories": $scope.calories,
           //          "startTime": $scope.startedTime,
           //          "endTime": $scope.endedTime,
           //          "createdDate": $scope.createdSendDate
           //      };
           //      PageService.passPedoRecord(getAll, function(response) {
           //          if (response.status) {
           //              $location.path('/pedo_report');
           //          }
           //      });
           //  }
            $scope.storeWeight = function(weight) {
                $scope.$storage.userWeight = weight;
            }
        }
    };
});
pageModule.controller('pageController', ['$route', '$scope', '$document', '$sce', '$http', '$location', '$rootScope', '$timeout', '$interval', 'LanguageService', 'ContentService', 'PageService', '$localStorage', '$routeParams', function($route, $scope, $document, $sce, $http, $location, $rootScope, $timeout, $interval, LanguageService, ContentService, PageService, $localStorage, $routeParams) {
    $rootScope.showMenu = false;
    $scope.isBack = true;
    $scope.isRendered = false;
    $scope.dailyBtn = 'Submit';
    $rootScope.viewAlarms = 0;
    $scope.viewA1C = true;
    $scope.viewEAG = false;
    var arrayDailyData = [];
    if ($location.path() === '/menu') {
        $scope.pageName = 'menuPage';
        $scope.isBack = false;
    }

    $scope.$storage = $localStorage;
    $rootScope.user = {};
    $rootScope.user.lang = $scope.$storage.lang || "eng";
    $rootScope.islangMenu = false;
    $scope.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $scope.daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $scope.template = { 'menu': 'app/pages/menu.html', 'accmenu': 'app/pages/accmenu.html', 'header': 'app/pages/header.html', 'footer': 'app/pages/footer.html' };

    var langPromise = LanguageService.getData();
    langPromise.then(function(response) {
        $scope.languages = response.data;
    });

    var contentPromise = ContentService.getData($rootScope.user.lang);
    contentPromise.then(function(response) {
        $rootScope.my_data = response.data;
        if ($routeParams.name) {
            $rootScope.zone = $rootScope.my_data.diet_charts[$routeParams.name];
        }
    });

    $scope.openMenu = function() {
        if ($rootScope.showMenu) {
            $rootScope.showMenu = false;
        } else {
            $rootScope.showMenu = true;
        }

    }
    $scope.openGoal = function() {
        $scope.showGoal = true;
    }

    $scope.assignHeight = function() {
        $scope.heightValue = [];
        var initial = 120;
        var end = 500;
        for (var i = initial; i <= end; i++) {
            $scope.heightValue.push(i);
        }

        $scope.assignWeight();
    }
    $scope.assignWeight = function() {
        $scope.weightValue = [];
        var initial = 20;
        var end = 120;
        for (var i = initial; i <= end; i++) {
            $scope.weightValue.push(i);
        }
    }
    $scope.bmiCalc = function(what, val) {
        if (what === 'height') {
            $scope.heightVal = val / 100;

        } else if (what === 'weight') {
            $scope.weightVal = val;
            $scope.$storage.userWeight = val;
        }
        if ($scope.heightVal && $scope.weightVal) {
            var getHeight = $scope.heightVal * $scope.heightVal;
            $scope.bmiValue = $scope.weightVal / getHeight;
        }
    }
    $scope.getLanguage = function(val) {
        $rootScope.user.lang = val;
        var contentPromise = ContentService.getData($rootScope.user.lang);
        contentPromise.then(function(response) {
            $rootScope.my_data = response.data;
            if ($routeParams.name) {
                $rootScope.zone = $rootScope.my_data.diet_charts[$routeParams.name];
            }
        });
        $location.path('/menu');
        $scope.$storage.lang = val;
        //$rootScope.islangMenu = false;

    };
    $scope.openLanguage = function() {
        $location.path('/languages');
    }
    $scope.myDataMenuIn = function() {
        $rootScope.myMenu = true;
    }
    $scope.myDataMenuOut = function() {
        $rootScope.myMenu = false;
    }

    function getAllDates(year, month) {
        var currentYr = new Date().getFullYear();
        var numDaysInMonth, daysInWeek, daysIndex, index, i, l, daysArray;
        numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        daysIndex = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };
        index = daysIndex[(new Date(year, month, 1)).toString().split(' ')[0]];
        daysArray = [];

        for (i = 0, l = numDaysInMonth[month]; i < l; i++) {
            var getDate = ('0' + (i + 1)).slice(-2);
            var getMonth = ('0' + (month + 1)).slice(-2);
            var gather = {
                date: getDate,
                day: daysInWeek[index++].substring(0,3),
                dateFormat: getDate + '/' + getMonth + '/' + currentYr
            };
            daysArray.push(gather);
            if (index == 7) index = 0;
        }
        return daysArray;
    }
    $scope.selectedDate = function(index, selected) {
         var currentMonth = new Date().getMonth();
        if($scope.clickedMonth < currentMonth){
            $scope.activeDate = selected.date;
            $scope.prevRecords(selected.dateFormat);
        }else{
            var currentDate = ('0' + new Date().getDate()).slice(-2);
            if (selected.date <= currentDate) {
                $scope.activeDate = selected.date;
                $scope.prevRecords(selected.dateFormat);
            } 
        }
    }

    $scope.viewDates = function(month, selected) {
        var currentYr = new Date().getFullYear();
        var currentMonth = new Date().getMonth();
        $scope.clickedMonth = month;
        if (month <= currentMonth) {
            $scope.getView = getAllDates(currentYr, month);
            if (month === currentMonth) {
                var currentIndex = ('0' + new Date().getDate()).slice(-2);
                var currentDate = 0;
                angular.forEach($scope.getView, function(data) {
                    if (data.date == currentIndex) {
                        currentDate = data;
                    }
                    return currentDate;
                });
                $scope.selectedDate(currentDate - 1, currentDate);

            } else {
                $scope.activeDate = '';
            }
            $scope.noDate = true;
            $scope.activeMonth = selected;
        }

    }
    $scope.getCurrentMonth = function() {
        var currentYr = new Date().getFullYear();
        var currentMonth = $scope.monthNames[new Date().getMonth()];
        var currentDate = new Date().getDate();
        $scope.activeMonth = currentMonth;
        $scope.viewDates(new Date().getMonth(), currentMonth);
    }
    $scope.dailyRecord = function(before_breakfast, after_breakfast, pre_lunch, post_lunch, pre_dinner, post_dinner, bed_time, at_4_am) {
        var currentYr = new Date().getFullYear();
        var getSMonth = $scope.monthNames.indexOf($scope.activeMonth) + 1;
        $scope.getScopeMonth = ('0' + getSMonth).slice(-2);
        $scope.getScopeDate = ('0' + $scope.activeDate).slice(-2);
        $scope.createdDate = $scope.getScopeDate + '/' + $scope.getScopeMonth + '/' + currentYr;
        var dailyData = { beforeBrkfast: before_breakfast, nintyminAfterBrkfast: after_breakfast, preLunch: pre_lunch, postLunch: post_lunch, preDinner: pre_dinner, postDinner: post_dinner, bedTime: bed_time, atfourAM: at_4_am, createdDate: $scope.createdDate };
        // PageService.saveDailyRecord(dailyData, function(response) {
        //     $scope.dailyBtn = "loading...";
        //     if (response.status) {
        //         $scope.dailyBtn = "Submitted Successfully";
        //     } else {
        //         $scope.dailyBtn = "Failed Try Again";
        //     }
        //     $timeout(function() {
        //         $scope.dailyBtn = "Submit";
        //     }, 1000);
        // });
        if(angular.isUndefined($localStorage.dataRecord)){
                arrayDailyData.push(dailyData);
                 $localStorage.dataRecord = {
                    dailyRecord : arrayDailyData
                };
                $scope.dailyBtn = "Submitted Successfully";
        }else{
            angular.forEach($localStorage.dataRecord.dailyRecord,function(data){
                if(data.createdDate == $scope.createdDate){
                   var getIndex = $localStorage.dataRecord.dailyRecord.indexOf(data);
                   $localStorage.dataRecord.dailyRecord[getIndex].beforeBrkfast = before_breakfast;
                   $localStorage.dataRecord.dailyRecord[getIndex].nintyminAfterBrkfast= after_breakfast; 
                   $localStorage.dataRecord.dailyRecord[getIndex].preLunch= pre_lunch;
                   $localStorage.dataRecord.dailyRecord[getIndex].postLunch= post_lunch; 
                   $localStorage.dataRecord.dailyRecord[getIndex].preDinner= pre_dinner; 
                   $localStorage.dataRecord.dailyRecord[getIndex].postDinner= post_dinner; 
                   $localStorage.dataRecord.dailyRecord[getIndex].bedTime= bed_time;
                   $localStorage.dataRecord.dailyRecord[getIndex].atfourAM= at_4_am; 
                   $localStorage.dataRecord.dailyRecord[getIndex].createdDate= $scope.createdDate;
                }else{
                    arrayDailyData.push(dailyData);
                     $localStorage.dataRecord = {
                        dailyRecord : arrayDailyData
                    };
                }
            });
            $scope.dailyBtn = "Submitted Successfully";
        } 
        $timeout(function() {
                $scope.dailyBtn = "Submit";
            }, 1000);
    }
    //check obj names are having value or not
    // function checkProperties(obj) {
    //     for (var key in obj) {
    //         if (obj[key] !== null && obj[key] != "")
    //             return false;
    //     }
    //     return true;
    // }
    $scope.prevRecords = function(date) {
        // PageService.retrieveRecord(date, function(response) {
        //     if (response.data == null) {
        //         $scope.at_4_am = '';
        //         $scope.bed_time = '';
        //         $scope.before_breakfast = '';
        //         $scope.after_breakfast = '';
        //         $scope.post_dinner = '';
        //         $scope.post_lunch = '';
        //         $scope.pre_dinner = '';
        //         $scope.pre_lunch = '';
        //     } else {
        //         $scope.at_4_am = response.data.atfourAM;
        //         $scope.bed_time = response.data.bedTime;
        //         $scope.before_breakfast = response.data.beforeBrkfast;
        //         $scope.after_breakfast = response.data.nintyminAfterBrkfast;
        //         $scope.post_dinner = response.data.postDinner;
        //         $scope.post_lunch = response.data.postLunch;
        //         $scope.pre_dinner = response.data.preDinner;
        //         $scope.pre_lunch = response.data.preLunch;
        //     }
        // });
                    $scope.at_4_am = '';
                    $scope.bed_time = '';
                    $scope.before_breakfast = '';
                    $scope.after_breakfast = '';
                    $scope.post_dinner = '';
                    $scope.post_lunch = '';
                    $scope.pre_dinner = '';
                    $scope.pre_lunch = '';
        if(angular.isDefined($localStorage.dataRecord)){
               
          angular.forEach($localStorage.dataRecord.dailyRecord,function(data){
                if(data.createdDate == date){
                    $scope.at_4_am = data.atfourAM;
                    $scope.bed_time = data.bedTime;
                    $scope.before_breakfast = data.beforeBrkfast;
                    $scope.after_breakfast = data.nintyminAfterBrkfast;
                    $scope.post_dinner = data.postDinner;
                    $scope.post_lunch = data.postLunch;
                    $scope.pre_dinner = data.preDinner;
                    $scope.pre_lunch = data.preLunch;
                }
            });
        }

    }
    $scope.getA1c = function(eag) {
        if (eag === '') {
            $scope.passA1c = '';
        } else {
            $scope.passA1c =  Math.round((46.7 + parseFloat(eag)) / 28.7 );
        }

    }
    $scope.geteAG = function(a1c) {
        if (a1c === '') {
            $scope.passeAG = '';
        } else {
            $scope.passeAG = Math.round((28.7 * parseFloat(a1c)) - 46.7);
        }

    }
    var accordion = $('uib-accordion'),
        body = $('body'),
        timeOut;
    accordion.on('click', '.panel-heading', function(e) {
        if ($('.panel-body').is(':visible')) {
            $(".panel-heading").parent().removeClass('active');
        } else {
            $(this).parent().toggleClass('active');
        }
        e.preventDefault();
    });
    $('body').on('click', '.radioContainer #a1c', function() {
        $('.eag').hide();
        $('.a1c').show();
    });
    $('body').on('click', '.radioContainer #eag', function() {
        $('.a1c').hide();
        $('.eag').show();
    });
    $scope.fireEvent = function() {
        $timeout(function() {
            $scope.$broadcast('htmlRendered');
        }, 0);
    };
    /*-------------------Pedometer Page ----------------------------------*/
    // $scope.pedoInit = function(){
    //      var time = 0;
    //         $scope.Distance = { num: 0 };
    //         $scope.Steps = { num: 0 };
    //         $scope.Calories = { num: 0 };
    //         $scope.Time_Duration = { num: 0 };
    //         $scope.mapView = true;
    //         $scope.steps = 0;
    //         var watchID = 0;
    //         $scope.calories = 0;
    //         $scope.duration = 0;
    //         $scope.distance = 0;
    //         $scope.getPosition = [];
    //         $scope.isPaused = false;
    //         $scope.notWalking = false;
    //         $scope.showData = false;
    //         $scope.exception = [];
    //         $scope.totalDistance = [];
    //         $scope.waypoints = [];
    //         $scope.getpoint = 0;
    //         var options = {enableHighAccuracy:true,maximumAge:Infinity, timeout:60000 };
    //         function getPedoDuration(initial,update) {
    //             var startTime = (new Date(initial).getHours() * 60) + new Date(initial).getMinutes();
    //             var updateTime = (new Date(update).getHours() * 60) + new Date(update).getMinutes();
    //             return updateTime - startTime;
    //         }

    //         function distance(lat1, lon1, lat2, lon2, unit) {
    //             var radlat1 = Math.PI * lat1 / 180
    //             var radlat2 = Math.PI * lat2 / 180
    //             var radlon1 = Math.PI * lon1 / 180
    //             var radlon2 = Math.PI * lon2 / 180
    //             var theta = lon1 - lon2
    //             var radtheta = Math.PI * theta / 180
    //             var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    //             dist = Math.acos(dist)
    //             dist = dist * 180 / Math.PI;
    //             dist = dist * 60 * 1.1515;
    //             if (unit == "K") { dist = dist * 1.609344; } else if (unit == "N") { dist = dist * 0.8684; } else if (unit == "M") { dist = dist; }
    //             $scope.totalDistance.push(dist);
    //             return $scope.totalDistance.reduce(getSum);
    //         }

    //         function getSum(total, num) {
    //             return total + num;
    //         }

    //         function calsPerDay(steps) {
    //             //var weight = $scope.$storage.userWeight;
    //             result = parseInt(steps) * 0.063;
    //             return result;
    //         }
    //         // function find_duplicate_in_array(arra1) {
    //         //   var i,
    //         //   len=arra1.length,
    //         //   result = [],
    //         //   obj = {}; 
    //         //   for (i=0; i<len; i++){
    //         //     obj[arra1[i]]=0;
    //         //   }
    //         //   for (i in obj) {
    //         //   result.push(i);
    //         //   }
    //         //   return result;
    //         // }
    //         // function compareObj(current, last) {
    //         //     var getBoolean = false;
    //         //     if (current.lat === last.lat || current.lng === last.lng) {
    //         //         getBoolean = false;
    //         //     } else {
    //         //         getBoolean = true;
    //         //     }
    //         //     return getBoolean;
    //         // }
    //         // currentLocation();

    //        function onSuccess(position) {
    //         console.log(position);
    //                     var currentOrigin = {
    //                         lat: parseFloat(position.coords.latitude),
    //                         lng: parseFloat(position.coords.longitude),
    //                         timestamp:position.timestamp
    //                     };
                        
    //                         $scope.getPosition.push(currentOrigin);
    //                         var srcLocation = new google.maps.LatLng($scope.getPosition[0].lat, $scope.getPosition[0].lng);
    //                         var dstLocation = new google.maps.LatLng($scope.getPosition[$scope.getPosition.length - 1].lat, $scope.getPosition[$scope.getPosition.length - 1].lng);
    //                         //var getDistance = google.maps.geometry.spherical.computeDistanceBetween(srcLocation, dstLocation);
    //                         var getDistance = distance($scope.getPosition[0].lat,$scope.getPosition[0].lng,$scope.getPosition[$scope.getPosition.length - 1].lat, $scope.getPosition[$scope.getPosition.length - 1].lng,"K");
    //                         var cm_distance = getDistance * 100000;
    //                         //1 cm equal to 0.01320 steps;
    //                         var stepsTotal = cm_distance * 0.01320;
                            
    //                          $scope.$apply(function() {
    //                             $scope.steps = stepsTotal;
    //                             $scope.duration = getPedoDuration($scope.getPosition[0].timestamp,$scope.getPosition[$scope.getPosition.length - 1].timestamp);
    //                             $scope.distance = getDistance;
    //                             $scope.calories = calsPerDay($scope.steps);
    //                             currentLocation();
    //                         });
    //                         // if (cm_distance > 68) {
    //                         //     $scope.getPosition.push(currentOrigin);
    //                         //     $scope.$apply(function() {
    //                         //         angular.forEach($scope.getPosition, function(data) {
    //                         //             $scope.waypoints.push([data.lat, data.lng]);
    //                         //         });
    //                         //         var origin = new google.maps.LatLng($scope.getPosition[0].lat, $scope.getPosition[0].lng);
    //                         //         var destination = new google.maps.LatLng($scope.getPosition[$scope.getPosition.length - 1].lat, $scope.getPosition[$scope.getPosition.length - 1].lng);
    //                         //         var getAccDistance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
    //                         //         $scope.steps = $scope.getPosition.length - 1;
    //                         //         $scope.duration = getPedoDuration();
    //                         //         $scope.distance = getAccDistance/1000;
    //                         //         $scope.calories = calsPerDay();
    //                         //     });
    //                         // } else {
    //                         //     //var log = 'Not WALKING';
    //                         //     console.log("Not WALKING");
    //                         //     // $scope.exception.push(log);
    //                         //     // if($scope.exception.length > 5){
    //                         //     //     $scope.$apply(function () {
    //                         //     //         $scope.pausePedometer();
    //                         //     //         $scope.notWalking = true;
    //                         //     //     }); 
    //                         //     // }
                                
    //                         // }
    //                 }
    //       function onError(err){
    //                     if (err.code == 1) {
    //                         alert("User denied geolocation.");
    //                     } else if (err.code == 2) {
    //                         alert("Position unavailable.");
    //                     } else if (err.code == 3) {
    //                         alert("Timeout expired.");
    //                     } else {
    //                         alert("ERROR:" + err.message);
    //                     }
    //       }

    //         function currentLocation() {
    //             if ($scope.Distance > 0 || $scope.Steps > 0 || $scope.Calories > 0 || $scope.Time_Duration > 0) {
    //                 if ($scope.Distance <= $scope.distance || $scope.Steps <= $scope.steps || $scope.Calories <= $scope.calories || $scope.Time_Duration <= $scope.duration) {
    //                     $scope.finishPedometer();
    //                 }
    //             } 
    //         }

    //         // function getPostion() {
    //         //     $scope.interval = $interval(function() {
    //         //         if (!$scope.isPaused) {
    //         //             currentLocation();
    //         //         }
    //         //     }, 1500);
    //         // }
               
                
    //         function getPostion(){
    //             watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
    //         }
    //         $scope.startPedometer = function() {
    //             $scope.hideStart = true;
    //             $scope.showPause = true;
    //             $scope.startPedo = true;
    //             $scope.isPaused = false;
    //             $scope.getStartTime = new Date();
    //             getPostion();
    //         }
    //         $scope.startAgainPedo = function() {
    //             $scope.isPaused = false;
    //             $scope.getPosition=[];
    //             $scope.exception=[];
    //             getPostion();
    //             $scope.notWalking = false;

    //         }
    //         $scope.closePopPedo = function() {
    //             $scope.steps = 0;
    //             $scope.calories = 0;
    //             $scope.duration = 0;
    //             $scope.distance = 0;
    //             $scope.getPosition = [];
    //             navigator.geolocation.clearWatch(watchID);
    //             $scope.hideStart = false;
    //             $scope.notWalking = false;
    //             $scope.showData = false;
    //             $scope.showResume = false;
    //             $scope.showPause = false;
    //         }
    //         $scope.pausePedometer = function() {
    //             $scope.showPause = false;
    //             $scope.showResume = true;
    //             $scope.startPedo = false;
    //             $scope.isPaused = true;
    //             navigator.geolocation.clearWatch(watchID);

    //         }
    //         $scope.resumePedometer = function() {
    //             $scope.showPause = true;
    //             $scope.showResume = false;
    //             $scope.startPedo = true;
    //             $scope.isPaused = false;
    //             navigator.geolocation.clearWatch(watchID);
    //             getPostion();
    //         }
    //         $scope.finishPedometer = function() {
    //             $scope.hideResult = true;
    //             $scope.hideStart = true;
    //             $scope.startPedo = false;
    //             $scope.showResume = false;
    //             $scope.showData = true;
    //             navigator.geolocation.clearWatch(watchID);
    //             $scope.isPaused = false;
    //             $scope.notWalking = false;
    //             $scope.showData = true;
    //             $scope.dateObj = new Date();
    //             var month = $scope.monthNames[$scope.dateObj.getMonth()]; //months from 1-12
    //             var getMonth = $scope.dateObj.getMonth() + 1;
    //             var printMonth = ('0' + getMonth).slice(-2);
    //             var day = ('0' + $scope.dateObj.getDate()).slice(-2);
    //             var year = $scope.dateObj.getFullYear();
    //             $scope.createdSendDate = day + "/" + printMonth + "/" + year;
    //             $scope.createdDate = day + "th" + " " + month + " " + year;
    //             $scope.startedTime = $scope.getStartTime.getHours() + ":" + $scope.getStartTime.getMinutes();
    //             $scope.endedTime = $scope.dateObj.getHours() + ":" + $scope.dateObj.getMinutes();
    //         }
    //         $scope.startNew = function(){
    //            var time = 0;
    //            $scope.hideResult = false;
    //            $scope.hideStart = false;

    //             $scope.startPedo = true;
    //             $scope.showResume = false;
    //             $scope.showData = false;
    //             $scope.mapView = true;
    //             $scope.steps = 0;
    //             $scope.calories = 0;
    //             $scope.duration = 0;
    //             $scope.distance = 0;
    //             $scope.getPosition = [];
    //             $scope.isPaused = false;
    //             $scope.notWalking = false;
    //             $scope.showData = false;
    //             $scope.totalDistance = [];
    //             $scope.waypoints = [];
    //             $scope.getpoint = 0;
    //             $scope.startPedometer();
    //         }
    //         $scope.pedoReports = function() {
    //             $scope.wayPoint = [];
    //             var origin = JSON.parse(JSON.stringify($scope.getPosition[0]));
    //             var destination = JSON.parse(JSON.stringify($scope.getPosition[$scope.getPosition.length - 1]));
    //             angular.forEach($scope.getPosition, function(data) {
    //                 var pos = JSON.parse(JSON.stringify(data));
    //                 var getDal = {
    //                     "lat": pos.lat,
    //                     "lng": pos.lng
    //                 };
    //                 $scope.wayPoint.push(getDal);
    //             });

    //             var getAll = {
    //                 "originLatitudeLongitude": {
    //                     "lat": origin.lat,
    //                     "lng": origin.lng
    //                 },
    //                 "destinationLatitudeLongitude": {
    //                     "lat": destination.lat,
    //                     "lng": destination.lng
    //                 },
    //                 "waypoints": $scope.wayPoint,
    //                 "distance": $scope.distance,
    //                 "duration": $scope.duration,
    //                 "steps": $scope.steps,
    //                 "calories": $scope.calories,
    //                 "startTime": $scope.startedTime,
    //                 "endTime": $scope.endedTime,
    //                 "createdDate": $scope.createdSendDate
    //             };
    //             PageService.passPedoRecord(getAll, function(response) {
    //                 if (response.status) {
    //                     $location.path('/pedo_report');
    //                 }
    //             });
    //         }
    //         $scope.storeWeight = function(weight) {
    //             $scope.$storage.userWeight = weight;
    //         }
    // };
    /*---------------------PedoMeter Report Page------------------------*/

    $scope.getPedoReports = function(date) {
        PageService.retrievePedoRecord(date, function(response) {
            if (response.data.length > 0) {
                $scope.passWaypoint = [];
                if (angular.isDefined(response.data[0].waypoints)) {
                    angular.forEach(response.data[0].waypoints, function(data) {
                        $scope.passWaypoint.push([data.lat, data.lng]);
                    });
                    $scope.getExactLocation = {
                        "destination": response.data[0].destinationLatitudeLongitude.lat + "," + response.data[0].destinationLatitudeLongitude.lng,
                        "wayPoint": $scope.passWaypoint,
                        "origin": response.data[0].originLatitudeLongitude.lat + "," + response.data[0].originLatitudeLongitude.lng
                    };
                    $scope.startTime = response.data[0].startTime;
                    $scope.endTime = response.data[0].endTime;
                    $scope.actDistance = response.data[0].distance;
                    $scope.actDuration = response.data[0].duration;
                    $scope.actCalories = response.data[0].calories;
                    $scope.actSteps = response.data[0].steps;
                }
            } else {
                $scope.getExactLocation = {
                        "destination": '',
                        "wayPoint": '',
                        "origin": ''
                };
                $scope.startTime = 0;
                $scope.endTime = 0;
                $scope.actDistance = 0;
                $scope.actDuration = 0;
                $scope.actCalories = 0;
                $scope.actSteps = 0;
            }
        });

    }
    $scope.selectedPedoDate = function(index, selected) {
        var currentMonth = new Date().getMonth();
        if($scope.choseMonth < currentMonth){
            $scope.activeDate = selected.date;
            $scope.getPedoReports(selected.dateFormat);
        }else{
            var currentDate = ('0' + new Date().getDate()).slice(-2);
            if (selected.date <= currentDate) {
                $scope.activeDate = selected.date;
                $scope.getPedoReports(selected.dateFormat);
            } 
            
        }
    }

    $scope.getPedoCurrentMonth = function() {
        var currentYr = new Date().getFullYear();
        var currentMonth = $scope.monthNames[new Date().getMonth()];
        var currentDate = new Date().getDate();
        $scope.activeMonth = currentMonth;
        $scope.viewpedoDates(new Date().getMonth(), currentMonth);
    }

    $scope.viewpedoDates = function(month, selected) {
        var currentYr = new Date().getFullYear();
        var currentMonth = new Date().getMonth();
        $scope.choseMonth = month;
        if (month <= currentMonth) {
            $scope.getView = getAllDates(currentYr, month);
            if (month === currentMonth) {
                var currentIndex = ('0' + new Date().getDate()).slice(-2);
                var currentDate = 0;
                angular.forEach($scope.getView, function(data) {
                    if (data.date == currentIndex) {
                        currentDate = data;
                    }
                    return currentDate;
                });
                $scope.selectedPedoDate(currentDate - 1, currentDate);

            } else {
                $scope.activeDate = '';
            }
            $scope.noDate = true;
            $scope.activeMonth = selected;
        }

    }

    /*--------------Reminder Screen--------------------*/

    $scope.reminderScreen = function() {
        $scope.remindSubmitBtn = $rootScope.my_data.reminder.submit;
        $scope.ismeridian = true;
        var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
        $scope.hstep = 1;
        $scope.mstep = 1;
        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };
        $scope.daysList = [{
                name: 'sunday',
                short: 'Sun',
                checked: false
            },
            {
                name: 'monday',
                short: 'Mon',
                checked: false
            },
            {
                name: 'tuesday',
                short: 'Tue',
                checked: false
            },
            {
                name: 'wednesday',
                short: 'Wed',
                checked: false
            },
            {
                name: 'thursday',
                short: 'Thu',
                checked: false
            },
            {
                name: 'friday',
                short: 'Fri',
                checked: false
            },
            {
                name: 'saturday',
                short: 'Sat',
                checked: false
            }
        ];

        $scope.changed = function() {
            console.log('Time changed to: ' + $scope.mytime);
        };

        $scope.closeDay = function() {
            $scope.showDaySelection = false;
        };

        $scope.createAlarm = function() {
            $scope.formFor = 'create';
            $scope.mytime = new Date();
            var getShortDate = new Date().toString().split(' ')[0];
            angular.forEach($scope.daysList, function(day) {
                day.checked = true;
            });
            $scope.showDaySelection = true;
        };

        $scope.editAlarm = function(passTime, index) {
            $scope.formFor = 'edit';
            $scope.clickedItem = index;
            $scope.mytime = new Date(passTime.alarm.alarmTime);
            angular.forEach($scope.daysList, function(days) {
                angular.forEach(passTime.alarm.alarmDays, function(data) {
                    if (data.short === days.short) {
                        days.checked = true;
                    }
                });
            });
            $scope.showDaySelection = true;
        };
        $scope.viewAlarms = function() {
            if (angular.isDefined($scope.$storage.alarms)) {
                if ($scope.$storage.alarms.length > 0) {
                    $scope.getremind = $scope.$storage.alarms;
                }
            }
        };
        $scope.closeAlarmPop = function() {
            cordova.plugins.notification.local.cancel([$scope.passModel], callback);
            $rootScope.viewAlarms = false;
        }
        $scope.setAlarms = function() {
            var notifyArr = [];
            angular.forEach($scope.$storage.alarms, function(day, MainIndex) {
                var now = new Date(day.alarm.alarmTime).getTime();
                var _1_sec_late = new Date(now + 1 * 1000).valueOf();
                var getAll = {
                    id: MainIndex + 1,
                    title: 'Hi',
                    text: 'It is your Ryzodeg Time',
                    foreground: true,
                    trigger: {
                        at: _1_sec_late,
                        every: 'day'
                    },

                    sound: sound
                };
                notifyArr.push(getAll);
            });
            cordova.plugins.notification.local.schedule(notifyArr);
            $scope.viewAlarms();
        };
        $scope.updateAlarms = function(updateTime) {
            var now = new Date(updateTime).getTime();
            var _1_sec_late = new Date(now + 1 * 1000).valueOf();
            cordova.plugins.notification.local.update({
                id: $scope.clickedItem + 1,
                title: 'Hi',
                text: 'It is your Ryzodeg Time',
                trigger: {
                    at: _1_sec_late,
                    every: 'day'
                },
                sound: sound
            });
            $scope.viewAlarms();
        };
        $scope.deleteAlarm = function(array, item) {
            const indexItem = $scope.getremind.indexOf(item);
            cordova.plugins.notification.local.cancel([indexItem + 1], callback);
            $scope.getremind.splice(indexItem, 1);
        };

        callback = function() {
            console.log('hi');
        };
        $scope.toggleMode = function() {
            $scope.ismeridian = !$scope.ismeridian;
        };

        $scope.clear = function() {
            $scope.mytime = null;
        };
        $scope.makeTrue = function(item) {
            if (!item.checked) {
                item.checked = true;
            } else {
                item.checked = false;
            }

        }
        $scope.alarmSet = function(formFor, time) {
            $scope.remindSubmitBtn = "Loading..";
            $scope.setAlarm = [];
            var alarmDay = [];
            var getHours = new Date(time).getHours();
            var getMin = new Date(time).getMinutes();
            angular.forEach($scope.daysList, function(data) {
                if (data.checked) {
                    alarmDay.push(data);
                }
            });
            var alarmdata = {
                alarm: {
                    alarmTime: time,
                    alarmDays: alarmDay
                }
            };
            if (formFor === 'create') {
                if (angular.isUndefined($scope.$storage.alarms)) {
                    $scope.setAlarm.push(alarmdata);
                    $scope.$storage.alarms = $scope.setAlarm;
                } else {
                    $scope.$storage.alarms.push(alarmdata);
                }
                $scope.remindSubmitBtn = "Alarm has been Set";
                $scope.setAlarms();

            } else if (formFor === 'edit') {
                $scope.$storage.alarms[$scope.clickedItem] = alarmdata;
                $scope.remindSubmitBtn = "Alarm has been Updated";
                $scope.updateAlarms(time);
            }
            $timeout(function() {
                $scope.closeDay();
                $scope.remindSubmitBtn = "Submit";
            }, 500);
        }
        $('body').on('click', '.tabs li a', function(e) {
            var getId = $(this).parents('li').attr('id');
            $('.tabs li').removeClass('active');
            $(this).parents('li').addClass('active');
            $('.tab_container > div').removeClass('active');
            $('.tab_container').find('.' + getId).addClass('active');
            e.preventDefault();
        });

        $('body').on('click', '.time button.moveDate', function() {
            $('.tabs li#days a').trigger('click');
        });
    }
    /*---------------------------------------------------------------------------*/
    $('.selectGoalTyp > span').on('click', function() {
        $('.pagePedometer').addClass('active');
    });
    $(".goalOverlay").on('click', function() {
        $('.pagePedometer').removeClass('active');
    });
    $(".goalValues ul li input").on('click', function() {
        var getValue = $(this).siblings('a').html();

        if (getValue == 'Time/Duration') {
            $("h-number").removeAttr('style');
            $("#Time_Duration").css({ 'display': "block" });
        } else {
            $("h-number").removeAttr('style');
            $("#" + getValue).css({ 'display': "block" });
        }
        $('.goalValues input').not(this).prop('checked', false);
        $('.selectGoalTyp span').html($(this).val());
        $('.pagePedometer').removeClass('active');
    });

    var start = new Date().getTime();
    $scope.$on('htmlRendered', function(event, data) {
        //var end = new Date().getTime();
        //var time = end - start;       
        //console.log(time);
        $timeout(function() {
            $scope.isRendered = true;
        }, 0);
    });
}]);

pageModule.directive('myMenu', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/pages/directive_menu.html'
    };
});

pageModule.directive('compileTemplate', function($compile, $parse) {
    return {
        link: function(scope, element, attr) {
            var parsed = $parse(attr.ngBindHtml);

            function getStringValue() { return (parsed(scope) || '').toString(); }

            //Recompile if the template changes
            scope.$watch(getStringValue, function() {
                $compile(element, null, -9999)(scope); //The -9999 makes it skip directives so that we do not recompile ourselves
            });
        }
    }
});

pageModule.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault();
                });
            }
        }
    };
});

var videoModule = angular.module('videoModule', ['ngRoute']);
videoModule.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/home_videos/:name', {
        title: 'Videos',
        templateUrl: 'app/pages/videos.html',
        controller: 'VideoController'
    });
}]);
videoModule.controller('VideoController', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
    $scope.video = 'videos/' + $routeParams.name + '.mp4';
}]);
"use strict";
var novomixApp = angular.module('novomixApp', ['ngRoute', 'ngProgress', 'userModule', 'pageModule', 'videoModule', 'ngStorage']);
//$locationProvider.html5Mode(true).hashPrefix('!');
novomixApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}]);
novomixApp.factory('authHttpResponseInterceptor', ['$q', '$location', '$rootScope', function($q, $location, $rootScope) {
    return {
        response: function(response) {
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                $location.path('/401');
            } else if (rejection.status === 400) {
                $location.path('/400');
            } else if (rejection.status >= 500) {
                $location.path('/500');
            }
            return $q.reject(rejection);
        }
    }
}]);
/*check the local session*/
novomixApp.run(['$rootScope', '$location', '$localStorage', function($rootScope, $location, $localStorage) {
    $rootScope.$storage = $localStorage;
    if ($rootScope.$storage.isLoggedIn) {
        $rootScope.isLoggedIn = true;
        $location.path('/menu');
    } else {
        $rootScope.isLoggedIn = false;
        if ($rootScope.$storage.lang) {
            $location.path('/login');
        } else {
            $location.path('/language');
        }

    }
}]);

novomixApp.filter('unsafe', ['$sce', function($sce) {
    return $sce.trustAsHtml;
}]);

//use route change event to get active page
novomixApp.run(['$location', '$rootScope', 'ngProgressFactory', function($location, $rootScope, ngProgressFactory) {
    $rootScope.progressbar = ngProgressFactory.createInstance();
    $rootScope.title = '';
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        if (angular.isDefined(current.$$route)) {
            $rootScope.title = current.$$route.title;
        }

        $rootScope.isActive = function(path) {
            return ($location.path().substr(0, path.length) === path) ? true : false;
        }
        $rootScope.progressbar.complete();
    });
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.progressbar.start();
    });
    $rootScope.$on('$routeChangeError', function() {
        $rootScope.progressbar.reset();
    });
}]);
novomixApp.factory('LanguageService', ['$http', function($http) {
    var getData = function() {
        return $http.get('json/languages.json').then(function(result) {
            return result;
        });
    };
    return { getData: getData };
}]);
novomixApp.factory('ContentService', ['$http', function($http) {
    var getData = function(lang) {
        var lang = lang || 'eng';
        return $http.get('json/' + lang + '.json').then(function(result) {
            return result;
        });
    };
    return { getData: getData };
}]);
novomixApp.directive('backButton', ['$window', '$location', '$route', '$interval', function($window, $location, $route, $interval) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                if ($route.current.title) {
                    $interval.cancel(scope.interval);
                    scope.mapView = false;
                }
                $window.history.back();
            });
        }
    };
}]);
var app = {
    // Application Constructor
    initialize: function() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['novomixApp']);
        });
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //setTimeout(function() {
            //navigator.splashscreen.hide();
        //}, 1000);
      
        // Permission Check
        var permissions = cordova.plugins.permissions;

        var list = [
            permissions.ACCESS_COARSE_LOCATION,
            permissions.ACCESS_FINE_LOCATION,
            permissions.ACCESS_LOCATION_EXTRA_COMMANDS
        ];

        permissions.checkPermission(list, function(status) {
            if (!status) {
                permissions.requestPermission(list, success, error);
            }
        });

        function success(status) {
            if (!status.checkPermission) error();
        }

        function error() {
            console.warn('Location permission is not turned on');
        }

        cordova.plugins.notification.local.hasPermission(function(granted) {
            if (granted) {} else {
                cordova.plugins.notification.local.registerPermission(function(granted) {
                    console.log('granted' + granted);
                });
            }
        });

        cordova.plugins.notification.local.on("click", function(notification) {
            console.log("triggered: " + notification.id);
        });

        /*-----------------------Device BackButton -------------------*/

        document.addEventListener("backbutton", function(e) {
            if (window.location.hash == '#/menu' || window.location.hash == '#/home') {
                e.preventDefault();
                navigator.app.exitApp();
            } else {
                navigator.app.backHistory();
            }
            cordova.plugins.backgroundMode.overrideBackButton();
            cordova.plugins.backgroundMode.on('activate', function(data) {
                if (data === null) {
                    cordova.plugins.backgroundMode.setEnabled(true);
                }
                alert(data);
            });
            cordova.plugins.backgroundMode.on('deactivate', function(data) {
                if (data === null) {
                    cordova.plugins.backgroundMode.setEnabled(true);
                }
                alert(data);
            });
        }, false);

        /*------------------------------------------------------------------*/
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {


    }
};
app.initialize();

//# sourceMappingURL=app.js.map