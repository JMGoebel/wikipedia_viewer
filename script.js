/*globals $:false, console */



$(document).ready(function () {
  "use strict";

  $("#intro").click(function () {
    $("#eye").fadeOut();
    $("#wikiText").fadeOut();
    $("#searchField").animate({
      top: "3%",
      innerHeight: "50px",
      background: "red"
    }, 1000, function () {
      $("#searchBoxContainer").show();
      $("#intro").hide();
    });
  });

  var searchResults = function (data) {
    var buildString = '';
    for (var prop in data[1]) {
      buildString = "<div class='cardContainer'>";
      buildString += "<div class='card'>";
      buildString += "<div class='cardTitle'>";
      buildString += "<p>" + data[1][prop] + "</p>";
      buildString += "</div>";
      buildString += "<div class='cardContent'>";
      buildString += "<p>" + data[2][prop] + "</p>";
      buildString += "</div>";
      buildString += "<div class='cardFull'><p>test</p></div>";
      buildString += "<div class='cardLink'>";
      buildString += "<p>&#128279; <a class='card_link' href='" + data[3][prop] + "' target='_blank'>" + data[3][prop] + "</a></p>";
      buildString += "</div>";
      buildString += "</div>";
      buildString += "</div>";
      $("#results").append(buildString);
    }
    $('.card').click(function(){
      $(this).find(".card_link")[0].click();
    });
  }

  $("#searchbox").autocomplete({
    minLength: 0,
    delay: 200,
    source: function (request, response) {
      $.ajax({
        url: "http://en.wikipedia.org/w/api.php",
        dataType: "jsonp",
        data: {
          'action': "opensearch",
          'format': "json",
          'search': request.term
        },
        success: function (data) {
          $("#results").empty();
          searchResults(data);
          $(".cardContainer").each(function (index) {
            $(".cardContainer:nth-child(" + (index+1) + ")").delay(50 * index).fadeIn(50);
          });
        }
      });
    }
  });
});
