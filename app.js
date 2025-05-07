// Hide the flag using a base64-encoded string and decode it only when conditions are met
(function () {
    // Base64-encoded flag
    const encodedFlag = "UDJQe1gkJF9BcmVfM2FzeX0="; 

    // Decode the flag
    function decodeFlag(encoded) {
        return atob(encoded);
    }

    // Store whether the flag has already been revealed
    let flagRevealed = false;

    // Override the alert function
    const originalAlert = window.alert;
    window.alert = function (message) {
        // Call the original alert
        originalAlert(message);

        // Check if the alert was triggered by an XSS injection
        if (message === "XSS" && !flagRevealed) {
            // Dynamically reveal the flag
            revealFlag();
            flagRevealed = true; // Ensure the flag is revealed only once
        }
    };

    // Function to dynamically reveal the flag
    function revealFlag() {
        const flag = decodeFlag(encodedFlag); // Decode the hidden flag

        // Create a new paragraph element for the flag
        const flagElement = document.getElementById("flagOutput");
        flagElement.textContent = flag; // Set the decoded flag text
        flagElement.style.color = "#00ff00"; // Green text for visibility
        flagElement.style.backgroundColor = "#222222"; // Dark background for clarity
    }

    // Handle form submission
    document.getElementById("xssForm").addEventListener("submit", function (e) {
        e.preventDefault();

        // Get user input and output elements
        const userInput = document.getElementById("userInput").value;
        const output = document.getElementById("output");

        // Render user input directly (intentionally vulnerable for CTF)
        output.innerHTML = `<p>You entered: ${userInput}</p>`;
    });

    // Initialize the flag area with a placeholder value
    document.addEventListener("DOMContentLoaded", function () {
        const container = document.querySelector(".container");

        // Create and append a placeholder for the flag
        const flagPlaceholder = document.createElement("p");
        flagPlaceholder.id = "flagOutput";
        flagPlaceholder.textContent = "No flag for you"; // Placeholder text
        flagPlaceholder.style.color = "#ff0000"; // Red text for the placeholder
        flagPlaceholder.style.marginTop = "20px";
        flagPlaceholder.style.backgroundColor = "#222222";
        flagPlaceholder.style.padding = "10px";
        flagPlaceholder.style.borderRadius = "3px";
        container.appendChild(flagPlaceholder);
    });
})();