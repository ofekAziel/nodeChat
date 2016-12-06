window.onload = function () {

    var connection = new WebSocket('ws://10.103.51.5:8000/');
    var userName = document.querySelector("#username");
    var message = document.querySelector("#user-message");
    var allMessages = document.querySelector("#all-messages");
    document.querySelector("#send-btn").addEventListener('click', sendMessage);

    connection.onmessage = function (message) {

        var splitMessage = message.data.split(":");
        var docFrag = document.createDocumentFragment();
        var b = document.createElement("b");
        b.className = "user-name";
        var p = document.createElement("p");
        p.className = "message";
        b.appendChild(document.createTextNode(splitMessage[0] + ":"));
        docFrag.appendChild(b);
        p.appendChild(document.createTextNode(splitMessage[1]));
        docFrag.appendChild(p);
        allMessages.appendChild(docFrag);
    };

    function sendMessage() {

        if (userName.value === "" || message === "") {
            connection.send("Error: can not send empty messages please try again.");
        }
        else {
            connection.send(userName.value + ":" + message.value);
            message.value = "";
        }
    };
};