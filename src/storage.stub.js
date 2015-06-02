'use strict';


/**
 * @name StorageMock
 * @constructor
 *
 * Basic stub of the Web Storage API.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
 *
 */
function StorageStub() {

  this.getItem = function(){};

  this.setItem = function(){};

  this.removeItem = function(){};

  this.clear = function(){};

  this.key = function(){};

  this.length = 2;

}
