<template>
    <div class="platform">
        <slot v-if="enabled"></slot>
        <p v-else class="hint">{{ hint }}</p>
    </div>
</template>

<style lang="scss">
    .platform {
        .hint {
            color: gray;
        }
    }
</style>

<script>
    export default {
        props: {
            enabled: Boolean,
            hint: String
        },

        methods: {
            mounted() {
                console.log(this.enabled)
            }
        }
    }
</script>