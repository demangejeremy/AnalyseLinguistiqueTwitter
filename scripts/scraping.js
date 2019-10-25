/////////////////////////////////////////
//
// Scraping tweets d'un compte Twitter
// (Licence MIT)
// Par @demangejeremy
//
/////////////////////////////////////////

// Declaration prealable
const puppeteer = require('puppeteer');

// Declaration des variables
let username = "demangejeremy";

// Fonction pour scroller notre page
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 500;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 2000);
        });
    });
}


// Lancement du script general
(async () => {

    // Lancement du navigateur    
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--lang=fr-FR,fr']
    });
    const page = await browser.newPage();

    // Acces a la page de Twitter
    await page.goto(`https://www.twitter.com/${username}`);

    // Scroller notre page
    await autoScroll(page);

    // Fonction pour recuperer un tweet
    const result = await page.evaluate(() => {
        const anchors_node_list = document.querySelectorAll('p.tweet-text');
        const anchors = [...anchors_node_list];
        return anchors.map(i => i.innerText);
    });

    console.log(result.length);

    // Clique sur le bouton
    // await page.click('#stream-item-tweet-1185062702126731264 > div.tweet.js-stream-tweet.js-actionable-tweet.js-profile-popup-actionable.dismissible-content.original-tweet.js-original-tweet.has-cards.cards-forward > div.content > div.js-tweet-text-container > p');

    // Fermer le navigateur
    // await browser.close();
    
})();