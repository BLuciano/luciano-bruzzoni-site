window.onload = function() {
  var form = document.getElementById("contact-form");
  var formMsg = document.getElementById("form-message");
  var formOpen = false;

  /*Holds the texts that will be displayed dynamically on opening page*/
  var phrases = {
    str1 : 'Luciano Bruzzoni <br/> Front End Developer',
    str2 : '$(this).addClass("awesome");',
  };

  //Smooth scroll plugin initialization code
  smoothScroll.init({
    speed: 1000,
    easing: 'easeOutQuad',
    updateURL: false
  });

  //Slick carousel plugin for personal pictures
  $('#my-pics').slick({
    autoplay: true,
    autoplaySpeed: 1500,
    accessibility: false,
    pauseOnHover: false,
    arrows: false,
    draggable: false,
    swipe: false,
    touchMove: false,
    speed: 3000,
    fade: true
  });

  //Show, hide hamburger navigation
  $("#navtog").click(function(){
    $(".navigation").toggleClass("showNav");
  });
  $(".mainHdr a").click(function(){
    $(".navigation").removeClass("showNav");
  });
  //hover state for nav links, avoids touch-screen event
  $(".mainHdr a").mouseenter(function(){
    if ("ontouchstart" in window){ return; }
    $(this).addClass("anim-nav-link");
  });
  $(".mainHdr a").mouseleave(function(){
    if ("ontouchend" in window){ return; }
    $(this).removeClass("anim-nav-link");
  });

  //contact form 
  form.addEventListener('submit', function(event){
    event.preventDefault();
    formData = $(form).serialize();
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    })
    .done(function(data){
      $(formMsg).html(data);
      $(formMsg).css("color", "green");
      clearForm();
    })
    .fail(function(error){
      $(formMsg).css("color", "red");
      $(formMsg).html(
        "There was an error sending the message. \n" +
        "Please fill ALL fields and try again."
      );
    });
    displayMessage();
  });

  //Shows contact form error/success message
  displayMessage = function(){
    $(formMsg).addClass("show-message");
    setTimeout(function(){
      $(formMsg).removeClass("show-message");
    }, 5000);
  };

  //Clears the form on from submit or form-hide
  clearForm = function(){
    $("#name").val('');
    $("#email").val('');
    $("#message").val('');
  };

  //Button to display/hide contact form
  $("button.open-form").on("mousedown touchstart", function(){
    $(this).addClass("contact-btn-anim");
  });
  $("button.open-form").on("mouseup touchend", function(){
    $(this).removeClass("contact-btn-anim");
  });
  $("button.open-form").click(function(){
    $("#contact-form").slideToggle();
    $(this).html("Close Form <br/><span><i class='fa fa-chevron-up'></i></span>");
    if(formOpen){
      clearForm();
      $(this).html("Send me a message<br/><span><i class='fa fa-chevron-down'></i></span>");
    }
    formOpen = !formOpen;
  });

  //Buttons to choose projects
  $(".buttons button").on("mousedown touchstart", function(){
    $(this).addClass("push-btn-anim");
  });
  $(".buttons button").on("mouseup touchend", function(){
    var projArry = [".api-projects", ".game-room", ".live-sites", ".other-projects"];
    $(this).removeClass("push-btn-anim");

    if($(this).hasClass("active")){
      return;
    }
    $(".buttons button").removeClass("active");
    $(this).addClass("active");
    //$(".api-projects, .game-room, .live-sites, .other-projects").addClass("hidden");
    $(".api-projects, .game-room, .live-sites, .other-projects").fadeOut(750);
    
    
    if($(this).html() === "API Projects"){
      $("div.api-projects").delay(750).fadeIn(750);
    }
    if($(this).html() === "Game Room"){
      $("div.game-room").delay(750).fadeIn(750);
    }
    if($(this).html() === "CMS Custom"){
      $("div.cms-custom").delay(750).fadeIn(750);
    }
    if($(this).html() === "Others"){
      $("div.other-projects").delay(750).fadeIn(750);
    }
  });
  
  //Animation for opening of page
  openingDisplay = function(){
    var log = "";
    var i = 0;
    var str1 = phrases.str1.split("");
    var str2 = phrases.str2.split("");

    var timer = window.setInterval(function(){
      if((str1.length -1) === i){
        $("#opening-anim p:nth-child(1)").html(phrases.str1);
        log = "";
        i = 0;
        window.clearInterval(timer);
        displayClass();
      } else{
        log += str1[i];
        i++;
        $("#opening-anim p:nth-child(1)").html(log);
      }
    }, 50);

    displayClass = function(){
      var timer2 = window.setInterval(function(){
        if((str2.length -1) === i){
          window.clearInterval(timer2);

          $(".hide-part").addClass("hide");
          $("#opening-anim p").fadeOut();
          window.setTimeout(function(){
            $("#opening-anim").css('display', "none");
            /*Call getMap once done to reduce initial load time*/
            getMap();
          }, 2000);
        }
        log += str2[i];
        i++;
        $("#opening-anim p:nth-child(2)").html(log);
      }, 50);
    };
  };

  //Google Map
  function getMap() {
    var canvas = document.getElementById("map");
    var options = {
      center: new google.maps.LatLng(34.14, -118.25),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(canvas, options);
  }

  //Get random color and change landing title color in a loop
  (function randColors(){
    var green, red, blue;
    setInterval(function(){
      red = Math.floor(Math.random() * 255);
      green = Math.floor(Math.random() * 255);
      blue = Math.floor(Math.random() * 255);
      $(".rgb span").html(red + ", " + green + ", " + blue);
      $("#landing h1, #landing h2, #landing h3, .rgb")
        .css("color", "rgb(" + red + ", " + green + ", " + blue + ")");
    }, 3000);
  })();

  openingDisplay();
};