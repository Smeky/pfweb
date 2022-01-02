<template>
    <div id="root">
        <Background/>
        <Page>
            <div class="introduction">
                <p id="introduction"></p>
            </div>
            <Section id="projects">
                <Project title="TMTD">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt mattis laoreet. Nulla massa ligula, cursus nec mauris sit amet, dignissim lobortis nibh. Integer sed volutpat augue. Suspendisse sodales sem tempus mauris sodales condimentum. Nam faucibus ante eu enim pellentesque, aliquet aliquet nulla commodo. Fusce eu leo semper, finibus ex sed, egestas tortor. Ut vestibulum elit ante, sit amet porttitor est auctor ut. Vivamus in felis ac sapien fermentum elementum.
                </Project>

                <Project title="Second project" flipped>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt mattis laoreet. Nulla massa ligula, cursus nec mauris sit amet, dignissim lobortis nibh. Integer sed volutpat augue. Suspendisse sodales sem tempus mauris sodales condimentum. Nam faucibus ante eu enim pellentesque, aliquet aliquet nulla commodo. Fusce eu leo semper, finibus ex sed, egestas tortor. Ut vestibulum elit ante, sit amet porttitor est auctor ut. Vivamus in felis ac sapien fermentum elementum.
                </Project>
            </Section>
        </Page>
        <Footer />
    </div>
</template>

<style lang="scss">
    #root {
        display: flex;
        justify-content: center;
    }
    
    .introduction {
        text-align: center;
        font-size: 24px;
        height: 300px;

        p {
            display: inline-block;
        }
    }
</style>

<script>
    import Typed from "typed.js"

    export default {
        mounted() {
            new Typed("#introduction", {
                strings: ["I'm Tom^1200, bla bla bla^1200, bla bla"],
                typeSpeed: 30,
                loop: true,
            })
        }
    }
</script>