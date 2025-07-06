const express = require('express')
const { title } = require('process')
const app = express()
const port = 3300
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/Contact');

const contactSchema = new mongoose.Schema({
  nama: String,
  nomor: String
});

const Connect = mongoose.model('Connect', contactSchema, 'Data-Contact');

module.exports = Connect;


