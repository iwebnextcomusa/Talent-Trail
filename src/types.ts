export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface ProgramItem {
  id: string;
  name: string;
  ageRange: string;
  description: string;
  image: string;
  color: string;
  objectives: string[];
  activities: string[];
  benefits: string[];
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}
