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
                sh 'npm install pm2 -g; pm2 start npm -- start'
            }
        }
    }
}
