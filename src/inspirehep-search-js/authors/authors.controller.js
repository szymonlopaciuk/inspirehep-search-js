/*
 * This file is part of INSPIRE.
 * Copyright (C) 2016 CERN.
 *
 * INSPIRE is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * INSPIRE is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with INSPIRE; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 *
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
 */

(function(angular) {

  function authorCtrl($scope) {
    var vm = this; 
      
    vm.getAuthors = getAuthors;
    vm.splitAuthorName = splitAuthorName;
    vm.renderAuthorNames = renderAuthorNames;

    function getAuthors() {
      var authors_list = [];
      if (vm.authors !== undefined) {
        for (var i=0; i<vm.authors.length; i++) {
          if (vm.authors[i].full_name) {
            authors_list.push(renderAuthorNames(vm.authors[i]));
          }
        } 
        return authors_list;
      }
    }

    function splitAuthorName(authorName) {
      var new_name = authorName.split(',');
      var reversed = new_name.reverse();
      return reversed.join(' ');
    }

    function renderAuthorNames(author) {
      var obj_author = {};
      obj_author.full_name = author.full_name;
      if (author.affiliations !== undefined && author.affiliations.length > 0) {
          obj_author.affiliation = author.affiliations[0].value;
      }
      return obj_author;
    }

  }

  authorCtrl.$inject = ['$scope'];

  angular.module('authors.controllers', [])
    .controller('authorCtrl', authorCtrl);

})(angular);
