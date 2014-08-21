/**
 * jQuery Print iFrame
 * A very lightweight jQuery plugin to print content from a webpage
 *
 * Licensed under the MIT license.
 * Copyright 2014 Ben Sochar
 * https://github.com/bensochar
 */
if (typeof jQuery === 'undefined') { throw new Error('jQuery Print iFrame requires jQuery') }

;(function($) {
  $.fn.printFrame = function(onload) {
    var $this = $(this);
    var onload = onload || false;
    // Get all the CSS on the page
    function getStyleSheets() {
      var metas = document.getElementsByTagName('link');
      var stylesheets = '';
      for (i=0; i<metas.length; i++) {
        if (metas[i].getAttribute("rel") == "stylesheet") {
          stylesheets += '<link rel="stylesheet" href="'+metas[i].getAttribute("href")+'">';
        }
      }
      return stylesheets;
    }

    function getContentByMetaTagName(c) {
      for (var b = document.getElementsByTagName("meta"), a = 0; a < b.length; a++) {
        if (c == b[a].name || c == b[a].getAttribute("property")) { return b[a].content; }
      } return false;
    }
    function printFrame() {
      var iframe = $this.attr('data-print').replace(/[\/#]/g, '');
      var content = $this.attr('data-target') || $this.attr('href');

      // Copy The CSS from the page
      var frame_head = getStyleSheets();

      // Get the content wether its an id or class
      var allcontent = $(content).map(function() {
          return this.innerHTML;
      }).get();
      frame_content = allcontent.join("");

      // Setup The iFrame
      $(iframe).attr({
        'name' : $(iframe).attr('id')
      }); // Make sure it has a name
      var iframe = document.frames ? document.frames[iframe] : document.getElementById(iframe);
      var ifWin = iframe.contentWindow || iframe;
      ifWin.document.write('<head><title>' + document.title + '</title></head><body onload="window.print()" class="print">' + frame_head + frame_content + '</body>');
      // ifWin.document.write('<body>' + frame_head + frame_content + '</body>');
      ifWin.document.close();
      return false;
    };

    if(onload){
      return printFrame();
    } else {
      $this.click(function () {
        return printFrame();
      });
    }
  };

})(window.jQuery);
