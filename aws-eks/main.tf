module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "common-eks-cluster"
  cluster_version = "1.30" # Requested version

  # Public access to cluster endpoint (for kubectl)
  cluster_endpoint_public_access  = true

  # Critical setting for Webhook (Admission Controller):
  # Grant admin permissions to the cluster creator
  enable_cluster_creator_admin_permissions = true

  vpc_id                   = module.vpc.vpc_id
  subnet_ids               = module.vpc.private_subnets
  control_plane_subnet_ids = module.vpc.intra_subnets

  # EKS Managed Node Group
  eks_managed_node_groups = {
    standard = {
      min_size     = 1
      max_size     = 2
      desired_size = 2

      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"
    }
  }

  # Security Group Rules for Datadog Admission Controller
  # Allow access from Cluster (Control Plane) to Nodes on Port 8443
  node_security_group_additional_rules = {
    ingress_cluster_webhook = {
      description                   = "Cluster API to Node Webhook (Datadog)"
      protocol                      = "tcp"
      from_port                     = 8443
      to_port                       = 8443
      type                          = "ingress"
      source_cluster_security_group = true
    }
    # For TCP Mode (Manual Injection)
    ingress_cluster_agent = {
      description                   = "Node to Node Agent Communication"
      protocol                      = "tcp"
      from_port                     = 8126
      to_port                       = 8126
      type                          = "ingress"
      self                          = true
    }
  }

  tags = {
    Environment = "dev"
    Terraform   = "true"
    Project     = "common-infrastructure"
  }
}
