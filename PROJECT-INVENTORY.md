# Project Inventory — Media & Info Wishlist

Audit of all 30 projects in `js/projects.js` (July 16, 2026). Tiers are ordered by
how much the missing material hurts the site. Check items off / drop files in as
you find them — anything goes: raw screen recordings, phone video, photos. I'll
handle conversion, posters, and compression.

---

## Tier 1 — No thumbnail at all (gray placeholder cards)

All four resolved as of July 22, 2026 (websitemedia drop).

### VITURE Smart Glasses Spatial Pipeline (`viture`, 2026) — DONE
- [x] Thumbnail GIF (Gaussian-splat beach walk) + hero video
- [x] 4DGS volumetric playback capture, style-transfer stereo clip
- [x] Telemetry/SLAM capture tool + relocalization tooling clips, recon still
- [ ] The pinch-and-point → Reachy Mini robot control clip
- [ ] Photo of the glasses in use (even a casual one)

### AI Studio (`ai-studio`, 2025) — DONE (July 22 media pass)

### Dev Pod (`devpod`, 2025) — DONE (rig photo is the thumb)
- Unused extras in websitemedia/devpod: DevPodBeforeAfter.png,
  DevPodClassroom.PNG, CLI tests clip — available if the entry ever needs more.

### VR Behavioral Research Platform (`social-influence`, 2025) — DONE
Rebuilt July 22: thumbnail + hero (construction-site NPC), mocap/hand-interaction/
behavior-graph clips, Blender MCP figure, Dr. Shiva Pooladvand's ASU lab named,
now in Selected Works. Repo (chaotic-curiosity-io/SocialInfluence) is private — no code link.
- [ ] Is there a publication in flight worth mentioning?

---

## Tier 2 — Has media, missing information or links

### Afrobotica / Earthlight (`earthlight`, 2026)
- [x] Dome/show footage — live character-on-dome clip added July 22
- [ ] Install photos or visitor photos from the Museum of Science, Boston
- [ ] MOS event page or press coverage link, if one exists
- Unused extras: FollowedPortraitDemo, PortraitHighlightDemo, PanoramicVideo
  (all dark), DevScreenshot — a brighter visitor/install shot is still wanted.

### Homie (`homie`, 2026)
- [x] New thumbnail (Reachy on the table), projector display-surface clip,
      assembly timelapse — added July 22
- [ ] The "Reachy, build me an app" flow end-to-end
- [ ] Is any part of the repo public? (code link)
- Unused extras: reachytalking1–3 (4K conversations), scannerdemo (Foxglove),
  reachy_wheels photos, reachyscan portrait split.

### Cell & Bacteria Tracking (`zorb`, 2026)
Visually complete.
- [ ] Anything quantitative beyond the 184-track reference run? (accuracy vs.
      hand annotation, time saved, cells processed to date)

### ClassAgent (`classagent`, 2026)
Complete for a prototype.
- [ ] Confirm: no public repo or EdPlus page to link?

### Flaivor (`flaivor`, 2024)
Hackathon winner with zero links — the claim deserves a citation.
- [ ] Meta's winner announcement URL
- [ ] Devpost page
- [ ] Any press coverage

### RGBD Playground (`rgbd`, 2025)
Expanded July 22 into the capture-to-playback story: Vision Pro player + CoreML
authoring (Depth Anything V2 / DepthPro / SAM 2.1), Lambda H100 self-provisioning,
GenAI vintage-footage pipeline, MASt3R-SLAM recon clip.
- [ ] Is the repo public? A code link fits its developer-framework framing.
- Unused extras in "RGBD Pipelines": quest passthrough visualizer, environment
  playback, iPhone MASt3R demo, debugging stills, demo-teaser portrait.

### XR Classroom (`xr-classroom`, 2025)
- [x] Boundary-registration and MR passthrough clips added July 22
- [ ] Any paper, poster, or press link?

### YoChef (`yochef`, 2026) — NEW July 22
Card + dialog built from websitemedia/yochef and the chef-agent/chef repo
(private — no code link). Landing-page screenshot unused.
- [ ] Public URL for the pilot, if it should be linked
- [ ] Confirm org/attribution line (currently just "Creator", no org)

---

## Tier 3 — Complete, no action needed

VVESP · SBS Generator · Immersive Classroom · VSS (MobiSys) · Chatbot NPC ·
Smell Engine · Dreamscape Immersive · XR Memories · Baltu · Dreamscape Mobile ·
Designing for Dreamscape · Planetary Visor · BSI · Campus Tours · Commencement ·
NASA Astronaut Training · SWISH · HoloLucination · Staircase

---

## Housekeeping — done July 16, 2026

- [x] Localized 5 hotlinked images (meteor.ame.asu.edu ×4, tech.asu.edu ×1) into
      `img/`: `smellEngineDiagram.png`, `planetaryVisor.png`, `commencementApp.jpg`,
      `swishSystem.png`, `hololucinationDiagram.png`
- [x] Added a `site` link type (globe icon) — Campus Tours and Commencement
      "Live site" links no longer masquerade as code links; Earthlight's project
      page now uses it too
