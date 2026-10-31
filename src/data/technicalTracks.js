export const technicalTracks = [
  {
    id: "track-1",
    number: "01",
    title: "Electronics, Communication & Signal Processing",
    icon: "cpu",
    badge: "Track 1",
    image: "public/images/tracks/track-electronics.jpg",
    color: "linear-gradient(135deg, #00A8E8, #0077B3)",
    keyPoints: [
      "Next-gen VLSI, SoC architectures & low-power circuit design",
      "Wireless, optical, RF & microwave communication systems",
      "Advanced digital signal, image, audio & biomedical processing",
      "Smart sensors, MEMS & embedded microelectronic systems"
    ],
    topics: [
      "VLSI & Embedded Systems",
      "Signal & Image Processing",
      "RF & Microwave Engineering",
      "Wireless & Optical Networks",
      "Smart Sensors & MEMS"
    ]
  },
  {
    id: "track-2",
    number: "02",
    title: "Artificial Intelligence, Machine Learning & Computing",
    icon: "bot",
    badge: "Track 2",
    image: "public/images/tracks/track-ai-ml.jpg",
    color: "linear-gradient(135deg, #7C4DFF, #532BB0)",
    keyPoints: [
      "Deep learning models, neural architectures & transformer networks",
      "Computer vision, visual pattern recognition & autonomous perception",
      "Natural Language Processing, Large Language Models & GenAI",
      "High-performance distributed computing & Edge AI/TinyML"
    ],
    topics: [
      "Deep Learning & Neural Nets",
      "Computer Vision & Pattern AI",
      "NLP & Large Language Models",
      "Edge AI & Distributed ML",
      "High-Performance Computing"
    ]
  },
  {
    id: "track-3",
    number: "03",
    title: "IoT, Automation & Intelligent Robotics",
    icon: "robot",
    badge: "Track 3",
    image: "public/images/tracks/track-robotics.jpg",
    color: "linear-gradient(135deg, #00E676, #00A859)",
    keyPoints: [
      "Industrial IoT architectures, cyber-physical systems & Industry 4.0",
      "Autonomous mobile robotics, drone swarms & cobot automation",
      "Smart edge sensor telemetry, real-time control & digital twins",
      "Intelligent automation in smart cities, agriculture & healthcare"
    ],
    topics: [
      "Industrial IoT & Industry 4.0",
      "Autonomous Robots & Drones",
      "Cyber-Physical Systems",
      "Smart Edge & Sensor Nodes",
      "Human-Robot Interaction"
    ]
  },
  {
    id: "track-4",
    number: "04",
    title: "Networking, Cybersecurity & 5G/6G Cloud",
    icon: "shield",
    badge: "Track 4",
    image: "public/images/tracks/track-cybersecurity.jpg",
    color: "linear-gradient(135deg, #FF6D00, #C43E00)",
    keyPoints: [
      "5G/6G cellular infrastructure & software-defined networking",
      "Zero trust architectures, quantum cryptography & data privacy",
      "Decentralized ledger tech, blockchain & secure consensus",
      "Threat intelligence, AI-driven cyber forensics & cloud defenses"
    ],
    topics: [
      "5G/6G Wireless Systems",
      "Zero Trust & Cryptography",
      "Blockchain & Web3 Security",
      "Cloud & Container Security",
      "AI Threat Intelligence"
    ]
  },
  {
    id: "track-5",
    number: "05",
    title: "Emerging Technologies & Sustainable Engineering",
    icon: "sparkles",
    badge: "Track 5",
    image: "public/images/tracks/track-sustainable.jpg",
    color: "linear-gradient(135deg, #00D4AA, #008F72)",
    keyPoints: [
      "Renewable energy grids, power electronics & electric mobility",
      "Green computing, low-carbon technologies & circular systems",
      "Quantum computing principles, quantum algorithms & simulations",
      "Biomedical instrumentation, smart implants & assistive e-health"
    ],
    topics: [
      "Renewable Energy & EV Tech",
      "Quantum Computing & Algo",
      "Green IT & Energy Systems",
      "Biomedical Engineering",
      "Sustainable Smart Grids"
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { technicalTracks };
}