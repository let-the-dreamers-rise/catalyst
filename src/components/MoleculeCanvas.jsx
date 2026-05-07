import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const palettes = {
  cluster: ["#50f0b1", "#6ce5ff", "#ffce73", "#d6fff2"],
  rod: ["#ffce73", "#6ce5ff", "#f6fff8", "#83ffcb"],
  island: ["#ff6b8a", "#ffce73", "#6ce5ff", "#eef8ee"],
  zeolite: ["#83ffcb", "#ffce73", "#b8ff62", "#6ce5ff"],
  dual: ["#6ce5ff", "#ffce73", "#ff6b8a", "#f6fff8"],
  enzyme: ["#b8ff62", "#50f0b1", "#ffce73", "#6ce5ff"],
};

function makeAtoms(kind) {
  const atoms = [];
  const count = kind === "rod" ? 34 : kind === "enzyme" ? 38 : 28;
  for (let i = 0; i < count; i += 1) {
    const t = i / count;
    let x = Math.sin(t * Math.PI * 6) * 1.45;
    let y = Math.cos(t * Math.PI * 4) * 0.75;
    let z = Math.sin(t * Math.PI * 3) * 0.95;

    if (kind === "rod") {
      x = (t - 0.5) * 4.5;
      y = Math.sin(t * Math.PI * 7) * 0.45;
      z = Math.cos(t * Math.PI * 7) * 0.45;
    }

    if (kind === "zeolite") {
      const ring = (i % 6) / 6;
      const layer = Math.floor(i / 6) - 2;
      x = Math.cos(ring * Math.PI * 2) * 1.05 + layer * 0.55;
      y = Math.sin(ring * Math.PI * 2) * 1.05;
      z = Math.sin(layer) * 0.55;
    }

    if (kind === "dual") {
      const side = i < count / 2 ? -1 : 1;
      const local = (i % (count / 2)) / (count / 2);
      x = side * 1.3 + Math.sin(local * Math.PI * 4) * 0.45;
      y = Math.cos(local * Math.PI * 4) * 0.75;
      z = Math.sin(local * Math.PI * 2) * 0.7;
    }

    atoms.push({ x, y, z, radius: i % 5 === 0 ? 0.16 : 0.11, colorIndex: i % 4 });
  }
  return atoms;
}

export default function MoleculeCanvas({ candidate }) {
  const hostRef = useRef(null);
  const structure = candidate?.structure ?? "cluster";
  const colors = palettes[structure] ?? palettes.cluster;
  const atoms = useMemo(() => makeAtoms(structure), [structure]);

  useEffect(() => {
    if (!hostRef.current) return undefined;

    const host = hostRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.scale.setScalar(structure === "rod" ? 0.64 : 0.9);
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const key = new THREE.PointLight(0x6ce5ff, 2.4, 12);
    key.position.set(3, 3, 5);
    scene.add(key);

    const fill = new THREE.PointLight(0xffce73, 1.1, 10);
    fill.position.set(-4, -3, 4);
    scene.add(fill);

    const sphereGeometry = new THREE.SphereGeometry(1, 24, 24);
    atoms.forEach((atom) => {
      const material = new THREE.MeshStandardMaterial({
        color: colors[atom.colorIndex],
        roughness: 0.34,
        metalness: atom.colorIndex === 2 ? 0.38 : 0.08,
        emissive: colors[atom.colorIndex],
        emissiveIntensity: 0.08,
      });
      const sphere = new THREE.Mesh(sphereGeometry, material);
      sphere.scale.setScalar(atom.radius);
      sphere.position.set(atom.x, atom.y, atom.z);
      group.add(sphere);
    });

    const bondMaterial = new THREE.LineBasicMaterial({
      color: "#d6fff2",
      transparent: true,
      opacity: 0.32,
    });

    for (let i = 0; i < atoms.length - 1; i += 1) {
      if (i % 3 !== 0 || structure === "zeolite" || structure === "rod") {
        const points = [
          new THREE.Vector3(atoms[i].x, atoms[i].y, atoms[i].z),
          new THREE.Vector3(atoms[i + 1].x, atoms[i + 1].y, atoms[i + 1].z),
        ];
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), bondMaterial));
      }
    }

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;
    const animate = () => {
      if (!reduceMotion) {
        group.rotation.y += 0.006;
        group.rotation.x = Math.sin(Date.now() * 0.00045) * 0.16;
      }
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frameId);
      sphereGeometry.dispose();
      bondMaterial.dispose();
      scene.traverse((node) => {
        if (node.material?.dispose) node.material.dispose();
        if (node.geometry?.dispose && node.geometry !== sphereGeometry) node.geometry.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [atoms, colors, structure]);

  return (
    <div className="molecule-stage" aria-label={`${candidate?.name ?? "candidate"} structure preview`}>
      <div ref={hostRef} className="molecule-canvas" />
      <div className="molecule-caption">
        <span>{candidate?.class ?? "Candidate"}</span>
        <strong>{candidate?.id ?? "CX"}</strong>
      </div>
    </div>
  );
}
