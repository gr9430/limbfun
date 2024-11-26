document.getElementById("generateBtn").addEventListener("click", function () {
    const apiURL = "https://recapitating-massive.onrender.com/generate_paragraph?num_sentences=5";
    const output = document.getElementById("output");

    output.innerText = "Loading..."; // Show a loading message while waiting for the response

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.paragraph) {
                output.innerText = data.paragraph; // Display the generated paragraph
            } else {
                output.innerText = "Error: No paragraph generated.";
            }
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            output.innerText = `Error: ${error.message}`;
        });
});
