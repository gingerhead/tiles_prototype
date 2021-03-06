(function ( $ ) {
  function tilesController() {
    var tile_width = 200;
    var tile_height = 150;
    var margin_right = 20;
    var margin_bottom = 10;
    var container = 1000;
    this.tiles_in_row = Math.floor(container / tile_width);
    this.col_width = tile_width + margin_right;
    this.col_height = tile_height + margin_bottom;
    this.$tiles = $('.tile');
    this.init();
  }

  tilesController.prototype = {
    init: function() {
      var self = this;
      $('.tile.shown').each( function() {
        var offset_v;
        var offset_h;
        var index = $( this ).index();
        offset_h = ( index % self.tiles_in_row ) * self.col_width;
        offset_v = Math.floor(index / self.tiles_in_row)*self.col_height;
        $( this ).css({'top': offset_v, 'left': offset_h});
      });

      $('.turning' ).click( function() {
        if ($(this ).hasClass('pressed')) {
          $(this ).removeClass('pressed');
        }
        else {
          $(this ).addClass('pressed');
        }

        var $elem = $(this);

        if ($('.turning.pressed' ).length == 0) {
          self.$tiles.finish();
          self.$tiles.removeClass('hidden' ).addClass('shown');
          self.updateShown();
        }
        else {
          self.$tiles.finish()
          self.$tiles.removeClass('shown').addClass('hidden');
          $('.turning.pressed' ).each( function() {
            if ($(this) != $elem) {
              self.$tiles.finish()
              var rel = $(this ).attr('filter');
              var index = $(this).index();
              var x0 = ( index % self.tiles_in_row ) * self.col_width;
              var y0 = Math.floor(index / self.tiles_in_row)*self.col_height;
              $(this ).css({top: y0, left: x0});
              $('.tile['+rel+'='+rel+']').removeClass('hidden' ).addClass('shown');
              self.updateShown();
            }
          });
        }
      });

      $('.show-all' ).click( function() {
        self.$tiles.finish();
        self.$tiles.removeClass('hidden' ).addClass('shown');
        self.updateShown();
      });
    },

    updateHidden: function() {
      var self = this;
      $('.tile.hidden').each( function() {
        var index = $(this).index();
        var offset_h = ( index % self.tiles_in_row ) * self.col_width;
        var offset_v = Math.floor(index / self.tiles_in_row)*self.col_height;
        $(this ).css({top: offset_v, left: offset_h});
        //self.animateObject(offset_h, offset_v, $(this),'is_animating_backwards');
      });
    },

    updateShown: function() {
      var self = this;
      $('.tile.shown').each( function(i) {
        var offset_h = ( i % self.tiles_in_row ) * self.col_width;
        var offset_v = Math.floor( i / self.tiles_in_row) * self.col_height;
        self.animateObject(offset_h, offset_v, $(this ),'is_animating_forwards');
      });
    },
/*
    getCoordinates: function(index) {
      var self = this;
      var result = [];
      var offset_h = ( index % self.tiles_in_row ) * self.col_width;
      var offset_v = Math.floor(index / self.tiles_in_row)*self.col_height;
      //$( this ).css({'top': offset_v, 'left': offset_h});
      result['x'] = offset_h;
      result['y'] = offset_v;
      return result;
    },*/

    animateObject: function(x1,y1,$elem, class_name) {
      var x0 = parseInt($elem.css('left' ), 10);
      var y0 = parseInt($elem.css('top' ), 10);
      var koef_x = '-';
      var koef_y = '-';
      if ((x1-x0) > 0) koef_x = '+';
      if ((y1-y0) > 0) koef_y = '+';
      var is_animating = true;
      var iter = Math.ceil(Math.abs(x1-x0)/this.col_width) + Math.ceil(Math.abs(y1-y0)/this.col_height);
      var total_duration = 400;
      var duration_unit = total_duration / iter;
      $elem.addClass(class_name).delay(100);
      this.moveHorizontal($elem,x1,y1,koef_x,koef_y, is_animating,class_name, duration_unit);
/*      setTimeout(function() {
        self.moveHorizontal($elem,x1,y1,koef_x,koef_y, is_animating);
      },500);*/
    },

    moveHorizontal: function($elem,x1,y1,koef_x,koef_y, is_animating,class_name, duration_unit) {
      var self = this;
      var current_left = parseInt($elem.css('left' ), 10);
      var current_top = parseInt($elem.css('top' ), 10);
      if ( Math.abs(current_left - x1) > 0 ) {
        $elem.animate( { left: koef_x+"="+self.col_width+"px"  }, {
          duration: duration_unit,
          step: function(now) {
            current_left = now;
          },
          complete: function() {
            self.moveVertical($elem,x1,y1,koef_x,koef_y, is_animating,class_name,duration_unit);
          },
          specialEasing: 'linear'
        });
      }
      else if (Math.abs(current_top - y1) > 0) {
        this.moveVertical($elem,x1,y1,koef_x,koef_y, is_animating,class_name, duration_unit);
      }
      else if ((Math.abs(current_left - x1) <= 0) && (Math.abs(current_top - y1) <= 0)){
        while (is_animating) {
          is_animating = false;
          $elem.removeClass(class_name);
        }
      }
    },

    moveVertical: function($elem,x1,y1,koef_x,koef_y, is_animating,class_name, duration_unit) {
      var self = this;
      var current_top = parseInt($elem.css('top' ), 10);
      var current_left = parseInt($elem.css('left' ), 10);
      if ( Math.abs(current_top - y1) > 0 ) {
        $elem.animate( { top: koef_y+"="+self.col_height+"px" }, {
          duration: duration_unit,
          step: function(now) {
            current_top = now;
          },
          complete: function() {
            self.moveHorizontal($elem,x1,y1,koef_x,koef_y, is_animating,class_name,duration_unit)
          },
          specialEasing: 'linear'
        });
      }
      else if (Math.abs(current_left - x1) > 0) {
        this.moveHorizontal($elem,x1,y1,koef_x,koef_y, is_animating,class_name,duration_unit);
      }
      else if (((Math.abs(current_left - x1) <= 0) && (Math.abs(current_top - y1) <= 0))) {
        while (is_animating) {
          is_animating = false;
          $elem.removeClass(class_name);
        }
      }
    }

  }
  window.tilesController = tilesController;
})( window.jQuery );