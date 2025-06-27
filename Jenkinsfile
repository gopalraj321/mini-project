pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-mini-app"
        ECR_REGISTRY = "796973491290.dkr.ecr.us-east-1.amazonaws.com"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/gopalraj321/mini-project.git'

            }
        }

        stage('Docker Build & Push') {
            steps {
                sh """
                    docker build -t $IMAGE_NAME .
                    docker tag $IMAGE_NAME:latest $ECR_REGISTRY/$IMAGE_NAME:latest
                    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY
                    docker push $ECR_REGISTRY/$IMAGE_NAME:latest
                """
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh """
                    aws eks update-kubeconfig --name devops-cluster --region us-east-1
                    kubectl apply -f k8s/deployment.yaml
                """
            }
        }
    }
}
