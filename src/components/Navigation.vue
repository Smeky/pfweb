<template>
    <div id="navbar">
        <div class="navigation" 
             v-if="$device.isMobile"
             v-bind:class="{ '--fixed': isFixed }">

            <Button v-for="navItem in navList"
                    :id="navItem.id"
                    :key="navItem.id"
                    @click.native="() => handleNavClick(navItem.href)">

                {{ navItem.label }}
            </Button>
        </div>

        <div class="navigation --desktop"
             v-else
             v-bind:class="{ '--fixed': isFixed }">
            
            <Button v-for="navItem in navList"
                    :id="navItem.id"
                    :key="navItem.id"
                    :style="isFixed ? navItem.styles.fixed : navItem.styles.default"
                    @click.native="() => handleNavClick(navItem.href)">

                {{ navItem.label }}
            </Button>
        </div>
    </div>
</template>

<style lang="scss">
    $navbar-height: 50px;

    #navbar {
        height: $navbar-height;
        margin-bottom: 100px;
    }

    .navigation {
        height: $navbar-height;
        display: flex;
        justify-content: center;
        transition: all 0.5s ease;
        z-index: 1;
        background-color: none;

        width: 100%;
        position: absolute;
        right: 50%;
        transform: translateX(50%);

        > .button {
            transition: all 0.5s ease;
            margin: 0 2px;
            font-weight: normal;
            font-size: 24px;
        }

        &.--fixed {
            background-color: #070a12;
            position: fixed;
            top: 0;
        }

        &.--desktop {
            width: auto;
            
            > .button {
                height: 30px;
                margin: 0 10px;
            }
    
            &.--fixed {
                background-color: initial;
                right: 40px;
                transform: translate(0%);
    
                > .button {
                    margin: 0;
                }
            }
        }
    }
</style>

<script>
    export default {
        data() {
            return {
                isFixed: false,
                navList: [
                    { id: "nav1", label: "Home",     href: "#root",     styles: { default: null, fixed: null }},
                    { id: "nav2", label: "About",    href: "#about",    styles: { default: null, fixed: null }},
                    { id: "nav3", label: "Skills",   href: "#skills",   styles: { default: null, fixed: null }},
                    { id: "nav4", label: "Projects", href: "#projects", styles: { default: null, fixed: null }},
                ],
            }
        },

        mounted() {
            window.addEventListener("scroll", this.handleScroll)

            this.navList.forEach((navItem, index) => {
                navItem.styles.default = { left: 0, top: 0 }
                navItem.styles.fixed   = this.getItemFixedStyle(navItem.id, index)
            })
        },
        
        destroyed() {
            window.removeEventListener("scroll", this.handleScroll)
        },

        methods: {
            handleScroll() {
                this.isFixed = document.getElementById("navbar").offsetTop < window.scrollY
            },

            handleNavClick(href) {
                const anchor = document.getElementById(href.replace("#", ""))
                
                if (!anchor) {
                    console.error(`Invalid href "${href}"`)
                    return
                }

                window.scrollTo(0, anchor.offsetTop - window.innerHeight * 0.15)
            },

            getItemFixedStyle(itemId, index) {
                const height = document.getElementById(itemId).offsetHeight
                const width = this.navList.slice(index + 1).reduce((acc, navItem) => {
                    const { width } = document.getElementById(navItem.id).getBoundingClientRect()
                    return acc + width
                }, 0)

                return { left: `${width}px`, top: `${height * index}px` }
            }
        }
    }
</script>