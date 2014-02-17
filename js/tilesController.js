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
        var rel = $( this ).attr('rel');
        self.$tiles.removeClass('shown').addClass('hidden');
        //self.updateHidden();
        $('.tile[rel = '+rel+']').removeClass('hidden' ).addClass('shown');
        self.updateShown();
      });
    },

    updateHidden: function() {
      var self = this;
      $('.tile.hidden').each( function() {
        var index = $(this).index();
        var offset_h = ( index % self.tiles_in_row ) * self.col_width;
        var offset_v = Math.floor(index / self.tiles_in_row)*self.col_height;
        self.animateObject(offset_h, offset_v, $(this));
        //$( this ).css({'top': offset_v, 'left': offset_h});
      });
    },

    updateShown: function() {
      var self = this;
      $('.tile.shown').each( function(i) {
        var offset_h = ( i % self.tiles_in_row ) * self.col_width;
        var offset_v = Math.floor( i / self.tiles_in_row) * self.col_height;
        self.animateObject(offset_h, offset_v, $(this));
        //$( this ).css({'top': offset_v, 'left': offset_h});
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

    animateObject: function(x1,y1,$elem) {
      var x0 = parseInt($elem.css('left' ), 10);
      var y0 = parseInt($elem.css('top' ), 10);
      var koef_x = ((x1-x0)/Math.abs(x1-x0));
      var koef_y = ((y1-y0)/Math.abs(y1-y0));
      this.moveHorizontal($elem,x1,y1,koef_x,koef_y);
    },

    moveHorizontal: function($elem,x1,y1,koef_x,koef_y) {
      console.log($elem.index(),x1,y1,koef_x,koef_y);
      var self = this;
      var current_left = parseInt($elem.css('left' ), 10);
      var current_top = parseInt($elem.css('top' ), 10);
      if ( current_left > x1 ) {
        $elem.animate( { left: "+="+(koef_x*self.col_width)+"px"  }, {
          duration: 200,
          step: function(now) {
            current_left = now;
          },
          complete: function() {
            self.moveVertical($elem,x1,y1,koef_x,koef_y);
          }
        });
      }
      else if (current_top > y1) {
        this.moveVertical($elem,x1,y1,koef_x,koef_y);
      }
    },

    moveVertical: function($elem,x1,y1,koef_x,koef_y) {
      var self = this;
      var current_top = parseInt($elem.css('top' ), 10);
      var current_left = parseInt($elem.css('left' ), 10);
      if ( current_top > y1 ) {
        $elem.animate( { top: "+="+(self.col_height*koef_y)+"px" }, {
          duration: 200,
          step: function(now) {
            current_top = now;
          },
          complete: function() {
            self.moveHorizontal($elem,x1,y1,koef_x,koef_y)
          }
        });
      }
      else if (current_left > x1) {
        this.moveHorizontal($elem,x1,y1,koef_x,koef_y);
      }
    }

  }
  window.tilesController = tilesController;
})( window.jQuery );