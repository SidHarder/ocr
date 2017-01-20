'use strict'

var util = require('util')
var Tesseract = require('tesseract.js')
var fs = require('fs')

var wordsOfInterest = ['NAME', 'SEX', 'CITY', 'EMPLOYMENT']

Tesseract.recognize("test.png")
         .progress(function  (p) { console.log('progress', p)    })
         .then(function (result)
         {
           var foundWords = [];
           var lines = [];
           for(var i=0; i<result.lines.length; i++) {
             var line = {
               words: []
             }

             for(var j=0; j<result.lines[i].words.length; j++) {
               var word = {
                 text: result.lines[i].words[j].text,
                 confidence: result.lines[i].words[j].confidence
               }
               line.words.push(word)
               //line = line + ' ' + result.lines[i].words[j].text
             }
             lines.push(line)
           }

           for(var a=0; a<lines.length; a++) {
             for(var b=0; b<lines[a].words.length; b++) {
               if(lines[a].words[b].text == 'NAME:') {

                 var patient = {
                   FirstName: lines[a].words[b + 1].text,
                   LastName: lines[a].words[b + 2].text,
                   MiddleInitial: lines[a].words[b + 3].text
                 }

               }
             }
           }

           console.log(JSON.stringify(patient))
           process.exit(0)
           
         })
