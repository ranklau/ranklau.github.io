/**
 * 计算公式
 * http://zhidao.baidu.com/question/146616961.html
 */

var calInstance;

var STATUS_Y = 'y';
var STATUS_G = 'g';
var STATUS_R = 'r';

Date.prototype.range = function(start, end) {

	var form       = 'yyyyMMdd',
		selfstamp  = parseInt(this.format(form),  10),
		startstamp = parseInt(start.format(form), 10),
		endstamp   = parseInt(end.format(form),   10);

	if (selfstamp  >= startstamp && 
		endstamp   >= selfstamp) {
		return true;
	}

	return false;
}

Date.prototype.diffDay = function(end) {

	var startstamp = this.valueOf(),
		endstamp   = end.valueOf(),
		daystamp   = 60*60*1000*24,
		diffDay    = 1;

	if (startstamp < endstamp) {
		diffDay = (endstamp-startstamp)/daystamp;
	} else {
		diffDay = (startstamp-endstamp)/daystamp;
	}

	return parseInt(diffDay, 10);
}


var Data = {

	startdate: null,
	circle: 0,
	days: 0,
	yiji: {
		g: {},
		r: {},
		y: {}
	},
	initCallback: function(){},

	getFormData: function(startdate, circle, days) {
		this.startdate = startdate || parseDate($('#startdate').val()),
		this.circle    = circle    || parseInt($('#circle').val(), 10),
		this.days      = days      || parseInt($('#days').val(),   10)-1;
	},

	init: function(startdate, circle, days) {
		Data.getFormData(startdate, circle, days);
		Data.fetch();
	},

	fetch: function() {
		var counter = 0;

		$.ajax({
			url: 'data/yiji/yiji_anquanqi.json',
			success: function(data) {
				var data = eval('('+data+')')
				Data.yiji.g = data;
				counter++;

				$.ajax({
					url: 'data/yiji/yiji_jingqi.json',
					success: function(data) {
						var data = eval('('+data+')')
						Data.yiji.r = data;
						counter++;

						$.ajax({
							url: 'data/yiji/yiji_pailuanqi.json',
							success: function(data) {
								var data = eval('('+data+')')
								Data.yiji.y = data;
								counter++;
								Data.initCallback && Data.initCallback();
							}
						});
					}
				});
			}
		});
	},

	set: function(startdate, circle, days) {
		if (startdate) Data.startdate = startdate;
	},

	get: function() {
		return {
			startdate: Data.startdate,
			circle: Data.circle,
			days: Data.days,
			yiji: Data.yiji
		}
	},

	check: function() {

		var startdate = this.startdate,
			circle    = this.circle,
			days      = this.days;

		if (!startdate || startdate=='Invalid Date') {
			alert('请输入第一次来月经的时间');
			return false;
		}

		if (1 >= circle) {
			alert('请正确填写「月经周期」，必须 >= 1')
			return false;
		}

		if (1 >= days) {
			alert('请正确填写「行经天数」，必须 >= 1')
		}

		return true;
	}
};



var UI = (function() {

	var mapIndicator = {
		'r': '月经期',
		'y': '排卵期',
		'g': '安全期'
	};

	var mapMessage = {
		'r': '请注意休息～',
		'y': '受孕的可能性较大～',
		'g': '受孕机率较小～'
	};

	var mapIndex = {
		'r': ['one-star', 'one-star', 'one-star', 'two-star'],
		'y': ['five-star', 'four-star', 'five-star', 'three-star'],
		'g': ['one-star', 'two-star', 'three-star', 'four-star']
	};



	return {


		messages: {

			pregnant: {
				title: '受孕指数',
				digest: '女性在排卵期的性欲会特别旺盛，这是女性希望怀孕的身体信号达到最高值的体现。',
				url: 'docs/备孕小贴士.html'
			},

			'lose-weight': {
				title: '减肥指数',
				digest: '如果没有时间去健身房，可以选择跳绳作为减肥方式，每天早晚跳 200 下甚至更多，减肥效果非常明显。',
				url: 'docs/减肥小贴士.html'
			},

			beauty: {
				title: '美肌指数',
				digest: '宜选用一些清爽的化妆水，其他护肤品最好也不要选油性太强的。',
				url: 'docs/美肌小贴士.html'
			},

			body: {
				title: '身体指数',
				digest: '胃口大开是完全正常的现象，身体储存能量，为可能的受孕做好准备。最好的对策是多吃水果和喝茶，它们都能很好地抑制食欲。',
				url: 'docs/养生小贴士.html'
			}
		},

		data: null,

		init: function(data) {
			this.setData(data);
		},

		setData: function(data) {
			if (data) this.data = data;
		},

		updateDate: function(date) {
			date = parseDate(date);
			$('.selected-date').text(date.format('yyyy-MM-dd'));
		},

		updateMonth: function(date) {
			date = parseDate(date);
			$('.selected-month').text(date.format('yyyy 年 MM 月'));
		},

		pageinfoInit: function() {
			['pregnant', 'lose-weight', 'beauty', 'body'].forEach(function(item, i) {
				$('#info .' +item).on('click', function(){
					//UI.showinfoframe(item);
					var star = $('#info .' +item+ ' b').attr('class').replace('star-rating', '').trim();
					location.href = item +'.html?type=' +item+ '&star='+star;
				});
			});

			$('#infoframe .back').on('click', function(){
				pageFrame.pop();
			});
		},

		showinfoframe: function(type) {
			var item = UI.messages[type];
			$('#infoframe h1').text(item.title);
			$('#infoframe .digest').text(item.digest);
			$('#infoframe iframe').attr('src', item.url);
			var $mainframe = $('#mainframe');
			var $infoframe = $('#infoframe');
			pageFrame.push($infoframe, $mainframe);
		},

		updateMessage: function(date) {

			var st     = Utility.getCurrentStaus(parseDate(date)),
				color  = st.status,
				offset = st.offset;

			$('.status').text(mapIndicator[color]);
			$('#info .msg').text(mapMessage[color]);

			var className = mapIndex[color];
			$('#info .star-rating').each(function(i, item) {
				$(item).removeClass();
				$(item).addClass('star-rating '+className[i]);
			});

			var good = UI.data.yiji[color].yi_list.splice(offset*3, 3),
				bad  = UI.data.yiji[color].ji_list.splice(offset*3, 3);

			$('#status .good .info').text(good.join('，'));
			$('#status .bad .info').text(bad.join('，'));
		}
	};

})();


var Utility = (function() {

	var MENSES_RANGE = 14;

	return {


		switchMonth: function(monthOffset, startdate, circle) {

			var newDate    = new Date(startdate.getFullYear(),
									startdate.getMonth() + monthOffset,
									startdate.getDate());

			var start = new Date(newDate.getFullYear(), newDate.getMonth(), 1), 
				end   = new Date(newDate.getFullYear(), newDate.getMonth()+1, -1);
			
			var targetDate, 
				count = 1;

			do {
				targetDate = new Date(startdate.getFullYear(), 
									startdate.getMonth(),
									startdate.getDate() + count * circle);
				if (monthOffset > 0 ) count++;
				else count--;
			} while (!targetDate.range(start, end));

			return targetDate;
		},

		getCurrentStaus: function(oDate) {

			var startdate = Data.get().startdate, 
				circle    = Data.get().circle, 
				days      = Data.get().days;

			var pd, nd;
			var mps, mpe, mns, mne;
			var year  = startdate.getFullYear(), 
				month = startdate.getMonth(), 
				date  = startdate.getDate();
			var offset = 1;

			oDate = parseDate(oDate);

			pd  = new Date(year, month, date - MENSES_RANGE);
			mps = new Date(pd.getFullYear(), pd.getMonth(), pd.getDate()-5);
			mpe = new Date(pd.getFullYear(), pd.getMonth(), pd.getDate()+4);

			nd  = new Date(year, month, date + circle - MENSES_RANGE);
			mns = new Date(nd.getFullYear(), nd.getMonth(), nd.getDate()-5);
			mne = new Date(nd.getFullYear(), nd.getMonth(), nd.getDate()+4);

			var color = STATUS_G;


			if (oDate.range(mps, mpe)) {
				color = STATUS_Y;
				offset = mps.diffDay(oDate);
			}
			if (oDate.range(mns, mne)) {
			 	color = STATUS_Y;
				offset = mns.diffDay(oDate);
			}


			if (oDate.range(new Date(year, month, date-circle),
							new Date(year, month, date-circle+days))) {
				color = STATUS_R;
				offset = oDate.diffDay(new Date(year, month, date-circle));
			}
			if (oDate.range(startdate, 
							new Date(year, month, date+days))) {
				color = STATUS_R;
				offset = oDate.diffDay(startdate);
			}
			if (oDate.range(new Date(year, month, date+circle),
							new Date(year, month, date+circle+days))) {
				color = STATUS_R;
				offset = oDate.diffDay(new Date(year, month, date+circle));
			}



			//console.log(offset);

			return {
				status: color,
				offset: offset
			}
		}
	}

})();



function query() {


	if (!Data.check()) return false;
	UI.init(Data);


	calInstance.onselect = (function() {

		var last      = null, 
			className = 'selected';

		return function(args) {

			if ($(args.cell).hasClass('calendar-not-the-month')) {
				return false;
			}

			$(args.cell).addClass(className);
			$(last).removeClass(className);
			last = args.cell;

			UI.updateDate(args.date);
			UI.updateMessage(args.date);


		}
	})();


	calInstance.ondrawing = function(args) {

		var cell  = args.cell,
			oDate = args.date,
			st = Utility.getCurrentStaus(oDate),
			color = st.status,
			offset = st.offset;

		

		if (new Date().format()==oDate.format()) {
			UI.updateDate(calInstance.getCurrentDate());
			UI.updateMessage(new Date());
		}

		UI.updateMonth(calInstance.getCurrentDate());

		if (oDate.getMonth()==this.getCurrentDate().getMonth()) { 
			var strBuilder = [];
			strBuilder.push('<div class="top"></div>');
			strBuilder.push(oDate.getDate());
			strBuilder.push('<div class="bottom '+color+'"></div>');
			cell.innerHTML = strBuilder.join('');
		}
	}

	console.log('draw',Data.get().startdate)
	calInstance.draw(Data.get().startdate);
}



function initCalender() {

	var box     = document.getElementById('cal'),
		minDate = parseDate(box.getAttribute('data-min-date')),
		maxDate = parseDate(box.getAttribute('data-max-date')),
		refById = function(id) {return document.getElementById(id);};

	calInstance = new MonthlyCalendar({
		'container'   : box, 
		'autoRows'    : true,
		'displayRows' : 5,
		'minDate'     : minDate, 
		'maxDate'     : maxDate,
		'displayDays' : ['周日','周一','周二','周三','周四','周五','周六']
	});
};

function calPrev() {

	var startdate = calInstance.getCurrentDate(),
		circle    = Data.get().circle,
		oDate     = Utility.switchMonth(-1, startdate, circle);

	Data.set(oDate);
	calInstance.setCurrentDate(oDate);
	query();
}

function calNext() {

	var startdate = calInstance.getCurrentDate(),
		circle    = Data.get().circle,
		oDate     = Utility.switchMonth(+1, startdate, circle);

	Data.set(oDate);
	calInstance.setCurrentDate(oDate);
	query();
}

$(function() {

	Data.initCallback = function() {
		$('#startdate').val(new Date().format());
		Data.getFormData();
		initCalender();
		query();
		
		$('#query').tap(function() {
			Data.getFormData();
			query();
		});

		$('#cal-prev').on('click', calPrev);
		$('#cal-next').on('click', calNext);

		UI.pageinfoInit();
	};

	Data.init();
	
	if(!Modernizr.inputtypes.date){
		calendarPicker.initialize();
	};
	


});
