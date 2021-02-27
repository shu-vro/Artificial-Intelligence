window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let texts = document.querySelector(".texts"); // Get the element.
const recognition = new SpeechRecognition(); // Getting Speech Recognition api
recognition.interimResults = true; // Browser corrects user's spelling mistakes.
recognition.lang = "en-US"; // Language

// If localStorage has 'previousChatForAIByShu-vro' item, get it. Or set the array to null.
let textArray = localStorage.getItem("previousChatForAIByShu-vro")
    ? JSON.parse(localStorage.getItem("previousChatForAIByShu-vro"))
    : [];
if (!localStorage.getItem("previousChatForAIByShu-vro")) {
    // Setting Item to local storage.
    localStorage.setItem(
        "previousChatForAIByShu-vro",
        JSON.stringify(textArray)
    );
}

// Loading previous Chats.
class PastChat {
    constructor(text) {
        this.text = text;
        if (this.text.includes("repl.")) {
            this.text = this.text.replace("repl.", "");
            this.reply();
        } else if (
            text.includes("https://en.wikipedia.org/w/index.php?search=")
        ) {
            this.panel();
        } else {
            this.comment();
        }
    }
    // The comment generator function
    comment() {
        let p = document.createElement("p");
        p.innerText = this.text;
        texts.appendChild(p);
    }
    // The reply generator function
    reply() {
        let p = document.createElement("p");
        p.classList.add("reply");
        p.innerText = this.text;
        texts.appendChild(p);
    }
    // The iframe generator function
    panel() {
        let iframe = document.createElement("iframe");
        iframe.src = this.text;
        texts.appendChild(iframe);
    }
}

// For each text in the textArray...
for (let i = 0; i < textArray.length; i++) {
    const text = textArray[i];
    new PastChat(text);
}

let p = document.createElement("p");
recognition.addEventListener("result", (e) => {
    texts.appendChild(p);
    let text = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

    p.textContent = text;
    if (e.results[0].isFinal) {
        textArray.push(text); // Push the text to the text array.
        localStorage.setItem(
            "previousChatForAIByShu-vro",
            JSON.stringify(textArray) // Stringify the text array
        );

        // All the possible condition.
        if (text.includes("how are you")) {
            p = document.createElement("p");
            p.classList.add("reply");
            p.innerText = "I am fine";
            texts.appendChild(p);
            textArray.push("repl.I am fine");
            localStorage.setItem(
                "previousChatForAIByShu-vro",
                JSON.stringify(textArray)
            );
        } else if (text.includes("hello") || text.includes("hii")) {
            p = document.createElement("p");
            p.classList.add("reply");
            p.innerText = "Hi, there!";
            texts.appendChild(p);
            textArray.push("repl.Hi, there!");
            localStorage.setItem(
                "previousChatForAIByShu-vro",
                JSON.stringify(textArray)
            );
        } else if (
            text.includes("what is your name") ||
            text.includes("what's your name")
        ) {
            p = document.createElement("p");
            p.classList.add("reply");
            p.textContent = "My name is Bro";
            texts.appendChild(p);
            textArray.push("repl.My name is Bro");
            localStorage.setItem(
                "previousChatForAIByShu-vro",
                JSON.stringify(textArray)
            );
        } else if (text.includes("thank")) {
            p = document.createElement("p");
            p.classList.add("reply");
            p.textContent = "Your Welcome.";
            texts.appendChild(p);
            textArray.push("repl.Your Welcome");
            localStorage.setItem(
                "previousChatForAIByShu-vro",
                JSON.stringify(textArray)
            );
        } else if (text.includes("delete conversation")) {
            p = document.querySelectorAll("p");
            let iframe = document.querySelectorAll("iframe");
            textArray = [];
            localStorage.setItem("previousChatForAIByShu-vro", [
                JSON.stringify(textArray),
            ]);
            iframe.forEach((frame) => {
                frame.remove();
            });
            p.forEach((para) => {
                para.remove();
            });
        } else if (text.includes("search")) {
            p = document.createElement("p");
            p.classList.add("reply");
            p.textContent = text.replace("search", "Searching");
            textArray.push("repl.Searching" + text.replace("search", ""));
            localStorage.setItem(
                "previousChatForAIByShu-vro",
                JSON.stringify(textArray)
            );
            text = text.replace(" ", "?q=");
            texts.appendChild(p);
            window.open("https://google.com/" + text);
        } else if (text.includes("YouTube")) {
            p = document.createElement("p");
            p.classList.add("reply");
            textArray.push("repl.Searching" + text.replace("YouTube", ""));
            localStorage.setItem(
                "previousChatForAIByShu-vro",
                JSON.stringify(textArray)
            );
            p.textContent = text.replace("YouTube", "Searching");
            text = text.replace(" ", "=");
            texts.appendChild(p);
            text = text.replace("YouTube", "");
            window.open("https://www.youtube.com/results?search_query" + text);
        } else if (text.includes("help")) {
            p = document.createElement("p");
            p.classList.add("reply");
            p.innerHTML = `Surely I can help you but first you have to understand my protocols and commands. But you can have a good chat with
            me. Let's know the commands I can perform.
            <ul>
                <li>Speak <b>Delete conversation</b> to clear the screen including all the previousChatForAIByShu-vro.</li>
                <li>Speak <b>Search</b> to search anything.</li>
                <li>Speak <b>YouTube</b> to search in <a href="https://www.youtube.com">YouTube</a>.</li>
                <li>Speak <b>Website</b> to go to a commercial website. <strong>Note: </strong> Website must be valid.</li>
                <li>Speak <b>I want to know about</b> to search your question in Wikipedia.</li>
                <li>Speak <b>'Time' or 'date'</b> to know time.</li>
            </ul>`;
            texts.appendChild(p);
        } else if (text.includes("website")) {
            p = document.createElement("p");
            p.classList.add("reply");
            text = text.replace("website ", "");
            p.textContent = "Opening " + "'" + text + "'...";
            textArray.push("repl.Opening " + text + "...");
            localStorage.setItem(
                "previousChatForAIByShu-vro",
                JSON.stringify(textArray)
            );
            texts.appendChild(p);
            window.open("https://" + text + ".com/");
        } else if (text.includes("date") || text.includes("time")) {
            p = document.createElement("p");
            p.classList.add("reply");
            const date = new Date();
            const options = { weekday: "long", month: "long", day: "numeric" };
            let day = date.toLocaleDateString("en-US", options);
            let time = date.toLocaleTimeString();
            p.textContent = time + ", " + day;
            textArray.push("repl." + time + ", " + day);
            localStorage.setItem(
                "previousChatForAIByShu-vro",
                JSON.stringify(textArray)
            );
            texts.appendChild(p);
        } else if (text.includes("I want to know about")) {
            p = document.createElement("p");
            p.classList.add("reply");
            text = text.replace("I want to know about", "");
            p.textContent =
                "I found this for you and taking to you to " +
                "'" +
                text +
                "'...";

            textArray.push(
                "repl." +
                    "I found this for you and taking to you to " +
                    "'" +
                    text +
                    "'..."
            );
            let windows = "https://en.wikipedia.org/w/index.php?search=" + text;
            let iframe = document.createElement("iframe");
            textArray.push(windows);
            // On Progress
            localStorage.setItem(
                "previousChatForAIByShu-vro",
                JSON.stringify(textArray)
            );
            iframe.src = windows;
            texts.appendChild(p);
            texts.appendChild(iframe);
        }
        // Else Will be coming soon...
        // else {
        //     p = document.createElement("p");
        //     p.classList.add("reply");
        //     p.textContent =
        //         "Sorry, I couldn't understand you. Please speak in English or say 'help' to know my commands. Thank you.";
        //     texts.appendChild(p);
        // }
        p = document.createElement("p");
        window.scrollBy(0, 10000);

        var speakWords = document.querySelectorAll("p.reply");
        var speaker = window.speechSynthesis;
        function speakFunction() {
            let inputIndex = speakWords.length - 1;
            var toSpeak = new SpeechSynthesisUtterance(
                speakWords[inputIndex].textContent
            );
            var voices = speaker.getVoices();
            toSpeak.voice = voices[3]; // 0 to 20
            toSpeak.pitch = 1; // 0 to 2
            toSpeak.rate = 1; // 0.1 to 10
            toSpeak.volume = 1; // 0 to 1
            toSpeak.lang = "en-US";
            speaker.speak(toSpeak);
        }
        speakFunction();
        window.scrollBy(0, 1000000); // Scroll the screen to bottom.
    }
});

// When the recognition is ended, it starts again.
recognition.addEventListener("end", () => {
    recognition.start();
});

// Starting the recognition.
recognition.start();
