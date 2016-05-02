angular.module('angular-aui-directives', [])
.directive('auiDatePicker', [function() {
    function link(scope, element, attrs, ngModelCtrl) {
        AJS.$(element).datePicker({
          overrideBrowserDefault: true,
          onSelect: function(newValue) {
            scope.$apply(function() {
            // model doesn't get updates  when `overrideBrowserDefault` = true
                ngModelCtrl.$setViewValue(newValue);
            });
          }
        });
    }
    return {
        require: 'ngModel',
        link: link
    };
}])
.directive('auiInlineDialog', ['$compile', function($compile) {
    var dialogContent;
    function link(scope, element, attrs) {
        var dialog = AJS.InlineDialog(AJS.$(element), 1,
          function(content, trigger, showPopup) {
            content.html(dialogContent);
            showPopup();
            return false;
        }, scope.$eval(attrs.options));
        scope.$hide = dialog.hide.bind(dialog);
        scope.$refresh = dialog.refresh.bind(dialog);
        scope.$show = dialog.show.bind(dialog);
    }
    function controller($scope) {
        this.drawContent = function(html) {
            dialogContent = $compile(html)($scope);
        };
    }
    return {
        controller: controller,
        link: link
    };
}])
.directive('auiInlineDialogContent', ['$timeout', function($timeout) {
    function link(scope, element, attrs, inlineDialogCtrl) {
        inlineDialogCtrl.drawContent(element[0].innerHTML);
        element.css('display', 'none');
    }
    return {
        require: '^auiInlineDialog',
        link: link
    };
}])
.directive('auiSelect2', [function() {
    function link($scope, element, attrs, ngModelCtrl) {
        AJS.$(element).auiSelect2();
        ngModelCtrl.$render = function() {
            AJS.$(element).select2('data', ngModelCtrl.$viewValue);
        };
        AJS.$(element).on('change', function(value) {
            $scope.$apply(function() {
                ngModelCtrl.$setViewValue(JSON.parse(value.val));
            });
        });
    }
    return {
        require: 'ngModel',
        link: link
    };
}])
.directive('auiToggle', [function() {
    function link($scope, element, attrs, ngModelCtrl) {
        var theScope = $scope.$parent;
        angular.forEach(element, function(toggle) {

            if(attrs.checked) {
                theScope.$watch(attrs.checked, function(changed) {
                    toggle.checked = changed;
                });
                var checked = theScope.$eval(attrs.checked);
                if(!checked)
                    toggle.removeAttribute("checked");
                toggle.checked = theScope.$eval(checked) ? true : false;
            }
            if(attrs.disabled) {
                theScope.$watch(attrs.disabled, function(changed) {
                    toggle.disabled = changed;
                });
                var disabled = theScope.$eval(attrs.disabled);
                if(!disabled)
                    toggle.removeAttribute("disabled");
                toggle.disabled = theScope.$eval(disabled) ? true : false;
            }

            toggle.addEventListener('change', function(e) {
                var isChecked = toggle.checked;
                if(toggle.getAttribute("checked") == null) {
                    theScope.$apply(function() {
                        theScope.$eval(attrs.checked + ' = false');
                    });
                } else {
                    theScope.$apply(function() {
                        theScope.$eval(attrs.checked + ' = true');
                    });
                }
            });
        });
    }
    return {
        restrict: 'E',
        link: link,
        scope: {
            label: '=',
            checked: '=',
            disabled: '=',
            value: '='
        }
    };
}]);