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

const randomQuote = () => {
    // Return a random quote
    let randomIndex = Math.floor(quotes.length * Math.random());
    return quotes[randomIndex].quote;
}
// Sets the text in the quote-box
selectors['text'].innerHTML = randomQuote();



