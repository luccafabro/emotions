let time = 4000,
    currentImageIndex = 0,
    images = document.getElementsByTagName("body")
    max = 3;

function nextImage() {
    images = [
        "src/banner/1.jpg",
        "src/banner/2.jpg",
        "src/banner/3.jpg"
    ]
    currentImageIndex++

    if(currentImageIndex >= max)
        currentImageIndex = 0

    document.body.style.backgroundImage = `url('${images[currentImageIndex]}')`
}

function start() {
    setInterval(() => {
        nextImage()
    }, time)
}

window.onload = function() {
    this.start()
}