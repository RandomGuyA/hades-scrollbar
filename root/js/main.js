/*---------------- PLUGIN -----------------*/

;(function($, doc, win){
    "use strict";

    /*---------------------- GLOBAL VARIABLES ------------------------*/

    var name = 'Hades Audio Player';
    var self, $el, opts, audio, time_line , play_head, duration;


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
        audio = $el.find('audio')[0];
        time_line = $el.find('#time-line')[0];
        play_head = $el.find('#play-head')[0];

        var play_pause_button  = $('#play-pause');
        play_pause_button.play_pause_event();
        duration = audio.duration;


        audio.addEventListener("canplaythrough", function () {
            duration = audio.duration;
        }, false);

        audio.addEventListener('timeupdate', function(){

            var play_head_width = $(play_head).width();
            var play_percent = (audio.currentTime / duration);
            var pixel_length = $(time_line).width() * play_percent - play_head_width;
            pixel_length = (pixel_length<=0)?0:pixel_length;
            $(play_head).css('margin-left', pixel_length + "px");

        }, false);

        audio.addEventListener('pause', function(){
            play_pause_button.find('img').attr('src', 'assets/icons/play-icon.png');
        });

        time_line.addEventListener("click", function (event) {
            move_play_head(event);
            audio.currentTime = duration * click_percent(event);
        }, false);


    };


    /*---------------------- EVENT HANDLERS ------------------------*/

    $.fn.play_pause_event = function (){
        return this.each(function () {
            $(this).on('click', function(){
                var $icon = $(this).find('img');
                if (audio.paused) {
                    audio.play();
                    $icon.attr('src', 'assets/icons/pause-icon.png');
                } else {
                    audio.pause();
                    $icon.attr('src', 'assets/icons/play-icon.png');
                }
            });
        });
    };

    $.fn.time_update_event = function (){
        return this.each(function () {

        });
    };


    $.fn.can_play_through_event = function (){
        return this.each(function () {

        });
    };

    /*---------------------- BINDING FUNCTIONS ------------------------*/



    /*---------------------- PRIVATE FUNCTIONS ------------------------*/

    function time_update() {
        var play_percent = 100 * (audio.currentTime / duration);
        $(play_head).css('margin-left', play_percent + "%");
    }

    function click_percent(e) {
        return (e.pageX - time_line.offsetLeft) / $(time_line).width();
    }

    function move_play_head(e) {
        var newMargLeft = e.pageX - time_line.offsetLeft;
        var time_line_width = $(time_line).width();
        var play_head_width = $(play_head).width();

        if (newMargLeft == 0 && newMargLeft == time_line_width) {
            $(play_head).css('margin-left', newMargLeft + "px");
        }
        if (newMargLeft <= 0) {
            $(play_head).css('margin-left', "0px");
        }
        if (newMargLeft  >= time_line_width) {
            $(play_head).css('margin-left', time_line_width + "px");
        }
    }

    //-----------------------------------------
    //				INVOCATION
    //-----------------------------------------

    $.fn.hades_audio_player = function(opts) {
        return this.each(function() {
            new App(this, opts);
        });
    };

})(jQuery, document, window);




