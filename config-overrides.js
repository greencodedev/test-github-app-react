const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
    alias({
        '@components'   : 'src/components',
        '@constants'    : 'src/constants',
        '@reducers'     : 'src/reducers',
        '@routers'      : 'src/routers',
        '@services'     : 'src/services',
        '@store'        : 'src/store',
        '@views'        : 'src/views',
    })(config)

    return config
}