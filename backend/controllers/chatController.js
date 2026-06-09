import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not defined in .env");
}

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemInstruction = `You are FitYaarBot, a compassionate and supportive AI assistant for a mental wellness app. Your role is to listen, provide gentle support, and offer evidence-based mindfulness techniques or positive affirmations. You are NOT a therapist and must not provide medical advice or diagnoses. If a user seems to be in crisis, gently guide them to the "Crisis Support" section of the app or suggest they call 988. Be warm, empathetic, and concise.`;

const getAIChatReply = async (req, res) => {
  const { history, message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const formattedHistory = (history || []).map(msg => ({
      role: msg.type === 'bot' ? 'assistant' : 'user',
      content: msg.text,
    }));

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
      messages: [
        { role: "system", content: systemInstruction },
        ...formattedHistory,
        { role: "user", content: message }
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({ reply: "I'm having a little trouble thinking right now. Please try again." });
  }
};

export default { getAIChatReply };