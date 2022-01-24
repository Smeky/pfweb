<template>
    <div id="root">
        <Background :isRunning="!isModalOpen" />
        <Page>
            <Introduction />

            <Modal :open="slides">
                <Slideshow v-slot="{ current }">
                    <Slide key="arcana" :currentSlide="current">
                        <img src="~/assets/images/arcana.png" />
                    </Slide>
                    <Slide key="mythicplanner" :currentSlide="current">
                        <img src="~/assets/images/mythicplanner.png" />
                    </Slide>
                    <Slide key="smekystd" :currentSlide="current">
                        <img src="~/assets/images/smekystd.png" />
                    </Slide>
                    <Slide key="tmtd" :currentSlide="current">
                        <img src="~/assets/images/tmtd.png" />
                    </Slide>
                </Slideshow>
            </Modal>
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
                isModalOpen: false,
                slides: false,
            }
        },

        methods: {
            onModalOpen() {
                this.isModalOpen = true
            },

            onModalClosed() {
                this.isModalOpen = false
            }
        },

        mounted() {
            setTimeout(() => { this.slides = true }, 500)
        }
    }
</script>