export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: "static",
    ssr: false,
    
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "pfweb",
        htmlAttrs: {
            lang: "en"
        },
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            { rel: "preconnect", href: "https://fonts.googleapis.com" },
            { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: true },
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"},
        ]
    },

    srcDir: "./src",
    
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        "styles/main.scss"
    ],
    
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],
    
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,
    
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        // "@nuxtjs/eslint-module"  // Custom: disabled this so eslint isn't checked on runtime (checks after each rebuild in watch mode)
        "@nuxtjs/device"
    ],
    
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    ],
    
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        loaders: {
            vue: {
                prettify: false
            },
            scss: { implementation: require("sass") },
            sass: { implementation: require("sass") },
        }
    },

    server: {
        port: 8080,
    }
}
