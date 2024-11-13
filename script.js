
  document.getElementById('feedback').addEventListener('click', function(event) {
    // Prevent the form from submitting immediately
    event.preventDefault();

    // Validate the form fields
    var name = document.querySelector('input[name="name"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var message = document.querySelector('textarea[name="message"]').value;

    if (name === '' || email === '' || message === '') {
      alert('Please fill in all fields.');
    } else {
      // If validation passes, submit the form
      document.querySelector('form').submit();
    }
  });

