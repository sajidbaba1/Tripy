# YouTube Masterclass Lesson 17: Sending JavaScript FormData to the Server

## Instructor Opening Script (To Camera)
"Welcome back! At this very moment, we have a Spring Boot API craving `multipart/form-data`, and a React Frontend holding a raw JPG file. Today is where they finally meet.

Standard JSON will not work when dealing with images. We must use the native JavaScript `FormData` interface. This allows us to pack text and physical files into a single unified payload. We are going to rewrite our Axios logic, staple our JWT to the headers, and blast the data across the network to our PostgreSQL server!"

---

## Part 1: Programming the TripWizard Upload Logic

### Instructor Script (Screen Recording VS Code)
"Open up `TripWizard.tsx`. We are deleting our fake 2-second timeout. Watch very closely as we instantiate `new FormData()` and append all of our state strings precisely to match the `@RequestParam` names we hardcoded in our Spring Boot Controller."

### Code to Type (`frontend/src/pages/business/TripWizard.tsx`)
"Fully replace `TripWizard.tsx` with the live integration logic:"

```tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import apiClient from '../../api/axiosConfig';

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

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageFile) {
        toast.error("Please provide a Hero Photograph for the Trip!");
        return;
    }

    setIsUploading(true);
    
    try {
        // Construct the Multipart/Form-Data Web API Payload
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('location', formData.location);
        submitData.append('price', formData.price);
        submitData.append('description', formData.description);
        submitData.append('image', formData.imageFile); // The physical file!

        // Since apiClient relies on our Axios Interceptors, our JWT is already automatically attached!
        await apiClient.post('/trips/create', submitData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        toast.success("Trip successfully published to Global Catalog!");
        
        // Reset the form after success
        setFormData({ title: '', location: '', price: '', description: '', imageFile: null, previewUrl: '' });
        
    } catch (error: any) {
        console.error(error);
        toast.error(error.response?.data || "Failed to publish trip. Check connection.");
    } finally {
        setIsUploading(false);
    }
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
              <input name="title" value={formData.title} onChange={handleTextChange} type="text" placeholder="e.g. Kyoto Temple Retreat" required className="p-4 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 border border-transparent focus:border-brand outline-none transition-all" />
           </div>
           
           <div className="flex flex-col gap-2">
              <label className="font-bold opacity-80 text-sm">Location</label>
              <input name="location" value={formData.location} onChange={handleTextChange} type="text" placeholder="e.g. Kyoto, Japan" required className="p-4 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 border border-transparent focus:border-brand outline-none transition-all" />
           </div>
        </div>

        {/* Row 2: Price and Description */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
           <div className="flex flex-col gap-2">
              <label className="font-bold opacity-80 text-sm">Price per Person (USD)</label>
              <input name="price" value={formData.price} onChange={handleTextChange} type="number" placeholder="599.00" min="1" required className="p-4 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 border border-transparent focus:border-brand outline-none transition-all" />
           </div>
           
           <div className="flex flex-col gap-2">
              <label className="font-bold opacity-80 text-sm">Rich Description</label>
              <textarea name="description" value={formData.description} onChange={handleTextChange} placeholder="Describe the magical experience..." rows={4} required className="p-4 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 border border-transparent focus:border-brand outline-none resize-none transition-all" />
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
             {isUploading ? "Uploading to Cloud..." : "Publish Trip to Catalog 🚀"}
           </button>
        </div>

      </form>
    </motion.div>
  );
}
```

### Explanation for the Audience:
"Notice how we deliberately configured Axios using `{ headers: { 'Content-Type': 'multipart/form-data' } }`. This signals to the Spring Boot network that it must parse physical boundaries, which perfectly triggers our `@RequestParam` backend decorators. 

Additionally, we did NOT have to write logic to send our JWT token. Because we are using the global `apiClient` we configured in Step 8, our Interceptor silently wraps the JWT around this request automatically in the background!"

---

## Instructor Outro (To Camera)
"Phase 3 is entirely finished. The vendor logs in, fills out the form, clicks upload, the image hits Cloudinary, PostgreSQL saves the data, and if you refresh the public Tripy Destination Catalog... your brand new trip renders right in the glass card grid perfectly!

In Phase 4, we deal with the most fun element: Live Interactions! We are going back to the frontend to build the specific Details Page for the trip, and we will integrate the amazing Nano AI Chatbot so users can negotiate directly before purchasing. Subscribe and I'll catch you there!"
