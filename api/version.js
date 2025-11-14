export default async function handler(req, res) {
  try {
    const response = await fetch('https://auth.breadbreakers.sg');
    const text = await response.text();
    res.status(200).json({ message: 'Success', body: text });
  } catch (error) {
    res.status(500).json({ 
      error: 'SSL connection failed', 
      details: error.message,
      code: error.code,
      cause: error.cause,
      stack: error.stack 
    });
  }
}