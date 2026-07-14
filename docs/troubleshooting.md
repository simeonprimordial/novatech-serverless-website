# Troubleshooting Guide

This document provides solutions to common issues encountered while developing, deploying, and maintaining the **NovaTech Serverless Website** project.

---

# Table of Contents

- Website not updating after deployment
- GitHub Actions workflow fails
- OIDC authentication fails
- CloudFront returns Access Denied
- S3 Access Denied
- HTML validation fails
- CloudFront cache not refreshing
- GitHub Secrets not found
- IAM permission errors
- Branch protection prevents merge
- Useful AWS CLI commands

---

# 1. Website Not Updating After Deployment

## Symptoms

- Deployment completed successfully.
- GitHub Actions reports success.
- Website still shows the old version.

## Possible Causes

- CloudFront cached the previous files.
- Browser cache.
- Deployment failed before syncing files.

## Resolution

1. Verify the workflow completed successfully.
2. Confirm CloudFront invalidation succeeded.
3. Perform a hard refresh.

Windows

```text
Ctrl + Shift + R
```

macOS

```text
Cmd + Shift + R
```

Alternatively, clear your browser cache or test using an incognito/private browsing window.

---

# 2. GitHub Actions Workflow Fails

## Symptoms

GitHub Actions displays:

```text
Workflow failed
```

## Resolution

Open:

```
GitHub Repository
→ Actions
→ Select Failed Workflow
```

Review the logs to identify the step that failed.

Common failures include:

- Missing GitHub Secrets
- Incorrect IAM permissions
- HTML validation errors
- OIDC authentication errors

---

# 3. OIDC Authentication Fails

## Symptoms

```
Could not assume role
```

or

```
Not authorized to perform sts:AssumeRoleWithWebIdentity
```

## Possible Causes

- Incorrect IAM trust policy
- Wrong GitHub repository
- Wrong branch configured
- Incorrect audience
- Wrong Role ARN

## Resolution

Verify:

- Identity Provider:
  - `token.actions.githubusercontent.com`
- Audience:
  - `sts.amazonaws.com`
- GitHub Organization:
  - `simeonprimordial`
- Repository:
  - `novatech-serverless-website`
- Branch:
  - `main`

Also verify the GitHub secret:

```
AWS_ROLE_ARN
```

matches the correct IAM Role ARN.

---

# 4. Missing AWS Region

## Symptoms

```
Input required and not supplied: aws-region
```

## Cause

The GitHub secret:

```
AWS_REGION
```

does not exist or is empty.

## Resolution

Create the following GitHub Secret:

| Name | Value |
|------|-------|
| AWS_REGION | us-east-1 |

---

# 5. GitHub Secrets Not Found

## Symptoms

```
Secret not found
```

or

```
Input required and not supplied
```

## Cause

Multiple values were stored inside a single GitHub Secret instead of creating separate secrets.

## Resolution

Create separate secrets:

| Secret | Value |
|---------|-------|
| AWS_ROLE_ARN | IAM Role ARN |
| AWS_REGION | us-east-1 |
| S3_BUCKET_NAME | novatech-serverless-website-2026 |
| CLOUDFRONT_DISTRIBUTION_ID | E3765WIX6IH80Z |

---

# 6. CloudFront Returns Access Denied

## Symptoms

```
Access Denied
```

appears when opening the CloudFront URL.

## Possible Causes

- Bucket policy incorrect
- OAC not attached
- CloudFront origin configured incorrectly
- S3 bucket still private without CloudFront access

## Resolution

Verify:

- S3 Block Public Access is enabled.
- CloudFront uses Origin Access Control (OAC).
- Bucket policy allows only CloudFront to read objects.
- CloudFront origin points to the S3 REST endpoint (not the static website endpoint).

---

# 7. Amazon S3 Access Denied

## Symptoms

```
AccessDenied
```

during deployment.

## Possible Causes

- IAM Role missing permissions.
- Incorrect bucket ARN.
- Incorrect object ARN.

## Resolution

Verify the IAM policy includes:

- s3:ListBucket
- s3:GetBucketLocation
- s3:GetObject
- s3:PutObject
- s3:DeleteObject

for:

```
arn:aws:s3:::novatech-serverless-website-2026
```

and

```
arn:aws:s3:::novatech-serverless-website-2026/*
```

---

# 8. HTML Validation Fails

## Symptoms

GitHub Actions stops at:

```
Validate HTML
```

## Cause

Invalid HTML.

Examples:

- Missing closing tags
- Invalid nesting
- Duplicate IDs
- Invalid attributes

## Resolution

Run the validator locally or review the GitHub Actions logs to identify the specific validation errors.

---

# 9. CloudFront Cache Not Refreshing

## Symptoms

Deployment succeeded but changes are not visible.

## Resolution

Verify the workflow executed:

```
aws cloudfront create-invalidation
```

Check the CloudFront console to confirm the invalidation completed successfully.

If necessary, create a manual invalidation:

```
/*
```

---

# 10. Branch Protection Prevents Merge

## Symptoms

GitHub displays:

```
Merge blocked
```

## Cause

Required status checks have not passed.

## Resolution

1. Open the Pull Request.
2. Review failed GitHub Actions jobs.
3. Fix the issue.
4. Push the changes.
5. Wait for the workflow to pass.
6. Merge the Pull Request.

---

# 11. Deployment Succeeds but Files Are Missing

## Symptoms

Some website assets do not load.

Examples:

- Images
- CSS
- JavaScript

## Possible Causes

- Incorrect folder structure
- Wrong file paths
- Files not committed to Git
- Incorrect `aws s3 sync` source directory

## Resolution

Verify the project structure:

```text
website/
├── index.html
├── style.css
├── script.js
└── assets/
```

Ensure the deployment workflow syncs the correct directory:

```bash
aws s3 sync website/ s3://novatech-serverless-website-2026 --delete
```

---

# 12. Useful AWS CLI Commands

## Sync Website

```bash
aws s3 sync website/ s3://novatech-serverless-website-2026 --delete
```

---

## List Bucket Objects

```bash
aws s3 ls s3://novatech-serverless-website-2026
```

---

## Create CloudFront Invalidation

```bash
aws cloudfront create-invalidation \
  --distribution-id E3765WIX6IH80Z \
  --paths "/*"
```

---

## Verify AWS Identity

```bash
aws sts get-caller-identity
```

---

# Preventive Best Practices

- Keep the S3 bucket private.
- Use CloudFront Origin Access Control (OAC).
- Use GitHub OIDC instead of long-lived AWS access keys.
- Apply IAM least-privilege permissions.
- Validate HTML before deployment.
- Protect the `main` branch with pull requests and required status checks.
- Review GitHub Actions logs after every deployment.
- Enable S3 Versioning for recovery.
- Test deployments in a development branch before merging into production.

---

# Additional Resources

- AWS S3 Documentation
- Amazon CloudFront Documentation
- AWS IAM Documentation
- GitHub Actions Documentation
- GitHub OIDC Documentation
- AWS Well-Architected Framework

---

# Conclusion

Most deployment issues can be diagnosed by reviewing the GitHub Actions workflow logs and verifying the AWS configuration. The combination of GitHub Actions, GitHub OIDC, Amazon S3, CloudFront, and IAM provides a secure, automated, and production-ready deployment pipeline when configured correctly.