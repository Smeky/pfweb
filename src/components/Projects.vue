<template>
    <div>
        <Project title="Tower Defense">
            <ProjectImage id="tmtd" :src="require('~/assets/images/tmtd1.png')" />
            <ProjectDescription>
                <p>
                    A Tower Defense game in which I try to create several layers of mechanics to keep the gameplay interesting for more than just a few hours. The game design decsion behind this is inspired mainly by Path of exile. 
                    <br/><br/>
                    It's my current pet project that I like to work on to keep myself a bit entertained.
                </p>

                <Button class="play-button" v-if="$device.isDesktop" @click.native="showTmtdModal">Play now</Button>
            </ProjectDescription>
        </Project>

        <Project title="Tower Defense #1" link="https://github.com/Smeky/Tower-Defense-Game" brief="Game, 2D Tower defense">
            <ProjectImage />
            <ProjectDescription>
                <p>
                    My first game ever. I've made it in my third year of high school.
                    <br/><br/>
                    The game is written in C++, using SDL for simle graphics and user input. <i>There's a playable <Link href="https://github.com/Smeky/Tower-Defense-Game" newTab>"Smeky's TD.exe"</Link> in project's root directory.</i>
                </p>
            </ProjectDescription>
        </Project>

        <Project title="Arcana" link="https://github.com/Smeky/Arcana" brief="Game, 2D Rogue-like RPG">
            <ProjectImage />
            <ProjectDescription>
                <p>
                    My second game that I've been developing for over 7 months, still high school days. I even streamed the development process on Twitch.tv back then.
                    <br/><br/>
                    Written in C++ for core engine and Lua for scripting most of the game components. SFML for graphics and user input. Game-wise it is still my largest project to this day evethough I haven't touched it in years. 
                </p>
            </ProjectDescription>
        </Project>

        <Project title="This website!" link="https://github.com/Smeky/pfweb">
            <ProjectImage />
            <ProjectDescription>
                <p>
                    Did you know this website's complete source code is also available on <Link href="https://github.com/Smeky/pfweb" newTab>GitHub</Link>?
                </p>
            </ProjectDescription>
        </Project>

        <Modal :open="isTmtdModalShown" :onClose="tmtdModalClosed">
            <iframe src="http://localhost:9001/dist/index.html" width="1024" height="768" />
        </Modal>
    </div>
</template>

<style lang="scss">
    .play-button {
        font-size: 24px;
    }

    .project-image#tmtd {
        filter: grayscale(0.3);
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