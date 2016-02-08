# CIZO Web App

### Getting Started

The following is required to develop for this project:
- [Docker](https://docs.docker.com/engine/installation/mac/)
- [ElasticBeanstalk CLI](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)
- AWS IAM Access Key and Secret (if deploying)

### Development

Development is done using Docker for environment management. 

To bootstrap the Docker environment, run the following command within the "ror" directory of this repository:

```
docker-compose build
```

After the build completes, run:

```
docker-compose --x-networking up 
```

Once the launch has completed (when no additional logs are outputted to the screen), open a new shell and then run the following two commands:

```
docker-compose --x-networking run web rake db:create
docker-compose --x-networking run web rake db:migrate
```

Once completed, exit the original shell by pressing `ctrl+c`.

To run the environment, use the following command:

```
docker-compose --x-networking up
```

Migrations can be performed by running the following:

```
docker-compose --x-networking run web rake db:migrate
```

Development should be done on seperate feature branches. Pull requests should be submitted to merge the feature branches into develop. 

Feature branches must use the following naming convention:
```
ror/feature/<JIRA-ISSUE>-Short_Description
```
where `<JIRA-ISSUE>` is replaced with the JIRA issue number. For example,
```
ror/feature/SEN-30_Deployment
```

### Deploying

Deployment is done using AWS's Elastic Beanstalk. To deploy a new version use the following command to deploy to staging, replacing <version> with the current version (eg v0.0.1).

```
eb deploy --profile cizo cizo-staging --label "`git describe  --abbrev=0`"  --message "commit `git rev-parse --short HEAD`" 
```

Once deployment has completed and has been validated, use the following command to deploy that version to production

```
eb deploy --profile cizo cizo-production --version "`git describe  --abbrev=0`"
```

### SSL

At this time, both staging and production are not configured to use SSL. 

To enable SSL, the following needs to be done:
- Purchase wildcard SSL certificate
- [Upload SSL certificate to IAM](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs_manage.html)
- Update the 'SSLCertificateId' of '01-load-balancer.config.bak' with the one returned from the previous step
- Update the server.crt and server.key content of '02-nginx-proxy.config.bak' with the certificate and private key of the wildcard SSL certificate
- Rename '01-load-balancer.config.bak' to '01-load-balancer.config'
- Rename '02-nginx-proxy.config.bak' to '02-nginx-proxy.config'
- Deploy to staging using `eb deploy cizo-staging`
- Validate staging
- Deploy to production using `eb deploy cizo-production`
- Validate production