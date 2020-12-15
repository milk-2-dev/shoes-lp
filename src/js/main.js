import $ from 'jquery';

global.jQuery = $;
global.$ = $;

import 'slick-carousel';
import '@fancyapps/fancybox';

import Inputmask from "inputmask";

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

const initScrollToLink = () => {
  $(".anchor").on("click", function (event) {
    event.preventDefault();

    var name = $(this).attr('href'),
      top = $(name).offset().top;

    top = +top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
}

const calcOldPrice = () => {
  const allElements = $(".price_item.new").get()

  allElements.forEach(item => {
    const itemPrice = $(item).text().split(' ')[0]

    const oldPrice = Math.round(+itemPrice * 100 / (100 - 30))

    $(item).parent().find(".price_item.old").text(`${oldPrice} грн`)
  })
}

const initOrderModal = () => {
  $(".product_item .button").on('click', function (event) {
    const $button = $(event.currentTarget)

    const $modalOrderProduct = $(".modal-order-form")
    // $modalOrderProduct.html('')
    $modalOrderProduct.find(".product-img").html('').append($($button.parent().find(".slider-item")[0]).clone())
    $modalOrderProduct.find(".product-info").html('').append($button.parent().find(".title_block").clone())
    $modalOrderProduct.find(".product-info").append($button.parent().find(".price_item.new").clone())


    $.fancybox.open({
      src: '#hidden-content',
      type: 'inline',
      opts: {
        afterShow: function (instance, current) {
          // console.info('done!');
        }
      }
    });
  });
}

const sendOrder = (orderData) => {
  $.ajax({
    method: "POST",
    url: `./send_order.php`,
    data: JSON.stringify(orderData),
    contentType: "application/json",
    beforeSend: function () {
    },
    success: function (data) {

    },
    error: function (error) {
      console.log('')
    }
  });
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
  initScrollToLink()
  calcOldPrice()
  initOrderModal()

  const input = $("input[name='tel']")[0]

  var im = new Inputmask("+38(099) 999-9999");
  im.mask(input);

  $("#orderBtn").on("click", event => {
    const orderData = {}

    if ($("[name='userName']").val() !== '') {
      if ($("[name='tel']").val() !== '') {
        orderData["product"] = $(".modal-order-form .title_block h4").text()
        orderData["price"] = $(".modal-order-form .price_item.new").text()
        orderData["userName"] = $("[name='userName']").val()
        orderData["tel"] = $("[name='tel']").val()

        sendOrder(orderData)
      } else {
        $.fancybox.open('<div class="message"><h2>Заполните номер телефона</h2></p></div>');
      }
    } else {
      $.fancybox.open('<div class="message"><h2>Заполните имя</h2></p></div>');
    }
  })
});
