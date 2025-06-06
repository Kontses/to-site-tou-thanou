function transitionToPage(url) {
    console.log('Transitioning to page:', url);
    let transitionTimeline = new TimelineMax();
    let overlay = document.querySelector('.page-transition-overlay');

    if (overlay) {
        transitionTimeline
            .set(overlay, { visibility: 'visible', pointerEvents: 'auto' })
            .to(overlay, 0.7, {
                opacity: 1,
                ease: Power2.easeOut,
                onComplete: () => {
                    console.log('Overlay fully opaque, redirecting to', url);
                    window.location.href = url;
                }
            });
    } else {
        window.location.href = url;
    }
}

function initializePageEntryTransition() {
    let overlay = document.querySelector('.page-transition-overlay');
    if (overlay) {
        TweenMax.set(overlay, { opacity: 1, visibility: 'visible', pointerEvents: 'auto' });
        TweenMax.to(overlay, 0.7, {
            opacity: 0,
            ease: Power2.easeIn,
            onComplete: () => {
                TweenMax.set(overlay, { visibility: 'hidden', pointerEvents: 'none' });
                console.log('Page entry transition complete.');
            }
        });
    }
}

export { transitionToPage, initializePageEntryTransition }; 