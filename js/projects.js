/*
 * All portfolio content lives here. Each project renders as a card (thumb, meta,
 * title, blurb, links) and a detail dialog (media + body paragraphs/figures/lists).
 *
 * Fields:
 *   id        unique slug (used to open the dialog; #<id> deep-links to it)
 *   title     card + dialog heading
 *   year      year shown in the filter pills and meta lines
 *   org       organization / venue shown in meta lines (optional)
 *   role      my role, shown in the dialog meta line only (optional)
 *   selected  true = appears in the default "Selected Works" view
 *   thumb     card image (null = gray placeholder with `icon`)
 *   icon      Font Awesome class for placeholder thumbs
 *   blurb     one-sentence card text (detail belongs in body)
 *   links     external links: type is one of code | paper | video | news | site
 *   media     dialog hero: {type:'youtube',src:id} | {type:'video'|'image',src:path}
 *   body      array of items:
 *               "…"                             paragraph
 *               {img, alt, caption?, frame?}    inline figure (frame=bordered panel)
 *               {video, poster?, caption?}      inline video figure
 *               {title?, list:[...]}            bulleted list
 */

const PROJECTS = [
  // ---------- 2026 — Chaotic Curiosity ----------
  {
    id: "robot-learning",
    title: "Sim2Real Robot Learning Pipeline",
    year: 2026,
    org: "Chaotic Curiosity",
    role: "Research Engineer",
    selected: true,
    thumb: "img/robotLearningThumbnail.gif",
    blurb:
      "A vision-language-action → Unity sim2real loop: drive simulated humanoids from VLA models, record human demonstrations in the same format, fine-tune on them, and serve the result back.",
    links: [
      { type: "site", url: "https://chaotic-curiosity-io.github.io/robotics-unity-book/", label: "Field guide" },
    ],
    media: { type: "video", src: "img/robotLearning.mp4", poster: "img/robotLearningPoster.jpg" },
    body: [
      "Robot-learning demos usually show a model. The hard part is everything around it — the simulator, the transport, the recording, the fine-tune loop — and getting them to agree on one thing. This pipeline is built on that thesis: the model is the easy part, the pipeline is the product, and one shared action format is what makes the pipeline possible.",
      { img: "img/diagrams/robot-learning.svg", alt: "Sim2real robot learning pipeline", caption: "One JSON WebSocket protocol closes the inference loop; a control-agnostic recorder feeds the fine-tune loop.", frame: true },
      "Everything speaks one JSON WebSocket protocol, so Unity is identical across three model tracks and mock ↔ real is a flag. Humanoids run GR00T N1.7 (Unitree G1/H1, Fourier GR-1) and LingBot-VLA-V2; a manipulation track runs OpenVLA-7B on WidowX/Franka. Unity 6 imports each robot's URDF, converts between the right-handed robot frame and Unity's left-handed one, and streams camera observations out and absolute joint-target chunks back — real inference on an owned NVIDIA DGX Spark or rented Lambda GPUs, the servers and scene unchanged.",
      { video: "img/robotLearning.mp4", poster: "img/robotLearningPoster.jpg", caption: "A Unitree G1 executing a reach-and-push in the Unity 6 scene, with the policy's egocentric camera view inset." },
      "The payoff is a closed data loop. An EpisodeRecorder decoupled from the action source writes identical N-dim training data whether the robot is driven by a policy, the keyboard, or XR teleop — so demonstrations and rollouts share one format. The fine-tune path is working end to end: 80 recorded G1 push episodes → a LeRobot v2.1 dataset with a 29-DoF embodiment config → a fine-tuned GR00T-N1.7 on the Spark → offline eval at ~1.4° mean joint error. A parallel reinforcement-learning track trains a PPO locomotion policy in Isaac Lab and drives the G1 in Unity over the same bridge.",
      "The whole system is written up as an open, zero-background field guide — a 20-chapter workbook on VLA models, Unity simulation, and sim2real training loops for readers with no prior robotics background.",
    ],
  },
  {
    id: "xr-teleop",
    title: "XR Robot Teleoperation",
    year: 2026,
    org: "Chaotic Curiosity",
    role: "Research Engineer",
    selected: false,
    thumb: "img/xrTeleopThumbnail.gif",
    blurb:
      "A Meta Quest / Viture headset as an embodied teleop client — head, hands, and pointing retargeted onto humanoid robots and a Reachy Mini, to collect demonstration data.",
    links: [],
    media: { type: "video", src: "img/xrTeleop.mp4", poster: "img/xrTeleopPoster.jpg" },
    body: [
      "Fine-tuning a robot policy needs demonstrations, and the cleanest way to give a humanoid a demonstration is to inhabit it. This bridge turns an XR headset into an embodied controller: your head pose, native hand tracking, and pointing stream over the network to a host that retargets them onto a robot in real time, and you watch the result in passthrough — the demonstration side of the sim2real pipeline.",
      "A headset is quietly the ideal teleop sensor: it gives inside-out head pose, true metric 3D hand skeletons (not a monocular guess at depth), per-frame camera pose and intrinsics, and unambiguous handedness — all natively and in real units. The Quest build maps its OVRSkeleton into a MediaPipe-order landmark set and sends head + both hands as UDP pose packets; a host-side server runs finger-curl, arm-IK, and head retargeting onto Unitree H1/G1 or Fourier GR-1 joints.",
      { video: "img/xrTeleop.mp4", poster: "img/xrTeleopPoster.jpg", caption: "Driving a Unitree humanoid in Unity live from Viture glasses — hand skeletons on the right retarget to the robot's arms on the left." },
      "Raw episodes are the source of truth: the server records the verbatim pose packets plus per-frame validity and a calibration fingerprint, so any recording can be re-retargeted offline to a different robot layout — bit-exact on same-robot replays — and a quality gate rejects short, frozen, or tracking-loss demos before they reach the dataset converters. A second bridge drives a Reachy Mini in follow, hand, raycast, and gaze modes from the same headset. Built on Meta's Passthrough Camera API on Quest 3, with a Viture Luma Ultra sibling.",
    ],
  },
  {
    id: "airborne",
    title: "Airborne Perception — Synthetic-to-Real CV",
    year: 2026,
    org: "Chaotic Curiosity",
    role: "Computer Vision Engineer",
    selected: true,
    thumb: "img/airborneThumbnail.jpg",
    blurb:
      "A perception-only pipeline that detects and tracks drones, birds, and aircraft — training on Unity-synthesized plus GenAI-enhanced data to close the coverage gaps real detectors miss.",
    links: [
      { type: "site", url: "https://thewiselybearded.github.io/world2vision/", label: "Results dossier" },
      { type: "site", url: "https://thewiselybearded.github.io/w2v/chapters/00-preface.html", label: "Field guide" },
    ],
    media: { type: "video", src: "img/airborne.mp4", poster: "img/airbornePoster.jpg" },
    body: [
      "Detecting an aircraft two kilometers out — twenty pixels against a bright sky, from a moving camera — concentrates most of computer vision's real difficulty into one problem. This platform takes it on end to end, and treats the same principle as the robot work: the pipeline is the product, not the model. It is deliberately perception-only — it ends at detections, classifications, and tracks, a boundary enforced in code by a contract test that scans every schema for prohibited targeting or control concepts.",
      { img: "img/diagrams/airborne.svg", alt: "Airborne perception training pipeline", caption: "Unity synthetic + real flights → blended dataset → detector training → sliced whole-frame eval → edge deployment, with a failure-driven revision loop.", frame: true },
      "Where real footage leaves gaps, Unity renders synthetic airborne scenes with perfect labels — correct geometry, motion, and occlusion — and generative models repaint them photoreal without moving a single labeled pixel: FLUX.1-schnell for local batch production, hosted image and video models (OpenAI, Gemini, Veo) for interactive work. A target-preservation compositing step pastes the original rendered pixels back inside every annotation box, so backgrounds gain realism while the labeled silhouettes stay bit-honest. The result blends with 299 labeled real flights into one DVC-versioned, drift-checked dataset.",
      { img: "img/airborneGenAI.gif", alt: "Side-by-side comparison of a raw Unity render and its GenAI-enhanced version", caption: "Structure-conditioned video-to-video enhancement — the raw Unity render (left) re-textured to pine forest terrain (right) while masked airborne targets and their labels stay untouched." },
      "RF-DETR and YOLOX detectors train on the blend (DGX Spark and Lambda Cloud), then run as sliced inference over full 2448×2048 sensor frames and are scored against held-out flights the model never saw — the honest test of whether it learned airborne objects or just memorized flights.",
      { video: "img/airborne.mp4", poster: "img/airbornePoster.jpg", caption: "The detector tracking an aircraft frame-to-frame — green boxes are ground truth, red are predictions." },
      "On nominal air-to-air flights it reaches 0.922 AP@50 on sliced whole frames, holding 0.92 recall at roughly one false alarm per ten frames, and retains 94% of that on flights from an unseen section of the dataset — evidence of generalization, not memorization. Deployment quantizes ONNX → TensorRT and adds ByteTrack identity tracking.",
      { img: "img/airborneDetection.jpg", alt: "Detection on a low-altitude airfield scene", caption: "The failure case, kept in view: on low-altitude airfield clutter it never trained against, the model fires on terrain and loses objects fused with the treeline — a data-coverage gap that drives the next dataset revision." },
      "The whole effort is documented as an open field guide to airborne-object perception — one that deliberately keeps the failures and debugging stories in, not just the path that worked.",
    ],
  },
  {
    id: "zorb",
    title: "Cell & Bacteria Tracking Pipeline",
    year: 2026,
    org: "Chaotic Curiosity · ASU School of Life Sciences",
    role: "Computer Vision Engineer",
    selected: false,
    thumb: "img/zorbThumbnail.gif",
    blurb:
      "An end-to-end computer vision pipeline tracking hundreds of cells across multi-hour microscopy videos, built for ASU's School of Life Sciences.",
    links: [],
    media: { type: "video", src: "img/zorbClip.mp4", poster: "img/zorbThumbnail.jpg" },
    body: [
      "ASU's School of Life Sciences needed to follow hundreds of individual cells (“zorbs”) through multi-hour microscopy recordings — watching them move, merge, and die — at a scale where hand-annotation is impossible. This pipeline is the automated answer, delivered as client work through Chaotic Curiosity.",
      { img: "img/diagrams/zorb.svg", alt: "Zorb tracking pipeline stages", caption: "Segmentation → Bayesian tracking → fusion → lineage analysis.", frame: true },
      "A YOLOv8 instance-segmentation model — trained on hand-labeled cell masks and served via Roboflow/ONNX — segments every frame; btrack performs Bayesian multi-object tracking over the detections; a fusion layer then detects merge events, accounts for deaths, and stitches broken tracks by cost optimization. A reference run recovered 184 tracks across a 1001-frame video, calibrated at 0.286 µm/px with 20-second frames.",
      "Because the results feed real research, the pipeline is auditable end to end: a validation layer gates anomalous outputs for expert review, and every run automatically produces annotated video, publication-ready figures, and per-track data.",
      { img: "img/zorbLineage.png", alt: "Cell lineage analysis figures", caption: "Auto-generated lineage figures from a single run." },
      "The code is private client work — but it mirrors production CV-for-microscopy use cases like counting and tracking cells for biological research.",
    ],
  },
  {
    id: "viture",
    title: "Smart Glasses Spatial Computing Pipeline",
    year: 2026,
    org: "Chaotic Curiosity",
    role: "Research Engineer",
    selected: true,
    thumb: "img/vitureThumbnail.gif",
    blurb:
      "A real-time spatial computing stack for VITURE smart glasses — onboard 6DoF pose fused with dense 3D reconstruction, volumetric playback, and headset-driven robot control.",
    links: [],
    media: { type: "video", src: "img/vitureSplat.mp4", poster: "img/vitureSplatPoster.jpg" },
    body: [
      "Smart glasses give you cameras and a pose — everything else has to be built. This is Chaotic Curiosity's core spatial-computing platform on the VITURE Luma Ultra: its stereo cameras and onboard 6DoF pose (Carina VIO SDK) feed a pipeline that turns a lightweight wearable into a device that understands, reconstructs, and acts on the space around it.",
      { img: "img/diagrams/viture.svg", alt: "VITURE spatial computing pipeline", caption: "From onboard pose and stereo cameras to reconstruction and robot control.", frame: true },
      "The glasses' onboard pose anchors world-frame registration while MASt3R accumulates dense point clouds on keyframes and Depth Anything 3 supplies dense depth — real-time tracking plus dense geometry from hardware that fits in a jacket pocket. Heavy inference runs on self-deployed GPU services (FastAPI + cloud GPUs + Cloudflare tunnels), built in collaboration with Don Balanzat.",
      { img: "img/vitureReconstruction.png", alt: "Dense point-cloud reconstruction of a room", caption: "A room reconstructed into a dense, world-anchored point cloud from glasses capture, with source keyframes registered in place." },
      { video: "img/vitureTelemetry.mp4", poster: "img/vitureTelemetryPoster.jpg", caption: "The telemetry capture tool — stereo fisheye feeds and the glasses' live SLAM trajectory, recorded into replayable capture sessions." },
      { video: "img/vitureCalibration.mp4", poster: "img/vitureCalibrationPoster.jpg", caption: "Relocalization tooling — scoring new capture frames against a prior room reconstruction to re-anchor the glasses in a known space." },
      "On top of the reconstruction sit the experiences: Gaussian-splat scenes and 4D volumetric video played back on the glasses, and a controls interface for driving robots — relocalize the glasses into a room scan, pinch-and-point at a spot, and a Reachy Mini looks there (see the Homie project for the robot side).",
      { video: "img/viture4dgs.mp4", poster: "img/viture4dgsPoster.jpg", caption: "4D Gaussian-splat volumetric video — a 1.2M-Gaussian dynamic scene playing back in the desktop viewer." },
      { video: "img/vitureStyleTransfer.mp4", poster: "img/vitureStyleTransferPoster.jpg", caption: "The same splat scene restyled by a generative model and rendered stereo per-eye on the glasses — a beach walk turned illustration." },
      { title: "Supporting work", list: [
        "A Unity 6 app bringing the glasses to macOS / Apple Silicon — native dylib bridges and stereo passthrough.",
        "Head-pose and pinch-grab hand tracking, plus fisheye camera calibration tooling.",
        "Compiling Kimera-VIO from source on Apple Silicon.",
      ] },
    ],
  },
  {
    id: "homie",
    title: "Homie — A Home Operating System",
    year: 2026,
    org: "Chaotic Curiosity",
    role: "Research Engineer",
    selected: true,
    thumb: "img/homieThumbnail.gif",
    blurb:
      "An operating system for intelligent spaces — persistent memory, a live 3D map, and an agent runtime for the whole house, with a robot and smart glasses as its first clients.",
    links: [],
    media: { type: "video", src: "img/homieDemo.mp4", poster: "img/homieDemoPoster.jpg" },
    body: [
      "Modern homes are full of intelligent fragments — voice assistants, cameras, robots, projectors, XR headsets, LLMs — that share no memory, no state, and no spatial understanding. Homie's thesis is that the home itself should be the root computational entity: one persistent intelligence layer that every device contributes observations to and draws context from. Reachy Mini is the first embodied client of that system, not the product.",
      { img: "img/diagrams/homie.svg", alt: "Homie system architecture", caption: "One canonical flow: observation → event bus → memory → agent runtime → tool → output.", frame: true },
      "Everything follows one canonical flow: observation → event bus → state/memory → agent runtime → tool → output → memory writeback. The event bus carries typed events with correlation IDs; the memory platform layers a vector index, a typed knowledge graph, and episodic memory behind fused RAG retrieval; the agent runtime is a ReAct loop over a JSON-schema tool registry with pluggable model backends, local (Ollama) or cloud. Roughly 290 offline tests keep the architecture honest as it grows.",
      { video: "img/homieSpatial.mp4", poster: "img/homieSpatialPoster.jpg", caption: "The robot scans a room into a persistent 3D map." },
      "Perception comes from the robot. A scanner app streams camera frames and head pose to a Mac-side pipeline that reconstructs the room with Depth Anything 3 — pose-synced capture, frame-to-map ICP registration, and multi-view depth refinement keep the map clean — so the house gains a persistent 3D map that objects and devices are anchored into. Face recognition posts presence events, and once the robot has seen your mug, “where is my mug?” is answered from the knowledge graph.",
      "Interfaces stack on the same event stream. VITURE smart glasses relocalize into the room scan, so you can pinch-and-point at a real spot in the room and the robot turns to look at it. A Raspberry Pi projector and any phone browser render Homie's display surface. Claude Code connects over MCP as yet another client of the home — and “Reachy, build me an app” actually works: Homie delegates the build to Claude Code in an isolated workspace, serves the result on the LAN, and can deploy GPU-backed apps to Lambda Cloud.",
      { video: "img/homieProjector.mp4", poster: "img/homieProjectorPoster.jpg", caption: "The projected display surface in use — Homie renders its interface on the wall beside the robot, driven by the same event stream as every other client." },
      { video: "img/homieSentiment.mp4", poster: "img/homieSentimentPoster.jpg", caption: "A pluggable sentiment engine drives the robot's head and antenna gestures." },
      "The embodied side has affect: a pluggable sentiment engine unifies cloud and local providers (Gemini Live, OpenFace 3.0, Phi-4, Qwen 2.5 VL) behind one SentimentEvent API — Ekman emotions, valence/arousal/dominance, tone — that drives the robot's head and antenna gestures and how it speaks back to you.",
      { video: "img/homieBuild.mp4", poster: "img/homieBuildPoster.jpg", caption: "Building the first embodied client — a timelapse of the Reachy Mini assembly." },
    ],
  },
  {
    id: "classagent",
    title: "ClassAgent — Course Knowledge Agent",
    year: 2026,
    org: "ASU EdPlus",
    role: "Research Engineer",
    selected: false,
    thumb: "img/classagentThumbnail.gif",
    blurb:
      "An exploratory classroom knowledge agent for ASU EdPlus — a per-course concept graph, plus a tutor grounded by RAG that refuses to answer beyond course material.",
    links: [],
    media: { type: "video", src: "img/classagentProf.mp4", poster: "img/classagentProfPoster.jpg" },
    body: [
      "Universities want AI tutors, but an assistant that hallucinates beyond the syllabus is worse than none. ClassAgent is an EdPlus-sponsored prototype exploring what a trustworthy one looks like: every course gets a Course Brain — a concept knowledge graph built from course materials, tracking cohort-level confusion events — and every student gets an isolated learning graph of their own progress.",
      { img: "img/diagrams/classagent.svg", alt: "ClassAgent architecture", caption: "Grounded RAG with a refusal gate and a provider-neutral model layer.", frame: true },
      "Answers come from retrieval-augmented generation with a refusal gate: if retrieved course context doesn't clear a similarity threshold, the agent declines rather than improvises. A provider-neutral abstraction (ChatModel / EmbeddingModel / StructuredGenerator) swaps Claude, GPT, Gemini, or a deterministic stub behind one interface — with a provider-parity test suite asserting every backend satisfies the same Pydantic output contracts, and an append-only audit log recording every retrieval, refusal, and generation.",
      { video: "img/classagentStudent.mp4", poster: "img/classagentStudentPoster.jpg", caption: "The student-facing tutor generates study guides grounded in the course graph." },
      "Professors, TAs, and students each get their own view: confusion analytics across cohorts for instructors, an AI digest for TAs, and a tutor that generates study guides grounded in the course graph for students. Built on FastAPI and SQLAlchemy (pgvector-ready for production) as a milestone-one scaffold, built for and reviewed with EdPlus and adjacent teams.",
    ],
  },
  {
    id: "earthlight",
    title: "Afrobotica, the Earthlight Historian",
    year: 2026,
    org: "Museum of Science, Boston",
    role: "Lead Research Engineer",
    selected: true,
    thumb: "img/earthlightHero.jpg",
    blurb:
      "A live, offline-first conversational AI character — the pre-show to the Museum of Science Boston's planetarium production Earthlight World. I was lead research engineer.",
    links: [
      { type: "site", url: "https://chaoticcuriosity.io/portfolio/afrobotica", label: "Project page" },
    ],
    media: { type: "image", src: "img/earthlightCupola.jpg" },
    body: [
      "Afrobotica embodies Dr. Sian Proctor's vision: a holographic character in an ISS-style cupola who discusses Earth from space, the Artemis program, and JEDI principles with museum visitors. Development began through the XRts fellowship at Arizona State University in 2024 and debuted at the Museum of Science, Boston on June 13, 2026 — the first conversational AI character built for a full-dome planetarium, running all summer.",
      "The show loop is offline-first: a visitor's question is transcribed locally by Whisper, answered by an on-device language model (Qwen2.5-7B via Ollama) grounded in the character's curated knowledge, spoken through Piper TTS, and rendered live on the dome in Unity 6 with real-time captions — no cloud dependency between a visitor's question and the character's answer.",
      { video: "img/earthlightLive.mp4", poster: "img/earthlightLivePoster.jpg", caption: "Afrobotica running live on the dome — the character rendered in real time in the ISS-style cupola, answering with synchronized voice and captions." },
      { img: "img/diagrams/afrobotica.svg", alt: "Afrobotica conversation pipeline", caption: "The offline show loop: Whisper → on-device LLM → Piper TTS → live dome render.", frame: true },
      "As lead research engineer, I built the conversational AI backend and speech infrastructure, then handled the install: setting up the exhibit PC on-site in Boston, coordinating with museum IT and exhibit staff, and consolidating multi-session review feedback into a structured backlog spanning launcher tooling, conversational behavior tuning, and startup/teardown automation.",
      { img: "img/earthlightHero.jpg", alt: "Afrobotica floating in the ISS-style cupola", caption: "Afrobotica in the ISS-style cupola." },
      { title: "Team", list: [
        "Dr. Sian Proctor — creator: concept, character, poetry",
        "Don Balanzat — production, audio and voice design, show flow",
        "Dylan Kerr — 3D and design",
        "Original score by Subtractive, with collaborating artists Test Shot Starfish and Annu",
      ] },
    ],
  },

  {
    id: "yochef",
    title: "YoChef — Kitchen Agent",
    year: 2026,
    role: "Creator",
    selected: false,
    thumb: "img/yochefThumbnail.gif",
    blurb:
      "A learnable agent for your kitchen — snap your fridge, get dinners you can actually make tonight, and keep every recipe and preference in your own Google Drive. No lock-in.",
    links: [],
    media: { type: "video", src: "img/yochef.mp4", poster: "img/yochefPoster.jpg" },
    body: [
      "YoChef is the 6pm decision engine for households that want to cook from their own kitchen but don't have the planning bandwidth. Snap a photo of your fridge, see what you have, get three dinner ideas you can make tonight, then tap or speak what you used after cooking — and the agent learns your kitchen, your preferences, and your family's tastes over time.",
      "The data model is the product stance: every recipe, preference, and consumed ingredient lives as Markdown and JSONL in a YoChef folder on the user's own Google Drive, scoped so the app can only see files it created. Models are swappable behind an adapter layer — your kitchen, your data, your family, for life; no lock-in to us or to any AI provider.",
      "Under the hood it's a SvelteKit app on Cloudflare's edge (~35KB cold load) streaming responses from a vision-language model: fridge photos parse into ingredient lists, receipts OCR into inventory deltas, a dish photo imports as a recipe. Voice runs the whole loop — Whisper transcription in, intent routing, and an ElevenLabs voice back out — with Gemini generating step images for recipes. A vision eval harness scores the ingredient-recognition pipeline against fixture sets, and structural telemetry tracks the pilot without ever storing kitchen content server-side.",
      { img: "img/yochefMockup.jpg", alt: "YoChef hardware concept — a magnetic touchscreen device on a fridge door", caption: "Where it's headed: a concept for YoChef as a magnetic fridge-door device — far-field mics, stereo speakers, and a Raspberry Pi behind a thin touchscreen." },
    ],
  },

  // ---------- 2025 ----------
  {
    id: "dsl-astronomy",
    title: "Dreamscape Learn — Astronomy VR",
    year: 2025,
    org: "Dreamscape Learn · ASU EdPlus",
    role: "Interaction Engineer",
    selected: true,
    thumb: "img/dslAstronomyThumbnail.gif",
    blurb:
      "Hand and controller interaction systems for Dreamscape Learn's Astronomy VR course — desk-based instruments and pilotable vehicles for a story where students use science to save the world.",
    links: [],
    media: { type: "video", src: "img/dslAstronomy.mp4", poster: "img/dslAstronomyPoster.jpg" },
    body: [
      "Dreamscape Learn turns foundational science courses into cinematic, story-driven VR. In the astronomy experience, students are recruited into the Center for Planetary Observation (CPO) — investigating a potential interstellar threat to Earth, using observation, math, and physics to make evidence-based decisions with real stakes. It runs in Dreamscape's arena pods and reaches 1,000+ ASU students every academic year, part of a program where the VR cohort has been ~1.7× more likely to earn an A than the traditional lab.",
      "I build the interaction systems that make that story playable. On the desk side, that's the hands-on instruments the CPO runs on — telescopes and scanners, the meteor-impact calculation console, and the minigames students manipulate directly with their hands or controllers. On the vehicle side, it's the piloting: crewing spacecraft, a lunar rover, and drones through asteroid fields while scanning for the threat.",
      { video: "img/dslAstronomyFlight.mp4", poster: "img/dslAstronomyFlightPoster.jpg", caption: "Flight mechanics in action — piloting through the asteroid field from the cockpit, scanner sweeping for the interstellar object." },
      { img: "img/dslAstronomyDesk.jpg", alt: "A student's hand on the flight stick, piloting over a meteor-impact crater in the astronomy VR experience", caption: "Piloting by hand — flight controls carry students over a meteor-impact crater.", frame: true },
      "Under the hood it's Unity, built against Dreamscape's in-house SDK for the arena hardware and layered on the Unity XR stack — the XR Interaction Toolkit and XR Hands for grabbable objects, dual controller-and-hand input, and pointer/UI interactions, so the same instrument works whether a student reaches out with their hands or a controller. The interaction layer has to survive an arena full of students every session, so it's engineered to be robust, legible, and forgiving.",
      { video: "img/dslAstronomyLunar.mp4", poster: "img/dslAstronomyLunarPoster.jpg", caption: "Alpha footage of the lunar scene in development — the rover traversal blocked out in the Unity editor, Earth on the horizon." },
      "Every one of these systems is built shoulder-to-shoulder with artists of all kinds — modelers, animators, technical artists, narrative and sound designers. A grab mechanic like the claws students use to pick up objects starts as an art and design intent I translate into interaction code, iterating with each department until the mechanic reads clearly and feels good in the story.",
    ],
  },
  {
    id: "ai-studio",
    title: "AI Studio — Generative Production Tools",
    year: 2025,
    org: "Dreamscape Learn",
    role: "Engineer",
    selected: true,
    thumb: "img/aiStudioThumbnail.gif",
    icon: "fas fa-magic",
    blurb:
      "Generative-AI tooling for Dreamscape Learn's VR pipeline — ComfyUI-backed voice and image-to-3D services, plus an agent that detects script changes and files production tickets.",
    links: [{ type: "code", url: "https://github.com/TheWiselyBearded/ai-studio", label: "Code" }],
    media: { type: "video", src: "img/aiStudioAgent.mp4", poster: "img/aiStudioAgentPoster.jpg" },
    body: [
      "VR production at Dreamscape Learn runs on scripts, voice-over, and 3D assets — and every script revision ripples through all three. AI Studio grew out of automating that ripple: generative services artists can use directly, and an agent that reads script changes and does the production bookkeeping.",
      { img: "img/diagrams/ai-studio.svg", alt: "AI Studio architecture", caption: "A dual generation service plus a GPT-4o agent for script-change bookkeeping.", frame: true },
      "The generation side is a dual-service platform wrapping ComfyUI for voice synthesis and multi-view image-to-3D GLB generation, exposed through REST endpoints, CLI modes, and a drag-and-drop Unity Editor window so artists never leave their workflow.",
      { video: "img/aiStudioGen3d.mp4", poster: "img/aiStudioGen3dPoster.jpg", caption: "The image-to-3D service turning a single reference image into a textured PBR asset — a Hunyuan 3D ComfyUI graph rendering multi-view PBR, imported straight into a Unity Editor window." },
      "The agent side uses GPT-4o function calling over a JSON-schema tool registry: it parses revised VR scripts, detects scene-by-scene changes with an LLM, extracts and diffs VO clips, generates the new voice-over on demand, and files production tickets in Coda automatically.",
      { video: "img/aiStudioVoice.mp4", poster: "img/aiStudioVoicePoster.jpg", caption: "The agent generating scene VO clips in a chosen voice via ComfyUI and writing the results back to a Coda production ticket — the script-change loop, end to end." },
      "Accuracy was engineered, not assumed: a dedicated evaluation harness scored the change-detection loop against ground-truth scripts across nine documented, iterated test runs — prompt rewrites, few-shot examples, temperature tuning, model comparisons — reaching 81%+ precision and 87% recall. Inference runs on self-deployed GPU infrastructure, including GenAI servers on Lambda Cloud serving image and video generation on demand to artists and production teams.",
    ],
  },
  {
    id: "devpod",
    title: "Dev Pod — VR Deployment Infrastructure",
    year: 2025,
    org: "Dreamscape Learn · ASU EdPlus",
    role: "Lead Developer",
    selected: false,
    thumb: "img/devpodThumbnail.jpg",
    icon: "fas fa-server",
    media: { type: "video", src: "img/devpod.mp4", poster: "img/devpodPoster.jpg" },
    blurb:
      "Low-cost build, deployment, and testing infrastructure for Dreamscape Learn VR courses — 1,000+ weekly student sessions and $100K+ in cost savings.",
    links: [],
    body: [
      "Dreamscape Learn's VR courses serve 1,000+ weekly student sessions — and testing them originally meant expensive, arena-grade hardware. At Dreamscape Learn (ASU EdPlus), I led development of the “Dev Pod,” a low-cost deployment and testing rig, alongside VR classroom systems using computer vision and multiplayer networking across LAN and WAN environments.",
      { img: "img/devpodRig.jpg", alt: "The physical Dev Pod rig — a row of tower and mini PCs under a shared desk, each driving a monitor, with VR flight joysticks and a WAN router", caption: "The rig itself: a row of commodity pods tucked under one desk, each a full VR test station — a fraction of the cost of arena-grade hardware.", frame: true },
      { video: "img/devpod.mp4", poster: "img/devpodPoster.jpg", caption: "The web console beside the physical rig — selecting a build, deploying to every connected pod, and watching experiences launch on the machines under the desk." },
      { img: "img/diagrams/devpod.svg", alt: "Dev Pod build and deployment pipeline", caption: "Version control → automated builds → dev-server distribution → NAS archival.", frame: true },
      "Around the pods sits an automated build-and-deploy pipeline: version control feeding automated builds, dev-server distribution, NAS-backed archival, and MongoDB asset management, all operated through web tooling for deployment, system management, and monitoring. Agent-based tooling automates testing, code validation, and iteration workflows, cutting manual overhead each release cycle.",
      { video: "img/devpodDeploy.mp4", poster: "img/devpodDeployPoster.jpg", caption: "Pushing a build to production from the deployment console — logs stream back from the target machines over remote desktop as the VR experience comes up live." },
      "Together the pipeline and pods delivered $100K+ in infrastructure and deployment cost savings across three deployed EDU VR courses, while student developers I mentor build internal tooling on top of it.",
    ],
  },
  {
    id: "social-influence",
    title: "VR Behavioral Research Platform",
    year: 2025,
    org: "Chaotic Curiosity · ASU",
    role: "Lead Developer",
    selected: false,
    thumb: "img/socialInfluenceThumbnail.gif",
    blurb:
      "A VR behavioral-study platform built for Dr. Shiva Pooladvand's lab at ASU — an AI-driven NPC co-worker on a virtual construction site, powered by motion capture, eye tracking, and a full capture-and-playback pipeline.",
    links: [],
    media: { type: "video", src: "img/socialNpc.mp4", poster: "img/socialNpcPoster.jpg" },
    body: [
      "Built at Chaotic Curiosity for Dr. Shiva Pooladvand's lab at ASU, which studies how AI-driven virtual peers influence human decisions — like safety behavior on a construction site. Participants work a high-rise construction scenario in VR alongside an NPC co-worker who talks, gestures, works, and takes risks; the platform records everything the participant does. I led development of the system and built the full data collection and playback pipeline.",
      "The NPC is the experimental stimulus, so its behavior has to be lifelike and controllable: LLM-driven dialogue with ElevenLabs voice and lip sync, task behaviors like bricklaying, wall painting, and plastering, and scripted risk-taking — all sequenced through a modular event-network system that syncs JSON-scripted user-story events between the Unity client and a Python server, so every participant can get a repeatable, experimenter-controlled session.",
      { video: "img/socialMocap.mp4", poster: "img/socialMocapPoster.jpg", caption: "Motion capture drives the NPC's animation set — a suited performance retargeted onto the construction-worker avatar." },
      "Making the NPC move like a worker meant a lot of motion capture: suit-based capture sessions retargeted onto the worker avatar, AI video-based mocap from iPhone footage, VR-tracker capture (including foot trackers) for in-headset performances, and a pose record-and-replay system for layering captured motion back into the scene.",
      { video: "img/socialHands.mp4", poster: "img/socialHandsPoster.jpg", caption: "Hand-interaction design in headset — plastering a wall with tracked hands, one of the participant task interactions." },
      { video: "img/socialNpcPainting.mp4", poster: "img/socialNpcPaintingPoster.jpg", caption: "Authoring the NPC's work behaviors — the wall-painting interaction and its behavior graph in the Unity editor." },
      "On the sensing side, the platform integrates eye tracking (with gaze-trigger events), head-gaze and movement telemetry, motion capture, and BCI signals on Meta Quest — every stream logged for post-session analysis alongside conversation transcripts.",
      { img: "img/socialBlenderMcp.jpg", alt: "Construction site scene generated in Blender", caption: "Environment iteration with generative tooling — construction-site scene variants generated through Blender MCP, then dressed for the study." },
    ],
  },
  {
    id: "rgbd",
    title: "RGBD Playground — Volumetric Playback",
    year: 2025,
    org: "Chaotic Curiosity",
    role: "Developer",
    selected: false,
    thumb: "img/rgbdThumbnail.gif",
    blurb:
      "A capture-to-playback volumetric video system across Quest 3 and Apple Vision Pro — CoreML depth pipelines, Draco-compressed streaming, and on-demand Lambda Cloud H100s for heavy reconstruction.",
    links: [],
    media: { type: "video", src: "img/rgbdAnimated.mp4", poster: "img/rgbdAnimatedPoster.jpg" },
    body: [
      "Capture a person or a place with a phone and walk around it later as a 3D memory. RGBD Playground grew from a Unity playback framework into a capture-to-playback volumetric system spanning two headsets: a Unity 6 engine for Quest 3 / Android XR, and a native RealityKit + Metal framework for Apple Vision Pro — with a generative authoring pipeline that turns ordinary photos and videos into volumetric content.",
      "The Unity side renders Record3D phone captures as compute-shader depth meshes or VFX-Graph point clouds behind one frame-source interface — zip-archived local playback or Draco-compressed live TCP streaming, with NTP time sync and real-time buffering so multiple clients can watch the same clip together. It carries my earlier volumetric work — VVESP and the MobiSys streaming system — forward into a modern Unity 6 stack, tuned for Quest 3 with Burst jobs, async GPU readbacks, and zero-allocation frame paths.",
      { video: "img/rgbdVisionPro.mp4", poster: "img/rgbdVisionProPoster.jpg", caption: "The Vision Pro player — volumetric clips placed and replayed in passthrough, with live depth-clipping and quality controls." },
      "The Vision Pro side is where authoring happens: monocular depth models (Depth Anything V2, Apple DepthPro) run on-device via CoreML to unproject photos and video frames into point clouds, SAM 2.1 segments the subject, and a self-calibration network recovers camera intrinsics from a single image. When a job is too heavy for the headset, the app provisions its own GPU: a built-in Lambda Cloud client launches an H100 instance, falls back across instance types and regions on capacity errors, uploads the job over SSH, and auto-terminates on a cost-guard timer.",
      { video: "img/rgbdGenAI.mp4", poster: "img/rgbdGenAIPoster.jpg", caption: "The generative pipeline resurrecting vintage family footage — an AI video model animates the still, then depth estimation lifts it into a volumetric scene." },
      { video: "img/rgbdMast3r.mp4", poster: "img/rgbdMast3rPoster.jpg", caption: "Dense scene reconstruction from headset capture — MASt3R-SLAM rebuilding a room from a Quest passthrough recording, depth and trajectory in view." },
      { video: "img/rgbdStill.mp4", poster: "img/rgbdAnimatedPoster.jpg", caption: "A phone-captured subject rendered as a VFX-Graph point cloud." },
    ],
  },
  {
    id: "xr-classroom",
    title: "XR Classroom",
    year: 2025,
    org: "ASU EdPlus",
    role: "Engineer",
    selected: false,
    thumb: "img/xrClassroomThumbnail.gif",
    blurb:
      "A cross-platform, shared-reality system for immersive education — collaborative, location-aware VR and MR classrooms for in-person and remote students.",
    links: [],
    media: { type: "youtube", src: "6xJQROQ39XE" },
    body: [
      "XR Classroom is a multi-user immersive learning platform that combines Photon, Unity Netcode, Meta's Spatial Anchors, and the Meta Movement SDK to deliver collaborative, location-aware VR and MR classroom experiences. It supports seated, standing, remote, and hybrid configurations — in-person and remote learners occupy a shared virtual space regardless of physical location.",
      "Students and faculty interact through networked avatars with synchronized spatial anchors for persistent content placement, enabling consistent experiences across sessions and devices. It includes group and individual activity modes and scalable cross-platform support for AR, VR, and 4D devices on affordable hardware.",
      { video: "img/xrClassroomBoundary.mp4", poster: "img/xrClassroomBoundaryPoster.jpg", caption: "Boundary registration — walking the physical classroom to register desks and walkways into the shared coordinate frame." },
      { video: "img/xrClassroomPassthrough.mp4", poster: "img/xrClassroomPassthroughPoster.jpg", caption: "Mixed-reality passthrough mode — a lunar lander scene anchored into the real classroom." },
      "Motivated by making immersive learning more inclusive, scalable, and cost-effective, XR Classroom aligns with EdPlus's mission to remove barriers to education while enabling pilot studies, stress tests, and live feedback loops with students and faculty.",
    ],
  },

  // ---------- 2024 ----------
  {
    id: "flaivor",
    title: "Flaivor",
    year: 2024,
    org: "Meta Presence Platform Hackathon",
    role: "Winner",
    selected: true,
    thumb: "img/flaivorThumbnail.gif",
    blurb:
      "A mixed-reality AI cooking assistant on Quest, and winner of Meta's 2024 Presence Platform Hackathon — photograph your ingredients and get real-time cooking guidance.",
    links: [
      { type: "code", url: "https://github.com/TheWiselyBearded/Flaivor", label: "Code" },
      { type: "site", url: "https://devpost.com/software/spatial-agents", label: "Devpost" },
      { type: "news", url: "https://developers.meta.com/horizon/blog/presence-platform-2024-digital-hackathon-winners-meta-quest/", label: "Meta announcement" },
    ],
    media: { type: "youtube", src: "ty51mfmloTA" },
    body: [
      "Flaivor is a mixed-reality AI cooking assistant and the 2024 Presence Platform Digital Hackathon Winner. Users take a photo of their ingredients or verbally tell an AI named Martha what they have, and receive interactive, real-time cooking guidance through mixed reality on Meta Quest devices.",
      "The system recognizes ingredients via vision, generates dynamic recipes tailored to preferences and dietary needs, and offers a hands-on experience integrating AI voice interaction, timers, substitutions, and 3D UI elements — powered by Unity, Meta's SDKs, OpenAI, and ElevenLabs.",
    ],
  },
  {
    id: "vvesp",
    title: "Volumetric Video Editor",
    year: 2024,
    role: "Developer",
    selected: false,
    thumb: "img/vvespThumbnail.gif",
    blurb: "A spatial, volumetric video editing and streaming system for Quest and iOS.",
    links: [
      { type: "code", url: "https://github.com/TheWiselyBearded/VVESP", label: "Code" },
      { type: "video", url: "https://www.linkedin.com/posts/alirezabahremand_augmentedreality-virtualreality-quest3-activity-7135665169048760321-IaIj", label: "Demo" },
    ],
    media: { type: "youtube", src: "pi86lBCggDs" },
    body: [
      "Composed of a 3D video editor and a streaming/playback system, VVESP gives developers a simple framework for creating 3D movies with consumer devices (iPhone, Quest) — manipulating 3D videos, adding effects, and merging them with virtual environments.",
      "Under the hood it builds on Barracuda, URP, VFX Graph, Quest integration, and ARKit, with libraries ported to Quest and custom C++ plugins for performance. The editor offers multi-track support with customizable VFX graphs for voxels and point clouds, flexible visual and temporal controls, body segmentation, and 3D cropping tools. Key influences: the work of Keijiro Takahashi and Marek Simonik.",
    ],
  },
  {
    id: "sbs",
    title: "SBS Generator",
    year: 2024,
    role: "Developer",
    selected: false,
    thumb: "img/sbsThumbnail.gif",
    blurb:
      "A pipeline that converts any 2D video into stereoscopic 3D for Quest, using monocular depth estimation and stereo view synthesis.",
    links: [
      { type: "code", url: "https://github.com/TheWiselyBearded/sbs-generator", label: "Code" },
      { type: "video", url: "https://www.linkedin.com/posts/alirezabahremand_virtualreality-mixedreality-spatialcomputing-activity-7150546795348025344-zxoZ", label: "Demo" },
    ],
    media: { type: "youtube", src: "lV_cto9JMc0" },
    body: [
      "A simple 2D-to-3D stereo (side-by-side) video generator: make any normal video 3D and viewable on a Quest, processed entirely on a local PC.",
      "The framework combines image processing with depth-map prediction to synthesize separate views for each eye. A Jupyter Notebook generates and uploads an SBS video directly to Quest, and developers can swap in any depth model (tested with PatchFusion and Marigold).",
    ],
  },
  {
    id: "immersive-classroom",
    title: "Immersive Classroom Demo",
    year: 2024,
    org: "Dreamscape Learn",
    role: "Solo Developer",
    selected: false,
    thumb: "img/immersiveClassroomThumbnail.gif",
    blurb:
      "A VR learning demo for ASU clients set in a 1920s schoolhouse, guided by a Dreamscape Immersive co-founder — a solo build.",
    links: [],
    media: { type: "youtube", src: "VaiqUe7yjrk" },
    body: [
      "The Immersive Classroom demo shows ASU clients what VR-based learning environments can be. Users start in a 1920s school setting, meeting Walter Parkes, co-founder of Dreamscape Immersive and Dreamscape Learn, who guides them through astronomy, art history, and world history environments.",
      "As solo developer, I optimized models in Blender and profiled with OVR Metrics Tool and the Unity profiler to hold 60+ FPS, and did all motion capture and rigging (face, mouth, body), programming, and AI integrations with ChatGPT, NVIDIA Omniverse services, and ElevenLabs.",
    ],
  },

  // ---------- 2023 ----------
  {
    id: "vss",
    title: "Volumetric Streaming",
    year: 2023,
    org: "ACM MobiSys",
    role: "Lead Researcher",
    selected: false,
    thumb: "img/vssThumbnail.gif",
    blurb:
      "An AI- and edge-assisted volumetric streaming system with a player, schedulable data/AI tasks, and web streaming — presented at ACM MobiSys.",
    links: [
      { type: "paper", url: "https://dl.acm.org/doi/abs/10.1145/3498361.3538660", label: "Paper" },
    ],
    media: { type: "youtube", src: "a137i1YR2Os" },
    body: [
      "VSS distributes high-quality volumetric data efficiently between endpoints through an intelligent, multi-process scheduling system for multiple data streams. As lead researcher, I built the core framework for feeding and transmitting data across the network, a testing tool for collecting and visualizing system metrics, a set of WPF, Python, and Unity applications for different runtime configurations, and an API for other teams to experiment with.",
      { img: "img/vss-system.jpg", alt: "VSS system architecture", caption: "The VSS multi-process scheduling architecture." },
      "VSS supports reconfigurable network architectures (P2P, server/client) and streams volumetric data via WebRTC for Python and SipSorcery for .NET, with a Unity receiver visualizing incoming data and Kinect support on both stacks.",
      { img: "img/vssStyle.gif", alt: "VSS style transfer prototype", caption: "A prototype isolating human subjects in RGBD frames for style transfer." },
      "A prototype pipeline used body tracking to isolate human subjects within RGBD frames — discarding non-essential pixels to prioritize regions of interest — and applied style-transfer models to the RGB frames while surfacing the bottlenecks of such filter combinations.",
    ],
  },
  {
    id: "ai-npc",
    title: "Chatbot NPC",
    year: 2023,
    role: "Developer",
    selected: false,
    thumb: "img/npcThumbnail.gif",
    blurb:
      "An open-source Unity framework for AI-driven NPCs with voice, lip sync, and YOLO-based vision.",
    links: [
      { type: "code", url: "https://github.com/TheWiselyBearded/ChatbotAvatarAI", label: "Code" },
      { type: "video", url: "https://www.youtube.com/watch?v=CyCedEBO_oA", label: "Video" },
    ],
    media: { type: "youtube", src: "CyCedEBO_oA" },
    body: [
      "ChatbotAvatarAI is a starting Unity project for developers, merging the OpenAI API, Azure Voice, Google Cloud Speech-to-Text, and Oculus Lip Sync into an interactive AI chatbot interface.",
      { img: "img/chatbotAI.gif", alt: "Chatbot NPC demo", caption: "The NPC converses, lip-syncs, and perceives its scene via YOLO-NAS." },
      "The framework also integrates YOLO-NAS: the NPC streams virtual camera frames to a YOLO-NAS server and can visually perceive its environment, while users converse with it and receive near-instant voice responses.",
    ],
  },

  // ---------- 2022 ----------
  {
    id: "smell-engine",
    title: "The Smell Engine",
    year: 2022,
    org: "IEEE VR 2022",
    role: "Project Lead",
    selected: true,
    thumb: "img/SEThumbnailSmall.gif",
    blurb:
      "A patented software/hardware system that synthesizes physical odors in real time to match virtual environments — published at IEEE VR 2022.",
    links: [
      { type: "code", url: "https://github.com/asu-meteor/The-Smell-Engine", label: "Code" },
      { type: "paper", url: "https://meteor.ame.asu.edu/publications/SmellEngineIEEEVRR22.pdf", label: "Paper" },
      { type: "news", url: "https://news.asu.edu/20220909-smelling-strawberries-smoke-and-space-virtual-reality", label: "ASU News" },
    ],
    media: { type: "youtube", src: "vV36-LQbsOU" },
    body: [
      "The Smell Engine is a design framework and software/hardware system that presents users with real-time physical odor synthesis of virtual smells. As project lead, I engineered the system closely with collaborator Dr. Rick Gerkin, conducted system and user studies, and open-sourced the system.",
      { img: "img/smellEngineDiagram.png", alt: "Smell Engine system design", caption: "Smell Composer → Smell Mixer → Smell Controller → olfactometer.", frame: true },
      "With the Smell Composer framework, developers configure odor sources in virtual space; at runtime, the Smell Mixer dynamically estimates the odor mix the user would smell, and the Smell Controller coordinates an olfactometer to physically present an approximation to the user's mask.",
      "In a three-part user study, the Smell Engine produced odors at granularities finer than subjects' olfactory detection sensitivity and improved their ability to localize odors in the virtual environment compared to trigger-based systems.",
    ],
  },
  {
    id: "dreamscape-immersive",
    title: "Dreamscape Immersive",
    year: 2022,
    org: "Dreamscape Immersive",
    role: "Developer",
    selected: false,
    thumb: "img/dsThumbnail.gif",
    blurb:
      "Experimental cinematic VR, a multi-user interactive movie poster, and internal developer tooling, built with Dreamscape's art, sound, and story teams.",
    links: [],
    media: { type: "image", src: "img/dsHeader.gif" },
    body: [
      "At Dreamscape Immersive, I helped develop experimental cinematic VR experiences, a hand- and body-tracking multi-user interactive movie poster system, and internal tools — collaborating with art, sound design, narrative, and programming teams on multi-sensory experiences deployed to 1,000+ ASU students and 3+ storefronts.",
      { img: "img/dsReflection.gif", alt: "Runtime reflection debugging tool", caption: "A runtime reflection debugger for inspecting and editing live objects." },
      "I proposed and developed a runtime debugging tool using reflection that dramatically reduced downtime: developers can inspect virtual objects' code, invoke methods dynamically, and view or edit variables live.",
      { img: "img/dsActorRecording.gif", alt: "Actor recording tools", caption: "Actor recording — facial geometry mapped between iPhone and Quest Pro." },
      "I also worked on actor recording tools, mapping tracked facial geometry between mobile and VR devices (iPhone, Quest Pro) and incorporating IK rigs using Unity's open solutions.",
    ],
  },

  // ---------- 2021 ----------
  {
    id: "xr-memories",
    title: "XR Memories",
    year: 2021,
    role: "Lead Developer",
    selected: false,
    thumb: "img/memoriesThumbnail.gif",
    blurb:
      "Location-anchored, volumetric playback of recorded events — RGBD captures pinned to where they happened with Azure Spatial Anchors.",
    links: [{ type: "video", url: "https://www.youtube.com/watch?v=2lw7tuwLhdA", label: "Video" }],
    media: { type: "youtube", src: "2lw7tuwLhdA" },
    body: [
      "An amalgamation of technology and creativity: I was lead developer, building the tools my artist collaborators needed to tell a personable story about how this technology connects with people.",
      { img: "img/memoriesBG.jpg", alt: "XR Memories", caption: "Volumetric captures anchored back to the places they happened." },
      "RGBD sensors capture volumetric footage of real-world events, which is anchored to the event's location with Azure Spatial Anchors — Cosmos DB syncs world coordinates to the footage so users can re-experience the event in its original context.",
      { img: "img/memoriesToolThumbnail.gif", alt: "XR Memories tooling", caption: "The authoring tools built for artist collaborators." },
      "Events can also be replayed in any environment: the backend maps anchors to volumetric capture files loaded onto the device for playback — a bridge between digital and physical space.",
    ],
  },
  {
    id: "baltu",
    title: "Baltu Technologies",
    year: 2021,
    org: "Baltu Technologies",
    role: "Lead Developer",
    selected: false,
    thumb: "img/baltuThumbnail.gif",
    blurb:
      "SuperDoc, an on-the-job training platform that captures and delivers an organization's specialized knowledge. I led backend and REST API development.",
    links: [],
    media: { type: "image", src: "img/baltu.gif" },
    body: [
      "SuperDoc — designed for hands-on employees — captures and shares the specialized skills and knowledge of an organization. As a lead developer at Baltu, I built the core backend system servicing the front end.",
      "Working primarily in Unity, I merged multiple SDKs into a coherent experience letting users upload and retrieve any form of multimedia (2D, 3D, image, video, audio) rendered in-app, and explored mapping knowledge tips to AR anchors (Apple World Anchors, Azure Spatial Anchors, Oculus Anchors).",
    ],
  },
  {
    id: "ds-mobile",
    title: "Dreamscape Mobile",
    year: 2021,
    org: "Dreamscape Learn",
    role: "Project Lead",
    selected: false,
    thumb: "img/dsMobileThumbnail.gif",
    blurb:
      "An AR companion app letting students explore content from ASU Dreamscape Learn VR experiences, tested by 100+ biology students. I was project lead.",
    links: [],
    media: { type: "image", src: "img/dsmobile.gif" },
    body: [
      "As project lead and lead programmer, I worked with a dedicated student team to develop a cross-platform mobile AR app in Unity, running weekly sprint check-ins.",
      { img: "img/studentsDSMobile.jpg", alt: "Students using Dreamscape Mobile", caption: "Students using Dreamscape Mobile in an intro biology course." },
      "The app lets students engage in interactive classroom assignments and review data from their VR experiences, built on AWS server integration, Unity asset bundles, and OAuth2 — supporting 150+ students per semester in introductory ASU Biology courses.",
    ],
  },
  {
    id: "designing-dreamscape",
    title: "Designing for Dreamscape",
    year: 2021,
    org: "ASU · Dreamscape Learn",
    role: "Lead Developer",
    selected: false,
    thumb: "img/walter.JPG",
    blurb:
      "A VR cinematic story on climate change, one of the first projects on the Dreamscape Learn platform. I was lead developer.",
    links: [
      { type: "news", url: "https://news.asu.edu/20211203-creativity-asu-students-create-time-travel-experience-dreamscape-learn", label: "ASU News" },
      { type: "video", url: "https://www.youtube.com/watch?v=LzyutpwYc9M", label: "Video" },
    ],
    media: { type: "youtube", src: "LzyutpwYc9M" },
    body: [
      "As lead developer, I coordinated integrations across teams — working with Unity Timeline developers on narrative construction, modelers on asset updates, and programmers on events and interactions.",
      { img: "img/walter.JPG", alt: "Walter Parkes visit", caption: "Walter Parkes, CEO of Dreamscape Immersive, reviewing the experience." },
      "Our class was one of the first groups to use the Dreamscape Learn VR platform. The time-traveling climate-change scenario received praise from industry professionals, including Walter Parkes, CEO of Dreamscape Immersive.",
    ],
  },

  // ---------- 2020 ----------
  {
    id: "planetary-visor",
    title: "Planetary Visor",
    year: 2020,
    org: "ASU METEOR",
    role: "Lead Developer",
    selected: false,
    thumb: "img/visorThumbnail.gif",
    blurb:
      "A VR tool visualizing Martian terrain along NASA Curiosity's traverse, aligned with orbital spectroscopy data.",
    links: [
      { type: "code", url: "https://github.com/LaurenGold/Planetary-Visor", label: "Code" },
      { type: "paper", url: "https://ieeexplore.ieee.org/abstract/document/9417645", label: "Paper" },
      { type: "video", url: "https://www.youtube.com/live/vU1ooD8uu3A?feature=share&t=19974", label: "Video" },
    ],
    media: { type: "youtube", src: "Wz3Nzo09qko" },
    body: [
      "Planetary Visor is a virtual reality tool for visualizing orbital and ground data around NASA's Mars Science Laboratory Curiosity rover's ongoing traverse in Gale Crater. As lead developer, I built the project's early foundation for future students to conduct research on top of.",
      { img: "img/planetaryVisor.png", alt: "Planetary Visor experience", caption: "Satellite VNIR spectroscopy rendered as polyhedrons over rover-built terrain." },
      "We built 3D terrain along Curiosity's traverse from rover images and visualize satellite VNIR spectroscopy as polyhedrons superimposed on that terrain — seamless rendering of datasets at vastly different scales, letting users explore both the physical terrain and its mineral composition. We evaluated the tool in a user study with subject-matter experts.",
    ],
  },
  {
    id: "bsi",
    title: "BSI Training Simulation",
    year: 2020,
    org: "British Standards Institute",
    role: "Contractor",
    selected: false,
    thumb: "img/bsiThumbnail.gif",
    blurb:
      "A VR training app with task authoring, performance grading, and gaze heatmaps, built for the British Standards Institute.",
    links: [{ type: "video", url: "https://www.youtube.com/watch?v=DW8ljqdMYrI", label: "Video" }],
    media: { type: "youtube", src: "DW8ljqdMYrI" },
    body: [
      "BSI (British Standards Institute) wanted to explore remote-working options through VR training. As a contractor, I built a tool for constructing asynchronous task-based training applications, letting future developers build similar experiences. We also collected new kinds of performance data — task-timeliness tracking and head-gaze heatmaps in VR.",
      { img: "img/bsi.png", alt: "BSI training simulation", caption: "Task-based sea-crate inspection training with gaze heatmaps." },
      "We followed a sprint methodology throughout: meeting with BSI's internal teams to document inspection processes, reviewing previous training material, and interviewing to identify key performance metrics for an example use case (sea-crate inspections).",
    ],
  },
  {
    id: "campus-tours",
    title: "ASU Campus Tours",
    year: 2020,
    org: "ASU",
    role: "Lead Developer",
    selected: false,
    thumb: "img/asucampusThumbnail.gif",
    blurb:
      "A WebXR and desktop platform for exploring ASU campuses through curated 360° tours.",
    links: [
      { type: "site", url: "https://xr.asu.edu/exp/campus/", label: "Live site" },
      { type: "video", url: "https://www.youtube.com/watch?v=paHgnlLAFoo", label: "Video" },
    ],
    media: { type: "youtube", src: "paHgnlLAFoo" },
    body: [
      "The ASU 360 Virtual Campus application is a web-based desktop and VR platform for exploring ASU's campuses. As lead developer, I created an internal tool for curating customized campus tours per location with a custom JSON schema — including a web interface where instructors upload 360° pictures and assign campus locations to each image.",
      "I collaborated closely with a team of designers on the front-end interface, and documented the project for a smooth handoff to the team taking it over.",
    ],
  },
  {
    id: "commencement",
    title: "ASU Commencement",
    year: 2020,
    org: "ASU",
    role: "Backend Engineer",
    selected: false,
    thumb: "img/commencementThumbnail.gif",
    blurb:
      "A mobile AR commencement experience with volumetric captures of speakers — 5K virtual attendees at ASU's Fall 2020 ceremony.",
    links: [
      { type: "site", url: "https://xr.asu.edu/commencement/", label: "Live site" },
      { type: "news", url: "https://news.asu.edu/20201214-sun-devil-life-asu-commencement-app-offers-grads-augmented-reality-experience", label: "ASU News" },
      { type: "video", url: "https://www.youtube.com/watch?v=5QccM3EG9jM", label: "Video" },
    ],
    media: { type: "youtube", src: "5QccM3EG9jM" },
    body: [
      "We developed a mobile AR commencement experience for ASU's Fall 2020 ceremony. Working alongside designers and programmers, I played a key role in backend engineering, scripted timelines, and leading the volumetric capture of the speakers.",
      { img: "img/commencementApp.jpg", alt: "ASU Commencement app", caption: "Graduates share the stage with President Crow in AR." },
      "Graduates could stand on stage with President Crow and sing the Alma Mater with the ASU Chamber Singers. Built with Unity, Google ARCore, and Apple ARKit, the app featured iconic ASU locations and immersive 360° footage of Sun Devil Stadium.",
    ],
  },

  // ---------- 2019 ----------
  {
    id: "nasa",
    title: "NASA Astronaut Training",
    year: 2019,
    org: "NASA MSFC",
    role: "Intern",
    selected: false,
    thumb: "img/nasaTSThumbnail.gif",
    blurb:
      "A VR training authoring tool and CAD import pipeline for ISS maintenance simulations, presented to the MSFC board.",
    links: [{ type: "video", url: "https://www.youtube.com/watch?v=fK_BMXSNbeg", label: "Video" }],
    media: { type: "youtube", src: "fK_BMXSNbeg" },
    body: [
      "During my internship at NASA MSFC, I developed a framework and application for creating VR-based training simulations. Consulting and testing routinely with designers, mechanical engineers, and systems engineers, I saw that incorporating changes to a training procedure added weeks of development downtime.",
      { img: "img/nasaThumbnail.gif", alt: "NASA training simulator tool", caption: "Tagging objects and operations into JSON task sequences." },
      "So we built a tool that uniquely tags objects and their operations (movement, combining) into sequences of processes and tasks saved as JSON, and — using the PiXYZ Studio SDK — a pipeline for importing complex CAD models from a server into Unity at runtime.",
    ],
  },
  {
    id: "swish",
    title: "SWISH",
    year: 2019,
    org: "ASU METEOR",
    role: "Developer",
    selected: false,
    thumb: "img/swishThumbnail.gif",
    blurb:
      "A mixed-reality haptic interface that simulates the shifting weight of fluid in handheld vessels — published research.",
    links: [
      { type: "code", url: "https://github.com/Shahab-VT/SWISH", label: "Code" },
      { type: "paper", url: "https://meteor.ame.asu.edu/publications/p751-sagheb.pdf", label: "Paper" },
      { type: "video", url: "https://www.youtube.com/watch?v=dGoqvKuwW34", label: "Video" },
    ],
    media: { type: "youtube", src: "dGoqvKuwW34" },
    body: [
      "SWISH, a Shifting-Weight Interface of Simulated Hydrodynamics, bridges visual and haptic experiences in virtual environments by providing a realistic sense of fluid motion in handheld vessels — using VR tracking and motor actuation to actively shift the device's center of gravity.",
      { img: "img/swishSystem.png", alt: "SWISH system design", caption: "Center-of-mass movement mapped to stepper-motor commands.", frame: true },
      "I worked on integrating the NVIDIA Flex fluid-simulation library with Unreal Engine and Unity, and on mapping center-of-mass movement to stepper motor commands.",
    ],
  },
  {
    id: "hololucination",
    title: "HoloLucination",
    year: 2019,
    org: "Amazon re:MARS 2019",
    role: "Lead Developer",
    selected: false,
    thumb: "img/hololucinationThumbnail.gif",
    blurb:
      "A framework for presenters to trigger synchronized AR animations across HMDs and mobile devices — demoed at Amazon re:MARS 2019.",
    links: [
      { type: "paper", url: "https://ieeexplore.ieee.org/document/8942234/", label: "Paper" },
      { type: "video", url: "https://www.youtube.com/watch?v=TXl80knPrhE", label: "Video" },
    ],
    media: { type: "youtube", src: "TXl80knPrhE" },
    body: [
      "The framework lets users prepare sequential animation states that presenters invoke to occur simultaneously on HMDs and mobile devices. As lead developer, I built the system and tested its capabilities with Dr. Tanya Harrison at Amazon re:MARS 2019.",
      { img: "img/hololucinationDiagram.png", alt: "HoloLucination system design", caption: "Devices poll a web server that switches each one's animation state.", frame: true },
      "For a communication backbone, HoloLucination uses client-server HTTP requests for simplicity and scalability: every connected device polls the web server for updates that switch its animation state index.",
    ],
  },
  {
    id: "staircase",
    title: "Staircase",
    year: 2019,
    role: "Personal Project",
    selected: false,
    thumb: "img/staircaseThumbnail.gif",
    blurb: "A home project turning our staircase railing into music- and motion-responsive lighting with an Arduino.",
    links: [{ type: "video", url: "https://www.youtube.com/watch?v=FftMp_-CkPg", label: "Video" }],
    media: { type: "youtube", src: "FftMp_-CkPg" },
    body: [
      "Our staircase had no installed lighting, making it hard to use at night. We combined LED strips, a microphone, PIR motion sensors, and an Arduino Uno into a responsive lighting system.",
      "The illuminated stairs respond to music with dynamic light patterns and to motion. We wired everything ourselves and 3D-printed custom casings to hide the wires.",
    ],
  },
];
