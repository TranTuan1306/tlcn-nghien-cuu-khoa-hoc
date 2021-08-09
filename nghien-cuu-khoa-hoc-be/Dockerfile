FROM openjdk:8-alpine
VOLUME /tmp
ADD target/nghien-cuu-khoa-hoc.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=myFile:/dev/./urandom","-jar","/app.jar"]