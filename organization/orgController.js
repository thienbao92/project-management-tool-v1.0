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


.controller('orgCtrl', function ($scope, firebaseOrg, firebaseProject, firebaseGroupMember, firebaseUrl, organization) {

    $scope.organization = firebaseOrg;
    $scope.groupMember = firebaseGroupMember;
    var userId = $scope.id;
    console.log(userId);
    var ref = new Firebase(firebaseUrl + '/users/' + userId + '/groupMember');


    //thu nghiem load org data

    $scope.organization.$loaded(function () {

        var groupArray = new Array();
        ref.on("value", function (snapshot) {

            snapshot.forEach(function (data) {
              groupArray.push(data.key());


            })

            console.log(groupArray);


            var getOrgValue = new Array();
            angular.forEach($scope.organization, function (org) {

                angular.forEach(groupArray, function (groupId) {
                  if (org.$id === groupId) {
                    getOrgValue.push(org);
                    console.log(getOrgValue);
                    $scope.getOrg = getOrgValue;
                  }
                })



              }) //end forEach

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

        //        $scope.groupMember.$add({
        //          organizationId: orgId,
        //          member: $scope.id
        //        })
      })
    }; //end function addOrg


    console.log($scope.organization);
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
