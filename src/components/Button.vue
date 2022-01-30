<template>
    <div class="button" 
        :class="{ '--icon': icon, '--no-underline': noUnderline }">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~/styles/mixins.scss";

    .button {
        font-size: 20px;
        line-height: 34px;
        padding: 2px 6px;
        cursor: pointer;
        user-select: none;
        width: max-content;

        @include text-hover-effect;

        &.--icon {
            padding: 6px;

            > img {
                width: 100%;
            }
        }

        &.--icon,
        &.--no-underline {
            &:after {
                display: none;
            }
        }
    }
</style>

<script>
    export default {
        props: {
            icon: {
                type: Boolean,
                default: false,
            },
            noUnderline: {
                type: Boolean,
                default: false,
            }
        }
    }
</script>