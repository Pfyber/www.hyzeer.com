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

  // Click logo to curve a disc into the Play Now basket icon.
  const logoLink = document.querySelector('.nav-logo');
  const playNowButton = document.querySelector('.btn-lg.primary');
  let activeLogoFlights = 0;

  if (logoLink && playNowButton) {
    logoLink.addEventListener('click', (event) => {
      event.preventDefault();

      const logoDisc = logoLink.querySelector('.nav-logo-img') || logoLink;
      const basketTarget = playNowButton.querySelector('.play-now-basket') || playNowButton;
      const startRect = logoDisc.getBoundingClientRect();
      const endRect = basketTarget.getBoundingClientRect();
      const baseStartX = startRect.left + (startRect.width / 2);
      const baseStartY = startRect.top + (startRect.height / 2);
      const endX = endRect.left + (endRect.width / 2);
      const endY = endRect.top + (endRect.height / 2);

      const cubicPoint = (t, p0, p1, p2, p3) => (
        ((1 - t) ** 3) * p0 +
        (3 * ((1 - t) ** 2) * t * p1) +
        (3 * (1 - t) * (t ** 2) * p2) +
        ((t ** 3) * p3)
      );
      const startSpreadX = (Math.random() * 16) - 8;
      const startSpreadY = (Math.random() * 14) - 7;
      const startX = baseStartX + startSpreadX;
      const startY = baseStartY + startSpreadY;

      const viewportWidth = window.innerWidth;
      const horizontalDistance = endX - startX;
      const verticalDistance = endY - startY;
      const openingLead = Math.min(Math.abs(horizontalDistance) * 0.22 + 55 + (Math.random() * 35), 170);
      const finishLead = Math.min(34 + (Math.random() * 48), 96);
      const slightEdgeChance = Math.random() < 0.12;
      const edgePad = slightEdgeChance ? 10 + (Math.random() * 18) : 0;
      const initialDrop = Math.min(Math.max(verticalDistance * 0.35, 54) + (Math.random() * 24), 118);
      const landingDrop = 10 + (Math.random() * 10);
      const control1X = Math.min(viewportWidth + edgePad, startX + (horizontalDistance * 0.18) + openingLead);
      const control1Y = Math.min(endY - 28, startY + initialDrop);
      const control2X = endX - finishLead;
      const control2Y = endY - (42 + (Math.random() * 52));
      const sCurveAmplitude = 26 + (Math.random() * 44);
      const verticalSwing = 20 + (Math.random() * 28);
      const positionAt = (progress) => {
        const sinkIn = progress > 0.82 ? ((progress - 0.82) / 0.18) * landingDrop : 0;
        const baseX = cubicPoint(progress, startX, control1X, control2X, endX);
        const baseY = cubicPoint(progress, startY, control1Y, control2Y, endY);
        const envelope = Math.sin(progress * Math.PI) ** 0.9;
        const lateralSwing = Math.sin(progress * Math.PI * 2) * sCurveAmplitude * envelope;
        const verticalDrift = Math.sin((progress * Math.PI * 2) - (Math.PI * 0.2)) * verticalSwing * envelope;

        return {
          x: baseX + lateralSwing,
          y: baseY + verticalDrift + sinkIn
        };
      };
      const discColorPalette = [
        [135, 205, 222],
        [166, 227, 161],
        [245, 194, 231],
        [250, 179, 135],
        [137, 180, 250],
        [249, 226, 175],
        [148, 226, 213],
        [244, 208, 140]
      ];
      const [red, green, blue] = discColorPalette[Math.floor(Math.random() * discColorPalette.length)];

      const disc = document.createElement('i');
      disc.className = 'ti ti-disc logo-disc-flight';
      disc.style.fontSize = `${20 + (Math.random() * 8)}px`;
      disc.style.color = `rgb(${red}, ${green}, ${blue})`;
      disc.style.textShadow = `0 0 18px rgba(${red}, ${green}, ${blue}, 0.45)`;
      disc.style.left = `${startX}px`;
      disc.style.top = `${startY}px`;
      disc.style.opacity = '0';
      document.body.appendChild(disc);
      activeLogoFlights += 1;
      basketTarget.classList.add('logo-fly-target');

      const durationMs = 1500 + (Math.random() * 700);
      const spinDirection = Math.random() > 0.5 ? 1 : -1;
      const spinStart = Math.random() * 360;
      const bankBias = (Math.random() * 24) - 12;
      const startTime = performance.now();

      const animateFlight = (now) => {
        const t = Math.min((now - startTime) / durationMs, 1);
        const { x, y } = positionAt(t);
        const nextPosition = positionAt(Math.min(1, t + 0.004));
        const dx = nextPosition.x - x;
        const dy = nextPosition.y - y;

        const heading = Math.atan2(dy, dx) * (180 / Math.PI);
        const spinRotation = spinStart + (t * 1080 * spinDirection);
        const scale = t > 0.86 ? 1 - (((t - 0.86) / 0.14) * 0.22) : 1;
        const fadeIn = Math.min(1, t / 0.07);
        const fadeOut = t > 0.94 ? 1 - ((t - 0.94) / 0.06) : 1;

        disc.style.left = `${x}px`;
        disc.style.top = `${y}px`;
        disc.style.opacity = `${Math.max(0, fadeIn * fadeOut)}`;
        disc.style.transform = `translate(-50%, -50%) rotate(${heading + bankBias + spinRotation}deg) scale(${scale})`;

        if (t < 1) {
          requestAnimationFrame(animateFlight);
          return;
        }

        disc.remove();
        activeLogoFlights = Math.max(0, activeLogoFlights - 1);
        if (activeLogoFlights === 0) {
          basketTarget.classList.remove('logo-fly-target');
        }
        basketTarget.classList.add('logo-fly-hit');
        setTimeout(() => basketTarget.classList.remove('logo-fly-hit'), 560);
      };

      requestAnimationFrame(animateFlight);
    });
  }

  const donateButton = document.getElementById('donate-btn');
  if (donateButton) {
    donateButton.addEventListener('click', () => {
      // thanks to the love should be in new line. \n not working in textContent, so we can just split into two lines with a <br>.
      donateButton.innerHTML = "We don't deserve it yet.<br>Thanks for the love though! ♥♥♥";
    });
  }

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
