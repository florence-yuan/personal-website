const galleries = document.querySelectorAll(".gallery");

galleries.forEach(gallery => {
    let leftCounter = 0;

    function handleClick(dir = -1) {
        let newCounter = leftCounter + dir;
        if (newCounter >= 0 && newCounter <= numCards - numDisplayed) {
            leftCounter = newCounter;
        } else {
            return;
        }
        galleryFlex.style.transform = `translate3d(${leftCounter * -100 / numCards}%, 0, 0)`;
    }

    const leftBtn = gallery.querySelector(".gallery__btn--left");
    const rightBtn = gallery.querySelector(".gallery__btn--right");

    const numCards = gallery.querySelectorAll(".gallery__card").length;
    const numDisplayed = window.getComputedStyle(gallery).getPropertyValue("--display-num");

    const galleryFlex = gallery.querySelector(".gallery__flex");

    leftBtn.addEventListener("click", () => handleClick(-1));
    rightBtn.addEventListener("click", () => handleClick(1));
});