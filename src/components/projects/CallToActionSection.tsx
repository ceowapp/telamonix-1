'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

// Utility object for mathematical operations
const Mathutils = {
    normalize: function($value: number, $min: number, $max: number) {
        return ($value - $min) / ($max - $min);
    },
    interpolate: function($normValue: number, $min: number, $max: number) {
        return $min + ($max - $min) * $normValue;
    },
    map: function($value: number, $min1: number, $max1: number, $min2: number, $max2: number) {
        if ($value < $min1) {
            $value = $min1;
        }
        if ($value > $max1) {
            $value = $max1;
        }
        var res = this.interpolate(this.normalize($value, $min1, $max1), $min2, $max2);
        return res;
    }
};

// Create custom gradient texture for futuristic tube walls
const createGradientTexture = (): THREE.DataTexture => {
    const size = 512;
    const data = new Uint8Array(4 * size * size);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const stride = (i * size + j) * 4;
            
            // Create animated gradient pattern
            const x = i / size;
            const y = j / size;
            
            // Create flowing wave pattern
            const wave1 = Math.sin(x * Math.PI * 4 + y * Math.PI * 2) * 0.5 + 0.5;
            const wave2 = Math.sin(y * Math.PI * 6 - x * Math.PI * 3) * 0.5 + 0.5;
            const combined = (wave1 + wave2) * 0.5;
            
            // Adjust colors to be predominantly black
            // We'll use the combined wave value to introduce subtle blues/cyans
            const r = Math.floor(combined * 10); // Very low red to lean towards black/blue
            const g = Math.floor(combined * 30 + 10); // Low green
            const b = Math.floor(combined * 80 + 20); // More blue for the "futuristic" feel
            
            // Adjust alpha for transparency: less opaque for the base, more opaque for the waves
            const a = Math.floor(combined * 180 + 20); // Values from 20 to 200 (out of 255)

            data[stride] = r;
            data[stride + 1] = g;
            data[stride + 2] = b;
            data[stride + 3] = a;
        }
    }

    const texture = new THREE.DataTexture(data, size, size);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
};

// React component for the enhanced Three.js tube background
const ThreeJSTubeBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null); // Ref for the parent container
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const composerRef = useRef<EffectComposer | null>(null);
    const cGroupRef = useRef<THREE.Group | null>(null);
    const lightRef = useRef<THREE.PointLight | null>(null);
    const tubeRef = useRef<THREE.Mesh | null>(null);
    const innerGlowTubeRef = useRef<THREE.Mesh | null>(null); // This is not used in the provided code, but kept for completeness
    const wireframeRef = useRef<THREE.LineSegments | null>(null);

    const currentCameraPercentage = useRef(0);
    const cameraRotationProxyX = useRef(Math.PI);
    const cameraRotationProxyY = useRef(0);
    const p1Ref = useRef<THREE.Vector3 | null>(null);
    const p2Ref = useRef<THREE.Vector3 | null>(null);
    const pathRef = useRef<THREE.CatmullRomCurve3 | null>(null);
    const timeRef = useRef(0);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const container = containerRef.current;
        const ww = container.offsetWidth;
        const wh = container.offsetHeight;

        // Enhanced renderer setup with BLACK background
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: false, // Changed to false to ensure solid background
            powerPreference: "high-performance"
        });
        renderer.setSize(ww, wh);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.5;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0x000000, 1); // FORCE BLACK BACKGROUND
        rendererRef.current = renderer;

        // Enhanced scene setup with BLACK background
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); // FORCE BLACK BACKGROUND
        scene.fog = new THREE.FogExp2(0x000000, 0.002); // Black fog instead of blue
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(60, ww / wh, 0.1, 1000);
        cameraRef.current = camera;

        const cGroup = new THREE.Group();
        cGroup.position.z = 400;
        cGroup.add(camera);
        scene.add(cGroup);
        cGroupRef.current = cGroup;

        // Enhanced post-processing
        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(ww, wh),
            2.5, // Increased bloom strength
            0.8, // Radius
            0.1  // Threshold
        );

        const composer = new EffectComposer(renderer);
        composer.setSize(ww, wh);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
        composerRef.current = composer;

        // Enhanced tube path with more curves
        const points = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(50, 20, 100),
            new THREE.Vector3(-30, -10, 200),
            new THREE.Vector3(80, 30, 300),
            new THREE.Vector3(-20, -20, 400),
            new THREE.Vector3(60, 10, 500),
            new THREE.Vector3(0, 0, 600)
        ];
        const path = new THREE.CatmullRomCurve3(points, true); // Closed loop
        path.tension = 0.3;
        pathRef.current = path;

        // Main outer tube with custom gradient
        const tubeGeometry = new THREE.TubeGeometry(path, 400, 6, 32, true);
        const gradientTexture = createGradientTexture();
        gradientTexture.repeat.set(20, 4);

        const tubeMaterial = new THREE.MeshStandardMaterial({
            side: THREE.BackSide,
            map: gradientTexture,
            roughness: 0.2,
            metalness: 0.8,
            emissive: new THREE.Color(0x001122),
            emissiveIntensity: 0.3
        });
        const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
        scene.add(tube);
        tubeRef.current = tube;

        // THIN wireframe with blue gradient
        const wireGeometry = new THREE.TubeGeometry(path, 150, 5.2, 8, true);
        const geoEdges = new THREE.EdgesGeometry(wireGeometry);
        const matWireframe = new THREE.LineBasicMaterial({
            color: 0x4A90E2, // Softer blue color
            opacity: 0.4, // Reduced opacity for thinner appearance
            transparent: true
        });
        const wireframe = new THREE.LineSegments(geoEdges, matWireframe);
        scene.add(wireframe);
        wireframeRef.current = wireframe;

        // Enhanced lighting system with PURPLE light for center
        const pointLight = new THREE.PointLight(0x8A2BE2, 3, 60); // Purple light
        pointLight.castShadow = true;
        scene.add(pointLight);
        lightRef.current = pointLight;

        // Additional ambient lighting (darker)
        const ambientLight = new THREE.AmbientLight(0x000022, 0.1); // Much darker ambient
        scene.add(ambientLight);

        // Directional light for depth (blue tint)
        const directionalLight = new THREE.DirectionalLight(0x0066FF, 0.5); // Reduced intensity
        directionalLight.position.set(0, 50, 0);
        scene.add(directionalLight);

        // Enhanced camera movement function
        const updateCameraPercentage = (percentage: number) => {
            if (!pathRef.current || !cGroupRef.current || !lightRef.current) return;

            const p1 = pathRef.current.getPointAt(percentage % 1);
            const p2 = pathRef.current.getPointAt((percentage + 0.05) % 1);

            p1Ref.current = p1;
            p2Ref.current = p2;

            cGroupRef.current.position.copy(p1);
            cGroupRef.current.lookAt(p2);
            lightRef.current.position.copy(p2);
        };

        // Enhanced animation loop
        let frameId: number;
        const animate = () => {
            timeRef.current += 0.016; // ~60fps timing

            // Smooth auto-scrolling
            currentCameraPercentage.current = (currentCameraPercentage.current + 0.0008) % 1;

            // Enhanced camera rotation
            if (cameraRef.current) {
                cameraRef.current.rotation.y += (cameraRotationProxyX.current - cameraRef.current.rotation.y) / 20;
                cameraRef.current.rotation.x += (cameraRotationProxyY.current - cameraRef.current.rotation.x) / 20;
            }

            updateCameraPercentage(currentCameraPercentage.current);

            // Animate textures for flow effect
            if (innerGlowTubeRef.current) {
                const material = innerGlowTubeRef.current.material as THREE.MeshBasicMaterial;
                if (material.map) {
                    material.map.offset.x = (timeRef.current * 0.5) % 1;
                }
            }

            if (tubeRef.current) {
                const material = tubeRef.current.material as THREE.MeshStandardMaterial;
                if (material.map) {
                    material.map.offset.x = (timeRef.current * 0.1) % 1;
                    material.map.offset.y = (timeRef.current * 0.05) % 1;
                }
            }
            if (composerRef.current) {
                composerRef.current.render();
            }

            frameId = requestAnimationFrame(animate);
        };
        animate();

        // Enhanced event handlers
        const handleMouseMove = (evt: MouseEvent) => {
            const sensitivity = 0.0005;
            cameraRotationProxyX.current = Math.PI + (evt.clientX - window.innerWidth / 2) * sensitivity;
            cameraRotationProxyY.current = (evt.clientY - window.innerHeight / 2) * sensitivity * 0.5;
        };

        const handleResize = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;

            if (cameraRef.current) {
                cameraRef.current.aspect = width / height;
                cameraRef.current.updateProjectionMatrix();
            }
            if (rendererRef.current) {
                rendererRef.current.setSize(width, height);
            }
            if (composerRef.current) {
                composerRef.current.setSize(width, height);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            cancelAnimationFrame(frameId);
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);

            // Dispose resources
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });

            renderer.dispose();
            composer.dispose();
            gradientTexture.dispose();
            // Assuming flowTexture is meant to be disposed if it existed.
            // Since it's not created in this code, it's commented out.
            // flowTexture.dispose();
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full block z-0" style={{ backgroundColor: '#000000' }}>
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
};

// Enhanced Call to Action Component
const CallToActionComponent: React.FC = () => {
    return (
        <section className="experience-container relative min-h-screen bg-black overflow-hidden font-inter py-12">
            <ThreeJSTubeBackground />

            {/* Enhanced content overlay */}
            <div className="relative z-10 h-full flex items-center justify-center p-8 lg:p-16">
                <div className="max-w-6xl w-full space-y-12">
                    {/* Dynamic background effects */}
                    <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-ping" />

                    {/* Main content */}
                    <div className="relative text-center">
                        
                        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-transparent leading-tight mb-8">
                            <span className="block">TRANSCEND</span>
                            <span className="block text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text animate-pulse">
                                REALITY
                            </span>
                        </h1>

                        <div className="mt-8 space-y-6 max-w-3xl mx-auto">
                            <p className="text-2xl text-slate-200 leading-relaxed font-light">
                                Journey through infinite dimensions where <span className="text-purple-400 font-semibold">consciousness</span> meets 
                                <span className="text-blue-400 font-semibold"> technology</span> in perfect harmony.
                            </p>
                            <p className="text-xl text-slate-300 opacity-80">
                                Experience the future. Today.
                            </p>
                        </div>

                        {/* Enhanced CTA buttons */}
                        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
                            <button className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-2xl font-bold text-lg text-white transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 transform-gpu">
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    <span>Enter the Void</span>
                                    <span className="text-2xl">→</span>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500 transform scale-95 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>

                            <button className="group relative px-12 py-5 border-2 border-purple-400/50 rounded-2xl font-bold text-lg text-slate-200 transition-all duration-500 hover:border-purple-400 hover:text-white hover:bg-purple-400/10 backdrop-blur-sm hover:scale-105 transform-gpu">
                                <span className="flex items-center justify-center gap-3">
                                    <span>Explore Dimensions</span>
                                    <span className="transition-transform duration-300 group-hover:translate-x-2">✦</span>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </div>

                        {/* Enhanced stats grid */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {[
                                { icon: "∞", label: "Infinite Paths", color: "text-purple-400" },
                                { icon: "⚡", label: "Quantum Speed", color: "text-blue-400" },
                                { icon: "🌌", label: "Cosmic Scale", color: "text-indigo-400" },
                                { icon: "🔮", label: "Future Tech", color: "text-purple-400" }
                            ].map((stat, index) => (
                                <div key={index} className="group relative">
                                    <div className="backdrop-blur-md bg-gradient-to-b from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 transform-gpu">
                                        <div className={`text-4xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                                            {stat.icon}
                                        </div>
                                        <div className="text-sm text-slate-300 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional immersive elements */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="flex items-center gap-4 text-slate-400 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>System Online</span>
                            </div>
                            <div className="w-px h-4 bg-slate-600"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                                <span>Neural Link Active</span>
                            </div>
                            <div className="w-px h-4 bg-slate-600"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Quantum Tunnel Stable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none z-5" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none z-5" />
            
            {/* Animated grid overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none z-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(138, 43, 226, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(138, 43, 226, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    animation: 'grid-move 20s linear infinite'
                }} />
            </div>

            {/* CSS animations */}
            <style jsx>{`
                @keyframes grid-move {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }
                
                .experience-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.1) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: 1;
                }
                
                .experience-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: 
                        radial-gradient(circle at 20% 20%, rgba(138, 43, 226, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(100, 0, 255, 0.05) 0%, transparent 50%);
                    pointer-events: none;
                    z-index: 1;
                    animation: color-shift 8s ease-in-out infinite alternate;
                }
                
                @keyframes color-shift {
                    0% { opacity: 0.3; }
                    100% { opacity: 0.7; }
                }
                
                /* Enhanced button animations */
                button {
                    position: relative;
                    overflow: hidden;
                }
                
                button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s;
                }
                
                button:hover::before {
                    left: 100%;
                }
            `}</style>
        </section>
    );
};

export default CallToActionComponent;