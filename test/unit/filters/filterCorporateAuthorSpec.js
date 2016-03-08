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

describe('Test corporate author filter', function() {
  beforeEach(angular.mock.module('inspirehepSearch.filters'));
  beforeEach(angular.mock.module('ngSanitize'));

  it('should return undefined when input is passed',
    inject(function(corporateAuthorFilter) {
      var input = [{affiliations:[{value:"Masaryk U., Brno"}],curated_relation:false,full_name:"Kubalova, Emilia"}];;
      var corporate_author = '';
      expect(corporateAuthorFilter(input, corporate_author)).to.be.equal(undefined);
    })
  );
  
  it('should return empty when no input and corporate author passed',
    inject(function(corporateAuthorFilter) {
      var input = undefined;
      var corporate_author = '';
      expect(corporateAuthorFilter(input, corporate_author)).to.be.equal(undefined);
    })
  );

  it('should return the first element of the list when no input passed and corporate author passed',
    inject(function(corporateAuthorFilter) {
      var input = undefined;
      var corporate_author = ["CMS Collaboration"];
      expect(corporateAuthorFilter(input, corporate_author)).to.be.equal('CMS Collaboration');
    })
  );
});
