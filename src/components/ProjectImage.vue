<template>
    <div class="project-image">
        <div class="img-placeholder" v-if="!src"></div>
        <img :src="src" v-if="!!src" />
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

        @include res-tablet {
            max-width: 300px;
            min-width: 300px;
            height: 300px;
        }

        > img {
            max-width: 100%;
            height: auto;
        }

        > .img-placeholder {
            background-color: rgba(100, 100, 100, 0.2); 
            width: 100%;
            height: 100%;
        }
    }
</style>

<script>
    export default {
        props: {
            src: String,
        },
    }
</script>
