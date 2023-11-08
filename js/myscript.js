/* Please ❤ this if you like it! */

(function () {
    // Slick Init
    var curOptions = 0,
      arrOptions = [
        {
          centerMode: true,
          centerPadding: "24.4%",
          fade: false,
          dots: true
        },
        {
          centerMode: false,
          centerPadding: "0px",
          fade: true,
          dots: false
        }
      ];
    var myCarousel = $(".advanced-gallery-slider").slick(
      $.extend(
        {
          dots: true,
          infinite: false,
          draggable: false,
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "24.4%",
          nextArrow: $(".nextArrow"),
          prevArrow: $(".prevArrow"),
          responsive: [
            {
              breakpoint: 768,
              settings: {
                fade: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: "0px"
              }
            }
          ]
        },
        arrOptions[curOptions]
      )
    );
  
    // toggle slick center mode and normal mode
    function switchOptions() {
      curOptions = curOptions ? 0 : 1;
      if (document.body.classList.contains("gallery-open")) {
        curOptions = 1;
        myCarousel.slick("slickSetOption", arrOptions[curOptions], true);
  
        setTimeout(function () {
          myCarousel.slick("refresh");
        }, 500);
  
        $(".advanced-gallery-wrapper").one("click", function () {
          setTimeout(function () {
            myCarousel.slick("refresh");
          }, 500);
        });
      } else {
        curOptions = 0;
        myCarousel.slick("slickSetOption", arrOptions[curOptions], true);
      }
    }
  
    window.addEventListener("load", function () {
      document.body.classList.add("gallery-loaded");
    });
  
    // Active video play js
    var sliderWrapper = document.querySelector(".advanced-gallery-wrapper");
    var slides = document.querySelectorAll(".advanced-gallery-item");
    var videoSlidesVideos = document.querySelectorAll(
      ".advanced-gallery-item.media-type-video iframe"
    );
    var sliderArrows = document.querySelectorAll(
      ".gallery-open .advanced-gallery-wrapper .slick-arrow"
    );
  
    var withContentSlides = document.querySelectorAll(
      ".advanced-gallery-item-inner-wrapper"
    );
    Array.prototype.slice.call(withContentSlides).forEach(function (slide) {
      if (slide.classList.contains("with-content")) {
        sliderWrapper.classList.add("with-content");
      }
    });
  
    var currentPos = 0;
    var previousPos = 0;
    sliderWrapper.addEventListener("click", function () {
      function myFunction(x) {
        if (x.matches) {
          switchOptions();
        }
      }
      var x = window.matchMedia("(min-width: 768px)");
      myFunction(x);
      x.addListener(myFunction);
  
      if (document.body.classList.contains("gallery-open")) {
        Array.prototype.slice.call(slides).forEach(function (slide, index) {
          if (slide.classList.contains("media-type-video")) {
            currentPos = index;
  
            Array.prototype.slice
              .call(videoSlidesVideos)
              .forEach(function (video) {
                video.setAttribute(
                  "src",
                  video.getAttribute("src").split("?")[0]
                );
                var symbol = video.src.indexOf("?") > -1 ? "&" : "?";
                if (slide.classList.contains("slick-active")) {
                  if (currentPos != previousPos) {
                    video.src += symbol + "rel=0&amp;autoplay=1&controls=0";
                  } else {
                    video.src += symbol + "rel=0&amp;autoplay=1";
                    setTimeout(function () {
                      slide.parentElement.parentElement.parentElement.parentElement.classList.add(
                        "button-right"
                      );
                    }, 100);
                  }
                }
              });
            previousPos = currentPos;
          } else {
            slide.parentElement.parentElement.parentElement.parentElement.classList.remove(
              "button-right"
            );
          }
        });
      } else {
        Array.prototype.slice.call(videoSlidesVideos).forEach(function (video) {
          if (
            video.src.indexOf("rel=0&amp;autoplay=") > -1 ||
            video.src.indexOf("?") > -1
          ) {
          } else {
            video.setAttribute("src", video.getAttribute("src").split("?")[0]);
            var symbol = video.src.indexOf("?") > -1 ? "&" : "?";
            video.src += symbol + "rel=0&amp;autoplay=1&mute=1&controls=0";
          }
          if (
            video.src.indexOf("?rel=0&amp;autoplay=1") > -1 &&
            video.src.indexOf("rel=0&amp;autoplay=1&mute=1&controls=0") < 0
          ) {
            video.setAttribute("src", video.getAttribute("src").split("?")[0]);
            var symbol = video.src.indexOf("?") > -1 ? "&" : "?";
            video.src += symbol + "rel=0&amp;autoplay=1&mute=1&controls=0";
          }
        });
      }
    });
  
    // popup js
    var sliderItems = document.querySelectorAll(".advanced-gallery-item-media");
    Array.prototype.slice.call(sliderItems).forEach(function (item) {
      item.addEventListener("click", function (e) {
        if (document.body.classList.contains("gallery-open")) {
        } else {
          document.body.classList.add("gallery-open");
          // imulator scroll
          Array.prototype.slice.call(slides).forEach(function (slide, index) {
            var b = window.innerHeight;
            var c = slide.offsetHeight;
            if (c > b) {
              sliderWrapper.classList.add("top_space");
            } else {
              sliderWrapper.classList.remove("top_space");
            }
          });
        }
      });
    });
  
    // imulator scroll
    window.addEventListener("resize", function () {
      Array.prototype.slice.call(slides).forEach(function (slide, index) {
        var b = window.innerHeight;
        var c = slide.offsetHeight;
        if (c > b) {
          sliderWrapper.classList.add("top_space");
        } else {
          sliderWrapper.classList.remove("top_space");
        }
      });
    });
  
    // Full Screen Functionality
    var elem = document.querySelector(".advanced-gallery-wrapper");
    var fullscreenBtn = document.querySelector(".fullscreen-icon");
    var closeFullscreenBtn = document.querySelector(".close-fullscreen-icon");
  
    fullscreenBtn.addEventListener("click", function () {
      document.body.classList.remove("fullscreen-open");
      toggleFullscreen(elem);
    });
    closeFullscreenBtn.addEventListener("click", function () {
      document.body.classList.remove("fullscreen-open");
      document.body.classList.remove("gallery-open");
      closeFullscreen();
  
      myCarousel.slick("slickSetOption", arrOptions[0], true);
      myCarousel.slick("refresh");
    });
  
    // toggleFullscreen
    function toggleFullscreen(elem) {
      elem = elem || document.documentElement;
      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
          document.body.classList.add("fullscreen-open");
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
          document.body.classList.add("fullscreen-open");
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
          document.body.classList.add("fullscreen-open");
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
          document.body.classList.add("fullscreen-open");
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          document.body.classList.remove("fullscreen-open");
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
          document.body.classList.remove("fullscreen-open");
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
          document.body.classList.remove("fullscreen-open");
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
          document.body.classList.remove("fullscreen-open");
        }
      }
    }
    // closeFullscreen
    function closeFullscreen() {
      if (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      ) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          document.body.classList.remove("fullscreen-open");
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
          document.body.classList.remove("fullscreen-open");
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
          document.body.classList.remove("fullscreen-open");
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
          document.body.classList.remove("fullscreen-open");
        }
      }
    }
  
    // exit fullscreen
    document.body.addEventListener("keyup", function (e) {
      if (e.which == 27) {
        document.body.classList.remove("fullscreen-open");
      }
    });
  
    // set image in background for IE
    if ("objectFit" in document.documentElement.style === false) {
      $(".advanced-gallery-item-media img").each(function () {
        var w = $(this).width();
        var h = $(this).height();
        var s = $(this).attr("src");
        var final =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" +
          w +
          "' height='" +
          h +
          "'%3E%3C/svg%3E";
        $(this).css("background", "url(" + s + ") no-repeat 50% center /cover");
        $(this).attr("src", final);
      });
    }
  })();
  