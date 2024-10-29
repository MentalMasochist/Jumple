import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    build: {
        target: 'esnext'
    },
    base: "/Jumple",
    plugins: [react()],
})
