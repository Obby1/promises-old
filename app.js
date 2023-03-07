
// // Part 1: Number Facts
// // 1. 
// async function numFact (num, type){
//     let baseURL = `http://numbersapi.com/${num}/${type}?json`;
//     const res = await axios.get(`${baseURL}`);
//     console.log(res.data.text);
// }
// // 2. 
// async function numRangeFact (numStart, numEnd, type){
//     let baseURL = `http://numbersapi.com/${numStart}..${numEnd}/${type}?json`;
//     const res = await axios.get(`${baseURL}`);
//     console.log(res.data);
//     let facts = document.createElement(`ul`);
//     let numStuff = document.getElementById('num-stuff');
//     for (let trivia in res.data){
//         let factsLi = document.createElement('li');
//         console.log(`${trivia}: ${res.data[trivia]}`);
//         factsLi.append(`${trivia}: ${res.data[trivia]}`);

        
//     }  
//     numStuff.append(facts);
// }

// // 3. 
// async function getFacts(num, qty){
//     let baseURL = `http://numbersapi.com/${num}/trivia?json`;
//     let facts = document.createElement(`ul`);
//     let numStuff = document.getElementById('num-stuff');
//     for (let i = 0; i< qty; i++){
//         const res = await axios.get(`${baseURL}`);
//         let factsLi = document.createElement('li');
//         console.log(res.data.text);
//         factsLi.append(res.data.text);
//         facts.append(factsLi);
//     } 
//     numStuff.append(facts);  
// }


// Promise.all version:
// async function getFacts(num, qty) {
//   let baseURL = `http://numbersapi.com/${num}/trivia?json`;
//   let facts = document.createElement(`ul`);
//   let numStuff = document.getElementById('num-stuff');
//   let promises = [];

//   for (let i = 0; i < qty; i++) {
//     promises.push(axios.get(baseURL));
//   }

//   try {
//     const results = await Promise.all(promises);
//     results.forEach((res) => {
//       let factsLi = document.createElement('li');
//       console.log(res.data.text);
//       factsLi.append(res.data.text);
//       facts.append(factsLi);
//     });
//     numStuff.append(facts);
//   } catch (error) {
//     console.log(error);
//   }
// }


// //Part 2: Deck of Cards

// class Deck {
//     constructor() {
//       this.deckId = null;
//       this.initialize();
//     }
  
//     async initialize() {
//       const response = await axios.get('https://deckofcardsapi.com/api/deck/new/');
//       this.deckId = response.data.deck_id;
//       console.log(`Initialized deck with ID ${this.deckId}`);
//       await this.shuffle();
//     }
  
//     async shuffle() {
//       console.log(`Shuffling deck with ID ${this.deckId}`);
//       const response = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/?remaining=true`);
//     }
  
//     async drawOneCard() {
//       console.log(`Drawing one card from deck with ID ${this.deckId}`);
//       const response = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`);
//       console.log(response.data.remaining);
//       console.log(response.data.cards[0].image);
//       console.log(`Drew card: ${response.data.cards[0].value} of ${response.data.cards[0].suit}`);
//         if (response.data.remaining > 0){
//             return response.data.cards[0].image;
//         } else{
//             return alert("no more cards")
//         }
//     }
//   }
  
// let deck;

// async function playGame() {
//     if (!deck) {
//         deck = new Deck();
//         // await deck.initialize();
//         let button = document.getElementById('draw-card')
//         let cardStack = document.getElementById('cards-img')
//         button.addEventListener('click', async () => {          
//             try{const img = document.createElement("img");
//             img.src= await deck.drawOneCard();
//             cardStack.append(img);}
//             catch{
//                 button.innerHTML="restart game";
//                 location.reload();
//             }
//           });
//     }

// }

// playGame();



// Part 1: 
// function numFact(num, type) {
//   let baseURL = `http://numbersapi.com/${num}/${type}?json`;
//   return axios.get(`${baseURL}`).then((res) => {
//     console.log(res.data.text);
//   });
// }

// numFact(4, 'trivia');

// function numRangeFact(numStart, numEnd, type) {
//   let baseURL = `http://numbersapi.com/${numStart}..${numEnd}/${type}?json`;
//   return axios.get(baseURL)
//     .then((res) => {
//       console.log(res.data);
//       let facts = document.createElement(`ul`);
//       let numStuff = document.getElementById('num-stuff');
//       for (let trivia in res.data) {
//         let factsLi = document.createElement('li');
//         console.log(`${trivia}: ${res.data[trivia]}`);
//         factsLi.append(`${trivia}: ${res.data[trivia]}`);
//         facts.appendChild(factsLi);
//       }
//       numStuff.append(facts);
//     });
// }

// numRangeFact(0,4, 'trivia');

// function getFacts(num, qty) {
//   let baseURL = `http://numbersapi.com/${num}/trivia?json`;
//   let facts = document.createElement(`ul`);
//   let numStuff = document.getElementById('num-stuff');
//   let promises = [];

//   for (let i = 0; i < qty; i++) {
//     promises.push(axios.get(baseURL));
//   }

//   Promise.all(promises)
//     .then((results) => {
//       results.forEach((res) => {
//         let factsLi = document.createElement('li');
//         console.log(res.data.text);
//         factsLi.append(res.data.text);
//         facts.append(factsLi);
//       });
//       numStuff.append(facts);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }


// getFacts(4,2);

// Part 2:
class Deck {
  constructor() {
    this.deckId = null;
    this.initialize().then(() => {
      this.shuffle().then(() => {
        console.log(`Shuffled deck with ID ${this.deckId}`);
      });
    });
  }

  initialize() {
    return axios.get('https://deckofcardsapi.com/api/deck/new/')
      .then((response) => {
        this.deckId = response.data.deck_id;
        console.log(`Initialized deck with ID ${this.deckId}`);
      });
  }

  shuffle() {
    console.log(`Shuffling deck with ID ${this.deckId}`);
    return axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/?remaining=true`);
  }

  drawOneCard() {
    console.log(`Drawing one card from deck with ID ${this.deckId}`);
    return axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
      .then((response) => {
        console.log(response.data.remaining);
        console.log(response.data.cards[0].image);
        console.log(`Drew card: ${response.data.cards[0].value} of ${response.data.cards[0].suit}`);
        if (response.data.remaining > 0) {
          return response.data.cards[0].image;
        } else {
          let button = document.getElementById('draw-card');
          button.innerHTML = "restart game";
          return alert("no more cards");
        }
      })
  }
}


let deck;

function playGame() {
  if (!deck) {
    deck = new Deck();
    let button = document.getElementById('draw-card');
    let cardStack = document.getElementById('cards-img');
    button.addEventListener('click', () => {
      deck.drawOneCard().then((cardImage) => {
        const img = document.createElement("img");
        img.src = cardImage;
        cardStack.append(img);
      }).catch(() => {
        location.reload();
      });
    });
  }
}

playGame();

