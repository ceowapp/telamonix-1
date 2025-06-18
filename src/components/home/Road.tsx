import * as THREE from 'three';

interface RoadOptions {
  length: number;
  roadWidth: number;
  islandWidth: number;
  lanesPerRoad: number;
  shoulderLinesWidthPercentage: number;
  brokenLinesWidthPercentage: number;
  brokenLinesLengthPercentage: number;
  colors: {
    roadColor: number;
    islandColor: number;
    shoulderLines: number;
    brokenLines: number;
  };
}

export class Road {
  private scene: THREE.Scene;
  private options: RoadOptions;
  private road: THREE.Group;
  private time: number;

  constructor(scene: THREE.Scene, options: RoadOptions) {
    this.scene = scene;
    this.options = options;
    this.road = new THREE.Group();
    this.time = 0;

    this.init();
  }

  private init() {
    // Create road geometry
    const roadGeometry = new THREE.PlaneGeometry(
      this.options.roadWidth,
      this.options.length
    );
    const roadMaterial = new THREE.MeshBasicMaterial({
      color: this.options.colors.roadColor,
      side: THREE.DoubleSide
    });
    const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
    this.road.add(roadMesh);

    // Create island
    const islandGeometry = new THREE.PlaneGeometry(
      this.options.islandWidth,
      this.options.length
    );
    const islandMaterial = new THREE.MeshBasicMaterial({
      color: this.options.colors.islandColor,
      side: THREE.DoubleSide
    });
    const islandMesh = new THREE.Mesh(islandGeometry, islandMaterial);
    this.road.add(islandMesh);

    // Create lane markings
    this.createLaneMarkings();

    // Add road to scene
    this.scene.add(this.road);
  }

  private createLaneMarkings() {
    const laneWidth = (this.options.roadWidth - this.options.islandWidth) / 2;
    const shoulderWidth = laneWidth * this.options.shoulderLinesWidthPercentage;
    const brokenLineWidth = laneWidth * this.options.brokenLinesWidthPercentage;
    const brokenLineLength = this.options.length * this.options.brokenLinesLengthPercentage;

    // Create shoulder lines
    for (let i = 0; i < 2; i++) {
      const shoulderGeometry = new THREE.PlaneGeometry(
        shoulderWidth,
        this.options.length
      );
      const shoulderMaterial = new THREE.MeshBasicMaterial({
        color: this.options.colors.shoulderLines,
        side: THREE.DoubleSide
      });
      const shoulderMesh = new THREE.Mesh(shoulderGeometry, shoulderMaterial);
      shoulderMesh.position.x = (i === 0 ? -1 : 1) * (this.options.roadWidth / 2 - shoulderWidth / 2);
      this.road.add(shoulderMesh);
    }

    // Create broken lines
    const numBrokenLines = Math.floor(this.options.length / brokenLineLength);
    for (let i = 0; i < numBrokenLines; i++) {
      const brokenLineGeometry = new THREE.PlaneGeometry(
        brokenLineWidth,
        brokenLineLength * 0.5
      );
      const brokenLineMaterial = new THREE.MeshBasicMaterial({
        color: this.options.colors.brokenLines,
        side: THREE.DoubleSide
      });
      const brokenLineMesh = new THREE.Mesh(brokenLineGeometry, brokenLineMaterial);
      brokenLineMesh.position.y = -this.options.length / 2 + i * brokenLineLength + brokenLineLength * 0.25;
      this.road.add(brokenLineMesh);
    }
  }

  public update() {
    this.time += 0.01;
    this.road.position.z = -this.time * 100;
    
    // Reset position when road moves too far
    if (this.road.position.z < -this.options.length) {
      this.road.position.z = 0;
    }
  }
} 