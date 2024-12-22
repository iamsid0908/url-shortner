# URL SHORTENER

A URL Shortener backend project designed to generate compact, unique short URLs from long links for easier sharing. It includes features for URL redirection, tracking usage statistics, and expiration management.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installations](#installations)
- [Usage](#usage)

## Technologies Used

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose (ODM for MongoDB)
- Nodemon (for development)
- Redis

This stack ensures a robust, scalable, and type-safe backend with efficient database operations.

## Features

- URL Shortener: Generate short, unique URLs from long links.
- Analytics:
  - Track the number of clicks on each short URL.
  - Record metadata such as operating system, device type, and browser details.
- Expiration Management: Set expiry dates for URLs to automatically disable them.
- URL Redirection: Seamless redirection from short URLs to the original long URLs.

## Installations

1. Clone the repository:
   ```bash
   git clone https://github.com/iamsid0908/url-shortner.git
   ```
2. Navigate to the project directory:
   ```bash
   cd alter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Usage

1. **Shorten a URL**:

   - Send a POST request to `/api/shorten` with the long URL in the body.
   - Example:
     ```json
     {
       "longUrl": "https://example.com/long-url"
     }
     ```
   - Response:
     ```json
     {
       "shortUrl": "http://your-domain.com/abcd1234"
     }
     ```

2. **Redirect to the Original URL**:

   - Access the short URL (e.g., `http://your-domain.com/abcd1234`), and it will redirect to the original long URL.

3. **View Analytics**:
   - Send a GET request to `/api/analytics/<shortUrl>` to retrieve details such as click count, OS, device, and browser statistics.
   - Example Response:
     ```json
     {
       "clicks": 120,
       "analytics": [
         { "os": "Windows", "device": "Desktop", "browser": "Chrome" },
         { "os": "iOS", "device": "Mobile", "browser": "Safari" }
       ]
     }
     ```

## Documentation

For detailed API documentation, visit the Postman collection: [Postman Documentation](https://documenter.getpostman.com/view/20703683/2sAYJ3Fgsy)
