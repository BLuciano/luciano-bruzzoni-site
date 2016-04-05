var width = window.screen.width;
var height = window.screen.height;

if(width < 1200 || height < 700){
	$("#play-button a").addClass("disabled");
	$("#play-button p").html("Sorry! This game is for desktops only");

}