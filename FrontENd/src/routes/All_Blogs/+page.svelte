<script>
  import { currentLang } from "$lib/stores/lang";
  import { translations } from "$lib/i18n";
  import { BLOG_API_URL } from "$lib/config";
  import { onMount } from "svelte";

  let blogs = [];
  let loading = true;
  let lang;

  // 🌍 Language store
  currentLang.subscribe((value) => {
    lang = value;
  });

  // 🌍 Translation helper
  $: t = translations[lang] || translations.en;

  // 📊 Publish check
  function isPublished(publishDate, isActive) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const date = new Date(publishDate);
    date.setHours(0, 0, 0, 0);

    return isActive === true && date <= today;
  }

  // ❌ Delete
  async function deleteBlog(id) {
    const confirmed = confirm(t.delete + "?");
    if (!confirmed) return;

    const res = await fetch(`${BLOG_API_URL}/deleteblog/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      blogs = blogs.filter((blog) => blog._id !== id);
    } else {
      alert("Failed to delete blog");
    }
  }

  // 📥 Load blogs
  onMount(async () => {
    const res = await fetch(`${BLOG_API_URL}/allblogs`);
    const json = await res.json();
    blogs = json.data.blogs;
    loading = false;
  });
</script>

<!-- 🌍 RTL support -->
<div class="pt-8 px-[80px]" dir={lang === "ar" ? "rtl" : "ltr"}>

  <!-- HEADER -->
  <div class="flex justify-between items-center mb-6">
    <div class="flex gap-3 mb-4">
      <button on:click={() => currentLang.set("en")} class="px-3 py-1 border rounded">EN</button>
      <button on:click={() => currentLang.set("ta")} class="px-3 py-1 border rounded">TA</button>
      <button on:click={() => currentLang.set("ar")} class="px-3 py-1 border rounded">AR</button>
      <button on:click={() => currentLang.set("ml")} class="px-3 py-1 border rounded">ML</button>
    </div>
    <h1 class="text-2xl font-bold">{t.allBlogs}</h1>

    <a
      href="/Dynamic_Blog/new"
      class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      {t.newBlog}
    </a>
  </div>

  <!-- CONTENT -->
  {#if loading}
    <p>{t.loading}</p>

  {:else if blogs.length === 0}
    <p>{t.noBlogs}</p>

  {:else}
    <table class="w-full border">
      <thead class="bg-gray-100">
        <tr>
          <th class="border p-2">{t.title}</th>
          <th class="border p-2">{t.author}</th>
          <th class="border p-2">{t.date}</th>
          <th class="border p-2">{t.publishedStatus}</th>
          <th class="border p-2">{t.actions}</th>
          <th class="border p-2">{t.publishDate}</th>
          <th class="border p-2">{t.activeStatus}</th>
        </tr>
      </thead>

      <tbody>
        {#each blogs as blog}
          <tr>
            <!-- TITLE -->
            <td class="border p-2">
              {blog.blog_title?.[lang] || blog.blog_title?.en}
            </td>

            <!-- AUTHOR -->
            <td class="border p-2">{blog.blog_author}</td>

            <!-- DATE -->
            <td class="border p-2">
              {new Date(blog.blog_date).toDateString()}
            </td>

            <!-- PUBLISH STATUS -->
            <td class="border p-2">
              {#if isPublished(blog.publish_date, blog.is_active)}
                <span class="text-green-600 font-semibold">
                  {t.published}
                </span>
              {:else}
                <span class="text-orange-600 font-semibold">
                  {t.notPublished}
                </span>
              {/if}
            </td>

            <!-- ACTIONS -->
            <td class="border p-2 space-x-3">
              <a
                href={`/Dynamic_Blog/${blog._id}/edit`}
                class="w-[70px] rounded text-blue-900 hover:underline hover:bg-blue-900 hover:text-white px-2 py-1"
              >
                {t.edit}
              </a>

              <button
                on:click={() => deleteBlog(blog._id)}
                class="w-[70px] rounded text-red-600 hover:underline hover:bg-red-600 hover:text-white px-2 py-1"
              >
                {t.delete}
              </button>
            </td>

            <!-- PUBLISH DATE -->
            <td class="border p-2">
              {new Date(blog.publish_date).toLocaleDateString("en-GB")}
            </td>

            <!-- ACTIVE -->
            <td class="border p-2">
              {blog.is_active ? t.active : t.inactive}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>