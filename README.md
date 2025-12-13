# DXHero DevOps Challenge 🚀

This repository contains the solution for the DXHero DevOps Engineer technical assessment. It demonstrates the integration of Datadog with AWS, Kubernetes, Node.js applications, and PostgreSQL databases.

## 📂 Project Structure

- **`aws-eks/`**: Terraform code to provision an AWS EKS Cluster (v1.30) with secure networking and Datadog-ready Security Groups.
- **`app/`**: A sample Node.js API application instrumented with Datadog APM (`dd-trace`).
- **`k8s/`**: Kubernetes manifests (Deployments, Services, Helm Values) for deploying the app and Datadog Agent.

## 🛠️ Prerequisites

- AWS CLI & `kubectl`
- Terraform >= 1.0
- Docker
- Datadog API Key

## 🚀 Quick Start

### 1. Provision Infrastructure
```bash
cd aws-eks
terraform init
terraform apply
```

### 2. Configure kubectl
```bash
aws eks update-kubeconfig --region eu-central-1 --name common-eks-cluster
```

### 3. Deploy Datadog Agent
Update `k8s/datadog-values.yaml` with your API Key and run:
```bash
helm repo add datadog https://helm.datadoghq.com
helm install datadog-agent datadog/datadog -f k8s/datadog-values.yaml
```

### 4. Deploy Application & DB
```bash
kubectl apply -f k8s/app-deployment.yaml
kubectl apply -f k8s/postgres-deployment.yaml
```

## 📊 Features Demonstrated
- **AWS Integration:** IAM Role delegation for Datadog.
- **Node.js APM:** Custom Node.js app with manual instrumentation for reliable tracing.
- **Database Monitoring:** PostgreSQL monitoring on Kubernetes with custom Datadog user.
- **IaC:** Full infrastructure as code using Terraform.

