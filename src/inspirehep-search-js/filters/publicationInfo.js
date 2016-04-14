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
  
  function publicationInfoFilter() {
    return function(input) {
      if (input === undefined) {
        return;
      }

      var pub_info = '';
      if (input['pub_info']) {
        pub_info = 'Published in ' + input['pub_info'].join(' and ');
        
      }
      if (input['conf_info']) {
        pub_info += ' ' + input['conf_info'];
      }

      return pub_info;
    };
  }

  angular.module('inspirehepSearch.filters.publicationInfo', [])
    .filter('publicationInfo', publicationInfoFilter);

})(angular);
