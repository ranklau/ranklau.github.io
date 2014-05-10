	$(function(){

		var Request = {

			type: '?',

			url: function(type) {
				if (Request.type=='#') return location.hash;
				return location.search;
			},

			Querystring: function(param) {
				var url = Request.url().substr(1);
				var re = new RegExp("" +param+ "\=([^\&\?]*)", 'img');
				var result = null;
				url.match(re) && (result = RegExp.$1)
				return result;
			}
		};

		$('#infoframe .back').on('click', function(){
			if (history.length > 1) history.go(-1);
			else location.href = "index.html";
		});

		$('.block').addClass(Request.Querystring('type'));
		var star = Request.Querystring('star');
		$('.block b').removeClass();
		$('.block b').addClass('star-rating '+star);

		$('.tab li').forEach((function() {

			var cls = 'selected',
				def = null,
				load = function(item) {
					$iframe = $('#infoframe iframe');
					$iframe.attr('src', 'about:blank');
					$iframe.attr('src', 'docs/' +$(item).text()+ '.html');
					$iframe.css({height: '200px'});
					$iframe.on('load', function(){
						$iframe.css({
							height: window.frames[0].document.height +'px'
						});
					})
					$(item).addClass(cls);
				};

			return function(item, i, a) {
				if ($(item).hasClass('selected')) def = item;
				if (i==a.length-1) load( def||item );

				$(item).on('click', function() {
					var el = this;
					$('.tab li').forEach(function(item) {
						if (item==el) $(el).addClass(cls);
						else $(item).removeClass(cls);
					});
					load(el);
				});
			}

		})());
	});