'use strict';


/**
 * @name LocalStorageStub
 * @constructor
 *
 * Basic stub of the Web Storage API.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
 *
 */
function LocalStorageStub() { // eslint-disable-line no-unused-vars

  this.getItem = function(){};

  this.setItem = function(){};

  this.removeItem = function(){};

  this.clear = function(){};

  this.key = function(){};

  this.length = 2;

}
