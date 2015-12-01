# CIZO Web App

## Synopsis

## Getting Started

The following is required to develop for this project:
- [Docker](https://docs.docker.com/engine/installation/mac/)
- [ElasticBeanstalk CLI](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)

### Development

Development is done using Docker for environment management. 

To bootstrap the Docker environment, run the following command within the "ror" directory of this repository:

```
docker-compose build
```

After the build completes, run:

```
docker-compose up 
```

Once the launch has completed (no additional logs are outputted to the screen), press ctrl-c and then run the following two commands:

```
docker-compose run web rake db:create
docker-compose run web rake db:migrate
```

To run the environment, use the following command:

```
docker-compose up
```

Migrations can be performed by running the following:

```
docker-compose run web rake db:migrate
```


### Deploying

Deployment is done using ElasticBeanstalk. To deploy your current working directory use the following (replacing environment with either cizo-staging or cizo-production):

```
eb deploy environment
```

**NOTE** Deployments to production should only happen from the ror/master branch.
