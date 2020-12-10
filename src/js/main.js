import $ from 'jquery';

global.jQuery = $;
global.$ = $;

import 'slick-carousel';

// import Shuffle from 'shufflejs';

function countDown() {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let birthday = new Date().setHours(new Date().getHours() + 5),
    countDown = new Date(birthday).getTime(),
    x = setInterval(function () {

      let now = new Date().getTime(),
        distance = countDown - now;

      // document.getElementById("days").innerText = Math.floor(distance / (day)),
      document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

      //do something later when date is reached
      if (distance < 0) {


        clearInterval(x);
      }
      //seconds
    }, 1000)
}


$(document).ready(function () {
  $('.catalog_section .slider').slick();
  $('.reviews_section .slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 959,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  // var elem = document.querySelector('.gallery');
  // var sizer = document.querySelector('.my-sizer-element');
  // var shuffleInstance = new Shuffle(elem, {
  //   itemSelector: '.gallery-item',
  //   sizer: sizer // could also be a selector: '.my-sizer-element'
  // });

  countDown()
});
