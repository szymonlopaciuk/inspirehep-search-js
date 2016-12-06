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

  function publicationInfoFilter(conferenceFormatFilter, journalFormatFilter) {
    return function(input, conference_info) {
      if (input === undefined) {
        return;
      }

      var pub_info = '';
      var formatted_journals = [];
      var i, len;
      for (i = 0, len = input.length; i < len; i++) {
        if (input[i]['journal_title']) {
          formatted_journals.push(journalFormatFilter(input[i]));
        }
      }

      if (formatted_journals) {
          pub_info = formatted_journals.join(' and ');
      }

      var formatted_conference = '';
      if (conference_info) {
        for (i = 0, len = conference_info.length; i < len; i++) {
          formatted_conference = conferenceFormatFilter(
            conference_info[i],
            formatted_journals.length
          );
          if (formatted_conference) {
              pub_info += ' ' + formatted_conference;
          }
        }
      }

      if (pub_info && formatted_journals.length) {
        return 'Published in ' + pub_info;
      }
      else {
        return pub_info;
      }
    };
  }

  angular.module('inspirehepSearch.filters.publicationInfo', [])
    .filter('publicationInfo',
      [
        'conferenceFormatFilter',
        'journalFormatFilter',
        publicationInfoFilter
      ]);

})(angular);
