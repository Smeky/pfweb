<template>
    <div class="skills">
        <Skill v-bind:progress="90" description="HTML, CSS, ...">
            <SkillIcon :label="'Frontend'" />
        </Skill>

        <Skill v-bind:progress="60" description="">
            <SkillIcon :label="'Backend'" />
        </Skill>
        
        <Skill v-bind:progress="95" description="General language knowledge, ES6, ...">
            <SkillIcon :label="'JS'" />
        </Skill>
        
        <Skill v-bind:progress="100" description="Trust me, I am fast - VSCode is work of art">
            <SkillIcon :label="'Code editting'" />
        </Skill>
        
        <Skill v-bind:progress="80" description="Including the usual tech stack - Redux, Express, ...">
            <SkillIcon :label="'React'" />
        </Skill>
        
        <Skill v-bind:progress="35">
            <SkillIcon :label="'Vue'" />
        </Skill>

        <Skill v-bind:progress="80">
            <SkillIcon :label="'Python'" />
        </Skill>
        
        <Skill v-bind:progress="30" description="It's been years since the last time...">
            <SkillIcon :label="'C++'" />
        </Skill>
        
        <Skill v-bind:progress="60" description="Setting up NPM projects - webpack, babel and many others">
            <SkillIcon :label="'NPM'" />
        </Skill>
    </div>
</template>

<style lang="scss">
    @import "~/mixins.scss";

    .skills {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        
        @include res-tablet {
            .skill {
                flex: 50%;
                max-width: 50%;
            }
        }
        
        .skill:last-child {
            margin-bottom: 0;
        }
    }
</style>