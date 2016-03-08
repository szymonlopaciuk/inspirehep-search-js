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

describe('Test date filter', function() {
  beforeEach(angular.mock.module('inspirehepSearch.filters'));
  beforeEach(angular.mock.module('ngSanitize'));

  it('should return the date without dash when no authors, collaboration and corporate author missing',
    inject(function(dateFilter) {
      var date = "Dec 14, 2015"
      var authors = undefined;
      var collaboration = undefined;
      var corporate_author = undefined;
      expect(dateFilter(date, authors, collaboration, corporate_author)).to.be.equal("Dec 14, 2015");
    })
  );

  it('should return the date with dash when authors, collaboration or corporate author passed',
    inject(function(dateFilter) {
      var date = "Dec 10, 2015"
      var authors = [{affiliations:[{recid:902796,value:"Fermilab"}],curated_relation:false,full_name:"Shiltsev, Vladimir D."}];
      var collaboration = undefined;
      var corporate_author = undefined;
      expect(dateFilter(date, authors, collaboration, corporate_author)).to.be.equal("- Dec 10, 2015");
    })
  );
});
