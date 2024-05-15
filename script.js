// import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'), // because inside main there is full website.
    smooth: true
});

// creating mini-circle which follow the mouse
function circleMouseFollower() {
    window.addEventListener('mousemove', function(event) {
        var miniCircle = document.getElementById('mini-circle');
        var x = event.clientX;
        var y = event.clientY;
        miniCircle.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`; // Centering the circle at cursor
    });
}
circleMouseFollower();

// Adding animations in the first page (HERO)

function firstPageAnim() {
    var t1 = gsap.timeline();

    t1.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: "Expo.easeInOut" // Note: Quotes around easing function name
    })
        .to(".bounding-elem", {
            y: 0,
            ease: "Expo.easeInOut",
            duration: 2,
            delay: -1, // this will start little bit earlier
            stagger: .2 // need delay (every thing will not come in same time)
        })
        .from("#hero-footer", {
            y: '-10',
            opacity: 0,
            duration: 1.5,
            delay: -1, // this will start little bit earlier
            ease: "Expo.easeInOut" // Note: Quotes around easing function name
        })       
}

firstPageAnim()

// Second page

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate; //dets.clientX = mouse current position (200)|| rotate = previous position (0) 200 - 0 = 200;
      rotate = dets.clientX; // now rotate = 200; if you move mouse little bit then it goes to 205, now previous is 200 then 205 new - previous 200 = 5 is the difference the image will be rotated by 5 degrees.
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5), // this is used for setting minimum and maximum rotation

        // here minimum = -20, maximum = 20, value wanna clamp = diffrot
      });
    });
  });
