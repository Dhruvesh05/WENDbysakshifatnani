import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  // For development (localhost), only use proxy if API_URL points to localhost
  // Otherwise, rely on the API client to use absolute URLs
  const rawBackendTarget =
    env.VITE_API_URL ||
    env.VITE_BACKEND_URL ||
    env.VITE_API_BASE_URL ||
    'http://localhost:3000'  // Default for local development
  
  const backendTarget =
    rawBackendTarget.startsWith('http://')
      ? rawBackendTarget.replace('http://', 'https://')
      : rawBackendTarget

  return {
    plugins: [
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      proxy: {
        '/api': {
          // Proxy configuration for local development
          // Only applies when using relative /api paths
          target: 'http://localhost:3000',
          changeOrigin: true,
          // Don't proxy if the request is for an absolute URL
          bypass(req, res, options) {
            // If API_BASEURL is set to a remote URL, bypass the proxy
            const apiUrl = env.VITE_API_URL || env.VITE_API_BASE_URL || env.VITE_BACKEND_URL
            if (apiUrl && apiUrl.includes('onrender.com')) {
              console.log('[vite-proxy] bypassing proxy for remote backend', { url: req.url })
              return false // Don't proxy, let the API client handle it
            }
            return null // Use the proxy
          }
        },
        '/uploads': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          bypass(req, res, options) {
            const apiUrl = env.VITE_API_URL || env.VITE_API_BASE_URL || env.VITE_BACKEND_URL
            if (apiUrl && apiUrl.includes('onrender.com')) {
              return false
            }
            return null
          }
        },
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
