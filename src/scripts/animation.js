
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin);

function svgAnim() {
    const heroAreas = ['coder', 'artist', 'writer'];
    const zoneLinks = {
        'coder': 'tech',
        'artist': 'art',
        'writer': 'writing'
    };
    const zoneAnimFuncs = {
        'writer': function() {
            gsap.set("#lamp", {
                transformOrigin: 'center'
            });

            let tl = gsap.timeline();
            tl
            .to("#lamp", {
                scale: 16,
                duration: 0.3,
                ease: 'power1.in',
            })
            .to("#svg_artist, #svg_coder", {
                autoAlpha: 0
            }, "<")
            .to("#lamp", {
                fill: '#ffffff',
                duration: 0.3   
                // ease: 'power3.in',
                // duration: 0.3,
            });

            return tl;
        },
        'coder': function() {
            gsap.set("#screen", {
                transformOrigin: 'center'
            });
            // gsap.to("#screen", {
            //     fill: 'var(--pale-blue)',
            //     scale: 8,
            //     ease: 'power3.in',
            //     duration: 0.3
            // });

            let tl = gsap.timeline();
            tl
            .to("#screen", {
                scale: 5,
                duration: 0.3
            })
            .to("#svg_artist, #svg_writer", {
                autoAlpha: 0
            }, "<")
            .to("#screen", {
                fill: '#ffffff',
            }, "<+=0.2");

            return tl;
        },
        'artist': function() {
            gsap.set("#head_outline", {
                transformOrigin: 'center'
            });

            let tl = gsap.timeline();
            tl
            .to("#head_outline", {
                scale: 16,
                duration: 0.3
            })
            .to("#svg_coder, #svg_writer", {
                autoAlpha: 0
            }, "<")
            .to("#head_outline", {
                fill: '#ffffff',
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
        document.querySelector("footer").appendChild(zoneLink);

        svgZone.style.cursor = 'pointer';
        svgZone.addEventListener("click", () => {
            if (zoneAnimFuncs[area]) {
                let tl = zoneAnimFuncs[area]();

                tl.call(() => {
                    zoneLink.click()
                });
            } else {
                zoneLink.click()
            }
        });
    });
}

function textAnim() {
    const featuredLines = SplitText.create(".banner__featured > li > a", {
        type: "lines",
        mask: "lines",
        linesClass: "line++"
    });

    gsap.set(".banner__featured .line-mask", {
        animationDelay: (i) => i * 0.1 + 's'
    });

    let lineAnimTl = gsap.timeline({
        // scrollTrigger: {
        //     trigger: ".landing__banner",
        //     start: "top center"
        // }
    });
    lineAnimTl
    .from(featuredLines.lines, {yPercent: 100, stagger: 0.1, delay: 0.15})
    .to(".banner__featured .line-mask", {
        backgroundSize: '100% 0',
        stagger: 0.1,
        duration: 0.25,
    }, "<");
}

function heroAnim() {
    svgAnim();
    textAnim();
}

document.addEventListener("DOMContentLoaded", (event) => {
    heroAnim();
});