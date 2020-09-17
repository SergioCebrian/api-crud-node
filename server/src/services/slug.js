'use strict';

function createSlug(title) {
    const specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";

    for (var i = 0; i < specialChars.length; i++) {
        title= title.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }  
    title = title.toLowerCase();
    title = title.replace(/ /g,"-");
    title = title.replace(/á/gi,"a");
    title = title.replace(/é/gi,"e");
    title = title.replace(/í/gi,"i");
    title = title.replace(/ó/gi,"o");
    title = title.replace(/ú/gi,"u");
    title = title.replace(/ñ/gi,"n");
    return title;
}

module.exports = createSlug;