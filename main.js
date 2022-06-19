const websites = [
  {
    displayName: 'Libraccio.it',
    url: 'https://www.libraccio.it/',
    urlBuilder: (isbn) => `https://www.libraccio.it/src/?FT=${isbn}`,
  },
  {
    displayName: 'libreriascolastica.it',
    url: 'https://www.libreriascolastica.it',
    urlBuilder: (isbn) => `https://www.libreriascolastica.it/ricerca/query/${isbn}/reparto/tutti`,
    faviconPath: 'skins/152782/images/favicon/favicon-32x32.png',
  },
  {
    displayName: 'Bancolibri',
    url: 'https://www.bancolibri.it/',
    urlBuilder: (isbn) => `https://www.bancolibri.it/?s=${isbn}&product_cat=0&post_type=product`,
  },
  {
    displayName: 'unilibro',
    url: 'https://www.unilibro.it/',
    urlBuilder: (isbn) => `https://www.unilibro.it/libro/${isbn}`,
  },
  {
    displayName: 'LSDlibri.it',
    url: 'https://www.lsdlibri.it',
    urlBuilder: (isbn) => `https://www.lsdlibri.it/lista_libri?str_ricerca=${isbn}`,
    faviconPath: 'images/ico_addressbar.1531041230.png',
  },
];

websites.forEach(website => {
  const container = document.getElementById('websites');

  // No user input so this is safe, although still not a best practice
  const html = `
    <div class="website" data-url="` + website.url + `">
      <div>
        <img src="` + website.url + `/` + (website.faviconPath ?? 'favicon.ico') + `">
        <h2 class="title">` + website.displayName + `</h2>
      </div>
      <a href="` + website.url + `" target="_blank">` + website.url + `</a>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', html);
});

document
  .getElementById('search')
  .addEventListener('submit', e => {
    e.preventDefault();

    const isbn = e.target.elements.isbn.value;

    Array
      .from(document.getElementsByClassName('website'))
      .map(websiteElement => {
        const website = websites
          .find(website => website.url === websiteElement.getAttribute('data-url'));

        return website.urlBuilder(isbn);
      })
      .forEach(url => open(url, '_blank'));
  });
