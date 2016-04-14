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

describe('Test collaboration filter', function() {
  beforeEach(angular.mock.module('inspirehepSearch.filters'));
  beforeEach(angular.mock.module('ngSanitize'));

  it('should return empty when no input passed',
    inject(function(collaborationFilter) {
      var collaboration = undefined;
      expect(collaborationFilter(collaboration)).to.be.equal(undefined);
    })
  );

  it('should return empty when corporate author passed',
    inject(function(collaborationFilter) {
      var collaboration = [{value:"CMS"}];
      var corporate_author = ["CMS Collaboration"];
      expect(collaborationFilter(collaboration, corporate_author)).to.be.equal('');
    })
  );

  it('should return empty when collaboration value does not exist',
    inject(function(collaborationFilter) {
      var collaboration = [{value:""}];
      expect(collaborationFilter(collaboration)).to.be.equal('');
    })
  );

  it('should return the value followed by "Collaboration" when single value is passed',
    inject(function(collaborationFilter) {
      var collaboration = [{value:"CMS"}];
      expect(collaborationFilter(collaboration)).to.be.equal('<a href="/search?p=collaboration:CMS">CMS</a> Collaboration');
    })
  );

  it('should return the values followed by "Collaborations" when multiple values are passed',
    inject(function(collaborationFilter) {
      var collaboration = [{value:"CMS"},{value:"LHCb"}];
      expect(collaborationFilter(collaboration)).to.be.equal('<a href="/search?p=collaboration:CMS">CMS</a> and <a href="/search?p=collaboration:LHCb">LHCb</a> Collaborations');
    })
  );
});
