const i18n = require( '../i18n/en.json' );
const extConfig = require( '../extension.json' );

const Api = function () {};

Api.prototype.ajax = function ( params ) {
    let data = {};
    Object.keys( params ).forEach ( ( key ) => {
        if ( Array.isArray( params[ key ] ) ) {
            data[ key ] = params[ key ].join( '|' );
        } else {
            data[ key ] = params[ key ];
        }
    } );
    return $.ajax( {
        url: extConfig.config.NearbyPagesUrl,
        xhrFields: {
            withCredentials: false
        },
        data
    } );
};

module.exports = {
    Api,
    util: {
        getUrl: function ( title ) {
            return `${extConfig.config.NearbyPagesUrl.split('/w/api.php')[ 0 ]}/wiki/${title}`;
        }
    },
    config: {
        get: function ( name ) {
            name = name.replace( 'wg', '' );
            return extConfig.config[name] || null;
        }
    },
    language: {
        convertNumber: function ( a ) {
            return a;
        }
    },
    loader: {
        getState: function () {
            return 'ready';
        },
        using: function ( module ) {
            switch ( module ) {
                case 'mapbox':
                    return Promise.resolve();
                default:
                    return Promise.reject();
            }
        }
    },
    msg: function ( key ) {
        let msg = i18n[key];
        const args = Array.from(arguments).slice(1);
        // drop plural support
        msg = msg.replace(/\{\{PLURAL\:.*\|(.*)\}\}/, '$1');
        if ( args.length ) {
            args.forEach((val, i) => {
                msg = msg.replace(`\$${i+1}`, val);
            });
        }
        return msg;
    }
};
