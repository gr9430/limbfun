from flask import Flask, request, jsonify
from flask_cors import CORS
import markovify
import os

app = Flask(__name__)
CORS(app)  # This will allow your frontend to communicate with this backend.

# Load and combine text files
print("Loading texts...")
text_directory = r"C:\Users\omenm\Documents\GitHub\ENG6806\trefry-massive"
combined_text = ""

for root, _, files in os.walk(text_directory):
    for filename in files:
        if filename.endswith(".txt"):
            file_path = os.path.join(root, filename)
            try:
                with open(file_path, "r", encoding="utf-8") as file:
                    combined_text += file.read() + "\n"
            except UnicodeDecodeError:
                try:
                    with open(file_path, "r", encoding="ISO-8859-1") as file:
                        combined_text += file.read() + "\n"
                except Exception as e:
                    print(f"Warning: Could not process file {file_path} due to error: {e}")

# Build the Markov model
print("Building Markov model...")
text_model = markovify.Text(combined_text, state_size=2)
print("Markov model built successfully.")

# API endpoint to generate text
@app.route('/generate', methods=['GET'])
def generate_text():
    num_sentences = request.args.get('num_sentences', default=5, type=int)
    paragraph = []

    for _ in range(num_sentences):
        sentence = text_model.make_sentence(tries=30)
        if sentence:
            paragraph.append(sentence)

    return jsonify({"text": " ".join(paragraph)})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
