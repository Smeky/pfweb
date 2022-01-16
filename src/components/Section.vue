<template>
    <div class="section">
        <h2 v-if="title">{{ title }}</h2>
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~/mixins.scss";

    .section {
        margin: 70px 0;

        @include res-desktop {
            margin: 150px 0;
        }

        &:first-of-type {
            margin-top: 0;
        }
        &:last-of-type {
            margin-bottom: 0;
        }
    }

    .section h2 {
        font-size: 30px;
    }
</style>

<script>
    export default {
        props: ["title"]
    }
</script>