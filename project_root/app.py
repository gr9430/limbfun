import markovify
import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Import flask-cors for handling CORS
import logging

# Set up logging for debugging and tracking the application flow
logging.basicConfig(level=logging.INFO)

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for specific origins
CORS(app, origins=["https://gr9430.github.io"])  # Allow requests from your GitHub Pages

# Set the correct path to the text directory
current_directory = os.path.dirname(os.path.abspath(__file__))
text_directory = os.path.join(current_directory, "trefry-massive")

# Verify the text directory exists
if not os.path.exists(text_directory):
    logging.error(f"Error: The directory '{text_directory}' does not exist.")
    raise FileNotFoundError(f"The directory '{text_directory}' does not exist. Please verify the path.")

# Load and combine all texts from the specified directory
logging.info("Loading texts...")
combined_text = ""
unprocessed_files = []
file_count = 0

# List of encodings to try for each file
encodings = ['utf-8', 'ISO-8859-1', 'cp1252']

for root, _, files in os.walk(text_directory):
    for filename in files:
        if filename.endswith(".txt"):
            file_path = os.path.join(root, filename)
            success = False
            for encoding in encodings:
                try:
                    with open(file_path, "r", encoding=encoding) as file:
                        combined_text += file.read() + "\n"
                        success = True
                        break  # Exit the loop if the file was successfully read
                except Exception as e:
                    continue  # Try the next encoding

            if not success:
                unprocessed_files.append(file_path)
                logging.warning(f"Warning: Could not process file {file_path} due to encoding issues.")
            file_count += 1

logging.info(f"Completed processing files. {file_count} files were processed. {len(unprocessed_files)} files were skipped.")
logging.info(f"Length of combined text: {len(combined_text)}")

if len(combined_text) == 0:
    raise ValueError("No text data found to build the Markov model. Please ensure text files are present.")

# Build the Markov model
logging.info("Building Markov model...")
text_model = markovify.Text(combined_text, state_size=2)
logging.info("Markov model built successfully.")

# Define Flask routes
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/generate_paragraph", methods=["GET"])
def generate_paragraph():
    try:
        # Get the number of sentences to generate from the request (default: 5)
        num_sentences = int(request.args.get("num_sentences", 5))
        sentences = []

        # Generate the specified number of sentences
        for _ in range(num_sentences):
            sentence = text_model.make_sentence()
            if sentence:
                sentences.append(sentence)

        # If no sentences could be generated, return an error
        if len(sentences) == 0:
            return jsonify({"error": "Unable to generate sentences."}), 500

        # Combine sentences into a paragraph
        paragraph = " ".join(sentences)
        return jsonify({"paragraph": paragraph})

    except Exception as e:
        # Handle any exceptions and return an error message
        logging.error(f"Error generating paragraph: {e}")
        return jsonify({"error": str(e)}), 500

# Main entry point to run the application
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    logging.info(f"Starting Flask server on port {port}")
    app.run(host="0.0.0.0", port=port)
