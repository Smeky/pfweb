<template>
    <div class="contact">
        <div class="contact-card">
            <p class="name">Tomáš Sobota</p>
            <br />

            <div class="contact-info">
                <div class="contact-row">
                    <img src="~/assets/images/phone.png" />
                    <p>+420 736 263 948</p>
                </div>
                <div class="contact-row">
                    <img src="~/assets/images/email.png" />
                    <p>tomas.sobota.pers@gmail.com</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .contact {
        display: flex;
        justify-content: center;
    }

    .contact-card {
        padding: 20px;
        background-color: rgba(0, 0, 0, 0.65);
        border-radius: 10px;
        font-size: 18px;

        .name {
            font-weight: normal;
            font-size: 19px;
        }
    }

    .contact-info {
        display: flex;
        flex-direction: column;
    }
    
    .contact-row {
        display: inline-flex;
        align-items: center;
        margin-top: 10px;

        > img {
            width: 32px;
            margin-right: 16px;
        }
    }
</style>
