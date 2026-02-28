import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import myPlugin from 'vite-plugin-mylogger'

// https://vite.dev/config/
export default defineConfig({
  base: '/task-manager/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    myPlugin(),
  ],
})