(function () {
    'use strict';
    angular
      .module('backend')
      .factory('tagsService', tagsService);
    
    function tagsService($http, $resource) {
        var tag = $resource('/app/tags/:id', {id: '@_id'}, {'update': {method: 'PUT'}});
        
        var getTag = function (id) {
            return tag.get({id: id}).$promise;
        };
        
        var getTags = function () {
            return tag.query().$promise;
        };
        
        var saveTag = function (tagData) {
            if (!tagData._id) {
                return tag.save(tagData).$promise;
            } else {
                return tag.update({id: tagData._id}, tagData).$promise;
            }
        };
        
        var deleteTag = function (id) {
            return tag.remove({id: id}).$promise;
        };
        
        return {
            getTag: getTag,
            getTags: getTags,
            saveTag: saveTag,
            deleteTag: deleteTag
        };
    }
})();