import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Heart,
  BookOpen,
  Palette,
  Trees,
  CheckCircle,
  ChevronDown,
  Menu,
  X,
  Calendar,
  User,
  Baby,
  Activity,
  Award,
} from "lucide-react";
import { TESTIMONIALS, PROGRAMS, APPROACHES, FAQS, GALLERY_IMAGES } from "./data";
import Playroom3D from "./components/Playroom3D";
import AIChatbot from "./components/AIChatbot";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Program tab state
  const [selectedProgram, setSelectedProgram] = useState("infant");

  // Gallery filter state
  const [galleryFilter, setGalleryFilter] = useState("all");

  // FAQ accordion state
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Form states and validation
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    email: "",
    phone: "",
    programInterest: "preschool",
    preferredDate: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Smooth scroll helper
  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Gallery filters handler
  const filteredGallery = galleryFilter === "all"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.tag.toLowerCase().includes(galleryFilter));

  // FAQ toggle handler
  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  // Form inputs handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Contact Form Submission and Client-Side Validation
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    // Basic Validation Rules
    if (!formData.parentName.trim()) errors.parentName = "Parent's name is required";
    if (!formData.childName.trim()) errors.childName = "Child's name is required";
    if (!formData.childAge.trim()) errors.childAge = "Child's age is required";
    
    // Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone regex check (basic 10 digit check)
    const phoneCleaned = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (phoneCleaned.length < 10) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.preferredDate) {
      errors.preferredDate = "Please choose a preferred tour date";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      const errorInput = document.getElementsByName(firstErrorKey)[0];
      if (errorInput) {
        errorInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Simulate database send
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      // Reset form
      setFormData({
        parentName: "",
        childName: "",
        childAge: "",
        email: "",
        phone: "",
        programInterest: "preschool",
        preferredDate: "",
        message: "",
      });
    }, 1200);
  };

  // Helper mapping string to Lucide icon
  const renderApproachIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles": return <Sparkles className="w-6 h-6" />;
      case "Heart": return <Heart className="w-6 h-6" />;
      case "Palette": return <Palette className="w-6 h-6" />;
      case "BookOpen": return <BookOpen className="w-6 h-6" />;
      case "Trees": return <Trees className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFCF5] text-[#2D3748] selection:bg-orange-200 selection:text-orange-950 scroll-smooth">
      
      {/* 1. TOP UTILITY STRIP */}
      <div className="bg-[#4FA3D1] text-white px-4 py-2.5 text-xs sm:text-sm font-black border-b border-sky-400 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4 mx-auto md:mx-0">
          <span className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors">
            <Phone className="w-3.5 h-3.5 text-yellow-300" />
            <a href="tel:3067377002">306-737-7002</a>
          </span>
          <span className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors">
            <Mail className="w-3.5 h-3.5 text-yellow-300" />
            <a href="mailto:emekaelemamba@me.com">emekaelemamba@me.com</a>
          </span>
        </div>
        <div className="flex items-center gap-4 mx-auto md:mx-0">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-yellow-300" />
            <span>White City, SK, Canada</span>
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-yellow-300" />
            <span>Mon - Fri: 7:00 AM - 6:00 PM</span>
          </span>
        </div>
      </div>

      {/* 2. MAIN HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b-4 border-yellow-300 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform duration-300">
              <div className="w-6 h-6 border-[3px] border-white rounded-sm rotate-12"></div>
            </div>
            <div>
              <h1 className="font-display font-black text-gray-900 leading-none text-base sm:text-2xl tracking-tighter text-[#4FA3D1] group-hover:text-sky-600 transition-colors">
                TALENT TRAIL
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 block mt-0.5">
                EARLY LEARNING CORP
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-gray-600">
            {["home", "about", "programs", "approach", "gallery", "faq", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                className={`transition-colors py-1 cursor-pointer border-b-2 hover:text-[#4FA3D1] ${
                  activeSection === section
                    ? "border-[#4FA3D1] text-[#4FA3D1] font-black"
                    : "border-transparent text-gray-600"
                }`}
              >
                {section === "faq" ? "FAQ" : section.replace("-", " ")}
              </button>
            ))}
          </nav>

          {/* Right CTA Button & Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right mr-2">
              <p className="text-[10px] uppercase font-black text-gray-400">Inquiries</p>
              <p className="font-black text-[#4FA3D1]">306-737-7002</p>
            </div>
            <button
              onClick={() => handleNavClick("contact")}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-black text-sm shadow-[0_4px_0_rgb(34,197,94)] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              ENROLL TODAY
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-500 hover:text-[#4FA3D1] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-2 animate-slide-down shadow-xl absolute w-full left-0">
            {["home", "about", "programs", "approach", "gallery", "faq", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                className="block w-full text-left py-2.5 px-4 font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all capitalize"
              >
                {section === "faq" ? "FAQ" : section.replace("-", " ")}
              </button>
            ))}
            <div className="pt-4 px-4 flex flex-col gap-3">
              <div className="text-center">
                <p className="text-[10px] uppercase font-black text-gray-400">Inquiries</p>
                <p className="font-black text-[#4FA3D1] text-base">306-737-7002</p>
              </div>
              <button
                onClick={() => handleNavClick("contact")}
                className="w-full text-center bg-green-500 text-white font-black py-3 rounded-full shadow-[0_4px_0_rgb(34,197,94)] active:translate-y-1 active:shadow-none transition-all cursor-pointer text-sm"
              >
                ENROLL TODAY
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION */}
      <section id="home" className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-[#FFFCF5]">
        {/* Colorful Abstract Bubbles background decorations */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            
            {/* Tagline Badge */}
            <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-xs font-black mb-4 mx-auto lg:mx-0 shadow-sm animate-pulse">
              NOW ACCEPTING REGISTRATIONS
            </div>

            {/* Core Value Headline */}
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl text-slate-800 leading-[0.95] tracking-tight mb-6">
              Where Young Minds <br className="hidden sm:inline" />
              <span className="text-[#4FA3D1]">Learn,</span>{" "}
              <span className="text-green-500">Grow,</span> &{" "}
              <span className="text-yellow-500">Thrive.</span>
            </h2>

            {/* Introductory Body Text */}
            <p className="text-gray-500 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-medium mb-8">
              Providing a safe, nurturing, and play-based educational environment for families in White City, Saskatchewan.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => handleNavClick("contact")}
                className="bg-[#4FA3D1] hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-black shadow-[0_6px_0_rgb(37,99,235)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all cursor-pointer text-base"
              >
                Schedule a Tour
              </button>
              <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold">✓</div>
                <p className="text-sm font-bold text-gray-700">Qualified Educators & Certified Safety</p>
              </div>
            </div>

            {/* Local Trust badging */}
            <div className="mt-12 flex gap-8 border-t border-gray-100 pt-8 justify-center lg:justify-start">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-800">10+</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Learning Programs</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-800">100%</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Parent Satisfaction</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-800">7am - 6pm</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Operating Hours</span>
              </div>
            </div>

          </div>

          {/* Right Visual Bento/Interactive Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800"
                alt="Talent Trail Early Learning Daycare White City SK"
                className="w-full h-full object-cover rounded-2xl"
              />
              {/* Floating review card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-emerald-50 flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">❤</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">White City's Premier Early Learning Center</p>
                  <p className="text-[10px] text-gray-500">Trusted Child Development Philosophy & Quality Care</p>
                </div>
              </div>
            </div>
            
            {/* Visual background badge accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-tr from-amber-400 to-orange-400 rounded-full -z-10 animate-spin" style={{ animationDuration: "20s" }}></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-blue-400 to-indigo-400 rounded-3xl -z-10 transform rotate-12"></div>
          </div>

        </div>
      </section>

      {/* 4. KEY BENEFITS / VALUE PROPOSITION */}
      <section className="py-20 bg-[#FFFCF5] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-orange-500 text-xs uppercase tracking-widest font-black">The Talent Trail Standard</span>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-slate-800 tracking-tight">
              Giving Your Child the Best Possible Start
            </h3>
            <p className="text-gray-500 text-base leading-relaxed">
              We design every day with intention, ensuring your child experiences warmth, safety, 
              expert support, and learning concepts disguised as magical play adventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Benefit 1 */}
            <div className="bg-white p-6.5 rounded-[2rem] shadow-sm border-b-4 border-blue-200 transform -rotate-1 hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 bg-blue-100 rounded-xl mb-4 flex items-center justify-center text-[#4FA3D1]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-black text-lg text-slate-800 mb-2">Safe Environment</h3>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                Secure keypad-controlled entry, state-of-the-art cleanliness protocols, and child-safe layouts with spacious play spaces.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-6.5 rounded-[2rem] shadow-sm border-b-4 border-green-200 transform rotate-1 hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 bg-green-100 rounded-xl mb-4 flex items-center justify-center text-green-500">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-black text-lg text-slate-800 mb-2">Qualified Educators</h3>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                Our staff hold accredited Early Childhood Educator (ECE) qualifications, criminal history verification, and first aid/CPR certifications.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-6.5 rounded-[2rem] shadow-sm border-b-4 border-yellow-200 transform rotate-1 hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl mb-4 flex items-center justify-center text-yellow-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-black text-lg text-slate-800 mb-2">Play-Based Learning</h3>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                Curriculums centered on discovery. Children acquire language, math patterns, logic, and motor skills while playing interactively.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white p-6.5 rounded-[2rem] shadow-sm border-b-4 border-orange-200 transform -rotate-1 hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 bg-orange-100 rounded-xl mb-4 flex items-center justify-center text-orange-500">
                <Baby className="w-5 h-5" />
              </div>
              <h3 className="font-black text-lg text-slate-800 mb-2">Age-Appropriate Care</h3>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                Separated learning zones designed specifically for infants, toddler sensory discovery, preschool exploration, and Pre-K readiness.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. ABOUT US SECTION */}
      <section id="about" className="py-20 lg:py-28 bg-[#FFFCF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image grid representing modern learning center */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400"
                  alt="Childcare White City Saskatchewan"
                  className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-md border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&q=80&w=400"
                  alt="Early Learning Center White City"
                  className="w-full h-40 sm:h-48 object-cover rounded-2xl shadow-md border-2 border-white"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400"
                  alt="Preschool White City SK"
                  className="w-full h-40 sm:h-48 object-cover rounded-2xl shadow-md border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=400"
                  alt="Child Development Programs White City"
                  className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-md border-2 border-white"
                />
              </div>
            </div>

            {/* Right details content column */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-2">
                <span className="text-orange-500 text-xs uppercase tracking-widest font-black">Who We Are</span>
                <h3 className="font-display font-black text-3xl sm:text-5xl text-slate-800 tracking-tight">
                  Talent Trail Early Learning Corp
                </h3>
              </div>

              <p className="text-gray-500 leading-relaxed font-medium">
                Located in the heart of White City, Saskatchewan, TALENT TRAIL EARLY LEARNING CORP is a locally 
                owned early childhood sanctuary that partners with families to build strong developmental foundations. 
                Our mission is simple: to cultivate a community where children learn happily, grow securely, and thrive socially.
              </p>

              {/* Mission, Values, Caregivers grids */}
              <div className="space-y-4">
                
                {/* Mission */}
                <div className="bg-white rounded-3xl border-2 border-dashed border-blue-200 p-6 flex gap-4 shadow-sm items-center">
                  <div className="w-12 h-12 bg-blue-100 text-[#4FA3D1] rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                    ❤
                  </div>
                  <div>
                    <h5 className="font-black text-slate-800 text-sm">Our Mission Statement</h5>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      To build solid cognitive, social, and fine-motor blocks in a welcoming environment, ensuring our children discover their unique talents and entering school confident.
                    </p>
                  </div>
                </div>

                {/* Values */}
                <div className="bg-white rounded-3xl border-2 border-dashed border-green-200 p-6 flex gap-4 shadow-sm items-center">
                  <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                    ✓
                  </div>
                  <div>
                    <h5 className="font-black text-slate-800 text-sm">Commitment to Safety & Care</h5>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      Rigorous daily sanitization of tools, secure keypad locked doors, organic catering snacks, and dedicated nap hours to respect each child's physiological rhythm.
                    </p>
                  </div>
                </div>

                {/* Team */}
                <div className="bg-white rounded-3xl border-2 border-dashed border-yellow-200 p-6 flex gap-4 shadow-sm items-center">
                  <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                    ★
                  </div>
                  <div>
                    <h5 className="font-black text-slate-800 text-sm">ECE Certified Caregivers</h5>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      Our caregivers are not just babysitters; they are passionate curriculum planners who receive continuous, certified Early Childhood Education training to apply modern developmental psychology.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. INTERACTIVE 3D PLAYROOM SECTION */}
      <section className="py-20 bg-gradient-to-r from-[#2B4C7E] to-[#4FA3D1] text-white relative overflow-hidden">
        {/* Decorative background vectors */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Description Text Column */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <div className="inline-block px-4 py-1.5 bg-yellow-400 text-slate-900 rounded-full text-xs font-black mb-4 mx-auto lg:mx-0 shadow-sm">
                MODERN INTERACTIVE TECH
              </div>
              
              <h3 className="font-display font-black text-3xl sm:text-5xl tracking-tight leading-tight">
                Experience Our <br />
                <span className="text-yellow-300">3D Interactive Playroom</span>
              </h3>
              
              <p className="text-blue-50 text-base leading-relaxed">
                Step into our virtual sandbox of sensory play! This interactive 3D playroom displays 
                the building block shapes we use for logical reasoning.
              </p>

              <div className="space-y-4.5 pt-2 text-left max-w-md mx-auto lg:mx-0">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 text-yellow-300 flex items-center justify-center font-bold text-xs">1</div>
                  <p className="text-sm text-blue-50">
                    <strong className="text-white">Mouse Interaction:</strong> Slide your cursor across the container to pan the camera.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 text-yellow-300 flex items-center justify-center font-bold text-xs">2</div>
                  <p className="text-sm text-blue-50">
                    <strong className="text-white">Boop Click Impulse:</strong> Click any floating pastel block to trigger high-velocity spins!
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 text-yellow-300 flex items-center justify-center font-bold text-xs">3</div>
                  <p className="text-sm text-blue-50">
                    <strong className="text-white">Scroll-Triggered Float:</strong> Watch the blocks disperse and rise as you scroll down the page!
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handleNavClick("contact")}
                  className="bg-green-500 hover:bg-green-600 text-white font-black px-8 py-4 rounded-2xl shadow-[0_4px_0_rgb(34,197,94)] active:translate-y-1 active:shadow-none transition-all cursor-pointer text-sm"
                >
                  Book In-Person Tour ➔
                </button>
              </div>
            </div>

            {/* Three.js Rendering Column */}
            <div className="lg:col-span-7">
              <Playroom3D />
            </div>

          </div>

        </div>
      </section>

      {/* 7. DEVELOPMENTAL PROGRAMS (TABS) */}
      <section id="programs" className="py-20 lg:py-28 bg-[#FFFCF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-orange-500 text-xs uppercase tracking-widest font-black">Early Childhood Curriculum</span>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-slate-800 tracking-tight">
              Our Age-Specific Programs
            </h3>
            <p className="text-gray-500 text-base leading-relaxed">
              Each stage of early childhood represents a unique developmental path. Select a program below 
              to explore learning objectives, planned daily activities, and benefits.
            </p>

            {/* Program selection tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-6">
              {PROGRAMS.map((prog) => (
                <button
                  key={prog.id}
                  onClick={() => setSelectedProgram(prog.id)}
                  className={`px-6 py-3.5 rounded-2xl text-sm font-black tracking-wide transition-all duration-300 cursor-pointer border-2 ${
                    selectedProgram === prog.id
                      ? "bg-[#4FA3D1] text-white border-[#4FA3D1] shadow-md scale-105"
                      : "bg-white text-gray-600 border-gray-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                  }`}
                >
                  {prog.name.replace(" Program", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Active program display area */}
          {PROGRAMS.filter(p => p.id === selectedProgram).map((prog) => (
            <div key={prog.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-[2.5rem] p-6 sm:p-10 border-4 border-yellow-200 shadow-sm animate-fade-in">
              
              {/* Image side */}
              <div className="lg:col-span-5 relative">
                <div className="w-full aspect-4/3 sm:aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <img
                    src={prog.image}
                    alt={prog.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div className={`absolute -top-3 -right-3 bg-gradient-to-r ${prog.color} text-white px-4 py-1.5 rounded-full text-xs font-black shadow-md`}>
                  Age: {prog.ageRange}
                </div>
              </div>

              {/* Text specifics side */}
              <div className="lg:col-span-7 space-y-6">
                
                <div>
                  <h4 className="font-display font-black text-2xl sm:text-4xl text-slate-800 mb-2">
                    {prog.name}
                  </h4>
                  <p className="text-orange-500 text-xs uppercase tracking-widest font-black flex items-center gap-1.5 mb-3">
                    <Activity className="w-4 h-4 text-orange-400" />
                    Development Focus: {prog.ageRange}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Objectives column */}
                  <div className="space-y-3.5">
                    <h5 className="font-display font-black text-sm text-slate-800 uppercase tracking-wider border-b-2 border-dashed border-gray-100 pb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Learning Objectives
                    </h5>
                    <ul className="space-y-2">
                      {prog.objectives.map((obj, i) => (
                        <li key={i} className="text-xs text-gray-500 leading-relaxed flex items-start gap-2">
                          <span className="text-blue-500 font-bold shrink-0">✓</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Activities column */}
                  <div className="space-y-3.5">
                    <h5 className="font-display font-black text-sm text-slate-800 uppercase tracking-wider border-b-2 border-dashed border-gray-100 pb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      Daily Activities
                    </h5>
                    <ul className="space-y-2">
                      {prog.activities.map((act, i) => (
                        <li key={i} className="text-xs text-gray-500 leading-relaxed flex items-start gap-2">
                          <span className="text-orange-500 font-bold shrink-0">✦</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Benefits banner */}
                <div className="bg-sky-50 border-2 border-dashed border-blue-200 rounded-2xl p-4">
                  <h5 className="font-display font-black text-xs text-blue-900 uppercase tracking-wider mb-2">
                    Developmental Benefits
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {prog.benefits.map((ben, i) => (
                      <span key={i} className="bg-white border border-blue-100 px-3 py-1 rounded-full text-[11px] font-bold text-blue-800">
                        {ben}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ))}

        </div>
      </section>

      {/* 8. OUR APPROACH SECTION */}
      <section id="approach" className="py-20 lg:py-28 bg-[#FFFCF5] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-orange-500 text-xs uppercase tracking-widest font-black">Our Philosophy</span>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-slate-800 tracking-tight">
              A Holistic Approach to Development
            </h3>
            <p className="text-gray-500 text-base leading-relaxed">
              At Talent Trail, we look at the whole child. We nourish physical fitness, artistic expression, 
              social manners, literacy mechanics, and scientific curiosity simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {APPROACHES.map((app, index) => (
              <div
                key={index}
                className="bg-white rounded-[2rem] border-b-4 border-yellow-200 p-6 text-center flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-sm"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto border ${app.color}`}>
                    {renderApproachIcon(app.icon)}
                  </div>
                  <h4 className="font-display font-black text-base text-slate-800">
                    {app.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed font-sans">
                    {app.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. PHOTO GALLERY WITH FILTERS */}
      <section id="gallery" className="py-20 lg:py-28 bg-[#FFFCF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-orange-500 text-xs uppercase tracking-widest font-black">Visual Showcase</span>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-slate-800 tracking-tight">
              A Peek Into Life at Talent Trail
            </h3>
            <p className="text-gray-500 text-base leading-relaxed">
              Step inside our bright, sanitized, and well-designed learning and play areas where 
              White City's toddlers and preschoolers make daily breakthroughs.
            </p>

            {/* Gallery Category Filter buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {[
                { label: "All Photos", value: "all" },
                { label: "Learning Space", value: "learning" },
                { label: "Active Play", value: "play" },
                { label: "Creativity & Art", value: "creativity" },
                { label: "Science & Discovery", value: "science" },
                { label: "Literacy", value: "literacy" },
              ].map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setGalleryFilter(btn.value)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black transition-all duration-300 cursor-pointer border-2 ${
                    galleryFilter === btn.value
                      ? "bg-[#4FA3D1] text-white border-[#4FA3D1] shadow-sm"
                      : "bg-white text-gray-500 border-gray-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Photo Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map((img, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-[2rem] overflow-hidden aspect-4/3 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 border-b-4 border-blue-200 animate-fade-in"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Gradient tint overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div>
                    <span className="text-yellow-400 text-[10px] font-extrabold uppercase tracking-widest">
                      {img.tag}
                    </span>
                    <h5 className="text-white font-display font-black text-base mt-0.5">
                      {img.title}
                    </h5>
                  </div>
                </div>

                {/* Minimal label badge shown permanently */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-gray-100 px-3 py-1 rounded-full text-[10px] font-bold text-slate-800 shadow-sm pointer-events-none">
                  {img.tag}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. PARENT TESTIMONIALS */}
      <section className="py-20 lg:py-28 bg-[#FFFCF5] border-y border-gray-100 relative overflow-hidden">
        {/* Decorative background visual accent */}
        <div className="absolute -top-12 left-1/4 text-orange-200 opacity-20 text-[200px] font-display font-black leading-none pointer-events-none select-none">
          “
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-orange-500 text-xs uppercase tracking-widest font-black">Parent Reviews</span>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-slate-800 tracking-tight">
              What Our White City Families Say
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-[2rem] border-b-4 border-yellow-200 p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative"
              >
                {/* 5 Stars Rating Indicator */}
                <div className="flex gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Sparkles key={i} className="w-4 h-4 text-amber-500 fill-amber-400" />
                  ))}
                </div>

                <p className="text-gray-500 text-sm italic leading-relaxed font-medium mb-6">
                  "{test.text}"
                </p>

                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <div>
                    <h5 className="font-black text-slate-800 text-sm">{test.name}</h5>
                    <p className="text-gray-400 text-xs mt-0.5">{test.role}</p>
                  </div>
                  <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-[10px] font-bold">
                    Verified Parent
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section id="faq" className="py-20 lg:py-28 bg-[#FFFCF5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-orange-500 text-xs uppercase tracking-widest font-black">Frequently Asked Questions</span>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-slate-800 tracking-tight">
              Have Questions? We Have Answers!
            </h3>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              We understand that choosing childcare is a massive decision. Read through our common 
              policies below, or ask our Parent AI Assistant on the bottom-right of the page!
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = expandedFAQ === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border-2 border-dashed border-blue-200 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between font-black text-slate-800 text-sm sm:text-base gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-display">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#4FA3D1] transition-transform duration-300 shrink-0 ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-gray-500 text-sm border-t-2 border-dashed border-blue-100 leading-relaxed font-sans bg-white">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. CONTACT US & ENROLLMENT FORM */}
      <section id="contact" className="py-20 lg:py-28 bg-[#FFFCF5] border-t border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column Information Details */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-3">
                <span className="text-orange-500 text-xs uppercase tracking-widest font-black">Reach Out To Us</span>
                <h3 className="font-display font-black text-3xl sm:text-5xl text-slate-800 tracking-tight leading-none">
                  Get In Touch
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Have questions about waitlists, childcare fees, or want to schedule a physical tour? 
                  Fill out our inquiry form or contact our White City, SK office directly.
                </p>
              </div>

              {/* Direct connection indicators */}
              <div className="space-y-4.5">
                
                {/* Phone */}
                <a
                  href="tel:3067377002"
                  className="flex items-center gap-4 bg-white rounded-3xl border-b-4 border-yellow-200 p-4 shadow-sm hover:translate-y-[-2px] transition-all group cursor-pointer"
                >
                  <div className="w-11 h-11 shrink-0 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-bold uppercase tracking-wider">Direct Phone Call</span>
                    <strong className="text-gray-800 text-base group-hover:text-yellow-600 transition-colors">
                      306-737-7002
                    </strong>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:emekaelemamba@me.com"
                  className="flex items-center gap-4 bg-white rounded-3xl border-b-4 border-blue-200 p-4 shadow-sm hover:translate-y-[-2px] transition-all group cursor-pointer"
                >
                  <div className="w-11 h-11 shrink-0 bg-blue-100 text-[#4FA3D1] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-bold uppercase tracking-wider">Direct Email Address</span>
                    <strong className="text-gray-800 text-base group-hover:text-blue-600 transition-colors">
                      emekaelemamba@me.com
                    </strong>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 bg-white rounded-3xl border-b-4 border-green-200 p-4 shadow-sm">
                  <div className="w-11 h-11 shrink-0 bg-green-100 text-green-500 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-bold uppercase tracking-wider">Physical Address</span>
                    <strong className="text-gray-800 text-base leading-tight block">
                      White City, Saskatchewan (SK), Canada
                    </strong>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-4 bg-white rounded-3xl border-b-4 border-orange-200 p-4 shadow-sm">
                  <div className="w-11 h-11 shrink-0 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-bold uppercase tracking-wider">Operating Business Hours</span>
                    <strong className="text-gray-800 text-base leading-tight block">
                      Monday to Friday: 7:00 AM - 6:00 PM
                    </strong>
                  </div>
                </div>

              </div>

              {/* MOCK DECORATIVE MAP */}
              <div className="border-4 border-yellow-200 rounded-[2rem] overflow-hidden shadow-inner h-52 relative bg-slate-200">
                {/* Visual grid representation of map */}
                <div className="absolute inset-0 opacity-15" style={{
                  backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }}></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                  <div className="w-10 h-10 bg-[#4FA3D1] text-white rounded-full flex items-center justify-center animate-bounce shadow-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h5 className="text-white font-bold text-sm mt-3 shadow-sm">White City, Saskatchewan (SK)</h5>
                  <p className="text-white/85 text-[11px] max-w-xs mt-1">
                    Serving families in White City, Emerald Park, and surrounding communities.
                  </p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
                  alt="Saskatchewan map background"
                  className="w-full h-full object-cover grayscale opacity-75"
                />
              </div>

            </div>

            {/* Right Column Validation Interactive Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border-4 border-yellow-200 rounded-[2.5rem] p-6 sm:p-10 shadow-sm">
                
                {formSubmitted ? (
                  <div className="text-center py-12 space-y-4 animate-fade-in">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm font-black text-2xl">
                      ✓
                    </div>
                    <h4 className="font-display font-black text-2xl text-slate-800">
                      Inquiry Request Submitted!
                    </h4>
                    <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for contacting <strong className="text-[#4FA3D1]">Talent Trail Early Learning Corp</strong>. 
                      Your enrollment details have been received. We will contact you at our earliest 
                      opportunity via phone or email to finalize your physical tour date!
                    </p>
                    <div className="pt-6">
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="bg-green-500 hover:bg-green-600 text-white font-black px-6 py-3 rounded-full shadow-[0_4px_0_rgb(34,197,94)] active:translate-y-1 active:shadow-none transition-all cursor-pointer text-sm"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    
                    <div className="border-b-2 border-dashed border-gray-100 pb-4 mb-4">
                      <h4 className="font-display font-black text-xl text-slate-800">
                        Enrollment & Tour Application Form
                      </h4>
                      <p className="text-gray-400 text-xs mt-1">
                        Please provide accurate information to secure your spot or organize a personal tour.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* Parent Name */}
                      <div>
                        <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          Parent's Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4FA3D1] transition-all ${
                            formErrors.parentName ? "border-rose-400 bg-rose-50/25" : "border-gray-100"
                          }`}
                          placeholder="Jane Doe"
                        />
                        {formErrors.parentName && (
                          <span className="text-rose-500 text-[11px] font-bold block mt-1">
                            {formErrors.parentName}
                          </span>
                        )}
                      </div>

                      {/* Child Name */}
                      <div>
                        <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                          <Baby className="w-3.5 h-3.5 text-gray-400" />
                          Child's Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="childName"
                          value={formData.childName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4FA3D1] transition-all ${
                            formErrors.childName ? "border-rose-400 bg-rose-50/25" : "border-gray-100"
                          }`}
                          placeholder="Liam Doe"
                        />
                        {formErrors.childName && (
                          <span className="text-rose-500 text-[11px] font-bold block mt-1">
                            {formErrors.childName}
                          </span>
                        )}
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      
                      {/* Child Age */}
                      <div className="sm:col-span-1">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5">
                          Child's Age / Months <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="childAge"
                          value={formData.childAge}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4FA3D1] transition-all ${
                            formErrors.childAge ? "border-rose-400 bg-rose-50/25" : "border-gray-100"
                          }`}
                          placeholder="e.g. 3 years"
                        />
                        {formErrors.childAge && (
                          <span className="text-rose-500 text-[11px] font-bold block mt-1">
                            {formErrors.childAge}
                          </span>
                        )}
                      </div>

                      {/* Program Interest */}
                      <div className="sm:col-span-2">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5">
                          Program of Interest
                        </label>
                        <select
                          name="programInterest"
                          value={formData.programInterest}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4FA3D1] transition-all text-gray-500"
                        >
                          <option value="infant">Infant Care Program (6W - 18M)</option>
                          <option value="toddler">Toddler Exploration (18M - 30M)</option>
                          <option value="preschool">Preschool Learning (30M - 4Y)</option>
                          <option value="readiness">School Readiness Pre-K (4Y - 5Y)</option>
                        </select>
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* Email Address */}
                      <div>
                        <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4FA3D1] transition-all ${
                            formErrors.email ? "border-rose-400 bg-rose-50/25" : "border-gray-100"
                          }`}
                          placeholder="jane.doe@example.com"
                        />
                        {formErrors.email && (
                          <span className="text-rose-500 text-[11px] font-bold block mt-1">
                            {formErrors.email}
                          </span>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4FA3D1] transition-all ${
                            formErrors.phone ? "border-rose-400 bg-rose-50/25" : "border-gray-100"
                          }`}
                          placeholder="306-737-7002"
                        />
                        {formErrors.phone && (
                          <span className="text-rose-500 text-[11px] font-bold block mt-1">
                            {formErrors.phone}
                          </span>
                        )}
                      </div>

                    </div>

                    {/* Preferred Tour Date */}
                    <div>
                      <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        Preferred Tour Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4FA3D1] transition-all text-gray-500 ${
                          formErrors.preferredDate ? "border-rose-400 bg-rose-50/25" : "border-gray-100"
                        }`}
                      />
                      {formErrors.preferredDate && (
                        <span className="text-rose-500 text-[11px] font-bold block mt-1">
                          {formErrors.preferredDate}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-1.5">
                        Special Requests or Comments
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4FA3D1] transition-all"
                        placeholder="Tell us about your child's schedule, nap preferences, allergies, or questions..."
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 text-center text-white font-black rounded-full shadow-lg cursor-pointer transition-all duration-300 ${
                          isSubmitting
                            ? "bg-gray-400 cursor-wait"
                            : "bg-[#4FA3D1] hover:bg-sky-500 shadow-[0_4px_0_rgb(37,99,235)] active:translate-y-1 active:shadow-none"
                        }`}
                      >
                        {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry & Secure Tour ➔"}
                      </button>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-slate-800 pb-12 mb-10">
            
            {/* Column 1 Logo details */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-[#4FA3D1] rounded-xl flex items-center justify-center">
                  <span className="font-display font-black text-white text-lg">TT</span>
                </div>
                <div>
                  <h4 className="font-display font-black text-white text-base leading-none">TALENT TRAIL</h4>
                  <span className="text-[10px] font-black tracking-wider text-orange-400 block mt-0.5">EARLY LEARNING CORP</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans font-medium">
                Saskatchewan's premium daycare and early educational academy. Nurturing, play-based early childhood curriculum for babies, toddlers, and preschool kids.
              </p>
            </div>

            {/* Column 2 Navigation map */}
            <div className="lg:col-span-2 space-y-4">
              <h5 className="font-display font-black text-white text-xs uppercase tracking-wider">Navigation</h5>
              <ul className="space-y-2 text-xs font-black font-sans">
                {["home", "about", "programs", "approach", "gallery", "faq", "contact"].map((sec) => (
                  <li key={sec}>
                    <button
                      onClick={() => handleNavClick(sec)}
                      className="hover:text-orange-400 transition-colors cursor-pointer capitalize text-left"
                    >
                      {sec === "faq" ? "FAQ" : sec.replace("-", " ")}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 Programs links */}
            <div className="lg:col-span-3 space-y-4">
              <h5 className="font-display font-black text-white text-xs uppercase tracking-wider">Our Programs</h5>
              <ul className="space-y-2 text-xs font-sans font-medium font-black">
                <li>
                  <button onClick={() => { handleNavClick("programs"); setSelectedProgram("infant"); }} className="hover:text-orange-400 text-left cursor-pointer">
                    Infant Care (6W - 18M)
                  </button>
                </li>
                <li>
                  <button onClick={() => { handleNavClick("programs"); setSelectedProgram("toddler"); }} className="hover:text-orange-400 text-left cursor-pointer">
                    Toddler Exploration (18M - 30M)
                  </button>
                </li>
                <li>
                  <button onClick={() => { handleNavClick("programs"); setSelectedProgram("preschool"); }} className="hover:text-orange-400 text-left cursor-pointer">
                    Preschool Learning (30M - 4Y)
                  </button>
                </li>
                <li>
                  <button onClick={() => { handleNavClick("programs"); setSelectedProgram("readiness"); }} className="hover:text-orange-400 text-left cursor-pointer">
                    School Readiness Pre-K (4Y - 5Y)
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4 Contact direct block */}
            <div className="lg:col-span-3 space-y-4">
              <h5 className="font-display font-black text-white text-xs uppercase tracking-wider">White City Office</h5>
              <div className="text-xs font-sans space-y-2.5 text-slate-400 font-medium">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-400" />
                  <a href="tel:3067377002" className="hover:text-white">306-737-7002</a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-400" />
                  <a href="mailto:emekaelemamba@me.com" className="hover:text-white">emekaelemamba@me.com</a>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>White City, Saskatchewan, Canada</span>
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright centered block */}
          <div className="text-center text-xs space-y-2.5 text-slate-500">
            <p>© {new Date().getFullYear()} Talent Trail Early Learning Corp. All rights reserved.</p>
            <p className="text-slate-600">
              Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 font-bold underline transition-colors">iWebNext</a>
            </p>
          </div>

        </div>
      </footer>

      {/* Floating AI chat window & Scroll triggers */}
      <AIChatbot />
      <ScrollToTop />

    </div>
  );
}
