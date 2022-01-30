<template>
    <div id="root">
        <canvas id="background"></canvas>

        <Page>
            <Introduction />
            <NewNavigation />
            <!-- <Navigation /> -->

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
