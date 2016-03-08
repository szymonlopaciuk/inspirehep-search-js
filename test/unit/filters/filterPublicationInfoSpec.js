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

describe('Test publication info filter', function() {
  beforeEach(angular.mock.module('inspirehepSearch.filters'));
  beforeEach(angular.mock.module('ngSanitize'));

  it('should return empty when no input passed',
    inject(function(publicationInfoFilter) {
      var publicationInfo = undefined;
      expect(publicationInfoFilter(publicationInfo)).to.be.equal(undefined);
    })
  );

  it('should return multiple journals separated by and when multiple values are passed',
    inject(function(publicationInfoFilter) {
      var publicationInfo = {pub_info:["<i>Int.J.Theor.Phys.</i> 38 (1999) 1113-1133","<i>Adv.Theor.Math.Phys.</i> 2 (1998) 231-252"]};
      expect(publicationInfoFilter(publicationInfo)).to.be.equal('Published in <i>Int.J.Theor.Phys.</i> 38 (1999) 1113-1133 and <i>Adv.Theor.Math.Phys.</i> 2 (1998) 231-252');
    })
  );

  it('should return conference info when conf_info is passed',
    inject(function(publicationInfoFilter) {
      var publicationInfo = {conf_info:"Published in <a href=\"/record/1343838\">proceedings</a> of <a href=\"/record/977661\">2007 IEEE Nuclear Science Symposium and Medical Imaging Conference</a>, pages \n 48-52"};
      expect(publicationInfoFilter(publicationInfo)).to.be.equal(' Published in <a href=\"/record/1343838\">proceedings</a> of <a href=\"/record/977661\">2007 IEEE Nuclear Science Symposium and Medical Imaging Conference</a>, pages \n 48-52');
    })
  );
});
