'use strict';
const cheerio = require("cheerio");

module.exports = function(data) {
    const $ = cheerio.load(data)
    // Caption
    $('img').each(function(i, ele){
        if ($(this).parent().hasClass('imga')) return;
        var alt = $(this).attr("alt");
        if (alt) $(this).after('<span class="caption">' + alt + '</span>');
        var src = $(this).attr("src");
        $(this).wrap('<a href="'+src+'" title="'+alt+'" class="imga" target="_blank"></a>');
    });

    // Bootstrap table style
    $(".article-entry table").each(function(i, table){
        if ($(this).parent().hasClass('table-responsive')) return;
        if ($(this).parent().hasClass("highlight")) {
            $(this).addClass('table');
        } else {
            $(this).addClass('table table-hover table-bordered');
        }
        // if (!$(".thead").hasClass("thead-dark")) $("thead").addClass("thead-dark");
        $(this).wrap('<div class="table-responsive"></div>');
    })

    const origin_html = $.html();
    const host = this.config.i_host;
    if (!host || process.env.NODE_ENV == 'development') {
      return origin_html;
    } else {
      return origin_html.replace(/"\/i\//g, '"'+host);
    }
}
