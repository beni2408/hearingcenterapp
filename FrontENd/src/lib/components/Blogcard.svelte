<script>
  export let blog = {};
  export let lang = "en";
  export let link = "#";

  // 🔥 Derived values (reactive)
  $: image =
    blog?.blog_image
      ? blog.blog_image.startsWith("http")
        ? blog.blog_image
        : `http://localhost:4000/${blog.blog_image}`
      : "/blog1.png"; // fallback image

  $: title =
    typeof blog?.blog_title === "string"
      ? blog.blog_title
      : blog?.blog_title?.[lang] || blog?.blog_title?.en || "No Title";

  $: content =
    typeof blog?.blog_content === "string"
      ? blog.blog_content
      : blog?.blog_content?.[lang] || blog?.blog_content?.en || "";

  $: description = content
    .replace(/<[^>]+>/g, "")
    .slice(0, 120);

  $: formattedDate = blog?.blog_date
    ? new Date(blog.blog_date).toLocaleDateString("en-GB")
    : "";
</script>

<div class="flex flex-col h-[600px] w-[400px] shadow-2xl rounded-lg justify-between bg-white">
  
  <!-- TOP -->
  <div class="flex flex-col">
    
    <!-- IMAGE -->
    <img
      src={image}
      alt="blog image"
      class="rounded-t-lg h-56 w-full object-cover"
      on:error={(e) => (e.target.src = "/blog1.png")}
    />

    <!-- TITLE -->
    <h1 class="font-bold text-xl mx-6 mt-6">
      {title}
    </h1>

    <!-- DESCRIPTION -->
    <p class="font-normal text-sm mx-6 mt-4 text-gray-500 text-justify line-clamp-4">
      {description}
    </p>

    <!-- READ MORE -->
    <a
      href={link}
      class="text-sm font-bold mx-6 mt-4 text-blue-900 hover:underline"
    >
      READ MORE
    </a>
  </div>

  <!-- BOTTOM -->
  <div class="flex flex-col mb-5">
    <div class="w-full border border-gray-200"></div>

    <p class="text-gray-400 font-bold text-sm mt-3 mx-6">
      {formattedDate}
    </p>
  </div>
</div>