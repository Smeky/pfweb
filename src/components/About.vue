<template>
    <div class="about">
        <img class="profile-pic" src="~/assets/profile.png" />
        
        <div class="description">
            <p>I am Tom. Forever curious programmer from Pilsen, Czechia, who loves to create interactive things of all kinds.</p>
                <br/>
            <p style="font-size: 20px;">Websites, desktop & web apps, games, you name it.</p>
                <br/>
            <p>I tought myself how to program in high school trying to make games in C++ (link - Arcana, Tower Defense), which let me to a career in development. Today, you'll likely find me at a local cafe's bar, scrambling something on my laptop and chatting with everyone around</p>
                <br/>
            <p>Over the years I've touched many projects, languages, libraries and frameworks. It would be impossible to list them all, but I'll try my best.</p>

        </div>
    </div>
</template>

<style lang="scss">
    .about {
        display: flex;

        .description {
            text-align: center;
            padding: 30px 60px;
        }

        p {
            font-size: 18px;
        }
    }

    .profile-pic {
        width: 320px;
        height: 320px;
        border-radius: 160px;
    }
</style>