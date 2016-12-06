window.onload = function() {

    var connection = new WebSocket('ws://10.103.51.5:8000/');
    var userName = document.querySelector("#username");
    var message = document.querySelector("#user-message");
    var allMessages = document.querySelector("#all-messages");
    document.querySelector("#send-btn").addEventListener('click', sendMessage);

    connection.onmessage = function (message) {

        try {
            var splitMessage = message.data.split(":");
            var docFrag = document.createDocumentFragment();
            var b = document.createElement("b");
            b.className = "user-name";
            b.innerHTML = splitMessage[0] + ":";
            var p = document.createElement("p");
            p.className = "message";
            p.innerHTML = splitMessage[1];
            docFrag.appendChild(b);
            docFrag.appendChild(p);
            allMessages.appendChild(docFrag);

        } catch(e) {

            console.log("ERROR!");
            return;
        }
    };

    function sendMessage() {

        if (userName.value === "" || message === "") {

            connection.send("Error: can not send empty messages please try again.");
        }
        else {

            connection.send(userName.value + ":" + message.value);
            userName.value = "";
            message.value = "";
        }
    };
};