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

  function publicationInfoDoiFilter(conferenceFormatFilter, journalFormatFilter) {
    return function(input, pub_info, conference_info) {
      if (input === undefined) {
        return;
      }

      var pub_info_and_doi = 'Published in ';
      pub_info_and_doi += '<a href="http://dx.doi.org/' + input[0].value + '" title="DOI">'  +
          '<span class="text-left">' + journalFormatFilter(pub_info[0]) + '</span>' + '</a>';

      if (conference_info) {
        var formatted_conference = '';
        var i, len;
        for (i = 0, len = conference_info.length; i < len; i++) {
          formatted_conference = conferenceFormatFilter(conference_info[i], true);
          if (formatted_conference) {
            pub_info_and_doi += formatted_conference;
            break;
          }
        }
      }

      return pub_info_and_doi;
    };
  }

  angular.module('inspirehepSearch.filters.publicationInfoDoi', [])
    .filter('publicationInfoDoi',
      [
        'conferenceFormatFilter',
        'journalFormatFilter',
        publicationInfoDoiFilter
      ]);

})(angular);
