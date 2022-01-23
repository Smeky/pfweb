<template>
    <div class="project">
        <h3 class="title">
            {{ title }}
            <span class="brief" v-if="brief">{{ brief }}</span>
        </h3>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "~/styles/mixins.scss";

    .project {
        margin-bottom: 70px;
        position: relative;
    }

    .project .project-image {
        margin-top: 10px;
    }

    .title {
        padding-left: 16px;
        padding-bottom: 12px;
        margin-bottom: 6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 24px;
        font-weight: normal;

        display: flex;
        flex-direction: column;

        @include res-tablet {
            flex-direction: row;
            align-items: center;
        }
    }

    .brief {
        font-size: 17px;
        font-weight: normal;
        font-style: italic;
        color: #808080;
        
        @include res-tablet {
            margin-left: 14px;
        }
    }

    .content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        position: relative;
        padding-top: 12px;

        @include res-desktop {
            flex-wrap: nowrap;
            padding-top: 24px;
            padding-right: 10px;
        }

        > p {
            text-align: center;
            font-size: 18px;
            padding: 40px 20px 0 20px;
    
            @include res-desktop {
                margin: 0 60px;
            }
        }
    }
</style>

<script>
    export default {
        props: {
            "title": String,
            "brief": String,
        }
    }
</script>