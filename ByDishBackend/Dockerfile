FROM golang:1.20
LABEL mantainer=boyulin<boyulin5697@foxmail.com>
RUN mkdir /app
WORKDIR /app
ADD . /app

RUN go build -o main ./main.go
EXPOSE 19200
ENTRYPOINT ["./main"]
