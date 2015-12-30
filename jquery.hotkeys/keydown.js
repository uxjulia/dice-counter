$(document).bind('keydown', '2', press2);
$(document).bind('keydown', '3', press3);
$(document).bind('keydown', '4', press4);
$(document).bind('keydown', '5', press5);
$(document).bind('keydown', '6', press6);
$(document).bind('keydown', '7', press7);
$(document).bind('keydown', '8', press8);
$(document).bind('keydown', '9', press9);
$(document).bind('keydown', '1+0', press10);
$(document).bind('keydown', '1+1', press11);
$(document).bind('keydown', '1+2', press12);

function press2(){
  $("button#0").trigger('click');
}
function press3(){
  $("button#1").trigger('click');
}
function press4(){
  $("button#2").trigger('click');
}
function press5(){
  $("button#3").trigger('click');
}
function press6(){
  $("button#4").trigger('click');
}
function press7(){
  $("button#5").trigger('click');
}
function press8(){
  $("button#6").trigger('click');
}
function press9(){
  $("button#7").trigger('click');
}
function press10(){
  $("button#8").trigger('click');
}
function press11(){
  $("button#9").trigger('click');
}
function press12(){
  $("button#10").trigger('click');
}

