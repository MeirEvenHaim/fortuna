#!/bin/bash
set -e

echo "============================================="
echo "  FORTUNA CI/CD POC — Everything in Minikube"
echo "============================================="

# -----------------------------------------------
# 1. Start Minikube
# -----------------------------------------------
echo ""
echo "▶ Starting Minikube cluster..."
minikube start --driver=docker --memory=4096 --cpus=2 --disk-size=20g

echo "✔ Minikube is running."
echo ""

# -----------------------------------------------
# 2. Install Jenkins via Helm
# -----------------------------------------------
echo "▶ Installing Jenkins into 'jenkins' namespace..."

# Add the Jenkins Helm repo
helm repo add jenkins https://charts.jenkins.io
helm repo update

kubectl create namespace jenkins 2>/dev/null || true

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

helm upgrade --install jenkins jenkins/jenkins \
  --namespace jenkins \
  -f "$SCRIPT_DIR/jenkins-values.yaml" \
  --wait --timeout 5m

echo "✔ Jenkins installed."
echo ""

# -----------------------------------------------
# 3. Install ArgoCD
# -----------------------------------------------
echo "▶ Installing ArgoCD into 'argocd' namespace..."

kubectl create namespace argocd 2>/dev/null || true

kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

echo "  Waiting for ArgoCD server pod to be ready..."
kubectl wait --for=condition=available deployment/argocd-server \
  -n argocd --timeout=300s

echo "✔ ArgoCD installed."
echo ""

# -----------------------------------------------
# 4. Register the Fortuna application with ArgoCD
# -----------------------------------------------
echo "▶ Registering Fortuna app with ArgoCD..."

kubectl apply -f "$SCRIPT_DIR/../argocd-application.yaml"

echo "✔ ArgoCD Application registered."
echo ""

# -----------------------------------------------
# 5. Print credentials
# -----------------------------------------------
echo "============================================="
echo "  ACCESS CREDENTIALS"
echo "============================================="

# Jenkins
JENKINS_PASS=$(kubectl exec -n jenkins svc/jenkins -c jenkins -- \
  cat /run/secrets/additional/chart-admin-password 2>/dev/null || \
  kubectl get secret -n jenkins jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 -d)

echo ""
echo "🔧 JENKINS"
echo "   URL:      Run: kubectl port-forward svc/jenkins -n jenkins 8080:8080"
echo "   User:     admin"
echo "   Password: $JENKINS_PASS"

# ArgoCD
ARGOCD_PASS=$(kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d)

echo ""
echo "🚀 ARGOCD"
echo "   URL:      Run: kubectl port-forward svc/argocd-server -n argocd 8085:443"
echo "   User:     admin"
echo "   Password: $ARGOCD_PASS"

echo ""
echo "============================================="
echo "  POC IS READY!"
echo "============================================="
echo ""
echo "Quick start:"
echo "  Terminal 1: kubectl port-forward svc/jenkins -n jenkins 8080:8080"
echo "  Terminal 2: kubectl port-forward svc/argocd-server -n argocd 8085:443"
echo ""
echo "  Then open http://localhost:8080 (Jenkins)"
echo "  and  https://localhost:8085 (ArgoCD)"
echo ""
