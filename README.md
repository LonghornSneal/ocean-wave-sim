# Ocean Wave Simulator (3D, real-time controls)

This is a browser-based 3D ocean simulator using Three.js with:

- Real-time wave growth driven indirectly by **location + season + weather probabilities** (wind/fetch/duration are derived).
- JONSWAP-like wave spectrum synthesized into many Gerstner components.
- Sun + moon sky motion (time-of-day) with visible discs, named moon phases, and lunar distance → tide scaling.
- Foam on steep crests.
- Procedural ocean audio (wind + wave + rain).
- A **sea otter camera rig**: third-person view follows the otter smoothly.
- Simple underwater life + bioluminescence at night.
- Cloud deck, rain/snow particles, and a rainbow under the right conditions.

## Run

Prereqs: Node.js 18+ recommended.

```bash
npm install
npm run dev
```

Then open the URL Vite prints.

## Run on Android (Termux)

Android shared storage (e.g. `~/storage/downloads`) does **not** support the symlinks
`npm install` wants to create. Install in Termux's **home** directory instead.

Example (assuming the zip is in Downloads):

```bash
termux-setup-storage
pkg update -y && pkg upgrade -y
pkg install -y nodejs-lts unzip

cd ~
rm -rf ocean-wave-sim
unzip -o ~/storage/downloads/ocean-wave-sim_fixed5.zip -d ~

cd ocean-wave-sim
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

If you insist on running from shared storage, you can try:

```bash
npm config set bin-links false
npm install
```

but the recommended approach is running inside `$HOME`.

## Notes

- **Audio requires a user gesture**: tap/click once to enable sound.
- "Quality" affects ocean mesh density and particle counts. If you change it, a page refresh may be needed on some devices.
