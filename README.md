# CheckPoint 1100 Appliance config generator
### INSTALLATION:
1. git pull https://github.com/irom77/repish-server.git
2. cd repish-server
2. bower install
3. npm install
4. forever start bin/www

### USE:
 **http://wwww:3001/**
 
### NOTICE:
template config is included in index.ejs: 
<div class="config1100" ng-include="'data/config1100.html'"></div>
see also http://www:3001/data/config1100.html
Variables in curly brackets: 
{{hostname}}, {{subnet}} etc
 
