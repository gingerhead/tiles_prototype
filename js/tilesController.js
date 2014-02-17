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
        self.updateHidden();
        $('.tile[rel = '+rel+']').removeClass('hidden' ).addClass('shown');
        self.updateShown();
      });
    },

    updateHidden: function() {
      var self = this;
      $('.tile.hidden').each( function(i) {
        var offset_v;
        var offset_h;
        var index = $(this).index();
        offset_h = ( index % self.tiles_in_row ) * self.col_width;
        offset_v = Math.floor(index / self.tiles_in_row)*self.col_height;
        $( this ).css({'top': offset_v, 'left': offset_h});
      });
    },

    updateShown: function() {
      var result = this.getCoordinates(0);
      var self = this;
      var x = result['x'];
      var y = result['y'];
      //animateObject(x, y, 9);
      $('.tile.shown').each( function(i) {
        var offset_v;
        var offset_h;
        var index = i;
        offset_h = ( index % self.tiles_in_row ) * self.col_width;
        offset_v = Math.floor(index / self.tiles_in_row)*self.col_height;
        $( this ).css({'top': offset_v, 'left': offset_h});
      });
    },

    getCoordinates: function(index) {
      var self = this;
      var result = [];
      offset_h = ( index % self.tiles_in_row ) * self.col_width;
      offset_v = Math.floor(index / self.tiles_in_row)*self.col_height;
      $( this ).css({'top': offset_v, 'left': offset_h});
      result['x'] = offset_h;
      result['y'] = offset_v;
      return result;
    }

  }
  window.tilesController = tilesController;
})( window.jQuery );