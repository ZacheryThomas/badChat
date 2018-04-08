SOCKET_URL  = 'http://localhost'
SOCKET_PORT = 80
TEXT_ANIM_TIME   = 2000
VOICES = ["UK English Female", "UK English Male", "US English Female",
          "US English Male"
         ]

COLORS = ["Crimson", "BlueViolet", "Blue", "DarkOrange", "DeepPink", "Fuchsia", "Gold", "LightSalmon", "LimeGreen",
          "Orange", "Yellow"
         ]

$(document).ready(function() {

    var socket = io.connect(SOCKET_URL + ':' + SOCKET_PORT)

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

        padding = 50

        x = Math.floor(Math.random() * ((mwidth - padding) - padding) + padding);
        y = Math.floor(Math.random() * ((mheight - padding) - padding) + padding);
        ele.css({top: y, left: x, position: 'absolute'});
    }

    function animEle(ele){
        ele.animate({ opacity: 1 }, TEXT_ANIM_TIME/6);
        ele.delay(TEXT_ANIM_TIME/6).animate({ opacity: 0 }, 4 * TEXT_ANIM_TIME/6);

        setTimeout(function (){
            ele.remove()
        }, TEXT_ANIM_TIME);
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

});