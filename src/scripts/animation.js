
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin);

function heroAnim() {
    MorphSVGPlugin.convertToPath('#screen, #overlay__rect');
    gsap.set(".hero__overlay > *", { autoAlpha: 0 });

    // document.querySelector("#zone_coding").addEventListener("click", () => {
    //     console.log("HELLO!");
    // });

    const heroAreas = ['coder', 'artist', 'writer'];
    const zoneLinks = {
        'coder': 'tech',
        'artist': 'art',
        'writer': 'writing'
    };
    const zoneAnimFuncs = {
        'writer': function() {
            // gsap.to("#lamp", {
            //     fill: 'var(--pale-yellow)',
            //     ease: 'power3.in',
            //     duration: 0.3
            // });

            let tl = gsap.timeline();
            tl
            .to("#lamp", {
                fill: '#ffffff',
                // ease: 'power3.in',
                // duration: 0.3,
                morphSVG: '#overlay__rect2'
            })
            .to("#overlay__rect2", {
                autoAlpha: 1
            }, "<+=0.2");

            return tl;
        },
        'coder': function() {
            // gsap.set("#screen", {
            //     transformOrigin: 'center'
            // });
            // gsap.to("#screen", {
            //     fill: 'var(--pale-blue)',
            //     scale: 8,
            //     ease: 'power3.in',
            //     duration: 0.3
            // });

            let tl = gsap.timeline();
            tl
            .to("#screen", {
                morphSVG: '#overlay__rect'
            })
            .to("#screen", {
                fill: '#ffffff',
            }, "<+=0.2")
            .to("#overlay__rect", {
                autoAlpha: 1
            }, "<+=0.2");

            return tl;
        }
    };
    heroAreas.forEach(area => {
        const svgZone = document.querySelector("#svg_" + area);

        // const zoneLink = document.createElementNS('http://www.w3.org/2000/svg', "a");
        // zoneLink.setAttributeNS("http://www.w3.org/2000/svg", "href", "https://en.wikipedia.org/wiki/Arrow");

        // document.querySelector("#layer1").insertBefore(zoneLink, svgZone);
        // zoneLink.appendChild(svgZone);

        const zoneLink = document.createElement("a");
        zoneLink.setAttribute("href", "/" + zoneLinks[area]);

        svgZone.style.cursor = 'pointer';
        if (zoneAnimFuncs[area]) {
            svgZone.addEventListener("click", () => {
                console.log('hey')
                let tl = zoneAnimFuncs[area]();

                tl.call(() => {
                    console.log("end", zoneLink);
                    zoneLink.click()
                });
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
    heroAnim();
});