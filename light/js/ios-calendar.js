var calendarPicker = function() {

	var refById   = function(id) { return document.getElementById(id); },
		drawDate  = new Date(), cal = null;
	
	var overlay, container, mask, 
		btnNextMonth, btnPreMonth, btnPreYear, btnNextYear,
		divDateInfo;

	return {
		instance: cal, 
		textbox: null,
		bindToClass: 'calendar-picker',
		selectedDate: null,
		initialize: function(options) {
			Object.mix(this, options, true);
			calendarPicker.insertHTMLs();
			calendarPicker.initRef();
			calendarPicker.initEvents();
			calendarPicker.bind();
		},
		
		initRef: function() {				
			overlay      = refById('cal-overlay');
			mask         = refById("cal-mask");
			container    = refById('cal-wrap');
			btnNextMonth = refById('cal-next-month');
			btnPreMonth  = refById('cal-pre-month');
			btnPreYear   = refById('cal-pre-year');
			btnNextYear  = refById('cal-next-year');
			divDateInfo  = refById('cal-date-info');
			cal = new MonthlyCalendar({
				'container': container, 'displayDays': ['日','一','二','三','四','五','六'],
				'onchange': function(args) { 
					divDateInfo.innerHTML = cal.getCurrentDate().format(); 
				}
			});
		},
		
		initEvents: function() {
			btnNextYear.onclick  = function() { cal.drawNextYear();      };
			btnPreYear.onclick   = function() { cal.drawPreviousYear();  };
			btnNextMonth.onclick = function() { cal.drawNextMonth();     };
			btnPreMonth.onclick  = function() { cal.drawPreviousMonth(); };
			cal.on('select', function(args) {
				calendarPicker.textbox.value = args.date;
				divDateInfo.innerHTML = calendarPicker.selectedDate = args.date;
				calendarPicker.hide();
			});
			cal.on('drawing', function(args) {
				if (calendarPicker.selectedDate && calendarPicker.selectedDate==args.date.format()) {
					dom.addClass(args.cell, 'highlight');
				}
			});
		},
		
		insertHTMLs: function() {
			var htmls = '\
				<div id="cal-mask"></div>\
		  		<div id="cal-overlay">\
				  	<div id="calendar-op">\
				  		<a href="javascript:;" title="上一年" id="cal-pre-year">&lt;&lt;</a>&nbsp;&nbsp;&nbsp;&nbsp;\
				  		<a href="javascript:;" title="上一月" id="cal-pre-month">&lt;</a>&nbsp;&nbsp;&nbsp;&nbsp;\
				  		<span id="cal-date-info">loading...</span>&nbsp;&nbsp;&nbsp;&nbsp;\
				  		<a href="javascript:;" title="下一月" id="cal-next-month">&gt;</a>&nbsp;&nbsp;&nbsp;&nbsp;\
				  		<a href="javascript:;" title="下一年" id="cal-next-year">&gt;&gt;</a>\
				  	</div>\
					<div id="cal-wrap">loading...</div>\
				</div>';
			var css = '\
				#cal-mask { background:#000; opacity:0.7; width:100%; height:100%;left:0;top:0;position:absolute;display:none} \
				#cal-overlay { width:100%;bottom:0px;position:absolute;display:none;text-align:center; cursor:default;}\
				#cal-wrap table {-webkit-tap-highlight-color:rgba(255,255,255,0.5)}\
				#cal-wrap .calendar-header {background:#F8F8F8;}\
				#cal-wrap .calendar-day { color:#000;font-weight:bolder;height:25px;}\
				#cal-wrap .calendar-header .day-sunday,\
				#cal-wrap .calendar-header .day-saturday {color:#000;}\
				#cal-wrap table {border-collapse:collapse;width:100%;}\
				#cal-wrap .calendar-date {-webkit-tap-highlight-color:rgba(255,255,255,0.5);background:#fff;border-bottom:1px solid #ccc;padding:8px;color:#000;text-align:center;}\
				#cal-wrap .calendar-not-the-month {background:#fff;color:#ddd;}\
				#cal-wrap .calendar-today {background:#eee;}\
				#cal-wrap .highlight {background:#eee;}\
				#cal-wrap .calendar-hover {background:#eee;}\
				#cal-wrap .calendar-invalid {background:#FAEAC6;text-decoration: line-through;}\
				#calendar-op {color:#000;background:#eee;padding:8px;color:#000}\
				#calendar-op a {text-decoration:none;color:#000;}';
			var style = document.createElement('style');
			style.type = 'text/css';
			style.styleSheet ? style.styleSheet.cssText = css :
			style.appendChild(document.createTextNode(css));
			document.getElementsByTagName('head')[0].appendChild(style);
			var wrap = document.createElement('div');
			document.body.appendChild(wrap);
			wrap.innerHTML = htmls;
		},
		
		bind: function() {
			var nodes = dom.getElementsByClassName(calendarPicker.bindToClass);
			for (var i=0, l=nodes.length; i<l; i++) {
				$(nodes[i]).on('focus',(function(i) {
					return function() {
						var el = nodes[i];
						calendarPicker.setDate(el.value);
						el.blur();
						overlay.focus();
						
						var min = el.getAttribute('data-min-date'),
							max = el.getAttribute('data-max-date');
							
						min && (cal.minDate = parseDate(min));
						max && (cal.maxDate = parseDate(max));
						cal.draw(drawDate);
						calendarPicker.textbox = el;
						calendarPicker.show();
					}
				})(i));
				nodes[i].onblur = function(e) {};
			}
			var fn = function(e) {
				var target = eventH.target(e);
				if (dom.contains(overlay,target) || calendarPicker.textbox==target) return;
				calendarPicker.hide();
			};
			eventTargetH.on(document, 'click', fn);
			eventTargetH.on(document, 'keyup', fn);
		},
		
		show: function(el) {
			overlay.style.display = 'block'; 
			overlay.style.zIndex = '100';
			overlay.style.position = 'absolute';
			mask.style.display = 'block';
			mask.style.zIndex = '99';
		},
		
		hide: function() {
			overlay.style.display = 'none';
			mask.style.display = 'none';
		},
		
		setDate: function(date) {
			date = date || new Date();
			if (typeof date == 'string') {
				drawDate = parseDate(date);
				drawDate = (drawDate.toString()=='Invalid Date'||isNaN(drawDate) ? new Date() : drawDate);
			}  else { drawDate = date }
			return drawDate;
		}
	
	}
}();