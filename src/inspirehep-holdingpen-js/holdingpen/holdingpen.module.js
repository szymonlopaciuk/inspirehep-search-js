/*
 * This file is part of INSPIRE.
 * Copyright (C) 2017 CERN.
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

(function (angular) {

  var inspirehepHoldingpen = angular.module('inspirehepHoldingpen', ['xeditable',
    'ui.bootstrap',
    'fps.hotkeys',
    'ngSanitize',
    'holdingpen.directives',
    'holdingpen.controllers',
    'holdingpen.services',
    'angular.filter',
    'holdingpen.filters'
  ]);

  inspirehepHoldingpen.run(['editableOptions', 'editableThemes', function (editableOptions, editableThemes) {
    editableThemes.bs3.inputClass = 'input-md';
    editableThemes.bs3.buttonsClass = 'btn-md';
    editableOptions.theme = 'bs3';
  }]);

})(angular);
