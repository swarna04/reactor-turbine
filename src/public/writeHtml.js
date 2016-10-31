/*eslint no-alert:0*/
'use strict';
var hasDomContentLoaded = require('./hasDomContentLoaded');
var document = require('document');

module.exports = function(html) {
  // Document object in XML files is different from the ones in HTML files. Documents served with
  // the `application/xhtml+xml` MIME type don't have the `document.write` method.
  // More info: https://www.w3.org/MarkUp/2004/xhtml-faq#docwrite or https://developer.mozilla.org/en-US/docs/Archive/Web/Writing_JavaScript_for_HTML
  if (!document.write) {
    throw new Error('Cannot write HTML to the page. `document.write` is unavailable.');
  }

  if (hasDomContentLoaded()) {
    throw new Error('Cannot call `document.write` after `DOMContentloaded` has fired.');
  }

  document.write(html);
};