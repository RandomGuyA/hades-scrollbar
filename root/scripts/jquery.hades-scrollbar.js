/*---------------- PLUGIN -----------------*/

;(function($, doc, win){
    "use strict";

    /*---------------------- GLOBAL VARIABLES ------------------------*/

    var name = 'Hades Scrollbar';
    var self, $el, opts;
    var $track;
    var $handle;
    var $viewport;
    var $scrollable;


    /*---------------------- INITIALISATION ------------------------*/

    function App(el, opts){

        console.log(name+" activated");

        this.$el = $(el);
        this.$el.data(name, this);

        this.defaults = {

            required:true

        };

        var meta = this.$el.data(name + '-opts');
        this.opts = $.extend(this.defaults,opts, meta);

        this.init();
    }

    App.prototype.init = function() {

        /*---------------------- VARIABLES ------------------------*/

        self = this;
        $el = self.$el;
        opts = self.defaults;
        $track = $el.find('.track');
        $handle = $el.find('.handle');
        $viewport = $el.find('.viewport');
        $scrollable = $el.find('.scrollable');

        var current_position = $scrollable.scrollTop();
        var content_height = get_content_height($scrollable);
        var view_height = $viewport.height();

        //console.log(view_height);
        //console.log(current_position);
        console.log(content_height);
        console.log(view_height);

        setup_handle_height(content_height, view_height);

        $viewport.scroll_event();
        $handle.add_drag_function_to_element();
    };


    /*---------------------- EVENT HANDLERS ------------------------*/

    $.fn.scroll_event = function (){
        return this.each(function () {
            $(this).on('mousewheel', function(event) {
                if(event.deltaY == -1){
                    console.log($scrollable.scrollTop());
                    adjust_handle();
                }
                if(event.deltaY == 1){
                    console.log($scrollable.scrollTop());
                    adjust_handle();
                }
            });
        });
    };


    $.fn.add_drag_function_to_element = function () {
        return this.each(function () {
            $(this).draggable({

                containment: "parent",
                axis: "y",

                start: function (event, ui) {
                    console.log("started dragging");

                    console.log($(this).position().top);
                },
                drag: function (event, ui) {
                    console.log("currently dragging");
                    adjust_content();
                },
                stop: function (event, ui) {
                    console.log("stopped dragging");
                    console.log($(this).position().top);
                    $handle.add_drag_function_to_element();
                }
            });
        });
    };



    /*---------------------- BINDING FUNCTIONS ------------------------*/





    /*---------------------- PRIVATE FUNCTIONS ------------------------*/

    function adjust_content(){

        var current_position = parseInt($handle.css('top'));
        var inner_track_height = $track.height() - $handle.height();
        var position_percentage = calculate_percentage(current_position , inner_track_height);

        var handle_position = parseInt(position_percentage/100 * get_inner_height());
        console.log(handle_position);
        $scrollable.scrollTop(handle_position);
    }

    function adjust_handle(){

        var current_position = $scrollable.scrollTop();
        var position_percentage = calculate_percentage(current_position , get_inner_height());
        var inner_track_height = $track.height() - $handle.height();
        var handle_position = position_percentage/100 * inner_track_height;
        $handle.css('top', handle_position+"px");

    }

    function get_inner_height(){

        var content_height = get_content_height($scrollable);
        var view_height = $viewport.height();
        var padding = get_content_margin_total($scrollable);
        return content_height - view_height + padding;
    }

    function setup_handle_height(content_height, view_height){

        var percentage = calculate_percentage(view_height, content_height);
        var track_height = $track.height();
        var handle_height = percentage / 100 * track_height;
        $handle.css('height', handle_height);

    }

    function calculate_percentage(view_height, content_height) {
        return (100 / content_height * view_height);
    }

    function get_content_margin_total($scroll_area){

        var height = 0;

        $scroll_area.find('*').each(function() {
            height+= (get_margin(this, "top") + get_margin(this, "bottom"));
        });

        return height;

    }

    function get_margin(element, loc){
        return  parseInt(window.getComputedStyle(element).getPropertyValue("margin-" + loc));
    }

    function get_content_height($scroll_area){

        var height = 0;

        $scroll_area.find('*').each(function() {
            height+=$(this).height();
        });

        return height;

    }

    //-----------------------------------------
    //				INVOCATION
    //-----------------------------------------

    $.fn.hades_scroll_bar = function(opts) {
        return this.each(function() {
            new App(this, opts);
        });
    };

})(jQuery, document, window);




