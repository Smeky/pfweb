<template>
    <div class="introduction">
        <h1 id="headline">Tom's Portfolio</h1>
        <p id="introduce"></p>
    </div>
</template>

<style lang="scss">
    @import "~/styles/mixins.scss";
    
    .introduction {
        text-align: center;
        font-size: 24px;
        margin-top: 100px;

        @include res-tablet {
            margin-bottom: 70px;
        }

        p {
            display: inline-block;
        }
        
        #headline {
            font-size: 40px;
            font-weight: 400;
            animation: fadein 1s ease-out;
            color: #d1d1d1;
            margin: 0;

            @keyframes fadein {
                from {
                    opacity: 0;
                    transform: scale(0.75);
                }

                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        }
    }
</style>

<script>
    import Typed from "typed.js"

    export default {
        mounted() {
            document.getElementById("headline").addEventListener("animationend", () => {
                // new Typed("#introduce", {
                //     strings: ["Welcome..."],
                //     typeSpeed: 60,
                //     startDelay: 1000,
                //     loop: false,
                // })
            }, { once: true })
        }
    }
</script>