<script>
  import { BLOG_API_URL } from "$lib/config";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { currentLang } from "$lib/stores/lang";

  let lang;

  currentLang.subscribe((value) => {
    lang = value;
  });

  let blog = null;
  let loading = true;

  onMount(async () => {
    const id = $page.params.id;

    const res = await fetch(`${BLOG_API_URL}/${id}`);
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

  <!-- LANGUAGE SWITCH -->
  <div class="flex gap-3 mb-4">
    <button on:click={() => currentLang.set("en")}>EN</button>
    <button on:click={() => currentLang.set("ta")}>TA</button>
    <button on:click={() => currentLang.set("ar")}>AR</button>
    <button on:click={() => currentLang.set("ml")}>ML</button>
  </div>

  {#if loading}
    <p class="text-gray-500">Loading blog...</p>

  {:else if blog}

    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">

      <!-- ✅ ONLY TITLE RTL -->
      <h1 
        class="text-3xl font-bold mb-4"
        dir={lang === "ar" ? "rtl" : "ltr"}
        class:text-right={lang === "ar"}
      >
        {blog.blog_title?.[lang] || blog.blog_title?.en}
      </h1>

      <!-- BACK BUTTON -->
      <div class="flex justify-end mb-6">
        <div class="bg-black text-white text-xl w-[80px] h-[40px] rounded-4xl flex items-center justify-center">
          <i class="fas fa-angle-left text-[15px]"></i>
          <a href="/Dynamic_Blog" class="text-[15px] ml-1">Back</a>
        </div>
      </div>

    </div>

    <!-- ❌ NO RTL HERE -->
    <div class="flex items-center text-sm text-gray-500 mb-6">
      <span>By {blog.blog_author}</span>
      <span class="mx-2">•</span>
      <span>{new Date(blog.blog_date).toLocaleDateString()}</span>
    </div>

    <!-- IMAGE -->
    <img
      src={blog.blog_image}
      alt="blog image"
      class="w-full h-[400px] object-contain rounded-lg mb-6"
    />

    <!-- ✅ ONLY CONTENT RTL -->
    <p 
      class="text-gray-700 leading-relaxed whitespace-pre-line"
      dir={lang === "ar" ? "rtl" : "ltr"}
      class:text-right={lang === "ar"}
    >
      {@html blog.blog_content?.[lang] || blog.blog_content?.en}
    </p>

    <!-- BACK BUTTON -->
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