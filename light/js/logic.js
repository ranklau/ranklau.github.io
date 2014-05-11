function query(){return Data.check()?(UI.init(Data),calInstance.onselect=function(){var t=null,a="selected";return function(e){return $(e.cell).hasClass("calendar-not-the-month")?!1:($(e.cell).addClass(a),$(t).removeClass(a),t=e.cell,UI.updateDate(e.date),UI.updateMessage(e.date),void 0)}}(),calInstance.ondrawing=function(t){{var a=t.cell,e=t.date,n=Utility.getCurrentStaus(e),r=n.status;n.offset}if((new Date).format()==e.format()&&(UI.updateDate(calInstance.getCurrentDate()),UI.updateMessage(new Date)),UI.updateMonth(calInstance.getCurrentDate()),e.getMonth()==this.getCurrentDate().getMonth()){var i=[];i.push('<div class="top"></div>'),i.push(e.getDate()),i.push('<div class="bottom '+r+'"></div>'),a.innerHTML=i.join("")}},console.log("draw",Data.get().startdate),calInstance.draw(Data.get().startdate),void 0):!1}function initCalender(){var t=document.getElementById("cal"),a=parseDate(t.getAttribute("data-min-date")),e=parseDate(t.getAttribute("data-max-date"));calInstance=new MonthlyCalendar({container:t,autoRows:!0,displayRows:5,minDate:a,maxDate:e,displayDays:["周日","周一","周二","周三","周四","周五","周六"]})}function calPrev(){var t=calInstance.getCurrentDate(),a=Data.get().circle,e=Utility.switchMonth(-1,t,a);Data.set(e),calInstance.setCurrentDate(e),query()}function calNext(){var t=calInstance.getCurrentDate(),a=Data.get().circle,e=Utility.switchMonth(1,t,a);Data.set(e),calInstance.setCurrentDate(e),query()}var calInstance,STATUS_Y="y",STATUS_G="g",STATUS_R="r",myScroll;Date.prototype.range=function(t,a){var e="yyyyMMdd",n=parseInt(this.format(e),10),r=parseInt(t.format(e),10),i=parseInt(a.format(e),10);return n>=r&&i>=n?!0:!1},Date.prototype.diffDay=function(t){var a=this.valueOf(),e=t.valueOf(),n=864e5,r=1;return r=e>a?(e-a)/n:(a-e)/n,parseInt(r,10)};var Data={startdate:null,circle:0,days:0,yiji:{g:{},r:{},y:{}},initCallback:function(){},getFormData:function(t,a,e){this.startdate=t||parseDate($("#startdate").val()),this.circle=a||parseInt($("#circle").val(),10),this.days=e||parseInt($("#days").val(),10)-1},init:function(t,a,e){Data.getFormData(t,a,e),Data.fetch()},fetch:function(){var counter=0;$.ajax({url:"data/yiji/yiji_anquanqi.json",success:function(data){var data=eval("("+data+")");Data.yiji.g=data,counter++,$.ajax({url:"data/yiji/yiji_jingqi.json",success:function(data){var data=eval("("+data+")");Data.yiji.r=data,counter++,$.ajax({url:"data/yiji/yiji_pailuanqi.json",success:function(data){var data=eval("("+data+")");Data.yiji.y=data,counter++,Data.initCallback&&Data.initCallback()}})}})}})},set:function(t){t&&(Data.startdate=t)},get:function(){return{startdate:Data.startdate,circle:Data.circle,days:Data.days,yiji:Data.yiji}},check:function(){var t=this.startdate,a=this.circle,e=this.days;return t&&"Invalid Date"!=t?1>=a?(alert("请正确填写「月经周期」，必须 >= 1"),!1):(1>=e&&alert("请正确填写「行经天数」，必须 >= 1"),!0):(alert("请输入第一次来月经的时间"),!1)}},UI=function(){var t={r:"月经期",y:"排卵期",g:"安全期"},a={r:"请注意休息～",y:"受孕的可能性较大～",g:"受孕机率较小～"},e={r:["one-star","one-star","one-star","two-star"],y:["five-star","four-star","five-star","three-star"],g:["one-star","two-star","three-star","four-star"]};return{messages:{urlprefix:"docs/",pregnant:{title:"受孕指数",digest:"女性在排卵期的性欲会特别旺盛，这是女性希望怀孕的身体信号达到最高值的体现。",tab:["备孕小贴士","避孕小贴士"]},"lose-weight":{title:"减肥指数",digest:"如果没有时间去健身房，可以选择跳绳作为减肥方式，每天早晚跳 200 下甚至更多，减肥效果非常明显。",tab:["减肥小贴士"]},beauty:{title:"美肌指数",digest:"宜选用一些清爽的化妆水，其他护肤品最好也不要选油性太强的。",tab:["美肌小贴士"]},body:{title:"身体指数",digest:"胃口大开是完全正常的现象，身体储存能量，为可能的受孕做好准备。最好的对策是多吃水果和喝茶，它们都能很好地抑制食欲。",tab:["养生小贴士"]}},data:null,init:function(t){this.setData(t)},setData:function(t){t&&(this.data=t)},updateDate:function(t){t=parseDate(t),$(".selected-date").text(t.format("yyyy-MM-dd"))},updateMonth:function(t){t=parseDate(t),$(".selected-month").text(t.format("yyyy 年 MM 月"))},pageinfoInit:function(){["pregnant","lose-weight","beauty","body"].forEach(function(t){$("#info ."+t).on("click",function(){var a=$("#info ."+t+" b").attr("class");UI.showinfoframe(t,a)})}),$("#infoframe").swipeRight(function(){pageFrame.pop()}),$("#infoframe .back").on("click",function(){pageFrame.pop()})},showinfoframe:function(t,a){var e=UI.messages[t];$("#infoframe h1").text(e.title),$("#infoframe .digest").text(e.digest),$("#infoframe iframe").attr("src",e.url);var n=$("#mainframe"),r=$("#infoframe");r.find("b").removeClass().addClass(a),r.find(".block").removeClass().addClass("block "+t);var i=[];e.tab.forEach(function(t){var a=1==e.tab.length?' style="width:100%;"':"";i.push("<li "+a+">"+t+"</li>")}),$("#infoframe .tab ul").html(function(){return i.join("")}),$("#infoframe .tab li").forEach(function(){var t="selected",a=null,e=function(a){$iframe=$("#infoframe iframe"),$iframe.attr("src","about:blank"),$iframe.attr("src","docs/"+$(a).text()+".html"),$iframe.css({height:"200px"}),$iframe.on("load",function(){$iframe.css({height:window.frames[0].document.height+"px"})}),$(a).addClass(t)};return function(n,r,i){$(n).hasClass("selected")&&(a=n),r==i.length-1&&e(a||n),$(n).on("click",function(){var a=this;$(".tab li").forEach(function(e){e==a?$(a).addClass(t):$(e).removeClass(t)}),e(a)})}}()),pageFrame.push(r,n)},updateMessage:function(n){var r=Utility.getCurrentStaus(parseDate(n)),i=r.status,s=r.offset;$(".status").text(t[i]),$("#info .msg").text(a[i]);var o=e[i];$("#info .star-rating").each(function(t,a){$(a).removeClass(),$(a).addClass("star-rating "+o[t])});var l=UI.data.yiji[i].yi_list.splice(3*s,3),c=UI.data.yiji[i].ji_list.splice(3*s,3);$("#status .good .info").text(l.join("，")),$("#status .bad .info").text(c.join("，"))}}}(),Utility=function(){var t=14;return{switchMonth:function(t,a,e){var n,r=new Date(a.getFullYear(),a.getMonth()+t,a.getDate()),i=new Date(r.getFullYear(),r.getMonth(),1),s=new Date(r.getFullYear(),r.getMonth()+1,-1),o=1;do n=new Date(a.getFullYear(),a.getMonth(),a.getDate()+o*e),t>0?o++:o--;while(!n.range(i,s));return n},getCurrentStaus:function(a){var e,n,r,i,s,o,l=Data.get().startdate,c=Data.get().circle,u=Data.get().days,f=l.getFullYear(),d=l.getMonth(),g=l.getDate(),D=1;a=parseDate(a),e=new Date(f,d,g-t),r=new Date(e.getFullYear(),e.getMonth(),e.getDate()-5),i=new Date(e.getFullYear(),e.getMonth(),e.getDate()+4),n=new Date(f,d,g+c-t),s=new Date(n.getFullYear(),n.getMonth(),n.getDate()-5),o=new Date(n.getFullYear(),n.getMonth(),n.getDate()+4);var y=STATUS_G;return a.range(r,i)&&(y=STATUS_Y,D=r.diffDay(a)),a.range(s,o)&&(y=STATUS_Y,D=s.diffDay(a)),a.range(new Date(f,d,g-c),new Date(f,d,g-c+u))&&(y=STATUS_R,D=a.diffDay(new Date(f,d,g-c))),a.range(l,new Date(f,d,g+u))&&(y=STATUS_R,D=a.diffDay(l)),a.range(new Date(f,d,g+c),new Date(f,d,g+c+u))&&(y=STATUS_R,D=a.diffDay(new Date(f,d,g+c))),{status:y,offset:D}}}}();$(function(){Data.initCallback=function(){$("#startdate").val((new Date).format()),Data.getFormData(),initCalender(),query(),$("#query").tap(function(){Data.getFormData(),query()}),$("#cal-prev").tap(calPrev),$("#cal-next").tap(calNext),UI.pageinfoInit(),myScroll=new iScroll("mainframe",{onBeforeScrollStart:function(t){for(var a,e=t.target,n=["select","input","textarea","button"];1!=e.nodeType;)e=e.parentNode;a=e.tagName.toLowerCase(),n.indexOf(a)>-1||t.preventDefault()}})},Data.init(),Modernizr.inputtypes.date||calendarPicker.initialize()});