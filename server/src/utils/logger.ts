import winston from 'winston'
import 'winston-daily-rotate-file'


winston.configure({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize({all:true,colors:{info:'green',error:'red',debug:'yellow'}}),
          winston.format.simple()
        )
        
       }) ,
      new winston.transports.DailyRotateFile({
        filename:'logs/error-%DATE%.log',
        level: 'error',
        format:winston.format.json()
       })  ,
       new winston.transports.DailyRotateFile({
        filename:'logs/debug-%DATE%.log',
        level: 'debug',
        format:winston.format.json()
       }) ,
       new winston.transports.DailyRotateFile({
        filename:'logs/info-%DATE%.log',
        level: 'info',
        format:winston.format.json()
       }) 
       
    ]
  });
  
  

