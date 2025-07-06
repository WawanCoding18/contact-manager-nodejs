const express = require('express')
const { title } = require('process')
const app = express()
const port = 3300
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/wawan');

// const contactSchema = new mongoose.Schema({
//   nama: String,
//   nomor: String
// });

// const Contact = mongoose.model('Contact', contactSchema, "my_bestFriend");

// const contact = new Contact({ nama: 'Abdul', nomor: '08123456789' });


// async function f() {
//    const result = await Contact.find()
//    const update = await Contact.findByIdAndUpdate( ('6869ed40423b62006ab46b1d') , { $set: { nama: 'Agus' } });
//    const dlt = await Contact.findByIdAndDelete('6869ed9c70abb70e645c855e')
//    contact.save
//    console.log(dlt)
// }

// f()



// app.get('/', (req, res) => {
//   res.send('hello world')
// })

// app.get('/delete/:nama', (req,res)=>{
//     res.send(`Delete nama: ${req.params.nama}`)
// })

// app.listen(port,()=>{
//     console.log(`server is running port ${port}`)
// })






















    //  const db = client.db(dbname)
    //  const result = await db.collection(dbc).insertOne({
    //      nama:"Abduloh",
    //      hp:"08587600991212"
    //  })
    //  console.log("Data berhasil disimpan", result)

    //  const finded = await db.collection(dbc).find({ _id: new ObjectId('68688c230c291b0064718dc5')}).toArray()
    //  console.log(finded)
    
    // const replace = await db.collection(dbc).updateMany({
    //    nama:"Bakwan Al iman"
    // }, {
    //    $set:{
    //       nama:"Koroton"
    //    }
    // })

    // console.log(replace)
   
    // const dlt = {nama:"Koroton"}
    // const result = await db.collection(dbc).deleteMany(dlt)
    // console.log(result)
   