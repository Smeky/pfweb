<template>
    <div class="project-description">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~/mixins.scss";

    .project-description {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 40px;

        > p {
            text-align: center;
            font-size: 18px;
            padding: 40px 20px 0 20px;
    
            @include res-desktop {
                margin: 0 40px;
            }
        }

        > .button {
            margin-top: 50px;
        }
    }
</style>