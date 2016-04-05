"use strict";

//set the new window's size to be fixed (not resizeable by user).
var windowSize = ["1215", "775"];
$(window).resize(function(){
   window.resizeTo(windowSize[0],windowSize[1]);
});
if(window.width != "1215" || window.height != "775"){
	window.resizeTo(windowSize[0],windowSize[1]);
}

function GameBoard(){
	this.speed = 10;
	this.fps = 35;
	this.elementsRight = [$("#bottom-car1"), $("#bottom-car2"), $("#upper-car1"), 
					$("#upper-car2"),  $("#bottom-log1"), $("#bottom-log2"), 
					$("#bottom-log3"), $("#top-log1"), $("#top-log2")];
	this.elementsLeft = [$("#middle-car1"), $("#middle-car2"), $("#middle-car3"), 
					$("#top-car1"), $("#top-car2"), $("#top-car3"), $("#plant1"),
					$("#plant2"), $("#plant3")];
}

//Sets animation for cars, logs and plants to run continously.
GameBoard.prototype.animateElements = function(){
	var index; var left; var top;
	if(game.playing){
		for(index = 0; index < this.elementsLeft.length; index++){
			left = this.elementsLeft[index].position().left;
			top = this.elementsLeft[index].position().top;

			if(left < -200){
				this.elementsLeft[index].css("left", "1250px");
			} else {
				this.elementsLeft[index].animate(
					{left: -this.fps + left + "px"}, this.speed);
			}
		}//end for-loop 

		for(index = 0; index < this.elementsRight.length; index++){
			left = this.elementsRight[index].position().left;
			top = this.elementsRight[index].position().top;
			if(left > 1150){
				this.elementsRight[index].css("left", "-100px");
			}else{
				this.elementsRight[index].animate(
					{left: this.fps + left + "px"}, this.speed);
			}
		}//end for-lopp

		if(game.lost()){
			game.lostScreen();
		}		
	}//end if statement
} // end of animateElements function