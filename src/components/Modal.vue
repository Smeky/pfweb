<template>
    <transition name="modal"
        @after-enter="contentVisible = true"
        @before-leave="contentVisible = false">
        
        <div class="modal" v-on:click="onClose" v-if="open">

            <transition name="modal-content">
                <div class="modal-content" v-if="contentVisible">
                    <slot></slot>
                </div>
            </transition>

        </div>
    </transition>
</template>

<style lang="scss">
    body.modal-open {
        overflow: hidden;
    }

    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.7);
        position: fixed;
        z-index: 10;

        &-leave-active {
            animation: unwrap 0.5s ease reverse;

            > .modal-content {
                transition: opacity 0.2s;
                opacity: 0;
            }
        }
        &-enter-active {
            animation: unwrap 0.5s ease;
        }

        @keyframes unwrap {
            from {
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                opacity: 0;
            }

            to {
                top: 0%;
                left: 0%;
                opacity: 1;
            }
        }
    }

    .modal-content {
        &-enter-active {
            animation: fadein 0.5s;
        }
        &-leave-active {
            animation: fadein 0.2s reverse;
        }

        @keyframes fadein {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }
    }
</style>

<script>
    export default {
        data() {
            return {
                contentVisible: false
            }
        },

        props: {
            open: {
                default: false,
                type: Boolean,
            },
            onClose: {
                default: null,
                type: Function,
            }
        },
        
        watch: {
            open: (isOpen) => {
                if (isOpen) {
                    document.body.classList.add("modal-open")
                }
                else {
                    document.body.classList.remove("modal-open")
                }
            }
        },
    }
</script>