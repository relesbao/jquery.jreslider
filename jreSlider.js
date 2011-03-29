/**
 * jreSlider
 * @author Rodrigo da Rosa Elesbão <slipknabos@gmail.com>
 * Plugin jQuery.
 **/

(function($) {

    /*  ________________________________ */
    $.fn.jreslider = function( options ) {

        var defaults = {
            auto: 0,
            debug: false,
            next: '',
            prev: ''
        }

        var config = jQuery.extend( defaults, options );

        var container = this;
        var currentPosition = 0;
        var totalSlides     = 0;
        var slideWidth      = 0;
        var slideHeight     = 0;
        var totalWidth      = 0;
        var timer;
        var timeout;

        var init = function(){
            slideWidth = container.children().find('img').css('width').match(/[0-9]+/g);
            debug( 'slideWidth: ' + slideWidth );

            slideHeight = container.children().find('img').css('height').match(/[0-9]+/g);
            debug( 'slideHeight: ' + slideHeight );

            totalSlides = container.children().length;
            debug( 'totalSlides: ' + totalSlides );

            totalWidth = slideWidth * totalSlides;
            debug( 'totalWidth: ' + totalWidth );
            prepareHtml();
            if( config.auto != 0 ){
                startTimer();
            }
            if( prev != '' || next != '' ){
                setControllers();
            }
        }

        var prepareHtml = function(){
            container.css({
                'overflow': 'hidden',
                'display':  'block',
                'width':    slideWidth,
                'height':   slideHeight,
                'position': 'relative'
            });

            container.children().wrapAll('<div id="jrcarousel-wrapper-horizontal"></div>').css({
                'float':    'left',
                'display':  'block',
                'width':    slideWidth,
                'height':   slideHeight
            });

            $('#jrcarousel-wrapper-horizontal').css({
                'width': totalWidth
            });
        }

        var next = function(){
            if( currentPosition + 1 == totalSlides ){
                currentPosition = 0;
            }else{
                currentPosition = currentPosition + 1;
            }
            debug( 'currentPosition: '+ currentPosition );
            moveToPosition();
        }

        var prev = function(){
            if( currentPosition - 1 == -1 ){
                currentPosition = totalSlides - 1;
            }else{
                currentPosition = currentPosition - 1;
            }
            debug( 'currentPosition: '+ currentPosition );
            moveToPosition();
        }

        var moveToPosition = function(){
            $('#jrcarousel-wrapper-horizontal').animate({
                'marginLeft': - ( slideWidth * currentPosition )
            });
        }

        var startTimer = function(){
            timer = setInterval( function(){
                next();
            }, config.auto * 1000 )
        }

        var setControllers = function(){
            if( config.next != '' ){
                $( config.next ).live( 'click', function(){
                    timerOperations();
                    next();
                } )
            }
            if( config.prev != '' ){
                $( config.prev ).live( 'click', function(){
                    timerOperations();
                    prev();
                } )
            }
        }

        var timerOperations = function(){
            if( config.auto != 0 ){
                clearInterval( timer );
                clearTimeout( timeout )
                timeout = setTimeout( function(){
                    startTimer();
                }, config.auto * 1000 )
            }
        }

        var debug = function( value ) {
            if( config.debug && console ){
                console.log( value );
            }
        }

        init();
    };
})(jQuery);

