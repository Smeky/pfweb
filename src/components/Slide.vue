<template>
    <!-- <transition name="slide"> -->
        <div class="slide" v-show="currentSlide === $vnode.key">
            <slot></slot>
        </div>
    <!-- </transition> -->
</template>

<style lang="scss">
    .slide {
        // &-enter-active, &-leave-active {
        //     transition: position 0.5s;
        // }
    }
</style>

<script>
    export default {
        props: ["currentSlide"],
    }
</script>
