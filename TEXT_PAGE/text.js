const appliedStyles = new Map();

// Function to apply or remove styles on the output div
document.querySelectorAll('button[data-style]').forEach(button => {
    button.addEventListener('click', function() {
        const style = this.getAttribute('data-style');
        const value = this.getAttribute('data-value');
        const output = document.getElementById('outputText');
        const inputText = document.getElementById('inputText').value; // Get the input text value

        // Check if the input field is empty
        if (!inputText.trim()) {
            alert("Please enter a text first.");
            return; // Exit the function early if no text is entered
        }

        document.querySelectorAll(`button[data-style="${style}"]`).forEach(otherButton => {
            if (otherButton !== this && otherButton.textContent === 'Remove') {
                // Reset other buttons with the same data-style to 'Apply'
                otherButton.textContent = 'Apply';

                // Remove the style from the output
                output.style[style] = '';

                // Remove the style from appliedStyles map
                appliedStyles.delete(style);
            }
        });

        if (this.textContent === 'Apply') {
            // Apply the style to the output div
            output.style[style] = value;

            // Also apply the styles to the input text
            output.textContent = inputText;

            // Store the applied style for later copying
            appliedStyles.set(style, value);

            // Change button text to "Remove"
            this.textContent = 'Remove';
        } else {
            // Remove the style from the output div
            output.style[style] = '';

            // Remove the style from the appliedStyles map
            appliedStyles.delete(style);

            // Change button text back to "Apply"
            this.textContent = 'Apply';
        }
    });
});


// Clear button to reset styles
document.getElementById('clear').addEventListener('click', function() {
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent === 'Remove') {
            button.textContent = 'Apply';
        }
    });

    // Clear input/output text
    const output = document.getElementById('outputText');
    output.textContent = '';
    document.getElementById('inputText').value = '';

    // Reset applied styles
    appliedStyles.clear();

    // Remove all styles from the output div
    output.removeAttribute('style');
});

// Function to copy the applied CSS to clipboard
document.getElementById('copyBtn').addEventListener('click', function() {
    let cssText = '';
    appliedStyles.forEach((value, style) => {
        cssText += `${style}: ${value};\n`;
    });

    // Copy the CSS styles to the clipboard
    navigator.clipboard.writeText(cssText).then(() => {
        alert("Applied CSS copied to clipboard!");
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });
});
