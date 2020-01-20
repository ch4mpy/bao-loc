FROM openjdk:11

LABEL maintainer="ch4mp@c4-soft.com"

RUN groupadd spring && useradd -g spring spring
USER spring:spring

VOLUME /tmp
EXPOSE 8080

ADD target/*.jar baoloc.jar
ENTRYPOINT ["java","-jar","baoloc.jar"]
