const quoteText = document.querySelector('.quote'),
quoteBtn = document.querySelector('button'),
authorName = document.querySelector('.name'),
speechBtn = document.querySelector('.speech'),
copyBtn = document.querySelector('.copy'),
twitterBtn = document.querySelector('.twitter'),
synth = speechSynthesis,
URL = 'http://api.quotable.io/random'

function randomQuote() {
  quoteBtn.classList.add('loading')
  quoteBtn.innerHTML = 'Loading Quote...'

  fetch(URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error HTTP: " + response.status)
    }
    return response.json()
  })
  .then(result => {
    quoteText.innerHTML = result.content
    authorName.innerHTML = result.author
    quoteBtn.classList.remove("loading")
    quoteBtn.innerHTML = 'New Quote'
  })
  .catch((error) => console.error(error))
}

speechBtn.addEventListener('click', () => {
  if(!quoteBtn.classList.contains('loading')){
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText}
    by ${authorName.innerText}`)
    synth.speak(utterance)
    setInterval(() => {
      !synth.speaking ? speechBtn.classList.remove('active') 
      : speechBtn.classList.add('active')
    }, 10)
  }
})

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(quoteText.innerHTML)
})

twitterBtn.addEventListener('click', () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`
  window.open(tweetUrl, '_blank')
})

quoteBtn.addEventListener('click', randomQuote)
