<template>
    <div class="button">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .button {
        font-size: 20px;
        padding: 6px 10px;
        cursor: pointer;
        user-select: none;
        position: relative;

        &:after {
            content: "";
            height: 1px;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.5);

            position: absolute;
            bottom: 0;
            left: 0;

            transition: transform 0.4s ease-out;
            transform: scale(0)
        }

        &:hover:after {
            transform: scale(1)
        }
    }
</style>
