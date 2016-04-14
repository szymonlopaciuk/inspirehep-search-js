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

describe('Check authors directive', function() {

  var $compile;
  var $rootScope;
  var $httpBackend;
  var scope;
  var template;
  var template_with_collaboration;
  var template_without_authors;

  // Load the templates
  beforeEach(angular.mock.module('templates'));

  // Inject the angular module
  beforeEach(angular.mock.module('authors'));

  beforeEach(
    inject(function(_$compile_, _$rootScope_, _$httpBackend_) {

      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;

      scope = $rootScope;

      template = ' <authors-affiliation authors-template="src/inspirehep-search-js/templates/authors/authors.html"' +
                 ' authors=\'[{"affiliations":[{"value":"Masaryk U., Brno"}], "curated_relation":false,"full_name":"Kubalova, Emilia"}]\'' +
                 ' collaboration' +
                 ' number-of-authors="1"' +
                 ' control-number="1408258"></authors-affiliation> ';

      template_with_collaboration = ' <authors-affiliation authors-template="src/inspirehep-search-js/templates/authors/authors.html"' +
                                    ' authors=\'[{"affiliations":[{"value":"Masaryk U., Brno"}], "curated_relation":false,"full_name":"Kubalova, Emilia"}]\'' +
                                    ' collaboration=\'[{"value":"CMS"}]\''+
                                    ' number-of-authors="200"' +
                                    ' control-number="1408258"></authors-affiliation> ';


      $httpBackend.whenGET('uib/template/tooltip/tooltip-popup.html').respond(200, '');


      // Compile
      template = $compile(template)(scope);
      template_with_collaboration = $compile(template_with_collaboration)(scope)
      
      // Digest
      scope.$digest();

    })
  );

  it('test if the template is loaded', inject(function() {
      expect(template.html()).to.contain('href="http://inspirehep.net/author/profile/Kubalova, Emilia?recid=1408258"');
      expect(template_with_collaboration.html()).to.contain('href="http://inspirehep.net/author/profile/Kubalova, Emilia?recid=1408258"');
  }));

});
