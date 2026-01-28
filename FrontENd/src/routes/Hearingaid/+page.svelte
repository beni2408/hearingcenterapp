<script>
    import BTEcard from "$lib/components/BTEcard.svelte";
    import ITEcard from "$lib/components/ITEcard.svelte";
</script>

<div class="px-[80px] bg-[#266985] h-[300px] flex justify-between items-center ">   
    <h1 class="text-yellow-300 text-[60px]">
        Types of Hearing Aids
    </h1>
    <img class="h-[230px] w-[340px]" src="/hearingaidsimage.png" alt="">
</div>

<div class="  px-[80px] pt-12">


    <div class="mb-16">
      <h1 class="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
        Hearing aid technology has advanced rapidly in the last several years.
      </h1>
      <p class="text-gray-600 leading-relaxed ">
        The team at The Hearing Center only partners with the leading brands in the
        hearing aid industry to ensure that you have access to devices that are
        high-quality, comfortable, and affordable.
      </p>
    </div>

    <div class="mb-16">
      <h2 class="text-xl md:text-2xl font-bold text-blue-900 mb-4">
        Hearing Aid Styles
      </h2>
      <p class="text-gray-600 leading-relaxed ">
        The hearing aid industry offers more options than ever before, yet all
        devices find themselves in one of two categories: Behind-the-ear (BTE) and
        In-the-ear (ITE).
      </p>
    </div>
  

    <div>
      <h2 class="text-xl md:text-2xl font-bold text-blue-900 mb-4">
        Behind-the-ear (BTE) Hearing Aids
      </h2>
      <p class="text-gray-600 leading-relaxed ">
        Sitting behind or on top of the outer ear, a BTE design utilizes a tube that
        connects to an ear mold or tip inside of your ear canal. With the widest
        selection of colors, sizes, features, degrees of power, and battery types,
        BTE’s are so small that they are often unnoticeable to others. Some of the
        various BTE styles include:
      </p>
    </div>

    <div class="flex mt-10 gap-10 justify-between">
      
        <BTEcard
        image="/BTE/BTE1.png"
        name="Mini BTE"
        description =" The smallest BTE option on the market, a Mini BTE creates a natural hearing experience through a soft tip at the end of its tubing. This encourages airflow and sound to enter the ear along with amplified sounds."
        />

        <BTEcard
        image="/BTE/BTE2.png"
        name="Reciever-in-the-ear (RITE) or Receiver-in-canal (RIC):"
        description =" A speaker built into the ear tip instead of the body of the device is what makes RITE hearing aids different. Their size is like that of a Mini BTE and they are nearly invisible to others. This is also known as a RIC or receiver in canal."
        />
        <BTEcard
        image="/BTE/BTE3.png"
        name="BTE with Earmold:"
        description ="Patients can enjoy more features and a longer battery life with a BTE with Earmold. It uses a custom-shaped earmold at the tip of its tubing, directing sound straight to the ear canal. These devices are slightly larger and use a shape that follows the contour of your ear."
        />


    </div>

    <div class="mb-16 mt-10">
        <h2 class="text-xl md:text-2xl font-bold text-blue-900 mb-4">
            In-the-Ear (ITE) Hearing Aids
        </h2>
        <p class="text-gray-600 leading-relaxed ">
            Instead of resting behind the ear, ITE hearing aids sit inside of the ear using an impression for a custom fit. We offer many types of ITE styles including:
        </p>
      </div>
    

    <div class="flex mt-10 gap-10 justify-between">

        <ITEcard
        image="/ITE/ITE1.png"
        name="Invisible In-the-Canal (IIC)"
        description="Sitting deep within the ear canal, IIC devices are the smallest hearing aids on the market and are nearly invisible to the naked eye."
        />

        <ITEcard
        image="/ITE/ITE2.png"
        name="Completely In-the-Canal (CIC)"
        description="These devices are slightly larger than the IIC, yet are still quite discreet. CIC hearing aids fit inside of your ear canal in a more shallow fashion than other styles."
        />
       
        <ITEcard
        image="/ITE/ITE3.png"
        name="In-the-Canal (ITC) or Half Shell"
        description="Patients looking for features like volume control, directional microphones, and a larger battery will benefit from an ITC device. These typically sit in the lower portion of the outer ear bowl and are slightly larger than a CIC."/>
        
        <ITEcard
        image="/ITE/ITE4.png"
        name="In-the-Ear (ITE) or Full Shell"
        description="Best for individuals with more severe hearing loss, an ITE device fills the entire outer bowl of the ear. Patients can enjoy advanced features like volume controls and longer battery life due to their larger size."/>

    </div>
  
    <div class="mt-16 mb-[120px] flex flex-wrap"> 
        <p class="text-gray-500">If you are just now exploring their options for the first time, the amount of styles and <a href="#" class="text-blue-500">manufacturers on the market</a>  may seem overwhelming. At The Hearing Center,  we offer a risk-free hearing aid trial so you can make the best choice for you. Whether you want a small device that integrates the latest technology or would rather have a more basic model that’s easy to use, there’s a hearing aid for every budget and lifestyle.</p>
    </div>
  </div>
  