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
(function (angular) {
  function categoriesFilter() {
    return function (record) {
      var inspireCategories = record.inspire_categories;
      var arxivEprints = record.arxiv_eprints;
      var arxivCategories = record.arxiv_categories;
      var categories = [];
      var i;
      if (inspireCategories) {
        for (i = 0; i < inspireCategories.length; i++) {
          categories.push(inspireCategories[i].term);
        }
      }
      if (arxivEprints) {
        for (i = 0; i < arxivEprints.length; i++) {
          var eprintCategories = arxivEprints[i].categories;
          for (var j = 0; j < eprintCategories.length; j++) {
            categories.push(eprintCategories[j]);
          }
        }
      } else if (arxivCategories) {
        for (i = 0; i < arxivCategories.length; i++) {
          categories.push(arxivCategories[i]);
        }
      }
      var uniqueCategories = categories.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
      return uniqueCategories;
    };
  }
  angular.module('holdingpen.filters.categories', []).filter('categories', categoriesFilter);
}(angular));