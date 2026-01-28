
<script>
    import Blogcard from "$lib/components/Blogcard.svelte";
    
</script>
<div class="px-[80px] bg-[#266985] h-[300px] flex justify-between items-center ">   
    <h1 class="text-yellow-300 text-[60px]">
        Blog
    </h1>
    <img class="h-[230px] w-[340px]" src="/blogimage1.png" alt="">
</div>
<div class="px-[80px] mt-10 flex gap-10 flex-wrap">

    <Blogcard
    image="/blog1.png"
    title = "7 Air Travel tips for people with Hearing Aid"
    description="Flying with the hearing aids does'nt have to be stressful. With a little preparation and a few smart habits, you can..."
    link="/SingleBlog"
    date="December 22,2025"
    />

    <Blogcard
    image="/blog2.png"
    title = "Tinnitus Habituaion: Training your brain to Turn down the noise"
    description="If you live with tinnitus, which is a ringing, buzzing, or humming sound that only you can hear, you know how disrupti ..."
    link= "/SingleBlog"
    date="December 15,2025"
    />

    <Blogcard
    image="/blog3.png"
    title = "How Long Do Hearing Aids Last?"
    description="If you wear hearing aids or are considering getting them, you might wonder how long they'll last before needing ..."
    link="/SingleBlog"
    date="November 18,2025"
    />

    <Blogcard
    image="/blog4.png"
    title = "When Infections Affect Your Hearing:
        The Link between Illness and Hearing Loss"
    description="It’s easy to take your hearing for granted—until something changes. While hearing loss and tinnitus (ringi ..."
    link="/SingleBlog"
    date="November 11,2025"
    />
   
    <Blogcard
    image="/blog5.png"
    title = "What to Do If You Lose a Hearing Aid"
    description="Losing a hearing aid can feel stressful, especially if you rely on it every day to stay connected and engaged. Whether ..."
    link="/SingleBlog"
    date="October 28,2025"
    />

    <Blogcard
    image="/blog6.png"
    title = "Fire Alarms and Fire Safety for People with Hearing Loss"
    description="Fire safety is essential for everyone, but for individuals with hearing loss, traditional smoke alarms may not provide ..."
    link="/SingleBlog"
    date="October 21,2025"
    />
 
</div>
