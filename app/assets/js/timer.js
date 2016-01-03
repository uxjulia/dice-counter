/**
 * Created by Julia Nguyen on 1/3/16.
 */
var myVar = setInterval(timer, 1000);
var selection = parseFloat($("select#timer").val());
var newTimer = selection * 1000;


function timer() {
  if (newTimer == 0){
  } else {
    var d = newTimer - 1;
    $(".timer").html(d);
    newTimer --;
  }
}