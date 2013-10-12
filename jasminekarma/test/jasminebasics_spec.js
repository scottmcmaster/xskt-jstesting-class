describe('Javascript math tests', function() {
  // Test specs go here.
  it('adds correctly', function() {
    expect(1+1).toEqual(2);
  });

  it('multiplies correctly', function() {
    expect(2*2).toEqual(4);
  });
});

describe('A test that needs setup teardown', function() {
  var aNumber;
  beforeEach(function() {
    aNumber = 5;
  });
  
  it('sets up correctly', function() {
    expect(aNumber).toEqual(5);
  });

  afterEach(function() {
    aNumber = 0;
  });
});

describe('Testing exceptions', function() {
  var myObj = {
    divider: function(numerator, denominator) {
      if (denominator == 0) {
	      throw new Error('oops');
      }
      return numerator / denominator;
    }
  };

  it('does valid division', function() {
    expect(myObj.divider(10, 2)).toEqual(5);
  });

  it('does invalid division', function() {
    expect(myObj.divider.bind(myObj, 10, 0)).toThrow('oops');
  });
});

describe('Spy mocking out a function', function() {
  var myObj = {
    doAction: function() { return 5; }
  };
  it('can replace doAction with spy', function() {
    spyOn(myObj, 'doAction').andReturn(10);
    expect(myObj.doAction()).toEqual(10);
  });
});

describe('Spy tracking function calls', function() {
  var myObj = {
    doubler: function(val) { return val * 2; }
  };
  
  beforeEach(function() {
    spyOn(myObj, 'doubler').andCallThrough();
  });

  it('can track calls to doubler', function() {
    var dblVal= myObj.doubler(10);
    expect(myObj.doubler).toHaveBeenCalled();
    expect(myObj.doubler.calls.length).toEqual(1);
    expect(myObj.doubler).toHaveBeenCalledWith(10);
    expect(myObj.doubler.mostRecentCall.args[0]).toEqual(10);
  });
});

describe('Spy using a fake', function() {
  var myObj = {
    doubler: function(val) { return val + 10; }
  };
  
  beforeEach(function() {
    spyOn(myObj, 'doubler').andCallFake(function(val) {
      return val + val + val;  // this really triples, not doubles!
    });
  });

  it('will call a fake', function() {
    var dblVal= myObj.doubler(10);
    expect(dblVal).toEqual(30);
  });
});

describe('Bare spy', function() {
  var myObj;
  beforeEach(function() {
    myObj = jasmine.createSpy(myObj);
    myObj.doubler = jasmine.createSpy('doubler').andReturn(10);
  });

  it('will call a function on a bare spy', function() {
    var dblVal= myObj.doubler(10);
    expect(dblVal).toEqual(10);
  });
});


