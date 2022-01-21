<template>
    <Link class="source-link" :href="href" newTab>
        source on <img src="~/assets/images/GitHub_Logo.png" />
    </Link>
</template>

<style lang="scss">
    .source-link {
        display: inline-flex;
        align-items: center;
        color: gray;
        background-color: rgba(0, 0, 0, 0.35);
        padding: 3px 3px 3px 6px;
        border-radius: 6px;
        font-weight: normal;
        transition: color 0.3s;

        &:hover {
            text-decoration: none;
            color: #fff675;
        }

        &:after,
        &:hover:after {
            display: none;
        }
        
        > img {
            margin-left: 2px;
            height: 23px;
            filter: invert(1);
        }
    }
</style>

<script>
    export default {
        props: {
            href: String,
        }
    }
</script>