import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


const port = process.env.PORT || 3000;
const environment = process.env.ENVIRONMENT || 'sandbox';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url = environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

/**
 * Creates an order and returns it as a JSON response.
 * @function
 * @name createOrder
 * @memberof module:routes
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The request body containing the order information.
 * @param {string} req.body.intent - The intent of the order.
 * @param {object} res - The HTTP response object.
 * @returns {object} The created order as a JSON response.
 * @throws {Error} If there is an error creating the order.
 */

export async function createOrder(req) {
    
    try{
    const number = parseFloat(req.product[0].cost.replace(/[^0-9.]/g, ''));
    const descpitionon = req.product[0].description;
       const access_token = await get_access_token()
        
        let order_data_json = {
            'intent': "CAPTURE",
            'purchase_units': [{
                'amount': {
                    currency_code: 'USD',
                    value: `${number}`,
                },
                descpitionon: `${descpitionon}`,
                
            }]
        };
        const data = JSON.stringify(order_data_json)
        
        const response =await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: data
        })

        const json = await response.json();
        return json;
    }
catch(error){
    console.log(error);
}
}


/**
 * Completes an order and returns it as a JSON response.
 * @function
 * @name completeOrder
 * @memberof module:routes
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The request body containing the order ID and intent.
 * @param {string} req.body.order_id - The ID of the order to complete.
 * @param {string} req.body.intent - The intent of the order.
 * @param {object} res - The HTTP response object.
 * @returns {object} The completed order as a JSON response.
 * @throws {Error} If there is an error completing the order.
 */
export async function completeOrder(req) {
    console.log("re order",req)
    try{
    const access_token = await get_access_token()
    console.log("token is",access_token);

    const responce=await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders/'+ req +'/capture', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    })
    const json = await responce.json();
    console.log("our json is",json);
    console.log("data 4 that is",json.purchase_units[0].payments,json.purchase_units[0].shipping);
    return json;
    }
    catch(error){
        console.log(error);
    }
}

// Helper / Utility functions



function get_access_token() {
    const auth = `${client_id}:${client_secret}`
    const data = 'grant_type=client_credentials'
    return fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
            },
            body: data
        })
        .then(res => res.json())
        .then(json => {
            return json.access_token;
        })
}

