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

        console.log(current_position);
        console.log(content_height);
        console.log($viewport.height());

        $viewport.scroll_event();
        $handle.add_drag_function_to_element();
    };


    /*---------------------- EVENT HANDLERS ------------------------*/

    $.fn.scroll_event = function (){
        return this.each(function () {
            $(this).on('mousewheel', function(event) {
                if(event.deltaY == -1){
                    console.log($scrollable.scrollTop());

                }
                if(event.deltaY == 1){
                    console.log($scrollable.scrollTop());

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




