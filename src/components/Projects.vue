<template>
    <div class="projects">
        <Project id="tmtd" title="TM TD" brief="Browser game, 2D Tower Defense">
            <ProjectImage :src="require('~/assets/images/tmtd.png')" />
            <ProjectDescription>
                <p>
                    A Tower Defense game in which I try to create several layers of mechanics to keep the gameplay interesting for more than just a few hours. The game design decision behind this is inspired mainly by Path of exile. 
                    <br/><br/>
                    It's my current pet project that I like to work on to keep myself a bit entertained.
                </p>

                <Button class="project-button" v-if="$device.isDesktop" @click.native="showTmtdModal">Play now</Button>
            </ProjectDescription>
        </Project>

        <Project id="smekystd" title="Smeky's TD" brief="Game, 2D Tower defense">
            <ProjectImage :src="require('~/assets/images/smekystd.png')" />
            <ProjectDescription>
                <p>
                    Made this one in my third year of high school and it was my first game ever!
                    <br/><br/>
                    The game is written in C++, using SDL for simle graphics and user input.
                </p>
                
                <DownloadLink href="~/assets/files/Smeky's TD public ver 0.2.4.zip">Download now</DownloadLink>
            </ProjectDescription>
            <SrcCodeLink href="https://github.com/Smeky/Tower-Defense-Game" />
        </Project>

        <Project id="arcana" title="Arcana" brief="Game, 2D Rogue-like RPG">
            <ProjectImage :src="require('~/assets/images/arcana.png')"/>
            <ProjectDescription>
                <p>
                    My second game that I've been developing for over 7 months, still high school days.
                    <br/>
                    I even streamed the development process on Twitch.tv back then.
                    <br/><br/>
                    Written in C++ for core engine and Lua for scripting most of the game components. SFML for graphics and user input. Game-wise it is still my largest project to this day eventhough I haven't touched it in years.
                </p>

                <DownloadLink href="~/assets/files/Arcana pre-alpha v0.07.zip">Download now</DownloadLink>
            </ProjectDescription>
            <SrcCodeLink href="https://github.com/Smeky/Arcana" />
        </Project>

        <Project title="My portfolio website!">
            <ProjectImage />
            <ProjectDescription>
                <p>
                    Of course this website must not be missing!
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

    .project {
        .project-button,
        .download {
            font-size: 24px;
            font-weight: normal;
            margin-top: 40px;
        }

        @include res-tablet {
            .source-link {
                position: absolute;
                top: 0;
                right: 0;
            }
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