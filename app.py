import markovify
import os
from flask import Flask, request, jsonify

print("Loading texts...")

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
                    print(f"Warning: Could not process file {file_path} due to error: {e}")
            file_count += 1

print(f"\nCompleted processing files. {len(unprocessed_files)} files were skipped.")
print(f"Length of combined text: {len(combined_text)}")

if len(combined_text) == 0:
    raise ValueError("No text data found to build the Markov model. Please ensure text files are present.")

print("\nBuilding Markov model...")
text_model = markovify.Text(combined_text, state_size=2)
print("Markov model built successfully.")

# Flask app setup
app = Flask(__name__)

@app.route('/generate_paragraph', methods=['GET'])
def generate_paragraph():
    num_sentences = int(request.args.get("num_sentences", 5))
    paragraph = ""
    for _ in range(num_sentences):
        sentence = text_model.make_sentence(tries=100)
        if sentence:
            paragraph += sentence + " "

    return jsonify({"paragraph": paragraph.strip()})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
