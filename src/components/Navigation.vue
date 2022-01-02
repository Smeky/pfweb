<template>
    <div class="navigation">
        <a href="#projects">Projects</a>
    </div>
</template>

<style lang="scss">
    .navigation {
        position: fixed;
        top: 0;
        right: 0;

        display: flex;
        height: 50px;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
        padding: 6px 20px 6px 0;

        > a {
            padding: 8px 12px;
            font-size: 20px;
            height: 30px;
        }
    }
</style>