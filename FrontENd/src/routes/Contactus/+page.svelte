<script>
    export let form;
    export let data;
    
</script>

<div class="px-[80px] bg-[#266985] h-[300px] flex justify-between items-center mb-10 ">   
    <h1 class="text-yellow-300 text-[60px]">
        Contact Us
    </h1>
    <img class="h-[230px] w-[340px]" src="/blogimage1.png" alt="">
</div>

<div class="px-[80px] flex flex-col">
    <h1 class="text-4xl font-bold text-blue-950 mb-7">Get in Touch</h1>
    <p class="text-gray-500 mb-7">We are here to answer your questions about hearing loss and hearing aids</p>
    <h1 class="text-md font-bold text-blue-950 mb-7">Hearing Education</h1>
    <p class="text-gray-500 mb-7">Even though hearing is one of our most important senses, most people don’t know very much about it. That extends to how well people understand hearing aids as well. We want to make sure you are educated on hearing aids and hearing loss so you can make decisions about your own hearing treatment. We’ve gathered some frequently asked questions and answers to help you understand what you can expect from your hearing aids and how you can get the most out of them. If you have any additional questions, or would just like to talk, please contact us today.</p>

    <div class="flex flex-row items-center justify-between">
        <div class=" w-[650px] h-[650px] bg-gray-100 p-10 ">
            
            
            <form method="POST" action="?/submitContact">
               
               
                <div class="flex justify-between">

                    <div class="flex flex-col">
                        <label for="First_Name" class="text-gray-500">First Name</label>
                        <input class="h-[50px] w-[250px] bg-white border border-gray-200 rounded-sm pl-5" name="First_Name" type="text"  required>
                    </div>
                    <div class="flex flex-col">
                        <label for="Last_Name" class="text-gray-500">Last Name</label>
                        <input class="h-[50px] w-[250px] bg-white border border-gray-200 rounded-sm pl-5" name="Last_Name" type="text"  required>
                    </div>
                </div>
                <div class="flex flex-col mt-10">
                    <label for="Email" class="text-gray-500">Email</label>
                    <input class="h-[50px] w-[570px] bg-white border border-gray-200 rounded-sm pl-5" name="Email" type="text" required >
                </div>

                <div class="flex flex-col mt-10">
                    <label for="Phone_Number" class="text-gray-500">Phone</label>
                    <input class="h-[50px] w-[570px] bg-white border border-gray-200 rounded-sm pl-5" name="Phone_Number" type="number"  required>
                </div>


                <div class="flex flex-col mt-10">
                    <label for="Message" class="text-gray-500">Message</label>
                    <input class="h-[150px] w-[570px] bg-white border border-gray-200 rounded-sm pl-5" name="Message" type="text"  required>
                </div>
                <button type="submit" class= " mt-5 font-bold bg-yellow-300 text-[#0f4c5e] text-lg rounded-[40px] border-none  h-[50px] w-[120px] cursor-pointer">Submit</button>
            </form>
        </div>
        <img class="h-[600px] w-[600px]" src="/contactusmap.png" alt="">
    </div>


    <div class="mt-10">
        <h1 class="text-3xl font-bold mb-5">Contact us data</h1>
        <table class="w-full border-collapse border border-gray-300">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border border-gray-300 px-4 py-2">First Name</th>
                    <th class="border border-gray-300 px-4 py-2">Last Name</th>
                    <th class="border border-gray-300 px-4 py-2">Email</th>
                    <th class="border border-gray-300 px-4 py-2">Phone</th>
                    <th class="border border-gray-300 px-4 py-2">Message</th>
                </tr>
            </thead>
            <tbody>
                {#each data.contacts as contact}
                <tr>
                    <td class="border border-gray-300 px-4 py-2">{contact.First_Name}</td>
                    <td class="border border-gray-300 px-4 py-2">{contact.Last_Name}</td>
                    <td class="border border-gray-300 px-4 py-2">{contact.Email}</td>
                    <td class="border border-gray-300 px-4 py-2">{contact.Phone_Number}</td>
                    <td class="border border-gray-300 px-4 py-2">{contact.Message}</td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>