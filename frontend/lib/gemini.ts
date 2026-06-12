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

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey.trim()}`;

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
  let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error('Invalid response structure from Gemini API.');
  }

  text = text.trim();
  if (text.startsWith('```')) {
    text = text.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '');
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

export async function analyzeResumeWithGemini(apiKey: string, resumeText: string, targetRole: string) {
  if (!apiKey) throw new Error('No Gemini API key provided.');

  const prompt = `Act as an Expert Technical Recruiter. Analyze this resume for the target role: "${targetRole}".
  
  Resume Text:
  """
  ${resumeText}
  """

  Return ONLY a valid JSON object with the exact following schema, nothing else:
  {
    "matchScore": 85, // number 0-100
    "strengths": ["Strength 1", "Strength 2"], // array of 2-3 strings
    "missingKeywords": ["Keyword 1", "Keyword 2"], // array of 2-4 strings
    "rewrites": [
      {
        "original": "Did some python coding for data",
        "improved": "Engineered scalable Python data pipelines processing 10GB+ daily, improving query performance by 40%."
      }
    ] // array of 1-2 rewrite objects
  }
  Do not wrap the JSON in markdown code blocks, return raw JSON string.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey.trim()}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2, // lower temp for more analytical response
        responseMimeType: "application/json",
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API Error:', errorText);
    throw new Error('Failed to analyze resume with Gemini API.');
  }

  const data = await response.json();
  let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error('Invalid response structure from Gemini API.');
  }

  text = text.trim();
  if (text.startsWith('```')) {
    text = text.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '');
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('Failed to parse Gemini JSON:', text);
    throw new Error('Failed to parse the resume analysis from Gemini API.');
  }
}

export async function generateOutreachMessage(apiKey: string, resumeText: string, targetRole: string, company: string, jobRole: string) {
  if (!apiKey) throw new Error('No Gemini API key provided.');

  const prompt = `Act as an expert career coach and copywriter. Draft a short, highly persuasive cold outreach email to a recruiter at "${company}" for the role of "${jobRole}".
  
  Use this candidate's resume to highlight 1-2 specific achievements that make them a perfect fit:
  """
  ${resumeText}
  """

  The email should:
  1. Have a catchy subject line.
  2. Be no more than 150 words.
  3. Be professional, confident, and slightly enthusiastic.
  4. End with a clear call to action for a quick chat.

  Return ONLY a valid JSON object with the exact following schema, nothing else:
  {
    "subject": "The email subject line",
    "body": "The full email body including greeting and sign-off. Use \n for line breaks."
  }
  Do not wrap the JSON in markdown code blocks, return raw JSON string.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey.trim()}`;

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
    throw new Error('Failed to generate outreach message with Gemini API.');
  }

  const data = await response.json();
  let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error('Invalid response structure from Gemini API.');
  }

  text = text.trim();
  if (text.startsWith('```')) {
    text = text.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '');
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('Failed to parse Gemini JSON:', text);
    throw new Error('Failed to parse outreach message from Gemini API.');
  }
}


