<template>
    <div class="page">
        <Navigation />
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .page {
        padding-top: 160px;
        padding-bottom: 200px;
        max-width: min(80vw, 1000px);
    }
</style>
