# NexusRN External Media Manifest Intake

Place the external-agent assets in this folder and rename your completed manifest to:

```text
media/external/media-manifest.json
```

v243H1 validates metadata only. It does not render images, audio, ECG/FHR strips, hotspot regions, or scoring media.

Required fields:

- assetId
- kind
- templateId
- assetPath
- altText
- caption
- allowedUse
- sourcePolicy
- status
- noPatientIdentifiers

Blocked in v243H1:

- image-hotspot mapping
- audio-hotspot mapping
- highlight cue mapping
- hotspot/scoring regions
- external HTTP/HTTPS asset URLs
- patient identifiers
- media used as scoring-critical evidence


## v243I Asset Rendering Sandbox

A new isolated preview route is available at `media-sandbox/index.html`. It previews only local, manifest-validated, non-scoring assets and keeps production question routes metadata-only. Image/audio hotspot, highlight, hotspot regions, scoring regions, external URLs, and patient identifiers remain blocked.
