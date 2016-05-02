angular.module('angular-aui-examples', ['angular-aui'])
.controller('DatePickerCtrl', function() {})
.controller('InlineDialogCtrl', function($scope) {
    $scope.name = 'John Dou';
})
.controller('Select2Ctrl', function($scope) {
  $scope.countries = [{id: 'USA', text:'USA'}, {id: 'Ukraine', text:'Ukraine'}, {id: 'Austria', text:'Austria'}, {id: 'Thailand', text:'Thailand'}];
  $scope.selectedCountry = $scope.countries[0];
})
.controller('ToggleCtrl', function($scope) {
  $scope.toggle1 = { label: "Toggle Label 2", checked: true, disabled: false};
  $scope.toggle2 = { label: "Toggle Label 2", checked: false, disabled: true};
});