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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.