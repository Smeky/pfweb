<template>
    <div class="project">
        <h3 class="title">{{ title }}</h3>
        <div class="content" v-bind:class="{ '--flipped': flipped }">
            <div class="image">
                <div class="img-placeholder" />
            </div>
            <p class="description">
                <slot></slot>
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .project {
        margin-bottom: 70px;
    }

    .title {
        padding-left: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 24px;
    }

    .content {
        display: flex;
        flex-direction: row-reverse;
        flex-wrap: wrap;
        justify-content: center;

        .img-placeholder {
            margin-left: 20px;
        }

        &.--flipped {
            flex-direction: row;

            .img-placeholder {
                margin-left: 0;
                margin-right: 20px;
            }
        }
    }

    .description {
        margin: 40px 20px 0 20px;
        text-align: center;
        font-size: 18px;
        // min-width: 400px;
        max-width: 50%;
    }

    .image {
        
    }

    .img-placeholder {
        display: block;
        min-width: 400px;
        width: 400px;
        height: 400px;
        border-radius: 200px;
        background-color: rgba(100, 100, 100, 0.2);
    }
</style>

<script>
    export default {
        props: {
            "title": String,
            "flipped": Boolean,
        }
    }
</script>