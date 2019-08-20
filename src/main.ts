import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import * as empty from 'is-empty'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnviromentService } from './modules/infrastructure/enviroment/enviroment.service';
import "reflect-metadata";

async function bootstrap() {

  const config = new EnviromentService(`${(empty(process.env.NODE_ENV) ? 'development' : process.env.NODE_ENV.trim())}.env`);

    let app = null;
    const useHttps = config.get('APP_HTTPS') !== 'False';
    if (useHttps) {
        const httpsOptions = {
            key: fs.readFileSync(path.normalize(`${__dirname}/../secrets/key.pem`)),
            cert: fs.readFileSync(path.normalize(`${__dirname}/../secrets/certificate.pem`)),
        };

        app = await NestFactory.create(AppModule, { httpsOptions });
    } else {
        app = await NestFactory.create(AppModule);
    }

    app.enableCors();

    const swaggerDocBuilder = new DocumentBuilder()
        .setTitle('NEST-SERVERLESS')
        .setDescription('Boiplerplate NestJs with serverless framework')
        .setVersion('1.0.0')
        .setSchemes(useHttps ? 'https' : 'http')
        .setBasePath('/api/v1');
    
    if (useHttps) {
        swaggerDocBuilder.addBearerAuth('Authorization', 'header');
    }

    const swaggerOptions = swaggerDocBuilder.build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
    app.use('/api/docs/swagger.json', (req, res) => {
        res.send(swaggerDoc);
    });
    SwaggerModule.setup('/api/docs', app, swaggerDoc);

    app.setGlobalPrefix('/api/v1');

    await app.listen(config.get('APP_PORT'));
}
bootstrap();
