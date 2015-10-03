/**
 * checkList.TaskServices Module
 *
 * Description
 */

angular.module('checkList.TaskServices', [])

.factory('firebaseCheckList', function (firebaseUrl, $firebaseArray, $stateParams) {
    return function (listId, taskId) {
      var url = firebaseUrl + '/task/' + listId + '/' + taskId + '/checklist';
      var ref = new Firebase(url);
      var checklist = $firebaseArray(ref);
      return checklist;
    }
  }) // END firebaseCheckList

.service('taskCheckList', function (
  firebaseCheckList,
  getTask, //taskServices.js
  $stateParams
) {

  this.modifyCheckList = function (listId, taskId) {
      var checklist = firebaseCheckList(listId, taskId);
      var tasks = getTask(listId, taskId);
      checklist.$watch(function () {
        checklist.$loaded().then(function (checklists) {
          var total = checklists.length;
          var count = 0;
          angular.forEach(checklists, function (cl) {
            if (cl.isDone) {
              count += 1;
            }
          });

          var percentage = (count / total) * 100;
          var items = tasks.$getRecord($stateParams.taskId);

          items.percentOfChecklist = percentage;
          tasks.$save(items);
        })

      });
    } //End function modifyChecklist
})
