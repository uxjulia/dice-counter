/**
 * Created by Julia on 12/28/15.
 */
(function($, window, document){
  'use strict';
  $(document).ready(function() {
    var arrayObj = {
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0
    };
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
    var myNewChart = new Chart(ctx);
    var lineChart = new Chart(ctx).Bar(data);
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.tooltipTemplate = "Total: <%= value %>";

    var calcTotal = function(id) {
      var current = lineChart.datasets[0].bars[id].value;
      return current + 1;
    };

    var logDiceRoll = function(button) {
      var $el = $(button);
      var id = $($el).attr("id");
      console.log("use array with index number: " + id);
      lineChart.datasets[0].bars[id].value = calcTotal(id);
      lineChart.update();
    };
    var resetData = function() {
      var bar = lineChart.datasets[0].bars;
      $.each(bar, function(idx,el){
        el.value = 0;
      });
    };

    var numbers = $("button").not(".reset");

    $(numbers).on('click', function () {
      logDiceRoll(this);
    });

    $("button#reset").on('click', function () {
      console.log("reset button clicked");
      resetData();
    });



  });

})(jQuery);
