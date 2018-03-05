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

describe('Test publication info with doi filter', function() {
  beforeEach(angular.mock.module('inspirehepSearch.filters'));
  beforeEach(angular.mock.module('ngSanitize'));

  it('should return empty when no input passed',
    inject(function(publicationInfoDoiFilter) {
      var publicationInfoDoi = undefined;
      expect(publicationInfoDoiFilter(publicationInfoDoi)).to.be.equal(undefined);
    })
  );

  it('should return a journal info linked to doi',
    inject(function(publicationInfoDoiFilter) {
      var doi = [{value:"10.1088/0954-3899/41/5/055009"}];
      var display = {
          "publication_info": [
            {
              "artid": "055009",
              "journal_issue": "",
              "journal_title": "J.Phys.",
              "journal_volume": "G41",
              "page_end": "",
              "page_start": "",
              "pubinfo_freetext": "",
              "year": "2014"
            }
          ]
      }
      expect(publicationInfoDoiFilter(doi, display['publication_info'])).to.be.equal('Published in <a href="https://doi.org/10.1088/0954-3899/41/5/055009" title="DOI"><span class="text-left"><i>J.Phys.</i> G41 (2014) 055009</span></a>');
    })
  );

  it('should return a journal info linked to doi and the conference info followed',
    inject(function(publicationInfoDoiFilter) {
      var doi = [{"source":"IEEE","value":"10.1109/NSSMIC.2007.4436620"}];
      var display = {
        "publication_info": [
          {
            "artid": "055009",
            "journal_issue": "",
            "journal_title": "IEEE Nucl.Sci.Symp.Conf.Rec.",
            "journal_volume": "3",
            "page_end": "2372",
            "page_start": "2368",
            "pubinfo_freetext": "",
            "year": "2007"
          }
        ],
      "conference_info": [
        {
          "artid": null,
          "conference_recid": "977661",
          "conference_title": "2007 IEEE Nuclear Science Symposium and Medical Imaging Conference",
          "page_end": "",
          "page_start": "",
          "parent_recid": "1343838",
          "parent_title": ""
        }
      ]
    }

      expect(publicationInfoDoiFilter(doi, display['publication_info'], display['conference_info'])).to.be.equal('Published in <a href="https://doi.org/10.1109/NSSMIC.2007.4436620" title="DOI"><span class="text-left"><i>IEEE Nucl.Sci.Symp.Conf.Rec.</i> 3 (2007) 2368-2372</span></a> (<a href="/record/1343838">Proceedings</a> of <a href="/record/977661">' +
        '2007 IEEE Nuclear Science Symposium and Medical Imaging Conference</a>)');
    })
  );
});
