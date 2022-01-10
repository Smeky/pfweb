<template>
    <div class="section">
        <h2 v-if="title">{{ title }}</h2>
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .section {
        margin: 150px 0;
    }

    .section h2 {
        font-size: 30px;
    }
</style>

<script>
    export default {
        props: ["title"]
    }
</script>