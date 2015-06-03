/**
 * organization.Controller Module
 *
 * Description
 */

angular.module('organization.Controller', [])

.directive('showFocus', function ($timeout) {
  return function (scope, element, attrs) {
    scope.$watch(attrs.showFocus,
      function (newValue) {
        $timeout(function () {
          newValue && element.focus();
        });
      }, true);
  };
})


.controller('orgCtrl', function ($scope, firebaseOrg, firebaseProject, firebaseUrl, organization) {

    $scope.organization = firebaseOrg;

    var userId = $scope.id;
    var ref = new Firebase(firebaseUrl + '/users/' + userId + '/groupMember');




    //load org data and filter by
    $scope.getOrg = [];
    $scope.organization.$loaded().then(function (orgData) {
        var getOrgValue = new Array();

        ref.on("value", function (snapshot) {

            snapshot.forEach(function (data) {
                angular.forEach(orgData, function (org) {
                    if (org.$id === data.key()) {
                      $scope.getOrg.push(org); //Push to array

                    }
                  }) //end forEach organization
              }) // end forEach snapshot
          }) // end ref on function
      }) // End $load function
      //Endthu nghiem load org data





    $scope.addOrg = function () {
      $scope.organization.$add({
        name: $scope.orgName,
        owner: $scope.id
      }).then(function (data) {
        var orgId = data.key();
        organization.addMemberToGroup(orgId, $scope.id);

      })
    }; //end function addOrg


    //add project area

    $scope.projectData = {};
    $scope.project = firebaseProject;

    $scope.addProject = function (uid) {
        $scope.project.$add({
          projectName: $scope.projectData.name,
          org: uid
        })
      } //end function addProject

  }) //End orgCtrl
