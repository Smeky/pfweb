<template>
    <div class="page">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~/styles/mixins.scss";

    .page {
        padding: 0 30px;
        min-height: 100%;
        margin-bottom: 70px;

        @include res-desktop {
            max-width: 1024px;
        }
    }
</style>
