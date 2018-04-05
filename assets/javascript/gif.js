$('button').on('click', function() {
	var animal = $(this).data('name');
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: 'GET'
	})
		.done(function(response) {
		console.log(response)

			var results = response.data;

			for (var i = 0; i < results.length; i++) {

				var animalDiv = $('<div/>');
				//Add the ratings for the gifs above 
				var p =$('<p/>');
				p.text("Rating: " + results[i].rating);

				var animalImage = $('<img/>');
				animalImage.addClass('animalImg')
				animalImage.attr('src', results[i].images.fixed_height.url);
				animalImage.attr('data-still', results[i].images.fixed_height_still.url)
				animalImage.attr('data-animate', results[i].images.fixed_height.url)

				.attr('data-state', 'still');
				animalDiv.append(p);
				animalDiv.append(animalImage);
				animalDiv.prependTo($('#gifs'));
			}

			$('.aninmalImg').on('click', function() {
		
				var state = $(this).attr('data-state'); 
				console.log(this);

				if (state == 'still') {				
				$(this).attr('src', $(this).data('animate'));				
				$(this).attr('data-state', 'animate');

				} else {						
				$(this).attr('src', $(this).data('still'));				
				$(this).attr('data-state', 'still');
				}      
			});
		});
});

var animals = [''];

	// creates buttons and animates
	$('#MakeGIFButton').on('click', function(){
		var animalButton = $("#gif-input").val();
		//adds the new animal

		var newButton = $("<button/>").addClass( "btn btn-info animal").attr('data-name',animalButton).html(animalButton);
		
		$("#animalsbuttons").append(newButton);
			console.log("Work");

		queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalButton + "&api_key=dc6zaTOxFJmzC&limit=10";
			console.log(animalButton);

		$.ajax({
		url: queryURL,
		method: 'GET'
		})

		.done(function(response) {

		var results = response.data;

			for (var i = 0; i < results.length; i++) {

				var animalDiv = $('<div/>');
				//Add the ratings for the gifs above 
				var p =$('<p/>');
				p.text("Rating: " + results[i].rating);
				//create the gif images
				var animalImage = $('<img/>');
				animalImage.addClass('animalImg')
				animalImage.attr('src', results[i].images.fixed_height_still.url);
				animalImage.attr('data-still', results[i].images.fixed_height_still.url)

				animalImage.attr('data-animate', results[i].images.fixed_height.url)

				.attr('data-state', 'still');
				animalDiv.append(p); 
				animalDiv.append(animalImage);
				animalDiv.prependTo($('#gifs'));
			}

			$('.aninmalImg').on('click', function() {
		
				var state = $(this).attr('data-state'); 
				console.log(this);

				if (state == 'still') {
				$(this).attr('src', $(this).data('animate'));
				$(this).attr('data-state', 'animate');

				} else {
				$(this).attr('src', $(this).data('still'));
				$(this).attr('data-state', 'still');
				}      
			});
		});

		$("#gif-input").val("");
		return false;
	})
$('#buttons').on("click", "div", function() {

	var state = $(this).attr("data-state");
	var still = $(this).attr("data-still");
	var active = $(this).attr("data-active");
	var image = $("<img>");

	image.attr({
		"src": active,
		"data-still": still,
		"data-active": active,
		"data-state": "active",
		"width": '350'
	});

	$('#gifs').html(image);

});

$('#gifs').on("click", "img", function() {

	var state = $(this).attr("data-state");
	var still = $(this).attr("data-still");
	var active = $(this).attr("data-active");
	
	if (state === "active") {

		$(this).attr("src", still);
		$(this).attr("data-state", "still");

	} else if (state === "still") {
		
		$(this).attr("src", active);
		$(this).attr("data-state", "active");
	}
});

$('#inputForm').keypress(function(e) {

    if (e.which === 13) {

    	var search = $('#inputForm').val();
    	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search +"&api_key=d7b7211e027547b09b92844a2907e598&limit=10&rating";
    	$('#inputForm').val("");

    	$.ajax({
		url: queryURL,
		type: 'GET',
	})
	.done(function(response) {

		$('#gifs').empty();
		var state = $(this).attr("data-state");
		var still = $(this).attr("data-still");
		var active = $(this).attr("data-active");
		
		
		for (var i = 0; i < response.data.length; i++) {

			var image = $("<img>");
			image.attr({
				"src": response.data[i].images.downsized_still.url,
				"data-still": response.data[i].images.downsized_still.url,
				"data-active": response.data[i].images.downsized.url,
				"data-state": "still",
				"width": "250"
			});

			$('#gifs').append(image);
		}
	})
      
    }
});
	
// empty gif image area
$('#emptyGifs').click(function() {
  $('#gifs').empty();
});