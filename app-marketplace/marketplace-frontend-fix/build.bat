docker build -t frontend .
docker stop Frontend_Project
docker rm Frontend_Project
docker run -d -p 4210:4200 --name Frontend_Project frontend