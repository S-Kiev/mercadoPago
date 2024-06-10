import { Preference, MercadoPagoConfig, Payment } from "mercadopago";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();



export async function createOrder(req, res) {
    try {

            const client = new MercadoPagoConfig({
              accessToken: process.env.MERCADOPAGO_ACESS_TOKEN,
              options: { timeout: 5000, idempotencyKey: "abc" },

          });

            const preference = new Preference(client);

            const response = await preference.create({
              body: {
                items: [
                  {
                    id: "item-ID-1234",                  
                    title: "Mi producto",
                    currency_id: "UYU",
                    picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
                    description: "Descripción del Item",
                    quantity: 1,
                    unit_price: 75.76
                  }
                ],
                back_urls: {
                    success: `https://thriving-horse-799365.netlify.app/`,
                    failure: `https://thriving-horse-799365.netlify.app/`,
                    pending: `https://thriving-horse-799365.netlify.app/`,
                },
                auto_return: "approved",
                metadata: {
                    // aqui los datos que quieras mandar
                    // por ejemplo, el id del usuario
                    // id del pedido
                }
              },
            });
                
            res.json(response.init_point);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error del servidor de Mercado Pago" });
    }
}

export async function mercadopagoWebhook(req, res) {
    try {
        console.log("Llego al webhook");
        console.log(req.body);
        return res.json({ status: 'ok' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el webhook de Mercado Pago" });
    }
}



/*
{
              "items": [
                  {
                      "id": "item-ID-1234",
                      "title": "Mi producto",
                      "currency_id": "UYU",
                      "picture_url": "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
                      "description": "Descripción del Item",
                      "category_id": "art",
                      "quantity": 1,
                      "unit_price": 75.76
                  }
              ],
              "payer": {
                  "name": "Juan",
                  "surname": "Lopez",
                  "email": "user@email.com",
                  "phone": {
                      "area_code": "11",
                      "number": "4444-4444"
                  },
                  "identification": {
                      "type": "DNI",
                      "number": "12345678"
                  },
                  "address": {
                      "street_name": "Street",
                      "street_number": 123,
                      "zip_code": "5700"
                  }
              },
              "back_urls": {
                  "success": "https://www.success.com",
                  "failure": "https://www.failure.com",
                  "pending": "https://www.pending.com"
              },
              "auto_return": "approved",
              "payment_methods": {
                  "excluded_payment_methods": [
                      {
                          "id": "master"
                      }
                  ],
                  "excluded_payment_types": [
                      {
                          "id": "ticket"
                      }
                  ],
                  "installments": 12
              },
              "notification_url": "https://www.your-site.com/ipn",
              "statement_descriptor": "MINEGOCIO",
              "external_reference": "Reference_1234",
              "expires": true,
              "expiration_date_from": "2016-02-01T12:00:00.000-04:00",
              "expiration_date_to": "2026-02-28T12:00:00.000-04:00"
          }

*/