describe("Angular storage", function(){

  var $localStorage,
      localStorage;

  var testKey1,
      testKey2,
      testValue1,
      testValue2,
      testObject,
      serializedTestObject;


  beforeEach(function(){
    angular.mock.module('angular-storage');

    inject(function(_$rootScope_, _$window_, _$localStorage_){
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


  describe("Putting primitive values into storage", function(){
    it("should call localStorage.setItem() with provided key and value", function(){
      sinon.spy(localStorage, 'setItem');

      $localStorage.put(testKey1, testValue1);

      expect(localStorage.setItem.calledWith(testKey1, testValue1)).toBe(true);

      localStorage.setItem.restore();
    });


    it("should store values as strings", function(){
      var inputs = [1, true, 'foo'],
          outputs = ['1', 'true', 'foo'];

      inputs.forEach(function(value, index){
        $localStorage.put('key' + index, value);
        expect(localStorage.getItem('key' + index)).toBe(outputs[index]);
      });
    });
  });


  describe("Putting objects into storage", function(){
    it("should call localStorage.setItem() with provided key and serialized object", function(){
      sinon.spy(localStorage, 'setItem');

      $localStorage.putObject(testKey1, testObject);

      expect(localStorage.setItem.calledWith(testKey1, serializedTestObject)).toBe(true);

      localStorage.setItem.restore();
    });

    it("should store serialized object", function(){
      $localStorage.putObject(testKey1, testObject);

      expect(localStorage.length).toBe(1);
      expect(localStorage.getItem(testKey1)).toBe(serializedTestObject);
    });
  });


  describe("Getting primitive values from storage", function(){
    it("should call localStorage.getItem() with provided key", function(){
      sinon.spy(localStorage, 'getItem');

      $localStorage.get(testKey1);

      expect(localStorage.getItem.calledWith(testKey1)).toBe(true);

      localStorage.getItem.restore();
    });


    it("should return value", function(){
      localStorage.setItem(testKey1, testValue1);

      var value = $localStorage.get(testKey1);

      expect(value).toEqual(testValue1);
    });
  });


  describe("Getting objects from storage", function(){
    it("should call localStorage.getItem() with provided key", function(){
      sinon
        .stub(localStorage, 'getItem')
        .returns(serializedTestObject);

      $localStorage.getObject(testKey1);

      expect(localStorage.getItem.calledWith(testKey1)).toBe(true);

      localStorage.getItem.restore();
    });

    it("should return serialized object", function(){
      localStorage.setItem(testKey1, JSON.stringify(testObject));

      var object = $localStorage.getObject(testKey1);

      expect(object).toEqual(testObject);
    });
  });


  describe("Removing data from storage", function(){
    it("should call localStorage.removeItem() with provided key", function(){
      sinon.spy(localStorage, 'removeItem');

      $localStorage.remove(testKey1);

      expect(localStorage.removeItem.calledWith(testKey1)).toBe(true);

      localStorage.removeItem.restore();
    });

    it("should remove provided key and associated value", function(){
      localStorage.setItem(testKey1, testValue1);
      localStorage.setItem(testKey2, testValue2);

      expect(localStorage.length).toBe(2);

      $localStorage.remove(testKey1);

      expect(localStorage.getItem(testKey1)).toBe(null);
      expect(localStorage.getItem(testKey2)).toBe(testValue2);
    });
  });


  describe("Clearing all data from storage", function(){
    it("should call localStorage.clear()", function(){
      sinon.spy(localStorage, 'clear');

      $localStorage.clear();

      expect(localStorage.clear.calledOnce).toBe(true);

      localStorage.clear.restore();
    });

    it("should clear all keys and associated values", function(){
      localStorage.setItem(testKey1, testValue1);
      localStorage.setItem(testKey2, testValue2);

      expect(localStorage.length).toBe(2);

      $localStorage.clear();

      expect(localStorage.length).toBe(0);
    });
  });


  describe("Gettings all keys from storage", function(){
    it("should call localStorage.key()", function(){
      sinon.spy(localStorage, 'key');

      $localStorage.keys();

      expect(localStorage.key.callCount).toBe(localStorage.length);

      localStorage.key.restore();
    });

    it("should return an array of keys as strings", function(){
      localStorage.setItem(testKey1, testValue1);
      localStorage.setItem(testKey2, testValue2);

      var keys = $localStorage.keys();

      [testKey1, testKey2].forEach(function(value){
        expect(keys.indexOf(value)).not.toBe(-1);
      });
    });
  });


  describe("Getting a single key from storage", function(){
    it("should call localStorage.key()", function(){
      sinon.spy(localStorage, 'key');

      $localStorage.key();

      expect(localStorage.key.callCount).toBe(1);

      localStorage.key.restore();
    });

    it("should return the requested key", function(){
      localStorage.setItem(testKey1, testValue1);
      localStorage.setItem(testKey2, testValue2);

      $localStorage.key();

      expect($localStorage.key(0)).toBe(testKey1);
      expect($localStorage.key(1)).toBe(testKey2);
      expect($localStorage.key(2)).toBe(null);
    });
  });


  describe("Getting the number of items in storage", function(){
    it("should return a number", function(){
      localStorage.setItem(testKey1, testValue1);
      localStorage.setItem(testKey2, testValue2);

      expect(localStorage.length).toBe(2);
      expect($localStorage.length()).toBe(2);
    });
  });

});
