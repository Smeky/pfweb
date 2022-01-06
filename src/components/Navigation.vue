<template>
    <div id="navbar">
        <div id="navmid" class="navigation">
            <a class="navlink" href="#root">Home</a>
            <a class="navlink" href="#projects">Projects</a>
            <a class="navlink" href="#skills">Skills</a>
        </div>

        <div id="navside" class="anchored">
            <a class="navlink hidden" href="#root">Home</a>
            <a class="navlink hidden" href="#projects">Projects</a>
            <a class="navlink hidden" href="#skills">Skills</a>
        </div>
    </div>
</template>

<style lang="scss">
    $navbar-height: 50px;

    .anchored {
        position: fixed;
        top: 0;
        right: 40px;

        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    
    .navlink {
        display: block;
        padding: 8px 12px;
        font-size: 20px;
        height: 30px;
        position: initial;
        visibility: visible;
        margin-right: 0;
        width: 80px;
        text-align: center;

        &.hidden {
            visibility: hidden;
            position: absolute;
        }

        &.transition {
            transition: all 0.2s ease-out;
        }

        &.offset {

        }
    }

    .navigation .navlink.transition,
    .navigation .navlink.offset {
        margin-right: 80px;
    }
    
    .anchored .navlink.transition,
    .anchored .navlink.offset {
        margin-top: 44px;
    }
    
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
        transition: all 0.3s ease;

        position: absolute;
        right: 50%;
        transform: translateX(50%);
        z-index: 1;

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
                isFixed: false,
            }
        },

        mounted() {
            window.addEventListener("scroll", this.handleScroll)
        },
        
        destroyed() {
            window.removeEventListener("scroll", this.handleScroll)
        },

        methods: {
            chainToSide(navbarLinks, anchorLinks, index) {
                const navbarEl = navbarLinks[index]
                const anchorEl = anchorLinks[index]

                navbarEl.classList.add("hidden")
                navbarEl.classList.remove("offset")
                anchorEl.classList.remove("hidden")

                if (index < navbarLinks.length - 1) {
                    navbarLinks[index + 1].classList.add("offset")
                }

                if (index < navbarLinks.length - 1) {
                    anchorEl.classList.add("transition")
                    anchorEl.addEventListener("transitionend", () => {
                        anchorEl.classList.remove("transition")
                        this.chainToSide(navbarLinks, anchorLinks, index + 1)
                    }, { once: true })
                }
            },

            chainToMid(navbarLinks, anchorLinks, index, afterLastFn) {
                const navbarEl = navbarLinks[index]
                const anchorEl = anchorLinks[index]

                anchorEl.classList.add("hidden")
                anchorEl.classList.remove("offset")
                navbarEl.classList.remove("hidden")

                if (index < navbarLinks.length - 1) {
                    anchorLinks[index + 1].classList.add("offset")
                }
                
                if (index < navbarLinks.length - 1) {
                    navbarEl.classList.add("transition")
                    navbarEl.addEventListener("transitionend", () => {
                        navbarEl.classList.remove("transition")
                        this.chainToMid(navbarLinks, anchorLinks, index + 1, afterLastFn)
                    }, { once: true })
                }

                if (index === navbarLinks.length - 1) {
                    afterLastFn()
                }
            },

            handleScroll() {
                const navbar = document.getElementById("navbar")
                const { top } = navbar.getBoundingClientRect()

                const wasFixed = this.isFixed
                this.isFixed = top < 0


                if (this.isFixed !== wasFixed) {
                    const navmid = document.getElementById("navmid")
                    const navside = document.getElementById("navside")
                    const navbarLinks = [...navmid.getElementsByClassName("navlink")]
                    const anchorLinks = [...navside.getElementsByClassName("navlink")]
                    
                    if (this.isFixed && !wasFixed) {
                        navmid.classList.add("--fixed")
                        navmid.addEventListener("transitionend", () => {
                            this.chainToSide(navbarLinks.reverse(), anchorLinks.reverse(), 0)
                        }, { once: true })
                    }
                    else if (!this.isFixed && wasFixed) {
                        this.chainToMid(navbarLinks, anchorLinks, 0, () => {
                            navmid.classList.remove("--fixed")
                        })
                    }
                }
            }
        }        
    }
</script>