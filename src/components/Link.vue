<template>
    <a class="link" :target="newTab ? '_blank' : ''" rel="noopener noreferrer">
        <slot></slot>
    </a>
</template>

<style lang="scss">
    .link {
        text-decoration: none;
        font-weight: bold;
        color: #ffffff;

        &:active {
            color: inherit;
        }

        &:hover {
            text-decoration: underline;
        }

        &:not([href]) {
            &:hover {
                text-decoration: none;
            }
        }
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