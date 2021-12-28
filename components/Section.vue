<template>
    <div class="section">
        <h2 v-if="title">{{ title }}</h2>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: ["title"]
    }
</script>