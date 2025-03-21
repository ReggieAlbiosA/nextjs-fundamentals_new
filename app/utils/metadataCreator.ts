import nlp from "compromise";

/**
 * Transforms a description by finding the shortest sentence with the person's name
 * and adding "Tribute: " after the name, without character limit.
 * @param description - Any description text string.
 * @returns The transformed shortest sentence with the name.
 */
export function titleMetadataCreator(description: string): string {
    if (!description?.trim()) return "";

    // Split into sentences
    const sentences = description.split(".").map(s => s.trim()).filter(s => s.length > 0);

    // Detect the person's name from the first occurrence
    let personName: string | null = null;
    for (const sentence of sentences) {
        const doc = nlp(sentence);
        const detectedName = doc.people().out("text");
        if (detectedName) {
            personName = detectedName;
            break; // Use the first detected name as the reference
        }
    }

    if (!personName) return sentences[0] ? `${sentences[0]}.` : ""; // Fallback to first sentence

    // Find all sentences containing the person's name and pick the shortest
    const sentencesWithName = sentences
        .map(sentence => ({ text: sentence, doc: nlp(sentence) }))
        .filter(({ doc }) => doc.people().out("text") === personName)
        .map(({ text }) => text + "."); // Re-add period

    if (sentencesWithName.length === 0) return `${personName} Tribute:`; // Fallback if no matches

    const shortestSentence = sentencesWithName.reduce((shortest, current) =>
        current.length < shortest.length ? current : shortest
    );

    // Add "Tribute: " after the name in the shortest sentence
    const result = shortestSentence.replace(personName, `${personName} Tribute:`);

    return result;
}

export function descriptionMetadataCreator(description: string): string {
    if (!description) return ""; // Handle empty input

    const sentences = description.split(". "); // Split into sentences
    sentences.shift(); // Remove the first sentence

    for (const sentence of sentences) {
        if (sentence.length <= 160) {
            return sentence.trim() + "."; // Return the first valid sentence
        }
    }
    
    return ""; // Return empty if no sentence meets the criteria
}