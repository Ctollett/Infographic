function toggleAnimation(dotElement) {
    if (dotElement.dataset.isAnimating === 'true') return;
    dotElement.dataset.isAnimating = 'true';

    let container = dotElement.querySelector('.line-dot-container-first') || dotElement.querySelector('.line-dot-container-second');
    let line = container.querySelector('.line');
    let smallDot = container.querySelector('.small-dot');
    let textContainer = container.querySelector('.text-container');
    let images = container.querySelectorAll('.image-1'); 

    if (line.style.width === '20em') {
        // Line is currently extended, start retracting it
        gsap.to(textContainer, {opacity: 0, duration: 0.1, onComplete: () => {
            gsap.to(line, {width: 0, duration: 0.1,});
            gsap.to(smallDot, {opacity: 0, duration: 0.2});
            gsap.to(dotElement, {
                borderColor: "#42858C",  
                duration: 0.5,
                onComplete: () => {
                    dotElement.dataset.isAnimating = 'false';
                    dotElement.classList.remove('active');
                }
            });
        }});
    } else {

        gsap.to(dotElement, {
            borderColor: "#8FFFFD", 
            duration: 0.5,
            onStart: () => {
                dotElement.classList.add('active');
            }
        });
        gsap.to(line, {width: '20em', duration: 0.3});
        gsap.to(smallDot, {opacity: 1, duration: 0.3});
        gsap.to(textContainer, {opacity: 1, delay: 0.5, duration: 0.5, onComplete: () => {
            dotElement.dataset.isAnimating = 'false';
        }});
    }
}





gsap.registerPlugin(ScrollTrigger);


document.addEventListener("DOMContentLoaded", function() {

    gsap.utils.toArray('.title-information p').forEach(p => {
        gsap.from(p, {
            scrollTrigger: {
                trigger: p.parentElement, 
                start: "top 90%",
                end: "bottom top", 
          
                markers: false 
            },
            opacity: 0, 
            y: 30, 
            duration: 1, 
            ease: "power1.out" 
        });
    });

    const factImages = document.querySelectorAll('.toggle-fact');

    factImages.forEach(img => {
        img.addEventListener('click', function() {
            const factText = this.nextElementSibling; 
            if (gsap.getProperty(factText, "opacity") < 1) {
                gsap.to(factText, { duration: 0.5, opacity: 1 });
            } else {
                gsap.to(factText, { duration: 0.5, opacity: 0 });
            }
        });
    });

    gsap.utils.toArray('.image-1').forEach(container => {
        gsap.from(container.querySelector('img'), {
            scrollTrigger: {
                trigger: container,
                start: "top 30%",  
                end: "bottom top",  
                toggleActions: "play none none reverse",  
            },
            opacity: 1,
            y: 250,  
            duration: 1,  
            ease: "power4.out"  
        });
    });

    gsap.utils.toArray('.image-2').forEach(container => {
        gsap.from(container.querySelector('img'), {
            scrollTrigger: {
                trigger: container,
                start: "top 70%",  
                end: "bottom top",  
                toggleActions: "play none none reverse", 

            },
            opacity: 1,
            y: 250,  
            duration: 1,  
            ease: "power4.out"  
        });
    });

    gsap.utils.toArray('.fact').forEach(container => {
        gsap.from(container.querySelector('img'), {
            scrollTrigger: {
                trigger: container,
                start: "top 70%",  
                end: "bottom top",  
                toggleActions: "play none none reverse", 

            },
            opacity: 0,
            y: 20,  
            duration: 2,  
            ease: "power1.out"  
        });
    });

    gsap.utils.toArray('.fact').forEach(container => {
        gsap.from(container.querySelector('p'), {
            scrollTrigger: {
                trigger: container,
                start: "top 70%",  
                end: "bottom top",  
                toggleActions: "play none none reverse", 

            },
            opacity: 0,
            y: 20,  
            duration: 0.5,  
            ease: "power1.out"  
        });
    });




    gsap.utils.toArray('.section-title').forEach(title => {
        let section = title.closest('.timeline-section');

        // Create ScrollTrigger for pinning
        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${section.offsetHeight}`,
            pin: title,
            pinSpacing: false
        });

      
        gsap.to(title, {
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${section.offsetHeight}`,
                scrub: true, 
                toggleActions: "play none none reverse" 
            },
            opacity: 0, 
            ease: "none" 
        });
    });

    function blinkAnimationScroll(target) {
        gsap.to(target, {
            opacity: 0, 
            repeat: -1, 
            yoyo: true, 
            duration: 1, 
            ease: "none" 
        });
    }
    
    function blinkAnimationCursor(target) {
        gsap.fromTo(target, {
            opacity: 0 
        }, {
            opacity: 1, 
            repeat: -1, 
            yoyo: true, 
            duration: 1,
            ease: "none"
        });
    }

    // Apply the blinking animation to the images
    blinkAnimationScroll("#scroll");
    blinkAnimationCursor("#cursor");
    

});


