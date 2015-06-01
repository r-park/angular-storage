describe("Angular storage", function(){

  var localStorageMock,
      $localStorage;

  var testKey,
      testValue,
      testObject,
      serializedTestObject;


  beforeEach(function(){
    angular.mock.module('angular-storage', function($provide){
      $provide.constant('$window', {
        localStorage: new StorageMock()
      });
    });

    inject(function(_$window_, _$localStorage_) {
      localStorageMock = _$window_.localStorage;
      $localStorage = _$localStorage_;
    });

    testKey = 'key';
    testValue = 'value';
    testObject = {key: 'value'};
    serializedTestObject = JSON.stringify(testObject);
  });


  describe("Putting primitive values into localStorage", function(){
    it("should call localStorage.setItem() with provided key and value", function(){
      sinon.spy(localStorageMock, 'setItem');

      $localStorage.put(testKey, testValue);

      expect(localStorageMock.setItem.calledWith(testKey, testValue)).toBe(true);
    });
  });


  describe("Putting objects into localStorage", function(){
    it("should call localStorage.setItem() with provided key and serialized object", function(){
      sinon.spy(localStorageMock, 'setItem');

      $localStorage.putObject(testKey, testObject);

      expect(localStorageMock.setItem.calledWith(testKey, serializedTestObject)).toBe(true);
    });
  });


  describe("Getting primitive values from localStorage", function(){
    it("should call localStorage.getItem() with provided key", function(){
      sinon
        .stub(localStorageMock, 'getItem')
        .returns(testValue);

      var value = $localStorage.get(testKey);

      expect(localStorageMock.getItem.calledWith(testKey)).toBe(true);
      expect(value).toBe(testValue);
    });
  });


  describe("Getting objects from localStorage", function(){
    it("should call localStorage.getItem() with provided key", function(){
      sinon
        .stub(localStorageMock, 'getItem')
        .returns(serializedTestObject);

      $localStorage.getObject(testKey);

      expect(localStorageMock.getItem.calledWith(testKey)).toBe(true);
    });


    it("should return deserialized object", function(){
      sinon
        .stub(localStorageMock, 'getItem')
        .returns(serializedTestObject);

      expect($localStorage.getObject(testKey)).toEqual(testObject);
    });
  });


  describe("Removing data from localStorage", function(){
    it("should call localStorage.removeItem() with provided key", function(){
      sinon.spy(localStorageMock, 'removeItem');

      $localStorage.remove(testKey);

      expect(localStorageMock.removeItem.calledWith(testKey)).toBe(true);
    });
  });


  describe("Clearing all data from localStorage", function(){
    it("should call localStorage.clear()", function(){
      sinon.spy(localStorageMock, 'clear');

      $localStorage.clear();

      expect(localStorageMock.clear.calledOnce).toBe(true);
    });
  });


  describe("Getting keys from localStorage", function(){
    it("should call localStorage.key()", function(){
      sinon.spy(localStorageMock, 'key');

      $localStorage.keys();

      expect(localStorageMock.key.callCount).toBe(localStorageMock.length);
    });
  });


  describe("Getting the number of items in localStorage", function(){
    it("should", function(){
      expect($localStorage.length()).toBe(2);
    });
  });

});
