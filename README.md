Field Insights Dashboard 
An interactive web application designed to simulate, ingest, and analyze farm sensor data. Users can submit sensor readings in JSON format, which are processed synchronously and in the background, with results and analytics displayed on a real-time dashboard.

This project was built as a full-stack take-home assignment for Carbonleap.

🚀 Live Demo
Live Demo Video: 

https://github.com/user-attachments/assets/35591aa5-0f56-49cd-bcff-90347ce1ab0e

Live URL is don't been provided because of paid plans of deployment hope you guys will understand.

✨ Key Features
RESTful API: A robust backend API built with FastAPI for ingesting sensor data and retrieving analytics.

Real-time Analytics Dashboard: A responsive frontend built with React that displays key metrics and visualizations using Recharts.

Background Job Processing: Utilizes Celery and Redis to handle data aggregation and analytics in the background, ensuring the API remains fast.

Asynchronous Operations: The entire flow, from data submission to status notification, is handled asynchronously.

Containerized: Fully containerized with Docker for consistent development, testing, and deployment.

🛠️ Tech Stack
Frontend:

React

Vite

Tailwind CSS

Recharts (for charts)

react-hot-toast (for notifications)

Backend:

Python 3.11

FastAPI

Celery (for background tasks)

Database & Messaging:

PostgreSQL

Redis

DevOps:

Docker & Docker Compose

⚙️ Local Setup and Installation
To run this project on your local machine, please follow the steps below.

Prerequisites
Git

Docker Desktop

Installation
Clone the repository:

Bash

git clone https://github.com/Aayush220803/carbonleap-dashboard.git
Navigate to the project directory:

Bash

cd carbonleap-dashboard
Build and run the application with Docker Compose:

Bash

docker compose up --build
Access the application:

The Frontend Dashboard will be available at: http://localhost:3000

The Backend API Docs (Swagger UI) will be available at: http://localhost:8000/docs

☁️ Deployment
This application is designed for easy deployment on platforms that support Docker, such as Render or Railway.

The general process is:

Connect the hosting provider to this GitHub repository.

Configure the services based on the docker-compose.yml file.

The platform will automatically build the Docker images and deploy the containers.

Set the necessary environment variables (if any) in the hosting provider's dashboard.

📊 Data Generation
The sample sensor data used for testing was generated using a Large Language Model (LLM) with the following prompt:

"Generate 500 farm sensor readings in JSONL format. Each line must be a valid JSON object. Each JSON object must have these exact keys: timestamp (ISO 8601 format in UTC, for July and August 2025), field_id (a string from 'field_1' to 'field_5'), sensor_type (one of: 'soil_moisture', 'temperature', 'ph', 'sunlight', 'rainfall'), reading_value (a float in a realistic range), and unit (e.g., '%', '°C', 'pH units', 'W/m²', 'mm'). Ensure a diverse mix of timestamps, fields, and sensor types."
