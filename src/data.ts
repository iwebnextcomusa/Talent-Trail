import { Testimonial, ProgramItem, FAQItem } from "./types";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Mother of Liam (3 years old)",
    text: "Talent Trail has been a blessing for our family. Liam's language skills have soared, and he wakes up excited for daycare every single morning! The educators are so loving and communicative.",
    rating: 5,
  },
  {
    id: 2,
    name: "David Chen",
    role: "Father of Mia (18 months)",
    text: "The infant care team is exceptional. As first-time parents, we were so anxious, but the level of safety, cleanliness, and sensory stimulation Mia receives gave us total peace of mind. White City is lucky to have this center!",
    rating: 5,
  },
  {
    id: 3,
    name: "Dr. Amanda Ross",
    role: "Mother of Owen (4.5 years)",
    text: "The Pre-K school readiness program is incredibly well-structured. Owen is already sounding out letters and understands basic math concepts. His transition to kindergarten is going to be seamless.",
    rating: 5,
  },
];

export const PROGRAMS: ProgramItem[] = [
  {
    id: "infant",
    name: "Infant Care Program",
    ageRange: "6 Weeks - 18 Months",
    description: "A nurturing and peaceful sanctuary where our youngest minds feel secure, loved, and responsive to their environment.",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77ebe?auto=format&fit=crop&q=80&w=800",
    color: "from-blue-400 to-indigo-500",
    objectives: [
      "Foster secure emotional attachment and basic trust",
      "Develop gross motor skills (rolling, sitting, crawling, and pulling up)",
      "Stimulate sensory-cognitive pathways through tactile and auditory experiences",
      "Encourage early vocalization and speech response",
    ],
    activities: [
      "Tummy time and guided rolling exercises",
      "Singing, nursery rhymes, and soft classical music sessions",
      "Sensory play with soft fabrics, rattles, and light reflections",
      "Outdoor buggy walks through the beautiful White City parks",
      "One-on-one interactive read-alouds with high-contrast books",
    ],
    benefits: [
      "Accelerated sensory processing and brain development",
      "Greater emotional stability and confidence in exploring surroundings",
      "Stronger physical coordination and muscle tone",
    ],
  },
  {
    id: "toddler",
    name: "Toddler Exploration Program",
    ageRange: "18 Months - 30 Months",
    description: "An active, sensory-rich program designed to channel boundless energy into positive social and cognitive growth.",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800",
    color: "from-emerald-400 to-teal-500",
    objectives: [
      "Encourage language expansion and phrase-level speaking",
      "Practice fine motor coordination (pincers, stack blocks, self-feeding)",
      "Introduce self-regulation, sharing, and peer interactions",
      "Support early independence and potty-training readiness",
    ],
    activities: [
      "Morning circle time with animated action songs and puppets",
      "Finger-painting, playdough molding, and kinetic sand sculpting",
      "Block stacking, sorting shapes, and simple block puzzles",
      "Guided outdoor sand box, climbing toys, and tricycle riding",
      "Daily routines focused on washing hands and putting away toys",
    ],
    benefits: [
      "Rapid expansion of cognitive comprehension and vocabulary",
      "Refined fine and gross motor skills",
      "Early mastery of healthy social and emotional boundaries",
    ],
  },
  {
    id: "preschool",
    name: "Preschool Learning Program",
    ageRange: "30 Months - 4 Years",
    description: "A play-based curriculum rich in cooperative activities, self-expression, and early science-math investigations.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
    color: "from-amber-400 to-orange-500",
    objectives: [
      "Establish complex cooperative play and emotional vocabulary",
      "Introduce foundational sorting, counting, and pattern identification",
      "Cultivate boundless creative expression and logic",
      "Strengthen attention span and ability to follow two-step directions",
    ],
    activities: [
      "Interactive dramatic play (mini grocery, kitchen, space station)",
      "Simple stem experiments (sink-or-float, mixing safe primary colors)",
      "Letter of the week recognition and phonemic awareness games",
      "Arts & crafts matching themes like autumn, animals, or space",
      "Active team-building playground games and relay sports",
    ],
    benefits: [
      "Advanced social skills and self-coping strategies",
      "Excitement for scientific inquiry and abstract mathematical logic",
      "Robust self-confidence and unique artistic personality expression",
    ],
  },
  {
    id: "readiness",
    name: "School Readiness & Pre-K",
    ageRange: "4 Years - 5 Years",
    description: "An enriching, structured transition program designed to prepare children socially, emotionally, and academically for Kindergarten.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800",
    color: "from-rose-400 to-pink-500",
    objectives: [
      "Develop reading readiness (letter-sound pairing, sight words)",
      "Master mathematical concepts (counting to 100, basic addition patterns)",
      "Nurture executive functions (self-regulation, focus, organizing materials)",
      "Foster high independence, critical thinking, and citizenship",
    ],
    activities: [
      "Phonics workshops and pre-writing journals",
      "Math math-manipulatives, measuring tape and scale games",
      "Structured teamwork research projects (e.g., studying dinosaurs)",
      "Classroom helper roles (calendar leader, snack distributor)",
      "Show-and-Tell speaking engagements and dynamic debates",
    ],
    benefits: [
      "Absolute academic preparedness for Saskatchewan Kindergarten curriculum",
      "Flawless adaptability to classroom structure and social situations",
      "Highly developed executive functions and positive self-esteem",
    ],
  },
];

export const APPROACHES = [
  {
    title: "Play-Based Learning",
    description: "Play is a child's work. We utilize structured play to explore scientific concepts, solve puzzles, and develop critical thinking naturally.",
    icon: "Sparkles",
    color: "bg-blue-100 text-blue-600 border-blue-200",
  },
  {
    title: "Social & Emotional Development",
    description: "Helping children identify their feelings, practice empathy, collaborate on projects, and build lifelong friendships in a loving environment.",
    icon: "Heart",
    color: "bg-rose-100 text-rose-600 border-rose-200",
  },
  {
    title: "Creativity & Exploration",
    description: "Vibrant art studios, music circles, sensory tables, and building blocks allow self-expression to bloom without restrictions.",
    icon: "Palette",
    color: "bg-amber-100 text-amber-600 border-amber-200",
  },
  {
    title: "Literacy & Numeracy Foundations",
    description: "Daily reading, letter-sound games, counting manipulatives, and real-world math applications to spark a passion for learning early.",
    icon: "BookOpen",
    color: "bg-emerald-100 text-emerald-600 border-emerald-200",
  },
  {
    title: "Outdoor & Physical Activities",
    description: "Our expansive custom playground and guided nature walks ensure daily exercise, physical confidence, and deep respect for nature.",
    icon: "Trees",
    color: "bg-purple-100 text-purple-600 border-purple-200",
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "What age groups do you accept for enrollment?",
    answer: "We welcome children starting as young as 6 weeks old up to 5 years of age (entering Kindergarten). Our learning environments are strictly separated by age-appropriate developmental groups (Infants, Toddlers, Preschool, and Pre-K).",
  },
  {
    id: 2,
    question: "What are your operating hours and schedule?",
    answer: "We are open Monday through Friday from 7:00 AM to 6:00 PM, year-round. We are closed on all Saskatchewan statutory holidays.",
  },
  {
    id: 3,
    question: "How do we enroll our child or join the waitlist?",
    answer: "Enrollment starts with scheduling a tour! You can request a tour or submit an inquiry using our online form or by calling us at 306-737-7002. If our programs are currently full, you will be offered a spot on our priority waitlist.",
  },
  {
    id: 4,
    question: "What safety, security, and cleaning measures are in place?",
    answer: "Safety is our top priority. Our facility features secure keypad entries where only authorized family members can access. All classrooms and toys are deeply sanitized multiple times a day. Furthermore, all educators are fully ECE-certified with current First Aid/CPR training and have undergone rigorous background and criminal record checks.",
  },
  {
    id: 5,
    question: "What items should my child bring on their first day?",
    answer: "Parents should provide: a complete change of clothes (season-appropriate), indoor soft-soled shoes, a water bottle, a fitted sheet & blanket for naptime, and sunscreen/hat. For infants, please also provide diapers, wipes, and formula/prepared bottles.",
  },
];

export const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
    title: "Modern Classrooms",
    tag: "Learning Space",
  },
  {
    url: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=800",
    title: "Outdoor Adventures",
    tag: "Active Play",
  },
  {
    url: "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&q=80&w=800",
    title: "Sensory Toys & Blocks",
    tag: "Exploration",
  },
  {
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
    title: "Arts & Finger Painting",
    tag: "Creativity",
  },
  {
    url: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800",
    title: "STEM Discovery Station",
    tag: "Science",
  },
  {
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
    title: "Cozy Storytelling Corner",
    tag: "Literacy",
  },
];
