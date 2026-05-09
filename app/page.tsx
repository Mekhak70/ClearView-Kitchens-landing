"use client"

import { Phone, MapPin, Shield, Star, ChevronRight, Lock, Clock, Award, Users, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import logo from '../public/logo.png'
import Link from "next/link"
import Kitchen1 from '../public/kitchen1.jpg'
import Kitchen2 from '../public/kitchen2.jpg'
import Kitchen3 from '../public/kitchen3.jpg'
import Kitchen4 from '../public/kitchen4.jpg'

export default function ClearViewKitchens() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalEmail, setModalEmail] = useState("")
  const [isModalSubmitting, setIsModalSubmitting] = useState(false)
  const [modalSubmitStatus, setModalSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  // Open modal on page entry
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Submit function for main form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    if (!formData.name || !formData.phone || !formData.email) {
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "7c9a8b3e-5f1d-4a2e-8b3c-9d4e5f6a7b8c",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: "New Kitchen Consultation Request",
          message: `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nType: Free Consultation Request\nDate: ${new Date().toLocaleString()}`,
          to_email: "arthuryedigaryan@gmail.com"
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setSubmitStatus("success")
        setFormData({ name: "", phone: "", email: "" })
        setTimeout(() => setSubmitStatus("idle"), 3000)
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!modalEmail.trim()) return
    
    setIsModalSubmitting(true)
    setModalSubmitStatus("idle")
  
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "7c9a8b3e-5f1d-4a2e-8b3c-9d4e5f6a7b8c",
          email: modalEmail,
          name: "Website Visitor",
          subject: "New On-Site Consultation Request",
          message: `Email: ${modalEmail}\nType: On-site Consultation\nDate: ${new Date().toLocaleString()}`,
          to_email: "arthuryedigaryan@gmail.com"
        })
      })
  
      const result = await response.json()
      
      if (result.success) {
        setModalSubmitStatus("success")
        setModalEmail("")
        setTimeout(() => {
          setIsModalOpen(false)
          setModalSubmitStatus("idle")
        }, 2000)
      } else {
        setModalSubmitStatus("error")
      }
    } catch {
      setModalSubmitStatus("error")
    } finally {
      setIsModalSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans bg-[#0b1829]">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="relative w-full max-w-md bg-[#0b1829] border border-[rgb(171,127,69)]/30 shadow-2xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Free On-Site Consultation</h2>
                <p className="text-[rgb(191,157,99)] text-sm">Limited spots available this month</p>
              </div>
              
              <form onSubmit={handleModalSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border border-gray-700 bg-[#0f1f2f] text-white px-4 py-3 focus:outline-none focus:border-[rgb(171,127,69)] rounded-none"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    required
                  />
                </div>
                
                {modalSubmitStatus === "error" && (
                  <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                )}
                
                {modalSubmitStatus === "success" && (
                  <p className="text-green-400 text-sm">Thank you! We'll contact you shortly.</p>
                )}
                
                <button
                  type="submit"
                  disabled={isModalSubmitting}
                  className="w-full bg-[rgb(171,127,69)] hover:bg-[rgb(141,97,39)] text-white py-3 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-button-scale"
                >
                  {isModalSubmitting ? "SENDING..." : "FREE ON-SITE CONSULTATION"}
                </button>
                
                <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Your information is 100% secure
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-8 lg:px-16 border-b border-gray-100 bg-[#0b1829]">
        <Image
          src={logo}
          alt="ClearView Kitchens & Homes"
          width={240}
          height={60}
          className="h-14 w-auto"
        />
        <p className="hidden md:block text-sm text-gray-600" style={{color:'#fff'}}>Custom Kitchen Cabinets in Toronto &amp; GTA</p>
        <a href="tel:905-767-6766" className="flex items-center gap-2 text-[rgb(171,127,69)] font-semibold group">
          <Phone className="w-5 h-5 phone-animate" />
          <div className="text-right" style={{color:'#fff'}}>
            <span className="block text-lg">905-767-6766</span>
            <span className="block text-xs text-gray-500 font-normal" style={{color:'#fff'}}>Call for Free Consultation</span>
          </div>
        </a>
      </header>

      {/* Hero Section */}
      <section className="relative" style={{top:'-.5px'}}>
        <div className="absolute inset-0 z-0 bg-[#0b1829]" >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eb9a6f24-2332-4f3a-9f3a-1cb05b41ef57-THCTcxozIZvohS56K4yjqj5PH5TN3P.png"
            alt="Modern kitchen with custom cabinets"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 px-4 py-12 md:px-8 lg:px-16 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Custom Kitchen Cabinets<br />in Toronto &amp; GTA
              </h1>
              <p className="text-[rgb(191,157,99)] text-lg md:text-xl italic mb-6">
                Designed, Built &amp; Installed by<br />One Professional Team
              </p>
              <p className="text-lg font-semibold mb-6">Book Your Free Consultation Today</p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[rgb(191,157,99)] fill-[rgb(191,157,99)]" />
                  <div>
                    <span className="block text-sm font-medium">4.8 Google Reviews</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-[rgb(191,157,99)] fill-[rgb(191,157,99)]" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[rgb(191,157,99)]" />
                  <div>
                    <span className="block text-sm font-medium">Serving Toronto</span>
                    <span className="block text-xs text-gray-300">&amp; GTA</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[rgb(191,157,99)]" />
                  <div>
                    <span className="block text-sm font-medium">Built In-House</span>
                    <span className="block text-xs text-gray-300">No Outsourcing</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="tel:905-767-6766"
                className="inline-flex items-center gap-2 bg-[rgb(171,127,69)] hover:bg-[rgb(141,97,39)] text-white px-6 py-3 font-semibold transition-all duration-300 animate-button-scale"
              >
                <Phone className="w-5 h-5" />
                Call Now: 905-767-6766
              </a>
            </div>

            {/* Right Form */}
            <div className="p-6 md:p-8 shadow-xl max-w-md ml-auto bg-[#0b1829]">
              <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{color:'#fff'}}>Get Your</h2>
              <p className="text-2xl text-[rgb(171,127,69)] italic mb-2">Free Consultation</p>
              <p className="text-sm text-gray-600 mb-6" style={{color:'#fff'}}>
                Tell us about your project and we&apos;ll get back to you.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[rgb(171,127,69)] rounded-none bg-white"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[rgb(171,127,69)] rounded-none bg-white"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[rgb(171,127,69)] rounded-none bg-white"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[rgb(171,127,69)] hover:bg-[rgb(141,97,39)] text-white py-3 font-semibold transition-all duration-300 cursor-pointer animate-button-scale"
                >
                  {isSubmitting ? "SENDING..." : "Book My Free Visit"}
                </button>
                {submitStatus === "success" && (
                  <p className="text-green-400 text-sm text-center">Thank you! We'll contact you soon.</p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                )}
              </form>
              <p className="text-xs text-gray-500 mt-4 flex items-center justify-center gap-1" style={{color:'#fff'}}>
                <Lock className="w-3 h-3" />
                Your information is 100% secure and will never be shared.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#0b1829]" >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12" style={{color:'#fff'}}>
          Why Homeowners Choose ClearView Kitchens
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <CabinetIcon />,
              title: "Fully Custom Cabinets",
              desc: "Every detail is tailored to your space, style and needs.",
            },
            {
              icon: <HammerIcon />,
              title: "Built In-House",
              desc: "We build our cabinets in our own shop using premium materials.",
            },
            {
              icon: <Users className="w-10 h-10 text-[rgb(171,127,69)]" />,
              title: "One Team, Start to Finish",
              desc: "Design, build and install – all done by our experienced team.",
            },
            {
              icon: <CheckShieldIcon />,
              title: "Professional Installation",
              desc: "Clean, on-time, and built to last. No subcontractors.",
            },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="font-semibold text-[#fff] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600" style={{color:'#fff'}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-[#0b1829]" >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8" style={{color:'#fff'}}>
          Recent Custom Kitchen Projects
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[{src:Kitchen1}, {src:Kitchen2}, {src:Kitchen3}, {src:Kitchen4}].map((value, i) => (
            <div key={i} className="aspect-[4/3] bg-gray-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200 flex items-center justify-center text-gray-400 ">
                <Image src={value.src} alt={`Kitchen Project ${i + 1}`} className="object-cover w-full h-full" />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="https://clearviewkitchens.ca/portfolio/painted-stained-kitchens/" className="inline-flex items-center gap-2 border-2 border-gray-800 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-gray-800 animate-button-scale">
            VIEW MORE PROJECTS
          </Link>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#0b1829]" >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12" style={{color:'#fff'}}>
          Our Process is Simple
        </h2>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "1", icon: <ChatIcon />, title: "Free Consultation", desc: "We discuss your ideas, needs and budget." },
              { num: "2", icon: <DesignIcon />, title: "3D Design & Planning", desc: "We create a 3D design so you can see your new kitchen come to life." },
              { num: "3", icon: <GearIcon />, title: "Custom Manufacturing", desc: "Your cabinets are built in our shop with precision and care." },
              { num: "4", icon: <InstallIcon />, title: "Professional Installation", desc: "Our team installs everything with perfection and leaves your home clean." },
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="w-8 h-8 rounded-full bg-[rgb(171,127,69)] text-white flex items-center justify-center text-sm font-bold">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 flex items-center justify-center" style={{color:'#fff'}}>{step.icon}</div>
                </div>
                {i < 3 && (
                  <ChevronRight className="hidden md:block absolute top-6 -right-3 w-6 h-6 text-gray-400" />
                )}
                <h3 className="font-semibold text-gray-900 mb-2" style={{color:'#fff'}}>{step.title}</h3>
                <p className="text-sm text-gray-600" style={{color:'#fff'}}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 md:px-8 lg:px-16 text-white bg-[#0b1829]" >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Trusted by GTA Homeowners
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 items-start">
          <div className="text-center md:text-left">
            <div className="text-3xl font-bold mb-2">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-red-500">l</span>
              <span className="text-green-500">e</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-2xl font-bold">4.8</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[rgb(191,157,99)] fill-[rgb(191,157,99)]" />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-400">100+ Reviews</p>
          </div>
          {[
            { text: "ClearView Kitchens exceeded our expectations. The quality is amazing and the team was professional from start to finish.", author: "Sarah T., Vaughan" },
            { text: "We love our new kitchen! The design process was smooth and the installation was flawless.", author: "Mike & Lina, Markham" },
            { text: "Highly recommend ClearView Kitchens. They delivered on time and the attention to detail is outstanding.", author: "Jason M., Toronto" },
          ].map((review, i) => (
            <div key={i} className="bg-stone-700/50 p-4">
              <p className="text-sm italic mb-3">&ldquo;{review.text}&rdquo;</p>
              <p className="text-sm text-[rgb(191,157,99)]">– {review.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 px-4 md:px-8 lg:px-16 bg-[#0b1829]" >
        <div className="relative z-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Upgrade Your Kitchen?</h2>
          <p className="mb-8 text-gray-300">
            Book your free consultation today and let&apos;s build the kitchen you&apos;ve always wanted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:905-767-6766"
              className="inline-flex items-center justify-center gap-2 bg-[rgb(171,127,69)] hover:bg-[rgb(141,97,39)] text-white px-8 py-3 font-semibold transition-all duration-300 animate-button-scale"
            >
              <Phone className="w-5 h-5" />
              CALL 905-767-6766
            </a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="border-2 border-white px-8 py-3 font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 animate-button-scale"
            >
              GET FREE CONSULTATION
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 md:px-8 lg:px-16 bg-[#0b1829]" >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white text-sm">
          <div className="flex flex-col items-center gap-2">
            <MapPin className="w-6 h-6 text-[rgb(171,127,69)]" />
            <p>Serving Toronto, Vaughan, Markham,<br />Mississauga &amp; Surrounding Areas</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock className="w-6 h-6 text-[rgb(171,127,69)]" />
            <p>15+ Years Experience</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Award className="w-6 h-6 text-[rgb(171,127,69)]" />
            <p>Premium Materials<br />Blum Hardware</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="w-6 h-6 text-[rgb(171,127,69)] font-bold">!</span>
            <p>Limited Spots Available<br />Book Today!</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes gentleScale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }
        @keyframes phoneScale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
        .animate-button-scale {
          animation: gentleScale 1.2s infinite ease-in-out;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .phone-animate {
          animation: phoneScale 1.2s infinite ease-in-out;
        }
        button, a, .cursor-pointer {
          cursor: pointer;
        }
        button:not(.no-animate), a.animate-button-scale, .animate-button-scale {
          animation: gentleScale 1.2s infinite ease-in-out;
        }
        .phone-animate {
          animation: phoneScale 1.2s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}

// Custom Icons (same as before)
function CabinetIcon() {
  return (
    <svg className="w-10 h-10 text-[rgb(171,127,69)]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="8" width="32" height="32" rx="2" />
      <line x1="24" y1="8" x2="24" y2="40" />
      <line x1="8" y1="24" x2="40" y2="24" />
      <circle cx="18" cy="16" r="1.5" fill="currentColor" />
      <circle cx="30" cy="16" r="1.5" fill="currentColor" />
      <circle cx="18" cy="32" r="1.5" fill="currentColor" />
      <circle cx="30" cy="32" r="1.5" fill="currentColor" />
    </svg>
  )
}

function HammerIcon() {
  return (
    <svg className="w-10 h-10 text-[rgb(171,127,69)]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 28L8 40" />
      <path d="M28 20L40 8" />
      <path d="M18 18L30 30" />
      <path d="M22 14L34 26" />
    </svg>
  )
}

function CheckShieldIcon() {
  return (
    <svg className="w-10 h-10 text-[rgb(171,127,69)]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 4L6 12V24C6 34 14 42 24 44C34 42 42 34 42 24V12L24 4Z" />
      <path d="M16 24L22 30L32 18" strokeWidth="2" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg className="w-10 h-10 text-gray-700" style={{color:'#fff'}} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="8" width="36" height="26" rx="4" />
      <path d="M14 36L6 34V30" />
      <circle cx="16" cy="21" r="2" fill="currentColor" />
      <circle cx="24" cy="21" r="2" fill="currentColor" />
      <circle cx="32" cy="21" r="2" fill="currentColor" />
    </svg>
  )
}

function DesignIcon() {
  return (
    <svg className="w-10 h-10 text-gray-700" style={{color:'#fff'}} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="8" width="32" height="32" rx="2" />
      <rect x="12" y="12" width="24" height="16" rx="1" />
      <line x1="16" y1="34" x2="32" y2="34" />
    </svg>
  )
}

function GearIcon() {
  return (
    <svg className="w-10 h-10 text-gray-700" style={{color:'#fff'}} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="8" />
      <path d="M24 8V4M24 44V40M40 24H44M4 24H8M36 12L39 9M9 39L12 36M36 36L39 39M9 9L12 12" />
    </svg>
  )
}

function InstallIcon() {
  return (
    <svg className="w-10 h-10 text-gray-700" style={{color:'#fff'}} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="10" y="20" width="28" height="20" rx="2" />
      <path d="M16 20V14C16 10 19 8 24 8C29 8 32 10 32 14V20" />
      <path d="M24 28V34" />
      <path d="M21 31H27" />
    </svg>
  )
}