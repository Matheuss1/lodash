import assert from 'assert'
import lodashStable from 'lodash'
import truncate from '../truncate.js'

describe('truncate', () => {
  const string = 'hi-diddly-ho there, neighborino'

  describe('Control-Flow Graph structural tests', () => {
    it('path::1::should return path + omission if no separator was defined and `length` < `string` length', () => {
      const result = truncate('32-chars-string-----------------')

      assert.strictEqual(result, '32-chars-string------------...')
    })

    it('path::2::should truncate strings with unicode', () => {
      const result = truncate('32-chars-string\u00E9-----------   -')

      assert.strictEqual(result, '32-chars-string\u00E9-----------...')
    })

    it('path::3::should not truncate if `string` is <= `length` default value (30)', () => {
      const result = truncate('small string')

      assert.strictEqual(result, 'small string')
    })

    it('path::8::should use `separator` str option to slice string', () => {
      const result = truncate('32-chars-string------------   -', {
        separator: ' '
      })

      assert.strictEqual(result, '32-chars-string------------...')
    })

    it('path::11::should use a `separator` regex to slice string', () => {
      const result = truncate('32-chars-string------------,  -', {
        separator: /,? +/
      })

      assert.strictEqual(result, '32-chars-string------------...')
    })

    it('path::12::should use a `separator` global match regex to slice string', () => {
      const result = truncate('32-chars-string------------,  -', {
        separator: /,? +/g
      })

      assert.strictEqual(result, '32-chars-string------------...')
    })
  })

  it('should use a default `length` of `30`', () => {
    assert.strictEqual(truncate(string), 'hi-diddly-ho there, neighbo...')
  })

  it('should not truncate if `string` is <= `length`', () => {
    assert.strictEqual(truncate(string, { length: string.length }), string)
    assert.strictEqual(truncate(string, { length: string.length + 2 }), string)
  })

  it('should truncate string the given length', () => {
    assert.strictEqual(
      truncate(string, { length: 24 }),
      'hi-diddly-ho there, n...'
    )
  })

  it('should support a `omission` option', () => {
    assert.strictEqual(
      truncate(string, { omission: ' [...]' }),
      'hi-diddly-ho there, neig [...]'
    )
  })

  it('should coerce nullish `omission` values to strings', () => {
    assert.strictEqual(
      truncate(string, { omission: null }),
      'hi-diddly-ho there, neighbnull'
    )
    assert.strictEqual(
      truncate(string, { omission: undefined }),
      'hi-diddly-ho there, nundefined'
    )
  })

  it('should support a `length` option', () => {
    assert.strictEqual(truncate(string, { length: 4 }), 'h...')
  })

  it('should treat negative `length` as `0`', () => {
    lodashStable.each([0, -2], (length) => {
      assert.strictEqual(truncate(string, { length }), '...')
    })
  })

  it('should coerce `length` to an integer', () => {
    lodashStable.each(['', NaN, 4.6, '4'], (length, index) => {
      const actual = index > 1 ? 'h...' : '...'
      assert.strictEqual(
        truncate(string, {
          length: { valueOf: lodashStable.constant(length) }
        }),
        actual
      )
    })
  })

  it('should coerce `string` to a string', () => {
    assert.strictEqual(truncate(Object(string), { length: 4 }), 'h...')
    assert.strictEqual(
      truncate({ toString: lodashStable.constant(string) }, { length: 5 }),
      'hi...'
    )
  })

  it('should work as an iteratee for methods like `_.map`', () => {
    const actual = lodashStable.map([string, string, string], truncate),
      truncated = 'hi-diddly-ho there, neighbo...'

    assert.deepStrictEqual(actual, [truncated, truncated, truncated])
  })
})
