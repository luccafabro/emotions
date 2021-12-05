let time = 4000,
    currentImageIndex = 0,
    images = document.getElementsByTagName('body'),
    max = 3;

function nextImage() {
    'use strict';
    images = [
        'assets/resources/images/banner/1.jpg',
        'assets/resources/images/banner/2.jpg',
        'assets/resources/images/banner/3.jpg'
    ];
    currentImageIndex++;

    if(currentImageIndex >= max)
        currentImageIndex = 0;

    document.body.style.backgroundImage = `url('${images[currentImageIndex]}')`;
}

function start() {
    'use strict';
    setInterval(() => {
        nextImage();
    }, time);
}

window.onload = function() {
    'use strict';
    start();
};