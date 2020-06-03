const Vue = process.env.NODE_ENV === 'development' ?
    require( '~/../node_modules/vue/dist/vue.common.dev.js' ) :
    require( '~/../node_modules/vue/dist/vue.common.prod.js' );

module.exports = Vue;
