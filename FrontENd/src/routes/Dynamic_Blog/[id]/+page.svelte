<script>
  import { API_URL } from "$lib/config";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let blog = null;
  let loading = true;

  onMount(async () => {
    const id = $page.params.id;

    const res = await fetch(`${API_URL}/${id}`);
    const json = await res.json();

    const fetchedBlog = json.data.blog;

const today = new Date();
today.setHours(0, 0, 0, 0);

const publishDate = new Date(fetchedBlog.publish_date);
publishDate.setHours(0, 0, 0, 0);

if (!fetchedBlog.is_active || publishDate > today) {
  blog = null;
} else {
  blog = fetchedBlog;
}


    loading = false;
  });
</script>

  
  <div class="pt-8 px-[80px]">
    {#if loading}
      <p class="text-gray-500">Loading blog...</p>
    {:else if blog}
    <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold mb-4">{blog.blog_title}</h1>
    

      
      <div class="flex justify-end hover:cursor-pointer mb-6">
        <div class="bg-black text-white text-xl w-[80px] h-[40px] rounded-4xl items-center flex justify-center">
            <i class="fas fa-angle-left text-[15px]" ></i>
  
  
            <a href="/Dynamic_Blog" class="text-[15px]">Back</a>
        </div>
     
    </div>
    </div>
    
    <div class="flex items-center text-sm text-gray-500 mb-6">
      <span>By {blog.blog_author}</span>
      <span class="mx-2">•</span>
      <span>{new Date(blog.blog_date).toLocaleDateString()}</span>
    </div>
    
    <img
      src={blog.blog_image}
      alt="blog image"
      class="w-full h-[400px] object-contain rounded-lg mb-6"
    />

  
  
      <p class="text-gray-700 leading-relaxed whitespace-pre-line">
        {@html blog.blog_content}
      </p>
  
      <div class="mt-8 flex gap-4">
       
  
        <a
          href="/Dynamic_Blog"
          class="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Back
        </a>
      </div>
    {:else}
      <p class="text-red-500">Blog not found</p>
    {/if}
  </div>
  