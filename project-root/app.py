import markovify
import os
from flask import Flask, request, jsonify, render_template
import logging

# Set up logging for debugging and tracking the application flow
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)

logging.info("Loading texts...")

# Directory containing your collection of text files
text_directory = "trefry-massive"  # Relative path so that it works in Docker/Render

# Recursively load and combine all texts from the specified directory
combined_text = ""
unprocessed_files = []
file_count = 0

# Loop through files in the directory and append their content
for root, _, files in os.walk(text_directory):
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

#Log the summary of file processing
logging.info(f"\nCompleted processing files. {len(unprocessed_files)} files were skipped.")
logging.info(f"Length of combined text: {len(combined_text)}")

#If no text is loaded, raise an error
if len(combined_text) == 0:
    raise ValueError("No text data found to build the Markov model. Please ensure text files are present.")

#Build the Markov model
logging.info("\nBuilding Markov model...")
text_model = markovify.Text(combined_text, state_size=2)
logging.info("Markov model built successfully.")

#Define the home rout
@app.route("/")
def home():
        return render_template("index.html")

# Flask route to generate a paragraph with a specified number of sentences
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

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
