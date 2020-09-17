'use strict';

function generateUUID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
          charsLength = chars.length,
          count = 15;
    let uuid = '';
    
    for ( let i = 0; i < count; i++ ) {
      uuid += chars.charAt(Math.floor(Math.random() * charsLength));
    }

    return uuid;
}

module.exports = generateUUID;