
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);

gsap.set(".line--stagger .animate-letter", {
    opacity: 0,
    transform: 'rotateX(90deg) translateY(10%)',
    transformOrigin: 'bottom'
});

gsap.set(".line--no-stagger .animate-letter", {
    opacity: 0,
    transform: 'translateY(100%)',
    transformOrigin: 'bottom'
});

const animateTexts = document.querySelectorAll('.animate-text');
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('main',
        { opacity: 0 },
        { opacity: 1 }
    );

    animateTexts.forEach(animateText => {
        const eleSelector = gsap.utils.selector(animateText);
        gsap.to(eleSelector(".line--stagger .animate-letter"),
            {
                scrollTrigger: animateText,
                opacity: 1,
                transform: 'none',
                stagger: 0.05,
                delay: 0.2
            }
        );
        gsap.to(eleSelector(".line--no-stagger .animate-letter"),
            {
                scrollTrigger: animateText,
                opacity: 1,
                transform: 'none',
                delay: 0.2,
                duration: 0.3
            }
        );
    });

    const mediaCards = document.querySelectorAll('.media-card');
    mediaCards.forEach(card => {
        gsap.fromTo(card,
            { opacity: 0, scale: 0.95, y: 20 },
            {
                scrollTrigger: {
                    trigger: card,
                    start: "center bottom",
                },
                opacity: 1,
                scale: 1,
                y: 0,
                delay: 0.2
            }
        )
    });
});