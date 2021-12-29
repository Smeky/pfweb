<template>
    <div id="app-root">
        <Background/>
        <Page>
            <Section>
                <p id="test"></p>
            </Section>
            <Section id="projects" title="Projects">
                
            </Section>
        </Page>
    </div>
</template>

<script>
    import Typed from "typed.js"

    export default {
        mounted() {
            new Typed("#test", {
                strings: ["First sentence.", "Second sentence."],
                typeSpeed: 30,
                loop: true,
            })
        }
    }
</script>