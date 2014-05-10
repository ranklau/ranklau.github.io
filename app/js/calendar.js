/**
 * @fileoverview calendar.js
 * @author:{@link mailto:ranklau@gmail.com rank}
 * @last-modified : 2011-8-8
 */
(function () {


	/* Adapter����, �����Ŀ�����д˴���,���滻���� */

		eventH.target   = eventH.target;
		dom.contains    = dom.contains;
		dom.create      = dom.create;
		dom.outerHTML   = dom.outerHTML;
		classH.extend   = classH.extend;
		eventTargetH.on = eventTargetH.on;
		ce              = CustEvent;
		mix             = Object.mix;
		parseDate       = parseDate;
		formatDate      = formatDate;
		log             = log;
	
	/* Adpater������� */
	
	
	var Guid   = 0,
		calPrefix = 'icalendar-',
		now    = new Date();

	var _selectEvents = 'select', 						//ѡ�����ڵ��¼�
		_drawEvents   = 'beforedraw,drawing,afterdraw',	//��������ʱ���¼�,���������������
		_baseEvents   = 'cellin,cellout',			//��Ԫ���cellin/mouseout
		_changeEvents = 'change,outofdate',            //�����ı�ʱ�¼�
		_uiEvents     = 'beforeshow,show,aftershow,beforehide,hide,afterhide';
	
	/**
	 * @class VitualBaseCalendar ������,��������ʵ��
	 * @remarks
	 */
	function VitualBaseCalendar(options) {
		return this._initialize.apply(this, arguments);
	};

	Object.mix(VitualBaseCalendar.prototype, {
	
		/**
		 * @property װ�������õ�����
		 * @type {HTMLElement}
		 */
		container: null,
		
		/**
		 * @property ��ǰ�����ڶ���
		 * @type {Date}
		 */
		currentDate: new Date(),
		
		/**
		 * @property �������С����
		 * @type {Date}
		 */
		minDate: new Date(now.getFullYear()-2, now.getMonth(), now.getDate()),
		
		/**
		 * @property ������������
		 * @type {Date}
		 */
		maxDate: new Date(now.getFullYear()+2, now.getMonth(), now.getDate()),
		
		/**
		 * @property һ������ʵ����UID
		 * @type {Number}
		 */
		uid: null,
		
		/**
		 * @property ���һ�λ��Ƶ�����
		 * @type {Date}
		 */
		lastDrawDate: null,
		
		/**
		 * @property ���������Ƿ�Խ��
		 * @type {Boolean}
		 */
		isDateOutOfRange: false,
		
		/**
		 * @property ָʾ�Ƿ��Ѿ���ʼ���¼�
		 * @type {Boolean}
		 * @private
		 */
		_initEvents: false,
		

		_initialize: function(options) {
			Guid = Guid + 1;
			this.uid = Guid;
			Object.mix(this, options||{}, true);

			ce.createEvents(this, _selectEvents);
			ce.createEvents(this, _drawEvents);
			ce.createEvents(this, _baseEvents);
			ce.createEvents(this, _changeEvents);
			ce.createEvents(this, _uiEvents);
		
			//��ʹ�����Լ�ʵ��dispose���Լ�����
			
			return this;
		},
		
		dispose: function() {},

		/**
		 * �õ���ǰ��Date���ڶ���
		 * @return {Date} ���ص�ǰ�����ڶ���
		 */
		getCurrentDate: function() {
			return this.currentDate;
		},
		
		/**
		 * ���õ�ǰ����������
		 * @param {Date} Ҫ���õ����ڶ���
		 * @return {Date} ���ص�ǰ�����ڶ���
		 */
		setCurrentDate: function(oDate) {
			//TODO instanceof Date
			if (!oDate) {
				throw new Error(['Calendar', 'setCurrentDate', 'setCurrentDate arguments oDate is not a Date type']);
			}
			this.currentDate = oDate;
		},
		
		/**
		 * ��������������
		 * @param {HTMLElement} ������HTMLElement
		 * @return void
		 */
		setContainer: function(container) {
			//TODO isHTMLELement
			if (!container) {
				throw new Error(['Calendar', 'setContainer', 'setContainer arguments container is not a HTMLELement']);
			}
			this.container = container;
		},

		/**
		 * ��ʽ������
		 * @param {Date} d ���ڶ���
		 * @param {String} pattner ��ʽ���ַ���
		 * @return {String} ������pattern��ʽ����������ַ���
		 * @remark DateH��Ҳ��format����,cp�������ﱸ����
		 */
		formatDate: function(d, pattern) {
	       return formatDate.apply(this, arguments);
		},
		
		parseDate: function(source) {
		    return parseDate.apply(this, arguments);
		}

	});
	


	/**
	 * @class MonthlyCalendar �̳в�ʵ���˽ӿڵ�������
	 * @remarks
	 */
	var MonthlyCalendar = classH.extend(function() {
		arguments.callee.$super.apply(this, arguments);
		return this._init.apply(this, arguments);
	}, VitualBaseCalendar, false);

	mix(MonthlyCalendar.prototype, {
	
		/**
		 * @property ��ģʽ�ı�ͷ��ʼ�����ڼ�,�μ�displayDays���Ե������Զ�Ӧ�±�
		 * @seealso {displayDays}
		 * @type {Number}
		 */
		initDayIndex: 0,
		
		/**
		 * @property ����Ϊģʽչʾ����������
		 * @type {Number}
		 */
		displayRows: 5,
		
		/**
		 * @property ����չʾ�·ݵ��ı�
		 * @type {Array}
		 */
		displayMonths: ['һ��','����','����','����','����','����','����','����','����','ʮ��','ʮһ��','ʮ����'],
		
		/**
		 * @property ����չʾ���ڵ��ı�
		 * @type {Array}
		 */
		displayDays: ['����','��һ','�ܶ�','����','����','����','����'],
		

		/**
		 * @property ���Ƶ�ǰչ�ֵĵ�һ�������
		 * @type {Boolean}
		 */
		startDate: null,
		
		/**
		 * @property ���Ʊ��µ����һ������
		 * @type {Boolean}
		 */
		endDate: null,
		
		/**
		 * @property �Զ��趨����,displayRowsΪ5����6
		 * @type {Boolean}
		 */
		autoRows: true,

		/**
		 * @property �Ƿ���ʾ��ͷ
		 * @type {Boolean}
		 */
		displayHeader: true,
		
		/**
		 * @property ������className��ʽ��
		 * @type {String}
		 */
		baseClass: 'calendar-base-class',
		
		/**
		 * @property ��ʽ��
		 * @type {JSON}
		 */
		className: {
			days:  ['day-sunday calendar-day', 
					'day-monday calendar-day', 
					'day-tuesday calendar-day', 
					'day-wednesday calendar-day', 
					'day-thursday calendar-day', 
					'day-friday calendar-day', 
					'day-saturday calendar-day'],

			dates: ['date-sunday calendar-date', 
					'date-monday calendar-date', 
					'date-tuesday calendar-date', 
					'date-wednesday calendar-date', 
					'date-thursday calendar-date', 
					'date-friday calendar-date', 
					'date-saturday calendar-date'],
			header     : 'calendar-header',
			today      : 'calendar-today',
			invalid    : 'calendar-invalid',
			notTheMonth: 'calendar-not-the-month',
			hover      : 'calendar-hover'
		},
		
		/**
		 * @property �����ĵ�һ��λ��
		 * @readonly
		 * @type {Number}
		 */
		firstDayOffset: 1,
		
		_init: function() {
			var self = this;
			self.on('drawing', function(args) {
				var cell    = args.cell, 
					oDate   = args.date, 
					current = self.getCurrentDate();
					
				if (oDate.getMonth()!=current.getMonth()) { 
					dom.addClass(cell, self.className.notTheMonth);
				}
				if (oDate.format()==new Date().format()) {
					dom.addClass(cell, self.className.today);
				}
				if (self.checkDateOutOfRange(oDate)) {
					dom.addClass(cell, self.className.invalid);
				}
			});
			
			self.on('cellin', function(args) {
				dom.addClass(args.cell, self.className.hover);
			});
			
			self.on('cellout', function(args) {
				dom.removeClass(args.cell, self.className.hover);
			});
			
		},
	
		/**
		 * ��ÿ������ʵ����һ��ί���¼�
		 * ����ѡ������,mouseover,mouseout��
		 * @return void
		 */
		bindEvents: function() {
		
			if (this._initEvents) return;
			
			var self        = this,
				container   = this.container,
				lastCell    = null;
			
			//��˷�ҵ���Ԫ��
			var getDateCell = function(el) {
				if (el && el.getAttribute && el.getAttribute('data-icalendar')) {
					return el;
				}
				while (el = el.parentNode) {
					if (el && el.getAttribute && el.getAttribute('data-icalendar')) {
						return el;
					}
				}
				return null;
			};
			
			eventTargetH.on(container, 'click', function(e) {
				var target = eventH.target(e), data, arg;
				
				//��ҪΪÿ��ʵ�������Լ���select�¼�
				if (target && dom.contains(container, target)) {
					target = getDateCell(target);
					
					//������target��Ӧ�ó���null,�������null��˵��data-icalendar�����Դ���ʱ������
					data = target.getAttribute('data-icalendar'),
					arg  = { 'cell': target, 'date': data };
					
					self.fire('select', arg);
				}
			});
			
			//mouseoverί��,ί����calendar��table��
			//�Լ�ʵ��һ��mouseout��mouseover���Զ����¼�
			eventTargetH.on(container, 'mouseover', function(e) {
				
				var target = eventH.target(e),
					mouseoverArgs, mouseoutArgs, data;
				
				//��ȡ��Ԫ��
				target = getDateCell(target);
				
				//��ǰ��Ԫ�� ���� ���һ�ε�Ԫ�� ���˳�
				if (target==lastCell) {
					return;
				}
				
				if (target && dom.contains(container, target)) {
					
					data          = target.getAttribute('data-icalendar');
					mouseoverArgs = { 'cell': target, 'date': data };

					self.fire('cellin', mouseoverArgs);
					
					if (lastCell) {
						mouseoutArgs = { 'cell': lastCell, 
										 'date': lastCell.getAttribute('data-icalendar') };
						self.fire('cellout', mouseoutArgs);
					}
					
					lastCell = target;
					
				}
				
			});
			
			eventTargetH.on(container, 'mouseleave', function(e) {
				if (lastCell) {
					mouseoutArgs = { 'cell': lastCell, 
									 'date': lastCell.getAttribute('data-icalendar') };
					self.fire('cellout', mouseoutArgs);
					lastCell = null;
				}
			});
			
			this._initEvents = true;
		},
		
		/**
		 * ��������Ƿ������������minDate��maxDate��Χ֮��
		 * @param {Date} Ҫ��������
		 * @return {Boolean} ���û��Խ�緵��false,���򷵻�true
		 * @remark �жϵķ����Ƚϼ�,format�ɸ�����(����з��Ӻ���Ļ�),���жϴ�С����
		 */
		checkDateOutOfRange: function(oDate) {
			oDate = oDate || this.currentDate;
			if (Object.prototype.toString.call(oDate)!='[object Date]') {
				throw new Error(['Calendar', 'checkDateOutOfRange', 'checkDateOutOfRange arguments oDate[' +oDate+ '] is not Date instance.']);
			}
			
			var result  = false,
				tmpDate = parseFloat(oDate.format('yyyyMMdd'),10),
				maxDate = parseFloat(this.maxDate.format('yyyyMMdd'),10),
				minDate = parseFloat(this.minDate.format('yyyyMMdd'),10);
				
			if (tmpDate > maxDate || tmpDate < minDate) { 
				result = true; 
			}
			
			//log('isDateOutOfRange: ' +result+ ', maxDate is:' +maxDate);
			this.isDateOutOfRange = result;
			return result;
		
		},
	
		/**
		 * ��ģʽ����һ��һ�ܵı�ͷ
		 * @param void 
		 * @return {String} ������table���ɵ�HTML��
		 */
		buildHeader: function(table) {
			var cols         = this.displayDays.length,
				className    = this.className.days,
				dispName     = this.displayDays,
				initDayIndex = this.initDayIndex;
			
			var	tr     = table.insertRow(table.rows.length),
				th;
			
			tr.className = this.className.header;
			
			for (var i=0; i<cols; i++) {
				var dayIndex = (i + initDayIndex) % cols;
				
				th = document.createElement('th');
				tr.appendChild(th);
				th.className = className[dayIndex];
				th.innerHTML = dispName[dayIndex];
			}
			//��һ����δ�����Ʊ�ͷ���¼�, drawhead
			return table;
		},
		
		fixedDisplayRows: function() {
			this.displayRows = parseInt(this.displayRows, 10);
			if (this.autoRows) {
				this.setAutoDisplayRows();
			}
		},
		
		/**
		 * ����һ������ģʽ����������
		 * @param {Date} oDate �Դ����ڶ�����һ����������
		 * @return {String} ������table���ɵ�HTML��
		 */
		buildBody: function(oDate) {
		
			oDate = oDate || this.currentDate;
			
			var header = '<table cellpadding="0" cellspacing="0" class="' +this.baseClass+ '" id="' +calPrefix+this.uid+ '"><tbody>',
				footer = '</tbody></table>',
				table, tr, td;
			
			var self      = this;
			    cols      = this.displayDays.length,
				rows      = this.displayRows,
				className = this.className.dates;
			
			var year  = oDate.getFullYear(),
				month = oDate.getMonth(),
				date  = oDate.getDate(),
				day   = oDate.getDay();
			
			//������˼��������,������ʾ
			//��new Date(year, month, date), date����Ϊ����
			//������ʾ��������һ����, ����ӿڱȽϸ���.
			var startDate = (-this.firstDayOffset)+1;
			
			//������ʱ����, ÿ��td��Ԫ����Զ�����������
			var tmpDate = null, 
				tmpData = null,
				tmpDayIndex  = null,
				tmpClassName = null,
				args;
			
			
			//dom.create��������bug��,���ܴ���tr,td�ȷ�displayΪblock/inline��Ԫ��
			//td��display����ΪdisplayCell
			//TODO ������Dom.create
			table = dom.create(header+footer);
			if (this.displayHeader) this.buildHeader(table);
			
			this.startDate = new Date(year, month, startDate);
			
			for (var i=0, len=rows*cols; i<len; i++) {
			
				if (0 == i%cols) {
					tr = table.insertRow(table.rows.length);
				}
				
				tmpDate = new Date(year, month, startDate+i);
				tmpData = this.formatDate(tmpDate);
				tmpDayIndex = (tmpDate.getDay() + this.initDayIndex) % cols;
				tmpClassName = className[tmpDayIndex];
				
				td = tr.insertCell(tr.cells.length);
				td.className = tmpClassName;
				td.innerHTML = tmpDate.getDate();
				td.setAttribute('data-icalendar', tmpData);

				args = { 'cell': td, 'date': tmpDate };
				this.fire('drawing', args);
			}
			
			this.endDate = tmpDate;

			return table;
		},
		
		/**
		 * �Զ���������������
		 * @param {Date} oDate �Դ����ڶ�����һ����������
		 * @return {Number} ��������5�л�����6������ʾ����
		 */
		setAutoDisplayRows: function(oDate) {
			log('setAutoDisplayRows');
			oDate = oDate || this.currentDate;
			var month  = oDate.getMonth(),
				year   = oDate.getFullYear(),
				displayRows = 5;
				
			//�������Ҫ5�л���6�л���ʾ����
			//��� ��һ���λ��+����µ������� > ��Ԫ������� ����ʾ6��
			//������ʾ5��
			var totalDisplayCells = 7*this.displayRows;
			
			//��ǰdrawDate�������������
			var theMonthDays = new Date(year, month+1, 0).getDate();
			
			//ƫ����
			var firstDayOffset = this.getDateFirstDayOffset(oDate);
	
			if ((firstDayOffset + theMonthDays) > totalDisplayCells) {
				displayRows = 6;
			} else {
				displayRows = 5;
			}
			
			return this.displayRows = displayRows;
		},
		
		/**
		 * �õ�һ����������ƫ����
		 * @param {Date} oDate Ҫ���Ƶ�����
		 * @return Number
		 */
		getDateFirstDayOffset: function(oDate) {
			oDate = oDate || this.getCurrentDate();
			var cols = this.displayDays.length,
				rows = this.displayRows;
				
			var year  = oDate.getFullYear(),
				month = oDate.getMonth(),
				date  = oDate.getDate(),
				day   = oDate.getDay();
			
			//�����ǰ1�����ڼ�
			var firstDay = new Date(year, month, 1).getDay();
			
			//���1�����������г��ֵ�λ��,���Ҹ��ݴ�λ�����Ҫ��ǰ���˼���.
			var firstDayOffset = (firstDay+cols-this.initDayIndex) % cols;
			
			return firstDayOffset;
		},
		
		getStartDate: function(oDate) {
			oDate = oDate || this.getCurrentDate();
			var firstDayOffset = this.getDateFirstDayOffset(oDate),
				startDate      = (-this.firstDayOffset)+1;
			return new Date(oDate.getFullYear(), oDate.getMonth(), startDate);
		},
		
		getEndDate: function(oDate) {
			oDate = oDate || this.getCurrentDate();
			var firstDayOffset = this.getDateFirstDayOffset(oDate),
				cols = this.displayDays.length,
				rows = this.displayRows,
				startDate = (-this.firstDayOffset)+1;
			return new Date(oDate.getFullYear(), oDate.getMonth(), startDate + cols * rows);
		},
		
		/**
		 * ���������Ƶ�ĳ����������
		 * @param {Date} oDate Ҫ���Ƶ�����
		 * @seealso {drawDate}
		 * @return void
		 */
		draw: function() {
			return this.drawDate.apply(this,arguments);
		},
		
		/**
		 * ���������Ƶ�ĳ����������
		 * @param {Date} oDate Ҫ���Ƶ�����
		 * @return void
		 */
		drawDate: function(oDate) {
			oDate = oDate || this.getCurrentDate();
			this.setCurrentDate(oDate);
			this.fixedDisplayRows();
			
			if (this.checkDateOutOfRange(oDate)===true) {
				this.fire('outofdate', {date: oDate, 
										minDate: this.minDate,
										maxDate: this.maxDate});
				//return;
			}
			
			var afterDrawArgs = beforeDrawArgs = { 'cell': null, 'date': oDate }, 
				firstDayOffset;
			
			this.firstDayOffset = this.getDateFirstDayOffset(oDate);
			log('[logging] firstDayOffset is '+ this.firstDayOffset);
			
			this.fire('beforedraw', beforeDrawArgs);
			this.container.innerHTML = this.build(oDate);
			this.bindEvents();
			
			if (oDate && this.lastDrawDate!=oDate) {
				this.fire('change', { 'currentDate': oDate, 
									'lastDate': this.lastDrawDate });
				this.lastDrawDate = oDate;
			}
			
			this.fire('afterdraw', afterDrawArgs);
			return this;

		},
		
		
		
		getCellByDate: function(oDate) {
			
		},

		/**
		 * ͨ����ʾģʽ�ü򵥹�������һ������
		 * @param {Date} oDate ��Ҫ������һ����������
		 * @return {String} ������table���ɵ�HTML��
		 */
		build: function(oDate) {
			//ΪʲôҪת��html,ֻ��Ϊ�˼���draw�ﶼ����string������
			//��Ȼ��dom������΢��Щ,��Ҳ���ܽ���,��Ϊ������һ��ҳ�������ֻ���ּ���ʵ��
			var htmls = dom.outerHTML(this.buildBody(oDate));
			return htmls;
		},
		
		/**
		 * ����һ����������Ƶ�ĳ����������
		 * @return void
		 */
		drawPreviousYear: function(){
			var newDate = this.getPreviousYear();
			this.drawDate(newDate);
		},

		/**
		 * ������һ�������Object
		 * @return {Date}
		 */
		getPreviousYear: function(oDate) {
			var oDate = oDate || this.getCurrentDate(),
				year  = oDate.getFullYear(),
				month = oDate.getMonth(),
				date  = oDate.getDate();
			return new Date(year-1, month, date);
		},

		/**
		 * ������һ�������Object
		 * @return {Date}
		 */
		getNextYear: function(oDate) {
			var oDate = oDate || this.getCurrentDate(),
				year  = oDate.getFullYear(),
				month = oDate.getMonth(),
				date  = oDate.getDate();
			return new Date(year+1, month, date);
		},
		
		/**
		 * ������һ�µ�����Object
		 * @return {Date}
		 */
		getPreviousMonth: function(oDate) {
			var oDate = oDate || this.getCurrentDate(),
				year  = oDate.getFullYear(),
				month = oDate.getMonth(),
				date  = oDate.getDate();
			return new Date(year, month-1, date);
		},
		
		/**
		 * ������һ�µ�����Object
		 * @return {Date}
		 */
		getNextMonth: function(oDate) {
			var oDate = oDate || this.getCurrentDate(),
				year  = oDate.getFullYear(),
				month = oDate.getMonth(),
				date  = oDate.getDate();
			return new Date(year, month+1, date);
		},
		
		/**
		 * ����һ����������Ƶ�ĳ����������
		 * @return void
		 */
		drawNextYear: function(){
			var newDate = this.getNextYear();
			this.drawDate(newDate);
		},
		
		/**
		 * ���ϸ��µ��������Ƶ�ĳ����������
		 * @return void
		 */
		drawPreviousMonth: function(){
			var newDate = this.getPreviousMonth();
			this.drawDate(newDate);
		},
		
		/**
		 * ���¸����������Ƶ�ĳ����������
		 * @return void
		 */
		drawNextMonth: function(){
			var newDate = this.getNextMonth();
			this.drawDate(newDate);
		},
		
		/**
		 * �������������Ƶ�ĳ����������
		 * @return void
		 */
		drawToday: function() {
			this.drawDate(new Date());
		},
		
		/**
		 * ��ʾ����
		 * ��׼�ؼ��ӿ�
		 * @return void
		 */
		show: function() {
			this.fire('show');
			this.container.style.display = 'block';
		},
		
		/**
		 * ��������
		 * ��׼�ؼ��ӿ�
		 * @return void
		 */
		hide: function() {
			this.fire('hide');
			this.container.style.display = 'none';
		}
	
	});
	
	
	//attach to window host
	window.VitualBaseCalendar = VitualBaseCalendar;
	window.MonthlyCalendar = MonthlyCalendar;

})();
