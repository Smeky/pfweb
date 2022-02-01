<template>
    <div id="root">
        <canvas id="background"></canvas>

        <Page>
            <Section id="home">
                <Introduction />
            </Section>

            <Navigation />

            <Section id="about">
                <About />
            </Section>
            
            <Section id="skills">
                <Skills />
            </Section>

            <Section id="projects">
                <Projects />
            </Section>

            <Section id="contact">
                Contact placeholder
            </Section>
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
