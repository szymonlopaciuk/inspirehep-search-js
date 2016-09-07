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
    inject(function(journalFormatFilter) {
      var publicationInfo = undefined;
      expect(journalFormatFilter(publicationInfo)).to.be.equal(undefined);
    })
  );

  it('should return publication info line',
    inject(function(journalFormatFilter) {
      var display = {
          "publication_info": [
            {
              "artid": "055009",
              "journal_issue": "12",
              "journal_title": "Int.J.Theor.Phys.",
              "journal_volume": "38",
              "page_end": "1133",
              "page_start": "1113",
              "pubinfo_freetext": "",
              "year": "1999"
            }
          ]
      }

      expect(journalFormatFilter(display['publication_info'][0])).to.be.equal('<i>Int.J.Theor.Phys.</i> 38 (1999) 12, 1113-1133');
    })
  );

  it('should return publication info line with only start page',
    inject(function(journalFormatFilter) {
      var display = {
          "publication_info": [
            {
              "artid": "055009",
              "journal_issue": "12",
              "journal_title": "Int.J.Theor.Phys.",
              "journal_volume": "38",
              "page_end": "",
              "page_start": "1113",
              "pubinfo_freetext": "",
              "year": "1999"
            }
          ]
      }

      expect(journalFormatFilter(display['publication_info'][0])).to.be.equal('<i>Int.J.Theor.Phys.</i> 38 (1999) 12, 1113');
    })
  );

  it('should return publication info freetext',
    inject(function(journalFormatFilter) {
      var display = {
          "publication_info": [
            {
              "artid": "055009",
              "journal_issue": "12",
              "journal_title": "",
              "journal_volume": "38",
              "page_end": "",
              "page_start": "1113",
              "pubinfo_freetext": "Phys. Rev. 127 (1962) 965-970",
              "year": "1999"
            }
          ]
      }

      expect(journalFormatFilter(display['publication_info'][0])).to.be.equal('Phys. Rev. 127 (1962) 965-970');
    })
  );


});
