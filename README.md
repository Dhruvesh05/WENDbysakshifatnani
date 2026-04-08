
  # Interior Designer Website

  ## Local Run

  1. Install dependencies:

  ```bash
  npm i
  ```

  2. Start development:

  ```bash
  npm run dev
  ```

  ## Production Connectivity

  This frontend reads backend URL from environment variables in this order:

  1. `VITE_API_URL`
  2. `VITE_API_BASE_URL`
  3. `VITE_BACKEND_URL`

  Set one of them to:

  `https://wendbysakshifatnani-edtn.onrender.com`

  ## Deployment Notes

  - Frontend (Vercel): configure `VITE_API_URL` and optional EmailJS vars.
  - Backend/API (Render): configure server secrets in `client-admin-panel` environment.
  - Render health endpoint is available at `/health`.
  - API health endpoint is available at `/api/health`.

  ## Browser Error Troubleshooting

  If browser shows frame/navigation errors or network failures:

  1. Confirm backend is healthy:
    - `https://wendbysakshifatnani-edtn.onrender.com/health`
  2. Confirm API endpoint returns JSON:
    - `https://wendbysakshifatnani-edtn.onrender.com/api/projects`
  3. Confirm frontend env is set to HTTPS backend URL only.
  4. Confirm Render `CORS_ORIGIN` includes Vercel domain.
  