# PipOS — The Little Dream Operating System 🌙✨

> *"Good dreams start small."*

Welcome to **PipOS**, a handcrafted portfolio and interactive storybook operating system built for the official haX.baby **"Baby's First Website"** Hackathon. 

PipOS tells the story and showcases the whimsical inventions of **Pip**, a sleepy, gentle Junior Dream Engineer at Midnight Nursery who turns restless thoughts into peaceful dreams.

---

## 🌟 Official Character Canon

- **Name**: Pip
- **Title**: Junior Dream Engineer (Night Shift)
- **Station**: Midnight Nursery
- **Appearance**: A smooth, round skull face with huge soft eye sockets glowing with warm amber light, a tiny crooked smile, and a cozy bedtime nightcap decorated with golden stars and a pink bow.
- **Personality**: Sleepy, gentle, cozy, friendly, and imaginative. Never scary, gory, creepy, or horror-themed.
- **Mission**: Crafting lullabies, nightlights, bedtime stories, and warm dreams for restless little creatures across the neighborhood.

---

## ✨ Features & Interactive Inventions

### 1. 🎵 The Lullaby Lab (Interactive Audio Synthesizer)
- Handcrafted music-box interface powered by the **Native Web Audio API** (zero external audio libraries).
- **Three Selectable Frequencies**:
  - *Stardust Arpeggio* (twinkling high-register pentatonic chimes)
  - *Moonbeam Waltz* (reassuring, slow melody designed to ease worries)
  - *Cloud Dreams* (deep, airy floating notes creating a cozy blanket of sound)
- Real-time step visualizer, analog volume slider, zero autoplay, and global mute consent synchronization.

### 2. 💡 Nightlight Collection (Ambient Glow Testing Chamber)
- Interactive testing chamber with real-time CSS custom property glow rendering.
- **Three Signature Lamps**:
  - *Moonbeam Lamp* (Amber 2400K captured windowsill moonlight)
  - *Little Star Lantern* (Honey 2700K starlight embers with constellation silhouettes)
  - *Cloud Glow* (Calming 2200K pastel slumber fleece pulsing gently)
- Physical power switch toggle and smooth 0–100% intensity slider.

### 3. 🗺️ Dream Delivery Routes (Illustrated Nocturnal Cartography)
- Whimsical celestial SVG route map documenting Pip's nightly flight paths.
- **Four Rooftop Destinations**:
  - *Bramble Cottage* (The Three Little Hedgehogs)
  - *Whistling Mill* (Pippin the Calico Kitten)
  - *Starlight Attic* (Barnaby the Owlet)
  - *Willow Burrow* (Four Little Rabbit Kits)
- Smooth `requestAnimationFrame` flight dispatcher with celebration chimes upon arrival.

### 4. 📖 Cinematic Interactive Origin Story ("A Little Star, A Very Big Dream")
- Three sequential scroll-driven chapters (each strictly under 150 words):
  - *Scene 01: The Falling Star*
  - *Scene 02: The Dream Workshop*
  - *Scene 03: The First Dream Delivery*
- Sticky chapter stepper with active scene detection via `IntersectionObserver` and smooth jumping.

### 5. 🌙 Dream Mode (Day Shift & Night Shift System)
- Clearly labeled header toggle switching between warm cream storybook colors and cozy deep-lavender nighttime palette.
- Dynamic Web Audio feedback: upward arpeggio when falling asleep, downward wake chimes when rising.
- Safe `localStorage` theme persistence.

### 6. 🎮 Secret Konami Code Easter Egg (`↑ ↑ ↓ ↓ ← → ← → B A`)
- Enter the classic sequence on your keyboard to unlock the full-screen **Dream Celebration Modal**.
- Features floating celestial star shower particles, Pip's official avatar, and the *Honorary Celestial Star Badge*.
- Includes dismiss controls (close button, Escape key) without keyboard trapping.
- **Mobile Friendly**: Includes a discoverable *"Secret Dream Key"* button in the footer for touchscreen visitors.

### 7. 🌟 Secret Clickable Surprises
- **Pip's Secret Dream**: Tap Pip's character card in the Hero section 5 times to reveal *"Pip was saving this dream just for you! 🌟"*.
- **Hidden Stardust**: Tap the celestial divider charm (`✦ · 🌙 · ✦`) in the footer 5 times to collect stardust and shortcut directly to the Dream Celebration.

### 8. 📝 Bedtime Guestbook & 📟 Retro 90s Visitor Counter
- **Guestbook**: Form with real-time character limit countdown (40 chars for name, 200 chars for message), validation, local persistence in `localStorage`, pre-loaded notes from nursery friends (*Starlight Bunny*, *Lullaby Owl*), and a *"Clear My Entries"* safety check.
- **Privacy Notice**: Prominent banner informing visitors that all notes stay strictly on their local device.
- **Honest Meter**: 6-digit vintage mechanical odometer (`000043`) tracking local device visits with session protection against false inflation.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Audio Engine**: Native HTML5 Web Audio API
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS Design System with responsive clamp typography, CSS Custom Properties, and WCAG 2.1 AA focus rings
- **Responsiveness**: Fully audited and optimized from 320px (small mobile) through 1440px (ultrawide desktop)
- **Accessibility**: Semantic HTML5 landmarks, full keyboard support, `prefers-reduced-motion` compliance, screen-reader status announcements

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/sriteja2007/Portfolio-Baby.git
cd Portfolio-Baby

# Install dependencies
npm install

# Start local development server (with HMR)
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
# Compile and bundle for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 🌐 Deployment Configuration

PipOS is configured for instant zero-configuration deployment on **Vercel** and **Netlify**:

- **Vercel**: Pre-configured via `vercel.json` (Vite preset, `npm run build`, `dist` output, SPA rewrites).
- **Netlify**: Pre-configured via `netlify.toml` and `public/_redirects`.

### Option A: Deploy via GitHub (Recommended)
1. Push to your GitHub repository: `https://github.com/sriteja2007/Portfolio-Baby.git`
2. Go to [Vercel](https://vercel.com/new) or [Netlify](https://app.netlify.com/start).
3. Import the `Portfolio-Baby` repository.
4. Framework Preset will auto-detect as **Vite**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Option B: Deploy via Vercel CLI
```bash
# Login to Vercel
npx vercel login

# Deploy production build
npx vercel --prod
```

---

## 📜 License & Acknowledgments

- **Character & Artwork**: &copy; haX.baby. Official haX.baby Skull Baby character used with permission for the *"Baby's First Website"* Hackathon.
- **Created with love** for all the little creatures who need a peaceful night's rest.
