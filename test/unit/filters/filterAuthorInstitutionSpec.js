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

describe('Test author institution info filter', function() {
  beforeEach(angular.mock.module('inspirehepSearch.filters'));
  beforeEach(angular.mock.module('ngSanitize'));

  it('should return empty when no input passed',
    inject(function(authorInstitutionFilter) {
      var positions = undefined;
      expect(authorInstitutionFilter(positions)).to.be.equal(undefined);
    })
  );

  it('should return the first institution when no current',
    inject(function(authorInstitutionFilter) {
      var positions =  [
        {
        'curated_relation': false,
        'email': 'test@cern.ch'
        },
        {
        '_rank': 'SENIOR',
        'curated_relation': false,
        'institution': {
        'name': 'Princeton U.'
        },
        'rank': 'SENIOR',
        'start_date': '2006'
        },
        {
        '_rank': 'JUNIOR',
        'curated_relation': false,
        'end_date': '2006',
        'institution': {
        'name': 'CERN'
        },
        'rank': 'JUNIOR',
        'start_date': '2000'
        }
      ]
      expect(authorInstitutionFilter(positions)).to.be.equal('(Princeton U.)');
    })
  );

  it('should return the current institution',
    inject(function(authorInstitutionFilter) {
      var positions =  [
        {
        'curated_relation': false,
        'email': 'test@cern.ch'
        },
        {
        '_rank': 'SENIOR',
        'curated_relation': false,
        'institution': {
        'name': 'Princeton U.'
        },
        'rank': 'SENIOR',
        'start_date': '2006'
        },
        {
        '_rank': 'JUNIOR',
        'curated_relation': false,
        'end_date': '2006',
        'institution': {
          'name': 'CERN'
        },
        'status': 'current',
        'rank': 'JUNIOR',
        'start_date': '2000'
        }
      ]
      expect(authorInstitutionFilter(positions)).to.be.equal('(CERN)');
    })
  );
});
