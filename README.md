# Fortuna Developer Guide

Welcome to the Fortuna Secure Cloud-Native Web Application! This guide will explain exactly how to work with this project locally on your machine, what each directory is responsible for, and the specific commands you need to use to run the application.

---

## 📁 Directory Structure Breakdown

The project has been separated into isolated micro-components. Here is where everything lives and what it does:

### `/frontend`
- **What it does**: This holds the entire React.js user interface, built with Vite and Tailwind CSS. It contains all the website pages and the protected Admin Dashboard.
- **Key Files**: 
  - `src/` (All React components and UI code)
  - `vite.config.ts` (Configures Vite and proxies API requests to the backend)
  - `Dockerfile` (Used by Jenkins to securely containerize the React app)

### `/backend`
- **What it does**: This holds the Node.js and Express REST API. It handles all database connections and business logic (fetching orders, creating customers, etc.).
- **Key Files**: 
  - `index.js` (The main Express server and MySQL queries)
  - `Dockerfile` (Used by Jenkins to securely containerize the Node server)

### `/docker`
- **What it does**: This holds the local infrastructure configuration. It is solely used for spinning up a local MySQL database so you can test your backend API on your laptop.
- **Key Files**: 
  - `docker-compose.yml` (Creates a local MySQL container on port 3306)

### `/k8s`
- **What it does**: This folder contains the **Kubernetes Manifests (Infrastructure as Code)**. When you want to deploy the app to AWS, these YAML files tell Kubernetes exactly how many Pods to spin up, what security policies to enforce, and how to route traffic.
- **Key Files**:
  - `*-deployment.yaml` (Defines the application pods)
  - `*-service.yaml` (Defines how pods communicate over the network)
  - `network-policy.yaml` & `rbac.yaml` (Strict security configurations)

### Root Files
- **`package.json`**: This root file exists purely for convenience. It contains helper scripts that allow you to start both the `/frontend` and `/backend` simultaneously with a single command.
- **`Jenkinsfile`**: The Continuous Integration pipeline script. When you push to GitHub, Jenkins reads this file to know how to build, scan, and push the application.
- **`argocd-application.yaml`**: The Continuous Deployment configuration. It connects the Kubernetes cluster to this repository.

---

## 💻 How to Work with the Project Locally

If you want to edit code, view the website locally, or test a new feature, follow this exact workflow:

### Step 1: Start the Local Database
The backend server will crash if it cannot connect to a database. You must always start the local database first.

**Command:**
```bash
docker-compose up -d
```
**Where to run it:** Inside the `/docker` directory.
*(Wait ~5 seconds after running this for MySQL to fully initialize).*

### Step 2: Install Dependencies (First time only)
If you just cloned the repository, or if you added a new package to the frontend or backend, you must install all Node modules.

**Command:**
```bash
npm run install-all
```
**Where to run it:** Inside the main root directory (`ABA_BA/`).
*(This command automatically enters both the `/frontend` and `/backend` folders and runs `npm install` for you).*

### Step 3: Start the Application Servers
You need to run the React UI (Vite) and the API server (Node.js) so they can communicate.

**Command:**
```bash
npm run start-program
```
**Where to run it:** Inside the main root directory (`ABA_BA/`).
*(This script utilizes `concurrently` to boot both servers in a single terminal window).*

- **To view the Website**: Open `http://localhost:5173` in your browser.
- **To view the Admin Dashboard**: Open `http://localhost:5173/admin`.
- The backend API runs silently on `http://localhost:3000`.

### Step 4: Stopping the Application
When you are done working:
1. Go to the terminal running `npm run start-program` and press `Ctrl + C` to kill the frontend and backend servers.
2. Navigate to the `/docker` folder and run `docker-compose down` to stop the database, saving your computer's RAM.

---

## 🔐 How to Test Docker Images

As part of the assignment, the apps are containerized. If you make a significant change to the `Dockerfile` and want to verify it builds successfully before Jenkins does it:

**To test the Frontend build:**
```bash
docker build -t frontend-test -f frontend/Dockerfile ./frontend
```
**Where to run it:** Inside the main root directory (`ABA_BA/`).

**To test the Backend build:**
```bash
docker build -t backend-test -f backend/Dockerfile ./backend
```
**Where to run it:** Inside the main root directory (`ABA_BA/`).