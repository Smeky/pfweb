<template>
    <div id="root">
        <Background :isRunning="isBackgroundActive" />
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
                    <Projects />
                </Section>
            </div>
        </Page>

        <Modal :open="isTmtdModalShown" :onClose="tmtdModalClosed">
            <iframe src="http://localhost:9001/dist/index.html" width="1024" height="768" />
        </Modal>

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
                isBackgroundActive: false,
                isTmtdModalShown: false
            }
        },

        methods: {
            showTmtdModal() {
                this.isTmtdModalShown = true
                this.isBackgroundActive = false
            },

            tmtdModalClosed() {
                this.isTmtdModalShown = false
                this.isBackgroundActive = true
            }
        }
    }
</script>