/**
 * Object helpers.
 *
 * @file   This file defines helpers to handle Objects.
 * @author Nikita Vakula <programmistov.programmist@gmail.com>
 */

/**
 * Tests if an object is empty ({}).
 *
 * @function isEmpty
 * @param {Object} obj Object to test for emptiness.
 * @return {boolean} true if object is not empty, false otherwise.
 */
export function isEmpty(obj) {
    return (Object.keys(obj).length === 0
        && obj.constructor === Object
    );
}
