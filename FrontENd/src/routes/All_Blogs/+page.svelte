<script>

function isPublished(publishDate, isActive) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = new Date(publishDate);
  date.setHours(0, 0, 0, 0);

  return isActive === true && date <= today;
}

async function deleteBlog(id) {
  const confirmed = confirm('Are you sure you want to delete this blog?');
  if (!confirmed) return;

  const res = await fetch(`${API_URL}/deleteblog/${id}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    blogs = blogs.filter(blog => blog._id !== id);
  } else {
    alert('Failed to delete blog');
  }
}

    import { API_URL } from "$lib/config";
    import { onMount } from "svelte";
  
    let blogs = [];
    let loading = true;
  
    onMount(async () => {
      const res = await fetch(`${API_URL}/allblogs`);
      const json = await res.json();
      blogs = json.data.blogs;
      loading = false;
    });
  </script>
  
  <div class="pt-8 px-[80px]">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">All Blogs</h1>
  
      <a
        href="/Dynamic_Blog/new"
        class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + New Blog
      </a>
    </div>
  
    {#if loading}
      <p>Loading blogs...</p>
    {:else if blogs.length === 0}
      <p>No blogs found</p>
    {:else}
      <table class="w-full border">
        <thead class="bg-gray-100">
          <tr>
            <th class="border p-2">Title</th>
            <th class="border p-2">Author</th>
            <th class="border p-2">Date</th>
      
            <th class="border p-2">Published / Not Published</th>
            <th class="border p-2">Actions</th>
            <th class="border p-2">Publish Date</th>
            <th class="border p-2">Active / Inactive</th>


          </tr>
        </thead>
        <tbody>
          {#each blogs as blog}
            <tr>
              <td class="border p-2">{blog.blog_title}</td>
              <td class="border p-2">{blog.blog_author}</td>
              <td class="border p-2">
                {new Date(blog.blog_date).toDateString()}
              </td>
              <td class="border p-2">
                {#if isPublished(blog.publish_date, blog.is_active)}
                <span class="text-green-600 font-semibold">Published</span>
              {:else}
                <span class="text-orange-600 font-semibold">Not Published</span>
              {/if}
              
              </td>
              
              <td class="border p-2 space-x-3">
                <a
                  href={`/Dynamic_Blog/${blog._id}/edit`}
                  class=" w-[70px] rounded  text-blue-900 hover:underline hover:bg-blue-900  hover:text-white"
                >
                  Edit
                </a>
              
                <button
                  on:click={() => deleteBlog(blog._id)}
                  class= " w-[70px] rounded  text-red-600 hover:underline hover:bg-red-600  hover:text-white"
                >
                  Delete
                </button>
              </td>
              <td class="border p-2">
                {new Date(blog.publish_date).toLocaleDateString('en-GB')}
              </td>
              
              <td class="border p-2">
                {blog.is_active ? 'Active' : 'Inactive'}
              </td>
              
              
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
  