import elInfo from './el_info.json' with {type:'json'}
const elKeys = ['atomic_number', 'element_name', 'symbol', 'atomic_mass', 'period', 'group', 'block', 'atomic_radius', 'electronegativity', 'melting_point', 'category', 'sources', 'ffs', 'compounds', 'config']
let inGrid = ''
let quizFinal = []
const homeScrnEl = document.querySelector('#homescrn')
const startEl = document.querySelector('#play')
const titleEl = document.querySelector('#title')
const introLinksEl = Array.from(document.querySelectorAll('.introlink'))
const otherLinksEl = document.querySelector('#otherlinks')
const quizEl = document.querySelector('#quiz')
const learnEl = document.querySelector('#learn')
const modesEl = document.querySelector('#modes')
const quizGrid = document.querySelector('#quiz-els')
const learnSectionsEl = document.querySelector('#learn-sections')
const quizSectionsEl = document.querySelector('#quiz-sections')
const quizBtnsEl = document.querySelectorAll('.quizbtns')
const quizAnswersEl = document.querySelector('#quiz-answers')
var submitEl
const quizTenEl = document.querySelector('#ten')
const quizTwentyEl = document.querySelector('#twenty')
const quizThirtyEl = document.querySelector('#thirty')
const quizFortyEl = document.querySelector('#forty')
const quizFiftyEl = document.querySelector('#fifty')
const quizSixtyEl = document.querySelector('#sixty')
const prevBtnEl = document.querySelector('#prevbtn')
const nextBtnEl = document.querySelector('#nextbtn')
const eachElementEl = document.querySelector('#each-element')
const searchBoxEl = document.querySelector('#el-search-inp')
const searchSuggestionsEl = document.querySelector('#suggestions')
const learnBtns = Array.from(document.querySelectorAll('.learn-btn'))
const learnTens = Array.from(document.querySelectorAll('.learn-ten'))
const learnTwenties = Array.from(document.querySelectorAll('.learn-twenty'))
const learnNumEl = document.querySelector('#num')
const learnSymEl = document.querySelector('#symbol')
const ffBoxEl = document.querySelector("#ffbox")
const ffWordsEl = Array.from(document.querySelectorAll('.ffwords'))
const introWordsEl = document.querySelector('#introwords')
const basicScrnEl = document.querySelector('#basicscrn')
const basicAnimEl = document.querySelector('#basicanim')
const basicWordsEl = Array.from(document.querySelectorAll('.basicwords'))
const configWordsEl = Array.from(document.querySelectorAll('.configwords'))
const compoundsEl = Array.from(document.querySelectorAll('.ionwords'))
const learnNameEl = document.querySelector('#el-name')
const learnScrnEl = document.querySelector('#learn-screen')
const bigContentEl = document.querySelector('#bigcontent')
const srcBtns = Array.from(document.querySelectorAll('.src-btns'))
const srcOneEl = document.querySelector('#src1')
const srcTwoEl = document.querySelector('#src2')
const srcScrnEl = document.querySelector('#srcscrn')
const srcTitleEl = document.querySelector('#srctitle')
const srcIEEl = document.querySelector('#srcie')
const backBtnEl = document.querySelector('#back')
let voices = speechSynthesis.getVoices()
let curr_el = 0;
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function placeQuiz(elNum, elName, elSym) {
    quizSectionsEl.style.display = 'none';
    shuffleArray(elName);
    shuffleArray(elSym);
    let inGrid = '';
    for (let i = 0; i < 10; i++) {
        inGrid += `
        <button id="name-${i}" class="quizbtns" draggable="true">${elName[i]}</button>
        <button id="sym-${i}" class="quizbtns" draggable="true">${elSym[i]}</button>`;
    }
    inGrid += `
    <div class="quizfunc">
        <button id="submit">Submit</button>
    </div>`;
    quizGrid.innerHTML += inGrid;
    submitEl = document.querySelector('#submit')
    quizGrid.style.display = 'grid';
    submitEl.style.display = 'inline';
    quizAnswersEl.style.display = 'grid';
}
learnEl.addEventListener('click', function() {
    modesEl.style.display = 'none'
    learnSectionsEl.style.display = 'flex'
})
let inputVal = ''
let filtered = []
searchBoxEl.addEventListener('input', function() {
    inputVal = searchBoxEl.value.toLowerCase()
    searchSuggestionsEl.innerHTML = ''
    filtered = []
    if (inputVal.length > 0) {
        for (let i = 0; i < 118; i++) {
            if (elInfo[i]['element_name'].toLowerCase().startsWith(inputVal)) {
                filtered.push([elInfo[i]['element_name'], i])
            }
        }
        filtered.forEach(b => {
            let suggestion = document.createElement('li')
            suggestion.textContent = b[0]
            searchSuggestionsEl.appendChild(suggestion)
            suggestion.addEventListener('mousedown', function() {
                learnSectionsEl.style.display = 'none'
                eachElementEl.style.display = 'flex'
                learnScrnEl.style.display = 'flex'
                curr_el = b[1]
                if (curr_el === 0) {prevBtnEl.style.display = 'none'}
                else if (curr_el === 117) {nextBtnEl.style.display = 'none'}
                learnNameEl.textContent = elInfo[curr_el]['element_name']
                learnSymEl.textContent = elInfo[curr_el]['symbol']
                learnNumEl.textContent = elInfo[curr_el]['atomic_number']
                introWordsEl.textContent = learnNameEl.textContent + '!'
                srcBtns.forEach((e, i) => {e.textContent = elInfo[curr_el]["sources"][i]})
                ffWordsEl.forEach((e, i) => {e.textContent = elInfo[curr_el]["ffs"][i]})
                compoundsEl.forEach((e, i) => {e.innerHTML = elInfo[curr_el]["compounds"][i]?.replace(/\d+/g, match => `<sub>${match}</sub>`) || ''})
                if (compoundsEl[1].textContent === '') {compoundsEl[1].style.display = 'none'}
                else {compoundsEl[1].style.display = 'block'}
                configWordsEl.forEach((e, i) => {e.innerHTML = elInfo[curr_el]['config'][i]})
                basicWordsEl[0].textContent = 'Atomic Mass: ' + elInfo[curr_el]['atomic_mass'] + ' amu'
                basicWordsEl[1].textContent = 'Period: ' + elInfo[curr_el]['period']
                basicWordsEl[2].textContent = 'Group: ' + elInfo[curr_el]['group']
                basicWordsEl[3].textContent = 'Block: ' + elInfo[curr_el]['block']
                basicWordsEl[4].textContent = 'Atomic Radius: ' + elInfo[curr_el]['atomic_radius'] + ' pm'
                basicWordsEl[5].textContent = 'Electronegativity: ' + elInfo[curr_el]['electronegativity']
                basicWordsEl[6].textContent = 'Melting Point: ' + elInfo[curr_el]['melting_point'] +' K'
                basicWordsEl[7].textContent = 'Category: ' + elInfo[curr_el]['category']
        
                let tenff = new SpeechSynthesisUtterance(learnNameEl.textContent)
                tenff.voice = voices[3]
                speechSynthesis.speak(tenff)
            })
        })
    }
})
quizEl.addEventListener('click', function() {
    modesEl.style.display = 'none'
    quizSectionsEl.style.display = 'flex'
})
quizTenEl.addEventListener('click', function() {
    placeQuiz(tenListNum, tenListEl, tenListSym)
})
quizTwentyEl.addEventListener('click', function() {
    placeQuiz(twentyListNum, twentyListEl, twentyListSym)
})
quizThirtyEl.addEventListener('click', function() {
    placeQuiz(thirtyListNum, thirtyListEl, thirtyListSym)
})
quizFortyEl.addEventListener('click', function() {
    placeQuiz(fortyListNum, fortyListEl, fortyListSym)
})
quizFiftyEl.addEventListener('click', function() {
    placeQuiz(fiftyListNum, fiftyListEl, fiftyListSym)
})
quizSixtyEl.addEventListener('click', function() {
    placeQuiz(sixtyListNum, sixtyListEl, sixtyListSym)
})
learnBtns.forEach(button => {button.addEventListener('click', function() {
    curr_el = parseInt(button.id)-1
    learnNameEl.textContent = elInfo[curr_el]['element_name']
    learnSymEl.textContent = elInfo[curr_el]['symbol']
    learnNumEl.textContent = elInfo[curr_el]['atomic_number']
    learnSectionsEl.style.display = 'none'
    eachElementEl.style.display = 'flex'
    learnScrnEl.style.display = 'flex'
    prevBtnEl.style.display = 'none'
    introWordsEl.textContent = learnNameEl.textContent + '!'
    srcBtns.forEach((e, i) => {e.textContent = elInfo[curr_el]['sources'][i]})
    ffWordsEl.forEach((e, i) => {e.textContent = elInfo[curr_el]['ffs'][i]})
    compoundsEl.forEach((e, i) => {e.innerHTML = elInfo[curr_el]["compounds"][i]?.replace(/\d+/g, match => `<sub>${match}</sub>`) || ''})
    if (compoundsEl[1].textContent === '') {compoundsEl[1].style.display = 'none'}
    else {compoundsEl[1].style.display = 'block'}
    configWordsEl.forEach((e, i) => {e.innerHTML = elInfo[curr_el]['config'][i]})
    basicWordsEl[0].textContent = 'Atomic Mass: ' + elInfo[curr_el]['atomic_mass'] + ' amu'
    basicWordsEl[1].textContent = 'Period: ' + elInfo[curr_el]['period']
    basicWordsEl[2].textContent = 'Group: ' + elInfo[curr_el]['group']
    basicWordsEl[3].textContent = 'Block: ' + elInfo[curr_el]['block']
    basicWordsEl[4].textContent = 'Atomic Radius: ' + elInfo[curr_el]['atomic_radius'] + ' pm'
    basicWordsEl[5].textContent = 'Electronegativity: ' + elInfo[curr_el]['electronegativity']
    basicWordsEl[6].textContent = 'Melting Point: ' + elInfo[curr_el]['melting_point'] +' K'
    basicWordsEl[7].textContent = 'Category: ' + elInfo[curr_el]['category']
    let tenff = new SpeechSynthesisUtterance(learnNameEl.textContent)
    tenff.voice = voices[3]
    speechSynthesis.speak(tenff)
})})
prevBtnEl.addEventListener('click', function() {
    nextBtnEl.style.display = 'block'
    srcScrnEl.style.display = 'none'
    basicAnimEl.style.display = 'none'
    bigContentEl.innerHTML = ''
    backBtnEl.style.display = 'none'
    compoundsEl.forEach((e, i) => {e.innerHTML = ''})
    if (curr_el.toString()[curr_el.toString().length-1] === '1') {
        prevBtnEl.style.display = 'none'
    }
    curr_el--;
    learnNameEl.textContent = elInfo[curr_el]['element_name']
    learnSymEl.textContent = elInfo[curr_el]['symbol']
    learnNumEl.textContent = elInfo[curr_el]['atomic_number']
    introWordsEl.textContent = learnNameEl.textContent + '!'
    srcBtns.forEach((e, i) => {e.textContent = elInfo[curr_el]['sources'][i]})
    ffWordsEl.forEach((e, i) => {e.textContent = elInfo[curr_el]['ffs'][i]})
    compoundsEl.forEach((e, i) => {e.innerHTML = elInfo[curr_el]["compounds"][i]?.replace(/\d+/g, match => `<sub>${match}</sub>`) || ''})
    if (compoundsEl[1].textContent === '') {compoundsEl[1].style.display = 'none'}
    else {compoundsEl[1].style.display = 'block'}
    configWordsEl.forEach((e, i) => {e.innerHTML = elInfo[curr_el]['config'][i]})
    basicWordsEl[0].textContent = 'Atomic Mass: ' + elInfo[curr_el]['atomic_mass'] + ' amu'
    basicWordsEl[1].textContent = 'Period: ' + elInfo[curr_el]['period']
    basicWordsEl[2].textContent = 'Group: ' + elInfo[curr_el]['group']
    basicWordsEl[3].textContent = 'Block: ' + elInfo[curr_el]['block']
    basicWordsEl[4].textContent = 'Atomic Radius: ' + elInfo[curr_el]['atomic_radius'] + ' pm'
    basicWordsEl[5].textContent = 'Electronegativity: ' + elInfo[curr_el]['electronegativity']
    basicWordsEl[6].textContent = 'Melting Point: ' + elInfo[curr_el]['melting_point'] +' K'
    basicWordsEl[7].textContent = 'Category: ' + elInfo[curr_el]['category']
    let tenff = new SpeechSynthesisUtterance(learnNameEl.textContent)
    tenff.voice = voices[3]
    speechSynthesis.speak(tenff)
})
nextBtnEl.addEventListener('click', () => {
    prevBtnEl.style.display = 'block'
    srcScrnEl.style.display = 'none'
    basicAnimEl.style.display = 'none'
    bigContentEl.innerHTML = ''
    backBtnEl.style.display = 'none'
    compoundsEl.forEach((e, i) => {e.innerHTML = ''})
    if (curr_el.toString()[curr_el.toString().length-1] === '8' || learnNumEl.textContent === '117') {
        nextBtnEl.style.display = 'none'
    }
    curr_el++;
    learnNameEl.textContent = elInfo[curr_el]['element_name']
    learnSymEl.textContent = elInfo[curr_el]['symbol']
    learnNumEl.textContent = elInfo[curr_el]['atomic_number']
    introWordsEl.textContent = learnNameEl.textContent + '!'
    srcBtns.forEach((e, i) => {e.textContent = elInfo[curr_el]['sources'][i]})
    ffWordsEl.forEach((e, i) => {e.textContent = elInfo[curr_el]['ffs'][i]})
    compoundsEl.forEach((e, i) => {e.innerHTML = elInfo[curr_el]["compounds"][i]?.replace(/\d+/g, match => `<sub>${match}</sub>`) || ''})
    if (compoundsEl[1].textContent === '') {compoundsEl[1].style.display = 'none'}
    else {compoundsEl[1].style.display = 'block'}
    configWordsEl.forEach((e, i) => {e.innerHTML = elInfo[curr_el]['config'][i]})
    basicWordsEl[0].textContent = 'Atomic Mass: ' + elInfo[curr_el]['atomic_mass'] + ' amu'
    basicWordsEl[1].textContent = 'Period: ' + elInfo[curr_el]['period']
    basicWordsEl[2].textContent = 'Group: ' + elInfo[curr_el]['group']
    basicWordsEl[3].textContent = 'Block: ' + elInfo[curr_el]['block']
    basicWordsEl[4].textContent = 'Atomic Radius: ' + elInfo[curr_el]['atomic_radius'] + ' pm'
    basicWordsEl[5].textContent = 'Electronegativity: ' + elInfo[curr_el]['electronegativity']
    basicWordsEl[6].textContent = 'Melting Point: ' + elInfo[curr_el]['melting_point'] +' K'
    basicWordsEl[7].textContent = 'Category: ' + elInfo[curr_el]['category']
    let tenff = new SpeechSynthesisUtterance(learnNameEl.textContent)
    tenff.voice = voices[3]
    speechSynthesis.speak(tenff)
})
basicScrnEl.addEventListener('click', () => {
    basicAnimEl.style.display = 'flex'
    basicAnimEl.style.animationPlayState = 'running'
    window.addEventListener('animationend', () => {
        bigContentEl.innerHTML = basicScrnEl.innerHTML
        backBtnEl.style.display = 'inline'
        const basicheight = basicAnimEl.getBoundingClientRect().height
        const boxElH = ffBoxEl.getBoundingClientRect().height
        const relH = basicheight*100/boxElH
        basicAnimEl.style.top = `${(50-relH/2).toString()}%`
        const basicwidth = basicAnimEl.getBoundingClientRect().width
        const boxElW = ffBoxEl.getBoundingClientRect().width
        const relW = basicwidth*100/boxElW
        basicAnimEl.style.left = `${(50-relW/2).toString()}%`
    })
})
srcBtns.forEach(button => {button.addEventListener('click', function() {
    srcScrnEl.style.display = 'flex'
    srcScrnEl.style.animationPlayState = 'running'
    window.addEventListener('animationend', () => {
        bigContentEl.innerHTML = basicScrnEl.innerHTML
        backBtnEl.style.display = 'inline'
    })
})})
backBtnEl.addEventListener('click', function() {
    basicAnimEl.style.display = 'none'
    bigContentEl.innerHTML = ''
})