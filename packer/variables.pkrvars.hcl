profile                = "dev"
aws_region             = "us-east-1"
source_ami             = "ami-06db4d78cb1d3bbf9"
ssh_username           = "admin"
ami_description        = "AMI for CSYE 6225"
instance_type          = "t2.micro"
ami_accessible_regions = "us-east-1"
ami_accessible_users   = "416512529761"
vpc_id                 = "vpc-077852abb4df2b3e1"
device_name            = "/dev/xvda"
volume_size            = 25
volume_type            = "gp2"
file_source            = "webapp.zip"
file_destination       = "~/webapp.zip"
shell_source           = "./packer/script.sh"
root_device_type       = "ebs"
virtualization_type    = "hvm"