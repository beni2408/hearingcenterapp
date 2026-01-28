/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    const response = await fetch("http://localhost:4000/api/contactus/allcontacts");
    
    if (!response.ok) {
      return { contacts: [] };
    }
    
    const result = await response.json();
    return { contacts: result.data.contacts || [] };
  } catch (error) {
    return { contacts: [] };
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  submitContact: async ({ request }) => {
    const formData = await request.formData();

    const payload = {
      First_Name: formData.get("First_Name"),
      Last_Name: formData.get("Last_Name"),
      Email: formData.get("Email"),
      Phone_Number: formData.get("Phone_Number"),
      Message: formData.get("Message"),
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/contactus/newcontact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        return { success: false, message: "Failed to submit contact" };
      }

      return { success: true, message: "Contact submitted successfully!" };
    } catch (error) {
      return { success: false, message: "Server connection error" };
    }
  },
};
