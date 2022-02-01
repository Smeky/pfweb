<template>
    <div ref="navbar" class="navigation" :class="{ '--sticky': isSticky }">
        <Button v-for="item in items"
                :key="item.id"
                :class="{ '--highlight': isSticky && item.id === sectionId }"
                @click.native="scrollTo(item.id)">
                
            {{ item.label }}
        </Button>
    </div>
</template>

<style lang="scss" scoped>
    .navigation {
        position: sticky;
        top: 0;
        display: inline-flex;
        justify-content: center;
        width: 100%;
        z-index: 10;
        padding: 6px 0;
        margin-top: 70px;

        > .button {
            font-size: 22px;
            text-align: center;
            margin: 0 30px;
            padding: 0 8px;
            transition: font-size 0.5s;

            &.--highlight {
                font-size: 25px;
            }
        }

        &:before {
            content: "";
            height: 0;
            width: 100vw;
            opacity: 0;
            position: absolute;
            top: 0;
            background-color: rgba(0, 0, 0, 0.8);
            transition: all 0.2s;
        }
        &.--sticky:before {
            opacity: 1;
            height: 100%;
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
                isSticky: false,
            }
        },

        mounted() {
            // Triggers when position: sticky is dis/active
            // https://stackoverflow.com/a/57991537
            const observer = new IntersectionObserver(
                ([el]) => { this.isSticky = el.intersectionRatio < 1 },
                {
                    rootMargin: '-1px 0px 0px 0px',
                    threshold: [1] 
                }
            )

            observer.observe(this.$refs.navbar)
        },

        methods: {
            scrollTo(id) {
                const anchor = document.getElementById(id.replace("#", ""))
                window.scrollTo(0, anchor.offsetTop)
            },
        }
    }
</script>