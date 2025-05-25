
# create cluster without nodegroup
eksctl create cluster --name=sm-app \
    --region=eu-west-2 \
    --vpc-private-subnets=subnet-05f1fcadc04a62f2a,subnet-0d30afd3bda76c5c3 \
    --without-nodegroup

# Associate IAM OIDC
eksctl utils associate-iam-oidc-provider \
    --region=eu-west-2 \
    --cluster=sm-app \
    --approve

# Create EKS nodegroup with private subnets
eksctl create nodegroup --cluster=sm-app \
    --region=eu-west-2 \
    --name=sm-app-node \
    --subnet-ids=subnet-05f1fcadc04a62f2a,subnet-0d30afd3bda76c5c3 \
    --node-type=t3.medium \
    --nodes=4 \
    --nodes-min=4 \
    --nodes-max=6 \
    --node-volume-size=20 \
    --ssh-access \
    --ssh-public-key=sm-kube \
    --managed \
    --asg-access \
    --external-dns-access \
    --full-ecr-access \
    --appmesh-access \
    --alb-ingress-access \
    --node-private-networking

# Delete eks cluster
# eksctl delete cluster <cluster-name> --region=<your-region>

# Other resources to delete
# - natgateway
# - elasticip
# - mysql instance
# - postgres instance