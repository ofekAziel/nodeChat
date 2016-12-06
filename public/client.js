window.onload = function() {

    var connection = new WebSocket('ws://10.103.51.5:8000/');
    var userName = document.querySelector("#username");
    var message = document.querySelector("#user-message");
    var allMessages = document.querySelector("#all-messages");
    document.querySelector("#send-btn").addEventListener('click', sendMessage);

    connection.onmessage = function (message) {

        try{

            var message = (message.data);
            var docFrag = document.createDocumentFragment();
            var b = document.createElement("b");
            b.innerHTML = message;
            docFrag.appendChild(b);
            allMessages.appendChild(docFrag);
        } catch(e){

            console.log("ERROR!");
            return;
        }
    };

    function sendMessage() {

        connection.send(userName.value + " : " + message.value);
    };
};