const { MongoClient } = require("mongodb");
const express = require('express')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT ;
const uri = process.env.MONGODB_URI;



MongoClient.connect(uri, { useNewUrlParser: true})
    .then(client => {
        console.log('Connected to database');
        const db = client.db('sample_analytics');
        const customersCollection = db.collection('customers');

        //Parser for POST DATA
        app.use(express.json({ type: 'json' }));


        app.get('/customers', (req, res) => {
            const getCustomers = customersCollection.find().toArray();

            getCustomers.then(results => {
                res.status(200).json(results);
            })
                .catch(error => {
                    console.error(error);
                    res.status(404).send();
                });
        });



        app.post('/customers', (req, res) => {
            const postCustomer = customersCollection.insertOne(req.body);

            postCustomer.then(result => {
                res.status(201).send(`Customer added to the collection successfully _id: ${result.insertedId}`);
            }).catch(error => {
                console.error(error);
                res.status(400).send('An error occured while adding the customer, please try again');
            });

        });



        app.patch('/customers/:username', (req, res) => { 
            const filter = { username: req.params.username }

            const updateDoc = {
                $set: {
                    address: req.body.address,
                    email: req.body.email,
                }
            }
            const updateCustomer = customersCollection.updateOne(filter, updateDoc);

            updateCustomer.then(result => {
                res.status(200).send(`Updated ${result.modifiedCount} document for ${req.params.username}`);
            }).catch(error => {
                console.error(error);
                res.status(404).send(`An error occured while updating ${req.params.username}, please try again`);

            });
        });



        app.delete('/customers/:username', (req, res) => {

            const query = { username: req.params.username }
            const deleteCustomer = customersCollection.deleteOne(query);

            deleteCustomer.then(result => {
                res.status(200).send(`Successfully deleted ${result.deletedCount} document`);
            }).catch(error => {
                console.error(error);
                res.status(404).send('An error occured while deleting the customer, please try again ')
            });
        });


        
        //App starts a server and listens on port 3000
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });




    }).catch(console.error);


