'use strict';


var STORAGE_TYPE_LOCAL   = 'localStorage',
    STORAGE_TYPE_SESSION = 'sessionStorage';


angular
  .module('angular-storage', [])
  .provider('$localStorage', StorageProvider)
  .provider('$sessionStorage', StorageProvider)
  .config(['$sessionStorageProvider', function($sessionStorageProvider){
    $sessionStorageProvider.setStorageType(STORAGE_TYPE_SESSION);
  }]);



/**
 * @name StorageProvider
 * @constructor
 */
function StorageProvider() {

  /**
   * @type {string}
   */
  var storageType = STORAGE_TYPE_LOCAL;


  /**
   * @param {string} type
   */
  this.setStorageType = function(type) {
    storageType = type;
  };


  /**
   * @returns {Storage}
   */
  this.$get = ['$window', function($window){
    return new StorageService($window, storageType);
  }];

}



/**
 * @name StorageService
 * @param $window
 * @param {string} storageType
 */
function StorageService($window, storageType) {

  /**
   * @type {Storage} window.localStorage | window.sessionStorage
   */
  var storage = $window[storageType];


  var service = {

    /**
     * @param {string} key
     * @returns {string}
     */
    get : function(key) {
      return storage.getItem(key);
    },


    /**
     * @param {string} key
     * @returns {Object}
     */
    getObject : function(key) {
      return JSON.parse(storage.getItem(key));
    },


    /**
     * @param {string} key
     * @param {boolean|number|string} value
     * @returns {service}
     */
    put : function(key, value) {
      storage.setItem(key, value);
      return this;
    },


    /**
     * @param {string} key
     * @param {Object} value
     * @returns {service}
     */
    putObject : function(key, value) {
      storage.setItem(key, JSON.stringify(value));
      return this;
    },


    /**
     * @param {string} key
     * @returns {service}
     */
    remove : function(key) {
      storage.removeItem(key);
      return this;
    },


    /**
     * @returns {service}
     */
    clear : function() {
      storage.clear();
      return this;
    },


    /**
     * Get the key at provided `index`.
     * Returns null if `index` is out of range.
     *
     * @param {number} index - zero-based
     * @returns {string|null}
     */
    key : function(index) {
      try {
        return storage.key(index);
      }
      catch(error) {
        return null;
      }
    },


    /**
     * @returns {Array.<string>}
     */
    keys : function() {
      var i = storage.length,
          keys = new Array(i);

      while (i--) {
        keys[i] = storage.key(i);
      }

      return keys;
    },


    /**
     * @returns {number}
     */
    length : function() {
      return storage.length;
    }

  };


  return service;

}
