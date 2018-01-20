# wiki
a wiki system

## feature
 
* **watch folder**, auto scan the actions: addfile,adddir,changefile,deletefile,delete dir
* **easy read**, easy to read, easy to index,easy to search

![](./screen.png)

## how to debug
debug this app need to install yog2 and fis
```
npm i fis -g
npm i yog2 -g
```
1. modify markdown root dir '/base/conf/plugins/filescan.js'
2. modify mysql conf '/base/conf/plugins/knex.js'
3. start runtime:
```
# terminal 1
cd base
npm i	## first time，install the dependencies
yog2 run

# terminal 2
cd home
npm run dev
```
8. preview wiki，for example: [http://127.0.0.1:8081](http://127.0.0.1:8081)

