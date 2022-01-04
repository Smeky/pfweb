<template>
    <div id="navbar">
        <div class="navigation" v-bind:class="{ '--fixed': isFixed }">
            <a href="#root">Home</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
        </div>
    </div>
</template>

<style lang="scss">
    $navbar-height: 50px;

    #navbar {
        height: $navbar-height;
        margin-bottom: 40px;
    }

    .navigation {
        display: flex;
        height: $navbar-height;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        transition: all 0.7s ease;

        position: absolute;
        right: 50%;
        transform: translateX(50%);
        z-index: 1;

        > a {
            padding: 8px 12px;
            font-size: 20px;
            height: 30px;
        }

        &.--fixed {
            position: fixed;
            top: 0;
            right: 40px;
            transform: translate(0%);
        }
    }
</style>

<script>
    export default {
        data() {
            return {
                isFixed: false
            }
        },

        mounted() {
            window.addEventListener("scroll", this.handleScroll)
        },
        
        destroyed() {
            window.removeEventListener("scroll", this.handleScroll)
        },

        methods: {
            handleScroll() {
                const navbar = document.getElementById("navbar")
                const { top } = navbar.getBoundingClientRect()

                this.isFixed = top < 0
            }
        }        
    }
</script>