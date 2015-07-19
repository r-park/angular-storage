describe("Angular storage", function(){

  var localStorageStub,
      $localStorage,
      testKey,
      testValue,
      testObject,
      serializedTestObject;


  beforeEach(function(){
    angular.mock.module('angular-storage', function($provide){
      // Firefox will not allow sinon to spy on
      // window.localStorage so we stub it here.
      $provide.constant('$window', {
        localStorage: new LocalStorageStub()
      });
    });

    inject(function(_$window_, _$localStorage_) {
      localStorageStub = _$window_.localStorage;
      $localStorage = _$localStorage_;
    });

    testKey = 'key';
    testValue = 'value';
    testObject = {key: 'value'};
    serializedTestObject = JSON.stringify(testObject);
  });


  describe("Putting primitive values into localStorage", function(){
    it("should call localStorage.setItem() with provided key and value", function(){
      sinon.spy(localStorageStub, 'setItem');

      $localStorage.put(testKey, testValue);

      expect(localStorageStub.setItem.calledWith(testKey, testValue)).toBe(true);
    });
  });


  describe("Putting objects into localStorage", function(){
    it("should call localStorage.setItem() with provided key and serialized object", function(){
      sinon.spy(localStorageStub, 'setItem');

      $localStorage.putObject(testKey, testObject);

      expect(localStorageStub.setItem.calledWith(testKey, serializedTestObject)).toBe(true);
    });
  });


  describe("Getting primitive values from localStorage", function(){
    it("should call localStorage.getItem() with provided key", function(){
      sinon.spy(localStorageStub, 'getItem');

      $localStorage.get(testKey);

      expect(localStorageStub.getItem.calledWith(testKey)).toBe(true);
    });
  });


  describe("Getting objects from localStorage", function(){
    it("should call localStorage.getItem() with provided key", function(){
      sinon
        .stub(localStorageStub, 'getItem')
        .returns(serializedTestObject);

      $localStorage.getObject(testKey);

      expect(localStorageStub.getItem.calledWith(testKey)).toBe(true);
    });
  });


  describe("Removing data from localStorage", function(){
    it("should call localStorage.removeItem() with provided key", function(){
      sinon.spy(localStorageStub, 'removeItem');

      $localStorage.remove(testKey);

      expect(localStorageStub.removeItem.calledWith(testKey)).toBe(true);
    });
  });


  describe("Clearing all data from localStorage", function(){
    it("should call localStorage.clear()", function(){
      sinon.spy(localStorageStub, 'clear');

      $localStorage.clear();

      expect(localStorageStub.clear.calledOnce).toBe(true);
    });
  });


  describe("Getting a single key from localStorage", function(){
    it("should call localStorage.key()", function(){
      sinon.spy(localStorageStub, 'key');

      $localStorage.key(0);

      expect(localStorageStub.key.callCount).toBe(1);
    });
  });


  describe("Getting keys from localStorage", function(){
    it("should call localStorage.key()", function(){
      sinon.spy(localStorageStub, 'key');

      $localStorage.keys();

      expect(localStorageStub.key.callCount).toBe(localStorageStub.length);
    });
  });


  describe("Getting the number of items in localStorage", function(){
    it("should", function(){
      expect($localStorage.length()).toBe(2);
    });
  });

});
