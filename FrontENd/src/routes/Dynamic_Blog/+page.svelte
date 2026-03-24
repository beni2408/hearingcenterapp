<script>
  import Blogcard from "$lib/components/Blogcard.svelte";
  import { BLOG_API_URL } from "$lib/config";
  import { onMount } from "svelte";
  import { currentLang } from "$lib/stores/lang";

  let blogs = [];
  let filteredBlogs = [];
  let lang;

  currentLang.subscribe((value) => {
    lang = value;
  });

  onMount(() => {
    loadBlogs();
  });

  async function loadBlogs() {
    try {
      const res = await fetch(`${BLOG_API_URL}/allblogs`);
      const json = await res.json();

      blogs = json.data.blogs;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      filteredBlogs = blogs.filter((blog) => {
        const publishDate = new Date(blog.publish_date);
        publishDate.setHours(0, 0, 0, 0);

        return blog.is_active === true && publishDate <= today;
      });
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  }
</script>
  
  <div class=" pt-8 px-[80px]">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Dynamic Blogs</h1>
  
      <!-- <a
        href="/Dynamic_Blog/new"
        class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + New Blog
      </a> -->
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      
        <!-- {#if blogs.length === 0} -->
        {#if filteredBlogs.length === 0}
        <p class="text-gray-500">No blogs found</p>
        {:else}
    
        <!-- {#each blogs as blog} -->
        {#each filteredBlogs as blog}
        <Blogcard 
          blog={blog} 
          lang={lang} 
          link={`/Dynamic_Blog/${blog._id}`} 
        />
      {/each}
      
    
    
          <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each blogs as blog}
              <div class="border rounded-lg overflow-hidden shadow-sm">
                <img
                  src={blog.blog_image}
                  alt="blog"
                  class="h-48 w-full object-cover"
                />
      
                <div class="p-4">
                    <a href={`/Dynamic_Blog/${blog._id}`}>
                        <h3 class="font-semibold text-lg hover:underline">
                          {blog.blog_title}
                        </h3>
                      </a>
                      
      
                  <p class="text-gray-600 text-sm line-clamp-3">
                    {blog.blog_content}
                  </p>
      
                  <div class="mt-4 flex justify-between items-center">
                    <span class="text-xs text-gray-500">
                      By {blog.blog_author}
                    </span>
      
             
                    <a
                      href={`/Dynamic_Blog/${blog._id}/edit`}
                      class="text-blue-600 text-sm hover:underline"
                    >
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            {/each}
          </div> -->
        {/if}
    </div>
  </div>
  