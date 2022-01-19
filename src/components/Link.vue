<template>
    <a :href="href" :target="newTab ? '_blank' : ''" rel="noopener noreferrer"><slot></slot></a>
</template>

<style lang="scss">
    a {
        text-decoration: none;
        font-weight: bold;
        color: #ffffff;

        &:active {
            color: inherit;
        }

        &:hover {
            text-decoration: underline;
        }
    }
</style>

<script>
    export default {
        props: {
            href: String,
            newTab: {
                type: Boolean,
                defaut: false,
            }
        }
    }
</script>