SOCKET_IP  = 'localhost'
SOCKET_PORT = 80
TEXT_ANIM_TIME   = 2000
VOICES = ["UK English Female", "UK English Male", "US English Female",
          "US English Male"
         ]

COLORS = ["Crimson", "BlueViolet", "Blue", "DarkOrange",
          "DeepPink", "Fuchsia", "Gold", "LightSalmon",
          "LimeGreen", "Orange"
         ]

TILT_MAX = 20
PADDING = 100

$(document).ready(function() {
    var socket = io.connect(SOCKET_IP + ':' + SOCKET_PORT)

    $(document).mousemove( function(event) {
        $("#messageField").focus()
    });

    $(document).click( function(event) {
        $("#messageField").focus()
    });

    function send(){
        message = $("#messageField").val()
        socket.emit('chat message', message)

        // clear out text input
        $("#messageField").val("")
    }

    $("#sendButton").click( function() {
        send()
    });

    $("#messageField").keypress( function(e) {
        if(e.which == 13)
            send()
    });

    
    function randomLocation(ele){
        mwidth = $( window ).width()
        mheight = $( window ).height()

        x = Math.floor(Math.random() * (mwidth - PADDING));
        y = Math.floor(Math.random() * (mheight - PADDING));
        roto = Math.floor(Math.random() * (TILT_MAX - -TILT_MAX) + -TILT_MAX);
        ele.css({top: y, left: x, position: 'absolute', transform: 'rotate(' + roto + 'deg)'});
    }

    function animEle(ele){

        ele.animate({ opacity: 1 }, TEXT_ANIM_TIME/6);
 
        var clearer = setInterval(function (){
            if (!responsiveVoice.isPlaying()){
                console.log(!responsiveVoice.isPlaying())
                ele.animate({ opacity: 0 }, 5 * TEXT_ANIM_TIME/6);
                setTimeout(function (){
                    ele.remove()
                    clearInterval(clearer)
                }, TEXT_ANIM_TIME);
            }
        }, 100);
    }

    function randomFromList(list){
        return list[Math.floor(Math.random() * list.length)];
    }

    socket.on('chat message', function(msg){
        id =  "val" + Math.floor(Math.random() * 1000);
        color = randomFromList(COLORS)
        $("#floater").prepend('<div class="floaterText" style="color: ' + color + ';" id="' + id + '">' + msg + '</div>')

        floater = $("#"+ id)

        randomLocation(floater)
        animEle(floater)

        var voice = randomFromList(VOICES);
        console.log(voice)
        responsiveVoice.speak(msg, voice)
    });

    socket.on('num connections', function(msg){
        console.log(msg)
        $("#num_chatter").text(msg)
    });

});