# serverless-nestjs
This is an example of creating a function that runs as nestjs using the serverless framework. 

## What is changed.

### add
- `src/index.ts`
- `serverless.yml`

### change
- `package.json`

## How to use
### Prepare

```
$ npm install serverless -g
$ npm install
$ npm start
```

### Development

```bash
$ sls offline
```

```
$ sls offline
Serverless: Starting Offline: dev/us-east-1.

Serverless: Routes for index:
Serverless: ANY /
Serverless: ANY /{proxy*}

Serverless: Offline listening on http://localhost:3000
```

Then browse http://localhost:3000

The logs should be :

```
Serverless: ANY / (λ: index)
[Nest] 5280   - 2019-03-24 14:44   [NestFactory] Starting Nest application...
[Nest] 5280   - 2019-03-24 14:44   [InstanceLoader] AppModule dependencies initialized +11ms
[Nest] 5280   - 2019-03-24 14:44   [RoutesResolver] AppController {/}: +5ms
[Nest] 5280   - 2019-03-24 14:44   [RouterExplorer] Mapped {/, GET} route +2ms
[Nest] 5280   - 2019-03-24 14:44   [NestApplication] Nest application successfully started +1ms
```


## How to Deploy
```bash
$ npm run prestart:prod && sls deploy
```

## Options
### Hot start
See : https://serverless.com/blog/keep-your-lambdas-warm/

These behavior can be fixed with the plugin serverless-plugin-warmup

1 Install the plugin

```
$ npm install serverless-plugin-warmup --save-dev
```

2 Enable the plugin

```
plugins:
  - '@hewmen/serverless-plugin-typescript'
  - serverless-plugin-optimize
  - serverless-offline
  - serverless-plugin-warmup

custom:
  # Enable warmup on all functions (only for production and staging)
  warmup:      
      - production
      - staging
```

**This function is for development.** If you want to use production, change package.json dependencies and serverless.yml.
