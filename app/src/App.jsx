import { useLabState } from './hooks/useLabState';
import Header from './components/Header';
import MapSection from './components/MapSection';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Level3 from './components/Level3';
import Toast from './components/Toast';
import Footer from './components/Footer';

export default function App() {
  const lab = useLabState();

  return (
    <div
      data-theme={lab.theme}
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--ink)',
        transition: 'background 0.25s ease, color 0.25s ease',
        backgroundImage:
          'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        fontFamily: 'Manrope, Helvetica, sans-serif',
        paddingBottom: 0,
        zoom: lab.zoom,
      }}
    >
      <Header lab={lab} />

      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        {lab.isMap && <MapSection lab={lab} />}
        {lab.isL1 && <Level1 lab={lab} />}
        {lab.isL2 && <Level2 lab={lab} />}
        {lab.isL3 && <Level3 lab={lab} />}
      </main>

      <Toast toast={lab.toast} />

      <Footer lab={lab} />
    </div>
  );
}
