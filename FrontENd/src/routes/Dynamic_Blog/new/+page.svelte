<script>
  import { onMount } from "svelte";
  import { BLOG_API_URL } from "$lib/config";

  let blog_title = "";
  let blog_content = "";
  let blog_author = "";
  let blog_date = "";
  let blog_image;
  let publish_date = "";
  let is_active = true;
  let loading = false;

  let editorElement;
  let editorInstance;

  // 📝 CKEditor setup
  onMount(async () => {
    const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic")).default;

    ClassicEditor.create(editorElement, {
      placeholder: "Write your blog content here...",
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
    }).then((editor) => {
      editorInstance = editor;

      // ✅ IMPORTANT FIX
      editor.model.document.on("change:data", () => {
        blog_content = editor.getData();
      });
    });
  });

  // 🚀 Submit function
  async function submitBlog() {
    loading = true;

    // ✅ Validation
    if (!blog_content || blog_content.trim() === "") {
      alert("Blog content is required");
      loading = false;
      return;
    }

    if (!blog_image) {
      alert("Please select an image");
      loading = false;
      return;
    }

    // ✅ Image size validation (VERY IMPORTANT)
    if (blog_image.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      loading = false;
      return;
    }

    if (!blog_date) {
      blog_date = new Date().toISOString();
    }

    const formData = new FormData();
    formData.append("blog_title", blog_title);
    formData.append("blog_content", blog_content);
    formData.append("blog_author", blog_author);
    formData.append("blog_date", blog_date);
    formData.append("blog_image", blog_image);
    formData.append("publish_date", publish_date);
    formData.append("is_active", is_active);

    console.log("FORM DATA:", {
      blog_title,
      blog_content,
      blog_author,
      blog_date,
      publish_date,
      is_active,
      blog_image
    });

    try {
      const res = await fetch(`${BLOG_API_URL}/newblog`, {
        method: "POST",
        body: formData
      });

      loading = false;

      if (res.ok) {
        alert("Blog created successfully!");
        window.location.href = "/Dynamic_Blog";
      } else {
        // ✅ FIX: handle HTML error safely
        const text = await res.text();
        console.error("SERVER ERROR:", text);
        alert("Failed to create blog");
      }
    } catch (error) {
      console.error("ERROR:", error);
      alert("Server error");
      loading = false;
    }
  }
</script>

<div class="px-[180px] pt-10">
  <!-- HEADER -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold mb-6">Create Blog</h1>

    <a
      href="/All_Blogs"
      class="bg-black text-white px-4 py-2 rounded"
    >
      ← Back
    </a>
  </div>

  <!-- FORM -->
  <form on:submit|preventDefault={submitBlog} class="space-y-5">

    <!-- TITLE -->
    <div>
      <label class="block mb-1 text-sm font-medium">Blog Title</label>
      <input
        class="w-full border rounded px-3 py-2"
        bind:value={blog_title}
        required
      />
    </div>

    <!-- CONTENT -->
    <div>
      <label class="block mb-1 text-sm font-medium">Blog Content</label>
      <div bind:this={editorElement}></div>
    </div>

    <!-- AUTHOR -->
    <div>
      <label class="block mb-1 text-sm font-medium">Author Name</label>
      <input
        class="w-full border rounded px-3 py-2"
        bind:value={blog_author}
      />
    </div>

    <!-- BLOG DATE -->
    <div>
      <label class="block mb-1 text-sm font-medium">Blog Date</label>
      <input
        type="date"
        class="w-full border rounded px-3 py-2"
        bind:value={blog_date}
      />
    </div>

    <!-- PUBLISH DATE -->
    <div>
      <label class="block mb-1 text-sm font-medium">Publish Date</label>
      <input
        type="date"
        class="w-full border rounded px-3 py-2"
        bind:value={publish_date}
        required
      />
    </div>

    <!-- STATUS -->
    <div>
      <label class="block mb-1 text-sm font-medium">Blog Status</label>
      <select class="w-full border rounded px-3 py-2" bind:value={is_active}>
        <option value={true}>Active</option>
        <option value={false}>Inactive</option>
      </select>
    </div>

    <!-- IMAGE -->
    <div>
      <label class="block mb-1 text-sm font-medium">Blog Image</label>
      <input
        type="file"
        class="w-full border rounded px-3 py-2"
        on:change={(e) => (blog_image = e.target.files[0])}
        required
      />
    </div>

    <!-- SUBMIT -->
    <button
      class="bg-blue-900 text-white w-full py-2 rounded"
      disabled={loading}
    >
      {loading ? "Uploading..." : "Submit"}
    </button>

  </form>
</div>