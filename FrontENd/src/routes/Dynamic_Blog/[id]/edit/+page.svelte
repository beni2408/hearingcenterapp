<script>
  import { BLOG_API_URL } from "$lib/config";
  import { page } from "$app/stores";
  import { onMount, tick } from "svelte";

  let blog = null;
  let blog_image = null;
  let loading = false;
  let id;

  let publish_date = "";
  let is_active = true;

  let editorElement;
  let editorInstance;

  onMount(async () => {
    const ClassicEditor = (await import('@ckeditor/ckeditor5-build-classic')).default;

    id = $page.params.id;

    const res = await fetch(`${BLOG_API_URL}/${id}`);
    const json = await res.json();

    blog = json.data.blog;

    // ✅ FIX DATE FORMAT
    blog.blog_date = blog.blog_date?.split("T")[0];
    publish_date = blog.publish_date?.split("T")[0];

    is_active = blog.is_active;

    await tick();

    // ✅ INIT EDITOR
    editorInstance = await ClassicEditor.create(editorElement, {
      placeholder: "Edit your blog content here..."
    });

    // ✅ FIX CONTENT (EN ONLY)
    editorInstance.setData(blog.blog_content?.en || "");

    editorInstance.model.document.on("change:data", () => {
      blog.blog_content.en = editorInstance.getData();
    });
  });

  async function updateBlog() {
    loading = true;

    const formData = new FormData();

    // ✅ SEND ONLY ENGLISH (IMPORTANT)
    formData.append("blog_title", blog.blog_title.en);
    formData.append("blog_content", blog.blog_content.en);
    formData.append("blog_author", blog.blog_author);
    formData.append("blog_date", blog.blog_date);
    formData.append("publish_date", publish_date);
    formData.append("is_active", is_active);

    if (blog_image) {
      formData.append("blog_image", blog_image);
    }

    try {
      const res = await fetch(`${BLOG_API_URL}/updateblog/${id}`, {
        method: "PUT",
        body: formData
      });

      loading = false;

      if (res.ok) {
        alert("Blog updated successfully!");
        window.location.href = "/All_Blogs";
      } else {
        const text = await res.text();
        console.error("SERVER ERROR:", text);
        alert("Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
      loading = false;
    }
  }
</script>

<div class="px-[180px] pt-10">
  <!-- HEADER -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold mb-6">Edit Blog</h1>

    <a
      href="/All_Blogs"
      class="bg-black text-white px-4 py-2 rounded"
    >
      ← Back
    </a>
  </div>

  {#if blog}
    <form on:submit|preventDefault={updateBlog} class="space-y-5">

      <!-- TITLE -->
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">
          Blog Title
        </label>
        <input
          class="w-full border rounded px-3 py-2"
          bind:value={blog.blog_title.en}
          required
        />
      </div>

      <!-- CONTENT -->
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">
          Blog Content
        </label>
        <div class="w-full rounded py-2">
          <div bind:this={editorElement}></div>
        </div>
      </div>

      <!-- AUTHOR -->
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">
          Author Name
        </label>
        <input
          class="w-full border rounded px-3 py-2"
          bind:value={blog.blog_author}
        />
      </div>

      <!-- BLOG DATE -->
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

      <!-- PUBLISH DATE -->
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

      <!-- STATUS -->
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

      <!-- CURRENT IMAGE -->
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

      <!-- CHANGE IMAGE -->
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

      <!-- SUBMIT -->
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