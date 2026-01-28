<script>
    export let image;
    export let name;
    export let description;
</script>

<div class=" w-[280px] h-[400px] rounded-lg">
    <img src={image} class="rounded-lg w-[280px] h-[220px]"  alt="">
    <h2 class="text-xl  font-bold text-blue-900 mb-4 mt-3">
        {name}
      </h2>
      <p class="text-gray-600 leading-relaxed text-sm text-justify ">
        {description}
      </p>
</div>