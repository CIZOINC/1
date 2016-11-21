# CIZO Web App and Admin Panel

### Building

#### Web App

To prepare the web_client for deployment, gulp is used to build and copy the files into the ror/public/web_client directory.

```
cd web_client
gulp build-all
```

To serve with livereload option use

```
cd web_client
gulp serve
```

**NOTE** There is a known bug with the above build commands where the first run after changes have been made results in a build that does not have the new changes. This should be fixed but, in the mean time, running the build-all commands twice should resolve the issue. 

#### Admin Panel

To prepare the admin_panel for deployment, grunt is used to build and copy the files into the ror/public/admin_panel directory.

```
cd admin_panel
grunt build-all
```

### Deploying

Deployment of the web_client and admin_panel is done by merging web/develop into ror/develop, ror/develop into ror/master and following the steps outlined in the README located within the ror folder on the ror/develop branch. Deploying either the web_client or admin_panel will also deploy the API. 