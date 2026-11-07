# Student Attendance and Academic Performance Management System

## Stack
HTML, CSS, JavaScript, Node.js, Express, JSON file storage, Git/GitHub, Jenkins, Docker and Selenium WebDriver.

## Run in VS Code (Windows PowerShell)
Open this folder in VS Code, then Terminal > New Terminal:
```powershell
npm install
npm start
```
Open http://localhost:3000.

## Tests
Start the app using `npm start` in terminal 1. In terminal 2:
```powershell
npm test
npm run test:e2e
```
Google Chrome must be installed for Selenium. Selenium Manager attempts to resolve the matching browser driver.

## Docker
```powershell
docker build -t student-academic-app:latest .
docker run --name student-academic-app -d -p 3000:3000 student-academic-app:latest
```
Open http://localhost:3000. Stop/remove:
```powershell
docker stop student-academic-app
docker rm student-academic-app
```

## GitHub
Create an empty repository in your own GitHub account, then run:
```powershell
git init
git add .
git commit -m "Initial project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```
Replace the URL with your actual repository URL.

## Jenkins
Create a Pipeline job in Jenkins. Select Pipeline script from SCM > Git, enter your repository URL, branch `*/main`, script path `Jenkinsfile`, save, then Build Now. Review the build's Console Output. The pipeline checks out code, validates Node/npm/Docker, installs dependencies, runs unit tests and builds a Docker image.

If Jenkins runs as a Windows service, its service account must be able to access Node.js, Git and Docker. Configure the service PATH and Docker permissions as needed. The Jenkinsfile has a Windows PATH example; adjust it to your installation.

## Demo workflow
1. Run locally and demonstrate each module.
2. Run `npm test`.
3. Run Selenium with `npm run test:e2e` while the app is running.
4. Push the source to GitHub.
5. Configure Jenkins from that repository and run the pipeline.
6. Build and run the Docker image.
7. Capture your own screenshots of actual successful outputs.

## Important
Educational lab starter only. Demo credentials are not production security. JSON storage is intended for a small local demonstration, not concurrent production use. Selenium results must only be reported as passed after you run them successfully. Kubernetes is not included because it is not in the listed lecturer requirements.

## Modules
- Faculty login
- Student registration
- Mark/update daily attendance
- Calculate attendance percentage
- Enter two internal marks per subject and calculate average
- Generate student performance report

## Demo credentials
faculty / faculty123 (demo only)
