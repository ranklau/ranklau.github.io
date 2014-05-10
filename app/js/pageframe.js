(function () {

	var PageFrame = function() {};

	PageFrame.prototype = {

		transition: null,
		stack: [],
		duration: 200,

		push: function(foreground, background) {

			var pageWidth = $(window).width(),
				duration  = this.duration,
				height    = $(foreground).height(); //把前景的高度缓存，在动画结束时还原

			var self = this;
			$(background).css({display: 'none'});

			$(foreground).css({
				'position': 'absolute',
				'translateX': '0px',
				'left': '0px',
				'top': '0px',
				'height': $(document).height() +'px',
				'background':'#fff',
				'width': '100%',
				'display': 'block'
			}).animate({
				translateX: pageWidth +'px'
			},0, 'linear', function(){
				$(foreground).animate({
					translateX: '0px'
				}, duration, 'linear', function() {
					$(background).css({display: 'none'});
					$(foreground).css({height: height+'px'});
					self.gotoTop();
				});
			})

			this.stack.push({
				foreground: foreground, 
				background: background
			});
		},

		gotoTop: function() {
			window.scrollTo(0,0);
		},

		pop: function() {
			var view = this.stack.pop(),
				foreground = view.foreground,
				background = view.background,
				pageWidth = $(window).width(),
				self = this;

			//$(foreground).css({display: 'none'});

			$(foreground).animate({
				'position': 'absolute',
				'translateX': pageWidth +'px'
			}, this.duration, 'linear', function() {
				$(background).css({display: 'block'});
				$(foreground).css({display: 'none' });
			});
		}
	};

	window.pageFrame = new PageFrame();
})();