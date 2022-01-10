<template>
    <div class="project">
        <h3 class="title">{{ title }}</h3>
        <div class="content" v-bind:class="{ '--flipped': flipped }">
            <div class="image">
                <div class="img-placeholder"></div>
            </div>
            
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "~/mixins.scss";

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

        &.--flipped {
            flex-direction: row;
        }

        @include res-desktop {
            flex-wrap: nowrap;
        }

        > p {
            text-align: center;
            font-size: 18px;
            padding: 40px 20px 0 20px;
    
            @include res-desktop {
                margin: 0 40px;
            }
        }
    }

    .img-placeholder {
        background-color: rgba(100, 100, 100, 0.2);
        width: 200px;
        height: 200px;
        border-radius: 200px;
        
        @include res-tablet {
            width: 300px;
            height: 300px;
        }

        @include res-desktop {
            width: 400px;
            height: 400px;
        }
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