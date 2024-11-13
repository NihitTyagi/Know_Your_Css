// document.getElementById('feedback').addEventListener('click', (e)=> {
//   alert('Feedback received');
//     this.reset(); // Resets all form fields
//   });


  document.getElementById('feedback').addEventListener('click', async (e) => {
    e.preventDefault();
    const name = document.querySelector('input[type="text"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const message = document.querySelector('textarea').value;

    const response = await fetch('/send-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      alert('Feedback sent successfully');
    } else {
      alert('Failed to send feedback');
    }
  });

