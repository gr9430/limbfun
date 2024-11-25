import markovify
import os
import random
import time

print("Loading texts...")

# Directory containing your collection of text files
text_directory = r"C:\Users\omenm\Documents\GitHub\ENG6806\trefry-massive"

# Recursively load and combine all texts from the specified directory
combined_text = ""
file_count = 0
unprocessed_files = []

total_files = sum(len(files) for _, _, files in os.walk(text_directory) if files)

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
            print(f"Processed {file_count}/{total_files} files...", end="\r")

print(f"\nCompleted processing files. {len(unprocessed_files)} files were skipped.")

print("\nBuilding Markov model...")

# Adjust state size to 2 to allow more flexibility in generation
text_model = markovify.Text(combined_text, state_size=2)

print("Markov model built successfully.")

def generate_paragraph(min_sentences=5, max_sentences=10):
    paragraph = []
    sentences_count = random.randint(min_sentences, max_sentences)
    used_sentences = set()
    for i in range(sentences_count):
        sentence = None
        tries = 0
        # Generate a valid and unique sentence
        while (sentence is None or sentence in used_sentences) and tries < 30:
            sentence = text_model.make_sentence(tries=30, max_overlap_ratio=0.8, max_overlap_total=8, min_chars=30, max_chars=200)
            tries += 1
            if tries >= 30 and sentence is None:
                print(f"Warning: Failed to generate a valid sentence after {tries} tries for sentence {i + 1}/{sentences_count}")
        if sentence:
            used_sentences.add(sentence)
            paragraph.append(sentence)
        # Print status update for each sentence generated
        print(f"Generating sentence {i + 1}/{sentences_count} for current paragraph...", end="\r")
        time.sleep(0.1)  # Add a small delay to make the status update readable
    return " ".join(paragraph)

print("Generating paragraphs...")

# Generate and print unique paragraphs
for i in range(2):  # Increase to 2 paragraphs for now
    print(f"\n--- Generating Paragraph {i + 1} ---")
    paragraph = generate_paragraph(min_sentences=7, max_sentences=12)  # Increase sentence count for more depth
    if paragraph and "[No valid sentence generated]" not in paragraph:
        print(f"\n--- Paragraph {i + 1} ---\n{paragraph}")
    else:
        print(f"\n--- Paragraph {i + 1} ---\n[No valid paragraph generated]")

print("\nFinished.")
