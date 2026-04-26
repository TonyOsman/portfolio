/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakRadio,
   Nav, Hero, StatsStrip, TechStack, Experience, Projects, Updates, Education, Contact */
const { useEffect } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroMood": "cosmic",
  "theme": "dark",
  "animations": "on"
}/*EDITMODE-END*/;

// Open the dev Tweaks panel via Shift+T or ?dev=1.
function useDevToggle() {
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('dev') === '1') {
      // Defer so the panel mounts and registers its message listener first.
      setTimeout(() => window.postMessage({ type: '__activate_edit_mode' }, '*'), 200);
    }
    const onKey = (e) => {
      if (e.shiftKey && (e.key === 'T' || e.key === 't') && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = (e.target && e.target.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        window.postMessage({ type: '__activate_edit_mode' }, '*');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}

function App() {
  const [tweaks, setTweak] = useTweaks(DEFAULTS);
  const data = window.PROFILE_DATA;
  useDevToggle();

  useEffect(() => {
    document.body.classList.toggle('theme-light', tweaks.theme === 'light');
    document.body.classList.toggle('animations-off', tweaks.animations === 'off');
  }, [tweaks.theme, tweaks.animations]);

  if (!data) return null;

  return (
    <>
      <Nav name={data.name} />
      <Hero data={data} heroMood={tweaks.heroMood} />
      <StatsStrip stats={data.stats} />
      <Experience items={data.experience} />
      <TechStack stack={data.techStack} />
      <Projects items={data.projects} />
      <Updates items={data.updates} name={data.name} headline={data.headline} />
      <Education items={data.education} />
      <Contact data={data} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero Imagery">
          <TweakRadio
            label="Mood"
            value={tweaks.heroMood}
            onChange={(v) => setTweak('heroMood', v)}
            options={[
              { value: 'cosmic', label: 'Cosmos' },
              { value: 'aurora', label: 'Aurora' },
              { value: 'infrastructure', label: 'Infra' },
              { value: 'city', label: 'City' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Color Theme">
          <TweakRadio
            label="Palette"
            value={tweaks.theme}
            onChange={(v) => setTweak('theme', v)}
            options={[
              { value: 'dark', label: 'Dark' },
              { value: 'light', label: 'Light' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Motion">
          <TweakRadio
            label="Reveal animations"
            value={tweaks.animations}
            onChange={(v) => setTweak('animations', v)}
            options={[
              { value: 'on', label: 'On' },
              { value: 'off', label: 'Off' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
