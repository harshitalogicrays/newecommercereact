const express=require('express')
const cors=require('cors')
const stripe=require('stripe')('sk_test_51NOvqGSAvExKFAjaTkSgqxNXs5WQ8TofJQrBOJIhdkFNDBKzqbWwMSYYzbsfP6ozzQ1n3sljsSbCVHYnMhcePzGz00PbYWzMiX')
const path=require('path')

const app=express()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello from server")
})

const array=[]
const calculateOrderAmount=(items)=>{
    items.map((item,index)=>{
        const {price,cartQuantity}=item
        const cartItemAmount=price*cartQuantity
        return array.push(cartItemAmount)
    })
    const totalAmount=array.reduce((a,b)=>a+b)
    return totalAmount
}

app.post('/payment',async(req,res)=>{
    // console.log(req.body)
  const {items,shipping,description}= req.body
const paymentIntent=await stripe.paymentIntents.create({
        amount:calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods:{ enabled:true},
        description:description,
        shipping:{
            address:{
                line1: shipping.line1,  line2: shipping.line2,
                city: shipping.city,country: shipping.country,
                postal_code: shipping.postal_code, },
         name: shipping.name,  
         phone: shipping.phone, 
        }
        })
        res.send({
            clientSecret:paymentIntent.client_secret
        })
})


const PORT=1000
app.listen(PORT,()=>{
    console.log(`Server started at http://localhost/${PORT}`)
})