# useful commands

## clean up docker

```
docker system prune -f
```

## start container with iris

```
$ docker-compose up -d
```

## build container with no cache

```
docker-compose build --no-cache --progress=plain
```

## open terminal to docker

```
docker-compose exec iris iris session iris -U IRISAPP
```

## export IRIS Analytics artifacts

```
d ##class(dev.code).export("*.DFI")
```

## build cube

```
do ##class(%DeepSee.Utils).%BuildCube("CubeName")
d ##class(ApacheLogUtils.utils.utils).LogGenerate("dc.data.teccod.pmLog2021", "/irisdev/app/src/data/promjetDec2021.log")
```

## export globals

```
do $System.OBJ.Export("dc*.GBL","/irisdev/app/src/gbl/globals.xml",,.errors)
zw errors
```
