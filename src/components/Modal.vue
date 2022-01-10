<template>
    <div class="modal" v-on:click="onClose">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    body.modal-open {
        overflow: hidden;
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.7);

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<script>
    export default {
        props: {
            onClose: Function
        },

        mounted() {
            document.body.classList.add("modal-open")
        },

        destroyed() {
            document.body.classList.remove("modal-open")
        }
    }
</script>