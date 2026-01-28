<script>
    const brands =[
        '/brands/brand1.png',
        '/brands/brand2.png',
        '/brands/brand3.png',
        '/brands/brand4.png',
        '/brands/brand5.png',
        '/brands/brand6.png',
    ]
</script>

<div class="w-full overflow-hidden py-6">
    <div class="flex w-max animate-brand-scroll">
        {#each brands as brand}
         <img src={brand} alt="Brand logo" class="h-14 mx-10 "/>
         {/each}
        {#each brands as brand}
         <img src={brand} alt="Brand logo" class="h-14 mx-10 "/>
         {/each}
    </div>
</div>

<style>
@keyframes brand-scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}

.animate-brand-scroll {
    animation: brand-scroll 20s linear infinite;
}


</style>
