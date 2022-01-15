<template>
    <div id="root">
        <Background :isRunning="isBackgroundActive" />
        <Page>
            <Introduction />
            <Navigation />

            <div>
                <Section id="skills">   
                    <Skills />
                </Section>

                <Section id="projects">
                    <Project title="Tower Defense">
                        <ProjectDescription>
                            <p>
                                A Tower Defense game in which I try to create several layers of interesting mechanics to keep the gameplay interesting for more than just a few hours.  
                                <br/><br/>
                                It's a pet project of mine that I like to work on to keep myself a bit entertained.
                            </p>

                            <Button @click.native="showTmtdModal">Play now</Button>
                        </ProjectDescription>
                    </Project>

                    <Project title="Second project" flipped>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt mattis laoreet. Nulla massa ligula, cursus nec mauris sit amet, dignissim lobortis nibh. Integer sed volutpat augue. Suspendisse sodales sem tempus mauris sodales condimentum. Nam faucibus ante eu enim pellentesque, aliquet aliquet nulla commodo. Fusce eu leo semper, finibus ex sed, egestas tortor. Ut vestibulum elit ante, sit amet porttitor est auctor ut. Vivamus in felis ac sapien fermentum elementum.
                        </p>
                    </Project>
                </Section>
                
                <Section id="about">
                    <About />
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