# FORTUNA CI/CD POC - Everything in Minikube (Windows PowerShell)

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  FORTUNA CI/CD POC - Everything in Minikube" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# -----------------------------------------------
# 1. Start Minikube
# -----------------------------------------------
Write-Host ""
Write-Host "[1/4] Starting Minikube cluster..." -ForegroundColor Yellow
minikube start --driver=docker --memory=4096 --cpus=2 --disk-size=20g
Write-Host "  -> Minikube is running." -ForegroundColor Green

# -----------------------------------------------
# 2. Install Jenkins via Helm
# -----------------------------------------------
Write-Host ""
Write-Host "[2/4] Installing Jenkins via Helm..." -ForegroundColor Yellow

helm repo add jenkins https://charts.jenkins.io
helm repo update

kubectl create namespace jenkins 2>$null

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

helm upgrade --install jenkins jenkins/jenkins `
  --namespace jenkins `
  -f "$ScriptDir\jenkins-values.yaml" `
  --wait --timeout 5m

Write-Host "  -> Jenkins installed." -ForegroundColor Green

# -----------------------------------------------
# 3. Install ArgoCD
# -----------------------------------------------
Write-Host ""
Write-Host "[3/4] Installing ArgoCD..." -ForegroundColor Yellow

kubectl create namespace argocd 2>$null

kubectl apply -n argocd `
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

Write-Host "  Waiting for ArgoCD server pod to be ready..."
kubectl wait --for=condition=available deployment/argocd-server `
  -n argocd --timeout=300s

Write-Host "  -> ArgoCD installed." -ForegroundColor Green

# -----------------------------------------------
# 4. Register the Fortuna application
# -----------------------------------------------
Write-Host ""
Write-Host "[4/4] Registering Fortuna app with ArgoCD..." -ForegroundColor Yellow

kubectl apply -f "$ScriptDir\..\argocd-application.yaml"

Write-Host "  -> ArgoCD Application registered." -ForegroundColor Green

# -----------------------------------------------
# 5. Print credentials and next steps
# -----------------------------------------------
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  ACCESS CREDENTIALS" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Jenkins password
$JenkinsPass = kubectl get secret -n jenkins jenkins `
  -o jsonpath="{.data.jenkins-admin-password}" 2>$null

if ($JenkinsPass) {
    $JenkinsPass = [System.Text.Encoding]::UTF8.GetString(
        [System.Convert]::FromBase64String($JenkinsPass)
    )
} else {
    $JenkinsPass = "(run: kubectl get secret -n jenkins jenkins -o jsonpath='{.data.jenkins-admin-password}' | base64 -d)"
}

Write-Host ""
Write-Host "JENKINS" -ForegroundColor White
Write-Host "  User:     admin"
Write-Host "  Password: $JenkinsPass"
Write-Host "  URL:      http://localhost:8080"

# ArgoCD password
$ArgoCDPass = kubectl get secret -n argocd argocd-initial-admin-secret `
  -o jsonpath="{.data.password}" 2>$null

if ($ArgoCDPass) {
    $ArgoCDPass = [System.Text.Encoding]::UTF8.GetString(
        [System.Convert]::FromBase64String($ArgoCDPass)
    )
} else {
    $ArgoCDPass = "(run: kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath='{.data.password}' | base64 -d)"
}

Write-Host ""
Write-Host "ARGOCD" -ForegroundColor White
Write-Host "  User:     admin"
Write-Host "  Password: $ArgoCDPass"
Write-Host "  URL:      https://localhost:8085"

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Open two more terminals and run:"
Write-Host "  Terminal 1: kubectl port-forward svc/jenkins -n jenkins 8080:8080"
Write-Host "  Terminal 2: kubectl port-forward svc/argocd-server -n argocd 8085:443"
Write-Host ""
Write-Host "Then browse to:"
Write-Host "  Jenkins:  http://localhost:8080"
Write-Host "  ArgoCD:   https://localhost:8085"
Write-Host ""
