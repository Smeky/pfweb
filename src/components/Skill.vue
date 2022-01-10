<template>
    <div class="skill">
        <slot></slot>
        <div class="skill-bar">
            <div class="progress" v-bind:style="{ width: progress + '%' }" />
            <p class="description" v-if="!!description">{{ description }}</p>
        </div>
    </div>
</template>

<style lang="scss">
    @import "~/mixins.scss";

    $skill-bg-height: 4px;
    $skill-progress-height: 7px;

    .skill {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        padding: 0 5px;
        box-sizing: border-box;

        @include res-desktop {
            padding: 0 15px;
        }
    }

    .skill-bar {
        height: $skill-bg-height;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: calc($skill-bg-height / 2);
    
        .progress {
            height: $skill-progress-height;
            width: 100%;
            background-color: #5b6078;
            position: relative;
            top: calc(($skill-bg-height - $skill-progress-height) / 2);
            border-radius: calc($skill-bg-height / 2);
        }

        .description {
            font-style: italic;
            font-size: 14px;
            margin-top: 3px;
            color: #a6a6a6;
        }
    }
</style>

<script>
    export default {
        props: {
            "progress": Number,
            "description": String,
        },
    }
</script>