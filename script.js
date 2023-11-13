const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// -----> If you're using the localQuotes array you can remove apiQuotes variable
// 1...........
let apiQuotes = [];

// Loading Spinner Shown
function loading() { 
  loader.hidden = false;     //loader will show 
  quoteContainer.hidden = true;  //the contianer will hide
}

// Remove Loading Spinner
function complete() {
  quoteContainer.hidden = false; //when completed container will show up
  loader.hidden = true;    //the loader bottom will hide
}

//2.................... Show New Quote
function newQuote() {
  loading();

  // -----> Only use one of the following const quote statements

  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // console.log(quote)
  // Pick a random quote from localQuotes array
  // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];

  // Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// -----> If you're using the localQuotes array you can remove getQuotes() function 

// That's one of the key advantages of asynchronous operations in JavaScript. When an asynchronous function is executing, it doesn't block the entire program or freeze other processes. Instead, the program can continue running other tasks while waiting for the asynchronous operation to complete.
// Get Quote From API
//reponse will not be populated until it has some data fetched from our api


//1............... Get Quotes From API    //fetch quotes from api
// let apiQuotes = [];
//if we are fetching api from our local we don't need to fetch the api from the server just we can comment this down and normally fetch the api from local this is outisde local which is in the server we are fetching from there so

async function getQuotes() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes)
    // console.log(apiQuotes[12])
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, '_blank');   //open the window using our twitter url pass the blank it is becuase it will allow to twitter windows to open in new tab
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load       //in loading a page a new quote will appear
getQuotes();

// -----> If using API, run getQuotes(), if not run newQuote() instead
// newQuote();
