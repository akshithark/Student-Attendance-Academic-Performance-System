pipeline {
  agent any
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Validate') { steps { bat 'node --version'; bat 'npm --version'; bat 'docker --version' } }
    stage('Install') { steps { bat 'npm install' } }
    stage('Unit Tests') { steps { bat 'npm test' } }
    stage('Docker Build') { steps { bat 'docker build -t student-academic-app:latest .' } }
  }
  post { success { echo 'Validation, tests and Docker build completed.' } failure { echo 'Check Console Output for errors.' } }
}
