describe("Angular storage integration", function(){

  var localStorage,
      $localStorage;

  var testKey1,
      testKey2,
      testValue1,
      testValue2,
      testObject,
      serializedTestObject;


  beforeEach(function(){
    angular.mock.module('angular-storage');

    inject(function(_$window_, _$localStorage_) {
      localStorage = _$window_.localStorage;
      localStorage.clear();

      $localStorage = _$localStorage_;
    });

    testKey1 = 'key1';
    testValue1 = 'value1';
    testKey2 = 'key2';
    testValue2 = 'value2';
    testObject = {key: 'value'};
    serializedTestObject = JSON.stringify(testObject);
  });


  describe("Putting primitive values into localStorage", function(){
    it("should store values as strings", function(){
      var inputs = [1, true, 'foo'],
          outputs = ['1', 'true', 'foo'],
          i = 0,
          j = 0;

      inputs.forEach(function(value){
        $localStorage.put('key' + i++, value);
      });

      outputs.forEach(function(value){
        expect(localStorage.getItem('key' + j++)).toBe(value);
      });
    });
  });


  describe("Putting objects into localStorage", function(){
    it("should store serialized object", function(){
      $localStorage.putObject(testKey1, testObject);

      expect(localStorage.length).toBe(1);
      expect(localStorage.getItem(testKey1)).toBe(serializedTestObject);
    });
  });


  describe("Getting primitive values from localStorage", function(){
    it("should return value", function(){
      localStorage.setItem(testKey1, testValue1);

      expect($localStorage.get(testKey1)).toBe(testValue1);
    });
  });


  describe("Getting objects from localStorage", function(){
    it("should return deserialized object", function(){
      localStorage.setItem(testKey1, JSON.stringify(testObject));

      expect($localStorage.getObject(testKey1)).toEqual(testObject);
    });
  });


  describe("Removing data from localStorage", function(){
    it("should remove provided key and associated value", function(){
      localStorage.setItem(testKey1, testValue1);
      localStorage.setItem('foo', 'bar');

      expect(localStorage.length).toBe(2);

      $localStorage.remove(testKey1);

      expect(localStorage.getItem(testKey1)).toBe(null);
      expect(localStorage.getItem('foo')).toBe('bar');
    });
  });


  describe("Clearing all data from localStorage", function(){
    it("should clear all keys and associated values", function(){
      localStorage.setItem(testKey1, testValue1);
      localStorage.setItem(testKey2, testValue2);

      expect(localStorage.length).toBe(2);

      $localStorage.clear();

      expect(localStorage.length).toBe(0);
    });
  });


  describe("Getting keys from localStorage", function(){
    it("should return an array of keys as strings", function(){
      localStorage.setItem(testKey1, testValue1);
      localStorage.setItem(testKey2, testValue2);

      var keys = $localStorage.keys();

      [testKey1, testKey2].forEach(function(value){
        expect(keys.indexOf(value)).not.toBe(-1);
      });
    });
  });


  describe("Getting the number of items in localStorage", function(){
    it("should return a number", function(){
      localStorage.setItem(testKey1, testValue1);
      localStorage.setItem(testKey2, testValue2);

      expect($localStorage.length()).toBe(2);
    });
  });

});
