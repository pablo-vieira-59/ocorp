docker build -f Dockerfile.cdn -t cdn .
docker stop CDN_Project
docker rm CDN_Project
docker run -v C:\Applications\Marketplace:/app/Attachments -d -p 4201:80 --name CDN_Project cdn  

