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
                sh 'export BUILD_ID=dontKillMe; npm start &'
            }
        }
    }
}
