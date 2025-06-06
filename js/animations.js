import { transitionToPage, initializePageEntryTransition } from './pageTransitions.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js loaded and DOMContentLoaded');
    let navBottom = document.getElementById('bottom-nav');
    let homeButton = document.getElementById('home');
    let timeline2; // Declare timeline2 here so it's accessible

    console.log('homeButton element:', homeButton);

    initializePageEntryTransition(); // Initialize the page entry transition

    // Check if on index.html
    if (window.location.href.includes('index.html') || !window.location.href.includes('.html')) {
        let timeline1 = new TimelineMax();
        timeline1
            .from('.title', 1.5, {
                y: 200,
                ease: Power3.easeInOut
            })
            .from('nav', 1, {
                y: 30,
                autoAlpha: 0,
                ease: Power3.easeInOut
            }, '-=1')
            .from('.sub-title', 1, {
                y: 30,
                autoAlpha: 0,
                ease: Power3.easeInOut
            })
            .from('.bottom-nav', 2, {
                width: '0%',
                autoAlpha: 0,
                ease: Power3.easeInOut
            }, '-=2');
        
        navBottom.addEventListener('click', () => {
            console.log('bottom-nav clicked');
            if (!timeline2) { // Initialize timeline2 only once
                timeline2 = new TimelineMax()
                    .set('.grid', {
                        display: 'grid'
                    })
                    .to('.forest img', 3, {
                        y: -400,
                        scale: 1.1,
                        ease: Expo.easeInOut
                    })
                    .to('.bg-image', 3, {
                        y: -600,
                        ease: Expo.easeInOut
                    }, '-=3')
                    .to('.sub-title', 3, {
                        autoAlpha: 0,
                        y: -100,
                        ease: Expo.easeInOut
                    }, '-=3')
                    .to('.bottom-nav', 3, {
                        width: '0%',
                        ease: Expo.easeInOut
                    }, '-=3')
                    .to('nav', 3, {
                        color: '#fff',
                    }, '-=3')
                    .to('.imgs', 2, {
                        height: '100%',
                        ease: Expo.easeInOut
                    }, '-=2')
                    .to('.imgs-2', 2, {
                        height: '100%',
                        ease: Expo.easeInOut
                    }, '-=1.8')
                    .to('.imgs-3', 2, {
                        height: '100%',
                        ease: Expo.easeInOut
                    }, '-=1.7')
                    .to('.imgs-4', 2, {
                        height: '100%',
                        ease: Expo.easeInOut
                    }, '-=1.6')
                    .to('.destination', 2, {
                        autoAlpha: 1,
                        y: -20,
                        ease: Expo.easeOut
                    }, '-=1.6');
            }
        });
    } else if (window.location.href.includes('olumpos.html')) {
        console.log('Currently on olumpos.html. Initializing nav animation.');
        // Animation for nav on olumpos.html
        let olumposNavTimeline = new TimelineMax();
        olumposNavTimeline
            .from('nav', 1, {
                y: 30,
                autoAlpha: 0,
                ease: Power3.easeInOut,
                onStart: () => console.log('Nav animation starting'),
                onComplete: () => console.log('Nav animation complete')
            });
        console.log('Nav element for animation:', document.querySelector('nav'));
    } else if (window.location.href.includes('contact.html')) {
        console.log('Currently on contact.html. Initializing nav animation.');
        let contactNavTimeline = new TimelineMax();
        contactNavTimeline
            .from('nav', 1, {
                y: 30,
                autoAlpha: 0,
                ease: Power3.easeInOut,
                onStart: () => console.log('Contact Nav animation starting'),
                onComplete: () => console.log('Contact Nav animation complete')
            });
        console.log('Nav element for animation:', document.querySelector('nav'));
    }

    // Handle Home button click (moved outside bottom-nav listener)
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            console.log('Home button clicked');
            console.log('Current URL:', window.location.href);
            // Check if current page is index.html or olumpos.html
            if (window.location.href.includes('index.html') || !window.location.href.includes('.html')) {
                console.log('Currently on index.html or root. Attempting to reverse timeline2 if exists.');
                // On index.html, if timeline2 (grid animation) exists and has played, reverse it
                if (timeline2 && timeline2.progress() > 0) {
                    timeline2.reverse();
                }
            } else if (window.location.href.includes('olumpos.html')) {
                console.log('Currently on olumpos.html. Home button clicked. Simply loading index.html.');
                // On olumpos.html, simply load index.html without a transition
                transitionToPage('index.html');
            }
        });
    }

    document.querySelectorAll('.imgs, .imgs-2, .imgs-3, .imgs-4').forEach(img => {
        img.addEventListener('click', () => {
            console.log('Image clicked, transitioning to olumpos.html');
            transitionToPage('olumpos.html');
        });
    });

    // Handle dropdown link click
    let olumposLink = document.querySelector('.dropdown-content a[href="olumpos.html"]');
    if (olumposLink) {
        olumposLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            console.log('Dropdown link clicked, transitioning to olumpos.html');
            transitionToPage('olumpos.html');
        });
    }
});

