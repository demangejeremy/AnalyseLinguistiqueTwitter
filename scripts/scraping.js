/////////////////////////////////////////
//
// Scraping tweets d'un compte Twitter
// (Licence MIT)
// Par @demangejeremy
//
/////////////////////////////////////////

// Declaration prealable
const puppeteer = require('puppeteer');
const fs = require("fs");

// Declaration des variables
let username = "demangejeremy";
let nbTweets = 40;


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
    console.log('Chargement en cours...');
    let loop = true;
    while (loop) {

        await page.waitFor(2000)


            let calcul = await page.evaluate(async() => {
                var defilement = 100;
                let anchors_node_list;
                let anchors;
                let resultat;
                anchors_node_list = document.querySelectorAll('p.tweet-text');
                anchors = [...anchors_node_list];
                window.scrollBy(0, defilement);
                defilement += 4000;
                resultat = anchors.map(i => i.innerText);
                return resultat;
            });


            console.log(`Calcul en cours : ${calcul.length} / ${nbTweets}`);

            // Condition d'arret
            if(calcul.length > nbTweets - 1) {
                loop = false;
            }
    }

    // Fonction pour recuperer un tweet
    const result = await page.evaluate(() => {
        const anchors_node_list = document.querySelectorAll('p.tweet-text');
        const anchors = [...anchors_node_list];
        return anchors.map(i => i.innerText);
    });

    // Nom du fichier a ecrire
    let nomFichier = `analyse-${username}.txt`;

    // Donnees du fichier
    let stockage = "";

    // Boucle sur les textes pour construire notre fichier
    for(let i in result) {
        stockage += `**** *${username} *tweet${i} \r\n`;
        stockage += result[i];
        stockage += `\r\n\r\n`;
        if (i >= nbTweets - 1) break;
    }

    // Ecriture dans un fichier
    await fs.writeFile(nomFichier, stockage, (err) => {
        if (err) console.log(err);
        console.log("Fichier prêt.");
    });

    // Fermer le navigateur
    await browser.close();
    
})();