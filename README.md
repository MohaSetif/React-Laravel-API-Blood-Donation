# React-Laravel-API-Blood-Donation
Complete backend application.
Installation:
1. Make sure you have environment setup properly. You will need PHP8.1, composer and Node.js.
2. Download the project (or clone using GIT)
3. Copy .env.example into .env and configure database credentials
4. Navigate to the project's root directory using terminal
5. Run composer install
6. Set the encryption key by executing php artisan key:generate --ansi
7. Run migrations php artisan migrate --seed
8. Start local server by executing php artisan serve
9. Open new terminal and navigate to the react folder
10. Copy react/.env.example into .env and adjust the VITE_API_BASE_URL parameter
11. Run npm install
12. Run npm run dev to start vite server for React
