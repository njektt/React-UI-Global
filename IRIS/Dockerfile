FROM intersystemsdc/iris-community

USER root   

RUN apt-get update && apt-get install -y \
	nano \
	python3-pip \
	python3-venv

WORKDIR /opt/irisapp
RUN chown ${ISC_PACKAGE_MGRUSER}:${ISC_PACKAGE_IRISGROUP} /opt/irisapp
USER ${ISC_PACKAGE_MGRUSER}

COPY . /opt/irisapp

RUN iris start IRIS \
	&& iris session IRIS < /opt/irisapp/iris.script \
	&& iris stop IRIS quietly

ENV PYTHONPATH=/usr/irissys/bin/irispython
ENV SRC_PATH=/opt/irisapp
ENV IRISUSERNAME=SuperUser
ENV IRISPASSWORD=SYS
ENV IRISNAMESPACE=IRISAPP

RUN pip3 install -r ${SRC_PATH}/src/requirements.txt