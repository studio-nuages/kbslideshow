# kbslideshow

## Features

Pure JS Slideshow

## Usage
```html
<script src="kbslideshow-1.0.0.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function(){
        var Slideshow = new KBSlideshow('.gallery', {
            duration: 6000,
            speed: 1000,
            maxScale: 1.3,
            transformOrigin: 'center'
        });
    });
</script>

<div class="gallery">
    <div class="item"><img src="images/1.jpg" alt=""></div>
    <div class="item" data-transform-origin="left top"><img src="images/2.jpg" alt=""></div>
    <div class="item" data-transform-origin="right bottom"><img src="images/3.jpg" alt=""></div>
</div>
```

## Options

- `duration` ms
- `speed` ms
- `maxScale` default 1.3
- `transformOrigin` default "center"

## LICENSE

This software is released under the MIT License, see LICENSE.