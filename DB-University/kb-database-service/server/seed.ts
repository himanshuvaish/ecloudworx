import { db } from "./db.js";
import { categories, articles } from "../shared/schema.js";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing data
    await db.delete(articles);
    await db.delete(categories);

    // Insert categories
    const [cat1, cat2, cat3] = await db.insert(categories).values([
      {
        name: "Getting Started",
        icon: "fas fa-cloud-upload",
        description: "Essential guides for beginners with eCloudWorx"
      },
      {
        name: "AWS Management", 
        icon: "fab fa-aws",
        description: "Amazon Web Services integration and management"
      },
      {
        name: "Security & Compliance",
        icon: "fas fa-shield-alt", 
        description: "Security best practices and compliance guidelines"
      }
    ]).returning();

    // Insert sample articles
    await db.insert(articles).values([
      {
        title: "Getting Started with eCloudWorx Multi-Cloud Dashboard",
        content: `# Getting Started with eCloudWorx Multi-Cloud Dashboard

## Overview
Welcome to eCloudWorx, your unified solution for managing cloud resources across AWS, Azure, and Google Cloud Platform. This comprehensive guide will help you set up and configure your dashboard for optimal multi-cloud management.

## Prerequisites
Before you begin, ensure you have:
- Administrative access to your cloud accounts
- Valid credentials for AWS, Azure, and/or GCP
- Basic understanding of cloud computing concepts

## Step 1: Initial Setup
1. **Account Creation**: Sign up for your eCloudWorx account
2. **Cloud Provider Integration**: Connect your existing cloud accounts
3. **Permission Configuration**: Set up necessary IAM roles and permissions

## Step 2: Dashboard Configuration
The eCloudWorx dashboard provides real-time visibility into your multi-cloud environment:
- Resource inventory across all connected clouds
- Cost optimization recommendations
- Security compliance monitoring
- Automated backup and disaster recovery status

## Step 3: Best Practices
- Regularly review cost reports and optimization suggestions
- Set up automated alerts for unusual activity
- Implement proper tagging strategies for resource organization
- Enable multi-factor authentication for enhanced security

## Next Steps
Once your dashboard is configured, explore advanced features like automated scaling policies, cross-cloud resource migration, and comprehensive reporting tools.

For additional help, contact our support team or visit the troubleshooting section.`,
        excerpt: "Learn how to set up and configure your eCloudWorx dashboard for unified multi-cloud management. This step-by-step guide covers account setup, cloud provider integration, and essential configuration steps.",
        categoryId: cat1.id,
        tags: ["setup", "dashboard", "multi-cloud", "getting-started"],
        readTime: 12,
        isFeatured: true,
        isVerified: true,
        views: 3247
      },
      {
        title: "AWS Cost Optimization with eCloudWorx Analytics",
        content: `# AWS Cost Optimization with eCloudWorx Analytics

## Introduction
Effective cost management is crucial for any AWS deployment. eCloudWorx provides powerful analytics tools to help you identify cost-saving opportunities and optimize your AWS spending.

## Understanding AWS Cost Components
### Compute Costs
- EC2 instances and their utilization patterns
- Reserved Instance opportunities
- Spot Instance recommendations for non-critical workloads

### Storage Costs
- S3 storage class optimization
- EBS volume rightsizing
- Lifecycle policies for automated cost reduction

## eCloudWorx Cost Analytics Features
Our platform provides:
- **Real-time Cost Tracking**: Monitor expenses as they occur
- **Predictive Analytics**: Forecast future spending based on usage patterns
- **Automated Recommendations**: AI-powered suggestions for cost optimization
- **Budget Alerts**: Proactive notifications when spending thresholds are reached

## Implementation Steps
1. **Enable Cost Analytics**: Activate detailed billing in your eCloudWorx dashboard
2. **Set Budget Thresholds**: Configure alerts for different service categories
3. **Review Recommendations**: Weekly analysis of optimization opportunities
4. **Implement Changes**: Apply suggested optimizations with one-click deployment

## Advanced Optimization Techniques
- Implement automated shutdown schedules for development environments
- Use CloudWatch metrics to identify underutilized resources
- Optimize data transfer costs through strategic placement
- Leverage AWS Cost Explorer integration for detailed analysis

## Monitoring and Maintenance
Regular monitoring ensures continued optimization:
- Weekly cost review meetings
- Monthly optimization reports
- Quarterly strategy assessments
- Annual architecture reviews

## Conclusion
With eCloudWorx analytics, AWS cost optimization becomes a data-driven process rather than guesswork. Start implementing these strategies today to see immediate impact on your cloud spending.`,
        excerpt: "Discover how to reduce AWS costs using eCloudWorx advanced analytics. Learn about cost tracking, optimization recommendations, and automated tools that can save you thousands on your cloud bill.",
        categoryId: cat2.id,
        tags: ["aws", "cost-optimization", "analytics", "savings"],
        readTime: 18,
        isFeatured: false,
        isVerified: true,
        views: 1856
      },
      {
        title: "Multi-Cloud Security Compliance Framework",
        content: `# Multi-Cloud Security Compliance Framework

## Executive Summary
In today's multi-cloud environment, maintaining consistent security and compliance across different cloud providers is challenging but essential. This comprehensive framework provides guidelines for implementing robust security measures across AWS, Azure, and Google Cloud Platform.

## Core Security Principles
### Defense in Depth
- Network security layers
- Identity and access management
- Data encryption at rest and in transit
- Application-level security controls
- Monitoring and incident response

### Zero Trust Architecture
Implement zero trust principles:
- Never trust, always verify
- Assume breach mentality
- Least privilege access
- Continuous monitoring and validation

## Compliance Requirements
### Industry Standards
- **SOC 2 Type II**: Service organization controls
- **ISO 27001**: Information security management
- **GDPR**: General Data Protection Regulation
- **HIPAA**: Health Insurance Portability and Accountability Act
- **PCI DSS**: Payment Card Industry Data Security Standard

### Cloud-Specific Compliance
Each cloud provider offers compliance tools:
- **AWS**: Config Rules, Security Hub, GuardDuty
- **Azure**: Security Center, Policy, Sentinel
- **GCP**: Security Command Center, Policy Intelligence

## Implementation Strategy
### Phase 1: Assessment
1. Current state security audit
2. Compliance gap analysis
3. Risk assessment and prioritization
4. Resource and timeline planning

### Phase 2: Foundation
1. Identity and access management setup
2. Network security configuration
3. Data classification and protection
4. Baseline security controls

### Phase 3: Advanced Controls
1. Automated compliance monitoring
2. Advanced threat detection
3. Incident response procedures
4. Security awareness training

### Phase 4: Continuous Improvement
1. Regular compliance audits
2. Security metrics and KPIs
3. Threat intelligence integration
4. Technology updates and patches

## eCloudWorx Security Features
Our platform provides unified security management:
- **Compliance Dashboard**: Real-time compliance status across all clouds
- **Automated Remediation**: Fix security issues automatically
- **Risk Scoring**: Prioritize security efforts based on actual risk
- **Audit Trails**: Complete logging for compliance reporting

## Best Practices Checklist
- [ ] Multi-factor authentication enabled for all users
- [ ] Regular access reviews and cleanup
- [ ] Encryption enabled for all data stores
- [ ] Network segmentation implemented
- [ ] Logging and monitoring configured
- [ ] Incident response plan tested
- [ ] Regular security training completed
- [ ] Third-party risk assessments current

## Conclusion
A comprehensive multi-cloud security framework requires careful planning, consistent implementation, and continuous monitoring. With eCloudWorx, you can maintain the highest security standards while leveraging the benefits of multiple cloud providers.

For detailed implementation guides and technical specifications, contact our security specialists.`,
        excerpt: "Implement a comprehensive security and compliance framework across your multi-cloud environment. Learn best practices for SOC2, GDPR, HIPAA compliance and how eCloudWorx simplifies security management.",
        categoryId: cat3.id,
        tags: ["security", "compliance", "multi-cloud", "framework", "best-practices"],
        readTime: 22,
        isFeatured: true,
        isVerified: true,
        views: 2893
      }
    ]);

    // Update category article counts
    await db.update(categories).set({ articleCount: 1 }).where(eq(categories.id, cat1.id));
    await db.update(categories).set({ articleCount: 1 }).where(eq(categories.id, cat2.id));
    await db.update(categories).set({ articleCount: 1 }).where(eq(categories.id, cat3.id));

    console.log("✅ Database seeded successfully!");
    console.log("📊 Created 3 categories and 3 articles");
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();