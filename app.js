const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;
const url = `https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap`;

// Ruta para realizar el scraping
app.get('/', (req, res) => {
  axios.get(url)
    .then(response => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);

        const pageTitle = $('h1').text();
        const links = [];
        const imgs = [];
        const texts = [];

        $('#mw-pages a').each((index, element) => {
          const link = $(element).attr('href');
          links.push(link);
        });

        $('img').each((index, element) => {
          const imageUrl = $(element).attr('src');
          imgs.push(imageUrl);
        });

        $('p').each((index, element) => {
          const paragraphText = $(element).text();
          texts.push(paragraphText);
        });
        res.json({ pageTitle, links, imgs, texts });
      } else {
        res.status(500).json({ error: 'Error al obtener los datos' });
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
