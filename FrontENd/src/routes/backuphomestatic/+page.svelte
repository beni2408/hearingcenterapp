
<script>
    import '../app.css';
    import Brandscroller from '$lib/components/Brandscroller.svelte';

    
</script>

<div class="page1 ">

    <div class="page1bg gap-10 px-[80px] bg-[#266985]">
        <div class="page1container1"> 
            <div class="h-[100px]"></div>
            <div class="flex flex-col spcace-between ">
                <h1 class="text-[40px] font-bol text-white font-bold ">The hearing Center - Your Trusted <p class="font-bold underline text-yellow-300"> Hearing Aid Center </p> in Orangeburg, SC</h1>
                <p class=" mt-18 text-lg text-white opacity-80 mt-4 text-[20px]">We offer the most comprehensive hearing healthcare in the south Calorina</p>
                <div class="flex">
                    <div class="   bg-white flex flex-col h-[200px] w-[300px] rounded-[40px] mt-10 mr-6 items-start justify-between hover:scale-105 transition-transform cursor-pointer shadow-lg p-10">
                        <h3 class="font-bold text-xl">Ringing in your ears or tinnitus?</h3>
                        <p class="bg-gray-200 px-3 py-1 rounded-[20px]">we can help!</p>
                    </div>
                    <div class="   bg-white flex flex-col h-[200px] w-[300px] rounded-[40px] mt-10 mr-6 items-start justify-between hover:scale-105 transition-transform cursor-pointer shadow-lg p-10">
                        <h3 class="font-bold text-xl">The #1 modifiable risk factor demenitia <p class="font-bold text-[13px]">untreated hearing loss</p></h3>
                        <p class="bg-gray-200 px-3 py-1 rounded-[20px]">we can help!</p>
                    </div>
                </div>

            </div>
        </div>


        <div class=" h-[300px] w-[600px] ">
            <img src="/image1.png" alt="">
            
        </div>
    </div>
</div>



<div class=" flex flex-row pl-[80px] pb-[100px] gap-10 px-[80px] bg-gray-50 ">
    <div class="h-[600px] w-[700px]  mt-[300px]">
       
        <img src="/image2.png" alt="" class="h-[600px] w-[630px]">
    </div>
    <div class="h-[600px] w-[600px] mt-[300px]">
        <h1 class="text-[#166d88] text-[20px] font-bold">WELCOME TO </h1>
        <h1 class="text-black text-[40px] mt-5 font-bold">The Hearing Center </h1>
        <p class="text-gray-500 text-[15px] mt-5 text-wrap text-justify ">At The Hearing Center, we believe hearing care should be simple, honest, and focused on you. As a trusted Hearing Aid Center in Orangeburg, SC, we provide complete hearing solutions—from diagnostic testing to personalized fittings and dependable hearing aid repair. Our goal is to help you hear better so you can enjoy conversations, stay active in your community, and improve your overall quality of life. Every patient receives individualized attention, straightforward recommendations, and long-term support, not just a quick fix.

            </p>
        <p class="text-gray-500 text-[15px] mt-5 text-wrap text-justify "> Better hearing is about more than technology—it’s about confidence and connection. That’s why we don’t just provide hearing aids; we also offer ongoing maintenance, adjustments, and repairs to ensure your devices continue to perform at their best. Whether you’re coming to us for your first hearing evaluation or need reliable service for your existing hearing aids, our team is here to deliver professional care with a personal touch.

            </p>
    </div>
    
</div>



<div class="flex flex-col px-[80px] justify-between items-center  gap-10 bg-gray-50 ">
    <h1 class="text-[40px] font-bold">Our Brands</h1>

    <Brandscroller />

    <div class="rounded-[50px] bg-gradient-to-b from-blue-50 to-white h-[500px] w-[1300px] flex  justify-around items-center">
       
        <div class="bg-white h-[400px] w-[350px] rounded-[50px] flex flex-col justify-around items-start pl-8">
            
            <div class="rounded-[1000px] bg-green-100 p-4 bg-green-900">


                <i class="fas fa-hand-holding-medical text-6xl text-white"></i>
            </div>
            <p class="text-xl">Did you know that upto 40% of Dementia cases are preventable?</p>
            <p class="text-[18px] text-green-900 opacity-40">GIVE US A CALL  </p>



        </div>
       
    
       
        <div class="bg-white h-[400px] w-[350px] rounded-[50px] flex flex-col justify-around items-start pl-8">

            <div class="rounded-[1000px] bg-green-100 p-4 bg-cyan-900">

                <i class="fas fa-user-doctor text-6xl text-black"></i>
            

            </div>
            <p class="text-xl">We are here answer your questions about hearing loss and hearing aids.</p>
            <p class="text-[18px] text-green-900 opacity-40">CONTACT US  </p>



        </div>
        <div class="bg-white h-[400px] w-[350px] rounded-[50px] flex flex-col justify-around items-start pl-8">

            <div class="rounded-[800px] bg-green-100 p-4 bg-yellow-300">

                <i class="fas fa-ear-listen text-6xl text-black"></i>
            </div>
            <p class="text-xl">The hearing center offers awide range of hearing services to keep you healthy and hearing you best.</p>
            <p class="text-[18px] text-green-900 opacity-40">LEARN MORE </p>



        </div>
    </div>

</div>



<div class="flex flex-col px-[80px] justify-between items-center  gap-10 bg-gray-50 pb-[200px]  ">
    <div class="flex justify-between w-[1200px]">
        <div class="flex flex-col w-[700px] mt-20">
            <h1 class="text-[#166d88] text-[20px] font-bold"> WHY CHOOSE </h1>
            <h1 class="text-black text-[35px] mt-5 font-bold">Why choose the hearing center? </h1>
            <div class="h-6"></div>
           <div class="flex flex-col gap-6">

               <div class="flex items-center gap-5">
               <i class="fas fa-circle-check text-yellow-300"></i>
               <p class="text-justify pr-10">Family-Owned-Since-1987 : The Hearing Center has been proudly owned and operated by the Haynes family for more than 35 years. Now in our second generation, Chas Haynes continues the tradition of patient-focused excellence started by his father. For us, this isn’t just a business—it’s a lifelong commitment to helping our neighbors hear better and live fuller lives. </p>
              </div> 
               
              <div class="flex items-center gap-5">
               <i class="fas fa-circle-check text-yellow-300"></i>
               <p class="text-justify pr-10">We Treat You Like Family: Every patient is cared for with the same honesty, respect, and attention we would give our own loved ones. Your comfort, trust, and success are our priorities.</p>
              </div> 
              
              <div class="flex items-center gap-5">
               <i class="fas fa-circle-check text-yellow-300"></i>
               <p class="text-justify pr-10">Trusted in Orangeburg for Decades: Many patients have been coming to us for years, and some for decades. Our long-standing reputation in the community speaks to the trust and confidence people place in our services.</p>
              </div> 

              <div class="flex items-center gap-5">
               <i class="fas fa-circle-check text-yellow-300"></i>
               <p class="text-justify pr-10">Comprehensive Hearing Care: From detailed hearing tests to precise adjustments, fittings, and dependable hearing aid repair, we do whatever it takes to help you achieve the best possible results. We make sure your devices stay in top condition so you can rely on them every day.</p>
              </div> 
           </div>



        </div>
        <div class=" h-[550px] w-[600px] mt-20 ">
          <img src="/image4.png" alt="">
        </div>
    </div>
        
    <div class="px-[60px] pb-[100px] ">
        <div class="flex flex-col gap-6">

            <div class="flex items-center gap-5">
            <i class="fas fa-circle-check text-yellow-300"></i>
            <p class="text-justify pr-10">Wide Selection of Hearing Aids: We are not tied to a single brand. Instead, we offer a full range of top-quality hearing aids from trusted manufacturers, giving us the flexibility to find the right solution for your unique needs, preferences, and budget. </p>
           </div> 
            
           <div class="flex items-center gap-5">
            <i class="fas fa-circle-check text-yellow-300"></i>
            <p class="text-justify pr-10">Affordable Services with Lifetime Support: When you purchase your hearing aids through us, you’ll receive free in-office services for the life of your devices. That means adjustments, cleanings, and maintenance are always available—without extra cost—so you can focus on better hearing, not extra fees.</p>
           </div> 
           
           <div class="flex items-center gap-5">
            <i class="fas fa-circle-check text-yellow-300"></i>
            <p class="text-justify pr-10">Personalized Treatment Plans: Proper hearing treatment not only improves communication but also boosts confidence and supports independence. That’s why we create individualized treatment plans based on your test results, lifestyle, and goals.</p>
           </div> 

           <div class="flex items-center gap-5">
            <i class="fas fa-circle-check text-yellow-300"></i>
            <p class="text-justify pr-10">A Community You Can Trust: For decades, Orangeburg residents have turned to The Hearing Center for reliable hearing care. Come see why so many families continue to choose us for honest advice, compassionate service, and trusted results.</p>
           </div> 
        </div>
    </div>


</div>





<div class="flex flex-col px-[80px] justify-between items-center  gap-10 bg-gray-50 pb-[200px]  ">
    <div class="flex justify-between w-[1200px]">
        <div class=" h-[550px] w-[600px] mt-20 mr-10 ">
       <img src="/image5.png" alt="">
        </div>
        <div class="flex flex-col w-[700px] mt-20">
            <h1 class="text-[#166d88] text-[20px] font-bold"> WHAT TO EXPECT AT </h1>
            <h1 class="text-black text-[35px] mt-5 font-bold">Your First Appointment </h1>
            <div class="h-6"></div>
           <div class="flex flex-col gap-6">

               <div class="flex items-center gap-5">
               <i class="fas fa-circle-check text-yellow-300"></i>
               <p class="text-justify pr-10">A Warm Welcome: Our office is easy to find, comfortable, and designed to make you feel at ease. When you arrive, you’ll be greeted by our friendly front desk staff and won’t have to wait long before a hearing care professional comes to guide you through your visit. </p>
              </div> 
               
              <div class="flex items-center gap-5">
               <i class="fas fa-circle-check text-yellow-300"></i>
               <p class="text-justify pr-10">Getting to Know You: We start by asking about your hearing history, lifestyle, and specific challenges. This helps us understand how hearing loss may be affecting your daily life. We’ll also explain the testing process in simple terms and answer any questions before beginning.</p>
              </div> 
              
              <div class="flex items-center gap-5">
               <i class="fas fa-circle-check text-yellow-300"></i>
               <p class="text-justify pr-10">Comprehensive Hearing Testing: You will sit in our sound-treated hearing booth where we perform a full evaluation. This includes listening for different tones and frequencies to determine your hearing thresholds. If needed, we also conduct speech discrimination testing to measure how well you can understand words in conversation.</p>
              </div> 

              <div class="flex items-center gap-5">
               <i class="fas fa-circle-check text-yellow-300"></i>
               <p class="text-justify pr-10">Clear Results and Recommendations: Once your test is complete, we’ll review your results with you in detail. If hearing loss is detected, we’ll explain your options, including personalized hearing aid solutions. Our team will guide you through the choices available and make honest recommendations tailored to your hearing needs, lifestyle, and budget.</p>
              </div> 
           </div>



        </div>
        
    </div>
        
</div>


 <div class="flex flex-row px-[80px] justify-between items-center  gap-10 bg-gray-50 pb-[200px]  ">
    <div class="flex flex-col">
        <h1 class="text-[#166d88] text-[20px] font-bold"> TESTIMONIALS ⭐️⭐️⭐️⭐️⭐️ </h1>
        <h1 class="text-black text-[35px] mt-5 font-bold">Look what our customer says about us : </h1> 
    </div>
    <div class="h-[400px] w-[800px] bg-white shadow-2xl rounded-[60px] mt-20 ">
        <div class=" h-[400px] m-[100px] ">
            <img src="/image6.png" alt="">
        </div>
    </div>
 </div>
