<template>
    <div class="collapse" v-bind:class="{ collapsed: isCollapsed }">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .collapse {


        &.collapsed {
            display: none;
        }
    }
</style>

<script>
    export default {
        props: {
            isCollapsed: {
                default: true
            }
        },
    }
</script>