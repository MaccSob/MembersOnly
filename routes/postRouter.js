const { Router } = require("express");
const express = require('express');
const app = express();
const indexRouter = Router()


const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    },
    {
    text: "Hey folks!",
    user: "Jacob",
    added: new Date()
    } 
 ];