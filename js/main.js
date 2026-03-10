  // Intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .roadmap-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Stagger roadmap cards
  document.querySelectorAll('.roadmap-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
  });
  document.querySelectorAll('.feature-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
  });

  // Click logo to fly a bird icon toward the Play Now button in ~3 seconds.
  const logoLink = document.querySelector('.nav-logo');
  const playNowButton = document.querySelector('.btn-lg.primary');
  let activeLogoFlights = 0;

  if (logoLink && playNowButton) {
    logoLink.addEventListener('click', (event) => {
      event.preventDefault();

      const logoBird = logoLink.querySelector('.nav-logo-img') || logoLink;
      const startRect = logoBird.getBoundingClientRect();
      const endRect = playNowButton.getBoundingClientRect();
      const baseStartX = startRect.left + (startRect.width / 2);
      const baseStartY = startRect.top + (startRect.height / 2);
      const endX = endRect.left + (endRect.width / 2);
      const endY = endRect.top + (endRect.height / 2);

      const bezierPoint = (t, p0, p1, p2) => ((1 - t) * (1 - t) * p0) + (2 * (1 - t) * t * p1) + (t * t * p2);
      const bezierSlope = (t, p0, p1, p2) => (2 * (1 - t) * (p1 - p0)) + (2 * t * (p2 - p1));

      const startSpreadX = (Math.random() * 16) - 8;
      const startSpreadY = (Math.random() * 14) - 7;
      const startX = baseStartX + startSpreadX;
      const startY = baseStartY + startSpreadY;

      const randomDriftX = (Math.random() * 68) - 34;
      const randomDriftY = (Math.random() * 64) - 32;
      const randomAngleBias = (Math.random() * 18) - 9;

      // A higher control point plus wander creates a floatier path.
      const controlX = ((startX + endX) / 2) + randomDriftX;
      const controlY = (Math.min(startY, endY) - Math.max(140, Math.abs(endX - startX) * 0.22)) + randomDriftY;

      const bird = document.createElement('i');
      bird.className = 'ti ti-feather logo-bird-flight';
      bird.style.fontSize = `${22 + (Math.random() * 9)}px`;
      bird.style.left = `${startX}px`;
      bird.style.top = `${startY}px`;
      bird.style.opacity = '0';
      document.body.appendChild(bird);
      activeLogoFlights += 1;
      playNowButton.classList.add('logo-fly-target');

      const durationMs = 2800 + (Math.random() * 900);
      const wobblePhase = Math.random() * Math.PI * 2;
      const wobbleAmplitude = 6 + (Math.random() * 11);
      const wobbleSpeed = 4 + (Math.random() * 2.5);
      const startTime = performance.now();

      const animateFlight = (now) => {
        const t = Math.min((now - startTime) / durationMs, 1);
        const driftX = Math.sin((t * wobbleSpeed * Math.PI * 2) + wobblePhase) * wobbleAmplitude;
        const driftY = Math.cos((t * (wobbleSpeed - 0.7) * Math.PI * 2) + wobblePhase) * (wobbleAmplitude * 0.45);

        const x = bezierPoint(t, startX, controlX, endX) + driftX;
        const y = bezierPoint(t, startY, controlY, endY) + driftY;
        const dx = bezierSlope(t, startX, controlX, endX);
        const dy = bezierSlope(t, startY, controlY, endY);

        const heading = Math.atan2(dy, dx) * (180 / Math.PI);
        const wingFlap = Math.sin((t * 16 * Math.PI) + wobblePhase) * (7 + Math.random() * 3);
        const scale = 0.9 + (Math.sin((t * 14 * Math.PI) + wobblePhase) * 0.12);
        const fadeIn = Math.min(1, t / 0.07);
        const fadeOut = t > 0.86 ? 1 - ((t - 0.86) / 0.14) : 1;

        bird.style.left = `${x}px`;
        bird.style.top = `${y}px`;
        bird.style.opacity = `${Math.max(0, fadeIn * fadeOut)}`;
        bird.style.transform = `translate(-50%, -50%) rotate(${heading + wingFlap + randomAngleBias}deg) scale(${scale})`;

        if (t < 1) {
          requestAnimationFrame(animateFlight);
          return;
        }

        bird.remove();
        activeLogoFlights = Math.max(0, activeLogoFlights - 1);
        if (activeLogoFlights === 0) {
          playNowButton.classList.remove('logo-fly-target');
        }
        playNowButton.classList.add('logo-fly-hit');
        setTimeout(() => playNowButton.classList.remove('logo-fly-hit'), 560);
      };

      requestAnimationFrame(animateFlight);
    });
  }

  // Donate button handler
  document.getElementById('donate-btn').addEventListener('click', function() {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = "We don't deserve it yet. Thanks ❤";
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  });

  // Generate QR Code with native center logo support.
  const qrRoot = document.getElementById("qrcode");
  if (qrRoot && window.QRCodeStyling) {
    const qrCode = new QRCodeStyling({
      width: 160,
      height: 160,
      type: 'canvas',
      data: 'https://hyzeer.com/found',
      image: 'img/logo.png',
      qrOptions: {
        errorCorrectionLevel: 'H'
      },
      dotsOptions: {
        color: '#000000',
        type: 'square'
      },
      backgroundOptions: {
        color: '#ffffff'
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.22,
        margin: 2,
        crossOrigin: 'anonymous'
      }
    });

    qrRoot.innerHTML = '';
    qrCode.append(qrRoot);
  }
