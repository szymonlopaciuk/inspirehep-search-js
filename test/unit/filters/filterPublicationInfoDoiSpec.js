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
      var publicationInfoDoi = {pub_info:["<i>J.Phys.</i> G41 (2014) 055009"]};
      expect(publicationInfoDoiFilter(doi, publicationInfoDoi)).to.be.equal('Published in <a href="http://dx.doi.org/10.1088/0954-3899/41/5/055009" title="DOI"><span class="text-left"><i>J.Phys.</i> G41 (2014) 055009</span></a>');
    })
  );

  it('should return a journal info linked to doi and the conference info followed',
    inject(function(publicationInfoDoiFilter) {
      var doi = [{"source":"IEEE","value":"10.1109/NSSMIC.2007.4436620"}]; 
      var publicationInfoDoi = {conf_info:"(<a href=\"/record/1343838\">Proceedings</a> of <a href=\"/record/977661\">\n 2007 IEEE Nuclear Science Symposium and Medical Imaging Conference</a>)",pub_info:["<i>IEEE Nucl.Sci.Symp.Conf.Rec.</i> 3 (2007) 2368-2372"]};
      expect(publicationInfoDoiFilter(doi, publicationInfoDoi)).to.be.equal('Published in <a href="http://dx.doi.org/10.1109/NSSMIC.2007.4436620" title="DOI"><span class="text-left"><i>IEEE Nucl.Sci.Symp.Conf.Rec.</i> 3 (2007) 2368-2372</span></a> (<a href="/record/1343838">Proceedings</a> of <a href="/record/977661">' +
        '\n 2007 IEEE Nuclear Science Symposium and Medical Imaging Conference</a>)');
    })
  );
});
