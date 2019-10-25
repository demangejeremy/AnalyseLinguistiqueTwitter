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

    // Fonction pour recuperer un tweet
    const result = await page.evaluate(() => {
        const anchors_node_list = document.querySelectorAll('p.tweet-text');
        const anchors = [...anchors_node_list];
        return anchors.map(link => link.innerText);
    });

    console.log(result);

    // Clique sur le bouton
    // await page.click('#stream-item-tweet-1185062702126731264 > div.tweet.js-stream-tweet.js-actionable-tweet.js-profile-popup-actionable.dismissible-content.original-tweet.js-original-tweet.has-cards.cards-forward > div.content > div.js-tweet-text-container > p');

    // Fermer le navigateur
    // await browser.close();
    
})();