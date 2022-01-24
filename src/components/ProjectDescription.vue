<template>
    <div class="project-description">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~/styles/mixins.scss";

    .project-description {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-bottom: 40px;
        width: 100%;

        @include res-tablet {
            padding-bottom: 0;
        }

        > p {
            text-align: center;
            font-size: 18px;
            padding: 40px 20px 0 20px;
    
            @include res-desktop {
                margin: 0 40px;
            }
        }
    }
</style>