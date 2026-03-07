# Infinity Infrastructure - Website Project

## Project Structure

```
Infinity/
├── old/                          # Main website files
│   ├── index.html               # Home page
│   ├── portfolio.html           # Portfolio page
│   ├── style.css               # Main stylesheet
│   ├── modern-style.css        # Modern design styles
│   ├── responsive.css          # Responsive design
│   ├── mobile-menu.js          # Mobile menu functionality
│   └── modern-enhancements.css # Enhancement styles
│
├── static/                      # Static assets
│   ├── images/                 # Image files
│   ├── javascript/
│   │   ├── script.js           # Main form & contact logic
│   │   ├── lucide-init.js      # Lucide icon initialization
│   │   ├── gallery.js          # Gallery modal functionality
│   │   └── nav-toggle.js       # Navigation toggle
│   │
│   └── css/                    # CSS files
│
├── Photos/                      # Team and project photos
├── Videos/                      # Project videos
│
├── app.py                       # Flask backend main file
├── config.py                    # Configuration settings
├── db.py                        # Database connection (if needed)
├── requirements.txt             # Python dependencies
├── .env                         # Environment variables
├── venv/                        # Virtual environment
│
└── index.html                   # Root HTML file (if needed)
```

## File Organization

### HTML Files (`old/`)
- **index.html** - Home page with services, about, team sections
- **portfolio.html** - Portfolio/gallery page

### CSS Files (Separate by Concern)
- **style.css** - Main styles and layout
- **modern-style.css** - Modern design patterns
- **responsive.css** - Mobile responsive styles
- **modern-enhancements.css** - Additional enhancements

### JavaScript Files (Organized by Function)
- **script.js** - Contact form validation and submission
- **lucide-init.js** - Icon library initialization
- **gallery.js** - Gallery and modal functionality
- **mobile-menu.js** - Mobile navigation
- **nav-toggle.js** - Navigation toggle functionality

### Backend Files
- **app.py** - Flask application with contact form endpoint
- **config.py** - Configuration (for future use)
- **db.py** - Database setup (for future use)
- **.env** - Environment variables (EMAIL_USER, EMAIL_PASS, OWNER_EMAIL)
- **requirements.txt** - Python dependencies

## Running the Project

### Frontend
1. Open `old/index.html` in a browser
2. Static files are served from the `static/` folder

### Backend
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Create `.env` file with:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   OWNER_EMAIL=owner-email@example.com
   ```

3. Run Flask server:
   ```bash
   python app.py
   ```

Server runs on `http://localhost:5000`

## API Endpoints

### POST /api/contact
Handles contact form submissions
- **Request:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "Your message here"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Thank you for your message!"
  }
  ```

### GET /api/health
Health check endpoint

## Key Features

✅ Centered headings across all pages
✅ Lucide icons for services section
✅ Gallery and video modals
✅ Contact form with email notifications
✅ Rate limiting (5 requests per hour)
✅ Auto-reply to users
✅ Responsive design
✅ Mobile navigation
✅ CORS enabled for cross-origin requests

## Environment Variables

Create a `.env` file in the root directory:

```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
OWNER_EMAIL=owner@infinityinfra.com
```

Note: Use Gmail App Password (not regular password) for EMAIL_PASS

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript
- **Icons:** Lucide Icons
- **Backend:** Python Flask
- **Email:** SMTP (Gmail)
- **Security:** Rate Limiting, CORS
- **Environment:** Python 3.8+

## Notes

- All JavaScript is organized in separate files for maintainability
- CSS is separated by concern (base, modern, responsive)
- Backend handles email notifications with rate limiting
- Gallery modals support both images and videos
- Mobile menu responsive design included
