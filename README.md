```markdown
# DeadZone-App

🚀 **DeadZone-App** is the official launcher for **Revive: The Last Stand Dead Zone**, featuring integrated Flash Player and Discord Rich Presence support.

---

## 📦 Requirements

- [Node.js](https://nodejs.org/) (recommended: v16 or v18)
- [Git](https://git-scm.com/)
- [Python 2.x or 3.x](https://www.python.org/) (required for native module builds)
- Windows, Linux, or macOS

---

## 🔧 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/SulivanM/DeadZone-App.git
cd DeadZone-App
```

2. **Install dependencies:**

```bash
npm install
```

---

## ▶️ Run the App (Development Mode)

To start the launcher in development mode:

```bash
npm start
```

---

## 🛠️ Build an Executable (`.exe` for Windows)

1. **Build for all platforms (Windows 64-bit & 32-bit):**

```bash
npm run build
```

2. **Build only for Windows 32-bit:**

```bash
npm run buildx32
```

> The output will be located in the `build/` folder. Launch `Dead Zone Revive.exe` to start the game.

---

## 📁 Project Structure

```
DeadZone-App/
├── flashver/                 # Contains Flash plugin files (DLL/SO/plugin)
├── resources/logo.png        # App icon
├── main.js                   # Electron main process
├── package.json              # Project configuration
└── ...
```

---

## 💡 Features

- ✅ Bundled PPAPI Flash Player
- ✅ Connects locally to `http://127.0.0.1:8000`
- ✅ Discord Rich Presence support
- ✅ Auto-maximized, frameless browser window
- ✅ In-app menu: Reload Game and Fullscreen toggle

---

## ☕ Support

If you like the project and want to support development:

👉 [Buy Me a Coffee](https://buymeacoffee.com/sulivanm)

---

## 🔗 Useful Links

- 🎮 Play: [https://deadzonegame.net/](https://deadzonegame.net/)
- 🧠 GitHub: [https://github.com/SulivanM/DeadZone-App](https://github.com/SulivanM/DeadZone-App)

---

## 📜 License

This project is open for personal and non-commercial use only.
```