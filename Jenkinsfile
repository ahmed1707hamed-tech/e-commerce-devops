pipeline {
    agent any

    environment {
        DOCKERHUB_USER  = "ahmed1707hamed"
        FRONTEND_IMAGE  = "${DOCKERHUB_USER}/ecommerce-frontend"
        BACKEND_IMAGE   = "${DOCKERHUB_USER}/ecommerce-backend"
        TAG             = "${BUILD_NUMBER}"
    }

    stages {

        stage('Build Images') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        sh "docker build -t ${FRONTEND_IMAGE}:${TAG} ./frontend"
                    }
                }
                stage('Build Backend') {
                    steps {
                        sh "docker build -t ${BACKEND_IMAGE}:${TAG} ./backend"
                    }
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"
                }
            }
        }

        stage('Push Images') {
            parallel {
                stage('Push Frontend') {
                    steps {
                        sh "docker push ${FRONTEND_IMAGE}:${TAG}"
                        // Also tag as latest so K8s imagePullPolicy:Always picks it up
                        sh "docker tag  ${FRONTEND_IMAGE}:${TAG} ${FRONTEND_IMAGE}:latest"
                        sh "docker push ${FRONTEND_IMAGE}:latest"
                    }
                }
                stage('Push Backend') {
                    steps {
                        sh "docker push ${BACKEND_IMAGE}:${TAG}"
                        sh "docker tag  ${BACKEND_IMAGE}:${TAG} ${BACKEND_IMAGE}:latest"
                        sh "docker push ${BACKEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                kubectl apply -f infrastructure/k8s/postgres.yaml
                kubectl apply -f infrastructure/k8s/backend.yaml
                kubectl apply -f infrastructure/k8s/frontend.yaml

                # Force pods to pull the new :latest images
                kubectl rollout restart deployment/backend
                kubectl rollout restart deployment/frontend

                # Wait for rollouts to complete before marking build green
                kubectl rollout status deployment/backend  --timeout=120s
                kubectl rollout status deployment/frontend --timeout=120s
                """
            }
        }
    }

    post {
        always {
            // Clean up local images to keep the Jenkins agent disk tidy
            sh """
            docker rmi ${FRONTEND_IMAGE}:${TAG} ${FRONTEND_IMAGE}:latest || true
            docker rmi ${BACKEND_IMAGE}:${TAG}  ${BACKEND_IMAGE}:latest  || true
            """
        }
        success {
            echo "✅ Deploy complete. App is at http://\$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[0].address}'):30080"
        }
        failure {
            echo "❌ Pipeline failed. Check the logs above."
        }
    }
}