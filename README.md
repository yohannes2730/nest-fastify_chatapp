
# 🚀 Real-Time Chat Application (NestJS + Fastify)

A high-performance, scalable real-time chat application built using **NestJS** with the **Fastify** adapter. This project demonstrates modern backend architecture with WebSockets, authentication, and efficient message handling for real-time communication.

---

## 📌 Features

* 💬 Real-time messaging using WebSockets
* ⚡ Fast performance with Fastify adapter
* 🔐 JWT-based authentication & authorization
* 👤 User registration and login system
* 🟢 Online/offline user status tracking
* 📡 Event-driven architecture (Gateway-based communication)
* 🗂️ Modular and scalable project structure
* 🧵 Room-based or private messaging support
* 📜 Message history (optional with database integration)

---

## 🏗️ Tech Stack

* **Backend Framework:** NestJS
* **HTTP Adapter:** Fastify
* **WebSockets:** Socket.IO (via NestJS Gateway)
* **Authentication:** JWT (JSON Web Tokens)
* **Database:** MongoDB / PostgreSQL (configurable)
* **ORM/ODM:** Mongoose / Prisma (optional)

---

## 📁 Project Structure

```
src/
│── auth/              # Authentication module (JWT, guards, strategies)
│── users/             # User management module
│── chat/              # Chat module (gateways, services)
│── common/            # Shared utilities, decorators, guards
│── config/            # Environment and configuration setup
│── main.ts            # Application entry point (Fastify setup)
```

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/chat-app.git

# Navigate into project
cd chat-app

# Install dependencies
npm install
```

---

## ▶️ Running the App

```bash
# Development mode
npm run start:dev

# Production build
npm run build
npm run start:prod
```

---

## 🔌 Fastify Setup (main.ts)

```ts
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
```

---

## 🔐 Authentication Flow

1. User registers with email & password
2. Password is hashed (bcrypt)
3. User logs in → receives JWT token
4. Token is used to access protected routes and WebSocket connections

---

## 💬 WebSocket Communication

* Clients connect via Socket.IO
* Events handled in **ChatGateway**
* Example events:

  * `joinRoom`
  * `sendMessage`
  * `receiveMessage`
  * `disconnect`

---

## 📡 Example WebSocket Event

```ts
@SubscribeMessage('sendMessage')
handleMessage(@MessageBody() data: any) {
  return {
    event: 'receiveMessage',
    data: data,
  };
}
```

---

## 🔮 Future Improvements

* 🤖 AI-based smart replies
* 📱 Mobile app integration
* 🔔 Push notifications
* 📎 File & media sharing
* 🧠 Chat analytics and insights
* 🌐 Multi-language support

---

## 🧪 Testing

```bash
npm run test
npm run test:e2e
```

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙌 Contribution

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📧 Contact

For questions or support, reach out via email or open an issue in the repository.

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
