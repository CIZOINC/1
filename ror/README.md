# CIZO

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

Development for both the web app and admin panel is done on the web/develop branch. This branch is then merged into ror/develop and, subsequently, ror/master for deployment. 

### Deploying

Deployment is done using AWS's Elastic Beanstalk. To deploy a new version use the following command to deploy to staging, replacing <version> with the current version (eg v0.0.1).

```
eb deploy --profile cizo cizo-staging --label "api-`git rev-parse HEAD`"
```

Once deployment has completed and has been validated, use the following command to deploy that version to production

```
eb deploy --profile cizo cizo-production --version "api-`git rev-parse HEAD`"
```

Deploys to staging occur automatically after merging into ror/master. Once an automatic deploy is completed, it is tested using the tests/integration branch. All of this is handled by [Jenkins](http://ci-web.weezlabs.com:8070/login?from=%2F). Production deploys must be done using the above command or through the Elastic Beanstalk console. 


### Server Provisioning

Server provisioning is handled by AWS's Elastic Beanstalk. Servers are built using the enivornment's base configuration and modified using files located within the .ebextensions folder. More information regarding Elastic Beanstalk can be found [here](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html).

### Auto Scaling

Auto scaling is handled by via Auto Scaling groups configured by Elastic Beanstalk. 

### DNS 

DNS is handled through AWS's Route 53. More information regarding Route 53 can be found [here](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html).

### SSL

Both staging and production are provisioned with an SSL certificate provided by AWS's Certificate Manager. SSL was enabled using [this tutorial](https://medium.com/@arcdigital/enabling-ssl-via-aws-certificate-manager-on-elastic-beanstalk-b953571ef4f8#.np32hxx2s). SSL certificate rotation is handled automatically by Amazon. More information regarding Certificate Manager can be found [here](https://aws.amazon.com/certificate-manager/).