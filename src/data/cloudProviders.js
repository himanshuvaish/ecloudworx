export const cloudProviders = {
  aws: {
    name: "AWS",
    icon: "🟠",
    resources: [
      {
        id: "web-server-01",
        name: "web-server-01",
        type: "EC2 Instance",
        status: "Running",
        cost: "$24/month",
        details: "t3.medium • us-east-1"
      },
      {
        id: "my-app-storage",
        name: "my-app-storage",
        type: "S3 Bucket",
        status: "Active",
        cost: "$12/month",
        details: "250GB • us-west-2"
      },
      {
        id: "production-db",
        name: "production-db",
        type: "RDS Database",
        status: "Available",
        cost: "$89/month",
        details: "MySQL 8.0 • us-east-1"
      }
    ]
  },
  azure: {
    name: "Azure",
    icon: "🔵",
    resources: [
      {
        id: "app-server-vm",
        name: "app-server-vm",
        type: "Virtual Machine",
        status: "Running",
        cost: "$45/month",
        details: "Standard_B2s • East US"
      },
      {
        id: "appdata-storage",
        name: "appdata-storage",
        type: "Blob Storage",
        status: "Online",
        cost: "$18/month",
        details: "180GB • West Europe"
      },
      {
        id: "customer-db",
        name: "customer-db",
        type: "SQL Database",
        status: "Online",
        cost: "$67/month",
        details: "SQL Server • East US"
      }
    ]
  },
  gcp: {
    name: "GCP", 
    icon: "🟢",
    resources: [
      {
        id: "analytics-worker",
        name: "analytics-worker",
        type: "Compute Engine",
        status: "Running",
        cost: "$32/month",
        details: "n1-standard-2 • us-central1"
      },
      {
        id: "backup-bucket",
        name: "backup-bucket",
        type: "Cloud Storage",
        status: "Active",
        cost: "$15/month",
        details: "320GB • us-west1"
      },
      {
        id: "analytics-db",
        name: "analytics-db",
        type: "BigQuery",
        status: "Runnable",
        cost: "$28/month",
        details: "PostgreSQL 14 • us-central1"
      }
    ]
  }
}