'use client';

import SiteHooks from './site-hooks';

const practiceAreas = [
  {
    num: '01',
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    title: 'Family Law',
    text: 'Annulment, legal separation, custody, support, and adoption handled with sensitivity and legal precision.',
    delay: '',
  },
  {
    num: '02',
    icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z',
    title: 'Criminal Defense',
    text: 'Vigorous representation for those facing criminal charges, from inquest to trial and appeals.',
    delay: 'reveal-delay-1',
  },
  {
    num: '03',
    icon: 'M20 6h-2.18c.07-.44.18-.86.18-1 0-2.21-1.79-4-4-4S10 2.79 10 5c0 .14.11.56.18 1H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z',
    title: 'Corporate Law',
    text: 'Business formation, contracts, SEC compliance, mergers, and corporate governance for Philippine enterprises.',
    delay: 'reveal-delay-2',
  },
  {
    num: '04',
    icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    title: 'Real Estate Law',
    text: 'Title disputes, land registration, ejectment, property acquisition, and Torrens title issues resolved.',
    delay: '',
  },
  {
    num: '05',
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z',
    title: 'Labor Law',
    text: 'NLRC cases, illegal dismissal, employee benefits, and labor standards compliance for workers and employers.',
    delay: 'reveal-delay-1',
  },
  {
    num: '06',
    icon: 'M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z',
    title: 'Civil Litigation',
    text: 'Breach of contract, damages, injunctions, and civil claims pursued aggressively in all Philippine courts.',
    delay: 'reveal-delay-2',
  },
];

const whyItems = [
  {
    num: '01',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    title: 'Fresh & Current Legal Knowledge',
    text: 'December 2024 Bar passer with the most up-to-date knowledge of Philippine laws, jurisprudence, and legal developments.',
  },
  {
    num: '02',
    icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z',
    title: 'Confidential & Ethical',
    text: 'Strict adherence to the Code of Professional Responsibility. Your information stays protected.',
  },
  {
    num: '03',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23z',
    title: 'Client-First Approach',
    text: 'We listen first. Every legal strategy is tailored to your unique situation, goals, and resources.',
  },
  {
    num: '04',
    icon: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z',
    title: 'Clear Communication',
    text: 'No legal jargon. We explain your options in plain Filipino or English, so you always know where you stand.',
  },
];

const testimonials = [
  {
    initials: 'M',
    name: 'Maria Santos',
    role: 'Family Law Client · Cebu City',
    text: 'Quiapo Law handled my annulment case with utmost professionalism and compassion. They guided me every step of the way and got a favorable decision faster than I expected.',
  },
  {
    initials: 'R',
    name: 'Roberto Dela Cruz',
    role: 'Labor Law Client · Mandaue City, Cebu',
    text: 'I was wrongfully dismissed from my job. Quiapo Law filed the NLRC case and won full backwages and separation pay. Reliable, honest, and extremely knowledgeable.',
  },
  {
    initials: 'W',
    name: 'Warren A. Nacua',
    role: 'Facebook Recommendation · July 9, 2025 · ',
    linkText: 'View on Facebook',
    linkHref: 'https://www.facebook.com/atty.jnq',
    text: "We are truly grateful for the outstanding legal support we received from Quiapo Law Office. Handling our legal concerns with professionalism, clarity, and empathy, Atty. Quiapo made a challenging situation easier to manage and understand. What we appreciated most was how attentively he listened to our concerns, explained the legal process in simple terms, and made sure we felt supported every step of the way. His integrity, dedication, and calm presence gave us the confidence we needed during a stressful time. If you're looking for a trustworthy and competent lawyer who genuinely cares about your case, we highly recommend Quiapo Law Office.",
  },
];

export default function Page() {
  return (
    <main>
      <nav id="navbar">
        <a href="#" className="nav-logo">
          <div className="nav-logo-mark">
            <img src="/FL2.png" alt="Quiapo Law logo" />
          </div>
          <img className="nav-wordmark" src="/FL4.png" alt="Quiapo Law Law Office & Notary Public wordmark" />
        </a>
        <ul className="nav-links">
          <li><a href="#practice">Practice Areas</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#why">Why Us</a></li>
          <li><a href="#testimonials">Clients</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Contact Us</a>
        <button className="nav-hamburger" id="hamburger" aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className="mobile-drawer" id="mobileDrawer">
        <button className="drawer-close" id="drawerClose" aria-label="Close menu">✕</button>
        <ul className="drawer-links">
          <li><a href="#practice" onClick={() => window.closeDrawer?.()}>Practice Areas</a></li>
          <li><a href="#about" onClick={() => window.closeDrawer?.()}>About</a></li>
          <li><a href="#why" onClick={() => window.closeDrawer?.()}>Why Us</a></li>
          <li><a href="#testimonials" onClick={() => window.closeDrawer?.()}>Clients</a></li>
          <li><a href="#contact" onClick={() => window.closeDrawer?.()}>Contact</a></li>
        </ul>
        <a href="#contact" className="btn-primary" onClick={() => window.closeDrawer?.()} style={{ marginTop: 32, textAlign: 'center', width: '100%' }}>Contact Us</a>
      </div>
      <div className="drawer-overlay" id="drawerOverlay" onClick={() => window.closeDrawer?.()} />

      <section id="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">Cebu · Visayas · Philippines</div>
          <h1 className="hero-title">
            Justice <em>Served</em><br />
            <strong>With Integrity</strong>
          </h1>
          <p className="hero-desc">
            Quiapo Law is a law office and notary public dedicated to litigation, consultation, and retainer services with honesty and competence at every step.
          </p>
          <div className="hero-services reveal reveal-delay-1">
            <span className="hero-service-chip">Litigation</span>
            <span className="hero-service-chip">Consultation</span>
            <span className="hero-service-chip">Retainer</span>
          </div>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Contact Us</a>
            <a href="#practice" className="btn-secondary">Our Practice Areas</a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-num">2024</div>
              <div className="stat-label">Bar Passer</div>
            </div>
            <div>
              <div className="stat-num">100%</div>
              <div className="stat-label">Dedication</div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-right-bg" />
          <div className="hero-right-pattern" />
          <div className="hero-pillar-icon">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="10" width="40" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
              <rect x="25" y="16" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />
              <path d="M28 19 Q24 24 24 30 L24 60 L30 60 L30 30 Q30 24 32 19Z" fill="rgba(255,255,255,0.35)" />
              <path d="M52 19 Q56 24 56 30 L56 60 L50 60 L50 30 Q50 24 48 19Z" fill="rgba(255,255,255,0.35)" />
              <rect x="38" y="19" width="4" height="41" rx="1" fill="rgba(255,255,255,0.2)" />
              <path d="M28 19 C28 19 40 22 52 19" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
              <rect x="22" y="60" width="36" height="4" rx="1" fill="rgba(255,255,255,0.35)" />
              <path d="M26 16 Q27 12 40 10 Q53 12 54 16" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div className="hero-right-content">
            <span className="hero-badge">Law Office &amp; Notary Public</span>
            <blockquote className="hero-quote">
              "The law is not a <em>maze</em>—<br />it is a path. We help<br />you walk it with confidence."
            </blockquote>
            <cite className="hero-cite">— Quiapo Law Philosophy</cite>
          </div>
        </div>
      </section>

      <section id="practice">
        <div className="section-header">
          <div className="reveal">
            <div className="section-eyebrow">Areas of Expertise</div>
            <h2 className="section-title">What We <strong>Fight For</strong></h2>
          </div>
          <p className="section-desc reveal reveal-delay-2">
            From family disputes to corporate matters, we bring deep legal knowledge and personal dedication to every case we take on across the Philippines.
          </p>
        </div>
        <div className="practice-grid">
          {practiceAreas.map((item) => (
            <div key={item.num} className={`practice-card reveal ${item.delay || ''}`} data-num={item.num}>
              <div className="practice-card-accent" />
              <div className="practice-icon">
                <svg viewBox="0 0 24 24"><path d={item.icon} /></svg>
              </div>
              <div className="practice-name">{item.title}</div>
              <p className="practice-text">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about">
        <div className="about-left reveal">
          <div className="about-years">
            <div className="about-years-num">2024</div>
            <div className="about-years-label">Bar<br />Passer</div>
          </div>
          <div className="about-img-wrap">
            <img src="/Blue%20background%20(1).png" alt="Quiapo Law attorney portrait" />
          </div>
          <div className="about-img-border" />
        </div>
        <div className="about-right">
          <div className="section-eyebrow reveal">About The Firm</div>
          <h2 className="section-title reveal reveal-delay-1">Your Trusted <strong>Legal Partner</strong></h2>
          <p className="about-desc reveal reveal-delay-2">
            Quiapo Law was founded on the principle that every Filipino deserves access to justice—regardless of circumstances. Based in Minglanilla, Cebu, our firm brings fresh legal expertise, modern thinking, and genuine care for our clients' outcomes.
          </p>
          <p className="about-desc reveal reveal-delay-2">
            Having passed the Philippine Bar Examinations in December 2024, our attorney is equipped with up-to-date knowledge of Philippine law and a burning passion to serve clients across the Visayas with honesty, diligence, and integrity.
          </p>
          <div className="about-credentials">
            <div className="cred-item reveal reveal-delay-1">
              <div className="cred-icon">⚖️</div>
              <div>
                <div className="cred-title">Member, Integrated Bar of the Philippines</div>
                <div className="cred-sub">IBP Cebu Chapter · Roll of Attorneys No. 9xxx4</div>
              </div>
            </div>
            <div className="cred-item reveal reveal-delay-2">
              <div className="cred-icon">🏛️</div>
              <div>
                <div className="cred-title">Admitted to Practice Before All Philippine Courts</div>
                <div className="cred-sub">Regional Trial Courts · Municipal Trial Courts · Court of Appeals · Quasi-Judicial Bodies</div>
              </div>
            </div>
            <div className="cred-item reveal reveal-delay-3">
              <div className="cred-icon">📝</div>
              <div>
                <div className="cred-title">Philippine Bar Examination Passer</div>
                <div className="cred-sub">December 2024 Bar · Supreme Court of the Philippines</div>
              </div>
            </div>
          </div>
          <a href="#contact" className="btn-primary reveal">Book a Consultation</a>
        </div>
      </section>

      <section id="why">
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-eyebrow reveal" style={{ justifyContent: 'center' }}>Why Choose Us</div>
          <h2 className="section-title reveal reveal-delay-1" style={{ display: 'inline-block', textAlign: 'center' }}>The Quiapo Law <strong>Difference</strong></h2>
        </div>
        <div className="why-grid">
          {whyItems.map((item, idx) => (
            <div key={item.num} className={`why-item reveal ${idx === 1 ? 'reveal-delay-1' : idx === 2 ? 'reveal-delay-2' : idx === 3 ? 'reveal-delay-3' : ''}`}>
              <div className="why-number">{item.num}</div>
              <div className="why-icon">
                <svg viewBox="0 0 24 24"><path d={item.icon} /></svg>
              </div>
              <div className="why-title">{item.title}</div>
              <p className="why-text">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials">
        <div className="section-header">
          <div className="reveal">
            <div className="section-eyebrow">Client Stories</div>
            <h2 className="section-title">What Our <strong>Clients Say</strong></h2>
          </div>
          <p className="section-desc reveal reveal-delay-2">
            Real results for real Filipinos. Here&apos;s what some of our clients have shared about working with Quiapo Law.
          </p>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item, idx) => (
            <div key={item.name} className={`testimonial-card reveal ${idx === 1 ? 'reveal-delay-1' : 'reveal-delay-2'}`}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"{item.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{item.initials}</div>
                <div>
                  <div className="testimonial-name">{item.name}</div>
                  <div className="testimonial-role">
                    {item.role}
                    {'linkHref' in item ? (
                      <>
                        <a href={item.linkHref} target="_blank" rel="noopener noreferrer">{item.linkText}</a>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact">
        <div className="contact-left">
          <div className="section-eyebrow reveal">Get In Touch</div>
          <h2 className="section-title reveal reveal-delay-1">Let&apos;s Discuss <strong>Your Case</strong></h2>
          <p className="contact-desc reveal reveal-delay-2">
            Reach out today and let us help you with litigation, consultation, retainer, and notary public services.
          </p>
          <div className="contact-info">
            <div className="contact-item reveal">
              <div className="contact-item-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
              </div>
              <div>
                <div className="contact-item-label">Office Address</div>
                <div className="contact-item-value">18 Julio St., Tulay<br />Minglanilla, Cebu</div>
              </div>
            </div>
            <div className="contact-item reveal reveal-delay-1">
              <div className="contact-item-icon">
                <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
              </div>
              <div>
                <div className="contact-item-label">Phone / Viber</div>
                <div className="contact-item-value"><a href="tel:+639666610923">0966-661-0923</a><br /><a href="tel:+639691130000">0969-113-0000</a></div>
              </div>
            </div>
            <div className="contact-item reveal reveal-delay-2">
              <div className="contact-item-icon">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              </div>
              <div>
                <div className="contact-item-label">Email</div>
                <div className="contact-item-value"><a href="mailto:consult@quiapolaw.com">consult@quiapolaw.com</a></div>
              </div>
            </div>
            <div className="contact-item reveal reveal-delay-3">
              <div className="contact-item-icon">
                <svg viewBox="0 0 24 24"><path d="M17 1.33c-2.76 0-5 2.24-5 5V9H9v4h3v10h4V13h3.03l.97-4H16V6.33c0-.55.45-1 1-1H20V1.33h-3z" /></svg>
              </div>
              <div>
                <div className="contact-item-label">Facebook</div>
                <div className="contact-item-value"><a href="https://www.facebook.com/atty.jnq" target="_blank" rel="noopener noreferrer">facebook.com/atty.jnq</a></div>
              </div>
            </div>
          </div>
        </div>
        <form className="contact-form reveal" id="inquiryForm">
          <div className="form-title">Contact Us Now</div>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="first_name" placeholder="Juan" required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="last_name" placeholder="dela Cruz" required />
            </div>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="juan@email.com" required />
          </div>
          <div className="form-group">
            <label>Phone / Viber</label>
            <input type="tel" name="phone" placeholder="+63 9XX XXX XXXX" required />
          </div>
          <div className="form-group">
            <label>Legal Matter</label>
            <select name="legal_matter" required>
              <option value="">Select a practice area…</option>
              <option>Family Law (Annulment, Custody)</option>
              <option>Criminal Defense</option>
              <option>Corporate Law</option>
              <option>Real Estate Law</option>
              <option>Labor Law</option>
              <option>Civil Litigation</option>
              <option>Estate Planning</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Brief Description</label>
            <textarea name="message" placeholder="Please briefly describe your legal concern…" required />
          </div>
          <button type="submit" className="form-submit">Send Inquiry →</button>
          <div className="form-status" id="inquiryStatus" aria-live="polite" />
        </form>
      </section>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-mark">
                <img src="/FL2.png" alt="Quiapo Law logo" />
              </div>
              <img className="footer-wordmark" src="/FL4.png" alt="Quiapo Law Law Office & Notary Public wordmark" />
            </div>
            <p className="footer-brand-desc">A trusted Philippine law firm dedicated to justice, integrity, and excellence in legal service. Proudly serving Cebu and the Visayas.</p>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Practice Areas</div>
            <ul>
              <li><a href="#">Family Law</a></li>
              <li><a href="#">Criminal Defense</a></li>
              <li><a href="#">Corporate Law</a></li>
              <li><a href="#">Real Estate</a></li>
              <li><a href="#">Labor Law</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">The Firm</div>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Attorney</a></li>
              <li><a href="#">Testimonials</a></li>
              <li><a href="#">Legal Blog</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <ul>
              <li><a href="#contact">Book Consultation</a></li>
              <li><a href="https://www.google.com/maps/search/18+Julio+St.+Tulay+Minglanilla+Cebu" target="_blank" rel="noopener noreferrer">18 Julio St., Tulay, Minglanilla, Cebu</a></li>
              <li><a href="tel:+639666610923">0966-661-0923</a></li>
              <li><a href="tel:+639691130000">0969-113-0000</a></li>
              <li><a href="mailto:consult@quiapolaw.com">consult@quiapolaw.com</a></li>
              <li><a href="https://www.facebook.com/atty.jnq" target="_blank" rel="noopener noreferrer">Facebook Page</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2025 Quiapo Law. All rights reserved. · IBP Cebu Chapter</div>
          <div className="footer-tagline">"Batas para sa bawat Pilipino."</div>
        </div>
      </footer>

      <SiteHooks />
    </main>
  );
}
