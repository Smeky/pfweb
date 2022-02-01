<template>
    <NavigationMobile  :items="navItems" v-if="$device.isMobile" />
    <NavigationDefault :items="navItems" v-else />
</template>

<script>
    export default {
        data() {
            return {
                navItems: [
                    { label: "Home",     id: "root" },
                    { label: "About",    id: "about" },
                    { label: "Skills",   id: "skills" },
                    { label: "Projects", id: "projects" },
                ],
            }
        }
    }
</script>