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

describe('Controller: authorCtrl', function () {

  beforeEach(angular.mock.module('authors'));

  var $controller;
  var $rootScope;
  var ctrl;
  var scope;

  beforeEach(inject(
    function (_$rootScope_, _$controller_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      scope = $rootScope;

      ctrl = $controller('authorCtrl', {
        $scope: scope
      });

      // Needed for scope.$digest() to work when using Controller-as syntax
      scope.vm = ctrl;

    })
  );

  describe('Initial state', function () {
    it('should instantiate the controller properly', function () {
      expect(ctrl).to.not.be.undefined;
    });
  });

  describe('Creates authors list', function () {
    it('should return the authors in a list', function () {
      ctrl.authors = [{affiliations:[{value:"Masaryk U., Brno"}],curated_relation:false,full_name:"Kubalova, Emilia"}];
      expect(ctrl.getAuthors()[0]['full_name']).to.be.equal('Kubalova, Emilia');
      expect(ctrl.getAuthors()[0]['affiliation']).to.be.equal('Masaryk U., Brno');
    });
  });

  describe('Creates empty authors list', function () {
    it('should return undefined when authors is undefined', function () {
      ctrl.authors = undefined;
      expect(ctrl.getAuthors()).to.be.equal(undefined);
    });
  });

  describe('Creates empty authors list if authors full_name is empty', function () {
    it('should return an empty list when authors full_name is empty', function () {
      ctrl.authors = [{affiliations:[{value:"Masaryk U., Brno"}],curated_relation:false,full_name:""}];
      expect(ctrl.getAuthors().length).to.be.equal(0);
    });
  });

  describe('Reverse authors name', function () {
    it('should reverse the authors full name', function () {
      ctrl.authorName = "Kubalova, Emilia";
      expect(ctrl.splitAuthorName(ctrl.authorName)).to.be.equal(" Emilia Kubalova");
    });
  });

  describe('Render authors name with affiliation', function () {
    it('should return the authors full name with the affiliation', function () {
      ctrl.author = {affiliations:[{value:"Masaryk U., Brno"}],curated_relation:false,full_name:"Kubalova, Emilia"};
      expect(ctrl.renderAuthorNames(ctrl.author)['full_name']).to.be.equal("Kubalova, Emilia");
      expect(ctrl.renderAuthorNames(ctrl.author)['affiliation']).to.be.equal("Masaryk U., Brno");
    });
  });

  describe('Render authors name ', function () {
    it('should return the authors full name ', function () {
      ctrl.author = {curated_relation:false,full_name:"Kubalova, Emilia"};
      expect(ctrl.renderAuthorNames(ctrl.author)['full_name']).to.be.equal("Kubalova, Emilia");
    });
  });
});