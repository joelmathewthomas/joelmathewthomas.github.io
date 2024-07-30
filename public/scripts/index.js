let currentCard = 0;
const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');

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

document.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
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
});

dots.forEach((dot,index)=>{
    dot.addEventListener('click',() => {
        currentCard = index;
        updateCards();
    });
});


updateCards();