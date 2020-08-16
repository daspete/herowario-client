import 'dotenv/config'

export default {
    css: [
        '~/assets/scss/app.scss'
    ],

    env: {
        SOCKET_URL: process.env.SOCKET_URL,
    },

    components: true,
    
    plugins: [
        { ssr: false, src: '~plugins/nuxtClientInit' },
        { ssr: true, src: '~plugins/icons' },
        { ssr: false, src: '~plugins/socket.io' },
        { ssr: false, src: '~plugins/inputManager' },
    ],

    modules: [
        'nuxt-i18n',
    ],

    buildModules: [
        '@nuxtjs/pwa',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/moment'
    ],

    moment: {
        locales: ['de', 'en-gb']
    },

    i18n: {
        locales: [
            { code: 'de', file: 'de.js' },
            { code: 'en', file: 'en.js' }
        ],
        defaultLocale: 'de',
        strategy: 'no_prefix',
        lazy: true,
        langDir: 'lang/'
    },

    pwa: {
        meta: {
            name: 'HeroWar',
            description: 'Mini hero defense game',
            theme_color: '#fcba03',
            lang: 'de'
        },
        manifest: {
            name: 'HeroWar',
            lang: 'de'
        },
        workbox: {
            runtimeCaching: [
                {
                    urlPattern: 'https://fonts.googleapis.com/.*',
                    handler: 'cacheFirst',
                    method: 'GET',
                    strategyOptions: { cacheableResponse: { statuses: [0, 200] }}
                },
                {
                    urlPattern: 'https://fonts.gstatic.com/.*',
                    handler: 'cacheFirst',
                    method: 'GET',
                    strategyOptions: { cacheableResponse: { statuses: [0, 200] }}
                },
            ]
        }
    }
}