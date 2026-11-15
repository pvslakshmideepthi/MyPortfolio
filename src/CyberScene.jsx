import React from 'react';
import * as THREE from 'three';

const cyan = 0x37dfff;
const blue = 0x197ad8;
const violet = 0x866bff;

function line(points, color, opacity = .45) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
}

function latitude(radius, angle, color, opacity = .25) {
  const points = [];
  for (let i = 0; i <= 120; i++) {
    const theta = i / 120 * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(theta) * radius * Math.cos(angle), Math.sin(angle) * radius, Math.sin(theta) * radius * Math.cos(angle)));
  }
  return line(points, color, opacity);
}

function createGlobe() {
  const globe = new THREE.Group();
  const radius = 2.15;
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(radius - .03, 48, 32), new THREE.MeshPhongMaterial({ color: 0x071729, emissive: 0x08243b, emissiveIntensity: .35, transparent: true, opacity: .74, shininess: 80, side: THREE.DoubleSide })));
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(radius, 28, 18), new THREE.MeshBasicMaterial({ color: blue, wireframe: true, transparent: true, opacity: .12 })));
  for (let i = -3; i <= 3; i++) globe.add(latitude(radius + .015, i * .31, i === 0 ? cyan : blue, i === 0 ? .45 : .2));
  for (let i = 0; i < 12; i++) {
    const points = [];
    for (let j = 0; j <= 64; j++) {
      const a = j / 64 * Math.PI;
      points.push(new THREE.Vector3(Math.sin(a) * Math.cos(i * Math.PI / 12) * radius, Math.cos(a) * radius, Math.sin(a) * Math.sin(i * Math.PI / 12) * radius));
    }
    globe.add(line(points, blue, .2));
  }
  const dots = [];
  for (let i = 0; i < 360; i++) {
    const y = 1 - (i / 359) * 2;
    const ring = Math.sqrt(1 - y * y);
    const a = i * 2.399963;
    dots.push(Math.cos(a) * ring * (radius + .025), y * (radius + .025), Math.sin(a) * ring * (radius + .025));
  }
  const dotGeometry = new THREE.BufferGeometry();
  dotGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dots, 3));
  globe.add(new THREE.Points(dotGeometry, new THREE.PointsMaterial({ color: cyan, size: .027, transparent: true, opacity: .8, sizeAttenuation: true })));
  const nodes = [[.3, .65, .7], [-.7, .24, .68], [.68, -.37, .64], [-.45, -.65, .66], [.76, .38, .52]];
  nodes.forEach(([x, y, z], index) => {
    const p = new THREE.Vector3(x, y, z).normalize().multiplyScalar(radius + .07);
    const node = new THREE.Mesh(new THREE.SphereGeometry(.045, 10, 10), new THREE.MeshBasicMaterial({ color: index % 2 ? violet : cyan }));
    node.position.copy(p);
    globe.add(node);
    const halo = new THREE.Mesh(new THREE.RingGeometry(.08, .11, 24), new THREE.MeshBasicMaterial({ color: index % 2 ? violet : cyan, transparent: true, opacity: .55, side: THREE.DoubleSide }));
    halo.position.copy(p);
    halo.lookAt(p.clone().multiplyScalar(2));
    globe.add(halo);
  });
  for (const [a, b] of [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]) {
    const start = new THREE.Vector3(...nodes[a]).normalize().multiplyScalar(radius);
    const end = new THREE.Vector3(...nodes[b]).normalize().multiplyScalar(radius);
    const mid = start.clone().add(end).normalize().multiplyScalar(radius + .55);
    globe.add(line(new THREE.QuadraticBezierCurve3(start, mid, end).getPoints(36), a % 2 ? violet : cyan, .72));
  }
  return globe;
}

function createShield() {
  const group = new THREE.Group();
  const shape = new THREE.Shape();
  shape.moveTo(0, .62); shape.lineTo(.5, .42); shape.lineTo(.43, -.23); shape.quadraticCurveTo(.27, -.52, 0, -.68); shape.quadraticCurveTo(-.27, -.52, -.43, -.23); shape.lineTo(-.5, .42); shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: .085, bevelEnabled: true, bevelSize: .025, bevelThickness: .025, bevelSegments: 2 });
  const shield = new THREE.Mesh(geometry, new THREE.MeshPhysicalMaterial({ color: 0x0b3151, metalness: .65, roughness: .22, transmission: .12, transparent: true, opacity: .88, emissive: 0x0a4862, emissiveIntensity: .5 }));
  group.add(shield);
  const edges = new THREE.EdgesGeometry(geometry);
  group.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: .85 })));
  const mark = line([new THREE.Vector3(-.21, -.03, .15), new THREE.Vector3(-.04, -.2, .15), new THREE.Vector3(.25, .18, .15)], cyan, .95);
  group.add(mark);
  return group;
}

function createAvatar() {
  const group = new THREE.Group();
  const material = new THREE.MeshPhysicalMaterial({ color: 0x0b2e49, metalness: .78, roughness: .22, emissive: 0x0c4265, emissiveIntensity: .4, transparent: true, opacity: .92 });
  const head = new THREE.Mesh(new THREE.IcosahedronGeometry(.33, 2), material);
  head.position.y = .43;
  group.add(head);
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(.25, .58, .74, 6, 1), material);
  torso.position.y = -.32;
  group.add(torso);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, .2, 8), material);
  neck.position.y = .03;
  group.add(neck);
  group.add(new THREE.LineSegments(new THREE.EdgesGeometry(head.geometry), new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: .42 })));
  const chest = new THREE.Mesh(new THREE.RingGeometry(.11, .14, 30), new THREE.MeshBasicMaterial({ color: cyan, side: THREE.DoubleSide }));
  chest.position.set(0, -.22, .31);
  group.add(chest);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(.67, .77, .08, 48), new THREE.MeshBasicMaterial({ color: blue, wireframe: true, transparent: true, opacity: .75 }));
  base.position.y = -.83;
  group.add(base);
  return group;
}

export default function CyberScene() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050c17, .034);
    const camera = new THREE.PerspectiveCamera(42, 1, .1, 100);
    camera.position.set(0, 0, 13);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0x5c91b7, 1.5));
    const light = new THREE.PointLight(cyan, 32, 14); light.position.set(4, 3, 5); scene.add(light);
    const rim = new THREE.PointLight(violet, 18, 12); rim.position.set(6, -3, -1); scene.add(rim);
    const assembly = new THREE.Group(); scene.add(assembly);
    const globe = createGlobe(); assembly.add(globe);
    const halo = new THREE.Mesh(new THREE.TorusGeometry(2.65, .008, 4, 128), new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: .34 }));
    halo.rotation.set(.45, .28, -.25); assembly.add(halo);
    const haloTwo = new THREE.Mesh(new THREE.TorusGeometry(2.9, .006, 4, 128), new THREE.MeshBasicMaterial({ color: violet, transparent: true, opacity: .26 }));
    haloTwo.rotation.set(-.5, .8, .38); assembly.add(haloTwo);
    const shield = createShield(); shield.position.set(2.48, 1.8, 1.1); shield.scale.setScalar(.55); assembly.add(shield);
    const avatar = createAvatar(); avatar.position.set(2.25, -1.45, 1.5); avatar.scale.setScalar(1.15); assembly.add(avatar);
    const particles = [];
    for (let i = 0; i < 150; i++) {
      const a = i * 2.399963;
      const r = 3.5 + (i % 13) * .21;
      particles.push(Math.cos(a) * r, Math.sin(a) * r * .65, -2 - (i % 7) * .45);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particles, 3));
    scene.add(new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: cyan, size: .028, transparent: true, opacity: .5 })));
    let width = 0; let height = 0; let visible = true; let frame = 0; let last = 0;
    const pointer = { x: 0, y: 0 };
    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(rect.width, 1); height = Math.max(rect.height, 1);
      renderer.setSize(width, height, false); camera.aspect = width / height;
      camera.fov = width < 700 ? 50 : 42; camera.updateProjectionMatrix();
      assembly.position.set(width < 700 ? 0 : width < 1000 ? 1.2 : 2.9, width < 700 ? -.3 : 0, 0);
      assembly.scale.setScalar(width < 700 ? .72 : width < 1000 ? .82 : 1);
      renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(resize); observer.observe(host); resize();
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: .01 }); io.observe(host);
    const onPointer = (event) => { const rect = host.getBoundingClientRect(); pointer.x = (event.clientX - rect.left) / rect.width - .5; pointer.y = (event.clientY - rect.top) / rect.height - .5; };
    host.addEventListener('pointermove', onPointer);
    const animate = (time) => {
      frame = window.requestAnimationFrame(animate);
      if (!visible || reduce || time - last < 16) return;
      last = time;
      globe.rotation.y += .0028; globe.rotation.x += (pointer.y * .12 - globe.rotation.x) * .018;
      assembly.rotation.y += (pointer.x * .09 - assembly.rotation.y) * .018;
      halo.rotation.z += .0008; haloTwo.rotation.z -= .0005;
      shield.rotation.y = Math.sin(time * .0007) * .24;
      shield.position.y = 1.8 + Math.sin(time * .0012) * .09;
      avatar.rotation.y = Math.sin(time * .00045) * .14;
      renderer.render(scene, camera);
    };
    if (!reduce) frame = window.requestAnimationFrame(animate);
    return () => { window.cancelAnimationFrame(frame); observer.disconnect(); io.disconnect(); host.removeEventListener('pointermove', onPointer); scene.traverse((object) => { object.geometry?.dispose(); if (Array.isArray(object.material)) object.material.forEach((m) => m.dispose()); else object.material?.dispose(); }); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  return <div ref={ref} className="cyber-scene" aria-hidden="true" />;
}
