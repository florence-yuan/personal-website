
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('main',
        { opacity: 0 },
        { opacity: 1 }
    );

    /* Sections */

/*     const cols = [...document.getElementsByClassName("content__col")];
    gsap.fromTo(
        '.content__bar > .content__img',
        {
            opacity: 0,
        },
        {
            opacity: 1,
            y: function(i, target, targets) {
                return (i + 1) * 100
            },
            ease: 'back.out'
        }
    ) */
/*     gsap.to(cols.slice(1), {
        scrollTrigger: {
            trigger: ".section2",
            start: "top bottom",
            end: "top 25%",
            scrub: 0.1
        },
        opacity: 0
    }); */

    const sections = [...document.querySelectorAll("section")].slice(2);
    const indexPics = [...document.querySelectorAll(".content__imgs > .content__img")];
    const imgBarBounds = document.querySelector(".content__bar").getBoundingClientRect();
    const imgThumb = document.querySelector(".content__imgs");

    gsap.set(indexPics[0], {
        opacity: 1
    });
    sections.forEach((section, i) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                scrub: 0.6,
                start: "top center",
                end: "+=100",
            },
            ease: 'back.out'
        });
        tl.to(indexPics[i], {
            opacity: 0
        }).to(indexPics[i + 1], {
            opacity: 1,
        }, "<")
        .to(imgThumb, {
            y: (i + 1) * 150,
            duration: 2
        }, "<")
        .to(".track__highlight", {
            height: (i + 1) * 150,
            duration: 2
        }, "<");
    });

    let isMouseDown = false, newTrackY = 0, mouseToTop = 0, prevTrackInd = 0;

    let ySetter = gsap.quickSetter(imgThumb, "y", "px");

    let yQuickTo = gsap.quickTo(imgThumb, "y", { duration: 0.2, ease: "power1.inOut" });

    function trackSnapTo(newY) {
        let targetY = gsap.utils.snap(150, newY);
        yQuickTo(targetY, newY);

        return Math.floor(targetY / 150);
    }

    // trackSnapTo()

    imgThumb.addEventListener("mousedown", (e) => {
        isMouseDown = true;
        mouseToTop = e.clientY - imgThumb.getBoundingClientRect().top;
    });

    window.addEventListener("mouseleave", () => {
        isMouseDown = false;
    });

    window.addEventListener("mouseup", () => {
        isMouseDown = false;

        let newTrackInd = trackSnapTo(newTrackY);
        let snapTl = gsap.timeline();
        snapTl.to(indexPics[prevTrackInd], {
            opacity: 0
        }).to(indexPics[newTrackInd], {
            opacity: 1,
        }, "<");

        prevTrackInd = newTrackInd;
    });

/*     let ySetter = gsap.utils.pipe(
        gsap.utils.snap(150),
        gsap.quickTo(imgThumb, "y", { duration: 0.2 } )
    ); */

    window.addEventListener("mousemove", (e) => {
        if (!isMouseDown)
            return;

        // let moveTl = gsap.timeline();
        // console.log('ho', e)
        newTrackY = gsap.utils.clamp(0, 150 * 3, Math.round(e.clientY - imgBarBounds.top - mouseToTop));
        ySetter(newTrackY);
    })
});