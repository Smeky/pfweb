<template>
    <div class="slideshow-container">
        <div id="left" class="nav" @click="handlePrevClick"></div>
        <div class="slideshow">
            <slot :current="slides[slideIndex].key"></slot>
        </div>
        <div id="right" class="nav" @click="handleNextClick"></div>
    </div>
</template>

<style lang="scss">
    @import "~/styles/mixins.scss";

    .slideshow-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        max-width: max(1024px, 80vw);
    }

    .slideshow-container > .nav {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        flex-shrink: 0;
        margin: 0 20px;
        cursor: pointer;
        opacity: 0.5;
        transition: opacity 0.3s;

        background-color: rgba(255, 255, 255, 0.1);
        background-size: 50%;
        background-repeat: no-repeat;

        &:hover {
            opacity: 1;
        }

        &#left {
            background-image: url("~assets/images/nav-left.png");
            background-position: 40%;
        }
        &#right {
            background-image: url("~assets/images/nav-right.png");
            background-position: 60%;
        }
    }

    .slideshow {
        display: flex;
        justify-content: center;
        user-select: none;
        width: 100%;
    }
</style>

<script>
    export default {
        data() {
            return {
                slideIndex: 0,
            }
        },

        computed: {
            slides() {
                return this.$scopedSlots.default().filter(slot => !!slot.tag)
            }
        },

        methods: {
            handlePrevClick(event) {
                event.stopPropagation()
                
                if (this.slideIndex > 0) {
                    this.slideIndex--
                }
            },

            handleNextClick(event) {
                event.stopPropagation()

                if (this.slideIndex < this.slides.length - 1) {
                    this.slideIndex++
                }
            },
        }
    }
</script>
