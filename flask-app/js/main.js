function generateText() {
    fetch('/generate_paragraph?num_sentences=5')
        .then(response => response.json())
        .then(data => {
            document.getElementById('generated-text').textContent = data.paragraph;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('generated-text').textContent = "Error generating text.";
        });
}
