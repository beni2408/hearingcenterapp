<script>
  import { API_URL } from "$lib/config";
  import { page } from "$app/stores";
  import { onMount, tick } from "svelte";
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

  let blog = null;
  let blog_image = null;
  let loading = false;
  let id;

  let publish_date = "";
  let is_active = true;

  let editorElement;
  let editorInstance;

  onMount(async () => {
    id = $page.params.id;

    // 1️⃣ fetch blog
    const res = await fetch(`${API_URL}/${id}`);
    const json = await res.json();

    blog = json.data.blog;
    publish_date = blog.publish_date;
    is_active = blog.is_active;

    // 2️⃣ wait until DOM updates
    await tick();

    // 3️⃣ create editor
    editorInstance = await ClassicEditor.create(editorElement, {
      placeholder: "Edit your blog content here...",
      toolbar: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "numberedList",
        "bulletedList",
        "link",
        "blockQuote",
        "insertTable",
        "imageUpload",
        "undo",
        "redo"
      ]
    });

    // 4️⃣ load existing content
    editorInstance.setData(blog.blog_content);

    // 5️⃣ keep data in sync
    editorInstance.model.document.on("change:data", () => {
      blog.blog_content = editorInstance.getData();
    });
  });

  async function updateBlog() {
    loading = true;

    const formData = new FormData();
    formData.append("blog_title", blog.blog_title);
    formData.append("blog_content", blog.blog_content);
    formData.append("blog_author", blog.blog_author);
    formData.append("blog_date", blog.blog_date);
    formData.append("publish_date", publish_date);
    formData.append("is_active", is_active);

    if (blog_image) {
      formData.append("blog_image", blog_image);
    }

    const res = await fetch(`${API_URL}/updateblog/${id}`, {
      method: "PUT",
      body: formData
    });

    loading = false;

    if (res.ok) {
      window.location.href = "/All_Blogs";
    } else {
      alert("Update failed");
    }
  }
</script>



<div class="px-[180px] pt-10">
  <div class="flex justify-between items-center mb-6">

    <h1 class="text-2xl font-bold mb-6">Edit Blog</h1>
    <div class="flex justify-end hover:cursor-pointer mb-6">
      <div class="bg-black text-white text-xl w-[80px] h-[40px] rounded-4xl items-center flex justify-center">
          <i class="fas fa-angle-left text-[15px]" ></i>


          <a href="/All_Blogs" class="text-[15px]">Back</a>
      </div>
   
  </div>
  </div>
  
  {#if blog}
  <form on:submit|preventDefault={updateBlog} class="space-y-5">
  

    <div>
      <label class="block mb-1 text-sm font-medium text-gray-700">
        Blog Title
      </label>
      <input
        class="w-full border rounded px-3 py-2"
        bind:value={blog.blog_title}
        required
      />
    </div>
  

    <div>
     
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">
          Blog Content
        </label>
        <div class="w-full rounded py-2">
          <div bind:this={editorElement}></div>
        </div>
      </div>
      
    </div>
  

    <div>
      <label class="block mb-1 text-sm font-medium text-gray-700">
        Author Name
      </label>
      <input
        class="w-full border rounded px-3 py-2"
        bind:value={blog.blog_author}
      />
    </div>
  

    <div>
      <label class="block mb-1 text-sm font-medium text-gray-700">
        Blog Date
      </label>
      <input
        type="date"
        class="w-full border rounded px-3 py-2"
        bind:value={blog.blog_date}
      />
    </div>

    <div>
      <label class="block mb-1 text-sm font-medium text-gray-700">
        Publish Date
      </label>
      <input
        type="date"
        class="w-full border rounded px-3 py-2"
        bind:value={publish_date}
        required
      />
    </div>
  

    <div>
      <label class="block mb-1 text-sm font-medium text-gray-700">
        Blog Status
      </label>
      <select
        class="w-full border rounded px-3 py-2"
        bind:value={is_active}
      >
        <option value={true}>Active</option>
        <option value={false}>Inactive</option>
      </select>
    </div>
  

    <div>
      <label class="block mb-1 text-sm font-medium text-gray-700">
        Current Image
      </label>
      <img
        src={blog.blog_image}
        alt="current blog image"
        class="w-full h-48 object-contain rounded border"
      />
    </div>
  

    <div>
      <label class="block mb-1 text-sm font-medium text-gray-700">
        Change Image
      </label>
      <input
        type="file"
        class="border rounded px-3 py-2 w-full"
        on:change={(e) => (blog_image = e.target.files[0])}
      />
    </div>
  

    <button
      class="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      disabled={loading}
    >
      {loading ? "Updating..." : "Update"}
    </button>
  
  </form>
  {:else}
  <p>Loading blog...</p>
  {/if}
  
</div>
