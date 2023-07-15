# SystemDesignApi


Features
- Load balancing: Nginx acts as a reverse proxy and distributes incoming requests across multiple backend servers.
- Caching: Nginx caching mechanism is employed to store and serve frequently requested resources, reducing the load on backend servers and improving response time.
- High Availability: The microservice is deployed on two AWS EC2 t2.micro instances, ensuring redundancy and fault tolerance.
- Scalability: The microservice can be easily scaled by adding or removing backend servers or by utilizing larger EC2 instance types.
- Security: Nginx can be configured with SSL/TLS certificates to enable secure communication between clients and the backend servers.
- Logging: Detailed logging is enabled to capture information about incoming requests, load balancing decisions, and caching activities for monitoring and debugging purposes.
