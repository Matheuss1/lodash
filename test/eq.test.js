import assert from 'assert';
import eq from '../eq.js';

describe('eq', function() {
  it('should return true without arguments', function() {
    assert.strictEqual(eq(), true);
  });

  it('should treat missing argument as undefined', function() {
    assert.strictEqual(eq(undefined), true);
  });

  describe('when types are different', function() {
    it('should return false to number and boolean', function() {
      assert.strictEqual(eq(0, false), false);
    });

    it('should return false to null and undefined', function() {
      assert.strictEqual(eq(null, undefined), false);
    });

    it('should return false to number and object', function() {
      assert.strictEqual(eq(1, Object(1)), false);
    });

    it('should return false to number and string', function() {
      assert.strictEqual(eq(1, '1'), false);
    });

    it('should return false to string and symbol', function() {
      assert.strictEqual(eq(Symbol('abc'), 'abc'), false);
    });
  });


  describe('when type is undefined', function() {
    it('should return true for both undefined', function() {
      assert.strictEqual(eq(undefined, undefined), true);
    });
  });

  describe('when type is null', function() {
    it('should return true for both null', function() {
      assert.strictEqual(eq(null, null), true);
    });
  })

  describe('when type is number', function() {
    it('should return true for both +0', function() {
      assert.strictEqual(eq(+0, +0), true);
    });

    it('should return true for +0 and -0', function() {
      assert.strictEqual(eq(+0, -0), true);
    });

    it('should return true for -0 and +0', function() {
      assert.strictEqual(eq(-0, +0), true);
    });

    it('should return true for both -0', function() {
      assert.strictEqual(eq(-0, -0), true);
    });

    it('should return true for both NaN', function() {
      assert.strictEqual(eq(NaN, NaN), true);
    });

    it('should return false for NaN and non NaN', function() {
      assert.strictEqual(eq(NaN, 0), false);
    });

    it('should return false for non NaN and NaN', function() {
      assert.strictEqual(eq(-0, NaN), false);
    });

    it('should return false different ordinary numbers', function() {
      assert.strictEqual(eq(2, -2), false);
    });

    it('should return true for the same ordinary number', function() {
      assert.strictEqual(eq(1.0, 1.0), true);
    });
  });

  describe('when type is string', function() {
    it('should return true for strings equal element-wise', function() {
      assert.strictEqual(eq("abcd", "abcd"), true);
    });

    it('should return false for strings with char mismatch', function() {
      assert.strictEqual(eq("abcd", "aacd"), false);
    });
  });

  describe('when type is boolean', function() {
    it('should return true for both true', function() {
      assert.strictEqual(eq(true, true), true);
    });

    it('should return false for true and false', function() {
      assert.strictEqual(eq(true, false), false);
    });

    it('should return false for false and true', function() {
      assert.strictEqual(eq(false, true), false);
    });

    it('should return true for both false', function() {
      assert.strictEqual(eq(false, false), true);
    });
  });

  describe('when type is symbol', function() {
    it('should return true for the same Symbol instance', function() {
      const symbol = Symbol("sym");
      assert.strictEqual(eq(symbol, symbol), true);
    });

    it('should return false for different Symbol instance', function() {
      assert.strictEqual(eq(Symbol("sym"), Symbol("sym")), false);
    });
  });

  describe('when type is object', function() {
    it('should return true for the same instance', function() {
      const object = { 'a': 1 };
      assert.strictEqual(eq(object, object), true);
    });

    it('should return false for different instances', function() {
      assert.strictEqual(eq({ 'a': 1 }, { 'a': 1 }), false);;
    });
  });
});
