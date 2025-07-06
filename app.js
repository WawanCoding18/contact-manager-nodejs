const express = require('express')
const { title } = require('process')
const app = express()
const port = 3010
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const cors = require('cors')
const fileSystem = require('fs')
const session = require('express-session')
const flash = require('connect-flash')
const { error } = require('console')
const validator = require('validator')
const Connect = require('./model/db'); // path harus sesuai

//menggunakan view engine ejs
app.set('view engine', 'ejs')

//third party middleware
app.use(expressLayouts)
app.use(morgan('dev'))


app.use(session({
  secret: 'rahasia_superman',     // bisa diubah sesuai kebutuhan
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

//built in middleware`
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())




app.use((req, res, next) => {
  res.locals.errorMsg = req.flash('error');
  res.locals.AlertMsg = req.flash('alert')
  res.locals.errorNumber = req.flash('error')
  next();
});

const load_Contact = async()=>{
    const data_appear = await Connect.find()
    return data_appear
}

app.get('/', async(req,res) => {
   
   console.log('Method yang digunakan:', req.method)
   const contacts = await load_Contact()
     res.render('index', {
         layout: 'layouts/main_layouts',
         title:'Page Home',
         contacts
 
    })


})

app.post('/data', async(req, res) => {
    // Kirim response text biasa
const contacts = await load_Contact()
//    req.flash('info', 'Data success send!')
 const duplikatname = contacts.find(contact =>contact.nama === req.body.nama)
 const duplikatnomor = contacts.find(contact =>contact.nomor === req.body.nomor)

  if(!validator.isMobilePhone(req.body.nomor, 'id-ID')){
    req.flash('error', 'The phone number format does not comply with Indonesian standards.');
    return res.render('formcontact', {
      layout: 'layouts/main_layouts',
      title: "Page Form-Contact",
      errorMsg: req.flash('error'), // Ensure errorMsg is passed for the alert
      oldData: req.body // Pass the submitted data here
    });
    }
    
if (duplikatname || duplikatnomor) {
   req.flash('error', 'This contact already exists');
    return res.render('formcontact', {
      layout: 'layouts/main_layouts',
      title: "Page Form-Contact",
      errorMsg: req.flash('error'), // Ensure errorMsg is passed for the alert
      oldData: req.body // Pass the submitted data here
    });
} else{

  Connect.insertOne(req.body)
    res.redirect('/')
}

});

//Menuju form add new data contact
app.get('/formcontact', (req,res)=>{
    res.render('formcontact',{
      layout: 'layouts/main_layouts',
      title:"Page Form-Contact",
    
    })
})

// delete contact
app.get('/delete/:nama', async(req,res)=>{
const contacts = await load_Contact()
const deleteContactName = decodeURIComponent(req.params.nama);
  await Connect.deleteOne({nama:deleteContactName})
   res.redirect('/')

})


//formupdate
app.get('/edit/:nama', async(req,res)=>{
   const contacts = await load_Contact()
   const NameContact = decodeURIComponent(req.params.nama);
   const editContact = contacts.find(contacts =>contacts.nama === NameContact)

   console.log('Contacts:', contacts);
console.log('Nama dicari:', req.params.nama);


   res.render('formupdate',{
    layout: 'layouts/main_layouts',
    title:"Page Form-Update",
    contacts: editContact
    
   })
})

// post untuk ngolah data yang di edit
app.post('/update', async(req,res)=>{
  
    const contacts = await load_Contact()
    const duplikatname = contacts.find(contact =>contact.nama.trim() === req.body.nama && contact.nama.trim() !== req.body.namalama)
    const duplikatnomor = contacts.find(contact =>contact.nomor.trim() === req.body.nomor && contact.nomor.trim() !== req.body.nomorlama)
    
    
  if(!validator.isMobilePhone(req.body.nomor, 'id-ID')){
    req.flash('error', 'The phone number format does not comply with Indonesian standards.');
    return res.render('formupdate', {
      layout: 'layouts/main_layouts',
      title: "Page Form-Update",
      errorMsg: req.flash('error'), // Ensure errorMsg is passed for the alert
      oldData: req.body,
      contacts
    });
    }

    if(duplikatname){
      req.flash('error', 'This username contact already exists')
      return res.render('formupdate', {
      layout: 'layouts/main_layouts',
      title: "Page Form-Update",
      errorMsg: req.flash('error'), // Ensure errorMsg is passed for the alert
      oldData: req.body,
      contacts
    })
  } else if(duplikatnomor){
      req.flash('error', 'This number phone contact already exists')
      return res.render('formupdate', {
      layout: 'layouts/main_layouts',
      title: "Page Form-Update",
      errorMsg: req.flash('error'), // Ensure errorMsg is passed for the alert
      oldData: req.body,
      contacts
    })
  }else{

    await Connect.updateOne({nama:req.body.namalama},
       {$set:{nama:req.body.nama}}
    )
    await Connect.updateOne({nomor:req.body.nomorlama},
       {$set:{nomor:req.body.nomor}}
    )
     res.redirect('/')
   
  }
  
   
})


app.get('/about', (req,res) => {
  
    console.log('Method yang digunakan:', req.method)
    //  res.sendFile('./about.html', {root: __dirname})
     res.render('about',{
      layout: 'layouts/main_layouts',
      title:"Page About"
      
    })
  
})
app.get('/contact', (req,res) => {
   
    console.log('Method yang digunakan:', req.method)
    //  res.sendFile('./contact.html', {root: __dirname})
     res.render('contact',{
      layout: 'layouts/main_layouts',
      title:"Page Contact"

    })
})


app.use((req,res)=>{
    res.status(404)
    res.send('404')
})


app.listen(port,()=>{
    console.log(`Example app listening at http:localhost:${port}`)
})