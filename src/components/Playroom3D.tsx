import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Play, Pause } from "lucide-react";

export default function Playroom3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // transparent to blend with CSS backgrounds

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 7;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffb703, 1.5, 10);
    pointLight.position.set(-3, -2, 2);
    scene.add(pointLight);

    // 5. Create Child-Friendly 3D Play Objects (Blocks, Ring, Sphere)
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // Cube Block (Block A)
    const cubeGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x4cc9f0, // Soft Blue
      roughness: 0.2,
      metalness: 0.1,
    });
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    cubeMesh.position.set(-2, 0.5, 0);
    cubeMesh.userData = { id: "Blue Cube", baseSpeed: 0.01 };
    objectsGroup.add(cubeMesh);

    // Sphere Block (Soft Ball)
    const sphereGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xff007f, // Pastel Pink/Rose
      roughness: 0.3,
      metalness: 0.1,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(2, -0.5, 1);
    sphereMesh.userData = { id: "Rose Sphere", baseSpeed: 0.008 };
    objectsGroup.add(sphereMesh);

    // Cylinder/Prism Block (Yellow Cylinder)
    const cylGeo = new THREE.CylinderGeometry(0.6, 0.6, 1.4, 32);
    const cylMat = new THREE.MeshStandardMaterial({
      color: 0xffb703, // Sunshine Yellow
      roughness: 0.4,
      metalness: 0.05,
    });
    const cylMesh = new THREE.Mesh(cylGeo, cylMat);
    cylMesh.position.set(0, 1.5, -1);
    cylMesh.rotation.x = Math.PI / 4;
    cylMesh.userData = { id: "Sunshine Cylinder", baseSpeed: 0.015 };
    objectsGroup.add(cylMesh);

    // Torus (Soft Ring / Play Ring)
    const torusGeo = new THREE.TorusGeometry(0.7, 0.3, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x06d6a0, // Mint Green
      roughness: 0.1,
      metalness: 0.1,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(0, -1.2, 0.5);
    torusMesh.rotation.x = Math.PI / 2.5;
    torusMesh.userData = { id: "Mint Ring", baseSpeed: 0.012 };
    objectsGroup.add(torusMesh);

    setLoading(false);

    // 6. Interaction Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    // Click feedback: Give shapes a high-velocity spin when clicked
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(objectsGroup.children);

      if (intersects.length > 0) {
        const clickedObj = intersects[0].object as THREE.Mesh;
        // Apply temporary high speed spin boost!
        clickedObj.userData.baseSpeed = 0.15;
        setHoveredObject(`You booped the ${clickedObj.userData.id}! 🌟`);
        setTimeout(() => {
          clickedObj.userData.baseSpeed = clickedObj.userData.id === "Blue Cube" ? 0.01 :
                                          clickedObj.userData.id === "Rose Sphere" ? 0.008 :
                                          clickedObj.userData.id === "Sunshine Cylinder" ? 0.015 : 0.012;
        }, 1500);
      }
    };

    // Hover feedback via Raycasting
    let lastIntersected: THREE.Object3D | null = null;
    const animateHover = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(objectsGroup.children);

      if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (lastIntersected !== obj) {
          if (lastIntersected) {
            // Restore original material emissive
            const lastMat = (lastIntersected as THREE.Mesh).material as THREE.MeshStandardMaterial;
            lastMat.emissive.setHex(0x000000);
          }
          lastIntersected = obj;
          const currentMat = (obj as THREE.Mesh).material as THREE.MeshStandardMaterial;
          currentMat.emissive.setHex(0x222222); // subtle glow
          setHoveredObject(obj.userData.id);
        }
      } else {
        if (lastIntersected) {
          const lastMat = (lastIntersected as THREE.Mesh).material as THREE.MeshStandardMaterial;
          lastMat.emissive.setHex(0x000000);
          lastIntersected = null;
          setHoveredObject(null);
        }
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleCanvasClick);

    // 7. Scroll interaction (Gentle object dispersal based on page scroll)
    let scrollYOffset = 0;
    const handleScroll = () => {
      scrollYOffset = window.scrollY / 1000;
    };
    window.addEventListener("scroll", handleScroll);

    // 8. Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera follow mouse
      targetX = mouseX * 1.5;
      targetY = mouseY * 1.5;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      const elapsedTime = clock.getElapsedTime();

      // Gentle floating animation (independent wave movements)
      if (isPlaying) {
        cubeMesh.position.y = 0.5 + Math.sin(elapsedTime * 1.5) * 0.15 + scrollYOffset * 0.3;
        sphereMesh.position.y = -0.5 + Math.cos(elapsedTime * 1.2) * 0.2 - scrollYOffset * 0.2;
        cylMesh.position.y = 1.5 + Math.sin(elapsedTime * 1.8) * 0.15;
        torusMesh.position.y = -1.2 + Math.cos(elapsedTime * 1.4) * 0.18 + scrollYOffset * 0.4;

        // Base rotations plus scroll-induced rotations
        objectsGroup.children.forEach((obj) => {
          obj.rotation.x += obj.userData.baseSpeed;
          obj.rotation.y += obj.userData.baseSpeed * 0.7;
          obj.rotation.z += scrollYOffset * 0.002;
        });
      }

      // Check raycast hover
      mouse.x = mouseX;
      mouse.y = mouseY;
      animateHover();

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 10. Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleCanvasClick);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying]);

  return (
    <div className="relative w-full h-[400px] md:h-[450px] bg-slate-950/45 backdrop-blur-sm rounded-[2rem] border-4 border-dashed border-white/20 overflow-hidden shadow-inner animate-fade-in">
      {/* 3D Target Canvas Container */}
      <div id="threejs-canvas" ref={containerRef} className="w-full h-full cursor-pointer" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 z-10">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-yellow-100 font-black">Assembling 3D Playroom...</p>
        </div>
      )}

      {/* Control Buttons & Info Tag */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
        <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border-2 border-yellow-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
          <span className="text-xs font-black text-slate-800 tracking-wide font-display">
            {hoveredObject ? `Hovering: ${hoveredObject}` : "Move mouse to explore & click to boop!"}
          </span>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="pointer-events-auto bg-white hover:bg-orange-50 text-orange-500 p-2.5 rounded-full shadow-md border-2 border-yellow-200 transition-transform active:scale-95 cursor-pointer"
          title={isPlaying ? "Pause Physics" : "Play Physics"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>

      {/* Interactive Labels */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 w-11/12 max-w-sm">
        <div className="bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-[11px] text-yellow-100 font-bold border border-white/10">
          Scroll down or move cursor to see 3D blocks float in response!
        </div>
      </div>
    </div>
  );
}
