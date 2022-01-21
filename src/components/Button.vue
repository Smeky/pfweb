<template>
    <div class="button">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~/styles/mixins.scss";

    .button {
        font-size: 20px;
        line-height: 34px;
        padding: 2px 6px;
        cursor: pointer;
        user-select: none;

        @include text-hover-effect;
    }
</style>
