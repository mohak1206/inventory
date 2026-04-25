# Inventory Project Setup

## ⚠️ Important Note about OneDrive

This project uses modern JavaScript tooling (Vite/React). Running this project from inside a folder synchronized by Microsoft OneDrive, Google Drive, Dropbox, or other cloud sync providers will cause **severe slowdowns** during development.

Sync clients lock files as they are written to `node_modules` or `build` folders, causing install errors and development server performance issues.

### Recommendation

Please move or clone this project to a local, non-synced folder before running it.

**Good Locations:**
- `C:\Projects\Inventory`
- `C:\Dev\Inventory`
- `~/Projects/Inventory`

**Bad Locations:**
- `C:\Users\username\OneDrive\Desktop\Inventory`
- `C:\Users\username\Dropbox\Inventory`

---

## Starting the Application

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# For development (Flask debug server):
set FLASK_ENV=development
python app.py

# For production (Waitress WSGI):
python run.py
```

**Frontend:**
```bash
cd frontend
npm install

# Start development server
npm run start

# Build for production
npm run build
```
