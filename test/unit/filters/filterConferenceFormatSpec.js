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

'use strict';

describe('Test conference format filter', function() {
  beforeEach(angular.mock.module('inspirehepSearch.filters'));
  beforeEach(angular.mock.module('ngSanitize'));

  it('should return empty when no input passed',
    inject(function(conferenceFormatFilter) {
      var publicationInfo = undefined;
      expect(conferenceFormatFilter(publicationInfo)).to.be.equal(undefined);
    })
  );

  it('should return conference info with pages when no pub info',
    inject(function(conferenceFormatFilter) {
      var display = {
        "conference_info": [
          {
            "artid": null,
            "conference_recid": "977661",
            "conference_title": "2007 IEEE Nuclear Science Symposium and Medical Imaging Conference",
            "page_end": "52",
            "page_start": "48",
            "parent_recid": "1343838",
            "parent_title": ""
          }
        ]
      }
      expect(conferenceFormatFilter(display['conference_info'][0])).to.be.equal('Published in <a href="/record/1343838">proceedings</a> of <a href="/record/977661">2007 IEEE Nuclear Science Symposium and Medical Imaging Conference</a>, pages 48-52');
    })
  );

  it('should return conference info with no pages when no pub info',
    inject(function(conferenceFormatFilter) {
      var display = {
        "conference_info": [
          {
            "artid": "E2345",
            "conference_recid": "977661",
            "conference_title": "2007 IEEE Nuclear Science Symposium and Medical Imaging Conference",
            "page_end": "",
            "page_start": "",
            "parent_recid": "1343838",
            "parent_title": ""
          }
        ]
      }
      expect(conferenceFormatFilter(display['conference_info'][0])).to.be.equal('Published in <a href="/record/1343838">proceedings</a> of <a href="/record/977661">2007 IEEE Nuclear Science Symposium and Medical Imaging Conference</a>');
    })
  );

  it('should return conference info with no pages when pub info is present',
    inject(function(conferenceFormatFilter) {
      var display = {
        "conference_info": [
          {
            "artid": "",
            "conference_recid": "977661",
            "conference_title": "2007 IEEE Nuclear Science Symposium and Medical Imaging Conference",
            "page_end": "14",
            "page_start": "12",
            "parent_recid": "1343838",
            "parent_title": ""
          }
        ]
      }
      expect(conferenceFormatFilter(display['conference_info'][0], true)).to.be.equal(' (<a href="/record/1343838">Proceedings</a> of <a href="/record/977661">2007 IEEE Nuclear Science Symposium and Medical Imaging Conference</a>)');
    })
  );


  it('should return contribution info with break line when pub info is present',
    inject(function(conferenceFormatFilter) {
      var display = {
        "conference_info": [
          {
            "artid": "",
            "conference_recid": "977661",
            "conference_title": "2007 IEEE Nuclear Science Symposium and Medical Imaging Conference",
            "page_end": "14",
            "page_start": "12",
            "parent_recid": "",
            "parent_title": ""
          }
        ]
      }

      expect(conferenceFormatFilter(display['conference_info'][0], true)).to.be.equal('<br>Contribution to <a href="/record/977661">2007 IEEE Nuclear Science Symposium and Medical Imaging Conference</a>');
    })
  );


  it('should return contribution info without break line when no pub info is present',
    inject(function(conferenceFormatFilter) {
      var display = {
        "conference_info": [
          {
            "artid": "",
            "conference_recid": "977661",
            "conference_title": "2007 IEEE Nuclear Science Symposium and Medical Imaging Conference",
            "page_end": "14",
            "page_start": "12",
            "parent_recid": "",
            "parent_title": ""
          }
        ]
      }

      expect(conferenceFormatFilter(display['conference_info'][0])).to.be.equal('Contribution to <a href="/record/977661">2007 IEEE Nuclear Science Symposium and Medical Imaging Conference</a>');
    })
  );

  it('should return publication info with prefix text when no pub info is present',
    inject(function(conferenceFormatFilter) {
      var display = {
        "conference_info": [
          {
            "artid": "",
            "conference_recid": "",
            "conference_title": "",
            "page_end": "14",
            "page_start": "12",
            "parent_recid": "977661",
            "parent_title": "2007 IEEE Nuclear Science Symposium and Medical Imaging Conference"
          }
        ]
      }

      expect(conferenceFormatFilter(display['conference_info'][0])).to.be.equal('Published in <a href="/record/977661">proceedings</a> of 2007 IEEE Nuclear Science Symposium and Medical Imaging Conference');
    })
  );

  it('should return publication info without prefix text when pub info is present',
    inject(function(conferenceFormatFilter) {
      var display = {
        "conference_info": [
          {
            "artid": "",
            "conference_recid": "",
            "conference_title": "",
            "page_end": "14",
            "page_start": "12",
            "parent_recid": "977661",
            "parent_title": "2007 IEEE Nuclear Science Symposium and Medical Imaging Conference"
          }
        ]
      }

      expect(conferenceFormatFilter(display['conference_info'][0], true)).to.be.equal(' (<a href="/record/977661">Proceedings</a> of 2007 IEEE Nuclear Science Symposium and Medical Imaging Conference)');
    })
  );

});
