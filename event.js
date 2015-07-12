$(document).ready(function() {

	$('#calendar').fullCalendar({

		eventAfterAllRender: function(view) {

			var start = moment(view.start).format("YYYY-MM-DD");
            setSchedule(start);
        }
	});


	$(document).bind("addShiftBtn", function(event, action) {

		var target = event.target;

		$(target).parent().find("i.js-add").css("display", "block");




	});

	function setSchedule(date) {

		$.ajax({
			type: "get",
			url: "json/events.json",
			dataType: "json"
		})
		.done(function(data) {

			renderEvent(data);
		})
		.fail(function(data) {
			alert("失败回调！");
		});
	}

	function renderEvent(data) {

		var dayNumber = data[0].start,
		    dayShifts = data[0].shifts,
		    html = '';

        

		var $td = $("td[data-date=" + dayNumber + "] .fc-day-content");
		
        var firstShift = "<li class = 'shift-person'>" + dayShifts[0] + '<i class="js-remove">✖</i>' + "</li>";
        var secondShift = "<li class = 'shift-person'>" + dayShifts[1] + '<i class="js-remove">✖</i>' + "</li>";
        var thirdShift = "<li class = 'shift-person'>" + dayShifts[2] + '<i class="js-remove">✖</i>' + "</li>";

		html = '<div class="first shift">' +
					'<span>1</span>' +
					'<ul>' + firstShift + '</ul>' +
					'<i class="js-add" data-toggle="modal">+</i>' +
					'</div>' +
					'<div class="second shift">' +
					'<span>2</span>' +
					'<ul>' + secondShift + '</ul>' +
					'<i class="js-add" data-toggle="modal" >+</i>' +
					'</div>' +
					'<div class="third shift">' +
					'<span>3</span>' +
					'<ul>' + thirdShift + '</ul>' +
					'<i class="js-add" data-toggle="modal">+</i>' +
					'</div>';

		$td.append(html);


		$td.find('ul').each(function(i, el) {

			$(el).sortable({

				filter: '.js-remove',
				onFilter: function (evt) {

					var itemEl = evt.item;

					itemEl.parentNode.removeChild(evt.item);
					$(el).trigger("addShiftBtn", "show");



    			}
    		});
    	});
	}
});