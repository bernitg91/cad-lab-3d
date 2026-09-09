"use client";

import { useEffect, useRef, useState } from "react";

type Props = { stage: number; paused: boolean; angle: number };

export function CadModel(props: Props) {
  const mount = useRef<HTMLDivElement>(null);
  const settings = useRef(props);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  settings.current = props;

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    const element = mount.current;
    if (!element) return;
    import("three").then((THREE) => {
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch { setStatus("fallback"); return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      element.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(7.8, 8.2, 10.5);
      camera.lookAt(0, 0.6, 0);
      scene.add(new THREE.HemisphereLight(0xddecff, 0x465779, 3));
      const key = new THREE.DirectionalLight(0xffffff, 5); key.position.set(-4, 8, 4); scene.add(key);
      const rim = new THREE.DirectionalLight(0x6dbeff, 4); rim.position.set(5, 4, -5); scene.add(rim);
      const group = new THREE.Group(); scene.add(group);
      const solid = new THREE.Group(); group.add(solid);
      const edges = new THREE.Group(); group.add(edges);
      const layers = new THREE.Group(); group.add(layers);
      const blue = new THREE.MeshStandardMaterial({ color: 0x2554dc, metalness: 0.35, roughness: 0.3 });
      const aqua = new THREE.MeshStandardMaterial({ color: 0x36c5de, metalness: 0.18, roughness: 0.45 });
      const line = new THREE.LineBasicMaterial({ color: 0x1751c5, transparent: true, opacity: 0.7 });
      const shape = new THREE.Shape();
      const x = 2.25, z = 1.8, r = 0.38;
      shape.moveTo(-x + r, -z); shape.lineTo(x-r, -z); shape.quadraticCurveTo(x,-z,x,-z+r);
      shape.lineTo(x,z-r); shape.quadraticCurveTo(x,z,x-r,z); shape.lineTo(-x+r,z);
      shape.quadraticCurveTo(-x,z,-x,z-r); shape.lineTo(-x,-z+r); shape.quadraticCurveTo(-x,-z,-x+r,-z);
      for (const hx of [-1.65, 1.65]) for (const hz of [-1.2, 1.2]) {
        const hole = new THREE.Path(); hole.absarc(hx,hz,0.23,0,Math.PI*2,true); shape.holes.push(hole);
      }
      const bore = new THREE.Path(); bore.absarc(0,0,0.64,0,Math.PI*2,true); shape.holes.push(bore);
      const ring = new THREE.Shape(); ring.absarc(0,0,1.05,0,Math.PI*2,false);
      const inner = new THREE.Path(); inner.absarc(0,0,0.64,0,Math.PI*2,true); ring.holes.push(inner);

      function extrusion(profile: InstanceType<typeof THREE.Shape>, depth: number) {
        const geometry = new THREE.ExtrudeGeometry(profile, { depth, bevelEnabled: false, curveSegments: 48, steps: 1 });
        geometry.rotateX(-Math.PI/2); return geometry;
      }
      function addBody(geometry: ReturnType<typeof extrusion>, y: number) {
        const body = new THREE.Mesh(geometry, blue); body.position.y = y; solid.add(body);
        const outline = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 25), line); outline.position.y = y; edges.add(outline);
      }
      addBody(extrusion(shape,0.28),0);
      addBody(extrusion(ring,1.6),0.28);
      const baseSlice = extrusion(shape,0.095);
      const ringSlice = extrusion(ring,0.095);
      for(let i=0;i<3;i++) { const mesh=new THREE.Mesh(baseSlice,aqua); mesh.position.y=i*0.145; layers.add(mesh); }
      for(let i=0;i<16;i++) { const mesh=new THREE.Mesh(ringSlice,i%4===0?blue:aqua); mesh.position.y=0.52+i*0.145; layers.add(mesh); }
      const bedMaterial = new THREE.MeshStandardMaterial({ color: 0xd4dfea, metalness: 0.3, roughness: 0.72 });
      const bed = new THREE.Mesh(new THREE.BoxGeometry(6.4,0.14,5.4),bedMaterial); bed.position.y=-0.23; scene.add(bed);
      const grid = new THREE.GridHelper(6,24,0x9bb5d0,0xb4c8db); grid.position.y=-0.151; grid.scale.z=0.83; scene.add(grid);
      const axes = new THREE.AxesHelper(0.85); axes.position.set(-2.8,-0.14,2.1); scene.add(axes);

      let visible = true, frame = 0, lastTime = 0, rotation = -0.35, previousKey = "";
      const render = (time: number) => {
        frame = requestAnimationFrame(render);
        if (!visible || document.hidden) { lastTime=time; return; }
        const s=settings.current;
        const stateKey=`${s.stage}:${s.angle}:${s.paused}`;
        const elapsed=Math.min((time-lastTime)/1000,0.05); lastTime=time;
        if(s.paused && previousKey===stateKey) return;
        previousKey=stateKey;
        if(!s.paused) rotation+=elapsed*0.085;
        group.rotation.y=rotation+s.angle*Math.PI/4;
        solid.visible=s.stage!==1;
        edges.visible=s.stage===0;
        layers.visible=s.stage===1;
        blue.color.set(s.stage===0?0x467ce3:0x204acb);
        blue.opacity=s.stage===0?0.72:1;
        blue.transparent=s.stage===0;
        renderer.render(scene,camera);
      };
      const resize = () => {
        const width=element.clientWidth, height=element.clientHeight;
        if(!width||!height) return;
        renderer.setSize(width,height); camera.aspect=width/height;
        camera.position.set(7.8,8.2,10.5).multiplyScalar(width/height<0.8?1.28:1);
        camera.updateProjectionMatrix(); previousKey="";
      };
      const observer = new ResizeObserver(resize); observer.observe(element);
      const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting; previousKey="";}); intersection.observe(element);
      const lost=(event:Event)=>{event.preventDefault(); setStatus("fallback"); cancelAnimationFrame(frame);};
      renderer.domElement.addEventListener("webglcontextlost",lost);
      resize(); frame=requestAnimationFrame(render); setStatus("ready");
      cleanup=()=>{
        cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect();
        renderer.domElement.removeEventListener("webglcontextlost",lost);
        const geometries=new Set<InstanceType<typeof THREE.BufferGeometry>>();
        const materials=new Set<InstanceType<typeof THREE.Material>>();
        scene.traverse((object)=>{
          const mesh=object as InstanceType<typeof THREE.Mesh>;
          if(mesh.geometry) geometries.add(mesh.geometry);
          if(mesh.material) (Array.isArray(mesh.material)?mesh.material:[mesh.material]).forEach(m=>materials.add(m));
        });
        geometries.forEach(g=>g.dispose()); materials.forEach(m=>m.dispose()); renderer.dispose(); renderer.domElement.remove();
      };
    }).catch(()=> { if(!disposed) setStatus("fallback"); });
    return ()=>{disposed=true;cleanup();};
  }, []);

  return <div className="cad-model-viewport" role="img" aria-label="Modelo tridimensional didáctico de una brida rectangular con cuatro taladros y un alojamiento central. Las vistas muestran su geometría, capas y volumen completo.">
    <div className="cad-canvas" ref={mount} />
    {status!=="ready" && <div className="cad-model-fallback"><span>CAD → FDM</span><p>{status==="loading" ? "Preparando la vista 3D…" : "Una base, cuatro taladros y un alojamiento. Explora las fases del diseño con los botones inferiores."}</p></div>}
  </div>;
}
