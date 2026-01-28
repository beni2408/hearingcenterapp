<script>
    export let image;
    export let title;
    export let description;
    export let date;
    export let link;

    const formattedDate = new Date(date).toLocaleDateString('en-GB');

  </script>
  
  <div class="flex flex-col h-[600px] w-[400px] shadow-2xl rounded-lg justify-between">
    <div class="flex flex-col">
      <img src={image} alt="blog image" class="rounded-t-lg h-56 w-full object-cover" />
  
      <h1 class="font-bold text-xl mx-6 mt-6">
        {title}
      </h1>
  
   
      <p class="font-normal text-sm mx-6 mt-4 text-gray-500 text-justify line-clamp-4">
        {description}
      </p>
  
      <a href={link} class="text-sm font-bold mx-6 mt-4 text-blue-900 hover:underline">
        READ MORE
      </a>
    </div>
  
    <div class="flex flex-col mb-5">
      <div class="w-full border border-gray-200"></div>
      <p class="text-gray-400 font-bold text-sm mt-3 mx-6">
        {new Date(date).toLocaleDateString()}
      </p>
    </div>
  </div>
  