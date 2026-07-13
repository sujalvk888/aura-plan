<div align="center">
  
# 🏡 Aura Plan

</div>

<div align="center">

### An Immersive 3D Property Visualization & Virtual Tour Platform Built with Next.js, React Three Fiber & Three.js

Design interactive digital twins of real-world properties, create immersive virtual walkthroughs, and explore every room through realistic first-person navigation.

<p>
  <a href="https://aura-plan-tau.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-2563EB?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Three.js-WebGL-000000?style=flat-square&logo=threedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/React_Three_Fiber-3D_Rendering-8B5CF6?style=flat-square"/>
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white"/>
</p>

<p>
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-Authentication-F59E0B?style=flat-square"/>
  <img src="https://img.shields.io/badge/Cloudinary-Image_Storage-3448C5?style=flat-square&logo=cloudinary&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>
</p>

</div>

---

# 📖 Overview

**Aura Plan** is a modern full-stack **3D property visualization and virtual tour platform** that enables property owners to transform real-world spaces into immersive digital experiences. Built with **Next.js 16**, **React 19**, **TypeScript**, **Three.js**, **React Three Fiber**, **Prisma**, and **PostgreSQL**, the platform combines interactive WebGL rendering with a scalable backend to create realistic virtual property walkthroughs.

Instead of static image galleries, Aura Plan allows hosts to build complete digital representations of their properties by defining room dimensions, uploading panoramic surface images, and connecting rooms through interactive hotspots. Visitors can freely navigate these spaces using first-person controls or inspect the overall room structure through an exterior 3D cube view.

The platform supports both desktop and mobile devices with adaptive navigation systems, making immersive virtual tours accessible across different screen sizes and input methods.

Whether you're showcasing residential properties, commercial spaces, or architectural concepts, Aura Plan demonstrates how modern web technologies can deliver engaging and interactive 3D experiences directly within the browser.

---

# ✨ Features

## 🏡 Immersive First-Person Virtual Tours

Experience properties as if you were physically inside them.

Features include:

- First-person navigation
- Realistic camera positioning
- Smooth movement controls
- Interactive room exploration
- Browser-based 3D rendering

---

## 🧱 Interactive 3D Room Builder

Hosts can construct realistic digital twins of physical rooms.

Each room supports:

- Custom width
- Length
- Height
- Viewing height
- Six independent wall textures

---

## 🖼️ Six-Sided Texture Mapping

Every room is built using six individual texture surfaces.

Supported surfaces include:

- Front Wall
- Back Wall
- Left Wall
- Right Wall
- Ceiling
- Floor

Each surface can display a unique uploaded image, creating a realistic panoramic environment.

---

## 🚪 Room-to-Room Hotspot Navigation

Move naturally between connected spaces using interactive hotspots.

Hotspot capabilities include:

- Clickable navigation nodes
- Room transitions
- Hover interactions
- Custom labels
- Spatial positioning

---

## 🧭 Exterior Cube Inspection

Switch from interior exploration to an external architectural view.

Features include:

- Orbit controls
- Full cube rotation
- Interactive inspection
- Complete room visualization

---

## 📱 Cross-Platform Controls

Aura Plan automatically adapts to different input devices.

### Desktop

- Mouse Look
- Pointer Lock
- Keyboard Navigation
- Smooth Camera Controls

### Mobile

- Virtual Joystick
- Touch Camera Rotation
- Responsive Navigation
- Mobile-Optimized Controls

---

## 📐 Realistic Room Dimensions

Each virtual room is generated using real-world measurements.

Configurable properties include:

- Width
- Length
- Height
- Viewing height

This enables accurate spatial representation inside the 3D environment.

---

## 🛡️ Collision Detection

Users remain safely inside the room boundaries during navigation.

The engine includes:

- Boundary constraints
- Camera collision checks
- Position clamping
- Movement validation

This prevents users from walking through walls or leaving the virtual environment.

---

## ☁️ Cloud Image Management

Property imagery is securely uploaded and managed through Cloudinary.

Benefits include:

- Fast image delivery
- Cloud-based storage
- Optimized asset loading
- Reliable media hosting

---

## 👤 Multi-Role Platform

Aura Plan separates property owners from visitors through dedicated account models.

### Hosts

- Create properties
- Manage rooms
- Upload textures
- Configure hotspots
- Publish virtual tours

### Users

- Explore properties
- View virtual tours
- Save favorites
- Browse listings

---

# 🚀 Why Aura Plan?

Aura Plan was built to explore how modern web technologies can recreate real-world spaces inside the browser using interactive 3D graphics.

Rather than displaying static property images, the project focuses on creating immersive digital twins that allow visitors to experience spaces through realistic first-person navigation and interactive room transitions.

Throughout development, the project explored concepts including:

- WebGL rendering
- Three.js
- React Three Fiber
- Interactive 3D navigation
- Collision detection
- Spatial modeling
- Responsive input systems
- Cloud image management
- Prisma ORM
- PostgreSQL database design
- Full-stack application architecture

The result is a browser-based virtual touring platform that combines real-time graphics, scalable backend services, and modern web development practices into a single application.

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| Next.js 16 (App Router) | Full-Stack React Framework |
| React 19 | User Interface |
| TypeScript | Type Safety |
| Tailwind CSS v4 | Styling |
| React Three Fiber | Declarative 3D Rendering |
| Drei | Three.js Helper Components |
| Three.js | WebGL Rendering |
| Lucide React | Icons |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Next.js Server Actions | Backend Logic |
| Prisma ORM | Database Access |
| PostgreSQL | Relational Database |
| JWT | Authentication |

---

## Cloud Services

| Technology | Purpose |
|------------|---------|
| Neon | PostgreSQL Hosting |
| Cloudinary | Image Storage |
| Vercel | Application Hosting |

---

## Development Tools

- Git
- GitHub
- VS Code
- npm

---

# 🏗️ Architecture

Aura Plan follows a modern full-stack architecture where Next.js handles both frontend rendering and backend logic, while Three.js powers the immersive virtual environments.

```text
                     ┌──────────────────────┐
                     │        User          │
                     └──────────┬───────────┘
                                │
                                ▼
                    Next.js 16 Application
                                │
            ┌───────────────────┼───────────────────┐
            ▼                   ▼                   ▼
     React Interface     Server Actions       Authentication
            │                   │                   │
            └──────────────┬────┴───────────────────┘
                           ▼
                     Prisma ORM
                           │
                           ▼
                 PostgreSQL (Neon)
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
  Cloudinary Images   Room Metadata    Hotspot Data
                           │
                           ▼
                 React Three Fiber Scene
                           │
                           ▼
                  Three.js Rendering Engine
                           │
                           ▼
               Interactive Virtual Tour
```

---

## High-Level Application Flow

```text
User
   │
   ▼
Authentication
(Login / Register)
   │
   ▼
Browse Properties
   │
   ▼
Select Property
   │
   ▼
Load Room Data
   │
   ▼
3D Environment
   │
   ├──────────────┐
   ▼              ▼
Interior View   Exterior View
   │              │
   └──────┬───────┘
          ▼
Hotspot Navigation
          │
          ▼
Virtual Property Tour
```

---

## Project Structure

```text
aura-plan/
│
├── prisma/
│   └── schema.prisma
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── host/
│   │   ├── login/
│   │   ├── register/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── 3d/
│   │   ├── host/
│   │   ├── public/
│   │   └── ui/
│   │
│   └── lib/
│
├── package.json
└── tsconfig.json
```

---

# 📸 Screenshots

> **Screenshots will be added soon.**

Recommended screenshots to include:

- 🏠 Landing Page
- 🔐 Login Page
- 📝 Registration Page
- 📊 Host Dashboard
- 🏡 Property Builder
- 📐 Room Configuration
- 🖼️ Texture Upload Interface
- 🎮 First-Person View
- 🧱 Exterior Cube View
- 📍 Hotspot Editor
- 📱 Mobile Virtual Tour

---

## 🎥 Demo GIFs

> **Demo recordings will be added soon.**

Suggested demonstrations:

- Host Registration
- Property Creation
- Room Builder Workflow
- Texture Upload
- First-Person Navigation
- Mobile Joystick Controls
- Room Teleportation
- Exterior Cube Rotation
- Publishing a Property
- Complete Virtual Tour

---

# 🌐 Live Demo

### 🚀 Application

**Aura Plan**

https://aura-plan-tau.vercel.app

---

## ☁️ Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Next.js Server Actions (Vercel) |
| Database | Neon PostgreSQL |
| Image Storage | Cloudinary |
| Authentication | JWT |

---

> **Next:** Installation, environment variables, project setup, 3D rendering workflow, server actions, deployment details, and application lifecycle.


# ⚙️ Installation

Follow the steps below to run **Aura Plan** on your local machine.

## 📋 Prerequisites

Before getting started, make sure the following tools are installed:

- Node.js (v20 or later recommended)
- npm
- PostgreSQL
- Git
- Cloudinary Account

Verify your installation:

```bash
node -v
npm -v
git --version
psql --version
```

---

# 📥 Clone the Repository

```bash
git clone https://github.com/<your-github-username>/aura-plan.git
```

Navigate to the project directory:

```bash
cd aura-plan
```

---

# 📦 Install Dependencies

Install all required packages.

```bash
npm install
```

---

# 🔑 Environment Variables

Aura Plan uses environment variables to securely configure the database, authentication, image storage, and backend services.

Create a `.env` file in the project root.

```text
aura-plan/
│
├── .env
├── prisma/
├── src/
└── package.json
```

Example configuration:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/aura_plan

JWT_SECRET=your_jwt_secret

CLOUDINARY_URL=your_cloudinary_url

BLOB_READ_WRITE_TOKEN=your_blob_token
```

---

## Environment Variable Reference

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL database connection string |
| `JWT_SECRET` | Secret used for JWT authentication |
| `CLOUDINARY_URL` | Cloudinary upload configuration |
| `BLOB_READ_WRITE_TOKEN` | Token used for blob storage integration |

> **Important:** Never commit `.env` files or secret credentials to version control.

---

# 🗄️ Database Setup

Aura Plan uses **Prisma ORM** with **PostgreSQL**.

Generate the Prisma Client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate dev
```

If you need to inspect your database:

```bash
npx prisma studio
```

---

# ▶️ Running the Development Server

Start the application:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

Open your browser and visit:

```text
http://localhost:3000
```

---

# 📂 Project Structure

Aura Plan follows the modern **Next.js App Router** architecture, separating routing, reusable components, database models, and 3D rendering logic.

```text
aura-plan/
│
├── prisma/
│   └── schema.prisma
│
├── public/
│
├── src/
│
│   ├── app/
│   │
│   ├── host/
│   │
│   ├── login/
│   │
│   ├── register/
│   │
│   ├── layout.tsx
│   │
│   └── page.tsx
│
│   ├── components/
│   │
│   ├── 3d/
│   │
│   ├── host/
│   │
│   ├── public/
│   │
│   └── ui/
│
│   └── lib/
│
├── package.json
└── tsconfig.json
```

---

# 🚀 Application Workflow

The following diagram illustrates the overall application lifecycle.

```text
Launch Application
        │
        ▼
Authentication
(Login / Register)
        │
        ▼
Browse Properties
        │
        ▼
Open Property
        │
        ▼
Load Room Data
        │
        ▼
Initialize 3D Scene
        │
        ▼
Explore Virtual Tour
```

---

# 🔐 Authentication Flow

Aura Plan uses **JWT Authentication** together with a PostgreSQL-backed user database.

---

## User Registration

1. User creates an account.
2. Credentials are validated.
3. Password is securely stored.
4. User record is created.
5. Registration completes successfully.

---

## User Login

1. User submits credentials.
2. JWT token is generated.
3. Authentication session begins.
4. Protected routes become accessible.

---

## User Roles

### 👤 Visitor

Visitors can:

- Browse published properties
- Explore virtual tours
- Save favorite listings

---

### 🏠 Host

Hosts can:

- Create properties
- Manage rooms
- Upload textures
- Configure hotspots
- Publish virtual tours

---

# 🏡 Property Creation Workflow

Hosts can build complete virtual properties through an interactive workflow.

```text
Create Property
       │
       ▼
Add Property Details
       │
       ▼
Create Rooms
       │
       ▼
Configure Dimensions
       │
       ▼
Upload Room Textures
       │
       ▼
Add Navigation Hotspots
       │
       ▼
Publish Property
```

---

# 🧱 3D Rendering Workflow

Aura Plan renders immersive virtual rooms using **Three.js** and **React Three Fiber**.

```text
Open Property
        │
        ▼
Load Room Metadata
        │
        ▼
Retrieve Texture URLs
        │
        ▼
Load Images
(TextureLoader)
        │
        ▼
Generate Room Geometry
        │
        ▼
Apply Six Textures
        │
        ▼
Render Scene
```

Each room is generated dynamically using:

- Width
- Length
- Height
- Viewing Height
- Six texture images

---

# 🎮 First-Person Navigation

Desktop users experience a game-like navigation system.

```text
Mouse Click
      │
      ▼
Pointer Lock
      │
      ▼
Keyboard Input
(WASD / Arrow Keys)
      │
      ▼
Camera Movement
      │
      ▼
Collision Detection
      │
      ▼
Updated Position
```

---

# 📱 Mobile Navigation

Mobile devices automatically switch to touch-friendly controls.

```text
Touch Input
      │
      ▼
Virtual Joystick
      │
      ▼
Movement Vector
      │
      ▼
Camera Rotation
      │
      ▼
Scene Update
```

This ensures the virtual tour remains accessible across touch-enabled devices.

---

# 📍 Hotspot Navigation Workflow

Rooms are connected using interactive hotspots.

```text
Approach Hotspot
        │
        ▼
Pointer Hover
        │
        ▼
Click Hotspot
        │
        ▼
Target Room Lookup
        │
        ▼
Load New Room
        │
        ▼
Continue Virtual Tour
```

---

# 🧭 Exterior Cube View

Users can switch from immersive navigation to an architectural overview.

The cube viewer allows users to:

- Rotate the room
- Inspect all six surfaces
- Understand room orientation
- Preview uploaded textures

OrbitControls provide smooth camera movement around the room model.

---

# 🛡️ Collision Detection

Aura Plan prevents visitors from moving outside room boundaries.

Every animation frame:

- Camera position is evaluated
- Room dimensions are checked
- Boundary limits are enforced
- Invalid movement is blocked

This creates a more realistic walkthrough experience.

---

# ☁️ Texture Loading Workflow

Room textures are loaded securely before rendering.

```text
Texture URL
      │
      ▼
Validation
      │
      ▼
Cloudinary
      │
      ▼
TextureLoader
      │
      ▼
GPU Texture
      │
      ▼
Room Surface
```

Invalid or unavailable assets automatically fall back to placeholder textures, helping prevent rendering failures.

---

# ⚙️ Server Actions

Aura Plan uses **Next.js Server Actions** to handle backend logic directly within the application.

Server-side responsibilities include:

- User authentication
- Database queries
- Property creation
- Room management
- Hotspot configuration
- Image upload handling
- Data validation

This architecture removes the need for a separate Express backend while keeping server logic secure and centralized.

---

# 🔄 Data Flow

```text
React Components
        │
        ▼
Server Actions
        │
        ▼
Prisma ORM
        │
        ▼
PostgreSQL (Neon)
        │
        ▼
Cloudinary
        │
        ▼
Updated Response
        │
        ▼
React State
        │
        ▼
Three.js Scene Update
```

---

# ☁️ Deployment

Aura Plan is deployed using a modern cloud-native architecture.

## Frontend

**Platform**

- Vercel

**Live URL**

```text
https://aura-plan-tau.vercel.app
```

---

## Backend

Backend functionality is implemented using:

- Next.js Server Actions
- Next.js App Router
- Vercel Serverless Functions

No separate backend server is required.

---

## Database

**Development**

- Local PostgreSQL

**Production**

- Neon PostgreSQL

---

## Additional Services

| Service | Purpose |
|---------|----------|
| Cloudinary | Texture & image storage |
| Vercel | Frontend & server actions |
| Prisma ORM | Database access |

---

# 🌍 Production Architecture

```text
                    Users
                      │
                      ▼
             Vercel Deployment
                      │
        ┌─────────────┼─────────────┐
        ▼                           ▼
 Next.js Frontend          Server Actions
        │                           │
        └─────────────┬─────────────┘
                      ▼
                 Prisma ORM
                      │
                      ▼
            PostgreSQL (Neon)
                      │
                      ▼
                 Cloudinary
                      │
                      ▼
          React Three Fiber Scene
                      │
                      ▼
           Interactive Virtual Tour
```

---

# 🔒 Security Highlights

Several architectural decisions improve the security and stability of the platform.

- JWT-secured authentication
- Protected host management routes
- Prisma ORM for safe database operations
- Environment variable isolation
- Cloudinary-secured image uploads
- Server-side rendering of protected operations
- Texture validation before rendering
- Automatic fallback textures for invalid assets
- Collision detection to maintain scene integrity

---

# 🌐 Browser Compatibility

Aura Plan supports all major modern browsers.

- ✅ Google Chrome
- ✅ Microsoft Edge
- ✅ Mozilla Firefox
- ✅ Brave
- ✅ Opera
- ✅ Safari

---

# 📱 Responsive Design

Aura Plan adapts to a wide variety of devices.

Supported platforms include:

- Desktop
- Laptop
- Tablet
- Mobile

The application automatically switches between desktop controls and touch-friendly navigation to deliver a consistent virtual touring experience.

---

> **Next:** UI highlights, 3D engine architecture, virtual tour workflow, technical implementation, roadmap, contributing, license, acknowledgements, and project footer.



# 🎨 User Interface Highlights

Aura Plan is designed to provide an immersive, intuitive, and responsive experience that bridges traditional real estate listings with interactive 3D visualization. Every interface is built to keep users focused on exploring properties while giving hosts powerful tools to create virtual experiences.

---

## 🌿 Modern Design Language

Aura Plan adopts a clean and contemporary interface built with usability in mind.

Highlights include:

- ✨ Minimal and distraction-free layouts
- 🎨 Consistent design system
- 🪟 Modern card-based interface
- 📱 Fully responsive layouts
- 🌙 Elegant typography and spacing
- ⚡ Fast page transitions

---

## 🏡 Property Explorer

Visitors can browse available properties through a clean listing interface designed for quick discovery.

Features include:

- Property cards
- Cover images
- Property descriptions
- Location information
- Interactive navigation
- Responsive layouts

---

## 🏠 Host Dashboard

Hosts have access to a dedicated management dashboard where they can build complete virtual experiences.

Dashboard capabilities include:

- Create properties
- Manage listings
- Configure rooms
- Upload room textures
- Edit room dimensions
- Publish virtual tours
- Manage hotspots

---

## 📐 Room Builder Experience

The room builder transforms physical room measurements into interactive 3D environments.

Hosts can configure:

- Width
- Length
- Height
- Camera viewing height
- Wall textures
- Floor textures
- Ceiling textures

The workflow is designed to be simple while still allowing detailed customization.

---

## 🎮 First-Person Experience

Aura Plan provides an immersive navigation experience inspired by modern 3D games.

Desktop users benefit from:

- Pointer Lock Controls
- Mouse Look
- WASD Navigation
- Smooth camera movement
- Natural exploration

This creates a realistic feeling of walking inside the property.

---

## 📱 Mobile Experience

The platform automatically adapts to mobile devices.

Mobile optimizations include:

- Virtual joystick
- Touch camera rotation
- Responsive controls
- Optimized layouts
- Touch-friendly interactions

This ensures the virtual tour remains accessible without requiring external controllers.

---

## 📍 Interactive Hotspots

Rooms are connected using intuitive navigation hotspots.

Users can:

- Walk toward hotspots
- Hover over labels
- Click navigation points
- Instantly move between rooms

This creates a seamless room-to-room exploration experience.

---

## 🧱 Exterior Property View

Aura Plan also offers an exterior cube visualization mode.

Users can:

- Rotate rooms
- Inspect textures
- Understand room orientation
- Preview room layouts

This provides additional spatial awareness beyond the first-person view.

---

# 🎮 3D Engine Architecture

Aura Plan combines several modern technologies to create browser-based immersive environments.

```text
                 User Interaction
                         │
                         ▼
                 React Components
                         │
                         ▼
              React Three Fiber
                         │
                         ▼
                   Three.js Core
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   Camera System    Texture Loader    Lighting
        │                │                │
        └────────────────┼────────────────┘
                         ▼
                  WebGL Rendering
                         │
                         ▼
                 Interactive Scene
```

---

## 🧠 Rendering Pipeline

Every virtual room follows a structured rendering workflow.

```text
Room Metadata
       │
       ▼
Load Dimensions
       │
       ▼
Load Surface Images
       │
       ▼
Generate Geometry
       │
       ▼
Apply Materials
       │
       ▼
Initialize Camera
       │
       ▼
Enable Controls
       │
       ▼
Render Scene
```

---

## 🖼️ Texture Mapping

Each room consists of six independently textured surfaces.

```text
Front Wall
Back Wall
Left Wall
Right Wall
Ceiling
Floor
        │
        ▼
Texture Loader
        │
        ▼
Three.js Materials
        │
        ▼
Room Mesh
```

This allows every room to accurately represent its real-world appearance.

---

## 📍 Hotspot System

Hotspots provide seamless navigation between rooms.

```text
Current Room
      │
      ▼
Hotspot Click
      │
      ▼
Target Room Lookup
      │
      ▼
Load New Room
      │
      ▼
Camera Reset
      │
      ▼
Continue Tour
```

---

## 🚶 Collision Detection

Aura Plan continuously validates user movement.

```text
Movement Input
       │
       ▼
Camera Position
       │
       ▼
Boundary Check
       │
       ▼
Allowed?
   │          │
 Yes         No
   │          │
   ▼          ▼
Move     Clamp Position
```

This prevents users from leaving the virtual environment while maintaining smooth navigation.

---

## 📱 Adaptive Input System

Aura Plan dynamically switches controls based on the detected device.

```text
Application Start
        │
        ▼
Device Detection
        │
   ┌────┴────┐
   ▼         ▼
Desktop    Mobile
   │         │
Pointer   Virtual
 Lock    Joystick
```

The interface automatically adapts without requiring manual configuration.

---

# 🏡 Virtual Tour Workflow

The complete virtual tour lifecycle can be summarized as follows.

```text
User Opens Property
          │
          ▼
Retrieve Property
          │
          ▼
Load Room
          │
          ▼
Load Textures
          │
          ▼
Initialize Scene
          │
          ▼
Explore Room
          │
          ▼
Interact with Hotspots
          │
          ▼
Load Connected Room
          │
          ▼
Continue Tour
```

---

# ⚙️ Technical Implementation

Aura Plan combines modern frontend rendering with scalable backend services.

### Frontend

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- React Three Fiber
- Drei
- Three.js
- Responsive UI

---

### Backend

- Next.js Server Actions
- JWT Authentication
- Prisma ORM
- Secure database operations
- Cloudinary integration

---

### Database

- PostgreSQL
- Prisma relational models
- Cascade relationships
- Optimized queries
- Structured room data

---

### 3D Technologies

- Three.js
- React Three Fiber
- OrbitControls
- PointerLockControls
- TextureLoader
- WebGL
- Perspective Camera
- Collision detection

---

### Cloud Infrastructure

- Vercel
- Neon PostgreSQL
- Cloudinary

---

# 📚 Learning Outcomes

Aura Plan was developed to explore the intersection of modern web development and interactive 3D graphics.

Throughout the project, key concepts explored include:

- Browser-based 3D rendering
- WebGL fundamentals
- React Three Fiber
- Three.js scene management
- Interactive virtual environments
- Camera systems
- Collision detection
- Spatial navigation
- Next.js App Router
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Cloud image management
- Responsive interaction design

The project demonstrates how modern JavaScript technologies can be combined to build immersive digital experiences entirely within the browser.

---

# 🚀 Future Improvements

Aura Plan provides a strong foundation for browser-based virtual property visualization, with several enhancements planned for future releases.

## Planned Features

- Multi-floor properties
- Floor plan visualization
- Interactive minimap
- AI-generated room descriptions
- Voice-guided tours
- VR headset support
- AR property previews
- Real-time collaborative tours
- Live host walkthrough sessions
- Furniture placement tools
- Measurement tools
- Search & filtering
- Property analytics dashboard
- Saved virtual tours
- Favorites synchronization
- Image optimization pipeline
- Offline asset caching
- Docker deployment
- CI/CD automation
- Multi-language support

---

# 🤝 Contributing

Contributions, ideas, and feedback are always welcome.

If you'd like to contribute:

---

## 1️⃣ Fork the Repository

Create your own copy of the repository.

---

## 2️⃣ Clone Your Fork

```bash
git clone https://github.com/your-username/aura-plan.git
```

---

## 3️⃣ Create a Feature Branch

```bash
git checkout -b feature/amazing-feature
```

---

## 4️⃣ Make Your Changes

Implement your feature or improvement.

---

## 5️⃣ Commit Your Changes

```bash
git commit -m "Add amazing feature"
```

---

## 6️⃣ Push Your Branch

```bash
git push origin feature/amazing-feature
```

---

## 7️⃣ Open a Pull Request

Submit a Pull Request describing your improvements.

---

# 🐛 Found a Bug?

Bug reports and feature suggestions are greatly appreciated.

Helpful reports include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser information
- Device information
- Screenshots or recordings

---

# ⭐ Support the Project

If you found Aura Plan interesting or useful, consider giving the repository a ⭐ on GitHub.

Your support helps the project reach more developers and encourages future improvements.

---

# 📄 License

This project is released under the **MIT License**.

You are free to:

- Use
- Modify
- Learn from
- Share
- Build upon

while preserving the original license.

> **Note:** If your repository does not yet include a `LICENSE` file, GitHub allows you to add the MIT License directly from the repository settings.

---

# 🙏 Acknowledgements

A huge thank you to the open-source community and the technologies that made Aura Plan possible.

Special thanks to:

- Next.js
- React
- TypeScript
- Three.js
- React Three Fiber
- Drei
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Neon
- Cloudinary
- Vercel
- Lucide React
- Git
- GitHub

These technologies provided the foundation for building a modern, immersive virtual property platform.

---

# 📌 Project Status

> **Current Status:** Active

Aura Plan is fully functional, deployed, and continuously evolving.

This project was created to explore how modern web technologies can deliver immersive 3D experiences through browser-based virtual environments. It combines interactive graphics, scalable backend architecture, and responsive design into a practical real-world application.

As I continue learning, I plan to expand Aura Plan with richer visualization features, enhanced collaboration tools, and more advanced spatial interactions.

---

# 💡 Final Thoughts

Building Aura Plan has been an exciting opportunity to explore the intersection of full-stack web development and real-time 3D graphics.

From designing immersive virtual walkthroughs with Three.js and React Three Fiber to implementing secure authentication, relational data modeling, and cloud-based asset management, every stage of development deepened my understanding of interactive web applications.

Aura Plan reflects my passion for creating engaging user experiences and experimenting with emerging technologies that push the boundaries of what can be achieved in the browser.

---

<div align="center">

# 🏡 Explore Spaces. Virtually.

Thank you for exploring **Aura Plan**.

If you enjoyed this project, consider giving the repository a ⭐ to support its continued development.

**Happy Coding & Happy Exploring! 🚀**

</div>


