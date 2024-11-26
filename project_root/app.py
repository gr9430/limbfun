import markovify
import os
from flask import Flask, request, jsonify, render_template
import logging

# Set up logging for debugging and tracking the application flow
logging.basicConfig(level=logging.INFO)

# Initialize Flask app
app = Flask(__name__)

# Function to list directory contents for debugging purposes
def list_directory_contents(directory):
    if os.path.exists(directory):
        logging.info(f"Listing contents of the directory '{directory}':")
        for root, _, files in os.walk(directory):
            for filename in files:
                logging.info(f" - {os.path.join(root, filename)}")
    else:
        logging.error(f"Directory '{directory}' does not exist.")

# Set the correct path to the text directory
current_directory = os.path.dirname(os.path.abspath(__file__))
text_directory = os.path.join(current_directory, "trefry-massive")


# List the contents of the directory to verify
list_directory_contents(text_directory)

# Add debug logs to verify path
if not os.path.exists(text_directory):
    logging.error(f"Error: The directory '{text_directory}' does not exist.")
    raise FileNotFoundError(f"The directory '{text_directory}' does not exist. Please verify the path.")

# Recursively load and combine all texts from the specified directory
logging.info("Loading texts...")

combined_text = ""
unprocessed_files = []
file_count = 0

for root, _, files in os.walk(text_directory):
    if not files:
        logging.warning(f"No text files found in the directory: {root}")

    for filename in files:
        if filename.endswith(".txt"):
            file_path = os.path.join(root, filename)
            try:
                with open(file_path, "r", encoding="utf-8") as file:
                    combined_text += file.read() + "\n"
            except UnicodeDecodeError:
                # If there's an error reading with UTF-8, try with ISO-8859-1
                try:
                    with open(file_path, "r", encoding="ISO-8859-1") as file:
                        combined_text += file.read() + "\n"
                except Exception as e:
                    unprocessed_files.append(file_path)
                    logging.warning(f"Warning: Could not process file {file_path} due to error: {e}")
            file_count += 1

logging.info(f"Completed processing files. {file_count} files were processed. {len(unprocessed_files)} files were skipped.")
logging.info(f"Length of combined text: {len(combined_text)}")

if len(combined_text) == 0:
    raise ValueError("No text data found to build the Markov model. Please ensure text files are present.")

logging.info("\nBuilding Markov model...")
text_model = markovify.Text(combined_text, state_size=2)
logging.info("Markov model built successfully.")

# Define Flask routes
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/generate_paragraph", methods=["GET"])
def generate_paragraph():
    try:
        num_sentences = int(request.args.get("num_sentences", 5))
        sentences = []

        for _ in range(num_sentences):
            sentence = None
            attempts = 0
            while sentence is None and attempts < 5:
                sentence = text_model.make_sentence()
                attempts += 1

            if sentence:
                sentences.append(sentence)

        if len(sentences) == 0:
            return jsonify({"error": "Unable to generate sentences."}), 500

        paragraph = " ".join(sentences)
        return jsonify({"paragraph": paragraph})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Main entry point to run the application
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    logging.info(f"Starting Flask server on port {port}")
    app.run(host="0.0.0.0", port=port)
