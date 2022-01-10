<template>
    <div class="skills">
        <Skill v-bind:progress="90" description="HTML, CSS, ...">
            <SkillIcon :label="'Web'" />
        </Skill>
        
        <Skill v-bind:progress="95" description="General language knowledge, ES6, ...">
            <SkillIcon :label="'JS'" />
        </Skill>
        
        <Skill v-bind:progress="70">
            <SkillIcon :label="'React'" />
        </Skill>
        
        <Skill v-bind:progress="35">
            <SkillIcon :label="'Vue'" />
        </Skill>

        <Skill v-bind:progress="90">
            <SkillIcon :label="'Python'" />
        </Skill>
        
        <Skill v-bind:progress="30" description="It's been years since the last time...">
            <SkillIcon :label="'C++'" />
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