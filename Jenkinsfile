pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'npm install'
            }
        }
        stage('start') {
            steps {
                sh 'nohup npm start &'
            }
        }
    }
}
