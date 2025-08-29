import { useState } from 'react'
import { FaChevronDown, FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { FaShieldAlt, FaCheck, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import axios from 'axios'
import './App.css'

function Navbar() {
  return (
    <nav className="w-full h-[72px] bg-white flex items-center">
      <div className="max-w-[1440px] mx-auto px-[33px] flex items-center justify-between w-full">
        {/* Brand logo */}
        <div className="text-xl font-bold text-black">
          <img src="/curved_logo.png" alt="Logo" className="h-12 md:h-14 w-auto" />
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-[#16243B] text-[16px] font-normal px-[15px] py-[10px]">Home</a>
          <div className="relative group">
            <button className="text-[#16243B] text-[16px] font-normal px-[10px] py-[10px] flex items-center gap-1">
              Services <FaChevronDown />
            </button>
            {/* Dropdown remains the same for functionality */}
            <div className="absolute left-0 mt-2 hidden group-hover:block bg-white border rounded-md shadow-lg w-56">
                <a className="block px-4 py-2 hover:bg-slate-50" href="#">Web App Security Audits</a>
                <a className="block px-4 py-2 hover:bg-slate-50" href="#">Cloud Security Assessments</a>
                <a className="block px-4 py-2 hover:bg-slate-50" href="#">PCI DSS Gap Assessments</a>
                <a className="block px-4 py-2 hover:bg-slate-50" href="#">Security Awareness Training</a>
            </div>
          </div>
          <a href="#" className="text-[#16243B] text-[16px] font-normal px-[15px] py-[10px]">Blogs</a>
        </div>
        <div>
          <a className="nav-button w-[125px] h-[44px] flex items-center justify-center gap-[5px] text-white" href="#contact">
            {/* Placeholder for call icon */}
            <FaPhone size={18} />
            <span>Contact us</span>
          </a>
        </div>
      </div>
    </nav>
  )
}

function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceType: 'Web Application Security Audits',
    message: '',
    termsAccepted: false,
  })

  const [status, setStatus] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const base = import.meta?.env?.VITE_API_BASE_URL || ''
      const res = await axios.post(`${base}/api/contact`, form)
      setStatus(res.data?.message || 'Submitted')
      setForm({
        firstName: '', lastName: '', email: '', phone: '', serviceType: 'Web Application Security Audits', message: '', termsAccepted: false,
      })
      setShowPopup(true)
    } catch (err) {
      setStatus(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Success Popup Overlay */}
      {showPopup && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
          <div className="relative drop-shadow-2xl flex flex-col items-center">
            <img src="/popup.png" alt="Submission success" className="w-[90vw] max-w-[720px] h-auto rounded-2xl shadow-2xl" />
            {/* Overlay Continue button centered on the image button area */}
            <button aria-label="Continue" onClick={() => setShowPopup(false)} className="absolute left-1/2 -translate-x-1/2 bottom-[12%] w-[220px] h-[64px] bg-transparent text-transparent rounded-xl cursor-pointer border-0 shadow-none"></button>
            <button aria-label="Close" onClick={() => setShowPopup(false)} className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full w-8 h-8 text-slate-700 shadow">×</button>
          </div>
        </div>
      )}

      <div className="figma-gradient-background">
        <section id="contact" className=" mx-auto px-4 sm:px-8 lg:px-[151px] pt-16 sm:pt-20 lg:pt-[112px] pb-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-[0px]">
            {/* Left Content */}
            <div className="w-full lg:w-[55%] flex flex-col gap-[20px] ">
              <div className="flex flex-col gap-[16px] pb-20">
                  <p className="text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-black">Contact us</p>
                  <div className='flex flex-col gap-[24px]'>
                      <h1 className="heading-gradient text-[28px] sm:text-[36px] lg:text-[48px] leading-[1.25] sm:leading-[1.25] lg:leading-[1.2] font-bold">Let's Secure Your Business</h1>
                      <p className="text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.6] text-black">Have questions about our services or need a custom security solution? Fill<br />out the form and our team will get back to you within 24 hours.</p>
                  </div>
              </div>
              <div className="flex flex-col gap-[16px] py-[8px]">
                  <a href="mailto:email@example.com" className="flex items-center gap-[16px] text-[16px] underline">
                      <FaEnvelope size={24} /> email@example.com
                  </a>
                  <a href="tel:+15550000000" className="flex items-center gap-[16px] text-[16px] underline">
                      <FaPhone size={24} /> +1 (555) 000-0000
                  </a>
                  <div className="flex items-center gap-[16px] text-[16px]">
                      <FaMapMarkerAlt size={24} /> 123 Sample St, Sydney NSW 2000 AU
                  </div>
              </div>
              {/* Shield Icon - approximated from previous implementation */}
              <div className="pt-6 sm:pt-8 lg:pt-10 relative z-30">
                <img src="/Frame 363.png" alt="Security graphic" className="w-[220px] sm:w-[280px] lg:w-[340px] h-auto relative z-30" />
                <img src="/Shadow sphere.png" alt="Sphere shadow" className="absolute right-1/2 -mr-[-22%] -bottom-[6px] sm:-bottom-[4px] lg:-bottom-[2px] w-[90px] sm:w-[110px] lg:w-[130px] h-auto pointer-events-none select-none opacity-85 z-20" />
              </div>
            </div>

            {/* Right Form */}
            <form onSubmit={handleSubmit} className="w-full lg:w-[45%] flex flex-col gap-[24px] lg:ml-[80px]  ">
              <div className="flex flex-col md:flex-row gap-4 md:gap-[24px] ">
                <div className="w-full md:w-[288px] flex flex-col gap-[8px]">
                  <label className='text-[16px]'>First name</label>
                  <input className="form-input" name="firstName" value={form.firstName} onChange={handleChange} required />
                </div>
                <div className="w-full md:w-[288px] flex flex-col gap-[8px]">
                  <label className='text-[16px]'>Last name</label>
                  <input className="form-input" name="lastName" value={form.lastName} onChange={handleChange} required />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-[24px]">
                <div className="w-full md:w-[288px] flex flex-col gap-[8px]">
                  <label className='text-[16px]'>Email</label>
                  <input type="email" className="form-input" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="w-full md:w-[288px] flex flex-col gap-[8px]">
                  <label className='text-[16px]'>Phone number</label>
                  <input className="form-input" name="phone" value={form.phone} onChange={handleChange} />
                </div>
              </div>
              
              <div className="py-[16px] flex flex-col gap-[16px]">
                <p className='text-[16px]'>Service Type?</p>
                <div className='flex flex-col gap-[14px]'>
                    <div className='flex gap-[24px]'>
                        <label className="radio-label w-[288px]">
                            <input type="radio" name="serviceType" value="Web Application Security Audits" checked={form.serviceType === 'Web Application Security Audits'} onChange={handleChange} className="radio-input" />
                            <span>Web Application Security Audits</span>
                        </label>
                        <label className="radio-label w-[288px]">
                            <input type="radio" name="serviceType" value="PCI DSS Gap Assessments" checked={form.serviceType === 'PCI DSS Gap Assessments'} onChange={handleChange} className="radio-input" />
                            <span>PCI DSS Gap Assessments</span>
                        </label>
                    </div>
                    <div className='flex gap-[24px]'>
                        <label className="radio-label w-[288px]">
                            <input type="radio" name="serviceType" value="Cloud Security Assessments" checked={form.serviceType === 'Cloud Security Assessments'} onChange={handleChange} className="radio-input" />
                            <span>Cloud Security Assessments</span>
                        </label>
                         <label className="radio-label w-[288px]">
                            <input type="radio" name="serviceType" value="Security Awareness Training" checked={form.serviceType === 'Security Awareness Training'} onChange={handleChange} className="radio-input" />
                            <span>Security Awareness Training</span>
                        </label>
                    </div>
                </div>
              </div>

              <div className="flex flex-col gap-[8px]">
                <label className='text-[16px]'>Message</label>
                <textarea name="message" className="form-textarea" placeholder="Type your message..." value={form.message} onChange={handleChange} />
              </div>
              
              <div className='pb-[16px]'>
                <label className="checkbox-label">
                  <input type="checkbox" name="termsAccepted" checked={form.termsAccepted} onChange={handleChange} required className="checkbox-input" />
                  <span>I accept the <strong>Terms</strong></span>
                </label>
              </div>

              <div>
                <button type="submit" className="form-button">Book your call</button>
              </div>

              {status && (
                <p className="pt-3 text-sm text-green-700">{status}</p>
              )}
            </form>
          </div>
        </section>
      </div>

      <div className="-mt-16 relative z-10">
        <img src="/rectangle.png" alt="divider" className="w-full h-[33px] object-cover" />
      </div>

      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <img src="/webflow.png" alt="Webflow" className="w-40 h-16" onError={(e)=>{ e.currentTarget.style.display='none'; }} />
          </div>
          <blockquote className="italic text-slate-700 text-lg md:text-xl">
            "Security Council transformed our cybersecurity posture, providing invaluable insights and support that exceeded our expectations."
          </blockquote>
          <div className="mt-6 flex flex-col items-center gap-1 text-slate-600">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
              <span className="text-slate-500">JD</span>
            </div>
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-xs">CISO, TechCorp</div>
            <div className="mt-3 flex items-center gap-2">
              {[0, 1, 2].map(i => (
                <span key={i} className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-slate-700' : 'bg-slate-300'}`}></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-center">
              <img src="/curved_logo.png" alt="Logo" className="h-12 md:h-14 w-auto" />
            </div>
            
            <nav className="flex flex-wrap items-center gap-10">
              <a href="#contact" className="nav-link font-medium">Contact Us</a>
              <a href="#" className="nav-link font-medium">About Us</a>
              <a href="#" className="nav-link font-medium">Our Services</a>
              <a href="#" className="nav-link font-medium">Blog Insights</a>
            </nav>
            
            <div className="flex items-center gap-4">
              {[
                { icon: FaFacebookF, href: '#', color: 'hover:text-blue-600' },
                { icon: FaInstagram, href: '#', color: 'hover:text-pink-500' },
                { icon: FaLinkedinIn, href: '#', color: 'hover:text-blue-700' },
                { icon: FaXTwitter, href: '#', color: 'hover:text-slate-800' },
                { icon: FaYoutube, href: '#', color: 'hover:text-red-600' },
              ].map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a key={index} href={social.href} className={`p-2 rounded-lg bg-slate-100 text-slate-600 transition-all duration-200 hover:bg-white hover:shadow-md ${social.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
              <div className="font-medium">© 2025. All rights reserved.</div>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Terms of Use</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return <ContactPage />
}

export default App
