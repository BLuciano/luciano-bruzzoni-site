
//Controls for the frog's movements. Also checks the boundaries
//to avoid moving out of the viewport and if the user lost or won.
$(document).keydown(function(e){
	var $froggy = $("#froggy");
	var $frogImg = $("#froggy img");

	//Check to see if game is running (not on text display mode)
	if(game.playing){
		switch(e.keyCode){
			case 37:
				$frogImg.attr('src', "img/frogleft.gif");
				if($froggy.position().left < 1){
					break;
				} else {
					$froggy.animate(
						{left: -40 + $froggy.position().left + "px"}, 10);
				}
				break;

			case 38:
				$frogImg.attr('src', "img/frogback.gif");
				if(game.won($froggy.position().left, $froggy.position().top)){
					$froggy.css("top", "0px");
					$froggy.css("left", "560px");
					$frogImg.attr('src', "img/frogfront.gif");
					game.wonScreen();
				} 
				else if($froggy.position().top < 51 && 
					($froggy.position().left < 550 ||
					$froggy.position().left > 570)) {
					break;
				} else {
					$froggy.animate(
						{top: -70 + $froggy.position().top + "px"}, 10);
				}
				break;

			case 39:
				$frogImg.attr('src', "img/frogright.gif");
				if($froggy.position().left > 1080){
					break;
				} else {
				$froggy.animate(
					{left: 40 + $froggy.position().left + "px"}, 10);
				}
				break;

			case 40:
				$frogImg.attr('src', "img/frogfront.gif");
				if($froggy.position().top > 575){
					break;
				} else {
				$froggy.animate(
					{top: 70 + $froggy.position().top + "px"}, 10);
				}
				break;
		} //end of switch cases
	} //end of if statement 
}); //end keydown handler
