/**
 * member.taskServices Module
 *
 * Description : services container saving task services
 */

angular.module('member.taskServices', [])
  .factory('taskMemberFactory', function (Firebase, firebaseUrl) {
    return function (listId, taskId) {
      var ref = new Firebase(firebaseUrl + '/task/' + listId + '/' + taskId + '/member');
      return ref
    }
  })


.service('taskMember', function ($stateParams, firebaseUrl, $firebaseObject, $firebaseArray, taskMemberFactory) {
    this.addMember = function (listId, taskId, memberId) {
      var taskMemberRef = taskMemberFactory(listId, taskId);
      taskMemberRef.child(memberId).set(true);
    }; //End function

    this.memberArray = function (listId, taskId) {
        var taskMemberArray = [];
        var ref = taskMemberFactory(listId, taskId);

        var obj = $firebaseArray(ref);
        //        obj.$loaded().then(function () {
        //          angular.forEach(obj, function (value, key) {
        //            taskMemberArray.push(value.$id);
        //          })
        //        })
        obj.$watch(function (event) {
          if (event.event === "child_added") {
            taskMemberArray.push(event.key);
          }
          if (event.event === "child_removed") {
            var deletedValue = event.key;
            var value = taskMemberArray.indexOf(event.key);
            taskMemberArray.splice(value, 1);
          }
        });
        return taskMemberArray;
      } //End function
  }) //End service task Member

.service('projectMember', function (firebaseUrl, $firebaseArray, $stateParams) {
  var taskId = $stateParams.projectId;
  var url = firebaseUrl + '/projectMember/' + taskId;
  var ref = new Firebase(url);
  var projectMember = $firebaseArray(ref);
  //var projectMember = firebaseMember;

  this.projectMemberArray = function () {
      var array = [];
      projectMember.$watch(function (event) {
        angular.forEach(projectMember, function (value, key) {
          array.push(value.$id);
        })

        if (event.event === "child_removed") {
          var deletedValue = event.key;
          var value = array.indexOf(event.key);
          array.splice(value, 1);
        }
      });
      return array;
    } // End projectMemberArray

})
