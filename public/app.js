// Grab the articles as a json

$(document).ready(function () {

  initiatePage();
  $(document).on("click", "#scrape", function () { 
    scrapeArticles();
  })
});

  function initiatePage() {
    $.getJSON("/articles", function (data) {
      for (var i = 0; i < data.length; i++) {
        $("#articles").append("<p class='article' data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + "<a href='" + data[i].link + "'>" + data[i].link + "</a>" + "<br />" + data[i].description + "</p>");
      }
    });
  };

function scrapeArticles() {

    $.get("/scrape").then(function (data) {
      initiatePage();
    })
}

$(document).on("click", ".article", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function(data) {
      console.log(data);
      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Submit Comment</button>");

      if (data.note) {
        console.log(data);
            $("#notes").append(
                "<div class='row'> <div class='card'> <div class='card-body'> <h5 class='card-title'>" +
                    data.note.title +
                    "</h5> <p class='card-text'>" +
                    data.note.body +
                    "</p> </div> </div>  </div>"
            );
      }
    });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })

    .then(function(data) {
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});
