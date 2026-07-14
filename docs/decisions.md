# Engineering Decisions

This document explains the key architectural and engineering decisions made during the implementation of the **NovaTech Serverless Website** project. Each decision was evaluated based on security, scalability, maintainability, operational excellence, and cost optimization following the AWS Well-Architected Framework.

---

# Decision 1: Serverless Architecture

## Decision

Host the website using **Amazon S3** and **Amazon CloudFront** instead of an EC2 web server.

## Rationale

A static website does not require a traditional web server. Using a serverless architecture eliminates infrastructure management while providing high availability and scalability.

## Benefits

- No server maintenance
- Automatic scalability
- High durability (99.999999999%)
- Reduced operational overhead
- Lower cost

## Trade-offs

- Limited to static content
- Server-side logic requires additional AWS services such as Lambda

---

# Decision 2: Private Amazon S3 Bucket

## Decision

Keep the S3 bucket private and block all public access.

## Rationale

Public S3 buckets increase the attack surface and may expose sensitive files. Instead, CloudFront is the only service allowed to access the bucket.

## Benefits

- Improved security
- Prevents direct object access
- Aligns with AWS security best practices
- Reduces accidental public exposure

## Trade-offs

- Slightly more complex initial configuration

---

# Decision 3: CloudFront Origin Access Control (OAC)

## Decision

Use **Origin Access Control (OAC)** instead of a public S3 website endpoint.

## Rationale

OAC provides secure communication between CloudFront and Amazon S3 using signed requests.

## Benefits

- Secure origin communication
- Supports modern AWS security features
- Prevents bypassing CloudFront
- Better than the legacy Origin Access Identity (OAI)

## Trade-offs

- Additional configuration compared to a public bucket

---

# Decision 4: GitHub Actions for CI/CD

## Decision

Automate deployments using GitHub Actions.

## Rationale

Manual uploads to Amazon S3 are error-prone and difficult to maintain. GitHub Actions provides repeatable and automated deployments directly from the repository.

## Benefits

- Automated deployments
- Consistent release process
- Faster updates
- Reduced human error

## Trade-offs

- Initial workflow setup required

---

# Decision 5: GitHub OIDC Authentication

## Decision

Use GitHub OpenID Connect (OIDC) with an IAM Role instead of AWS Access Keys.

## Rationale

Long-lived AWS credentials stored in GitHub Secrets increase security risk. OIDC allows GitHub Actions to request temporary credentials from AWS Security Token Service (STS).

## Benefits

- No permanent AWS credentials
- Temporary credentials
- Improved security
- Recommended by AWS

## Trade-offs

- Slightly more complex IAM configuration

---

# Decision 6: IAM Least-Privilege Policy

## Decision

Create a custom IAM policy that grants only the permissions required for deployment.

## Rationale

The deployment pipeline only needs to:

- Upload website files
- Delete outdated files
- List bucket contents
- Create CloudFront invalidations

Granting broader permissions would violate the Principle of Least Privilege.

## Benefits

- Reduced attack surface
- Improved security
- Easier auditing
- Better compliance with AWS best practices

## Trade-offs

- Requires policy maintenance if deployment requirements change

---

# Decision 7: HTML Validation Before Deployment

## Decision

Validate HTML before deploying the website.

## Rationale

Prevent invalid HTML from reaching production by introducing a quality gate in the CI/CD pipeline.

## Benefits

- Early error detection
- Improved website quality
- Increased deployment reliability

## Trade-offs

- Slightly longer pipeline execution time

---

# Decision 8: Automatic CloudFront Cache Invalidation

## Decision

Automatically invalidate the CloudFront cache after each deployment.

## Rationale

CloudFront caches static assets. Without invalidation, users may continue to receive outdated content after a deployment.

## Benefits

- Immediate delivery of new content
- Improved user experience
- Fully automated deployment workflow

## Trade-offs

- Invalidations beyond the free monthly quota incur additional charges

---

# Decision 9: Git-Based Development Workflow

## Decision

Use Git branches for feature development before merging changes into the main branch.

## Rationale

Separating development from production reduces deployment risk and mirrors professional software development practices.

## Benefits

- Cleaner commit history
- Safer releases
- Easier collaboration
- Supports code review workflows

## Trade-offs

- Slightly more Git management

---

# Decision 10: Branch Protection

## Decision

Protect the `main` branch by requiring pull requests and successful workflow execution before merging.

## Rationale

Prevent unvalidated code from reaching production and enforce a controlled deployment process.

## Benefits

- Improved code quality
- Prevents accidental direct commits
- Supports CI/CD quality gates

## Trade-offs

- Adds one extra step before deployment

---

# Security Considerations

The project implements several security controls:

- Private Amazon S3 bucket
- S3 Block Public Access
- HTTPS through CloudFront
- CloudFront Origin Access Control (OAC)
- GitHub OIDC authentication
- Temporary AWS credentials via STS
- IAM least-privilege permissions
- No AWS Access Keys stored in GitHub

---

# Cost Optimization Decisions

The architecture minimizes operational costs by using:

- Amazon S3 instead of EC2
- Amazon CloudFront global caching
- Serverless infrastructure
- Automatic scaling
- No always-on compute resources

---

# AWS Well-Architected Alignment

| Pillar | Implementation |
|---------|----------------|
| Operational Excellence | Automated CI/CD with GitHub Actions |
| Security | Private S3, OAC, OIDC, IAM Least Privilege |
| Reliability | CloudFront, S3 Versioning |
| Performance Efficiency | Global CDN with CloudFront |
| Cost Optimization | Fully serverless architecture |

---

# Alternatives Considered

| Option | Reason Not Selected |
|--------|----------------------|
| EC2 + Nginx | Unnecessary infrastructure for a static website |
| Public S3 Website Hosting | Less secure than using CloudFront with OAC |
| AWS Access Keys | Long-lived credentials present a greater security risk |
| Manual Deployment | Error-prone and not scalable |
| Origin Access Identity (OAI) | Legacy approach; OAC is the recommended modern solution |

---

# Conclusion

The final architecture prioritizes security, automation, operational simplicity, and cost efficiency. By combining Amazon S3, CloudFront, GitHub Actions, GitHub OIDC, and least-privilege IAM policies, the project demonstrates production-oriented cloud engineering practices rather than a basic static website deployment.

These decisions align with the AWS Well-Architected Framework and reflect approaches commonly used in modern cloud infrastructure environments.