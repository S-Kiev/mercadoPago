import { Preference, MercadoPagoConfig, Payment } from "mercadopago";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();



export async function createOrder(req, res) {
    try {
            // req debe traer los items
            // entre ellos el id del cliente o su numero de celular
            // caso no los tariga retornar un error

            // pedir a la BD los items y hacer calculos porque puede que desde front un usuario manipule el req
            // Si todo esta OK seguir con el proceso

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
              /*
                items: req.body.items,
                back_urls: {
                    success: `${process.env.FRONTEND_URL}/payment/success`,
                    failure: `${process.env.FRONTEND_URL}/tienda/catalogo`,
                    pending: `${process.env.FRONTEND_URL}/tienda/carrito`,
                },
                auto_return: "approved",
                metadata: {
                    // aqui los datos que quieras mandar
                    // por ejemplo, el id del usuario
                    // id del pedido
                }
                */
            });

            console.log(response);
                
            res.json(response.init_point);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error del servidor de Mercado Pago" });
    }
}

export async function mercadopagoWebhook(req, res) {
  console.log(req);
    const body = req.body;
    console.log("Llego al webhook");
    console.log(body);

    return res.json({ status: 'ok' });   
    /*
    const headers = req.headers;
    const xRequestId = headers['x-request-id'];
    const xSignature = headers['x-signature'];
    const url = new URL(req.url, `https://${req.headers.host}`);
    const id = url.searchParams.get('data.id');
    let [ts, signature] = xSignature.split(',');
    ts = ts.split('=')[1];
    signature = signature.split('=')[1];

      // Valida datos de forma segura
  const signatureTemplate = `id:${id};request-id:${xRequestId};ts:${ts};`;

  const cyphedSignature = crypto
    .createHmac('sha256', process.env.MERCADOPAGO_WEBHOOK_SECRET_KEY)
    .update(signatureTemplate)
    .digest('hex');

  if (cyphedSignature !== signature) {
    return res.status(401).json({ status: 'Not Authorized' });
  }

    // Consulta datos de forma segura
    const paymentId = body.data.id;

    const payment = await new Payment(client).get({
      id: paymentId,
    });

    // ahora payment trae la metadata
    // payment.metadata.propiedades
  
    // Hacer operaciones sobre la base de datos
    // codigo de ejemplo
    const userFound = await prisma.user.findUnique({
      where: {
        id: payment.metadata.user_id,
      },
    });

    if (!userFound) {
        return res.status(400).json({ status: 'User not found' });
      }
    
      const newPaymentRecord = await prisma.payments.create({
        data: {
          total: payment.transaction_amount,
          userId: userFound.id,
          paymentId: payment.id,
          provider: 'mercadopago',
        },
      });
    
      console.log(payment);
      console.log(body);
      console.log(newPaymentRecord);
    
      return res.json({ status: 'ok' });   
      */ 
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