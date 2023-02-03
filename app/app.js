const express = require('express');

const joi = require('@hapi/joi')

const app = express();

app.use(express.json());



const usuarios = [
    {id:1 , nombre:'Marcos'},
    {id:2 , nombre:'Maria'},
    {id:3 , nombre:'Roberto'},
    {id:4 , nombre:'Gabriel'},
    {id:5 , nombre:'Juan'}
];




app.post('/api/usuarios', (req,res) => {


    const schema = joi.object({
        nombre: joi.string().min(3).required()
    });

    const {error, value} = schema.validate({ nombre: req.body.nombre});

    if(!error){
        const usuario = {

            id: usuarios.length + 1 ,
            nombre: value.nombre
    
        };
        usuarios.push(usuario);
        res.send(usuario);
    }else{
        const mensaje = error.details[0].message
        res.status(400).send(mensaje)
    }

/*
    if(!req.body.nombre  || req.body.nombre.length < 3  ){
        //400  Bad request
        res.status(400).send('Debe ingresar un nombre');
        return;
    }

    const usuario = {

        id: usuarios.length + 1 ,
        nombre: req.body.nombre

    };
    usuarios.push(usuario);
    res.send(usuario)
*/
});


app.get('/', (req,res) => {
    res.send('Server listen ' + port);
});

app.get('/api/usuarios', (req,res) => {
    res.send(usuarios );
});



app.get('/api/usuarios/:id', (req,res) => {

    let usuario = usuarios.find(u => u.id === parseInt(req.params.id) );


    if(!usuario) res.status(404).send('El usuario no fue encontrado');

    res.send(usuario);

});



app.put('/api/usuarios/:id', (req,res) => {

    //Encontrar si existe el usuario que quiero modificar

    let usuario = usuarios.find(u => u.id === parseInt(req.params.id) );
    if(!usuario) res.status(404).send('El usuario no fue encontrado');

    const schema = joi.object({
        nombre: joi.string().min(3).required()
    });

    const {error, value} = schema.validate({ nombre: req.body.nombre});

    if(error){
        const mensaje = error.details[0].message
        res.status(400).send(mensaje);
        return;
    }

    usuario.nombre = value.nombre;
    res.send(usuario);



});




const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log('listen ' + port);
})