<template>
    <div class="skills">
        <Skill v-bind:progress="90" description="HTML, CSS, ...">
            <SkillIcon>Testy test</SkillIcon>
        </Skill>
        
        <Skill v-bind:progress="50">
            <SkillIcon>Testy test</SkillIcon>
        </Skill>
        
        <Skill v-bind:progress="20">
            <SkillIcon>Test</SkillIcon>
        </Skill>
        
        <Skill v-bind:progress="50">
            <SkillIcon>Test #2</SkillIcon>
        </Skill>
    </div>
</template>

<style lang="scss">
    .skills {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        
        .skill {
            margin: 0 10px 12px 10px;
            max-width: 480px;
        }
        .skill:last-child {
            margin-bottom: 0;
        }
    }
</style>