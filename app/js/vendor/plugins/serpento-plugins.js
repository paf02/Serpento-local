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
                    parentContainer: '.setChildrenHeight',
                    parentHasHeight: false
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
                if (options.parentHasHeight) {
                    options.$el.css({ 'height': maxHeight });
                }
            }

            return this.each(function() {
                options.$el = $(this);

                setHeight();
            });
        }
    });

    $.fn.extend({ 
        geoLocation: function(options) {

            //Settings list and the default values
            var defaults = {
                    
                },
                options = $.extend(defaults, options),
                geocoder;

            function init(){
                try {
                    geocoder = new google.maps.Geocoder();
                    navigator.geolocation.watchPosition(callback);
                }
                catch (e) {
                    options.$el.html('No se logro ubicar su posicion actual');
                    console.log(e);
                }
            }
            function callback(position){
                /*
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                */
                codeLatLng(position.coords.latitude, position.coords.longitude)

            }

            function codeLatLng(lat, lng) {
                var latlng = new google.maps.LatLng(lat, lng);
                geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            //console.log(results[3].formatted_address);
                            options.$el.html(results[3].formatted_address);
                        } else {
                            options.$el.html('No se logro ubicar su posicion actual');//alert("No results found");
                        }
                    } else {
                        options.$el.html('No se logro ubicar su posicion actual');
                        console.log("Geocoder failed due to: " + status);
                    }
                });
            }

            return this.each(function() {
                options.$el = $(this);

                init();
            });
        }
    });

}) (jQuery);
