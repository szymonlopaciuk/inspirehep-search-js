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

describe('Test abstract filter', function() {
  beforeEach(angular.mock.module('inspirehepSearch.filters'));
  beforeEach(angular.mock.module('ngSanitize'));

  it('should return empty when no input passed',
    inject(function(abstractFilter) {
      var abstract = undefined;
      expect(abstractFilter(abstract)).to.be.equal(undefined);
    })
  );

  it('should replace the html tags when passed',
    inject(function(abstractFilter) {
      var abstract = [{source:"IEEE",value:"<a><p > This  is  a </p> test </a>"}];
      expect(abstractFilter(abstract)).to.be.equal('&lt;a&gt;&lt;p &gt; This  is  a &lt;/p&gt; test &lt;/a&gt;');
    })
  );

  it('should return the non arxiv abstract',
    inject(function(abstractFilter) {
      var abstract = [{source:"IEEE",value:"The ring imaging Cherenkov counters of the LHCb experiment use an innovative type of photon detector, pixel hybrid photon detectors (HPDs). Cherenkov photons are detected using 484 HPDs covering a total area of 3.3 m^2. The HPDs consist of a vacuum tube with a quartz window and multi-alkaline photo-cathode. A 20 kV potential difference accelerates photo-electrons from the photo-cathode onto a silicon pixel sensor. The 8192 pixel sensor is bump-bonded to an encapsulated readout chip that amplifies and discriminates the signals from the silicon sensor at the LHC bunch crossing frequency of 40 MHz. Results from the production and testing of the HPDs are presented. Overall the yield has been excellent with 98% of HPDs suitable for use in LHCb."}];
      expect(abstractFilter(abstract)).to.be.equal('The ring imaging Cherenkov counters of the LHCb experiment use an innovative type of photon detector, pixel hybrid photon detectors (HPDs). Cherenkov photons are detected using 484 HPDs covering a total area of 3.3 m^2. The HPDs consist of a vacuum tube with a quartz window and multi-alkaline photo-cathode. A 20 kV potential difference accelerates photo-electrons from the photo-cathode onto a silicon pixel sensor. The 8192 pixel sensor is bump-bonded to an encapsulated readout chip that amplifies and discriminates the signals from the silicon sensor at the LHC bunch crossing frequency of 40 MHz. Results from the production and testing of the HPDs are presented. Overall the yield has been excellent with 98% of HPDs suitable for use in LHCb.');
    })
  );

  it('should return the arxiv abstract when no value to the non arxiv',
    inject(function(abstractFilter) {
      var abstract = [{"source":"arXiv","value":"The top quark pair production cross section is measured for the first time in proton-proton collisions at sqrts=sqrts= 13 TeV by theCMS experiment at the CERN LHC, using data corresponding to an integrated luminosity of 42 pb−1−1. The measurement is performed by analyzing events with at least one electron and one muon of opposite charge, and at least two jets. The measured cross section is 769 pmpm 60 (stat) pmpm 55 (syst) pmpm 92 (lumi) pb, in agreement with the expectation from the standard model."},{"source":"HEPDATA"}];
      expect(abstractFilter(abstract)).to.be.equal('The top quark pair production cross section is measured for the first time in proton-proton collisions at sqrts=sqrts= 13 TeV by theCMS experiment at the CERN LHC, using data corresponding to an integrated luminosity of 42 pb−1−1. The measurement is performed by analyzing events with at least one electron and one muon of opposite charge, and at least two jets. The measured cross section is 769 pmpm 60 (stat) pmpm 55 (syst) pmpm 92 (lumi) pb, in agreement with the expectation from the standard model.');
    })
  );



  it('should return the arxiv abstract',
    inject(function(abstractFilter) {
      var abstract = [{source:"arXiv",value:"We develop the idea that the particles of the standard model may arise from excitations of quantum geometry. A previously proposed topological model of preons is developed so that it incorporates an unbounded number of generations. A condition is also found on quantum gravity dynamics necessary for the interactions of the standard model to emerge."}];
      expect(abstractFilter(abstract)).to.be.equal('We develop the idea that the particles of the standard model may arise from excitations of quantum geometry. A previously proposed topological model of preons is developed so that it incorporates an unbounded number of generations. A condition is also found on quantum gravity dynamics necessary for the interactions of the standard model to emerge.');
    })
  );
});
