export async function generateJobsFromGemini(apiKey: string, role: string, location: string) {
  if (!apiKey) throw new Error('No Gemini API key provided.');

  const prompt = `Act as an AI Job Search Engine. Find or generate 3 highly realistic, real-world job listings for a "${role}" located in or remote for "${location}". 
  Return ONLY a valid JSON array of objects with the exact following schema, nothing else:
  [
    {
      "company": "Company Name",
      "role": "Job Title",
      "status": "applied",
      "matchScore": 80-99 (number),
      "date": "Just now",
      "logo": "First letter of company",
      "matchReason": "A 1-sentence explanation of why this role matches a ${role} profile."
    }
  ]
  Do not wrap the JSON in markdown code blocks, return raw JSON string.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API Error:', errorText);
    throw new Error('Failed to generate jobs from Gemini API.');
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error('Invalid response structure from Gemini API.');
  }

  try {
    const jobs = JSON.parse(text);
    if (Array.isArray(jobs)) {
      return jobs;
    }
    throw new Error('Gemini did not return an array.');
  } catch (e) {
    console.error('Failed to parse Gemini JSON:', text);
    throw new Error('Failed to parse the job data from Gemini API.');
  }
}
