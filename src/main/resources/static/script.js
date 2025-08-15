const socket = new SockJS('/chat');
const stompClient = Stomp.over(socket);

stompClient.connect({}, function (frame) {
    console.log('Połączono: ' + frame);

    stompClient.subscribe('/topic/reply', function (message) {
        const li = document.createElement('li');
        li.textContent = "(AI) " + message.body;
        document.getElementById('messages').appendChild(li);
    });
});

function sendMessage() {
    const msg = document.getElementById('msg').value;

    const li = document.createElement('li');
    li.textContent = "(Me) " + msg;
    document.getElementById('messages').appendChild(li);

    stompClient.send("/app/message", {}, JSON.stringify({ message: msg }));

    document.getElementById('msg').value = '';
}