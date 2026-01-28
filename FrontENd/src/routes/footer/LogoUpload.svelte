<script>
    import { API_BASE_URL } from "$lib/config";
  
    async function uploadLogo(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("logo", file);
  
      await fetch(`${API_BASE_URL}/footer/upload-logo`, {
        method: "POST",
        body: formData
      });
  
      alert("Logo uploaded");
      location.reload();
    }
  </script>
  
  <input type="file" on:change={uploadLogo} />
  