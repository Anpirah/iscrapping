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

        // Enviar una respuesta JSON con los datos obtenidos
        res.json({ pageTitle, links, imgs, texts });
      } else {
        // Si ocurre un error al obtener los datos, enviar un mensaje de error
        res.status(500).json({ error: 'Error al obtener los datos' });
      }
    })
    .catch(error => {
      // Manejar cualquier error que ocurra durante la solicitud
      console.error('Error al realizar la solicitud:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});


// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');

// const app = express();
// const port = 3000;

// // Ruta para realizar el scraping
// app.get('/', async (req, res) => {
//   try {
//     const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap';
//     const response = await axios.get(url);
//     const html = response.data;
//     const $ = cheerio.load(html);

//     // Array para almacenar las promesas de las solicitudes de scraping
//     const scrapingPromises = [];

//     // Recorrer todos los enlaces dentro del ID '#mw-pages'
//     $('#mw-pages a').each((index, element) => {
//       const enlaceMusico = $(element).attr('href');
//       const nombreMusico = $(element).text();

//       // Crear una promesa para cada solicitud de scraping
//       const scrapingPromise = axios.get('https://es.wikipedia.org' + enlaceMusico)
//         .then((response) => {
//           const htmlMusico = response.data;
//           const $musico = cheerio.load(htmlMusico);

//           // Extraer el título de la página
//           const tituloMusico = $musico('h1').text();

//           // Encontrar todas las imágenes ('img')
//           const imagenesMusico = [];
//           $musico('img').each((index, imgElement) => {
//             const imagenUrl = $musico(imgElement).attr('src');
//             imagenesMusico.push(imagenUrl);
//           });

//           // Encontrar todos los textos ('p')
//           const textosMusico = [];
//           $musico('p').each((index, pElement) => {
//             const texto = $musico(pElement).text();
//             textosMusico.push(texto);
//           });

//           // Devolver los datos del músico
//           return {
//             nombre: nombreMusico,
//             titulo: tituloMusico,
//             imagenes: imagenesMusico,
//             textos: textosMusico
//           };
//         })
//         .catch((error) => {
//           console.error('Error al acceder a la página del músico:', error);
//           // Si hay un error, devolver un objeto vacío
//           return {};
//         });

//       // Agregar la promesa al array de promesas
//       scrapingPromises.push(scrapingPromise);
//     });

//     // Esperar a que todas las promesas se resuelvan
//     const resultadosScraping = await Promise.all(scrapingPromises);

//     // Enviar los datos de los músicos de rap una vez que todas las promesas se resuelvan
//     res.json(resultadosScraping);
//   } catch (error) {
//     console.error('Error al realizar el scraping:', error);
//     res.status(500).send('Error interno del servidor');
//   }
// });

// // Iniciar el servidor
// app.listen(port, () => {
//   console.log(`Servidor escuchando en el puerto ${port}`);
// });




// // index.js

// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');

// const app = express();
// const port = 3000;

// // Ruta para realizar el scraping
// app.get('/', async (req, res) => {
//   try {
//     const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap';
//     const response = await axios.get(url);
//     const html = response.data;
//     const $ = cheerio.load(html);

//     // Array para almacenar los datos de los músicos de rap
//     const musicosDeRap = [];

//     // Recorrer todos los enlaces dentro del ID '#mw-pages'
//     $('#mw-pages a').each((index, element) => {
//       const enlaceMusico = $(element).attr('href');
//       const nombreMusico = $(element).text();

//       // Acceder a la página del músico
//       axios.get('https://es.wikipedia.org' + enlaceMusico)
//         .then((response) => {
//           const htmlMusico = response.data;
//           const $musico = cheerio.load(htmlMusico);

//           // Extraer el título de la página
//           const tituloMusico = $musico('h1').text();

//           // Encontrar todas las imágenes ('img')
//           const imagenesMusico = [];
//           $musico('img').each((index, imgElement) => {
//             const imagenUrl = $musico(imgElement).attr('src');
//             imagenesMusico.push(imagenUrl);
//           });

//           // Encontrar todos los textos ('p')
//           const textosMusico = [];
//           $musico('p').each((index, pElement) => {
//             const texto = $musico(pElement).text();
//             textosMusico.push(texto);
//           });

//           // Guardar los datos del músico en un objeto
//           const musico = {
//             nombre: nombreMusico,
//             titulo: tituloMusico,
//             imagenes: imagenesMusico,
//             textos: textosMusico
//           };

//           // Añadir el músico al array
//           musicosDeRap.push(musico);
//         })
//         .catch((error) => {
//           console.error('Error al acceder a la página del músico:', error);
//         });
//     });

//     // Envía los datos de los músicos de rap cuando haya terminado el scraping
//     res.json(musicosDeRap);
//   } catch (error) {
//     console.error('Error al realizar el scraping:', error);
//     res.status(500).send('Error interno del servidor');
//   }
// });

// // Iniciar el servidor
// app.listen(port, () => {
//   console.log(`Servidor escuchando en el puerto ${port}`);
// });
