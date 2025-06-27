pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-mini-app"
        ECR_REGISTRY = "796973491290.dkr.ecr.us-east-1.amazonaws.com"
        AWS_REGION = "us-east-1"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/gopalraj321/mini-project.git'
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-ecr-credentials']]) {
                    sh """
                        docker build -t $IMAGE_NAME ./app
                        docker tag $IMAGE_NAME:latest $ECR_REGISTRY/$IMAGE_NAME:latest
                        aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY
                        docker push $ECR_REGISTRY/$IMAGE_NAME:latest
                    """
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-ecr-credentials']]) {
                    sh """
                        aws eks update-kubeconfig --name devops-cluster --region $AWS_REGION
                        kubectl apply -f k8s/deployment.yaml
                    """
                }
            }
        }
    }
}
