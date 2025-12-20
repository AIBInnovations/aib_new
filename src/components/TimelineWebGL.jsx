import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './TimelineWebGL.css';

const TimelineWebGL = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particleSystemsRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create 5 different particle systems for each timeline circle
    const particleSystems = [];

    // System 1: Swirling Galaxy
    const createGalaxyParticles = () => {
      const geometry = new THREE.BufferGeometry();
      const particleCount = 2000;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = Math.random() * 2;
        const angle = Math.random() * Math.PI * 2;
        const spinAngle = radius * 3;

        positions[i3] = Math.cos(angle + spinAngle) * radius;
        positions[i3 + 1] = (Math.random() - 0.5) * 0.5;
        positions[i3 + 2] = Math.sin(angle + spinAngle) * radius;

        const mixedColor = new THREE.Color();
        mixedColor.setHSL(0.6 + Math.random() * 0.2, 1, 0.7);
        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Points(geometry, material);
    };

    // System 2: DNA Helix
    const createHelixParticles = () => {
      const geometry = new THREE.BufferGeometry();
      const particleCount = 1500;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const t = (i / particleCount) * Math.PI * 8;
        const radius = 0.8;

        if (i % 2 === 0) {
          positions[i3] = Math.cos(t) * radius;
          positions[i3 + 1] = (i / particleCount) * 4 - 2;
          positions[i3 + 2] = Math.sin(t) * radius;
          colors[i3] = 1;
          colors[i3 + 1] = 0.2;
          colors[i3 + 2] = 0.5;
        } else {
          positions[i3] = Math.cos(t + Math.PI) * radius;
          positions[i3 + 1] = (i / particleCount) * 4 - 2;
          positions[i3 + 2] = Math.sin(t + Math.PI) * radius;
          colors[i3] = 0.2;
          colors[i3 + 1] = 0.8;
          colors[i3 + 2] = 1;
        }
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Points(geometry, material);
    };

    // System 3: Neural Network
    const createNeuralNetwork = () => {
      const geometry = new THREE.BufferGeometry();
      const particleCount = 1000;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 4;
        positions[i3 + 1] = (Math.random() - 0.5) * 4;
        positions[i3 + 2] = (Math.random() - 0.5) * 2;

        colors[i3] = 0.1 + Math.random() * 0.3;
        colors[i3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i3 + 2] = 0.3 + Math.random() * 0.3;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Points(geometry, material);
    };

    // System 4: Sphere Cloud
    const createSphereCloud = () => {
      const geometry = new THREE.BufferGeometry();
      const particleCount = 2500;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = 1.5 + Math.random() * 0.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        const color = new THREE.Color();
        color.setHSL(0.15 + Math.random() * 0.1, 0.9, 0.6);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.025,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Points(geometry, material);
    };

    // System 5: Wave Field
    const createWaveField = () => {
      const geometry = new THREE.BufferGeometry();
      const particleCount = 3000;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const gridSize = Math.sqrt(particleCount);
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = (i % gridSize) / gridSize;
        const z = Math.floor(i / gridSize) / gridSize;

        positions[i3] = (x - 0.5) * 5;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = (z - 0.5) * 5;

        colors[i3] = 0.5 + x * 0.5;
        colors[i3 + 1] = 0.2;
        colors[i3 + 2] = 0.8 + z * 0.2;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Points(geometry, material);
    };

    // Create all particle systems
    particleSystems.push(createGalaxyParticles());
    particleSystems.push(createHelixParticles());
    particleSystems.push(createNeuralNetwork());
    particleSystems.push(createSphereCloud());
    particleSystems.push(createWaveField());

    // Add all systems to scene
    particleSystems.forEach(system => scene.add(system));
    particleSystemsRef.current = particleSystems;

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate each particle system
      particleSystems.forEach((system, index) => {
        if (index === 0) {
          // Galaxy rotation
          system.rotation.y = time * 0.1;
          system.rotation.x = Math.sin(time * 0.2) * 0.2;
        } else if (index === 1) {
          // Helix rotation
          system.rotation.y = time * 0.15;
        } else if (index === 2) {
          // Neural network pulse
          const positions = system.geometry.attributes.position.array;
          for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(time + i) * 0.005;
          }
          system.geometry.attributes.position.needsUpdate = true;
        } else if (index === 3) {
          // Sphere cloud rotation
          system.rotation.x = time * 0.05;
          system.rotation.y = time * 0.08;
        } else if (index === 4) {
          // Wave field animation
          const positions = system.geometry.attributes.position.array;
          for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const z = positions[i + 2];
            positions[i + 1] = Math.sin(x + time) * Math.cos(z + time) * 0.5;
          }
          system.geometry.attributes.position.needsUpdate = true;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      particleSystems.forEach(system => {
        system.geometry.dispose();
        system.material.dispose();
      });
    };
  }, []);

  // Handle scroll for parallax and sticky effect
  useEffect(() => {
    let ticking = false;
    let isMounted = true;

    const updateParticlePositions = () => {
      if (!isMounted) return;

      const timelineCircles = document.querySelectorAll('.timeline-circle');
      const particleSystems = particleSystemsRef.current;
      const camera = cameraRef.current;

      if (!camera || !timelineCircles.length || !particleSystems.length) return;

      timelineCircles.forEach((circle, index) => {
        if (!particleSystems[index] || !circle || !circle.isConnected) return;

        const rect = circle.getBoundingClientRect();

        // Convert screen coordinates to WebGL coordinates
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalize to -1 to 1 range
        const normalizedX = (centerX / window.innerWidth) * 2 - 1;
        const normalizedY = -(centerY / window.innerHeight) * 2 + 1;

        // Convert to 3D space coordinates
        const distance = 5; // Distance from camera
        const vFOV = (camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(vFOV / 2) * distance;
        const width = height * camera.aspect;

        const targetX = normalizedX * (width / 2);
        const targetY = normalizedY * (height / 2);

        // Smooth interpolation
        particleSystems[index].position.x += (targetX - particleSystems[index].position.x) * 0.15;
        particleSystems[index].position.y += (targetY - particleSystems[index].position.y) * 0.15;

        // Parallax effect - slight movement based on scroll
        const scrollProgress = rect.top / window.innerHeight;
        particleSystems[index].position.z = scrollProgress * 0.3;

        // Scale to fit circle size
        const circleSize = rect.width / window.innerWidth;
        const targetScale = circleSize * 3;
        const currentScale = particleSystems[index].scale.x;
        particleSystems[index].scale.setScalar(currentScale + (targetScale - currentScale) * 0.15);

        // Fade based on visibility
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        const targetOpacity = isVisible ? 0.8 : 0;
        particleSystems[index].material.opacity += (targetOpacity - particleSystems[index].material.opacity) * 0.15;
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking && isMounted) {
        requestAnimationFrame(updateParticlePositions);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // Initial update
    requestAnimationFrame(updateParticlePositions);

    return () => {
      isMounted = false;
      ticking = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="timeline-webgl-canvas" />;
};

export default TimelineWebGL;
