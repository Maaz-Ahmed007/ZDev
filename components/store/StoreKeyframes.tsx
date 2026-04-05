// components/store/StoreKeyframes.tsx
export const STORE_KEYFRAMES = `
  /* ═══ DRIFTING MESH ORBS — transforming only ═══ */
  @keyframes store-drift-a {
    0%, 100% { transform: translate(0, 0); }
    33%      { transform: translate(50px, -35px); }
    66%      { transform: translate(-20px, 20px); }
  }
  @keyframes store-drift-b {
    0%, 100% { transform: translate(0, 0); }
    33%      { transform: translate(-40px, 30px); }
    66%      { transform: translate(25px, -15px); }
  }
  @keyframes store-drift-c {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%      { transform: translate(30px, -20px) scale(1.05); }
  }
  
  /* ═══ STORE GRID GLOW PULSE ═══ */
  @keyframes store-line-glow {
    0%, 100% { opacity: 0.015; }
    50%      { opacity: 0.045; }
  }

  /* ═══ FLOATING GEOMETRIC SHAPES — slow drift & rotate ═══ */
  @keyframes store-shape-float {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.15; }
    50%      { transform: translateY(-15px) rotate(180deg); opacity: 0.35; }
  }
  @keyframes store-shape-float-alt {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
    50%      { transform: translateY(-10px) rotate(-180deg); opacity: 0.3; }
  }

  /* ═══ MOBILE ACCENTS — simpler pulsing ═══ */
  @keyframes m-store-pulse {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50%      { opacity: 0.4; transform: scale(1.3); }
  }
  @keyframes m-store-beam {
    0%, 100% { opacity: 0.04; }
    50%      { opacity: 0.1; }
  }

  /* ═══ UTILITY: Fade Up ═══ */
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
