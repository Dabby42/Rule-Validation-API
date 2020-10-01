
let mail = 
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Aboki | Early User enrollment</title>
        <style>
        @import url("https://fonts.googleapis.com/css?family=Karla&display=swap");
        </style>
    </head>
    <body
        style="font-family: 'Karla', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f6f7fb;
    color: #7f7f7f;
    min-height: 100vh;
    position: relative;"
    >
        <div style="padding-top: 30px;">
        <div
            style="width: calc(100% - 20px);
        max-width: 500px;
        background-color: #fff;
        margin: 0 auto;
        padding: 50px;
        border-radius: 6px;
        text-align: center;
        box-shadow: 0px 10px 40px #69696915;
        box-sizing: border-box;"
        >
            <img
            src="https://res.cloudinary.com/tribenigeria-com/image/upload/v1595956998/logo_2_uczuvv.png"
            alt="Scrola Logo"
            style="width: 100px;
            margin: auto;
            margin-top: 50px;"
            />
            <h2
            class="title"
            style=" color: #1c1458;
        margin: 40px 0;"
            >
            Welcome to Scrola! <%= firstName %>
            </h2>
            <h3
            class="sub-title"
            style="
        margin: 40px 0;
        font-weight: 400;"
            >
            Thanks for signing up to Scrola; Scroll through what you love: News, stories, social media and more
            </h3>
       
            <p style="font-size: 0.7rem;">
            If you have any issue or need more information, please visit our
            <a style="color: #efbf41; text-decoration: none;">FAQ page</a>
            to have all your answers.
            </p>
        </div>
        </div>
        <footer
        style=" width: calc(100% - 20px);
        max-width: 500px;
        margin: 0 auto;"
        >
        <section style="float: right;">
            <ul
            style=" list-style: none;
            display: flex;"
            >
            <li>
                <a href="">
                <img
                    src="https://res.cloudinary.com/tribenigeria-com/image/upload/v1595957479/twitter_uuqzfy_zdcyhg.png"
                    alt="twitter logo"
                    width="15"
                    style="margin-left: 7px; margin-top: 0;"
                />
                </a>
            </li>
            <li>
                <a href="">
                <img
                    src="https://res.cloudinary.com/tribenigeria-com/image/upload/v1595957506/instagram_pyshnl_ei4hcj.png"
                    alt="instagram logo"
                    width="15"
                    style="margin-left: 7px; margin-top: 0;"
                />
                </a>
            </li>
            </ul>
        </section>
        <section style="display: inline-block;">
            <p style="font-size: 0.7rem;">hello@scrola.co</p>
        </section>
        </footer>
    </body>
    </html>

    `
module.exports = mail;