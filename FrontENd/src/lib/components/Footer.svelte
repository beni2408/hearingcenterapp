<!-- 

<div class="flex flex-col px-[80px] justify-between items-center w-full gap-[20px] mt-[50px] bg-[#E3EDF2]  ">
    <div class="flex w-[1200px] justify-between bg-[#166d88] h-[130px] rounded-2xl items-center px-10">
        <h1 class="text-4xl text-white font-bold">Need to make an appointment?</h1>     

        <button class="bg-yellow-300 w-[130px] h-[50px] rounded-4xl font-bold text-[#166d88] cursor-pointer ">Contact Us</button>
    </div>
    <div class="flex flex-row justify-around items-center gap-[20px]">

        <div class="flex flex-col justify-center items-start gap-3">
            <img src="/logo2.png" alt="logo" class="h-[110px] w-[200px] mb-4"/>

            <div class="flex flex-row gap-2 items-center">

                <i class="fas fa-map-marker-alt" ></i>
                <p>1655 Calorina Avenue, Orangeburg, SC29115</p>
            </div>
            
            
            <div class="flex flex-row gap-2 items-center">

                <i class="fas fa-phone"></i>
                    <p >(803) 859 5451</p>
            </div>


            <div class="flex flex-row gap-2 items-center">

                <i class="fas fa-envelope"></i>

                    <p >info@hearingcentersc.com</p>
            </div>
        </div>

        
        <div class="flex flex-col justify-center items-start gap-3">
            <h1 class="text-2xl font-bold mb-10">Office Hours</h1>

            <div class="flex flex-row gap-2 items-center">

                <i class="fas fa-clock"></i>
                <p>Monday, Tuesday, Thursday 9:00Am - 4:30PM</p>
            </div>
            
            
            <div class="flex flex-row gap-2 items-center">

                <i class="fas fa-clock"></i>

                    <p >Wednesday - 9:00AM - 2:00PM</p>
            </div>


            <div class="flex flex-row gap-2 items-center">

                <i class="fas fa-clock"></i>
                    <p >Friday - Sunday: CLOSED</p>
            </div>
        </div>
        
        <div class="flex flex-col justify-center items-start gap-3">
            <h1 class="text-2xl font-bold mb-10">Pages</h1>

            <div class="flex flex-row gap-2 items-center">

                <a href="#"><li>Home</li></a>
            </div>
            
            
            <div class="flex flex-row gap-2 items-center">

                <a href="#"><li>About</li></a>
            </div>


            <div class="flex flex-row gap-2 items-center">
                <a href="#"><li>Hearing Services</li></a>
            </div>
            <div class="flex flex-row gap-2 items-center">
                <a href="#"><li>Hearing Aids</li></a>
            </div>
            <div class="flex flex-row gap-2 items-center">
                <a href="#"><li>Contact</li></a>
            </div>
        </div>
        <div class="flex flex-row gap-2 items-center ">
            <img src="/mapimage.png" alt="" class="h-[250px] w-[300px] rounded-2xl"/>
        </div>

    </div>
 </div>
<div class="px-[80px] flex justify-center flex-col items-center bg-[#E3EDF2] h-[100px]">
    <div class="w-[1200px] border border-gray-400 ">
    </div>
    
    <div class="flex flex-row justify-between w-[1200px]">

        <div class="flex justify-between mt-6">
    
            <p>Copyright© The Hearing Center. All Rights Reserved.</p>
            <img src="/audiology.png" alt="" class="h-[30px] "/>
    
        </div>

        <div class="mt-6">
            <a href="#">Prvaacy Policy</a>
        </div>
    </div>
    

</div> -->


<script>
    import { onMount } from "svelte";
    import { getFooter } from "$lib/services/footer";
  
    let footer;
    let loading = true;
  
    onMount(async () => {
      try {
        const response = await getFooter();
footer = response.data;

      } catch (e) {
        console.error(e);
      } finally {
        loading = false;
      }
    });
  </script>
  
  {#if loading}
    <footer class="p-10 text-center">Loading footer...</footer>
  {:else}
  <footer class="bg-[#eaf2f6] px-20 py-12">
    <div class="grid grid-cols-4 gap-10">
  
      <!-- LOGO + CONTACT -->
      <div>
       {#if footer?.company?.logo}

          <img src={footer.company.logo} alt="Logo" class="w-40 mb-4" />
        {/if}
        <p class="font-bold">{footer.company.name}</p>
        <p>{footer.company.address}</p>
        <p>{footer.company.phone}</p>
        <p>{footer.company.email}</p>
      </div>
  
      <!-- OFFICE HOURS -->
      <div>
        <h3 class="font-bold mb-3">Office Hours</h3>
        {#each footer.office_hours as hour}
          <p>{hour.day} – {hour.time}</p>
        {/each}
      </div>
  
      <!-- PAGES -->
      <div>
        <h3 class="font-bold mb-3">Pages</h3>
        <ul>
          {#each footer.footer_links as link}
            <li>
              <a href={link.url}>{link.title}</a>
            </li>
          {/each}
        </ul>
      </div>
  
      <!-- MAP -->
      <div>
        <iframe
          src={footer.map_url}
          class="w-full h-40 rounded"
          loading="lazy"
        ></iframe>
      </div>
  
    </div>
  
    <div class="border-t mt-8 pt-4 text-center">
      {footer.copyright}
    </div>
  </footer>
  {/if}
  