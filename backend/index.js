import express from 'express';
import 'dotenv/config';
import * as paypal from "./controller/paypal-api.js"
import cors from 'cors';
import Mail from './controller/sendmail.js';

const app = express();
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(cors(
    {
        origin: ['https://ed-tech-xswr02vj1-arihants-projects-f6f38092.vercel.app', 'https://ed-tech-indol.vercel.app','ed-tech-git-main-arihants-projects-f6f38092.vercel.app', '*'], // Add your frontend URLs here
        credentials: true
    }
));


app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});
 

const port = process.env.PORT || 3000;
const environment = process.env.ENVIRONMENT || 'sandbox';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url = environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';


app.post('/my-server/create_order', async (req, res) => {
    try{
        console.log(req.body);
        console.log("emial",req.body.email);

        const order = await paypal.createOrder(req.body)
        console.log(order);
        res.json(order);
        // res.json(order.links[1].href);
    }catch(error){
        // res.status(500).res.send(error.message) || 
        'Something went wrong';
    }

});

app.get('/', async (req, res) => {
    res.send('Hello World');
});

app.post('*', async (req, res) => {
    console.log(req.body);
    res.json('Hello World')});

app.post('/', async (req, res) => {
    res.send('Hello World')});

app.post('/my-server/complete_order', async (req, res) => {
        const { orderID } = req.body;
        console.log("orderID", orderID);
        try {
            const capturedata = await paypal.completeOrder(orderID);
            console.log("Order completed successfully:", capturedata);
            res.send(capturedata); // Use res.json to send JSON response
        } catch (error) {
            console.error("Error completing order:", error);
            res.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    });

app.post('/newsignup', async (req, res) => {
    try {
        console.log(req.body);
        const emailInfo = await Mail(req);
        console.log('Email sent successfully:', emailInfo);
        res.status(200).send(emailInfo);
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
});




app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})