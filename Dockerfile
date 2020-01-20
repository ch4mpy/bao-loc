FROM openjdk:11
LABEL maintainer="ch4mp@c4-soft.com"
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/*.jar
ADD ${JAR_FILE} baoloc.jar
RUN groupadd spring && useradd -g spring spring
USER spring:spring
ENTRYPOINT ["java","-jar","/baoloc.jar"]
