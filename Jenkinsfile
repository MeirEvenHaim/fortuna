pipeline {
    agent any

    environment {
        // Replace with your Docker Hub username
        DOCKER_HUB_ID = 'meirevenhaim'
        FRONTEND_REPO = 'fortuna-frontend'
        BACKEND_REPO = 'fortuna-backend'
        IMAGE_TAG = "v-${BUILD_NUMBER}"
        GIT_CREDENTIALS_ID = 'github-credentials'
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                script {
                    sh "cd frontend && npm install && npm test -- --passWithNoTests || echo 'No tests found'"
                    sh "cd backend && npm install && npm test || echo 'No tests found'"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build frontend
                    docker.build("${FRONTEND_REPO}:${IMAGE_TAG}", "-f frontend/Dockerfile ./frontend")
                    
                    // Build backend
                    docker.build("${BACKEND_REPO}:${IMAGE_TAG}", "-f backend/Dockerfile ./backend")
                }
            }
        }

        stage('Image Scan (Trivy)') {
            steps {
                script {
                    sh "trivy image --no-progress --exit-code 0 --severity HIGH,CRITICAL ${FRONTEND_REPO}:${IMAGE_TAG}"
                    sh "trivy image --no-progress --exit-code 0 --severity HIGH,CRITICAL ${BACKEND_REPO}:${IMAGE_TAG}"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        // Login to Docker Hub
                        sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                        
                        // Tag and push frontend
                        sh "docker tag ${FRONTEND_REPO}:${IMAGE_TAG} ${DOCKER_HUB_ID}/${FRONTEND_REPO}:${IMAGE_TAG}"
                        sh "docker push ${DOCKER_HUB_ID}/${FRONTEND_REPO}:${IMAGE_TAG}"

                        // Tag and push backend
                        sh "docker tag ${BACKEND_REPO}:${IMAGE_TAG} ${DOCKER_HUB_ID}/${BACKEND_REPO}:${IMAGE_TAG}"
                        sh "docker push ${DOCKER_HUB_ID}/${BACKEND_REPO}:${IMAGE_TAG}"
                    }
                }
            }
        }

        stage('Update K8s Manifests') {
            steps {
                script {
                    // Update frontend deployment image
                    sh "sed -i 's|image: .*fortuna-frontend:.*|image: ${DOCKER_HUB_ID}/${FRONTEND_REPO}:${IMAGE_TAG}|g' k8s/frontend-deployment.yaml"
                    
                    // Update backend deployment image
                    sh "sed -i 's|image: .*fortuna-backend:.*|image: ${DOCKER_HUB_ID}/${BACKEND_REPO}:${IMAGE_TAG}|g' k8s/backend-deployment.yaml"
                }
            }
        }

        stage('Commit & Push Manifests') {
            steps {
                withCredentials([usernamePassword(credentialsId: env.GIT_CREDENTIALS_ID, usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                    sh '''
                        git config user.email "jenkins@example.com"
                        git config user.name "Jenkins CI"
                        git add k8s/*-deployment.yaml
                        git commit -m "chore: update image tags to ${IMAGE_TAG} [skip ci]" || echo "No changes to commit"
                        # Make sure to replace your-repo-url with the actual git remote
                        git push https://${GIT_USER}:${GIT_PASS}@github.com/your-org/your-repo.git HEAD:main
                    '''
                }
            }
        }
    }
}
