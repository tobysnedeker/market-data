**Deployment Instructions:**
---

After cloning the repo locally, there is an included Powershell script that should build and run the frontend and backend locally. Open a Powershell terminal in the root directory of the project and run:
```
./start-dev.ps1
```

You can now navigate to http://localhost/ to use the app. Simply enter the symbol of the company you'd like to view data for.

---
If there is trouble running the Powershell script or you can't run it on your machine, follow these alternative instructions:
- Open a new terminal in the /api folder
- run:
```
npm install
node server.js
```
- Open a second terminal in the /app folder
- run:
```
npm install
npm run dev
```
- The frontend and backend services should now be running. Open any browser and navigate to http://localhost/ to see the app.