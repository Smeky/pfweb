<template>
    <div class="project-image">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~/styles/mixins.scss";

    .project-image {
        max-width: 200px;
        min-width: 200px;
        height: 200px;
        border-radius: 200px;
        overflow: hidden;
        outline: 1px solid #ffffff1a;
        outline-offset: 1px;

        @include res-tablet {
            max-width: 300px;
            min-width: 300px;
            height: 300px;
        }

        > img {
            max-width: 100%;
            height: auto;
        }
    }
</style>
