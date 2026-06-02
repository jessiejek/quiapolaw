export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#F9F6F1', color: '#1B2A4A', padding: '24px', fontFamily: 'Montserrat, sans-serif' }}>
      <div style={{ textAlign: 'center', maxWidth: 520 }}>
        <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 700, color: '#D94213', marginBottom: 12 }}>Quiapo Law</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 6vw, 4rem)', lineHeight: 1.05, margin: 0 }}>Page Not Found</h1>
        <p style={{ marginTop: 16, fontSize: '0.95rem', lineHeight: 1.8, color: '#6B7280' }}>The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      </div>
    </main>
  );
}
