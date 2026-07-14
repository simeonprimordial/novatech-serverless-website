# NovaTech Serverless Website on AWS

> **A production-ready serverless static website hosted on Amazon S3, delivered through Amazon CloudFront, and deployed automatically using GitHub Actions with GitHub OIDC authentication and least-privilege IAM.**

![AWS](https://img.shields.io/badge/AWS-S3%20%7C%20CloudFront%20%7C%20IAM%20%7C%20OIDC-FF9900?logo=amazonaws&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Production--Ready-success)

---

# Project Overview

NovaTech Solutions required a secure, scalable, and globally accessible company website to showcase its cloud infrastructure consulting services.

Instead of using a traditional web server, this project implements a **serverless architecture** using Amazon S3 and Amazon CloudFront. The deployment process is fully automated through GitHub Actions using **OpenID Connect (OIDC)** authentication with AWS IAM Roles, eliminating the need for long-lived AWS access keys.

The solution follows AWS security best practices by keeping the S3 bucket private and allowing access only through CloudFront using **Origin Access Control (OAC)**.

---

# Business Scenario

NovaTech Solutions is a cloud consulting startup that needs a modern corporate website that:

- Is highly available worldwide
- Is secure by default
- Has minimal operational overhead
- Can be updated automatically after every approved code change
- Eliminates manual deployments
- Uses modern cloud security practices

---

# Business Requirements

- Host a static company website
- Global low-latency content delivery
- HTTPS by default
- Secure origin access
- Automated deployments
- Easy rollback through versioning
- Low operational cost

---

# Functional Requirements

- Static website hosting
- Responsive landing page
- Navigation between sections
- Automatic deployment from GitHub
- Automatic CloudFront cache invalidation
- Version-controlled source code

---

# Non-Functional Requirements

## Security

- Private S3 bucket
- Origin Access Control (OAC)
- IAM least privilege
- GitHub OIDC authentication
- No long-lived AWS credentials

## Availability

- CloudFront global edge network
- Amazon S3 durable object storage

## Performance

- CDN caching
- Automatic compression
- HTTPS

## Scalability

- Automatically scales to millions of requests
- No infrastructure management

## Maintainability

- Git-based workflow
- CI/CD automation
- Infrastructure documented

---

# Solution Architecture

```text
                    Users
                      │
                HTTPS Requests
                      │
                      ▼
           Amazon CloudFront
                      │
        Origin Access Control (OAC)
                      │
                      ▼
          Private Amazon S3 Bucket
```

> **Architecture Diagram:** `docs/architecture-diagram.png`

---

# CI/CD Architecture

```text
Developer
      │
git push main
      │
      ▼
GitHub Actions
      │
      ▼
HTML Validation
      │
      ▼
GitHub OIDC
      │
      ▼
AWS STS
      │
Assume IAM Role
      │
      ▼
Deploy Website to S3
      │
      ▼
Invalidate CloudFront Cache
      │
      ▼
Updated Website
```

> **Deployment Diagram:** `docs/deployment-diagram.png`

---

# Technology Stack

| Category | Technology |
|----------|------------|
| Cloud Provider | AWS |
| Object Storage | Amazon S3 |
| CDN | Amazon CloudFront |
| Identity | AWS IAM + GitHub OIDC |
| CI/CD | GitHub Actions |
| Version Control | Git & GitHub |
| Frontend | HTML5, CSS3, JavaScript |

---

# Repository Structure

```text
novatech-serverless-website/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── website/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
│
├── infrastructure/
│   └── iam/
│       ├── deployment-policy.json
│       └── trust-policy.json
│
├── docs/
│   ├── architecture-diagram.png
│   ├── deployment-diagram.png
│   ├── sequence-diagram.png
│   ├── decisions.md
│   ├── troubleshooting.md
│   └── screenshots/
│
├── LICENSE
└── README.md
```

---

# Deployment Workflow

1. Developer pushes changes to the **main** branch.
2. GitHub Actions validates the HTML.
3. GitHub authenticates with AWS using OpenID Connect (OIDC).
4. AWS Security Token Service (STS) issues temporary credentials.
5. Website files are synchronized to Amazon S3.
6. CloudFront cache is invalidated.
7. End users receive the latest version globally.

---

# Security Best Practices

- Private Amazon S3 bucket
- S3 Block Public Access enabled
- Server-side encryption (SSE-S3)
- Bucket Versioning enabled
- CloudFront Origin Access Control (OAC)
- GitHub OIDC authentication
- IAM least-privilege policy
- No AWS access keys stored in GitHub
- HTTPS enforced

---

# Cost Optimization

- Fully serverless architecture
- No EC2 instances
- No Load Balancer
- Low-cost Amazon S3 storage
- CloudFront caching reduces origin requests
- Automatic scaling with zero idle compute costs

---

# AWS Well-Architected Framework

| Pillar | Implementation |
|---------|----------------|
| Operational Excellence | GitHub Actions CI/CD |
| Security | OIDC, IAM Roles, OAC, Private S3 |
| Reliability | S3 Versioning, CloudFront |
| Performance Efficiency | CloudFront CDN & Compression |
| Cost Optimization | Fully serverless architecture |

---

# Engineering Decisions

| Decision | Rationale |
|----------|-----------|
| Private S3 Bucket | Prevent direct public access |
| CloudFront OAC | Secure origin communication |
| GitHub OIDC | Eliminate long-lived credentials |
| IAM Least Privilege | Reduce attack surface |
| GitHub Actions | Automate deployments |
| HTML Validation | Prevent broken deployments |

See **`docs/decisions.md`** for detailed engineering decisions.

---

# Troubleshooting

Common deployment issues and their resolutions are documented in:

```text
docs/troubleshooting.md
```

---

# Future Improvements

- Custom domain with Amazon Route 53
- SSL certificate using AWS Certificate Manager (ACM)
- Infrastructure as Code using Terraform
- AWS WAF integration
- CloudFront Response Headers Policy
- Lighthouse performance testing
- End-to-end testing with Playwright
- Multi-environment deployments (`dev`, `staging`, `production`)
- Monitoring with Amazon CloudWatch
- AWS Config for compliance monitoring

---

# Screenshots

Add the following screenshots:

- Website homepage
- Amazon S3 bucket configuration
- CloudFront distribution
- GitHub Actions successful workflow
- GitHub OIDC IAM Role
- CloudFront OAC configuration

Store them in:

```text
docs/screenshots/
```

---

# Lessons Learned

This project demonstrates how to design and deploy a production-ready serverless static website on AWS using modern cloud engineering practices.

Key lessons include:

- Designing secure-by-default cloud architectures
- Implementing automated CI/CD pipelines
- Using GitHub OIDC instead of long-lived AWS credentials
- Applying the Principle of Least Privilege
- Leveraging Amazon CloudFront for global content delivery
- Applying the AWS Well-Architected Framework

---

# Skills Demonstrated

- Amazon S3
- Amazon CloudFront
- Origin Access Control (OAC)
- GitHub Actions
- GitHub OIDC
- AWS IAM
- AWS STS
- CI/CD Automation
- Static Website Hosting
- Cloud Security
- Least Privilege IAM
- Infrastructure Documentation

---

# Author

**Simeon Siaka**

Aspiring Cloud Infrastructure Engineer

- AWS
- Linux
- Git
- GitHub Actions
- CI/CD
- Infrastructure as Code
- Cloud Security

---

# License

This project is licensed under the MIT License.

---

## Portfolio Highlight

This project goes beyond a typical AWS static website tutorial by implementing production-oriented engineering practices, including:

- Secure-by-default architecture
- Automated deployments with GitHub Actions
- Passwordless authentication using GitHub OIDC
- Least-privilege IAM policies
- CloudFront Origin Access Control
- Comprehensive documentation aligned with the AWS Well-Architected Framework

It demonstrates not only the ability to build cloud infrastructure but also the engineering decisions behind designing secure, scalable, and maintainable cloud solutions.