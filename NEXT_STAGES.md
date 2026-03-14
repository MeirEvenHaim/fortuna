# Project Roadmap & Next Stages

This document serves as the master checklist for the entire project. It encompasses everything we have successfully built so far, and outlines the exact step-by-step guide for the remaining deployment stages.

---

## ✅ Part 1: What We Already Did (Completed Checklist)

We have successfully transformed this application into a fully-fledged, Secure Cloud-Native Web Application.

### Architecture & Folder Restructuring
- [x] Reorganized the monolithic codebase into distinct micro-components: `/frontend`, `/backend`, `/docker`, `/k8s`, and `/docs`.
- [x] Configured a root `package.json` to allow running the separated frontend and backend concurrently for easy local development.

### Application Features (CRUD)
- [x] Connected the React frontend to the Node.js/Express backend.
- [x] Implemented full Create, Read, Update, Delete (CRUD) operations for the **Orders** section in the Admin Dashboard.
- [x] Implemented full CRUD for the **Customers** section.
- [x] Implemented full CRUD for the **Comments** section.
- [x] Implemented full CRUD for the **Feedback** section.

### Dockerization & Security
- [x] Created `frontend/Dockerfile` utilizing secure **multi-stage builds** (Node builder -> Nginx Alpine server).
- [x] Created `backend/Dockerfile` using a lightweight Alpine Node.js image.
- [x] Hardened both Docker images to run exclusively as **Non-Root Users** to prevent privilege escalation attacks.

### Kubernetes (K8s) Infrastructure
- [x] Written `namespace.yaml` to isolate the application in a `fortuna-app` namespace.
- [x] Configured `configmap.yaml` and `secret.yaml` to securely inject database credentials without hardcoding them.
- [x] Defined Deployments and Services for the Frontend, Backend, and Database.
- [x] Implemented an `ingress.yaml` to route external web traffic to the correct internal services.
- [x] Implemented strict **Network Policies** (e.g., denying all traffic by default, only allowing the backend to talk to the database, and only allowing external traffic to hit the frontend).
- [x] Implemented **RBAC** (Role-Based Access Control) with specific ServiceAccounts and Roles to enforce the principle of least privilege.

### CI/CD Pipeline Configuration
- [x] Wrote a complete `Jenkinsfile` for Continuous Integration.
- [x] Configured Jenkins to automatically build images, run **Trivy Vulnerability Scans**, and securely push images to Docker Hub.
- [x] Configured Jenkins to automatically update the Kubernetes manifests with the latest generated image tags.
- [x] Wrote `argocd-application.yaml` for GitOps-style Continuous Deployment.
- [x] Completely pivoted the architecture to rely on **100% Free Resources** (Docker Hub + Minikube + AWS EC2 Free Tier) rather than expensive managed services.

---

## 🚀 Part 2: Stages Left To Do (AWS Deployment Guide)

From this point onward, you only need to provision the free AWS infrastructure and connect the pipeline. Follow these stages step-by-step:

### Phase 1: Set up Docker Hub (The Free Image Registry)
Jenkins will store your built application images here.
1. Log in to [Docker Hub](https://hub.docker.com/) and create a free account.
2. Create two new public repositories:
   - `yourusername/fortuna-frontend`
   - `yourusername/fortuna-backend`
3. Back in your code editor, open the `Jenkinsfile` in this repo and change `DOCKER_HUB_ID = 'your-dockerhub-username'` to your actual Docker Hub username. 
4. Commit and push this change to your Git repository.

### Phase 2: Create the Free AWS Server (Amazon EC2)
We will launch a free server to host your Kubernetes cluster.
1. Log in to the AWS Console -> Navigate to **EC2**.
2. Click **Launch Instance**.
3. **Name**: `fortuna-minikube-server`.
4. **OS**: Select **Ubuntu 24.04 LTS**.
5. **Instance Type**: Select **t2.micro** or **t3.micro** *(Ensure it has the "Free tier eligible" badge)*.
6. **Key Pair**: Create a new key pair named `fortuna-key` and download the `.pem` file.
7. **Network Settings**: 
   - Allow SSH traffic (Port 22).
   - Allow HTTP/HTTPS traffic from anywhere.
   - Click "Edit", add a Custom TCP rule for port `8080` (for Jenkins).
   - Add another Custom TCP rule for port `30080` (This is the NodePort for your Frontend App).
8. Click **Launch Instance**.

### Phase 3: Install Minikube & Tools on the EC2 Server
Connect to your new free server and install the cluster.
1. Open your computer's terminal and SSH into your EC2 instance using the downloaded key:
   ```bash
   ssh -i "fortuna-key.pem" ubuntu@<YOUR_EC2_PUBLIC_IP>
   ```
2. Install Docker in the terminal:
   ```bash
   sudo apt update
   sudo apt install -y docker.io
   sudo usermod -aG docker $USER && newgrp docker
   ```
3. Install Minikube:
   ```bash
   curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
   sudo install minikube-linux-amd64 /usr/local/bin/minikube
   ```
4. Install Kubectl:
   ```bash
   sudo snap install kubectl --classic
   ```
5. Start the Minikube Cluster:
   ```bash
   minikube start --driver=docker
   ```

### Phase 4: Set up ArgoCD (Continuous Delivery)
ArgoCD will live inside your Minikube cluster and automatically pull the YAML manifests from your GitHub.
1. Install ArgoCD into the cluster:
   ```bash
   kubectl create namespace argocd
   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
   ```
2. Expose the ArgoCD server:
   ```bash
   kubectl port-forward svc/argocd-server -n argocd 8080:443 &
   ```
3. Get the initial admin password to log in:
   ```bash
   kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
   ```
4. Log in to the ArgoCD UI using your EC2 IP and port 8080.
5. Apply the `argocd-application.yaml` manifest found in this repo (make sure you updated `repoURL` inside of it to point to your GitHub repo):
   ```bash
   kubectl apply -f argocd-application.yaml
   ```

### Phase 5: Set up Jenkins
Jenkins will trigger when you push code, build it, and push it to Docker Hub.
1. Install Jenkins on the EC2 instance via apt, or simply run it via Docker:
   ```bash
   docker run -d -p 8081:8080 -v /var/run/docker.sock:/var/run/docker.sock -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
   ```
2. Open Jenkins in your browser at `http://<YOUR_EC2_PUBLIC_IP>:8081`.
3. Install Plugins: **Docker Pipeline**, **Docker**, **Git**.
4. Add Credentials in Jenkins:
   - Go to Manage Credentials -> Add your Docker Hub Username/Password. Set the ID to `dockerhub-credentials`.
   - Add your GitHub Personal Access Token. Set the ID to `github-credentials`.
5. Create a new **Pipeline Job**, link it to your GitHub repository, and tell it to run the `Jenkinsfile`.

### Phase 6: Run the CI/CD Pipeline!
1. Commit any code change to GitHub.
2. Click **Build Now** in Jenkins.
3. Watch Jenkins test the code, scan it using Trivy, push the image to Docker Hub, and update the Kubernetes manifests in GitHub.
4. Watch ArgoCD detect the Github change and automatically spin up the new Pods inside your Minikube cluster.
5. Open your browser and navigate to `http://<YOUR_EC2_PUBLIC_IP>:30080` to view your live, free, cloud-native website!
