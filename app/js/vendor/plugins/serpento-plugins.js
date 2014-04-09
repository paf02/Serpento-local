 (function ($) {
     /* Create selectbox
     * 
     */
     $.fn.extend({
        selectBox: function(options) {
            var settings = {
                cb : function(li) {}
            },
            options = $.extend(settings, options);

            function init($box, $options, $head){
                $head.on('click', function(){
                    $options.slideToggle('fast');
                });
                $box.on('mouseleave', function(){
                    $options.slideUp('fast');
                });
                $options.on('click', '.location', function(){
                    setSelected($(this));
                    $options.slideUp('fast');
                });
            }

            function setSelected($location) {
                var $currentBox = $location.closest('.select-box'),
                    $currentOption = $currentBox.find('.select-box-current > .current-location');

                    $currentOption.html($location.html());
                    $currentBox.find('.location').removeClass('selected');
                    $location.addClass('selected'); 
            };

            return this.each(function() {
                var $selectBox = $(this),
                    $selectHead = $selectBox.find('.select-box-current'),
                    $selectOptions = $selectBox.find('.select-box-options');
                init($selectBox, $selectOptions, $selectHead);
            });
        }
     });

    /* Sets the height of 2 or more columns inside a container equally
     * Usage: Add the class to the parent container
     */
    $.fn.extend({ 
        setColumnsEqualHeight : function(options) {
            
            var defaults = {
                    childSelector: '',
                    parentContainer: '.setChildrenHeight'
                },
                options = $.extend(defaults, options);

            function setHeight() {
                var children    = options.$el.children(options.childSelector),
                    maxHeight   = 0,
                    childQty    = children.length,
                    i           = 0;

                for (; i < childQty; i++) {
                    var $child  = $(children[i]),
                        $height = parseInt($child.height(), 10),
                        $pb     = parseInt($child.css('padding-bottom'), 10),
                        $pt     = parseInt($child.css('padding-top'), 10);


                    /*
                    if (!($.browser.msie && parseInt($.browser.version, 10)) < 9) {
                        if (!isNaN($pb)) {
                            $height += $pb;
                        }

                        if (!isNaN($pt)) {
                            $height += $pt;
                        }
                    }
                    */

                    maxHeight = Math.max(maxHeight, $height);
                }
                
                options.$el.children().not('[data-ignore="true"]').css({ 'height': maxHeight });
            }

            return this.each(function() {
                options.$el = $(this);

                setHeight();
            });
        }
    });

    $.fn.extend({ 
        carouselOne: function(options) {

            //Settings list and the default values
            var defaults = {
                    defaultRating: 0,
                    totalStars: 5
                },
                options = $.extend(defaults, options);

            function builtUl() {
                var totalRating = 0,
                    totalRatingPartial = 0,
                    fragment = document.createDocumentFragment(),
                    ul = fragment.appendChild(document.createElement('ul')),
                    i  = 0,
                    vecRatingStarsInit;

                
                vecRatingStarsInit = options.$el.data('rating');

            }

            return this.each(function() {
                options.$el = $(this);

                builtUl();
            });
        }
    });

}) (jQuery);
