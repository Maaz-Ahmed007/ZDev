export const HERO_KEYFRAMES = `
  /* Orbs — transform only, compositor thread */
  @keyframes orb-left {
    from { transform: translate(-50%,-50%) rotate(0deg)   translateX(260px) rotate(0deg);   }
    to   { transform: translate(-50%,-50%) rotate(360deg) translateX(260px) rotate(-360deg); }
  }
  @keyframes orb-right {
    from { transform: translate(-50%,-50%) rotate(180deg) translateX(240px) rotate(-180deg); }
    to   { transform: translate(-50%,-50%) rotate(540deg) translateX(240px) rotate(-540deg); }
  }

  /* Reality gradient */
  @keyframes reality-flow {
    0%   { background-position: 0%   50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0%   50%; }
  }

  /* Title glow — opacity only */
  @keyframes title-glow {
    0%,100% { text-shadow: 0 0 40px rgba(160,120,245,0.10), 0 0 80px rgba(72,149,239,0.05); }
    50%     { text-shadow: 0 0 60px rgba(160,120,245,0.18), 0 0 100px rgba(72,149,239,0.08); }
  }

  /* Entrances */
  @keyframes fade-up {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes fade-scale {
    from { opacity:0; transform:scale(0.94); }
    to   { opacity:1; transform:scale(1);    }
  }

  /* Grid glows — opacity + scale only */
  @keyframes glow-breathe {
    0%,100% { opacity:0.12; transform:scale(1);   }
    50%     { opacity:0.55; transform:scale(1.35); }
  }

  /* ── Mobile specific ── */
  @keyframes m-bg-shift {
    0%   { background-position: 0%   0%;   }
    50%  { background-position: 100% 100%; }
    100% { background-position: 0%   0%;   }
  }
  @keyframes m-float {
    0%,100% { transform: translateY(0);    }
    50%     { transform: translateY(-10px); }
  }
  @keyframes m-ring-out {
    0%   { transform:scale(1); opacity:0.5; }
    100% { transform:scale(3); opacity:0;   }
  }
  @keyframes m-dot-drift {
    0%,100% { transform:translateY(0);   opacity:0.25; }
    50%     { transform:translateY(-5px); opacity:0.6;  }
  }
  @keyframes m-line-draw {
    from { transform:scaleX(0); }
    to   { transform:scaleX(1); }
  }
  @keyframes m-card-shine {
    0%      { left:-100%; }
    45%,100% { left:220%;  }
  }
  @keyframes m-orbit-small {
    from { transform: rotate(0deg)   translateX(28px) rotate(0deg);   }
    to   { transform: rotate(360deg) translateX(28px) rotate(-360deg); }
  }
  @keyframes m-swipe-pulse {
    0%, 100% { opacity: 0; transform: translateY(6px); }
    50% { opacity: 1; transform: translateY(-4px); }
  }
`;
