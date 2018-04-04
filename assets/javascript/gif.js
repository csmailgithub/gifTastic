// populate top 5 Trending Gifs as buttons to screen

var trending = "https://api.giphy.com/v1/gifs/trending?&api_key=d7b7211e027547b09b92844a2907e598&limit=10&rating";

$.ajax({
	url: trending,
	type: 'GET',
})
.done(function(response) {
	console.log(response);
	for (var i = 0; i < response.data.length - 5; i++) {
		
		var button = $("<div class='btn btn-info btn-block'>");
		button.attr({
			"data-still": response.data[i].images.downsized_still.url,
			"data-active": response.data[i].images.downsized.url,
			"data-state": "still"
		});

		button.html([i+1]);
		$('#buttons').append(button);
	}
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

