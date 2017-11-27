var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
	$routeProvider
		.when('/view1', {
			templateUrl: 'page1.html',
			controller: 'homeController'
		})
        .when('/view2', {
			templateUrl: 'page2.html',
			controller: 'homeController'
		})
		.otherwise({
			redirectTo: '/view1'
		});
});

myApp.directive('demoFileModel', function ($parse) {
        return {
            restrict: 'A', //the directive can be used as an attribute only
 
            /*
             link is a function that defines functionality of directive
             scope: scope associated with the element
             element: element on which this directive used
             attrs: key value pair of element attributes
             */
            link: function (scope, element, attrs) {
                var model = $parse(attrs.demoFileModel),
                    modelSetter = model.assign; //define a setter for demoFileModel
 
                //Bind change event on the element
                element.bind('change', function () {
                    //Call apply on scope, it checks for value changes and reflect them on UI
                    scope.$apply(function () {
                        //set the model value
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    });