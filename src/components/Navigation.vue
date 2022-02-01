<template>
    <NavigationMobile  :items="navItems" :sectionId="navItems[scrollSectionIndex].id" v-if="$device.isMobile" />
    <NavigationDefault :items="navItems" :sectionId="navItems[scrollSectionIndex].id" v-else />
</template>

<script>
    export default {
        data() {
            return {
                scrollSectionIndex: 0,
                navItems: [
                    { label: "Home",     id: "home" },
                    { label: "About",    id: "about" },
                    { label: "Skills",   id: "skills" },
                    { label: "Projects", id: "projects" },
                    { label: "Contact",  id: "contact" },
                ],
            }
        },

        mounted() {
            const observer = new IntersectionObserver(
                (elements) => {
                    elements.forEach(el => {
                        const elIndex = this.navItems.findIndex(({id}) => id === el.target.id)
                        
                        // If we scrolled into new section
                        if (el.isIntersecting && elIndex < this.scrollSectionIndex) {
                            this.scrollSectionIndex = elIndex
                        }
                        // if we scrolled out of section
                        else if (!el.isIntersecting && elIndex === this.scrollSectionIndex) {
                            if (this.scrollSectionIndex < this.navItems.length) {
                                this.scrollSectionIndex++
                            }
                        }
                    })
                },
                { threshold: [0.1] }
            )

            this.navItems.forEach((item) => {
                observer.observe(document.getElementById(item.id))
            })
        }
    }
</script>