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

Kirjautuneet käyttäjät pystyvät muokkaamaan omia tietojaan, tilaamaan ja lisäämään itselleen profiilikuvan.

## Toiminnallisuudet


### Kaikille

| Kirjautuminen ja rekisteröinti | Profiilin muokkaus |
| ------------ | ----------- |
|<img src="https://github.com/teemueka/burgerpage/assets/122282513/6d7135e4-1e97-4613-a411-caaf748dda2a" width="300px"> | <img src="https://github.com/teemueka/burgerpage/assets/122282513/cab709d2-77c6-464d-8e36-bcd5e2d756f1" width="300px">|

| Tilausten muokkaus | Tilausten tarkastus |
| ------------ | ----------- |
<img src="https://github.com/teemueka/burgerpage/assets/122282513/f280fb9d-3164-47cf-8a51-620a6bd0d275" width="300px">| <img src="https://github.com/teemueka/burgerpage/assets/122282513/0491b82b-cbae-43ea-bc6e-f426905e1e55" width="300px">|



### Hallinto

Admin käyttäjillä on näkyvyys kaikkeen ravintolan sisäiseen toimintaan ja kyky vaikuttamaan reaaliajassa.
Hallinnon toiminnallisuudet vaativat 'admin' roolin.

| Kaikki reikisteröityneet käyttäjät ja käyttäjien lisäys. | Ravintolan tuotteet, tuotteiden poisto ja lisäys. |
| ------------ | ----------- |
| <img src="https://github.com/teemueka/burgerpage/assets/122282513/71270c7c-1fba-4a1a-8dfd-5f06ece31257">| <img src="https://github.com/teemueka/burgerpage/assets/122282513/30038961-22a5-40c3-9a95-030579352ac5">|


| Ravintolan täytteet ja täytteiden lisäys. | Kaikki menneet ja meneillään olevat tilaukset ja niiden hallinnointi. |
| ------------ | ----------- |
| <img src="https://github.com/teemueka/burgerpage/assets/122282513/9681bd93-3b56-4f1a-bd8b-5804d5f472d8">| <img src="https://github.com/teemueka/burgerpage/assets/122282513/390f0cf7-5144-4834-9795-1604a03aca08">|

## Käytetyt työkalut

### Rungot:
- RESTful API rakennettu [Express.js](https://expressjs.com/) avulla.
- Projektin API löytyy [tästä linkistä](https://github.com/JoelPalu/burgers_back)

### Ohjelmointikielet:
- JavaScript

## Dokumentaatio
- [JSDoc](https://users.metropolia.fi/~teemueka/burgerpageJSDoc/out/global)
- [apiDoc](http://10.120.32.60/burgerpage/doc/documentation.html)

## Tekijät:
- [Teemu Kallio](https://github.com/teemueka)
- [Kirill Saveliev](https://github.com/JoelPalu)
