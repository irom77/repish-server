/**
 * Created by irekromaniuk on 9/20/2015.
 */
angular.module('directives', [])
    .directive('clickOnce', function ($timeout) {
        /*<button click-once>Button just disables</button>
         <button click-once="Updating...">Text changes and button disables</button>*/
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var replacementText = attrs.clickOnce;

                element.bind('click', function () {
                    $timeout(function () {
                        if (replacementText) {
                            element.html(replacementText);
                        }
                        element.attr('disabled', true);
                    }, 0);
                });
            }
        };
    })
    .directive('loading', ['$http', function ($http) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var oldNgClick = attrs.ngClick;
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (value) {
                    if (value) {
                        element.attr("disabled", "disabled");
                        $(element).click(function (event) {
                            event.preventDefault();
                        });

                    } else {

                        if (oldNgClick) {
                            attrs.$set('ngClick', oldNgClick);
                            element.bind('click', function () {
                                scope.$apply(attrs.ngClick);
                            });
                        } else {
                            $(element).unbind('click');
                        }
                        element.removeAttr("disabled");

                    }
                });
            }
        };

    }]);
