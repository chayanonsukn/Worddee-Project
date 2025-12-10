const API_BASE_URL = 'http://localhost:8000/api';

export const fetchRandomWord = async () => {
  const response = await fetch(`${API_BASE_URL}/word`);
  if (!response.ok) throw new Error('Failed to fetch word');
  return response.json();
};

export const validateSentence = async (word, sentence) => {
  const response = await fetch(`${API_BASE_URL}/validate-sentence`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word, sentence }),
  });
  if (!response.ok) throw new Error('Failed to validate sentence');
  return response.json();
};

export const fetchSummary = async () => {
  const response = await fetch(`${API_BASE_URL}/summary`);
  if (!response.ok) throw new Error('Failed to fetch summary');
  return response.json();
};
