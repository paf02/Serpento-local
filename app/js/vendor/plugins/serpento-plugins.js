 (function ($) {
     /* Create selectbox
     * 
     */
     $.fn.extend({
        selectBox: function(options) {
            var settings = {

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
                    $selectHead = $('.select-box-current'),
                    $selectOptions = $('.select-box-options');
                init($selectBox, $selectOptions, $selectHead);
            });
        }
     });
}) (jQuery);
