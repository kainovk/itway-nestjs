import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
    const PORT = process.env.PORT || 8080;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Крутой веб-сервис для хранения информации о фильмах')
        .setDescription('Задание по курсу ITWay')
        .setVersion('1.0.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

start();
