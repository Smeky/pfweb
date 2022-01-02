<template>
    <footer>
        © {{ new Date().getFullYear() }} Tomas Sobota
    </footer>
</template>

<style lang="scss">
    footer {
        position: fixed;
        bottom: 0;
        width: 100%;    
        text-align: center;
        font-style: italic;
        font-size: 14px;
        margin-bottom: 5px;
    }
</style>