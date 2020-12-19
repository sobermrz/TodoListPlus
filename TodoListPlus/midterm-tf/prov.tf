provider "aws" {
  region = "us-east-2"
}

resource "aws_instance" "flask_server" {

  ami                    = "ami-0a91cd140a1fc148a"
  instance_type          = "t2.micro"
  key_name               = "devOps"
  vpc_security_group_ids = ["sg-0d36885a16445925e"]

  connection {
    host        = self.public_ip
    type        = "ssh"
    user        = "ubuntu"
    timeout     = "1m"
    private_key = "${file("/Users/ruizhi/Desktop/ENCP7220/devOps.pem")}"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get remove docker docker-engine docker.io",
      "sudo apt install -y docker.io ",
      "sudo systemctl start docker",
      "sudo systemctl enable docker",
      "sudo docker run -p 3002:80 -d ruizhi1997/client",
      "sudo docker run -p 3001:3001 -d ruizhi1997/react-backend"
    ]
  }
  tags = {
    name = "mid-term"
  }
}
