async function handleSubmit(action) {
  const jobDescription = document.getElementById('job-description').value;
  const resumeFile = document.getElementById('resume-upload').files[0];

  if (!jobDescription || !resumeFile) {
    alert('Please provide both the job description and resume.');
    return;
  }

  const formData = new FormData();
  formData.append('jobDescription', jobDescription);
  formData.append('resume', resumeFile);
  formData.append('action', action);

  const responseOutput = document.getElementById('response-output');
  responseOutput.textContent = 'Processing...';

  try {
    const response = await fetch('https://backend-pythonats.onrender.com/process', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Server error: ${response.status}. Details: ${errorDetails}`);
    }

    const result = await response.json();
    if (result.error) {
      responseOutput.textContent = `Error: ${result.error}`;
    } else {
      responseOutput.innerHTML = marked.parse(result.message); // Render Markdown as HTML
    }
  } catch (error) {
    responseOutput.textContent = `Error: ${error.message}`;
    console.error('Fetch error:', error); // Log full error for debugging
  }
}
