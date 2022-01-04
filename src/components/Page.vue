<template>
    <div class="page">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~/mixins.scss";

    .page {
        margin-top: 160px;
        margin-bottom: 200px;
        padding: 0 30px;

        @include res-desktop {
            max-width: 1024px;
        }
    }
</style>
