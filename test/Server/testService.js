'use strict';
var assert = require('chai').assert;
var  webservice = require('../../WebServices/webservice');


describe('addition', function () {
  it('should add 1+1 correctly', function (done) {
    var onePlusOne = 1 + 1;
    onePlusOne.should.equal(2);
    // must call done() so that mocha know that we are... done.
    // Useful for async tests.
    done();
  });
});


describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});



describe('Test WebService', function() {
   var req = {},
       res = {};

   var result = webservice.processRes(req,res);

       console.log(result);

});