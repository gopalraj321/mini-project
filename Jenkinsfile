pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-mini-app"
        ECR_REGISTRY = "<your_account_id>.dkr.ecr.<region>.amazonaws.com"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/yourname/devops-mini-project.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('MySonarQube') {
                        sh 'sonar-scanner'
                    }
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh """
                    docker build -t $IMAGE_NAME .
                    docker tag $IMAGE_NAME:latest $ECR_REGISTRY/$IMAGE_NAME:latest
                    aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin $ECR_REGISTRY
                    docker push $ECR_REGISTRY/$IMAGE_NAME:latest
                """
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh """
                    aws eks update-kubeconfig --name <cluster_name> --region <region>
                    kubectl apply -f k8s/deployment.yaml
                """
            }
        }
    }
}
