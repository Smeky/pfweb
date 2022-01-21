<template>
    <a class="link" :target="newTab ? '_blank' : ''" rel="noopener noreferrer">
        <slot></slot>
    </a>
</template>

<style lang="scss">
    @import "~/styles/mixins.scss";

    .link {
        text-decoration: none;
        font-weight: bold;
        color: #ffffff;
        position: relative;

        &:active {
            color: inherit;
        }

        @include text-hover-effect;
    }
</style>

<script>
    export default {
        props: {
            newTab: {
                type: Boolean,
                defaut: false,
            }
        }
    }
</script>