<template>
    <transition name="slide">
        <div class="slide" v-show="currentSlide === $vnode.key">
            <slot></slot>
        </div>
    </transition>
</template>

<style lang="scss">
    .slide {
        position: absolute;
        left: 0;

        &-enter-active {
            transition: all 0.5s;
        }

        &-enter {
            left: 100%;
        }

        &-enter-to {
            left: 0;
        }
    }
</style>

<script>
    export default {
        props: ["currentSlide"],
    }
</script>
