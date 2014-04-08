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
