<template>
    <div class="about">
        <img class="profile-pic" src="~/assets/images/profile.png" />
        
        <div class="description">
            <p style="font-size: 22px;">I am Tom</p><br/>
            <p>a forever curious programmer from Pilsen, Czechia, who loves to create interactive things of all kinds</p>
                <br/>
            <p class="highlight">Websites, desktop & web apps, games, you name it!</p>
                <br/>
            <p>I tought myself how to program in high school trying to make games, which let me to a career in development. Over the years I have touched many projects, languages, libraries and frameworks. And even though I am capable of making wide range of stuff on my own, I prefer to be a team player!</p>
                <br/>
            <p>Today, you'll likely find me at a local cafe's bar, scrambling something on my laptop and chatting with everyone around</p>

        </div>
    </div>
</template>

<style lang="scss">
    @import "~/styles/mixins.scss";

    .about {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        @include res-desktop {
            flex-wrap: nowrap;
        }

        .description {
            text-align: center;
            padding: 30px 20px;

            @include res-desktop {
                margin: 0 40px;
            }

            > .highlight {
                font-size: 20px;
                font-weight: normal;
            }
        }

        p {
            font-size: 18px;
        }
    }

    .profile-pic {
        width: 230px;
        height: 230px;
        border-radius: 160px;
        margin-bottom: 16px;
        filter: grayscale(1);

        @include res-tablet {
            width: 320px;
            height: 320px;
        }
    }
</style>