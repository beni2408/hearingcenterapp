<script>
  import { onMount } from 'svelte';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import { API_URL } from "$lib/config";

  let blog_title = "";
  let blog_content = "";
  let blog_author = "";
  let blog_date = "";
  let blog_image;
  let loading = false;
  let publish_date = "";
let is_active = true;


  let editorElement;
  let editorInstance;

  onMount(() => {
  ClassicEditor.create(editorElement, {
    placeholder: 'Write your blog content here...',
    toolbar: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'numberedList',
      'bulletedList',
      'link',
      'blockQuote',
      'insertTable',
      'imageUpload',
      'undo',
      'redo'
    ]
  }).then(editor => {
    editorInstance = editor;

    editor.model.document.on('change:data', () => {
      blog_content = editor.getData();
    });
  });
});


  async function submitBlog() {
    loading = true;

    const formData = new FormData();
    formData.append("blog_title", blog_title);
    formData.append("blog_content", blog_content);
    formData.append("blog_author", blog_author);
    formData.append("blog_date", blog_date);
    formData.append("blog_image", blog_image);
    formData.append("publish_date", publish_date);
    formData.append("is_active", is_active);


    const res = await fetch(`${API_URL}/newblog`, {
      method: "POST",
      body: formData,
    });

    loading = false;

    if (res.ok) {
      window.location.href = "/Dynamic_Blog";
    } else {
      alert("Failed to create blog");
    }
  }
</script>

  
  <div class=" px-[180px] pt-10">
    
    
    <div class="flex justify-between items-center mb-6">

      <h1 class="text-2xl font-bold mb-6">Create Blog</h1>
      <div class="flex justify-end hover:cursor-pointer mb-6">
        <div class="bg-black text-white text-xl w-[80px] h-[40px] rounded-4xl items-center flex justify-center">
            <i class="fas fa-angle-left text-[15px]" ></i>
  
  
            <a href="/All_Blogs" class="text-[15px]">Back</a>
        </div>
     
    </div>
    </div>

  
    <form on:submit|preventDefault={submitBlog} class="space-y-5">

      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">
          Blog Title
        </label>
        <input
          class="w-full border rounded px-3 py-2"
          placeholder="Enter blog title"
          bind:value={blog_title}
          required
        />
      </div>
    
    
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">
          Blog Content
        </label>
        <div class="w-full rounded py-2">
          <div bind:this={editorElement}></div>
        </div>
      </div>
    
  
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">
          Author Name
        </label>
        <input
          class="w-full border rounded px-3 py-2"
          placeholder="Enter author name"
          bind:value={blog_author}
        />
      </div>
    

      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">
          Blog Date
        </label>
        <input
          type="date"
          class="w-full border rounded px-3 py-2"
          bind:value={blog_date}
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
          Blog Image
        </label>
        <input
          type="file"
          class="border bg-grey-100 rounded px-3 py-2 w-full"
          on:change={(e) => (blog_image = e.target.files[0])}
          required
        />
      </div>

      <button
        class="bg-blue-900 text-white w-full py-2 rounded hover:bg-blue-900"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Submit"}
      </button>
    
    </form>
    
  </div>
  