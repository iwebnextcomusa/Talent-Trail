import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Parse JSON bodies
app.use(express.json());

// Initialize Gemini client on the server securely
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Chatbot will run in simulation mode.");
}

// Chatbot System Instructions
const SYSTEM_INSTRUCTIONS = `
You are a warm, welcoming, and helpful AI Parent Assistant for TALENT TRAIL EARLY LEARNING CORP, a premier daycare and early childhood learning center in White City, Saskatchewan (SK), Canada.
Your main goals are to build trust with parents, showcase our safe, nurturing, and educational environment, explain our programs and philosophy, and encourage them to schedule a tour or enroll their child.

Key Center Details:
- Name: TALENT TRAIL EARLY LEARNING CORP
- Location: White City, Saskatchewan (SK), Canada
- Phone: 306-737-7002
- Email: emekaelemamba@me.com
- Hours: Monday to Friday, 7:00 AM - 6:00 PM
- Contact Info: Tel: 306-737-7002 | Email: emekaelemamba@me.com
- Main Philosophy: Play-based learning, child-centered curriculum, social-emotional development, creativity, physical/outdoor activity, and solid early literacy & numeracy foundations.

Our Programs:
1. Infant Care (Ages 6 weeks - 18 months)
   - Objectives: Safe, nurturing, responsive, sensory exploration.
   - Activities: Tummy time, music/singing, tactile play, outdoor buggy rides.
2. Toddler Program (Ages 18 months - 30 months)
   - Objectives: Social interaction, motor skills, self-help skills, vocabulary expansion.
   - Activities: Circle time, sorting games, painting, outdoor sand & water play.
3. Preschool Program (Ages 30 months - 4 years)
   - Objectives: Cooperative play, emotional regulation, independence, early scientific inquiry.
   - Activities: Role play, dramatic play, simple science projects, puzzle building.
4. Early Learning & School Readiness (Ages 4 - 5 years)
   - Objectives: Phonics awareness, counting, logic, school readiness, executive functioning.
   - Activities: Pre-writing journals, math manipulatives, structured games, group projects.

Safety Measures:
- Secure keypad entries to the building.
- All educators have certified ECE qualifications, first aid/CPR, and criminal record background checks.
- Daily sanitization protocols and strict illness-prevention guidelines.
- Spacious, fenced-in outdoor playground customized for various ages.

Tone: Professional, compassionate, reassuring, and family-oriented. Maintain Saskatchewan community-friendly warmth.
Response Guidelines: Keep responses brief, engaging, and directly helpful. Always end with an invitation to schedule a tour, call 306-737-7002, or fill out our online form!
`;

// API routes first
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", firebase: false, googleGenAIReady: !!ai });
});

app.post("/api/chat", async (req, res) => {
  const { messages, message } = req.body;
  
  if (!message && (!messages || messages.length === 0)) {
    return res.status(400).json({ error: "No user message provided." });
  }

  // Fallback if API key is not set
  if (!ai) {
    const defaultResponse = "Thank you for asking! Talent Trail Early Learning Corp in White City is dedicated to offering a nurturing environment for infants, toddlers, and preschoolers. To schedule a tour, please call us at 306-737-7002 or email us at emekaelemamba@me.com!";
    return res.json({ text: defaultResponse });
  }

  try {
    // Standard contents format
    let userPrompt = message || messages[messages.length - 1]?.text || messages[messages.length - 1]?.content;
    
    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I am here to help you with any questions about our daycare. Please contact us at 306-737-7002 to schedule a tour!";
    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Error communicating with Gemini API:", error);
    res.status(500).json({ 
      error: "Error generating response", 
      details: error.message || "An unexpected error occurred." 
    });
  }
});

// Configure Vite or Serve static assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware loaded.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files server configured.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
