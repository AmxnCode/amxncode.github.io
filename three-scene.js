/**
 * Three.js 3D Visual Engine for Amanpreet Singh (AmanX) Portfolio
 * High-performance WebGL Scene with Interactive Neural Core, Constellation Field,
 * Scroll-Driven Camera Transitions, and Real-Time Theme Morphing.
 */

class Portfolio3DScene {
  constructor() {
    this.container = document.getElementById('webgl-container');
    if (!this.container || typeof THREE === 'undefined') {
      console.warn('Three.js or WebGL container not found. Running in fallback mode.');
      return;
    }

    this.init();
    this.createNeuralCore();
    this.createParticleConstellation();
    this.createFloatingTechRings();
    this.bindEvents();
    this.animate();
  }

  init() {
    // Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0d14, 0.022);

    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 24);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.container.appendChild(this.renderer.domElement);

    // Color Palettes for 3D Themes
    this.themes = {
      cyberpunk: {
        primary: 0x38bdf8,   // Neon Cyan
        secondary: 0xa855f7, // Violet
        accent: 0x60a5fa,    // Blue
        particle: 0x38bdf8,
        ambient: 0x0f172a
      },
      emerald: {
        primary: 0x10b981,   // Emerald
        secondary: 0x38bdf8, // Cyan
        accent: 0x34d399,    // Mint
        particle: 0x10b981,
        ambient: 0x064e3b
      },
      quantum: {
        primary: 0xf59e0b,   // Amber / Gold
        secondary: 0xec4899, // Pink
        accent: 0xfbbf24,    // Yellow
        particle: 0xf59e0b,
        ambient: 0x451a03
      }
    };
    this.currentTheme = 'cyberpunk';

    // Mouse Interaction
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    // Scroll Interpolation
    this.scrollProgress = 0;
    this.targetScrollProgress = 0;

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    this.pointLight1 = new THREE.PointLight(this.themes[this.currentTheme].primary, 2.5, 50);
    this.pointLight1.position.set(12, 12, 12);
    this.scene.add(this.pointLight1);

    this.pointLight2 = new THREE.PointLight(this.themes[this.currentTheme].secondary, 2.0, 50);
    this.pointLight2.position.set(-12, -10, 8);
    this.scene.add(this.pointLight2);
  }

  createNeuralCore() {
    this.coreGroup = new THREE.Group();

    // 1. Inner Glowing Icosahedron
    const innerGeom = new THREE.IcosahedronGeometry(3.5, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: this.themes[this.currentTheme].primary,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      roughness: 0.2,
      metalness: 0.8
    });
    this.innerCore = new THREE.Mesh(innerGeom, innerMat);
    this.coreGroup.add(this.innerCore);

    // 2. High-Density Quantum Lattice (Octahedron)
    const octaGeom = new THREE.OctahedronGeometry(4.8, 1);
    const octaMat = new THREE.MeshBasicMaterial({
      color: this.themes[this.currentTheme].secondary,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    this.outerLattice = new THREE.Mesh(octaGeom, octaMat);
    this.coreGroup.add(this.outerLattice);

    // 3. Central Glowing Pulsing Sphere
    const centerGeom = new THREE.SphereGeometry(1.6, 24, 24);
    const centerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85
    });
    this.centralLight = new THREE.Mesh(centerGeom, centerMat);
    this.coreGroup.add(this.centralLight);

    this.coreGroup.position.set(5.5, 0, 0);
    this.scene.add(this.coreGroup);
  }

  createFloatingTechRings() {
    this.ringsGroup = new THREE.Group();

    // Torus Rings rotating around the neural core
    const ringRadii = [6.2, 7.5, 8.8];
    this.rings = [];

    ringRadii.forEach((r, idx) => {
      const ringGeom = new THREE.TorusGeometry(r, 0.04, 12, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? this.themes[this.currentTheme].primary : this.themes[this.currentTheme].secondary,
        transparent: true,
        opacity: 0.55
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = Math.PI / (idx + 1.8);
      ringMesh.rotation.y = Math.PI / (idx + 2.4);
      this.rings.push(ringMesh);
      this.ringsGroup.add(ringMesh);
    });

    this.ringsGroup.position.set(5.5, 0, 0);
    this.scene.add(this.ringsGroup);
  }

  createParticleConstellation() {
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const spread = 70;
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * spread;
      positions[i + 1] = (Math.random() - 0.5) * spread;
      positions[i + 2] = (Math.random() - 0.5) * (spread * 0.7);

      scales[i / 3] = Math.random() * 2.5 + 0.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom circular glow particle shader texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.35, 'rgba(56, 189, 248, 0.8)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.8,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: this.themes[this.currentTheme].particle
    });

    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  setTheme(themeName) {
    if (!this.themes[themeName]) return;
    this.currentTheme = themeName;
    const theme = this.themes[themeName];

    // Morph Materials
    if (this.innerCore) this.innerCore.material.color.setHex(theme.primary);
    if (this.outerLattice) this.outerLattice.material.color.setHex(theme.secondary);
    if (this.particleSystem) this.particleSystem.material.color.setHex(theme.particle);
    if (this.pointLight1) this.pointLight1.color.setHex(theme.primary);
    if (this.pointLight2) this.pointLight2.color.setHex(theme.secondary);

    if (this.rings) {
      this.rings.forEach((r, idx) => {
        r.material.color.setHex(idx % 2 === 0 ? theme.primary : theme.secondary);
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.targetScrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = performance.now() * 0.001;

    // Smooth Mouse Interpolation (Lerp)
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // Smooth Scroll Interpolation
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.08;

    // 1. Rotate Neural Core & Lattice
    if (this.coreGroup) {
      this.innerCore.rotation.x = time * 0.45;
      this.innerCore.rotation.y = time * 0.65;

      this.outerLattice.rotation.x = -time * 0.3;
      this.outerLattice.rotation.z = time * 0.4;

      // Pulse central light with breathing sine wave
      const pulse = 1.0 + Math.sin(time * 3) * 0.25;
      this.centralLight.scale.set(pulse, pulse, pulse);

      // Core Position reacting to scroll and mouse
      // Shift core from right (hero) towards background as user scrolls
      const targetCoreX = 5.5 - this.scrollProgress * 9.0;
      const targetCoreY = Math.sin(time * 0.8) * 0.6 - this.mouseY * 1.5;
      const targetCoreZ = -this.scrollProgress * 15.0;

      this.coreGroup.position.set(targetCoreX, targetCoreY, targetCoreZ);
      if (this.ringsGroup) {
        this.ringsGroup.position.copy(this.coreGroup.position);
      }
    }

    // 2. Rotate Tech Rings
    if (this.rings) {
      this.rings[0].rotation.z = time * 0.5;
      this.rings[1].rotation.x = time * 0.35;
      this.rings[2].rotation.y = -time * 0.4;
    }

    // 3. Gentle Particle Field Drift
    if (this.particleSystem) {
      this.particleSystem.rotation.y = time * 0.03 + this.mouseX * 0.2;
      this.particleSystem.rotation.x = this.mouseY * 0.15;
    }

    // 4. Dynamic Camera Parallax & Subtle Scroll Travel
    this.camera.position.x = this.mouseX * 2.0;
    this.camera.position.y = -this.mouseY * 2.0 + Math.sin(time * 0.5) * 0.4;
    this.camera.position.z = 24 - this.scrollProgress * 8.0;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  }
}

// Instantiate 3D scene when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.portfolio3D = new Portfolio3DScene();
});
