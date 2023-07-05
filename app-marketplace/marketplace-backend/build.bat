docker build -t backend .
docker stop Backend_Project
docker rm Backend_Project
docker run -d -p 4200:80 --name Backend_Project backend  
 
