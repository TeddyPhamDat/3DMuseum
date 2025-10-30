# 3D Museum (React + three.js + @react-three/fiber)

A minimal demo project showing a flat-floor 3D "museum" gallery with walls, images on walls, and a clickable door.

Features
- Built with Vite + React
- 3D scene using three.js via @react-three/fiber and @react-three/drei
- Flat floor (plane geometry)
- Walls with image textures
- Clickable door that rotates open

Replace images
- Put local images in `public/assets/` and update URLs in `src/Museum.jsx` (the `sample` array).

Install & run (Windows PowerShell)
```powershell
# from project root (d:/3D Museum)
npm install
npm run dev
```

Open the shown URL (usually http://localhost:5173). Controls:
- Orbit with mouse (default)
- Click the door mesh to open/close it

Notes & next steps
- Current movement is orbit-style. For first-person walking (pointer lock + WASD) we can add simple movement logic or use an example from `drei`.
- You can replace sample remote images with local files in `public/assets` for offline use.

Have me add pointer-lock walking and collision next if you want a walk-through experience (WASD + mouse look).
