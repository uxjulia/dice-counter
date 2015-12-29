/**
 * Main graph file
 * Created by Julia Nguyen on 12/28/15.
 */
(function($, window, document){
  'use strict';
  function logHistory(button) {
    var $el = $(button);
    var val = $el.text();
    var iden = $el.attr("id");
    var target = $("div#last-roll");
    var idx = function() {
      return $("span.history-text").length;
    };
    var setValue = function(val){
      var n;
      var obj = $("span.history-text");
      var l = obj.length;
      console.log("length: " + l);
      if (l > 0) {
        n = val + ", ";
      } else {
        n = val;
      }
      return n;
    };
    var p = $("<span/>",{
      text: setValue(val),
      "class": "history-text",
      id: idx
    });
    $(p).data("arrayId", {id: iden});
    console.log("data stored is: " + $(p).data("arrayId"));
    $(p).prependTo(target);
  }

  $(document).ready(function() {
    var data = {
      labels: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
          label: "1",
          fillColor: "rgba(114,166,202,0.2)",
          strokeColor: "rgba(114,166,202,.8)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [0,0,0,0,0,0,0,0,0,0,0]
        }
      ]
    };

    var ctx = $("#diceChart").get(0).getContext("2d");
    var lineChart = new Chart(ctx).Bar(data, {
      responsive: true,
      tooltipTemplate: "Total: <%= value %>"
    });

    var resetData = function() {
      console.log("resetting data");
      var bar = lineChart.datasets[0].bars;
      console.log(bar);
      $.each(bar, function(idx,el){
        el.value = 0;
      });
      lineChart.update();
    };
    var calcTotal = function(id) {
      var current = lineChart.datasets[0].bars[id].value;
      return current + 1;
    };

    var deleteOne = function(id){
      var current = lineChart.datasets[0].bars[id].value;
      lineChart.datasets[0].bars[id].value = current - 1;
      lineChart.update();
    };

    var logDiceRoll = function(button) {
      var $el = $(button);
      var id = $($el).attr("id");
      console.log("use array with index number: " + id);
      lineChart.datasets[0].bars[id].value = calcTotal(id);
      lineChart.update();
    };

    var numbers = $("button").not(".reset");

    $(numbers).on('click', function () {
      logDiceRoll(this);
      logHistory(this);
    });

    $("button#reset").on('click', function () {
      console.log("reset button clicked");
      resetData();
      $("div#last-roll").empty();
    });

    $("button#undo").on('click', function(){
      var target = $("span.history-text:first-child");
      var v = target.data("arrayId");
      var arrayid = $.map(v, function(idx, el) {
        return idx;
      });
      deleteOne(arrayid);
      target.remove();

    });

  });

})(jQuery);
