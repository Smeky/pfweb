<template>
    <div class="section">
        <h2 v-if="title">{{ title }}</h2>
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~/styles/mixins.scss";

    .section {
        padding-top: 100px;

        @include res-desktop {
            padding-top: 150px;
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