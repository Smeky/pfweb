<template>
    <div class="skill-icon">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .skill-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 12px;
        padding: 6px;

        color: rgba(255, 255, 255, 0.4);
        font-weight: bold;
        text-align: center;
        
        background-color: rgba(28, 49, 95, 0.6);
        width: 54px;
        min-width: 54px;
        height: 54px;
        border-radius: 36px;
    }
</style>