# 🌍 AI Trip Planner

<div align="center">

![AI Trip Planner](https://img.shields.io/badge/AI-Trip%20Planner-orange?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)
![TypeScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)

**An intelligent travel planning application powered by Google Gemini AI that creates personalized trip itineraries, hotel recommendations, and booking price comparisons.**

[![GitHub stars](https://img.shields.io/github/stars/pramodh7860/ai-trip-planner?style=social)](https://github.com/pramodh7860/ai-trip-planner)
[![GitHub forks](https://img.shields.io/github/forks/pramodh7860/ai-trip-planner?style=social)](https://github.com/pramodh7860/ai-trip-planner)

[Features](#-features) • [Installation](#-installation) • [Configuration](#-configuration) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

[Live Demo](#) • [Documentation](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📸 Screenshots

> _Screenshots coming soon!_

---

## ✨ Features

### 🤖 AI-Powered Trip Planning
- **Intelligent Itinerary Generation**: Create detailed day-by-day trip plans using Google Gemini AI
- **Smart Hotel Recommendations**: Get personalized hotel suggestions based on your preferences, budget, and travel style
- **Dynamic Place Suggestions**: Discover the best places to visit with detailed information, ratings, and optimal visit times
- **Flexible Data Structures**: Handles multiple AI response formats automatically for maximum compatibility

### 💰 Booking Price Comparison
- **Multi-Platform Comparison**: Compare prices across 6+ booking platforms:
  - Booking.com
  - Expedia
  - Agoda
  - Hotels.com
  - Airbnb
  - TripAdvisor
- **Best Price Highlighting**: Instantly see which platform offers the best deal
- **Savings Calculator**: View discounts and savings for each booking platform
- **Feature Comparison**: Compare cancellation policies, breakfast inclusion, and other amenities
- **Real-time Price Updates**: Get the latest prices and availability

### 🗺️ Destinations Explorer
- **Curated Destination List**: Browse handpicked destinations with detailed information
- **Advanced Filtering**: Filter by:
  - Price range (Cheap, Moderate, Luxury)
  - Comfort level
  - Type (Beach, Mountain, City, Historical, etc.)
  - Season (All, Summer, Winter, Spring, Fall)
  - Duration (Weekend, Week, Extended)
  - Travel style (Solo, Couple, Family, Friends)
- **Quick Trip Creation**: Start planning directly from destination cards with pre-filled information
- **Destination Details**: View ratings, best time to visit, average prices, and key features

### 👤 User Management
- **Google OAuth Authentication**: Secure, one-click login with Google account
- **Account Settings**: 
  - Manage your profile information
  - Update personal details
  - Change profile picture
  - Live preview of changes
- **Trip History**: View and manage all your saved trips in one place
- **User Profile**: Personalized experience with profile picture display

### 🎨 Modern UI/UX
- **Responsive Design**: Beautiful, mobile-first interface that works seamlessly on all devices
- **Smooth Animations**: Engaging transitions and hover effects throughout
- **Dark Mode Ready**: CSS variables prepared for dark mode implementation
- **Toast Notifications**: User-friendly feedback for all actions
- **Loading States**: Elegant loading indicators during API calls
- **Error Handling**: Clear error messages with actionable solutions
- **Accessibility**: Built with Radix UI for WCAG compliance

### 🔧 Developer Experience
- **Clean Codebase**: Well-organized, maintainable code structure
- **Type Safety**: JSDoc comments and prop validation
- **Error Boundaries**: Graceful error handling
- **Performance Optimized**: Code splitting and lazy loading
- **SEO Friendly**: Meta tags and semantic HTML

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9+) or **yarn** (v1.22+) package manager
- **Git** - [Download](https://git-scm.com/)

### Required Accounts

- **Google Cloud Account** (for Gemini API) - [Sign up](https://cloud.google.com/)
- **Supabase Account** (for database) - [Sign up](https://supabase.com/)
- **Google OAuth Credentials** (for authentication) - [Get credentials](https://console.cloud.google.com/)
- **Geoapify Account** (optional, for place autocomplete) - [Sign up](https://www.geoapify.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone (my repo link.git)
   cd ai-trip-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Google Gemini AI
   VITE_GEMINI_API_KEY=your_gemini_api_key_here

   # Supabase Database
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Google OAuth
   VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id

   # Geoapify (Optional - for place autocomplete)
   VITE_GEOAPIFY_API_KEY=your_geoapify_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## ⚙️ Configuration

### Google Gemini API Setup

1. **Create API Key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Click "Create API Key"
   - Copy your API key

2. **Enable API**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to "APIs & Services" > "Library"
   - Search for "Generative Language API"
   - Click "Enable"

3. **Enable Billing** (Required)
   - Even for free tier, billing must be enabled
   - Go to "Billing" in Google Cloud Console
   - Link a billing account (free tier available)

4. **Add to .env**
   ```env
   VITE_GEMINI_API_KEY=AIzaSy...
   ```

### Supabase Database Setup

1. **Create Project**
   - Go to [Supabase](https://supabase.com)
   - Click "New Project"
   - Fill in project details
   - Wait for project to be ready

2. **Create Table**
   - Go to "SQL Editor" in Supabase dashboard
   - Run the following SQL:
   ```sql
   CREATE TABLE public.cities (
     id TEXT NOT NULL PRIMARY KEY,
     userselection JSONB NOT NULL,
     tripdata JSONB NOT NULL,
     "userEmail" TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
     updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
   );

   CREATE INDEX idx_cities_user_email ON public.cities USING btree ("userEmail");
   CREATE INDEX idx_cities_created_at ON public.cities USING btree (created_at DESC);
   ```

3. **Get Credentials**
   - Go to "Settings" > "API"
   - Copy "Project URL" and "anon public" key

4. **Add to .env**
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...
   ```

### Google OAuth Setup

1. **Create OAuth Credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"

2. **Configure Redirect URIs**
   - Add authorized redirect URIs:
     - `http://localhost:5173/create-trip` (development)
     - `https://yourdomain.com/create-trip` (production)

3. **Copy Client ID**
   - Copy the "Client ID" (not the secret)

4. **Add to .env**
   ```env
   VITE_GOOGLE_AUTH_CLIENT_ID=xxxxx.apps.googleusercontent.com
   ```

### Geoapify API Setup (Optional)

1. **Sign Up**
   - Go to [Geoapify](https://www.geoapify.com)
   - Create a free account

2. **Get API Key**
   - Go to "API Keys" in dashboard
   - Copy your API key

3. **Add to .env**
   ```env
   VITE_GEOAPIFY_API_KEY=your_api_key_here
   ```

---

## 📖 Usage

### Creating a Trip

1. **Sign up or log in**
   - Click "Sign In" or "Get Started"
   - Authenticate with your Google account

2. **Navigate to Create Trip**
   - Click "Create Trip" from the homepage or navigation menu

3. **Fill in Trip Details**
   - **Destination**: Enter your destination (autocomplete available)
   - **Days**: Select number of days (1-30)
   - **Travelers**: Choose travel style (Just Me, Couple, Family, Friends)
   - **Budget**: Select budget range (Cheap, Moderate, Expensive)
   - **Dates**: Select check-in and check-out dates (optional)

4. **Generate Trip Plan**
   - Click "Generate Trip Plan"
   - Wait for AI to create your personalized itinerary
   - Review the generated plan

5. **Save Your Trip**
   - Trip is automatically saved to your account
   - Access it anytime from "My Trips"

### Viewing Your Trips

1. **Access My Trips**
   - Click "My Trips" from the navigation menu
   - Or click your profile picture > "My Trips"

2. **Browse Trips**
   - View all your saved trips in a grid layout
   - See trip destination, duration, and creation date

3. **View Trip Details**
   - Click on any trip card
   - View detailed itinerary, hotel recommendations, and places to visit

### Comparing Booking Prices

1. **Open Trip with Hotels**
   - Navigate to any trip that has hotel recommendations

2. **Compare Prices**
   - Click "Compare Booking Prices" on any hotel card
   - View prices from multiple platforms side-by-side
   - See savings, discounts, and features

3. **Book Your Stay**
   - Click "Book" on your preferred platform
   - You'll be redirected to the booking site

### Exploring Destinations

1. **Navigate to Destinations**
   - Click "Destinations" from the navigation menu
   - Or click "Explore Destinations" on the homepage

2. **Filter Destinations**
   - Use filters to find destinations matching your preferences:
     - Price range
     - Comfort level
     - Type (Beach, Mountain, City, etc.)
     - Season
     - Duration
     - Travel style

3. **Start Planning**
   - Click on any destination card
   - Destination is pre-filled in the trip creation form
   - Complete the form and generate your trip

### Managing Account

1. **Access Account Settings**
   - Click your profile picture in the header
   - Select "Account Settings"

2. **Update Profile**
   - Change your name
   - Update email
   - Change profile picture URL
   - See live preview of changes

3. **Save Changes**
   - Click "Save Changes"
   - Changes are saved immediately

---

## 🏗️ Project Structure

```
ai-trip-planner/
├── public/
│   └── vite.svg              # Favicon
├── src/
│   ├── account/              # Account settings page
│   │   └── index.jsx
│   ├── auth/                 # Authentication pages
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── components/
│   │   ├── BookingComparison.jsx  # Price comparison component
│   │   ├── Layout.jsx         # Main layout wrapper
│   │   ├── custom/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Hero.jsx
│   │   └── ui/               # Reusable UI components (shadcn/ui)
│   │       ├── button.jsx
│   │       ├── dialog.jsx
│   │       ├── input.jsx
│   │       ├── popover.jsx
│   │       ├── toast.jsx
│   │       └── toaster.jsx
│   ├── constant/
│   │   └── option.jsx        # Form options and AI prompt
│   ├── create-trip/          # Trip creation page
│   │   └── index.jsx
│   ├── destinations/         # Destinations explorer
│   │   └── index.jsx
│   ├── hooks/
│   │   └── use-toast.js     # Toast notification hook
│   ├── lib/
│   │   └── utils.js          # Utility functions
│   ├── my-trip/             # User trips page
│   │   ├── componets/
│   │   │   └── Usertripcard.jsx
│   │   └── index.jsx
│   ├── service/             # API services
│   │   ├── AImodal.jsx      # Gemini AI integration
│   │   ├── database.js      # Supabase database functions
│   │   ├── Globalapi.jsx    # Global API utilities
│   │   └── supabaseconfig.jsx  # Supabase client config
│   ├── View-trip/           # Trip detail view
│   │   ├── [trip-id]/
│   │   │   └── index.jsx
│   │   └── components/
│   │       ├── Hotels.jsx
│   │       ├── Iformation.jsx
│   │       └── PlacetoVists.jsx
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global styles and CSS variables
│   ├── index.css            # Tailwind CSS imports
│   └── main.jsx             # Application entry point
├── .env                     # Environment variables (create this)
├── .gitignore
├── components.json          # shadcn/ui configuration
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package.json
├── postcss.config.js
├── README.md                # This file
├── tailwind.config.js
└── vite.config.js
```

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3** - Modern UI library with hooks
- **Vite 5.4** - Lightning-fast build tool and dev server
- **React Router 6.28** - Client-side routing with future flags

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **CSS Variables** - For theming and customization
- **Tailwind Animate** - Animation utilities

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **shadcn/ui** - Re-usable component patterns

### Backend & APIs
- **Supabase** - PostgreSQL database and backend
- **Google Gemini AI** - AI-powered trip planning (gemini-1.5-flash, gemini-pro)
- **Google OAuth 2.0** - User authentication
- **Geoapify** - Place autocomplete and geocoding
- **Pexels API** - Dynamic image fetching

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🔌 API Integrations

### Google Gemini AI
- **Purpose**: Generate personalized trip itineraries and recommendations
- **Models Used**: `gemini-1.5-flash`, `gemini-pro`, `gemini-2.5-flash`
- **Features**: 
  - Dynamic model selection
  - Fallback mechanisms
  - JSON response parsing
- **Rate Limits**: Based on your Google Cloud quota

### Supabase
- **Purpose**: Store user trips and trip data
- **Database**: PostgreSQL
- **Features**: 
  - Real-time subscriptions
  - Row-level security
  - JSONB for flexible data storage
- **Tables**: `cities` (stores trip data)

### Google OAuth
- **Purpose**: User authentication
- **Flow**: Authorization code flow
- **Scopes**: Email, profile
- **Security**: Secure token handling

### Geoapify
- **Purpose**: Place autocomplete and location search
- **Features**: 
  - Address autocomplete
  - Geocoding
  - Place suggestions

### Pexels API
- **Purpose**: Fetch destination and hotel images
- **Usage**: Dynamic image loading for better UX
- **Fallback**: Default images if API fails

---

## 🎯 Available Scripts

```bash
# Start development server
npm run dev
# Server runs on http://localhost:5173

# Build for production
npm run build
# Outputs to /dist directory

# Preview production build locally
npm run preview
# Test production build before deploying

# Run ESLint
npm run lint
# Check code quality and style
```

---

## 🌐 Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Homepage with hero section | ❌ No |
| `/create-trip` | Create a new trip plan | ✅ Yes |
| `/my-trip` | View all saved trips | ✅ Yes |
| `/view-trip/:tripId` | View detailed trip information | ❌ No |
| `/destinations` | Browse and filter destinations | ❌ No |
| `/account` | Account settings and profile | ✅ Yes |
| `/auth/login` | Login page | ❌ No |
| `/auth/signup` | Signup page | ❌ No |

---

## 🔒 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_GEMINI_API_KEY` | Google Gemini AI API key | ✅ Yes | `AIzaSy...` |
| `VITE_SUPABASE_URL` | Supabase project URL | ✅ Yes | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ Yes | `eyJhbGc...` |
| `VITE_GOOGLE_AUTH_CLIENT_ID` | Google OAuth Client ID | ✅ Yes | `xxxxx.apps.googleusercontent.com` |
| `VITE_GEOAPIFY_API_KEY` | Geoapify API key | ⚠️ Optional | `your_api_key` |

---

## 🐛 Troubleshooting

### API Key Issues

**Problem**: "Model not found" or "API key invalid"

**Solutions**:
- Verify API key is correct in `.env` file
- Restart dev server after changing `.env` variables
- Check API key restrictions in Google Cloud Console
- Ensure Generative Language API is enabled
- Verify billing is enabled (required even for free tier)

### Database Errors

**Problem**: "Failed to fetch" or "ERR_NAME_NOT_RESOLVED"

**Solutions**:
- Verify Supabase table schema matches expected structure
- Check that `userEmail` column exists (case-sensitive)
- Ensure Supabase project is active (not paused)
- Verify `VITE_SUPABASE_URL` is correct format: `https://xxxxx.supabase.co`
- Check internet connection

### OAuth Redirect Errors

**Problem**: "redirect_uri_mismatch" error

**Solutions**:
- Verify redirect URI matches exactly in Google Cloud Console
- Check that redirect URI includes correct port (5173 for dev)
- Ensure redirect URI is: `http://localhost:5173/create-trip`
- Add both `http://localhost:5173/create-trip` and production URL

### Build Errors

**Problem**: Build fails or dependencies error

**Solutions**:
- Clear `node_modules` and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Check Node.js version compatibility (v18+)
- Verify all dependencies are installed
- Clear Vite cache: `rm -rf node_modules/.vite`

### Hotels/Itinerary Not Showing

**Problem**: "No hotel recommendations" or "No itinerary available"

**Solutions**:
- Check browser console for data structure logs
- Verify AI response includes hotels/itinerary
- Check that data structure matches expected format
- Try regenerating the trip plan

---

## 🤝 Contributing

Contributions are welcome and greatly appreciated! Here's how you can help:

### Ways to Contribute

- 🐛 **Report Bugs**: Open an issue with detailed bug report
- 💡 **Suggest Features**: Share your ideas for improvements
- 📝 **Improve Documentation**: Help make the docs better
- 🔧 **Submit Pull Requests**: Fix bugs or add features
- ⭐ **Star the Repo**: Show your support

### Contribution Process

1. **Fork the repository**
   ```bash
   git clone https://github.com/pramodh7860/ai-trip-planner.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where needed
   - Test your changes

4. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Add screenshots if UI changes

### Code Style

- Use ESLint configuration provided
- Follow React best practices
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep components small and focused

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Special thanks to:

- [Google Gemini AI](https://ai.google.dev/) - For powerful AI capabilities
- [Supabase](https://supabase.com/) - For excellent backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) - For beautiful styling utilities
- [Radix UI](https://www.radix-ui.com/) - For accessible component primitives
- [Lucide](https://lucide.dev/) - For beautiful icons
- [Vite](https://vitejs.dev/) - For lightning-fast development experience
- [React Router](https://reactrouter.com/) - For seamless routing

---

## 📧 Support & Contact

- **GitHub Issues**: [Report a bug](https://github.com/pramodh7860/ai-trip-planner/issues)
- **GitHub Discussions**: [Ask questions](https://github.com/pramodh7860/ai-trip-planner/discussions)
- **Email**: pramodhkumar782006@gmail.com

---

## 🗺️ Roadmap

- [ ] Dark mode implementation
- [ ] Trip sharing via link
- [ ] Export trip as PDF
- [ ] Travel checklist/packing list
- [ ] Weather integration
- [ ] Currency converter
- [ ] Budget tracker
- [ ] Photo gallery for trips
- [ ] Reviews and ratings
- [ ] Mobile app (React Native)

---

<div align="center">

**Made with ❤️ using React and AI**

⭐ **Star this repo if you find it helpful!**

[⬆ Back to Top](#-ai-trip-planner)

</div>
