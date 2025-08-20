const socket = new SockJS('/chat');
    const stompClient = Stomp.over(socket);

    const messages = document.getElementById("messages");
    const input = document.getElementById("msg");
    let loaderLi = null;

    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);

      stompClient.subscribe('/topic/reply', function (message) {
        // usuń loader kiedy odpowiedź przyjdzie
        if (loaderLi) {
          loaderLi.remove();
          loaderLi = null;
        }

        const li = document.createElement('li');
        li.classList.add("bot");
        li.textContent = "(AI) " + message.body;
        messages.appendChild(li);
        messages.scrollTop = messages.scrollHeight;
      });
    });

    function sendMessage() {
      const msg = input.value.trim();
      if (!msg) return;

      const li = document.createElement('li');
      li.classList.add("user");
      li.textContent = "(Me) " + msg;
      messages.appendChild(li);

      loaderLi = document.createElement("li");
      loaderLi.classList.add("bot");
      loaderLi.innerHTML = `<span>Thinking...</span><span class="loader"></span>`;
      messages.appendChild(loaderLi);
      messages.scrollTop = messages.scrollHeight;

      stompClient.send("/app/message", {}, JSON.stringify({ message: msg }));

      input.value = '';
    }

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });