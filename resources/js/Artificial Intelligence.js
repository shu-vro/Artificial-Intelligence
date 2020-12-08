window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

var texts = document.querySelector(".texts");
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "en-US";

let p = document.createElement("p");

recognition.addEventListener("result", (e) => {
    texts.appendChild(p);
    var text = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

    p.textContent = text;
    if (e.results[0].isFinal) {
        if (text.includes("how are you")) {
            p = document.createElement("p");
            p.classList.add("reply");
            p.innerText = "I am fine";
            texts.appendChild(p);
        }
        if (
            text.includes("what is your name") ||
            text.includes("what's your name")
        ) {
            p = document.createElement("p");
            p.classList.add("reply");
            p.textContent = "My name is Bro";
            texts.appendChild(p);
        }
        if (text.includes("delete conversation")) {
            p = document.querySelectorAll("p");
            p.forEach((para) => {
                para.remove();
            });
        }
        if (text.includes("search")) {
            p = document.createElement("p");
            p.classList.add("reply");
            p.textContent = "Searching: " + text + "...";
            text = text.replace(" ", "?q=");
            texts.appendChild(p);
            window.open("https://google.com/" + text);
        }
        if (text.includes("help")) {
            p = document.createElement("p");
            p.classList.add("reply");
            p.innerHTML = `Surely I can help you but first you have to understand my protocols and commands. But you can have a good chat with
            me. Let's know the commands I can perform.
            <ul>
                <li>Speak <b>Delete conversation</b> to clear the screen including all the chats.</li>
                <li>Speak <b>Search</b> to search anything.</li>
                <li>Speak <b>Website</b> to go to a commercial website. <strong>Note: </strong> Website must be valid.</li>
                <li>Speak <b>I want to know</b> to search your question in Wikipedia.</li>
            </ul>`;
            texts.appendChild(p);
        }
        if (text.includes("website")) {
            p = document.createElement("p");
            p.classList.add("reply");
            text = text.replace("website ", "");
            p.textContent = "Opening " + text + "...";
            texts.appendChild(p);
            window.open("https://" + text + ".com/");
        }
        if (text.includes("date")) {
            p = document.createElement("p");
            p.classList.add("reply");
            const date = new Date();
            let day = date.toDateString();
            let time = date.toLocaleTimeString();
            p.textContent = time + ", " + day;
            texts.appendChild(p);
        }
        if (text.includes("I want to know")) {
            p = document.createElement("p");
            p.classList.add("reply");
            text = text.replace("I want to know", "");
            p.textContent = "I found this for you and taking to you to " + text;
            window.open("https://en.wikipedia.org/w/index.php?search=" + text);
            texts.appendChild(p);
        }
        p = document.createElement("p");
        window.scrollBy(0, 10000);


        // On process. //
        var speakWords = document.querySelectorAll('p.reply');
        var speaker = window.speechSynthesis;
        function speakFunction() {
            let inputIndex = speakWords.length - 1;
            var toSpeak = new SpeechSynthesisUtterance(speakWords[inputIndex].textContent);
            var voices = speaker.getVoices();
            toSpeak.voice = voices[3];      // 0 to 20
            toSpeak.pitch = 1;      // 0 to 2
            toSpeak.rate = 1;       // 0.1 to 10
            toSpeak.volume = 1;     // 0 to 1
            toSpeak.lang = 'en-US';
            speaker.speak(toSpeak);
        }
        speakFunction();
        // On Process. //

    }
});
recognition.addEventListener("end", () => {
    recognition.start();
});

recognition.start();