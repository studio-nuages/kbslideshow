/* ===========================================================
 * KBSlideshow v1.0.0
 * ===========================================================
 * Copyright 2017 Studio Nuages.
 * 
 * https://github.com/studio-nuages/kbslideshow
 *
 * License: MIT
 *
 * ========================================================== */

'use strict';

var KBSlideshow = function(selector, options) {
    this.elements = document.querySelectorAll(selector);

    // default value
    this.options = {
        duration: 6000, // ms
        speed: 2000,    // fade speed
        maxScale: 1.3,
        transformOrigin: 'center'   // default transform-origin
    };

    for(var prop in options){
        this.options[prop] = options[prop];
    }

    if(this.options.speed > this.options.duration){
        this.options.speed = this.options.duration;
    }
    console.log(this.options);

    for(var i = 0; i < this.elements.length; i++) {
        this.init(this.elements[i]);
    }
};

KBSlideshow.prototype.init = function(element) {
    var inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '100%';
    inner.style.position = 'relative';
    inner.style.overflow = 'hidden';

    var slides = [];

    for(var i = 0; i < element.childNodes.length; i++){
        var slide = element.childNodes[i];
        if(slide.nodeType !== 1) continue;
        inner.appendChild(slide);
        slides.push(slide);

        slide.style.position = 'absolute';
        slide.style.opacity = 0;
        slide.style.top = 0;
        slide.style.left = 0;
        var transformOrigin = slide.dataset.transformOrigin;
        if(transformOrigin != ''){
            slide.style.transformOrigin = transformOrigin;
        } else {
            slide.style.transformOrigin = this.options.transformOrigin;
        }
    }
    element.appendChild(inner);

    if(slides.length == 0) return;

    slides[0].style.opacity = 1;

    var duration = this.options.duration;
    var speed = this.options.speed;
    var maxScale = this.options.maxScale;

    var start = null;
    var slideIndex = 0;
    var firstFlag = true;

    var step = function(timestamp){
        var currentSlide = slides[(slides.length + slideIndex) % slides.length];
        var nextSlide = slides[(slideIndex + 1) % slides.length];

        if (!start){
            start = timestamp;
        } 

        var progress = timestamp - start;
        var t1 = Math.min(1, (progress / duration) % duration);
        var t2 = Math.min(1, Math.max(0, progress - (duration - speed)) / speed);

        currentSlide.style.opacity = 1 - t2;
        nextSlide.style.opacity = t2;
        var scale1 = (1 + (maxScale - 1) * t1) + ( (maxScale - 1) * speed / duration );
        currentSlide.style.transform = 'scale(' + scale1 + ')';
        nextSlide.style.transform = 'scale(' + (1 + (maxScale - 1) * speed / duration * t2) + ')';

        if(t1 >= 1) {
            start = null;
            slideIndex = (slideIndex + 1) % slides.length;
            currentSlide.style.transform = 'scale(1)';
        }
        
        requestAnimationFrame(step);
    };

    start = null;
    requestAnimationFrame(step);
};