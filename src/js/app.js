if (module.hot) {
  module.hot.accept();
}

import Swiper from 'swiper'
import WOW from 'wow.js'
import Validator from './validator'
import axios from 'axios';





new WOW().init();




window.addEventListener('DOMContentLoaded', () => {

  


	var swiper = new Swiper('.home-slider', {
    simulateTouch: false,
    loop: true,
    speed: 1500,
    autoplay: true,
    pagination: {
      el: '.home-bullets',
			clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + '</span>';
        },
    },
    navigation: {
      prevEl: '.home-navigation__prev',
      nextEl: '.home-navigation__next',
    },
  });

  let teamSlider = new Swiper('.team-slider', {
      slidesPerView: 3,
      loop: true,
      spaceBetween: 100,
      navigation: {
        prevEl: '.team-slider__button_prev',
        nextEl: '.team-slider__button_next'
      },
      breakpoints: {
        200: {
          slidesPerView: 1,
          spaceBetween: 10
        },

        576: {
          slidesPerView: 2,
          spaceBetween: 10
        },

        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },

        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },

        1200: {
          spaceBetween: 100,
        }
      }
  })

  let brandsSlider = new Swiper('.brands-slider', {
    slidesPerView: 6,
    loop: true,
    autoplay: 500,
    breakpoints: {
      200: {
        slidesPerView: 2,
      },
      500: {
        slidesPerView: 3,
      },

      768: {
        slidesPerView: 5,
      },

      1200: {
        allowSlidePrev: 6,
      }
    }
  });

  let tieThumb = new Swiper('.tie-thumb', {
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  let tieSlider = new Swiper('.tie-slider__container', {
    slidesPerView: 1,
    autoplay: true,
    thumbs: {
      swiper: tieThumb
    }
  });
});




if(document.querySelector('.projects__list')) {

  console.log('w3x');
  
  

let projectsList = document.querySelector('.projects__list');
let modalClose = document.querySelector('.modal-close');



function fetchData() {
  let elements = Array.from(document.querySelectorAll('.project'));

  return elements.map((el, index) => {
    el.setAttribute('data-modal', index);

    let content = el.querySelector('.project__content').innerHTML.trim();
    let title = el.querySelector('.project__title').innerText.trim();

    return {
      title,
      content,
      index
    }
  });
}

let data = fetchData();



function showModal(index) {

  

  
  let content = document.querySelector('.modal__content');
  
    content.innerHTML = data.find(el => el.index == index).content;
    document.body.classList.add('active-modal');

    setTimeout(() => {
    
      var projectsSwiper = new Swiper('.projects-slider', {
        speed: 2000,
        autoplay: {
          delay: 1000
        },
      });

    }, 500);

}

 

  function hideModal() {
    document.body.classList.remove('active-modal');
  }

  projectsList.addEventListener('click', event => {
    let target = event.target;

    if(target.tagName === 'BUTTON') {
      
      let project = target.closest('.project');
      let index = project.getAttribute('data-modal');
      
      showModal(index);
      
      

    }
  });

  window.addEventListener('keydown', event => {
    if(event.keyCode === 27) {
      hideModal();
    }
  });


  modalClose.addEventListener('click', e => {
    hideModal();
  })
}

let burger = document.querySelector('.burger');
let menu = document.querySelector('.mobile-header');

burger.addEventListener('click', event => {
  menu.classList.toggle('active');
});



if(document.querySelector('.form')) {
  
  let form = document.querySelector('.form');
  let inputs = form.querySelectorAll('.form-group__input');
  let emptyInputs = [];
  let formButton = form.querySelector('.form-group__button');
  let textarea = form.querySelector('.form-group__textarea');
  
  
  formButton.addEventListener('click', event => {
    let target = event.target;
    event.preventDefault();
    let emptyInputs = [];
    
    
    inputs.forEach(element => {
      let elVal = element.value.trim();
      let textarea = form.querySelector('.form-group__textarea');
      
      
      
      if(element.classList.contains('error')) {
        element.classList.remove('error');
      } 
      
      if (textarea.classList.contains('error')){        
        textarea.classList.remove('error');
      }
      
      if(elVal.length === 0) {
        emptyInputs.push(element);
      }

      if(textarea.value.length === 0) {
        emptyInputs.push(textarea);
      }
      
      
    });
    

    if(emptyInputs.length) {
      emptyInputs.forEach(element => {
      
        element.classList.add('error');
      });
    } else {
      let date = new FormData();
      date.append('name', form.name.value);
      date.append('number', form.number.value);
      date.append('message', form.message.value);
      date.append('company', form.company.value);
      date.append('email', form.email.value);

      axios.post('/mail.php', date, {
        'Content-Type': 'application/x-www-form-urlencoded'
      }).then(response => {
        if(response.status === 200) {
          document.querySelector('.complete-message').classList.add('active');
          inputs.forEach(element => {
            element.value = '';
          });
          textarea.value = '';
        }
      })
    }
    
    
    
  });


 
  
  


  
}