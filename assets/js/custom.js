// Init AOS
function aos_init() {
  AOS.init({
    duration: 500,
    easing: "ease-in-out",
    once: true
  });
}
$(window).on('load', function () {
  aos_init();
});

(jQuery);


(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

 /**
   * Clients Slider
   */



  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 120
      }
    }
  });



  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

// Back to top button
$(window).scroll(function() {
  if ($(this).scrollTop() > 100) {
    $('.back-to-top').fadeIn('slow');
  } else {
    $('.back-to-top').fadeOut('slow');
  }
});

$('.back-to-top').click(function() {
  $('html, body').animate({
    scrollTop: 0
  }, 1500, 'easeInOutExpo');
  return false;
});

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => { 
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  
  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()


$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})





$(document).ready(function(){
  
  var $select = $('select'),
      $speed = 'fast';
  
  $select.each(function(){
    // Allow default browser styling
    if ( $(this).hasClass('default') ) {
      return;
    }
    $(this).css('display', 'none');
    // Generate fancy select box
    $(this).after('<ul class="fancy-select" style="display: none;"></ul>');
    var $current = $(this),
        $fancy = $current.next('.fancy-select');
    
    // Get options
    var $options = $(this).find('option');
    $options.each(function(index){
      var $val = $(this).val(),
          $text = $(this).text(),
          $disabled = '';
      // Add class for disabled options
      if ( $(this).attr('disabled') ) $disabled = ' disabled';      
      
      if ( index == 0 ) {
        // Create clickable object from first option
        $fancy.before('<span class="selected" data-val="'+ $val +'">'+ $text +'</span>');
      }
      // Load all options into fake dropdown
      $fancy.append('<li class="fancy-option'+ $disabled +'" data-val="'+ $val +'">'+ $text +'</li>');
      // Update fake select box if this option is selected
      if ( $(this).attr('selected') ) {
        $(this).parent('select').val($val);
        $(this).parent('select').next('.selected').attr('data-val', $val).text($text);
      }
    });
    
  });
  
  // Show/hide options on click
  $('.selected').click(function(target){
    var $box = $(this).next('.fancy-select'),
        $target = target,
        $object = $(this);
    
    // Prevent multiple open select boxes
    if ( $box.is(':visible') ) {
      $box.slideUp($speed);
      return;
    } else {
      $('.fancy-select').slideUp();
      $box.slideDown($speed);
    }
    
    // Click outside select box closes it
    $target.stopPropagation();
    if ( $box.css('display') !== 'none' ) {
      $(document).click(function(){
        $box.slideUp($speed);
      });
    }
  });
  
  // Make selection
  $('.fancy-option').click(function(){
    var $val = $(this).attr('data-val'),
        $text = $(this).text(),
        $box = $(this).parent('.fancy-select'),
        $selected = $box.prev('.selected'),
        $disabled = $(this).hasClass('disabled');
    
    // Basic disabled option functionality
    if ( $disabled ) {
      return;
    }
    
    $box.slideUp($speed);
    
    // Update select object's value
    // and the fake box's "value"
    $selected.prev('select').val($val);
    $selected.attr('data-val', $val).text($text);
    
    // Get Output
    var $what = $('#what').val(),
        $when = $('#when').val();
    $('.output').text('You want '+ $what +' '+ $when +'.');
  });
  
});