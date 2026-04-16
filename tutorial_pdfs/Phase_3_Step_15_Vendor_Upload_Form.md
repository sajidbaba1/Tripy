# YouTube Masterclass Lesson 15: The Business Vendor Upload Engine

## Instructor Opening Script (To Camera)
"Welcome back! At this point, our Tripy catalog is capable of fetching thousands of trips directly from PostgreSQL into our React UI. But how do those trips get into the database in the first place?

We need to empower our Business vendors. Today, we are opening up the Business Portal and building the 'Trip Wizard'. This is a massive, multi-input form layout where vendors will upload their package titles, pricing, and most importantly, physically inject their glossy photography directly into our Cloudinary storage bucket!"

---

## Part 1: Crafting the Trip Wizard UI

### Instructor Script (Screen Recording VS Code)
"We want our vendor experience to feel as premium as our customer experience. We are not using basic HTML native inputs. We will construct a frosted-glass panel using Tailwind CSS and integrate a dynamic drag-and-drop Image Uploader interface."

### Code to Type (`frontend/src/pages/business/TripWizard.tsx`)
"Inside `src/pages`, create a new folder called `business` and craft `TripWizard.tsx`:"

```tsx
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TripWizard() {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    imageFile: null as File | null,
    previewUrl: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        imageFile: file,
        previewUrl: URL.createObjectURL(file) // Live preview blob!
      });
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate Cloudinary & Spring Boot Delay for now
    setTimeout(() => {
       alert("Trip Sent to Database! (Integration next lesson)");
       setIsUploading(false);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2">Publish a <span className="text-brand">New Trip</span></h1>
        <p className="opacity-60">Fill out your package details. Approved listings go live globally instantly.</p>
      </div>

      <form onSubmit={handlePublish} className="glass-card p-10 flex flex-col gap-8 border-t-4 border-brand shadow-2xl">
        
        {/* Row 1: Title and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="flex flex-col gap-2">
              <label className="font-bold opacity-80 text-sm">Trip Title</label>
              <input type="text" placeholder="e.g. Kyoto Temple Retreat" required className="p-4 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 border border-transparent focus:border-brand outline-none transition-all" />
           </div>
           
           <div className="flex flex-col gap-2">
              <label className="font-bold opacity-80 text-sm">Location</label>
              <input type="text" placeholder="e.g. Kyoto, Japan" required className="p-4 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 border border-transparent focus:border-brand outline-none transition-all" />
           </div>
        </div>

        {/* Row 2: Price and Description */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
           <div className="flex flex-col gap-2">
              <label className="font-bold opacity-80 text-sm">Price per Person (USD)</label>
              <input type="number" placeholder="599.00" min="1" required className="p-4 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 border border-transparent focus:border-brand outline-none transition-all" />
           </div>
           
           <div className="flex flex-col gap-2">
              <label className="font-bold opacity-80 text-sm">Rich Description</label>
              <textarea placeholder="Describe the magical experience..." rows={4} required className="p-4 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 border border-transparent focus:border-brand outline-none resize-none transition-all" />
           </div>
        </div>

        {/* Big Image Uploader Zone */}
        <div className="flex flex-col gap-2">
           <label className="font-bold opacity-80 text-sm">Hero Photograph</label>
           
           <label className="relative cursor-pointer w-full h-64 rounded-2xl border-2 border-dashed border-gray-400 hover:border-brand transition-all flex flex-col items-center justify-center bg-gray-100/10 dark:bg-gray-900/10 overflow-hidden group">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              
              {formData.previewUrl ? (
                 <img src={formData.previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
              ) : (
                 <div className="text-center font-bold opacity-50 flex flex-col items-center gap-3">
                    <span className="text-4xl">📸</span>
                    <p>Click to Upload High-Res Image</p>
                 </div>
              )}
           </label>
        </div>

        {/* Form Action Barrier */}
        <div className="border-t border-gray-500/20 pt-6 mt-4 flex justify-end">
           <button 
             type="submit" 
             disabled={isUploading}
             className="px-10 py-4 rounded-xl bg-brand text-white font-black text-lg hover:shadow-xl hover:shadow-brand/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
           >
             {isUploading ? "Uploading Securely..." : "Publish Trip to Catalog 🚀"}
           </button>
        </div>

      </form>
    </motion.div>
  );
}
```

### Explanation for the Audience:
"Pay extremely close attention to the `handleImageChange` block. When a user uploads a physical image file to their browser, it is a raw payload. We use `URL.createObjectURL(file)` to dynamically generate a temporary browser string that we can slap straight into our `<img src>` tag! This allows the Vendor to see a beautiful Live Preview of their photo long before they even submit the form!"

---

## Instructor Outro (To Camera)
"Our form is gorgeous. The inputs scale beautifully, the responsive grid collapses perfectly on mobile, and the dynamic image uploader gives incredible feedback.

However, right now, our submit button has a fake timer on it!
In our next deeply technical lesson, we are going to write a `multipart/form-data` Axios payload, configure our Cloudinary SDK keys, and blast that image file across the internet to the cloud, taking the resulting permanent URL and shoving it into PostgreSQL! See you there!"
