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
        margin-bottom: 70px;

        @include res-tablet {
            margin-top: 90px;
        }

        @include res-desktop {
            max-width: 1024px;
            margin-top: 130px;
        }
    }
</style>
