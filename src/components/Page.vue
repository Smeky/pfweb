<template>
    <div class="page">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~/mixins.scss";

    .page {
        padding: 0 30px;
        min-height: 100%;
        margin-top: 160px;
        margin-bottom: 200px;

        @include res-desktop {
            max-width: 1024px;
        }
    }
</style>
