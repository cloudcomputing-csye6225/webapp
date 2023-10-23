packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.0.0"
    }
  }
}

        variable "aws_region" {
  type    = string
  default = "us-east-1"



}

variable "source_ami" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9"
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "ami_description" {
  type    = string
  default = "AMI for CSYE 6225"
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}

variable "ami_accessible_regions" {
  type    = string
  default = "us-east-1"
}

variable "ami_accessible_users" {
  type    = string
  default = "416512529761" // Demo user
}

variable "vpc_id" {
  type    = string
  default = "vpc-077852abb4df2b3e1"
}

variable "profile" {
  type    = string
  default = "dev"
}

variable "device_name" {
  type    = string
  default = "/dev/xvda"
}

variable "volume_size" {
  type    = number
  default = 25
}

variable "volume_type" {
  type    = string
  default = "gp2"
}

variable "file_source" {
  type    = string
  default = "webapp.zip"
}

variable "file_destination" {
  type    = string
  default = "~/webapp.zip"
}

variable "shell_source" {
  type    = string
  default = "./packer/script.sh"
}
variable "root_device_type" {
  type    = string
  default = "ebs"
}

variable "virtualization_type" {
  type    = string
  default = "hvm"
}

source "amazon-ebs" "my-ami" {
  profile         = "${var.profile}"
  region          = "${var.aws_region}"
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "${var.ami_description}"
  ami_regions     = ["${var.ami_accessible_regions}"]
  // vpc_id          = "${var.vpc_id}"
  instance_type = "${var.instance_type}"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  ami_users     = ["${var.ami_accessible_users}"]

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "${var.device_name}"
    volume_size           = "${var.volume_size}"
    volume_type           = "${var.volume_type}"
  }
}

build {
  sources = ["source.amazon-ebs.my-ami"]

  provisioner "file" {
    source      = "${var.file_source}"
    destination = "${var.file_destination}"
  }

  provisioner "shell" {
    scripts      = ["${var.shell_source}"]
    pause_before = "10s"
    timeout      = "10s"
  }
}
