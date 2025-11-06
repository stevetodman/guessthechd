# Media Assets for Cases

This directory contains clinical images (CXR) and audio files (heart sounds) for each case.

## Directory Structure

Each case has its own subdirectory:

```
cases/
├── asd/          # Atrial Septal Defect
├── vsd/          # Ventricular Septal Defect
├── pda/          # Patent Ductus Arteriosus
├── coa/          # Coarctation of the Aorta
├── ps/           # Pulmonic Stenosis
├── tof/          # Tetralogy of Fallot
├── tga/          # d-Transposition of Great Arteries
├── truncus/      # Truncus Arteriosus
├── tapvr/        # Total Anomalous Pulmonary Venous Return
├── avsd/         # AV Septal Defect
├── ebstein/      # Ebstein Anomaly
└── hlhs/         # Hypoplastic Left Heart Syndrome
```

## Required Files per Case

Each case directory should contain:

- `r3-crop.jpg` - R3 rung: CXR crop showing classic sign
- `r4-audio.mp3` - R4 rung: Heart sound (≤2 seconds)
- `r5-full.jpg` - R5 rung: Full CXR or confirmatory image (when applicable)

## Image Specifications

- Format: JPEG
- Max width: 1200px (will be responsive)
- Compression: Optimize for web (≤200KB per image)
- Ensure proper medical imaging orientation

## Audio Specifications

- Format: MP3
- Duration: ≤2 seconds
- Sample rate: 44.1 kHz
- Bitrate: 128 kbps (sufficient for heart sounds)
- Volume: Normalize to -3dB peak

## Sourcing Media

All images and audio must be:
1. Public domain, or
2. Licensed for educational use, or
3. Original content with appropriate permissions

Document sources in case metadata as needed.

## Placeholder Images

Until real clinical media is available, you can use:
- Placeholder images: https://via.placeholder.com/800x600.png?text=CXR+Placeholder
- Placeholder audio: Generate short sine wave tones for testing

## Testing Without Media

The application gracefully handles missing media:
- Images: Will show alt text
- Audio: Will display audio controls (user sees "file not found")

Focus on content first, add media later.
