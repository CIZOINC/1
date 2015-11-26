# Base image with ruby 2.2.3
FROM ruby:2.2.3
# NGINX
RUN apt-key adv --keyserver hkp://pgp.mit.edu:80 --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
RUN echo "deb http://nginx.org/packages/mainline/debian/ jessie nginx" >> /etc/apt/sources.list

ENV NGINX_VERSION 1.9.6-1~jessie

RUN apt-get update && \
    apt-get install -y ca-certificates nginx=${NGINX_VERSION} nodejs supervisor && \
    rm -rf /var/lib/apt/lists/*

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

# Do not daemonize nginx
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf

# Install nodejs
RUN apt-get update && \
	apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

VOLUME ["/var/cache/nginx"]

ADD config/nginx/nginx-sites.conf /etc/nginx/conf.d/default.conf

# Foreman
RUN gem install foreman

WORKDIR /srv/app/current
ADD Gemfile Gemfile
ADD Gemfile.lock Gemfile.lock
RUN bundle install --without development test

ADD . .

RUN mkdir -p /srv/app/shared/log/
RUN mkdir -p /srv/app/shared/pids/

RUN ln -sf /dev/stdout /srv/app/shared/log/unicorn.stdout.log
RUN ln -sf /dev/stderr /srv/app/shared/log/unicorn.stderr.log

RUN foreman export supervisord ./ -f Procfile -u root -l /var/log

RUN sed -i '1i[supervisord]\nnodaemon=true\n\n' ./app.conf

ENV RAILS_ENV production

EXPOSE 80

CMD bundle exec rake assets:precompile && /usr/bin/supervisord -c ./app.conf

# CMD bundle exec rake assets:precompile && foreman start -f Procfile
