provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "flask_server" {

  ami                    = "ami-0885b1f6bd170450c"
  instance_type          = "t2.micro"
  key_name               = "weibo"
  vpc_security_group_ids = ["sg-030145f3a56a6bf81"]

  connection {
    host        = self.public_ip
    type        = "ssh"
    user        = "ubuntu"
    timeout     = "1m"
    private_key = "${file("/Users/daiweibo/Downloads/weibo.pem")}"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt install -y docker.io ",
      "sudo systemctl start docker",
      "sudo systemctl enable docker",
      "sudo docker run -p 80:80 -d weibodai/react-midterm:latest",
      "sudo docker run -p 3002:3002 -d weibodai/backendmidterm:latest"
    ]
  }
  tags = {
    name = "mid-term"
  }
}

