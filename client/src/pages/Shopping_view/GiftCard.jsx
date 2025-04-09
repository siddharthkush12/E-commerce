import React, { useState } from 'react'
import Form from '@/components/common/Form'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { giftCardItems } from '@/config/formControls'

function GiftCard() {
  const [formData, setFormData] = useState({
    cardnumber: '',
    cardpin: ''
  });

  function handleSubmit(e) {
    console.log(e);
    
    e.preventDefault();
    console.log("Form submitted:", formData);
  }

  return (
    <div className='flex items-start min-h-screen justify-center'>
      <Card className='w-[70vw] md:w-[55vw] items-center mt-8 p-5'>
        <CardTitle className='font-bold mt-4 text-xl md:text-3xl'>Received a Gift Card?</CardTitle>
        <CardContent className='w-full mb-10 flex flex-col gap-15'>
            <Form
            formControls={giftCardItems}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            buttonText="Redeem"
            buttonStyleVariant="outline"
            />
            <div className='text-xl text-center'>
              <h2 className='mb-2'>🎁 Closify Gift Cards for Every Occasion</h2>
              <div className="w-full max-w-3xl mx-auto px-4 md:px-8">
                    <div className="text-left text-base md:text-sm leading-relaxed text-muted-foreground space-y-4">
                      <p>
                        Still wondering what to gift your friend on their birthday? Torn between too many options and can’t decide on just one? This is the perfect moment to surprise them with a <strong>Closify Gift Card</strong>! That’s right — Closify now brings you the opportunity to send a personalized gift card to your loved ones. Whether it’s a birthday, anniversary, festival, or just a special gesture, Closify gift cards are here to make gifting effortless and joyful.
                      </p>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GiftCard