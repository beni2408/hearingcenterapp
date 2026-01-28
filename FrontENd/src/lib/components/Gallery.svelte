<script>
    export let images = [
      "https://res.cloudinary.com/dlnnonzxj/image/upload/v1769003019/footer-logo/footer-logo.png",
      "https://res.cloudinary.com/dlnnonzxj/image/upload/v1768309766/uploads/n5rzmhpftmziafkdqbsk.png",
      "https://res.cloudinary.com/dlnnonzxj/image/upload/v1768280475/uploads/u2m4oogilv1wzwwppmk2.png",
    ];
  
    let index = 0;
  
    function next() {
      index = (index + 1) % images.length;
    }
  
    function prev() {
      index = (index - 1 + images.length) % images.length;
    }
  </script>
  
  <div class="w-full my-8 text-center">
    <img src={images[index]} class="mx-auto rounded shadow w-[600px]" />
  
    <div class="mt-3 flex justify-center gap-4">
      <button class="bg-red-600 w-20 text-white rounded" on:click={prev}>Prev</button>
      <button class="bg-red-600 w-20 text-white rounded" on:click={next}>Next</button>
    </div>
  </div>
  