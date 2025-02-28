function toggleChatWindow() {    
    // Get chatbot container dimensions
    const chatbotContainer = document.getElementById("chatbotContainer");
    const chatbotWidth = chatbotContainer.offsetWidth -100;
    const chatbotHeight = chatbotContainer.offsetHeight-50;

    // Send chatbot container dimensions to parent page
    window.parent.setIframeContainerDimensions(chatbotWidth, chatbotHeight);

    
    const chatWindow = document.getElementById("chatbot");
    chatWindow.classList.toggle("hidden");
    
    const logo = document.getElementById("logo");
    logo.classList.toggle("logo-hidden");
}

function updateSendButtonState(event) {
    const userInput = document.getElementById("userInput");
    const sendButton = document.querySelector(".send-button");

    if (event) {
        // Check if Enter key is pressed without Shift or Ctrl
        if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey) {
            event.preventDefault(); // Prevents the default Enter behavior (line break)
            sendMessage(); // Call the sendMessage function
        }

        // Check if Ctrl (or Shift) key is pressed along with Enter
        if ((event.ctrlKey || event.shiftKey) && event.key === "Enter") {
            // Insert a line break in the textarea
            userInput.value += "\n";
            userInput.scrollTop = userInput.scrollHeight; // Keep the cursor at the bottom
        }
    }

    // Update the send button state based on the content of the textarea
    if (userInput.value.trim() !== "") {
        sendButton.classList.add("active");
        userInput.classList.add("expanded");
    } else {
        sendButton.classList.remove("active");
        userInput.classList.remove("expanded");
    }
}



// Attach the updated event listener to the textarea
const userInput = document.getElementById("userInput");
userInput.addEventListener("keydown", updateSendButtonState);



function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();

    if (userInput !== "") {
        const chatMessages = document.getElementById("chatMessages");

        // Add user message to chat messages
        const userMessageContainer = document.createElement("div");
        userMessageContainer.className = "message user-message";

        const userIcon = document.createElement("img");
        userIcon.src = "../images/person-black.svg"; // Replace with the path to your user icon
        userIcon.className = "icon";
        userMessageContainer.appendChild(userIcon);

        const userMessage = document.createElement("span");
        userMessage.className = "message-text";
        userMessage.textContent = userInput;
        userMessageContainer.appendChild(userMessage);

        chatMessages.appendChild(userMessageContainer);

        // Scroll to the bottom of the chat messages
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Make API call
        const apiUrl = "https://apps.apisec.ai/chat";
        const requestBody = {
            question: userInput
        };

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
            // Add bot response to chat messages
            const botResponseContainer = document.createElement("div");
            botResponseContainer.className = "message bot-response";

            const botIcon = document.createElement("img");
            botIcon.src = "../images/favicon-32x32.png"; // Replace with the path to your bot icon
            botIcon.className = "icon";
            botResponseContainer.appendChild(botIcon);

            const botResponse = document.createElement("span");
            botResponse.className = "message-text";
            botResponse.textContent = data.Response; // Make sure this is the correct key in the API response
            botResponseContainer.appendChild(botResponse);

            chatMessages.appendChild(botResponseContainer);

            // Scroll to the bottom of the chat messages
            chatMessages.scrollTop = chatMessages.scrollHeight;
        })
        .catch(error => {
            console.error("Error fetching response:", error);
        });

        // Clear user input
        document.getElementById("userInput").value = "";

        // Re-disable the send button
        const sendButton = document.querySelector(".send-button");
        sendButton.classList.remove("active");
    }
}

function closeChatbot() {
    const chatbotContainer = document.getElementById("chatbot");
    chatbotContainer.classList.add("hidden");

    // Clear chat messages
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML = '';

    // Show the logo
    const logo = document.getElementById("logo");
    logo.classList.remove("logo-hidden");

    // Hide the help text
    helpMessage.style.opacity = "0";

    // Update help message visibility flag
    isHelpMessageVisible = false;

    const chatbotWidth = chatbotContainer.offsetWidth +100;
    const chatbotHeight = chatbotContainer.offsetHeight+50;
    
    // Send chatbot container dimensions to parent page
    window.parent.setIframeContainerDimensions(chatbotWidth, chatbotHeight);
}
function minimizeChatbot() {
    const chatbotContainer = document.getElementById("chatbot");
    chatbotContainer.classList.add("hidden");
    // Show the logo
    const logo = document.getElementById("logo");
    logo.classList.remove("logo-hidden");

    // Hide the help text
    helpMessage.style.opacity = "0";

    // Update help message visibility flag
    isHelpMessageVisible = false;
    const chatbotWidth = chatbotContainer.offsetWidth +100;
    const chatbotHeight = chatbotContainer.offsetHeight+50;
    
    // Send chatbot container dimensions to parent page
    window.parent.setIframeContainerDimensions(chatbotWidth, chatbotHeight);
}


const helpMessage = document.getElementById("helpMessage");

const logo = document.getElementById("logo");

let isHelpMessageVisible = true; // Help message is initially visible

logo.addEventListener("mouseenter", () => {
    helpMessage.style.opacity = "1";
});

logo.addEventListener("mouseleave", () => {
    helpMessage.style.opacity = "0";
});
logo.addEventListener("mouseover", () => {
    if (isHelpMessageVisible) {
        helpMessage.style.opacity = "1";
    }
});

logo.addEventListener("click", () => {
    helpMessage.style.display = "none";
});

// Wait for the iframe's content to load before accessing the logo
window.addEventListener('DOMContentLoaded', () => {
    // Get the logo element
    const logo = document.getElementById("logo");

    if (logo) {
        // Get logo dimensions
        const logoWidth = logo.offsetWidth;
        const logoHeight = logo.offsetHeight;

        // Send the logo dimensions to the parent page
        window.parent.setIframeContainerDimensions(logoWidth, logoHeight);
    }
});
