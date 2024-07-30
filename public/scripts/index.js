let currentCard = 0;
const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');
let isScrolling = false;
let startY = 0;

function updateCards(){
    cards.forEach((card, index)=> {
        if (index === currentCard) {
            card.style.top = '0';
        } else if (index < currentCard) {
            card.style.top = '-100%';
        } else {
            card.style.top = '100%';
        }
    });

    dots.forEach((dot, index) => {
        if(index == currentCard) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function handleScroll(deltaY) {
    if(isScrolling) return;

    if (deltaY > 0) {
        if (currentCard < cards.length -1) {
            currentCard++;
            updateCards();
        }
    } else {
        if (currentCard > 0) {
            currentCard--;
            updateCards();
        }
    }

    isScrolling = true;
    setTimeout(()=> {
        isScrolling = false;
    },250);
};

document.addEventListener('wheel',(event) => {
    handleScroll(event.deltaY);
});

document.addEventListener('touchstart',(event) => {
    startY = event.touches[0].clientY;
});

document.addEventListener('touchmove',(event) => {
    event.preventDefault();
});

document.addEventListener('touchend',(event) => {
    const endY = event.changedTouches[0].clientY;
    const deltaY = startY - endY;
    handleScroll(deltaY);
})


dots.forEach((dot,index)=>{
    dot.addEventListener('click',() => {
        currentCard = index;
        updateCards();
    });
});


updateCards();