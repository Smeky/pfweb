<template>
    <div class="skill-icon">
        <p>{{ label }}</p>
    </div>
</template>

<style lang="scss">
    .skill-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 12px;
        padding: 6px;
        
        background-color: rgba(28, 49, 95, 0.6);
        width: 64px;
        min-width: 64px;
        height: 64px;
        border-radius: 64px;

        p {
            color: rgba(255, 255, 255, 0.55);
            font-weight: 600;
            text-align: center;
            line-height: 17px;
            
            &::first-letter {
                font-size: 22px;
                font-weight: bold;
            }
        }
    }
</style>

<script>
    export default {
        props: {
            label: String
        }
    }
</script>