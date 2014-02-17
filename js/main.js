$(document).ready( function() {
  tilesController = new tilesController();
  /*var tile_width = 200;
  var tile_height = 150;
  var margin_right = 20;
  var margin_bottom = 10;
  var container = 1000;
  var tiles_in_row = Math.floor(container / tile_width);
  var col_width = tile_width + margin_right;
  var col_height = tile_height + margin_bottom;
  var $tiles = $('.tile');

  $('.tile.shown').each( function() {
    var offset_v;
    var offset_h;
    var index = $( this ).index();
    offset_h = ( index % tiles_in_row ) * col_width;
    offset_v = Math.floor(index / tiles_in_row)*col_height;
    $( this ).css({'top': offset_v, 'left': offset_h});
  });

  function getCoordinates(index) {
    var result = [];
    offset_h = ( index % tiles_in_row ) * col_width;
    offset_v = Math.floor(index / tiles_in_row)*col_height;
    $( this ).css({'top': offset_v, 'left': offset_h});
    result['x'] = offset_h;
    result['y'] = offset_v;
    return result;
  }

  function updateShown() {
    var result = getCoordinates(0);
    var x = result['x'];
    var y = result['y'];
    //animateObject(x, y, 9);
    $('.tile.shown').each( function(i) {
      var offset_v;
      var offset_h;
      var index = i;
      offset_h = ( index % tiles_in_row ) * col_width;
      offset_v = Math.floor(index / tiles_in_row)*col_height;
      $( this ).css({'top': offset_v, 'left': offset_h});
    });
  }

  function updateHidden() {
    $('.tile.hidden').each( function(i) {
      var offset_v;
      var offset_h;
      var index = $(this).index();
      offset_h = ( index % tiles_in_row ) * col_width;
      offset_v = Math.floor(index / tiles_in_row)*col_height;
      $( this ).css({'top': offset_v, 'left': offset_h});
    });
  }

  $('.turning' ).click( function() {
    var rel = $( this ).attr('rel');
    $tiles.removeClass('shown').addClass('hidden');
    updateHidden();
    $('.tile[rel = '+rel+']').removeClass('hidden' ).addClass('shown');
    updateShown();
  });

  function animateObject(x1,y1,index) {
    var step_x;
    var step_y;
    var $elem;
    $elem = $('.tile' ).eq(index);
    var x0 = parseInt($elem.css('left' ), 10);
    var y0 = parseInt($elem.css('top' ), 10);
    step_x = col_width * ((x1-x0)/Math.abs(x1-x0));
    console.log(step_x);
    step_y = col_height * ((y1-y0)/Math.abs(y1-y0));
    console.log(x0,y0,x1,y1);
    this.current_left = x0;
    var self = this;

    moveHorizontal = function($elem){
      var self2 = self;
      console.log(self.current_left);
      if ( self.current_left > x1 ) {
        $elem.animate( { left: '0' }, {
        duration: 500,
        step: function(now) {
          self2.current_left = now;
        },
        complete: moveHorizontal($elem)
      });
      }
    }

    moveVertical = function($elem){
      var current_top = parseInt($elem.css('top' ), 10);
      if ( current_top > y1 ) {
        $elem.animate( { top: current_top+step_y }, {
          duration: 500,
          complete: moveHorizontal($elem)
       });
      }
    }
    moveHorizontal($elem);
  }
*/

});