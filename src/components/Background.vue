<template>
    <canvas id="background"></canvas>
</template>

<style lang="scss">
    #background {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        opacity: 0.2;
    }
</style>

<script>
    import Background from "~/scripts/background"    

    export default {
        props: {
            isRunning: Boolean,
        },

        watch: {
            isRunning(value) {
                value ? this.background.run() : this.background.stop()
            }
        },

        mounted() {
            this.background = new Background()
            this.background.run()

            // Expose background to devtools
            if (process.env.NODE_ENV === "development") {
                window._background = this.background
            }
        }
    }
</script>