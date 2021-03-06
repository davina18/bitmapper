/**
 * @license Copyright 2013 Google Inc. All rights reserved.
 * Use of this source code is governed by the Apache license that can be
 * found in the LICENSE file.
 */

/**
 * Sets the pixel currently under the mouse to black.
 * @param {Event} e
 */
bitmapper.drawOnCanvas = function(e) {
  if (e.which !== 1) {
    return;
  }
  var context = bitmapper.canvas.getContext('2d');
  context.fillRect(e.offsetX, e.offsetY, 1, 1);
};

/**
 * Draws the image file to the canvas.
 */
bitmapper.setCanvasToImage = function() {
  var image = bitmapper.imageFile.image;
  bitmapper.canvas.width = image.width;
  bitmapper.canvas.height = image.height;
  var context = bitmapper.canvas.getContext('2d');
  context.drawImage(image, 0, 0);
};

/**
 * Loads an image given by a FileEntry and sets the canvas.
 * @param {FileEntry} entry
 */
bitmapper.loadImage = function(entry) {
  bitmapper.imageFile = new bitmapper.ImageFile(
      entry, bitmapper.setCanvasToImage);
};

/**
 * Displays a file picker and loads the file.
 * @param {function(FileEntry)} callback
 */
bitmapper.openFile = function(callback) {
  chrome.fileSystem.chooseEntry(
      {
        'type': 'openFile',
        'accepts': [{'extensions': ['png']}]
      },
      callback);
};

/**
 * Entry point.
 */
bitmapper.start = function() {
  document.getElementById('openButton').onclick = function() {
    bitmapper.openFile(bitmapper.loadImage);
  };

  bitmapper.canvas = document.getElementById('imageCanvas');
  bitmapper.canvas.addEventListener('mousedown', bitmapper.drawOnCanvas, false);
  bitmapper.canvas.addEventListener('mousemove', bitmapper.drawOnCanvas, false);
};

/** Closure called when the window finishes loading. */
window.onload = bitmapper.start;

