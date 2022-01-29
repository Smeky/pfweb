import Background from "~/scripts/background"

const background = new Background()

export default {
    mounted() {
        if (!background.__registered) {
            background.__registered = true
            background.setup()
            background.run()

            window.addEventListener("scroll", () => background.setScroll(window.scrollY))
            window.addEventListener("blur", () => background.stop())
            window.addEventListener("focus", () => background.run())

            if (process.env.NODE_ENV === "development") {
                window._background = background
            }
        }
    },
    
    methods: {
        pauseBackground() {
            background.stop()
        },

        resumeBackground() {
            background.run()
        },
    }
}