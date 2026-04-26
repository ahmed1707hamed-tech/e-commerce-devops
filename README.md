# 🚀 E-Commerce Platform - DevOps Project

A full-stack **E-Commerce application** deployed using modern **DevOps practices** including Kubernetes, CI/CD, Monitoring, and Infrastructure as Code.

---

## 🏗️ Architecture

![Architecture](images/arch.png)

---

## 📸 Project Preview

![Dashboard](images/frontend-dashboard.png)

---

## ⚙️ Tech Stack

### 🖥️ Application

* Frontend: React + Nginx
* Backend: FastAPI (Python)
* Database: PostgreSQL

### 🚀 DevOps & Infrastructure

* Docker
* Kubernetes (k3s)
* AWS EC2
* Terraform
* Ansible

### 🔄 CI/CD

* GitHub Actions
* Docker Hub

### 📊 Monitoring

* Prometheus
* Grafana

---

## 📂 Project Structure

```
E-Commerce Platform-devops/
│
├── backend/
├── frontend/
├── infrastructure/
│   ├── terraform/
│   ├── ansible/
│   └── k8s/
│
├── monitoring/
├── docker-compose.yml
└── README.md
```

---

## ⚡ Features

* 🛒 Product management (Add / Edit / Delete)
* 📊 Monitoring system (CPU / Memory / Metrics)
* 🔁 CI/CD pipeline automation
* ☁️ Cloud deployment on AWS
* 📦 Containerized microservices
* 📈 Scalable with Kubernetes

---

## 🔄 CI/CD Pipeline

![CI/CD](images/github-actions-pipeline.png)

**Flow:**

1. Push code to GitHub
2. GitHub Actions runs pipeline
3. Build Docker images
4. Push to Docker Hub
5. Deploy to Kubernetes

---

## ☁️ Infrastructure (AWS + Terraform)

![Terraform](images/terraform-init.png)

* EC2 provisioning
* Security Groups
* Infrastructure as Code

---

## ⚙️ Configuration (Ansible)

![Ansible](images/ansible-k3s-installation.png)

* Install Docker
* Install k3s
* Setup environment

---

## ☸️ Kubernetes Deployment

![K8s](images/kubernetes-pods-running.png)

* Backend service
* Frontend service
* PostgreSQL
* Nginx Ingress

---

## 📊 Monitoring

### 🔹 Prometheus

![Prometheus](images/prometheus-targets.png)

### 🔹 Grafana

![Grafana](images/grafana-dashboard.png)

---

## 📚 API Documentation

![Swagger](images/swagger-api-docs.png)

Swagger UI:
http://34.239.218.164/docs

---

## 🌐 Live Endpoints

Frontend:
http://34.239.218.164

API:
http://34.239.218.164/api/products

Grafana:
http://34.239.218.164:3000

Prometheus:
http://34.239.218.164:9090

---

## ▶️ Run Locally

```
docker-compose up -d
```

---

## 🧠 Key Learnings

* Kubernetes deployment & debugging
* Handling ImagePull & resource issues
* Monitoring with Prometheus & Grafana
* CI/CD automation
* Terraform & Ansible integration

---

## 👨‍💻 Author

Ahmed Hamed
https://github.com/ahmed1707hamed-tech

---

## ⭐ Give it a Star

If you like this project, don't forget to ⭐ the repo!

