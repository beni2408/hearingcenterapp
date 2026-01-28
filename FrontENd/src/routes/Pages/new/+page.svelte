
<script>
  import { onMount } from "svelte";
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
  import { API_BASE_URL } from "$lib/config";

  let page_title = "";
  let page_url = "";
  let page_content = "";
  let page_status = true;

  let loading = false;
  let editorElement;
  let editorInstance;

  onMount(() => {
    ClassicEditor.create(editorElement, {
      placeholder: "Write page content here...",
      toolbar: [
        "bold",
        "italic",
        "numberedList",
        "bulletedList",
        "link",
        "blockQuote",
        "insertTable",
        "undo",
        "redo",
      ],
    }).then((editor) => {
      editorInstance = editor;

      editor.model.document.on("change:data", () => {
        page_content = editor.getData() || "";
      });
    });
  });

  async function submitPage() {
    loading = true;

    const payload = {
      page_title,
      page_url,
      page_content,
      page_status,
    };

    const res = await fetch(`${API_BASE_URL}/pages/newpage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    loading = false;

    if (res.ok) {
      alert("Page created successfully");
      window.location.href = "/Pages";
    } else {
      const err = await res.json();
      alert(err.message || "Failed to create page");
    }
  }
</script>



<div class=" px-[180px] pt-10">
    <div class="flex justify-between items-center mb-6">

        <h1 class="text-2xl font-bold mb-6">New Pages</h1>
        <div class="flex justify-end hover:cursor-pointer mb-6">
          <div class="bg-black text-white text-xl w-[80px] h-[40px] rounded-4xl items-center flex justify-center">
              <i class="fas fa-angle-left text-[15px]" ></i>
    
    
              <a href="/" class="text-[15px]">Back</a>
          </div>
       
      </div>
      </div>

      <form on:submit|preventDefault={submitPage} class="space-y-5">

        <!-- Page Title -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">
            Page Title
          </label>
          <input
            type="text"
            class="w-full border rounded px-3 py-2"
            bind:value={page_title}
            placeholder="About Us"
            required
          />
        </div>
      
        <!-- Page URL -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">
            Page URL
          </label>
          <input
            type="text"
            class="w-full border rounded px-3 py-2"
            bind:value={page_url}
            placeholder="/about"
            required
          />
          <p class="text-xs text-gray-500 mt-1">
            Must start with <code>/</code> (example: /about, /services)
          </p>
        </div>
      
        <!-- Page Content -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">
            Page Content
          </label>
          <div bind:this={editorElement}></div>
        </div>
      
        <!-- Page Status -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">
            Page Status
          </label>
          <select
            class="w-full border rounded px-3 py-2"
            bind:value={page_status}
          >
            <option value={true}>Enable</option>
            <option value={false}>Disable</option>
          </select>
        </div>
      
        <button
          class="bg-blue-900 text-white w-full py-2 rounded hover:bg-blue-800"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Page"}
        </button>
      
      </form>
      
      
</div>
