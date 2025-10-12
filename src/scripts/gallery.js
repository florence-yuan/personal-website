const galleries = document.querySelectorAll(".gallery");

galleries.forEach(gallery => {
    let leftCounter = 0;

    function handleBtnDisabling(dir) {
        let newScrolled = galleryInner.scrollLeft + dir * itemWidth;

        if (newScrolled <= 5) {
            leftBtn.disabled = true;
        } else {
            leftBtn.disabled = false;
        }
        if (newScrolled + galleryInner.offsetWidth >= galleryFlex.offsetWidth - 5) {
            rightBtn.disabled = true;
        } else {
            rightBtn.disabled = false;
        }
    }

    function handleClick(dir = -1) {
/*         galleryInner.scrollTo({
            left: 11 / 100 * galleryWidth,
            behavior: 'smooth'
        }) */

        leftCounter += dir;
        // console.log(galleryItems[leftCounter])
        galleryItems[leftCounter].scrollIntoView({behavior: 'smooth', container: 'nearest', block: 'nearest', inline: 'start'});

        handleBtnDisabling(dir);

        /* let newCounter = leftCounter + dir;
        if (newCounter >= 0 && newCounter <= numCards - numDisplayed) {
            leftCounter = newCounter;
        } else {
            return;
        }
        galleryFlex.style.transform = `translate3d(${leftCounter * -100 / numCards}%, 0, 0)`; */
    }

    const leftBtn = gallery.querySelector(".gallery__btn--left");
    const rightBtn = gallery.querySelector(".gallery__btn--right");

    const numCards = gallery.querySelectorAll(".gallery__flex > *").length;
    console.log(numCards)

    const galleryInner = gallery.querySelector(".gallery__inner");
    const galleryFlex = gallery.querySelector(".gallery__flex");
    const galleryItems = [...galleryInner.querySelectorAll("img")];
    const itemWidth = galleryItems[0].offsetWidth;

    handleBtnDisabling(0);
    galleryInner.scrollTo({left: 0, behavior: 'smooth'})

    leftBtn.addEventListener("click", () => handleClick(-1));
    rightBtn.addEventListener("click", () => handleClick(1));
});