// controllers/chatgpt.controller.js
import OpenAI from 'openai'

const openai = new OpenAI()

/**
 * Procesa la petición al endpoint /api/chat 
 */
export const createChatCompletion = async (req, res) => {
  try {
    const { messages } = req.body

    // Llamada al API de OpenAI
    const response = await openai.responses.create({
      model: 'gpt-4o-mini',
      input: messages,
    })

    // Devuelve al cliente solo la parte que interese
    res.json(response.output_text)
  } catch (err) {
    console.error('OpenAI error:', err)
    res.status(500).json({ error: 'Error interno al llamar a OpenAI' })
  }
}
