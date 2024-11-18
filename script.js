document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('reason-btn').addEventListener('click', () => handleSubmit('reason'));
  document.getElementById('improve-btn').addEventListener('click', () => handleSubmit('improve'));
  document.getElementById('keywords-btn').addEventListener('click', () => handleSubmit('keywords'));
});

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
      const response = await fetch('https://backend-python-ats.vercel.app/process', {
          method: 'POST',
          body: formData,
      });

      if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      if (result.error) {
          responseOutput.textContent = `Error: ${result.error}`;
      } else {
          // Render Markdown as HTML using Marked.js
      responseOutput.innerHTML = marked.parse(result.message);
    }
  } catch (error) {
      responseOutput.textContent = `Error: ${error.message}`;
  }
}
