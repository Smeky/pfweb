<template>
    <div class="projects">
        <Project id="tmtd" title="Tower Defense">
            <ProjectImage :src="require('~/assets/images/tmtd1.png')" />
            <ProjectDescription>
                <p>
                    A Tower Defense game in which I try to create several layers of mechanics to keep the gameplay interesting for more than just a few hours. The game design decision behind this is inspired mainly by Path of exile. 
                    <br/><br/>
                    It's my current pet project that I like to work on to keep myself a bit entertained.
                </p>

                <Button class="project-button" v-if="$device.isDesktop" @click.native="showTmtdModal">Play now</Button>
            </ProjectDescription>
        </Project>

        <Project title="Tower Defense #1" brief="Game, 2D Tower defense">
            <ProjectImage />
            <ProjectDescription>
                <p>
                    Made this one in my third year of high school and it was my first game ever!
                    <br/><br/>
                    The game is written in C++, using SDL for simle graphics and user input.
                    <br/>
                    <i>There's a playable <Link href="https://github.com/Smeky/Tower-Defense-Game" newTab>"Smeky's TD.exe"</Link> in project's root directory.</i>
                </p>
            </ProjectDescription>
            <SrcCodeLink href="https://github.com/Smeky/Tower-Defense-Game" />
        </Project>

        <Project id="arcana" title="Arcana" brief="Game, 2D Rogue-like RPG">
            <ProjectImage :src="require('~/assets/images/arcana6.png')"/>
            <ProjectDescription>
                <p>
                    My second game that I've been developing for over 7 months, still high school days.
                    <br/>
                    I even streamed the development process on Twitch.tv back then.
                    <br/><br/>
                    Written in C++ for core engine and Lua for scripting most of the game components. SFML for graphics and user input. Game-wise it is still my largest project to this day eventhough I haven't touched it in years.
                </p>

                <Button class="project-button" href="~/assets/files/Arcana pre-alpha v0.07.zip" download>Download now</Button>
            </ProjectDescription>
            <SrcCodeLink href="https://github.com/Smeky/Arcana" />
        </Project>

        <Project title="This website!">
            <ProjectImage />
            <ProjectDescription>
                <p>
                    This website's complete source code is also available on <Link href="https://github.com/Smeky/pfweb" newTab>GitHub</Link>
                </p>
            </ProjectDescription>
            <SrcCodeLink href="https://github.com/Smeky/pfweb" />
        </Project>

        <Modal :open="isTmtdModalShown" :onClose="tmtdModalClosed">
            <iframe src="http://localhost:9001/dist/index.html" width="1024" height="768" />
        </Modal>
    </div>
</template>

<style lang="scss">
    @import "~/styles/mixins.scss";

    .project .project-button {
        font-size: 24px;
    }

    #tmtd .project-image > img {
        filter: grayscale(0.3);
    }

    #arcana .project-image > img {
        position: relative;
        left: 0px;
        top: 62px;
        transform: scale(1.7);
        filter: grayscale(0.4);
    }

    @include res-tablet {
        .project .source-link {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
</style>

<script>
    export default {
        props: {
            onModalOpen: {
                type: Function,
                required: true,
            },
            onModalClosed: {
                type: Function,
                required: true,
            },
        },

        data() {
            return {
                isTmtdModalShown: false,
            }
        },

        methods: {
            showTmtdModal() {
                this.isTmtdModalShown = true
                this.onModalOpen()
            },

            tmtdModalClosed() {
                this.isTmtdModalShown = false
                this.onModalClosed()
            }
        }
    }
</script>