import elInfo from './el_info_good.json' with {type:'json'}
const searchBarEl = document.querySelector('#search-inp')
const searchSuggestionsEl = document.querySelector('#suggestions')
const learnNumEl = document.querySelector('#num')
const learnSymEl = document.querySelector('#symbol')
const learnNameEl = document.querySelector('#el-name')
const introEl = document.querySelector('#intro')
const learnEls = Array.from(document.querySelectorAll('.learnels'))
const basicEl = document.querySelector('#basicscrn')
const ffEl = document.querySelector('#ffs')
const configEl = document.querySelector('#config')
const compoundsEl = document.querySelector('#ions')
const sourcesEl = document.querySelector('#sources')
const appsEl = document.querySelector('#apps')
const modals = Array.from(document.querySelectorAll('.modal'))
const basicModal = document.querySelector('#basicModal')
const ffModal = document.querySelector('#funFactsModal')
const configModal = document.querySelector('#configModal')
const compoundModal = document.querySelector('#compoundsModal')
const sourcesModal = document.querySelector('#sourcesModal')
const appsModal = document.querySelector('#appsModal')
const closeBtns = Array.from(document.querySelectorAll('.close-btn'))
const propertiesTitle = document.querySelector('#properties-title')
const propertyGrid = document.querySelector('.properties-grid')
const propertyValues = Array.from(document.querySelectorAll('.value'))
const stateIconEl = document.querySelector('#state-icon')
const stateImgEl = document.querySelector('#stateimg')
const fahrenheitEl = document.querySelector('#fahrenheit')
const factGrid = document.querySelector('.fact-grid')
const centeredCard = document.querySelector('#centered')
const lastffCard = document.querySelector('#last-fact-card')
const ffCardTitle = document.querySelector('#ffcard-title')
const ffTitles = Array.from(document.querySelectorAll('.fact-titles'))
const ffInfo = Array.from(document.querySelectorAll('.fact-info'))
const srcName = Array.from(document.querySelectorAll('.source-name'))
const srcAbundance = Array.from(document.querySelectorAll('.abundance'))
const srcHow = Array.from(document.querySelectorAll('.srchow'))
const appTitle = document.querySelector('#app-title')
const appHeaders = Array.from(document.querySelectorAll('.app-header'))
const appDescriptions = Array.from(document.querySelectorAll('.application-description'))
const appDetails = Array.from(document.querySelectorAll('.app-details'))
const compCardsEl = Array.from(document.querySelectorAll('.compound-item'))
const compTitleEl = document.querySelector('#compounds-title')
const compNameEl = Array.from(document.querySelectorAll('.compound-name'))
const compFormulaEl = Array.from(document.querySelectorAll('.compound-formula'))
const compTextEl = Array.from(document.querySelectorAll('.uses-text'))
const compIconEl = Array.from(document.querySelectorAll('.compound-icon'))
const nobleGasEl = document.querySelector('.noble')
const allCompounds = document.querySelector('.compounds-list')
const orbit = document.querySelector('#orbital-diagram')
const configText = document.querySelector('#config-info')
const fullConfigEl = document.querySelector('#full')
const prevBtnEl = document.querySelector('#prevbtn')
const nextBtnEl = document.querySelector('#nextbtn')
const waterDropletEl = 'Media/WaterDroplet.png'
const cloudEl = 'Media/Cloud.png'
const rockEl = 'Media/Rock.png'
const stateicons = {'Gas':cloudEl, 'Liquid':waterDropletEl, 'Solid':rockEl}
const nobleGases = [1, 9, 17, 35, 53, 85, 117]
let currEl = 0
let popupOpen = false
let orbitals = [0]
const orbitalRadiusStart = 7
const orbitalSpacing = 3
const orbitalColors = {0:'red', 1:'purple', 2:'green', 3:'darkblue', 4:'orange', 5:'pink', 6:'cyan', 7:'yellow'}
let isFull = false;
let inputVal = ''
let filtered = []

learnNumEl.textContent = elInfo[currEl]['atomic_number']
learnSymEl.textContent = elInfo[currEl]['symbol']
learnNameEl.textContent = elInfo[currEl]['element_name']
introEl.textContent = elInfo[currEl]['element_name']

searchBarEl.addEventListener('input', function() {
    inputVal = searchBarEl.value.toLowerCase()
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
                currEl = b[1]
                if (currEl === 0) {
                    prevBtnEl.style.display = 'none'
                    nextBtnEl.style.display = 'inline-block'
                }
                else if (currEl === 117) {
                    nextBtnEl.style.display = 'none'
                    prevBtnEl.style.display = 'inline-block'
                } else {
                    prevBtnEl.style.display = 'inline-block'
                    nextBtnEl.style.display = 'inline-block'
                }
                learnNumEl.textContent = elInfo[currEl]['atomic_number']
                learnSymEl.textContent = elInfo[currEl]['symbol']
                learnNameEl.textContent = elInfo[currEl]['element_name']
                introEl.textContent = elInfo[currEl]['element_name']
                searchBarEl.value = ''
                searchSuggestionsEl.innerHTML = ''
                reset()
            })
        })
    }
})

learnEls.forEach(e => {e.addEventListener('click', () => {
    document.body.style.overflow = 'hidden'
    popupOpen = true
})})

basicEl.addEventListener('click', () => {
    basicModal.style.display = 'flex'
    propertiesTitle.textContent = 'Basic Properties of ' + elInfo[currEl]['element_name']
    propertyValues.forEach((e, i) => {
        e.textContent = elInfo[currEl]["basic_properties"][i]
    })
    stateImgEl.src = stateicons[elInfo[currEl]["basic_properties"][1]]
    fahrenheitEl.textContent = !isNaN(elInfo[currEl]["basic_properties"][2].slice(0, -2)) ? '(' + parseInt(parseInt(elInfo[currEl]["basic_properties"][2].slice(0, -2))*9/5+32) + '°F)' : ''
})

ffEl.addEventListener('click', () => {
    ffModal.style.display = 'flex'
    ffCardTitle.textContent = 'Fun Facts About ' + elInfo[currEl]['element_name'] + '!'
    if (elInfo[currEl]['ffs'].length/2 < 4) {
        lastffCard.style.display = 'none'
    }
    for (let i = 0; i < elInfo[currEl]['ffs'].length/2; i++) {
        ffTitles[i].textContent = elInfo[currEl]['ffs'][i]
        ffInfo[i].textContent = elInfo[currEl]['ffs'][i+elInfo[currEl]['ffs'].length/2]
    }
})

configEl.addEventListener('click', () => {
    const nucleusEl = document.querySelector('.nucleus')
    configModal.style.display = 'flex'
    nucleusEl.textContent = elInfo[currEl]['symbol']
    for (let i = 0; i <= currEl; i++) {
        if (i < 18) {
            if (!((i-2) % 8)) {orbitals.push(1)}
            else {orbitals[orbitals.length-1]++}
        } else {
            if (!(i % 18)) orbitals.push(1)
            else orbitals[orbitals.length-1]++
        }
    }
    orbit.style.width = `${11+orbitalRadiusStart*orbitals.length}rem`
    orbit.style.height = `${11+orbitalRadiusStart*orbitals.length}rem`
    orbitals.forEach((e, i) => {
        configText.innerHTML = elInfo[currEl]['config'][0]

        const radius = orbitalRadiusStart + i * orbitalSpacing;

        // 1. Create the orbital path.
        const orbital = document.createElement('div');
        orbital.className = 'orbital';
        orbital.style.width = `${radius * 2}rem`;
        orbital.style.height = `${radius * 2}rem`;
        
        // 2. Add the labels back.
        const labels = document.createElement('div');
        labels.className = 'orbital-labels';
        labels.style.top = `calc(50% - ${radius}rem - 1.25rem)`;
        const label = document.createElement('div');
        label.className = 'orbital-label';
        if (i === 0) label.innerHTML = `1<sup>st</sup> energy level`
        else if (i === 1) label.innerHTML = `2<sup>nd</sup> energy level`
        else if (i === 2) label.innerHTML = `3<sup>rd</sup> energy level`
        else label.innerHTML = `${i+1}<sup>th</sup> energy level`
        labels.appendChild(label);
        
        orbit.appendChild(orbital);
        orbit.appendChild(labels);

        for (let j = 0; j < e; j++) {
            const electron = document.createElement('div');
            electron.className = 'electron';
            electron.style.backgroundColor = orbitalColors[i]
            
            // This calculates the starting position of each electron on the orbit
            const initialAngle = (360 / e) * j + 73 * i;
            
            // This combines all of the transforms into a single, reliable string.
            const initialTransform = `translate(-50%, -50%) rotate(${initialAngle}deg) translateY(${radius}rem)`;
            const finalTransform = `translate(-50%, -50%) rotate(${initialAngle + 360}deg) translateY(${radius}rem)`;

            // We set the animation properties directly on the element.
            electron.style.setProperty('--initial-transform', initialTransform);
            electron.style.setProperty('--final-transform', finalTransform);
            
            // The animation delay is set here. This makes them all move at once.
            // We set a unique initial angle to make them spaced out.
            // The animation delay is what was causing them to lose their position.
            
            orbit.appendChild(electron);
        }
    });
})
fullConfigEl.addEventListener('click', () => {
    if (!isFull) {
        isFull = true
        configText.innerHTML = elInfo[currEl]['config'][1]
        fullConfigEl.textContent = 'View Shorthand Configuration'
    } else {
        isFull = false
        configText.innerHTML = elInfo[currEl]['config'][0]
        fullConfigEl.textContent = 'View Full Configuration'
    }
})

compoundsEl.addEventListener('click', () => {
    compoundModal.style.display = 'flex'
    compCardsEl.forEach(e => {e.style.display = 'flex'})
    compTitleEl.textContent = 'Common Compounds of ' + elInfo[currEl]['element_name']
    if (nobleGases.includes(currEl)) {
        nobleGasEl.style.display = 'block'
        allCompounds.style.display = 'none'
    }
    else {
        nobleGasEl.style.display = 'none'
        allCompounds.style.display = 'block'
        for (let i = 0; i < elInfo[currEl]['ccs'].length; i++) {
            compNameEl[i].textContent = elInfo[currEl]['ccs'][i][0]
            compFormulaEl[i].innerHTML = elInfo[currEl]['ccs'][i][1]
            compTextEl[i].textContent = elInfo[currEl]['ccs'][i][2]
            compIconEl[i].innerHTML = elInfo[currEl]['ccs'][i][1]
        }
    }
    for (let j = 0; j < compCardsEl.length; j++) {
        if (j < elInfo[currEl]['ccs'].length) {
            compCardsEl[j].style.display = 'flex'
        } else {
            compCardsEl[j].style.display = 'none'
        }
}})

sourcesEl.addEventListener('click', () => {
    sourcesModal.style.display = 'flex'
    console.log(currEl)
    srcName.forEach((e, i) => {
        e.textContent = elInfo[currEl]['sources'][i][0]
    })
    srcAbundance.forEach((e, i) => {
        e.textContent = elInfo[currEl]['sources'][i][1]
    })
    srcHow.forEach((e, i) => {
        e.textContent = elInfo[currEl]['sources'][i][2]
    })
})

appsEl.addEventListener('click', () => {
    appsModal.style.display = 'flex'
    appTitle.textContent = 'Applications of ' + elInfo[currEl]['element_name']
    appHeaders.forEach((e, i) => {
        e.textContent = elInfo[currEl]['apps'][i][0]
    })
    appDescriptions.forEach((e, i) => {
        e.textContent = elInfo[currEl]['apps'][i][1]
    })
    appDetails.forEach((e, i) => {
        e.textContent = elInfo[currEl]['apps'][i][2]
    })
})

function reset() {
    orbitals = [0]
    orbit.innerHTML = `<div class="nucleus"></div>`
    isFull = false
    configText.innerHTML = elInfo[currEl]['config'][0]
    fullConfigEl.textContent = 'View Full Configuration'
    for (let i=0; i < 4; i++) {
        ffTitles[i].textContent = ''
        ffInfo[i].textContent = ''
    }
    lastffCard.style.display = 'block'
}

closeBtns.forEach(el => {el.addEventListener('click', () => {
    modals.forEach(e => {e.style.display = 'none'})
    document.body.style.overflow = 'visible'
    popupOpen = false
    reset()
})})

modals.forEach(el => {addEventListener('click', (i) => {
    if (i.target === el) {
        el.style.display = 'none'
        document.body.style.overflow = 'visible'
        popupOpen = false
        reset()
    }
})})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(i => {i.style.display = 'none'})
        document.body.style.overflow = 'visible'
        popupOpen = false
        reset()
    }
})

// Next and previous element functionality
prevBtnEl.addEventListener('click', () => {
    if (currEl === 1) prevBtnEl.style.display = 'none'
    else if (currEl === 117) nextBtnEl.style.display = 'inline-block'
    currEl--
    learnNumEl.textContent = elInfo[currEl]['atomic_number']
    learnSymEl.textContent = elInfo[currEl]['symbol']
    learnNameEl.textContent = elInfo[currEl]['element_name']
    introEl.textContent = elInfo[currEl]['element_name']
    reset()
})
nextBtnEl.addEventListener('click', () => {
    if (currEl === 116) nextBtnEl.style.display = 'none'
    else if (currEl === 0) prevBtnEl.style.display = 'inline-block'
    currEl++
    learnNumEl.textContent = elInfo[currEl]['atomic_number']
    learnSymEl.textContent = elInfo[currEl]['symbol']
    learnNameEl.textContent = elInfo[currEl]['element_name']
    introEl.textContent = elInfo[currEl]['element_name']
    reset()
    }
)

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && !popupOpen) {
        if (currEl === 1) prevBtnEl.style.display = 'none'
        else if (currEl === 117) nextBtnEl.style.display = 'inline-block'
        currEl--
        learnNumEl.textContent = elInfo[currEl]['atomic_number']
        learnSymEl.textContent = elInfo[currEl]['symbol']
        learnNameEl.textContent = elInfo[currEl]['element_name']
        introEl.textContent = elInfo[currEl]['element_name']
        reset()
    } 
    else if (e.key === 'ArrowRight' && !popupOpen) {
        if (currEl === 116) nextBtnEl.style.display = 'none'
        else if (currEl === 0) prevBtnEl.style.display = 'inline-block'
        currEl++
        learnNumEl.textContent = elInfo[currEl]['atomic_number']
        learnSymEl.textContent = elInfo[currEl]['symbol']
        learnNameEl.textContent = elInfo[currEl]['element_name']
        introEl.textContent = elInfo[currEl]['element_name']
        reset()
    }
})