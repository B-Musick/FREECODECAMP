// Quotes to be used
const quotes = [
    { author: 'Buddha', quote: 'All that we are is the result of what we have thought.' },
    { author: 'Einstein', quote: 'I have no special talent. I am only passionately curious.' },
    { author: 'Mother Teresa', quote: 'If you judge people, you have no time to love them.' },
    { author: 'Plato', quote: 'The greatest wealth is to live content with little.' },
    { author: 'Nelson Mandela', quote: 'It always seems impossible until it’s done.'},
    { author: 'Malcom X', quote: 'A man who stands for nothing will fall for anything.' },
    { author: 'Julius Ceasar', quote: 'I came, I saw, I conquered.'}
]

// Selectors for html elements by id
const selectors = {
    quoteBox: document.getElementById('quote-box'),
    text: document.getElementById('text'),
    author: document.getElementById('author'),
    newQoute: document.getElementById('new-quote'),
    tweetQuote: document.getElementById('tweet-quote')
}

// Method to generate quote
const randomQuote = () => {
    // Return a random quote// When click button should get #text and replace it with new quote
    selectors['newQoute']
    let randomIndex = Math.floor(quotes.length * Math.random());
    return quotes[randomIndex];
}

/**********************  GENERATE FIRST QUOTE  ********************************/

// Get a new quote
generatedQoute = randomQuote();

// Sets the text in the quote-box
selectors['text'].innerHTML = generatedQoute.quote;

// Set the author of the quote
selectors['author'].innerHTML = generatedQoute.author;

/**********************  GENERATE QUOTE FROM BUTTON ***************************/
// When click button should get #text and replace it with new quote
selectors['newQoute'].addEventListener('click', ()=>{
    let newGeneratedQoute = randomQuote();
    while (newGeneratedQoute.quote === selectors['text'])
        // If the quote is the same as the previous, the loop will generate a new one
        newGeneratedQoute = randomQuote();

        if(generatedQoute.quote !== selectors['text']){
            console.log('hi');
            // If not the same as the previous quote
            selectors['text'].innerHTML = newGeneratedQoute.quote;
            selectors['author'].innerHTML = newGeneratedQoute.author;
            
        }
})

