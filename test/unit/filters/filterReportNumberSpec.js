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

describe('Test report number filter', function() {
  beforeEach(angular.mock.module('inspirehepSearch.filters'));
  beforeEach(angular.mock.module('ngSanitize'));

  it('should return empty when no input passed',
    inject(function(reportNumberFilter) {
      var reportNumber = undefined;
      expect(reportNumberFilter(reportNumber)).to.be.equal(undefined);
    })
  );

  it('should return multiple report numbers separated by comma when multiple values are passed',
    inject(function(reportNumberFilter) {
      var reportNumber = [{value:"ATLAS-CONF-2014-008"},{value:"CDF-NOTE-11071"},{value:"CMS-PAS-TOP-13-014"},{value:"D0-NOTE-6416"},{value:"FERMILAB-TM-2582-E"}];
      expect(reportNumberFilter(reportNumber)).to.be.equal('Report number:  ATLAS-CONF-2014-008, CDF-NOTE-11071, CMS-PAS-TOP-13-014, D0-NOTE-6416, FERMILAB-TM-2582-E');
    })
  );

  it('should return empty when no value is passed',
    inject(function(reportNumberFilter) {
      var reportNumber = [{value:""}];
      expect(reportNumberFilter(reportNumber)).to.be.equal('');
    })
  );
});
