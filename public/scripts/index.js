let currentCard = 0;
const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');
let isScrolling = false;
let touchStartY = 0;
let touchEndY = 0;

function updateCards(){
    cards.forEach((card,index)=> {
        if ( index === currentCard){
            card.style.top = 0;
            card.classList.remove('inactive');
            dots[index].classList.add('active');
        } else if(index < currentCard){
            card.style.top = '-100%';
            card.classList.add('inactive');
            dots[index].classList.remove('active');
        } else {
            card.style.top = '100%';
            card.classList.add('inactive');
            dots[index].classList.remove('active');
        }
    })
}

cards.forEach((card,index) => {
    card.addEventListener("wheel",(event) => {
            element = cards[index];
            if (event.deltaY > 0) {
                if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 1) {
                    handleScroll(event.deltaY);
                } 
            } else if (event.deltaY < 0) {
                if (element.scrollTop === 0) {
                    handleScroll(event.deltaY);
                }
            }
    }); 
});

cards.forEach((card)=>{
    card.addEventListener('scroll',()=> {
        if (isScrolling) return;
        isScrolling = true;
        setTimeout(()=>{
            isScrolling = false;
        }, 250);
    })
})

cards.forEach((card,index) => {
    card.addEventListener('touchstart', (event) => {
        touchStartY = event.changedTouches[0].screenY;
    });

    card.addEventListener('touchend', (event) => {
        touchEndY = event.changedTouches[0].screenY;
        if (touchEndY < touchStartY - 50) {
            element = cards[index];
            if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 1) {
                handleScroll(50);
            } 
        } else if(touchEndY > touchStartY + 50) {
            element = cards[index];
            if (element.scrollTop === 0) {
                handleScroll(-50);
            }
        }
    })


})


function handleScroll( deltaY ) {
    if (isScrolling) return;
    if ( deltaY > 0 && currentCard < cards.length-1) {
        currentCard++;
        updateCards();
    } else if ( deltaY < 0 && currentCard > 0 ) {
        currentCard--;
        updateCards();
    }

    isScrolling = true;
    setTimeout(()=>{
        isScrolling = false;
    },500);
}


dots.forEach((dot,index)=>{
    dot.addEventListener('click',() => {
        currentCard = index;
        updateCards();
    });
});

updateCards();

function redirect(url) {
    window.location.href=url;
}