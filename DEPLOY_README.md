# ARTIFACT Website Deploy

This archive contains the source files for the ARTIFACT website.

## Requirements

- Node.js 22 is recommended.
- Node.js 20.19+ also works.
- npm is included with Node.js.

## Build

From this folder:

```bash
npm install
npm run build
```

After the build finishes, upload the contents of the generated `dist` folder to the hosting/server.

## Local Preview

```bash
npm run build
npx vite preview --host 127.0.0.1 --port 4180
```

Then open:

```text
http://127.0.0.1:4180/
```

## Notes

- Do not upload `node_modules` to the server.
- Do not upload `backups`.
- The `assets/media` folder includes both display images used by the website and original media files kept for future edits.
- The image optimization script is protected from accidental recompression. It only runs with `ALLOW_LOSSY_IMAGE_OPTIMIZATION=1`.
