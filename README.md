# Burgerpage

Projekti suoritettu osana Metropolia amk tutkintoa toisella vuosikurssilla. Projektin tavoitteena oli luoda mahdollisimman käyttäjäystävällinen, dynaaminen ja monipuolinen ravintola sivu.
Kaikki käyttäjien tekemät muutokset näkyvät sivulla reaaliajassa.

## Esivaatimukset
Ennen aloittamista varmista, että olet täyttänyt seuraavat vaatimukset:

Node.js: Projekti vaatii Node.js:n asennuksen. Voit ladata sen osoitteesta [nodejs.org](https://nodejs.org/en).


## Asennusohjeet

Kloonaa repositorio ja asenna riippuvuudet seuraavilla komennoilla:

```
git clone https://github.com/teemueka/burgerpage.git
cd burgerpage
npm install
```

## Käyttöohjeet

Käyttäjällä on mahdollisuus selata ja lisätä ostoskoriin tuotteita, mutta tilausta varten käyttäjän tulee olla kirjautuneena sisään.
![logintoorder.png](..%2F..%2FDownloads%2Flogintoorder.png)
Kirjautuneet käyttäjät pystyvät muokkaamaan omia tietojaan, tilaamaan ja lisäämään itselleen profiilikuvan.

## Toiminnallisuudet


| Kaikille                                                                |
|-------------------------------------------------------------------------|
| Kirjautuminen ja rekisteröinti                                          |
| ![loginNregistration.png](..%2F..%2FDownloads%2FloginNregistration.png) |
| Profiilin muokkaus                                                      |
| ![profile-page.png](..%2F..%2FDownloads%2Fprofile-page.png)             |
| Tilausten muokkaus                                                      |
| ![user-customization.png](..%2F..%2FDownloads%2Fuser-customization.png) |
| Tilausten tarkastus                                                     |
| ![user-order.png](..%2F..%2FDownloads%2Fuser-order.png)                 |


Admin käyttäjillä on näkyvyys kaikkeen ravintolan sisäiseen toimintaan ja kyky vaikuttamaan reaaliajassa.
Hallinnon toiminnallisuudet vaativat 'admin' roolin.

| Hallinto                                                                      |
|-------------------------------------------------------------------------------|
| Kaikki reikisteröityneet käyttäjät ja käyttäjien lisäys.                      |
| ![hallinto-käyttäjät.png](..%2F..%2FDownloads%2Fhallinto-k%E4ytt%E4j%E4t.png) |
| Ravintolan tuotteet, tuotteiden poisto ja lisäys.                             |
| ![hallinto-tuotteet.png](..%2F..%2FDownloads%2Fhallinto-tuotteet.png)         |
| Ravintolan täytteet ja täytteiden lisäys.                                     |
| ![hallinto-täytteet.png](..%2F..%2FDownloads%2Fhallinto-t%E4ytteet.png)       |
| Kaikki menneet ja meneillään olevat tilaukset ja niiden hallinnointi.         |
| ![hallinto-tilaukset.png](..%2F..%2FDownloads%2Fhallinto-tilaukset.png)       |

## Käytetyt työkalut

### Rungot:
- RESTful API rakennettu [Express.js](https://expressjs.com/) avulla.
- Projektin API löytyy [tästä linkistä](https://github.com/JoelPalu/burgers_back)

### Ohjelmointikielet:
- JavaScript

## Dokumentaatio
- [JSDoc](https://users.metropolia.fi/~teemueka/burgerpageJSDoc/out/global)
- [apiDoc](https://users.metropolia.fi/~kirillsa/burger_api/documentation.html)

## Tekijät:
- [Teemu Kallio](https://github.com/teemueka)
- [Kirill Saveliev](https://github.com/JoelPalu)
