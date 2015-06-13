/*
 * Extremely simple classical iheritance implementation
 * for JavaScript. Initial version.
 *
 * Goals:
 *  1) Compatibility with method definition via the "prototype"
 *     property of Function object.
 *  2) Class instantiation using the "new" operator.
 *  3) Split the "extend" operation from instance creation.
 *  4) Support for calling super-methods as well as super-ctors.
 *  5) Low overhead.
 *
 * Author: Radoslaw Zarzynski
 * Creation date: 27th October 2014
 * License: GNU GPL v2
 */

'use strict';

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        /* AMD. Register as an anonymous module. */
        define([], factory);
    } else if (typeof exports === 'object') {
        /* Node. Does not work with strict CommonJS, but
         * only CommonJS-like environments that support module.exports,
         * like Node. */
        module.exports = factory();
    } else {
        /* Browser globals (root is window). */
        root.CObject = factory();
    }
})(this, function () {
    return new (function () {
        this.prototype = {};
        this.extend = function () {
            var that = this;

            return new (function () {
                function newClass () {
                    if (newClass.prototype.hasOwnProperty('initialize')
                            && typeof this.initialize === 'function') {
                        this.initialize.apply(this, arguments);
                    }
                }
                newClass.extend    = that.extend;
                newClass.prototype = Object.create(that.prototype);

                /* Define the "super" handle to access parent.
                 * TODO: use defineProperty() to make it nonenumerable. */
                newClass._super    = that.prototype;
                return newClass;
            })();
        }
    })();
});
