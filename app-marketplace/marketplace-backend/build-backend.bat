docker build -f Dockerfile.backend -t backend .
docker stop Backend_Project
docker rm Backend_Project
docker run -v C:\Applications\Marketplace:/app/Attachments -d -p 4200:80 --name Backend_Project backend  

