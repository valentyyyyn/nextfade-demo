// @ts-check
import { defineConfig } from 'astro/config';
import React from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    integrations: [React()],
    vite: {
        define: {
            'import.meta.env.VITE_API_URL': JSON.stringify(import.meta.env.VITE_API_URL),
        }
    }
});
