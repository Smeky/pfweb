<template>
    <div class="project-button" v-on:click="onClick()">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .project-button {
        font-size: 20px;
        padding: 6px 10px;
        cursor: pointer;
        user-select: none;
    }
</style>

<script>
    export default {
        props: {
            onClick: Function
        }
    }
</script>