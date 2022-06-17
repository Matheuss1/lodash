import assert from 'assert';
import eq from '../eq.js';

describe('eq', function() {
  it('should return true for without arguments', function() {
    assert.strictEqual(eq(), true);
  });

  it('should compare the same value with only one argument', function() {
    assert.strictEqual(eq(undefined), true);
  });

  it('should return false to different types', function() {
    assert.strictEqual(eq(0, false), false);
    assert.strictEqual(eq(null, undefined), false);
    assert.strictEqual(eq(1, Object(1)), false);
    assert.strictEqual(eq(1, '1'), false);
  });

  it('should return true for both undefined', function() {
    assert.strictEqual(eq(undefined, undefined), true);
  });

  it('should return true for both null', function() {
    assert.strictEqual(eq(null, null), true);
  });

  describe('number type', function() {
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

    it('should return false different conventional numbers', function() {
      assert.strictEqual(eq(2, -2), false);
    });

    it('should return true for the same conventional number', function() {
      assert.strictEqual(eq(1.0, 1.0), true);
    });
  });

  describe('string type', function() {
    it('should return true for strings equal element-wise', function() {
      assert.strictEqual(eq("abcd", "abcd"), true);
    });

    it('should return false for strings with char mismatch', function() {
      assert.strictEqual(eq("abcd", "aacd"), false);
    });
  });

  describe('boolean type', function() {
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

  describe('symbol type', function() {
    it('should return true for the same Symbol value', function() {
      const symbol = Symbol("sym");
      assert.strictEqual(eq(symbol, symbol), true);
    });

    it('should return false for different Symbol value', function() {
      assert.strictEqual(eq(Symbol("sym"), Symbol("sym")), false);
    });
  });

  describe('object type', function() {
    it('should return true for the same instance', function() {
      const object = { 'a': 1 };
      assert.strictEqual(eq(object, object), true);
    });

    it('should return false for different instances', function() {
      assert.strictEqual(eq({ 'a': 1 }, { 'a': 1 }), false);;
    });
  });
});
