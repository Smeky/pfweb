<template>
    <div class="navigation" :class="{ '--open': isOpen }">
        <Button class="menu-button" 
                icon @click.native="handleMenuClick">
            <img src="~/assets/images/menu.png" />
        </Button>
        
        <div class="navbar">
            <p>{{ navSection }}</p>
        </div>

        <div class="navlist-container">
            <transition name="navlist">
                <div class="navlist" v-show="isOpen" ref="navlist">
                    <Button v-for="item in navItems"
                            noUnderline
                            :href="item.id"
                            v-bind:key="item.id"
                            @click.native="scrollTo(item.id)">
                            
                        {{ item.label }}
                    </Button>
                </div>
            </transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .navigation {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
    }
    .navigation.--open {
        .menu-button {
            box-shadow: inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1);
        }
        .navbar > p {
            opacity: 0.3;
        }
    }

    .menu-button {
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        transition: box-shadow 0.3s;
    }

    .navbar {
        width: 100%;
        height: 52px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: #030407;

        > p {
            font-size: 24px;
            transition: opacity 0.3s;
        }
    }

    .navlist-container {
        overflow: hidden;
    }
    .navlist {
        background-color: #030407f7;

        &-enter-active {
            transition: transform 0.5s;
        }
        &-leave-active {
            transition: transform 0.3s;            
        }
    
        &-enter, &-leave-to {
            transform: translateY(-100%);
        }

        .button {
            font-size: 22px;
            text-align: center;
            width: 100%;
            padding: 5px 0;
        }
    }
</style>

<script>
    export default {
        data() {
            return {
                isOpen: true,
                navSection: "Home",
                navItems: [
                    { label: "Home",     id: "root" },
                    { label: "About",    id: "about" },
                    { label: "Skills",   id: "skills" },
                    { label: "Projects", id: "projects" },
                ],
            }
        },

        mounted() {
            window.addEventListener("scroll", this.handleScroll)
        },

        destroyed() {
            window.removeEventListener("scroll", this.handleScroll)
        },

        methods: {
            handleMenuClick() {
                this.isOpen = !this.isOpen
            },

            handleScroll() {
                // Find which section we've scrolled to
                const item = this.navItems.find((_, index, array) => {
                    // Last element
                    if (index === array.length - 1) {
                        return true
                    }

                    const nextEl = document.getElementById(array[index + 1].id)
                    return nextEl.offsetTop - window.scrollY > 0;
                })

                this.navSection = item.label
            },

            scrollTo(id) {
                this.isOpen = false

                const anchor = document.getElementById(id.replace("#", ""))
                window.scrollTo(0, anchor.offsetTop)
            },
        }
    }
</script>