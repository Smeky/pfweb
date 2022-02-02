<template>
    <div class="navigation" :class="{ '--open': isOpen }">
        <Button class="menu-button" 
                icon @click.native="handleMenuClick">
            <img src="~/assets/images/menu.png" />
        </Button>
        
        <div class="section-name">
            <p>{{ sectionName }}</p>
        </div>

        <div class="navlist-container">
            <transition name="navlist">
                <div class="navlist" v-show="isOpen" ref="navlist">
                    <Button v-for="item in items"
                            noUnderline
                            :key="item.id"
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
        z-index: 10;
        width: 100%;
    }
    .navigation.--open {
        .menu-button {
            box-shadow: inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1);
        }
        .section-name > p {
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
        display: flex;
        justify-content: center;
        align-items: center;

        > img {
            width: 32px;
            height: 32px;
        }
    }

    .section-name {
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
        props: {
            items: {
                type: Array,
                default: []
            },
            sectionId: String,
        },

        data() {
            return {
                isOpen: false,
            }
        },

        computed: {
            sectionName() {
                const item = this.$props.items.find((item) => item.id === this.$props.sectionId)
                return item.label
            }
        },

        methods: {
            handleMenuClick() {
                this.isOpen = !this.isOpen
            },

            scrollTo(id) {
                this.isOpen = false

                const anchor = document.getElementById(id.replace("#", ""))
                window.scrollTo(0, anchor.offsetTop)
            },
        }
    }
</script>