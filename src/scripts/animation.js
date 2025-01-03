
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const animateLines = document.querySelectorAll('.animate-line');
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);
    animateLines.forEach(animateLine => {
        gsap.fromTo(animateLine.querySelectorAll(".animate-letter"),
            {
                yPercent: 100,
            },
            {
                scrollTrigger: animateLine,
                yPercent: 0,
                stagger: 0.1
            }
        );
    });
});