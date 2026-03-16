# Project Roadmap & Local Proof of Concept (PoC)

This document serves as the master checklist for the entire project. It encompasses everything we have successfully built so far, and outlines the exact step-by-step guide for demonstrating a 100% Local Proof of Concept using Minikube, Jenkins, and ArgoCD directly on your computer.

---

## ✅ Part 1: What We Already Did (Completed Checklist)

We have successfully transformed this application into a fully-fledged, Secure Cloud-Native Web Application.

### Architecture & Folder Restructuring
- [x] Reorganized the monolithic codebase into distinct micro-components: `/frontend`, `/backend`, `/docker`, `/k8s`, and `/docs`.
- [x] Configured a root `package.json` to allow running the separated frontend and backend concurrently for easy local development.

### Application Features (CRUD)
- [x] Implemented full Create, Read, Update, Delete (CRUD) operations for the **Orders, Customers, Comments, and Feedback** sections.

### Dockerization & Security
- [x] Created `frontend/Dockerfile` and `backend/Dockerfile` using secure multi-stage builds and lightweight Alpine images.
- [x] Hardened both Docker images to run exclusively as **Non-Root Users** to prevent privilege escalation attacks.

### Kubernetes (K8s) Infrastructure
- [x] Written K8s configurations (`namespace.yaml`, `configmap.yaml`, `secret.yaml`).
- [x] Defined Deployments and Services for the Frontend, Backend, and Database.
- [x] Implemented an `ingress.yaml` for routing traffic.
- [x] Implemented strict **Network Policies** and **RBAC** to enforce the principle of least privilege.

### CI/CD Pipeline Configuration
- [x] Wrote a complete `Jenkinsfile` for Continuous Integration (Test, Trivy Scan, Build, Push to Docker Hub, Update Git).
- [x] Wrote `argocd-application.yaml` for GitOps-style Continuous Deployment.

---

## 🚀 Part 2: Local Proof of Concept (PoC) Guide

Since AWS is not mandatory, you can demonstrate the entire Cloud-Native CI/CD pipeline right from your laptop! This is perfectly acceptable as a Proof of Concept.

Here is exactly how to set up the PoC on your Windows machine:

### Phase 1: Set up Desktop Tools
1. **Docker Desktop**: Ensure Docker Desktop is installed and running.
2. **Minikube**: Install Minikube for Windows. Open PowerShell as Administrator and run:
   ```powershell
   winget install minikube
   ```
3. **Kubectl**: If `kubectl` didn't install with Docker/Minikube, install it:
   ```powershell
   winget install Kubernetes.kubectl
   ```

### Phase 2: Start your Local Cluster
1. Open a terminal and start Minikube:
   ```bash
   minikube start
   ```
2. You now have a fully functioning Kubernetes cluster running locally! 

### Phase 3: Set up ArgoCD (Continuous Deployment)
ArgoCD will live inside your Minikube cluster and automatically pull the YAML manifests from your GitHub.
1. Install ArgoCD into the local cluster:
   ```bash
   kubectl create namespace argocd
   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
   ```
2. Expose the ArgoCD server so you can access the UI:
   ```bash
   kubectl port-forward svc/argocd-server -n argocd 8080:443
   ```
   *(Keep this terminal open!)*
3. Open a **new** terminal to get the admin password:
   ```bash
   kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}"
   ```
4. Open your browser to `https://localhost:8080`, log in with username `admin` and the password you just copied.
5. Apply the `argocd-application.yaml` manifest found in this repo (make sure you updated `repoURL` inside of it to point to your GitHub repo):
   ```bash
   kubectl apply -f argocd-application.yaml
   ```

### Phase 4: Set up Jenkins (Continuous Integration)
Jenkins will monitor your local code, build it, and push it to Docker Hub.
1. Run Jenkins locally using Docker:
   ```bash
   docker run -d -p 8081:8080 -v /var/run/docker.sock:/var/run/docker.sock jenkins/jenkins:lts
   ```
2. Open Jenkins in your browser at `http://localhost:8081`. 
   *(To get the initial Admin password, check the logs of the Jenkins container using Docker Desktop).*
3. Install Plugins: **Docker Pipeline**, **Docker**, **Git**.
4. Add Credentials in Jenkins:
   - Go to Manage Credentials -> Add your Docker Hub Username (`meirevenhaim`) and Password. Set the ID to `dockerhub-credentials`.
   - Add your GitHub Personal Access Token. Set the ID to `github-credentials`.
5. Create a new **Pipeline Job**, link it to your GitHub repository, and tell it to run the `Jenkinsfile`.

### Phase 5: The Grand Presentation!
When you present this to your professor, do this exact sequence:

1. Open your browser and show them the live frontend app running inside Minikube:
   ```bash
   minikube service frontend-service -n fortuna-app
   ```
2. Open VS Code, change some text on the Homepage, and commit to GitHub.
3. Open Jenkins (`http://localhost:8081`) and click **Build Now**. Watch the pipeline test, scan, build, and push the image to Docker Hub, then automatically update GitHub with the new version tag.
4. Open ArgoCD (`https://localhost:8080`). Show how it detects the change in GitHub and automatically deploys the new Pods to Minikube.
5. Refresh the website page from step 1—the new text is there! You have successfully proven a fully automated, GitOps CI/CD pipeline.
