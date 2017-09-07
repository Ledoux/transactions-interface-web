"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getElementOffset = getElementOffset;
/* eslint-disable */
// COPIED from:
// https://github.com/jlmakes/scrollreveal.js/blob/master/scrollreveal.js#L781-L809
function getElementOffset(domEl) {
    var offsetTop = 0,
        offsetLeft = 0,


    // Grab the element’s dimensions.
    offsetHeight = domEl.offsetHeight,
        offsetWidth = domEl.offsetWidth;

    // Now calculate the distance between the element and its parent, then
    // again for the parent to its parent, and again etc... until we have the
    // total distance of the element to the document’s top and left origin.
    do {
        if (!isNaN(domEl.offsetTop)) {
            offsetTop += domEl.offsetTop;
        }
        if (!isNaN(domEl.offsetLeft)) {
            offsetLeft += domEl.offsetLeft;
        }
    } while (domEl = domEl.offsetParent);
    return {
        top: offsetTop,
        left: offsetLeft,
        height: offsetHeight,
        width: offsetWidth
    };
}