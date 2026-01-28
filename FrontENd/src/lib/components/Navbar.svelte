
<script>
    import { onMount } from "svelte";
    import { MENU_API_URL } from "$lib/config";
  
    let menus = [];
  
    onMount(async () => {
      const res = await fetch(`${MENU_API_URL}/active`);
      const json = await res.json();
      menus = json.data;
    });
  </script>
  
  
<div class="nav">
    <!-- <div class="topbar">
                <div class="topbarele1">

                    <i class="fas fa-phone" style="color: white; opacity:0.8"></i>
                    <p style="color: white; opacity:0.8">(803) 859 5451</p>
                    <i class="fas fa-map-marker-alt" style="color: white; opacity:0.8"></i>
                    <p style="color: white; opacity:0.8">1655 Calorina Avenue, Orangeburg, SC29115</p>
                    


                </div>
        <div class="topbarele1">
            <i class="fab fa-facebook" style="color: white; opacity:0.8"></i>

        </div>
    </div> -->

    <div class="menus">
        <!-- <div class="logo">
            <img src="/logo.png" alt="logo">
        </div> -->
       
      
          
        <div class="options">
            {#each menus as menu}
              <a href={menu.menu_url}>
                {menu.menu_title}
              </a>
            {/each}
<!-- 
            <a href="/Menu">Manage Menu</a>
            <a href="/Menu/new">Create Menu</a>
            <a href="/Pages">New Page</a> -->
            </div>
<!--        
        <div class="options">
            <a href="/" data-sveltekit-reload>Home</a>
            <a href="/about" data-sveltekit-reload>About</a>
            <a href="/hearing-services" data-sveltekit-reload>Hearing Services</a>
            <a href="/hearing-aids" data-sveltekit-reload>Hearing Aids</a>
            <a href="/review-us" data-sveltekit-reload>Review us</a>


            

            <a href="/Dynamic_Blog">D Blog</a>
            <a href="/All_Blogs">All Blog</a>
            
            </div> -->
            

 
        <!-- <div class="contactus-btn w-[100px] h-[50px] bg-yellow-300 text-[#0f4c5e] text-lg rounded-[40px] border-none font-bold h-[50px] w-[120px] cursor-pointer items-center flex justify-center">
            <a href="/Contactus" >Contact Us</a>
        


        </div> -->
    </div>
</div>

<style>
    .topbar{
        background-color: #0f4c5e;
        height: 45px;
        border-radius:0 0 8px 8px;
        display: flex;
        justify-content: space-between;
        padding: 0px 20px;
        align-items: center;
        gap: 10px;


        margin: 0px 70px;
    }

    .topbarele1{
        display: flex;
        flex-direction: row;
        align-items:center;
        


    }

    .nav{
        background-color: #266985;
        height: 200px;
        width: 100%;
    }

    .menus{
        display: flex;
        justify-content: space-between;
        padding: 0px 70px;
        align-items: center;
        height: 150px;

    }
    .logo img{

    height: 110px;
    width: 200px;
    }

    .options a{
        color: white;
        text-decoration: none;
        margin-left:30px ;
        font-size:18px ;
    }
    .contactus-btn button{
        background-color: yellow;
        color:#0f4c5e ;
        font-size: 18px;
        border-radius: 40px;
        border: none;
        font-weight: normal;
        height: 50px;
        width: 120px;
    }
</style>
