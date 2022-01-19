<template>
    <div>
        <Project title="Tower Defense">
            <ProjectDescription>
                <p>
                    A Tower Defense game in which I try to create several layers of mechanics to keep the gameplay interesting for more than just a few hours. The game design decsion behind this is inspired mainly by Path of exile. 
                    <br/><br/>
                    It's my current pet project that I like to work on to keep myself a bit entertained.
                </p>
                <Button v-if="$device.isDesktop" @click.native="showTmtdModal">Play now</Button>
            </ProjectDescription>
        </Project>

        <Project title="Tower Defense #1" link="https://github.com/Smeky/Tower-Defense-Game" brief="Game, 2D Tower defense" flipped>
            <ProjectDescription>
                <p>
                    My first game ever. I've made it in my third year of high school.
                    <br/><br/>
                    The game is written in C++, using SDL for simle graphics and user input. <i>There's a playable <Link href="https://github.com/Smeky/Tower-Defense-Game" newTab>"Smeky's TD.exe"</Link> in project's root directory.</i>
                </p>
            </ProjectDescription>
        </Project>

        <Project title="Arcana" link="https://github.com/Smeky/Arcana" brief="Game, 2D Rogue-like RPG">
            <ProjectDescription>
                <p>
                    My first big game that I've been developing for over 7 months during my high school days.
                    <br/><br/>
                    This one is also in C++, additionally with Lua for scripting, using SFML for graphics and user input. Game-wise it is still my largest project to this day evethough I haven't touched it in years. 
                </p>
            </ProjectDescription>
        </Project>
    </div>
</template>