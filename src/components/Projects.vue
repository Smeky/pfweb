<template>
    <div class="projects">
        <Project id="mythicplanner" title="Mythic Planner" brief="Site, shared live editting">
            <ProjectImage><img src="~/assets/images/mythicplanner.png" /></ProjectImage> 
            <ProjectDescription>
                <p>
                    A website for planning Mythic+ dungeon routes in World of Warcraft I mad back in 2018. It involved everything you'd expect from a Web app - authentication, databases and even live document editting.
                    <br/><br/>
                    Express, MongoDB & socket.io (live editting) on Backend and React, MobX & Konva on the Frontend. 
                </p>
            </ProjectDescription>
            <SrcCodeLink href="https://github.com/Smeky/MythicPlanner" />
        </Project>

        <Project id="tmtd" title="TM TD" brief="Browser game, 2D Tower Defense">
            <ProjectImage class="--clickable" @click.native="slides = true">
                <img src="~/assets/images/tmtd.png" />
            </ProjectImage>
            
            <ProjectDescription>
                <p>
                    A Tower Defense game in which I try to create several layers of mechanics to keep the gameplay interesting for more than just a few hours. The game design decision behind this is inspired mainly by Path of exile. 
                    <br/><br/>
                    It's my current pet project that I like to work on to keep myself a bit entertained.
                </p>

                <OnPlatform :enabled="$device.isDesktop" hint="Open on PC to play right here">
                    <Button class="project-button" @click.native="() => { isTmtdModalShown = true }">Play now</Button>
                </OnPlatform>
            </ProjectDescription>
        </Project>

        <Project id="smekystd" title="Smeky's TD" brief="Game, 2D Tower defense">
            <ProjectImage><img src="~/assets/images/smekystd.png" /></ProjectImage> 
            <ProjectDescription>
                <p>
                    Made this one in my third year of high school and it was my first game ever!
                    <br/><br/>
                    The game is written in C++, using SDL for simle graphics and user input.
                </p>

                <OnPlatform :enabled="$device.isDesktop" hint="Open on PC to download a playable version">
                    <Link class="project-button" href="~/assets/files/Smeky's TD public ver 0.2.4.zip" download>Download playable version</Link>
                </OnPlatform>
            </ProjectDescription>
            <SrcCodeLink href="https://github.com/Smeky/Tower-Defense-Game" />
        </Project>

        <Project id="arcana" title="Arcana" brief="Game, 2D Rogue-like RPG">
            <ProjectImage><img src="~/assets/images/arcana.png" /></ProjectImage>
            
            <ProjectDescription>
                <p>
                    My second game that I've been developing for over 7 months, still high school days.
                    <br/>
                    I even streamed the development process on Twitch.tv back then.
                    <br/><br/>
                    Written in C++ for core engine and Lua for scripting most of the game components. SFML for graphics and user input. Game-wise it is still my largest project to this day eventhough I haven't touched it in years.
                </p>

                <OnPlatform :enabled="$device.isDesktop" hint="Open on PC to download a playable version">
                    <Link class="project-button" href="~/assets/files/Arcana pre-alpha v0.07.zip" download>Download playable version</Link>
                </OnPlatform>
            </ProjectDescription>
            <SrcCodeLink href="https://github.com/Smeky/Arcana" />
        </Project>

        <Project title="My portfolio website!">
            <ProjectDescription>
                <p>
                    Of course this website must not be missing! Made in Nuxt (Vue), with Pixi.js for the background animations 
                </p>
            </ProjectDescription>
            <SrcCodeLink href="https://github.com/Smeky/pfweb" />
        </Project>

        <Modal :open="slides" :onClose="() => slides = !slides">
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

        <Modal :open="isTmtdModalShown" :onClose="() => { isTmtdModalShown = !isTmtdModalShown }">
            <iframe src="http://localhost:9001/dist/index.html" width="1024" height="768" />
        </Modal>
    </div>
</template>

<style lang="scss">
    @import "~/styles/mixins.scss";

    #mythicplanner .project-image {
        filter: brightness(2);
    }

    .project {
        &:nth-child(2n) > .content {
            flex-direction: row-reverse;
        }

        .project-button {
            padding: 2px 6px;
            font-size: 24px;
            font-weight: normal;
        }

        .platform {
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

    .project-image.--clickable {
        cursor: pointer;
    }
</style>

<script>
    export default {
        data() {
            return {
                slides: false,
                isTmtdModalShown: false,
            }
        },
    }
</script>