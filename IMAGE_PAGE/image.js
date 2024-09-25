const appliedStyles = new Map();

// Function to preview the uploaded image
function previewImage(event) {
    const image = document.getElementById('imagePreview');
    image.src = URL.createObjectURL(event.target.files[0]);
    image.onload = function () {
        URL.revokeObjectURL(image.src); // Free memory
    }
}

// Apply styles to the image and toggle between "Apply" and "Applied"
document.querySelectorAll('button[data-style]').forEach(button => {
    button.addEventListener('click', function () {
        const style = this.getAttribute('data-style');
        const value = this.getAttribute('data-value');

        

        const image = document.getElementById('imagePreview');
        if (image.src && image.src !== window.location.href) {
            // Toggle between applying and removing the style
            if (this.textContent === 'Apply') {
                // Apply the style to the image
                image.style[style] = value;

                // Store the applied style for copying
                appliedStyles.set(style, value);

                // Change button text to "Applied"
                this.textContent = 'Applied';
            } else {
                // Remove the style from the image
                image.style[style] = '';

                // Remove the style from the appliedStyles map
                appliedStyles.delete(style);

                // Change button text back to "Apply"
                this.textContent = 'Apply';
            }
        } else {
            alert("No image uploaded");
        }

        document.querySelectorAll(`button[data-style="${style}"]`).forEach(otherButton => {
            if (otherButton !== this && otherButton.textContent === 'Applied') {
                // Reset other buttons with the same data-style to 'Apply'
                otherButton.textContent = 'Apply';

                // Remove the style from the output
                output.style[style] = '';

                // Remove the style from appliedStyles map
                appliedStyles.delete(style);
            }
        });
    });
});

// Clear button to reset the image and styles
document.getElementById('clear').addEventListener('click', function () {
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent === 'Applied') {
            button.textContent = 'Apply';
        }
    });

    const image = document.getElementById('imagePreview');
    image.src = '';
    image.style = '';

    // Clear applied styles map
    appliedStyles.clear();

    // Reset file input field
    document.querySelector('input[type="file"]').value = '';
});

// Function to copy the applied CSS to clipboard
document.getElementById('copyBtn').addEventListener('click', function () {
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

