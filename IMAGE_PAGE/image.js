function previewImage(event) {
    var imagePreview = document.getElementById('imagePreview');
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    imagePreview.onload = function() {
        URL.revokeObjectURL(imagePreview.src); // Free memory
    }
}