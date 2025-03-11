import { build } from 'vite';
import { mkdir, copyFile } from 'fs/promises';
import { join } from 'path';

async function runBuild() {
  try {
    // Run Vite build
    await build();

    // Ensure public directory exists
    await mkdir('dist', { recursive: true });

    // Copy Cloudflare Pages specific files
    const files = ['_headers', '_routes.json'];
    for (const file of files) {
      await copyFile(
        join('public', file),
        join('dist', file)
      ).catch(err => console.warn(`Warning: Could not copy ${file}:`, err));
    }

    console.log('✅ Build completed successfully');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}
