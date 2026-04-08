# Client Admin Panel

This project is an admin panel for managing projects and portfolios. It provides functionalities to add, delete, edit, and update projects and portfolios, making it easy for clients to manage their content.

## Features

- **Project Management**: Create, edit, and delete projects.
- **Portfolio Management**: Create, edit, and delete portfolios.
- **Responsive Design**: The admin panel is designed to be responsive and user-friendly.
- **Data Validation**: Ensures data integrity with validation on forms.

## Project Structure

```
client-admin-panel
├── src
│   ├── app
│   │   ├── layout.tsx          # Layout for the admin panel
│   │   ├── page.tsx            # Main entry point for the admin panel
│   │   ├── projects
│   │   │   ├── page.tsx        # List of projects
│   │   │   ├── new
│   │   │   │   └── page.tsx    # Form to create a new project
│   │   │   └── [id]
│   │   │       └── page.tsx    # Edit existing project
│   │   └── portfolios
│   │       ├── page.tsx        # List of portfolios
│   │       ├── new
│   │       │   └── page.tsx    # Form to create a new portfolio
│   │       └── [id]
│   │           └── page.tsx    # Edit existing portfolio
│   ├── components
│   │   ├── projects
│   │   │   ├── ProjectForm.tsx  # Component for project form
│   │   │   └── ProjectTable.tsx  # Component for project table
│   │   └── portfolios
│   │       ├── PortfolioForm.tsx # Component for portfolio form
│   │       └── PortfolioTable.tsx # Component for portfolio table
│   ├── lib
│   │   ├── api.ts               # API functions for managing projects and portfolios
│   │   └── validations.ts        # Validation functions for forms
│   ├── types
│   │   └── index.ts             # TypeScript interfaces and types
│   └── styles
│       └── globals.css          # Global styles
├── package.json                  # npm configuration
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
└── README.md                     # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd client-admin-panel
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

To start the development server, run:
```
npm run dev
```

Visit `http://localhost:3000` in your browser to access the admin panel.

## Deployment Notes

If the admin panel is deployed separately from the API, set `NEXT_PUBLIC_API_URL` to the backend URL in the hosting environment. If the backend is on a different origin, also set `CORS_ORIGIN` on the backend to the admin panel URL.

### Environment Variable Placement (Vercel vs Render)

Use this split for production:

- Set on **Vercel (public website app)**:
   - `VITE_API_BASE_URL=https://wendbysakshifatnani-edtn.onrender.com`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

- Set on **Render (backend/admin app)**:
   - `AUTH_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_STORAGE_BUCKET`
   - `CORS_ORIGIN` (include `https://wendbysakshifatnani.vercel.app` and local dev origins)
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_IP_FAMILY` (optional, default `4`)
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM_EMAIL`
   - `CONTACT_RECEIVER_EMAIL`
   - `NEXT_PUBLIC_API_URL=https://wendbysakshifatnani-edtn.onrender.com` (only needed if admin frontend is hosted on a different origin than backend)

Never put secrets (like `SUPABASE_SERVICE_ROLE_KEY`, `SMTP_PASS`, `AUTH_SECRET`) in Vite `VITE_*` vars.

## Supabase Setup

This admin panel now uses Supabase for:

- `projects` table
- `portfolios` table
- `contacts` table
- image uploads via Supabase Storage

Set these environment variables in `client-admin-panel/.env.local` (and in production):

```env
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
SUPABASE_STORAGE_BUCKET=wend-media
```

Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. Do not expose it in client-side env vars.

### Required tables (example schema)

```sql
create table if not exists public.projects (
   id text primary key,
   title text not null,
   description text not null,
   location text,
   category text,
   images jsonb not null default '[]'::jsonb,
   created_at timestamptz not null default now(),
   updated_at timestamptz not null default now()
);

create table if not exists public.portfolios (
   id text primary key,
   title text not null,
   description text not null,
   images jsonb not null default '[]'::jsonb,
   created_at timestamptz not null default now(),
   updated_at timestamptz not null default now()
);

create table if not exists public.contacts (
   id text primary key,
   name text not null,
   email text not null,
   location text,
   service text,
   message text not null,
   created_at timestamptz not null default now()
);
```

### Required storage bucket

- Create a bucket named `wend-media` (or set a different name in `SUPABASE_STORAGE_BUCKET`).
- Make the bucket public if you want direct public URLs for uploaded images.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.