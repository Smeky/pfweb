<template>
    <div id="root">
        <Background :isRunning="!isModalOpen" />
        <Page>
            <Introduction />
            <Navigation />

            <div>
                <Section id="about">
                    <About />
                </Section>
                
                <Section id="skills">   
                    <Skills />
                </Section>

                <Section id="projects">
                    <Projects :onModalOpen="onModalOpen" :onModalClosed="onModalClosed" />
                </Section>
            </div>
        </Page>

        <Footer />
    </div>
</template>

<style lang="scss">
    #root {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>

<script>
    export default {
        data() {
            return {
                isModalOpen: false
            }
        },

        methods: {
            onModalOpen() {
                this.isModalOpen = true
            },

            onModalClosed() {
                this.isModalOpen = false
            }
        }
    }
</script>