export const HERO_KEYFRAMES = `
  /* ═══ DARK SUN — breathing core ═══ */
  @keyframes sun-pulse {
    0%, 100% { opacity: 0.8; transform: scale(1);   }
    50%      { opacity: 1;   transform: scale(1.05); }
  }

  /* ═══ SUN RAYS — rotating beams ═══ */
  @keyframes sun-rays-spin {
    from { transform: translate(-50%, -50%) rotate(0deg);   }
    to   { transform: translate(-50%, -50%) rotate(360deg); }
  }

  /* ═══ ORBITAL FLARES — paths & glow ═══ */
  @keyframes orb-orbit-a {
    from { transform: rotate(0deg)   translateX(280px) rotate(0deg);   }
    to   { transform: rotate(360deg) translateX(280px) rotate(-360deg); }
  }
  @keyframes orb-orbit-b {
    from { transform: rotate(180deg) translateX(260px) rotate(-180deg); }
    to   { transform: rotate(540deg) translateX(260px) rotate(-540deg); }
  }
  @keyframes orb-glow-a {
    0%, 100% { opacity: 0.4; transform: scale(1);   }
    50%      { opacity: 0.9; transform: scale(1.3); }
  }
  @keyframes orb-glow-b {
    0%, 100% { opacity: 0.3; transform: scale(1);   }
    50%      { opacity: 0.8; transform: scale(1.2); }
  }

  /* ═══ UTILITY: Reality gradient flow ═══ */
  @keyframes reality-flow {
    0%   { background-position: 0%   50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0%   50%; }
  }

  /* ═══ UTILITY: Entrances ═══ */
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fade-scale {
    from { opacity: 0; transform: scale(0.94); }
    to   { opacity: 1; transform: scale(1);    }
  }

  /* ═══ UTILITY: Grid breathe ═══ */
  @keyframes glow-breathe {
    0%, 100% { opacity: 0.12; transform: scale(1);   }
    50%      { opacity: 0.55; transform: scale(1.35); }
  }

  /* ═══ MOBILE: Background & Float ═══ */
  @keyframes m-bg-shift {
    0%   { background-position: 0%   0%;   }
    50%  { background-position: 100% 100%; }
    100% { background-position: 0%   0%;   }
  }
  @keyframes m-float {
    0%, 100% { transform: translateY(0);    }
    50%      { transform: translateY(-10px); }
  }
  @keyframes m-ring-out {
    0%   { transform:scale(1); opacity:0.5; }
    100% { transform:scale(3); opacity:0;   }
  }
  @keyframes m-orbit-small {
    from { transform: rotate(0deg)   translateX(28px) rotate(0deg);   }
    to   { transform: rotate(360deg) translateX(28px) rotate(-360deg); }
  }
`;
