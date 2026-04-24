output "ec2_public_ip" {
  description = "The public IP of the EC2 app server"
  value       = aws_instance.app_server.public_ip
}

output "rds_endpoint" {
  description = "The endpoint of the RDS database"
  value       = aws_db_instance.db.endpoint
}

output "s3_bucket" {
  description = "The name of the provisioned S3 bucket"
  value       = aws_s3_bucket.app_bucket.bucket
}

output "load_balancer_dns" {
  description = "The DNS name of the Load Balancer"
  value       = aws_lb.app_lb.dns_name
}