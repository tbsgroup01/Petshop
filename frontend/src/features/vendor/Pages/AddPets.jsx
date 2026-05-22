




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, ChevronRight, Rocket } from "lucide-react";
// import Header from "../Components/Header";
// import UploadImagesStep from "./UploadImagesStep";
// import { listingService } from "../../../services";

// // 20 Dog and 20 Cat breeds data helper
// const breedData = {
//   Dog: [
//     { value: "Labrador Retriever", label: "Labrador Retriever" },
//     { value: "German Shepherd", label: "German Shepherd" },
//     { value: "Golden Retriever", label: "Golden Retriever" },
//     { value: "French Bulldog", label: "French Bulldog" },
//     { value: "Beagle", label: "Beagle" },
//     { value: "Poodle", label: "Poodle" },
//     { value: "Rottweiler", label: "Rottweiler" },
//     { value: "Pug", label: "Pug" },
//     { value: "Boxer", label: "Boxer" },
//     { value: "Siberian Husky", label: "Siberian Husky" },
//     { value: "Dachshund", label: "Dachshund" },
//     { value: "Great Dane", label: "Great Dane" },
//     { value: "Shih Tzu", label: "Shih Tzu" },
//     { value: "Doberman Pinscher", label: "Doberman Pinscher" },
//     { value: "Pomeranian", label: "Pomeranian" },
//     { value: "Chihuahua", label: "Chihuahua" },
//     { value: "Cocker Spaniel", label: "Cocker Spaniel" },
//     { value: "Maltese", label: "Maltese" },
//     { value: "Indie / Indie-Dog", label: "Indie / Indie-Dog" },
//     { value: "Other Dog Breed", label: "Other" },
//   ],
//   Cat: [
//     { value: "Persian", label: "Persian" },
//     { value: "Siamese", label: "Siamese" },
//     { value: "Maine Coon", label: "Maine Coon" },
//     { value: "Bengal", label: "Bengal" },
//     { value: "Ragdoll", label: "Ragdoll" },
//     { value: "British Shorthair", label: "British Shorthair" },
//     { value: "Sphynx", label: "Sphynx" },
//     { value: "Abyssinian", label: "Abyssinian" },
//     { value: "Scottish Fold", label: "Scottish Fold" },
//     { value: "Burmese", label: "Burmese" },
//     { value: "Russian Blue", label: "Russian Blue" },
//     { value: "American Shorthair", label: "American Shorthair" },
//     { value: "Birman", label: "Birman" },
//     { value: "Himalayan", label: "Himalayan" },
//     { value: "Bombay", label: "Bombay" },
//     { value: "Munchkin", label: "Munchkin" },
//     { value: "Turkish Angora", label: "Turkish Angora" },
//     { value: "Exotic Shorthair", label: "Exotic Shorthair" },
//     { value: "Indian Billi", label: "Indian Billi" },
//     { value: "Other Cat Breed", label: "Other" },
//   ],
//   Other: [{ value: "Other Breed", label: "Other Breed" }],
// };

// const AddPetForm = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
  
//   const [petType, setPetType] = useState("");
//   const [serviceCategory, setServiceCategory] = useState("");
//   const [gender, setGender] = useState("");
//   const [breed, setBreed] = useState("");
//   const [ageRange, setAgeRange] = useState("");
//   const [price, setPrice] = useState("");

//   const [location, setLocation] = useState("");
//   const [stateName, setStateName] = useState("");

//   const [serviceDate, setServiceDate] = useState("");
//   const [serviceTime, setServiceTime] = useState("");
//   const [description, setDescription] = useState("");
//   const [vaccination, setVaccination] = useState("");
//   const [medicalCondition, setMedicalCondition] = useState("");
//   const [medicalNotes, setMedicalNotes] = useState("");
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [publishing, setPublishing] = useState(false);

//   // Extra Meeting state fields
//   const [bloodline, setBloodline] = useState("KCI Certified / Pure Breed");

//   const steps = [
//     "Basic Info",
//     "Details",
//     "Health Info",
//     "Upload Images",
//     "Publish",
//   ];

//   const handlePetTypeChange = (e) => {
//     setPetType(e.target.value);
//     setBreed(""); 
//   };

//   const validateStep = (stepToCheck = currentStep) => {
//     if (stepToCheck === 1) {
//       if (!petType) return alert("Please select a Pet Type"), false;
//       if (!serviceCategory) return alert("Please select a Service Category"), false;
//       if (!breed) return alert("Please select a Breed"), false;
//       if (!ageRange) return alert("Please select an Age"), false;
//       if (!gender) return alert("Please select a Gender"), false;
//     }

//     if (stepToCheck === 2) {
//       const parsedPrice = Number(price);
//       if (!price || Number.isNaN(parsedPrice) || parsedPrice < 0) {
//         return alert("Price must be 0 or greater"), false;
//       }
//       if (!location.trim()) return alert("Location (City) is required"), false;
//       if (!stateName.trim()) return alert("State is required"), false;
      
//       if (serviceCategory !== "sell") {
//         if (!serviceDate) return alert("Please select a Service Date"), false;
//         if (!serviceTime) return alert("Please select a Service Time"), false;
//       }
//     }

//     if (stepToCheck === 3) {
//       if (!vaccination) return alert("Please select Vaccination status"), false;
//       if (!medicalCondition) return alert("Please select Medical Condition"), false;
//     }

//     if (stepToCheck === 4) {
//       if (!uploadedImages || uploadedImages.length === 0) {
//         return alert("Please upload at least one image of the pet"), false;
//       }
//     }

//     return true;
//   };

//   const validateAllSteps = () => {
//     for (let i = 1; i <= 4; i++) {
//       if (!validateStep(i)) return false;
//     }
//     return true;
//   };

//   const goNext = () => {
//     if (validateStep()) {
//       setCurrentStep((prev) => Math.min(prev + 1, 5));
//     }
//   };

//   const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

//   const handlePublish = async () => {
//     if (!validateAllSteps()) return;

//     try {
//       setPublishing(true);
      
//       const parsedAge = parseInt(ageRange, 10) || 0;
//       const parsedPrice = Number(price);

//       const listingTypeMap = {
//         sell: "sell",
//         day_care: "buy",
//         meeting: "mating", 
//       };

//       const finalDescription = [
//         description,
//         serviceCategory === "meeting" ? `Meeting Fee: INR ${parsedPrice}` : "",
//         serviceCategory === "meeting" ? `Bloodline Info: ${bloodline}` : "",
//         serviceCategory !== "sell" ? `Preferred Date: ${serviceDate}` : "",
//         serviceCategory !== "sell" ? `Preferred Time: ${serviceTime}` : "",
//       ]
//         .filter(Boolean)
//         .join(" | ");

//       const payload = {
//         title: `${breed || petType} ${serviceCategory === "meeting" ? "Mating Request" : "Listing"}`,
//         petType,
//         breed: breed || `${petType} Breed`,
//         age: parsedAge,
//         gender,
//         description: finalDescription,
//         listingType: listingTypeMap[serviceCategory] || "sell",
//         price: parsedPrice,
//         matingFee: parsedPrice, 
//         mating_fee: parsedPrice,
//         bloodline: bloodline,   
//         bloodline_info: bloodline, 
//         city: location.trim(),
//         state: stateName.trim(),
//         healthInfo: [vaccination, medicalCondition, medicalNotes]
//           .filter(Boolean)
//           .join(" | "),
//         image: uploadedImages?.[0]?.file || null,
//       };

//       console.log("Submitting Adjusted Payload: ", payload);

//       await listingService.createListing(payload);

//       alert("Listing submitted successfully for admin review!");
//       navigate("/vendor/pets", { replace: true });
//     } catch (error) {
//       console.error("Submission Error Details:", error);
//       alert(error?.response?.data?.message || error?.message || "Failed to publish listing.");
//     } finally {
//       setPublishing(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F8F9FD] text-slate-800 font-sans">
//       <main className="flex-1 flex flex-col">
//         <Header />

//         <div className="w-full mx-auto px-4 sm:px-6 lg:px-10 py-12">
//           <div className="mb-10">
//             <h2 className="text-xl font-bold text-slate-800">
//               Add New Pet Listing
//             </h2>
//             <p className="text-slate-500 text-sm">
//               Create listing in 5 quick steps.
//             </p>
//           </div>

//           <div className="flex items-center justify-between mb-10">
//             {steps.map((step, i) => (
//               <div key={step} className="text-xs font-bold">
//                 <span className={i + 1 <= currentStep ? "text-indigo-600" : "text-gray-400"}>
//                   {step}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <div className="bg-white rounded-3xl p-6 border border-gray-100 mb-8">
//             {currentStep === 1 && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 bg-red-400 ">
//                 <SelectField
                 
//                   label="Pet Type"
//                   value={petType}
//                   onChange={handlePetTypeChange}
//                   options={[
//                     { value: "", label: "-- Select Pet Type --" },
//                     { value: "Dog", label: "Dog" },
//                     { value: "Cat", label: "Cat" },
//                     { value: "Other", label: "Other" },
//                   ]}
//                 />

//                 <SelectField
//                   label="Service Category"
//                   value={serviceCategory}
//                   onChange={(e) => setServiceCategory(e.target.value)}
//                   options={[
//                     { value: "", label: "-- Select Service Category --" },
//                     { value: "sell", label: "Sell" },
//                     { value: "day_care", label: "Day Care" },
//                     { value: "meeting", label: "Meeting (Mating)" },
//                   ]}
//                 />

//                 <SelectField
//                   label="Breed"
//                   value={breed}
//                   onChange={(e) => setBreed(e.target.value)}
//                   options={[
//                     { value: "", label: "-- Select Breed --" },
//                     ...(breedData[petType] || [])
//                   ]}
//                   disabled={!petType}
//                 />

//                 <SelectField
//                   label="Age"
//                   value={ageRange}
//                   onChange={(e) => setAgeRange(e.target.value)}
//                   options={[
//                     { value: "", label: "-- Select Age --" },
//                     { value: "1", label: "1 Year" },
//                     { value: "2", label: "2 Years" },
//                     { value: "3", label: "3 Years" },
//                     { value: "4", label: "4 Years" },
//                     { value: "5", label: "5 Years" },
//                     { value: "6", label: "6 Years" },
//                     { value: "7", label: "7 Years" },
//                     { value: "8", label: "8 Years" },
//                     { value: "9", label: "9 Years" },
//                     { value: "10", label: "10 Years" },
//                     { value: "11", label: "11 Years" },
//                     { value: "12", label: "12 Years" },
//                     { value: "13", label: "13 Years" },
//                     { value: "14", label: "14 Years" },
//                     { value: "15", label: "15 Years" },
//                     { value: "16", label: "16 Years" },
//                     // { value: "17", label: "17 Years" },
                    
//                   ]}
//                 />

//                 <SelectField
//                   label="Gender"
//                   value={gender}
//                   onChange={(e) => setGender(e.target.value)}
//                   options={[
//                     { value: "", label: "-- Select Gender --" },
//                     { value: "Male", label: "Male" },
//                     { value: "Female", label: "Female" },
//                   ]}
//                 />
//               </div>
//             )}

//             {currentStep === 2 && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {/* Core fields - ab hamesha show honge kisi bhi category me */}
//                 <InputField
//                   label={serviceCategory === "meeting" ? "Meeting / Mating Fee" : "Price"}
//                   value={price}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (value === "") { setPrice(""); return; }
//                     if (Number(value) >= 0 && Number(value) <= 999999) { setPrice(value); }
//                   }}
//                   placeholder={serviceCategory === "meeting" ? "5000" : "15000"}
//                   type="number"
//                   min="0"
//                 />
                
//                 <InputField
//                   label="Location (City)"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   placeholder="e.g. Noida"
//                 />

//                 <InputField
//                   label="State"
//                   value={stateName}
//                   onChange={(e) => setStateName(e.target.value)}
//                   placeholder="e.g. UP"
//                 />

//                 {/* Meeting extra fields */}
//                 {serviceCategory === "meeting" && (
//                   <InputField
//                     label="Bloodline Certifications"
//                     value={bloodline}
//                     onChange={(e) => setBloodline(e.target.value)}
//                     placeholder="e.g. KCI Registered Champion Line"
//                   />
//                 )}

//                 {/* Conditional Fields for Date/Time if not pure Sell */}
//                 {serviceCategory !== "sell" && serviceCategory !== "" && (
//                   <>
//                     <InputField
//                       label="Preferred Service Date"
//                       value={serviceDate}
//                       onChange={(e) => setServiceDate(e.target.value)}
//                       type="date"
//                     />
//                     <InputField
//                       label="Preferred Service Time"
//                       value={serviceTime}
//                       onChange={(e) => setServiceTime(e.target.value)}
//                       type="time"
//                     />
//                     <div className="sm:col-span-2">
//                       <InputField
//                         label="Additional Mating/Service Details"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         placeholder="Describe pet temperament or mating preferences..."
//                       />
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {currentStep === 3 && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <SelectField 
//                  className="p-3"
//                   label="Validation / Vaccination"
//                   value={vaccination}
//                   onChange={(e) => setVaccination(e.target.value)}
//                   options={[
//                     { value: "", label: "-- Select Status --" },
//                     { value: "Yes", label: "Yes" },
//                     { value: "No", label: "No" },
//                   ]}
//                 />

//                 <SelectField
//                   label="Medical Condition"
//                   value={medicalCondition}
//                   onChange={(e) => setMedicalCondition(e.target.value)}
//                   options={[
//                     { value: "", label: "-- Select Condition --" },
//                     { value: "skin_allergy", label: "Skin Allergy" },
//                     { value: "injury", label: "Injury" },
//                     { value: "fever", label: "Fever" },
//                     { value: "disabled", label: "Disabled" },
//                     { value: "healthy", label: "Healthy" },
//                   ]}
//                 />

//                 <div className="sm:col-span-2">
//                   <label className="text-sm font-bold text-slate-700">
//                     Medical Notes / Pedigree Details
//                   </label>
//                   <textarea
//                     value={medicalNotes}
//                     onChange={(e) => setMedicalNotes(e.target.value)}
//                     className="mt-2 w-full p-3 rounded-xl bg-gray-50 focus:outline-indigo-500"
//                     rows={4}
//                   />
//                 </div>
//               </div>
//             )}

//             {currentStep === 4 && (
//               <UploadImagesStep
//                 isEmbedded
//                 images={uploadedImages}
//                 onImagesChange={setUploadedImages}
//               />
//             )}

//             {currentStep === 5 && (
//               <div className="text-sm text-slate-600 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
//                 <strong>Review Meeting Request Setup:</strong> This listing will be sent directly to admin for approval under the mating category setup.
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
//             <button
//               onClick={currentStep === 1 ? () => navigate("/vendor/pets") : goBack}
//               className="flex items-center gap-2 text-sm font-bold text-gray-500"
//             >
//               <ArrowLeft size={14} /> {currentStep === 1 ? "Cancel" : "Back"}
//             </button>

//             {currentStep < 5 ? (
//               <button
//                 onClick={goNext}
//                 className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center gap-2"
//               >
//                 Next <ChevronRight size={14} />
//               </button>
//             ) : (
//               <button
//                 onClick={handlePublish}
//                 disabled={publishing}
//                 className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center gap-2 disabled:opacity-60"
//               >
//                 {publishing ? "Publishing..." : "Publish"} <Rocket size={14} />
//               </button>
//             ) }
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// const InputField = ({ label, value, onChange, placeholder, type = "text" }) => (
//   <div className="space-y-2">
//     <label className="text-sm font-bold text-slate-700">{label}</label>
//     <input
//       type={type}
//       value={value ?? ""}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="w-full p-3 bg-gray-50 rounded-xl font-medium focus:outline-indigo-500"
//     />
//   </div>
// );

// const SelectField = ({ label, value, onChange, options = [], disabled = false }) => (
//   <div className="space-y-2">
//     <label className="text-sm font-bold text-slate-700">{label}</label>
//     <select
//       value={value}
//       onChange={onChange}
//       disabled={disabled}
//       className="w-full p-3 bg-gray-50 rounded-xl font-medium focus:outline-indigo-500 disabled:opacity-60"
//     >
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// export default AddPetForm;





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, ChevronRight, Rocket } from "lucide-react";
// import Header from "../Components/Header";
// import UploadImagesStep from "./UploadImagesStep";
// import { listingService } from "../../../services";

// // 20 Dog and 20 Cat breeds data helper
// const breedData = {
//   Dog: [
//     { value: "Labrador Retriever", label: "Labrador Retriever" },
//     { value: "German Shepherd", label: "German Shepherd" },
//     { value: "Golden Retriever", label: "Golden Retriever" },
//     { value: "French Bulldog", label: "French Bulldog" },
//     { value: "Beagle", label: "Beagle" },
//     { value: "Poodle", label: "Poodle" },
//     { value: "Rottweiler", label: "Rottweiler" },
//     { value: "Pug", label: "Pug" },
//     { value: "Boxer", label: "Boxer" },
//     { value: "Siberian Husky", label: "Siberian Husky" },
//     { value: "Dachshund", label: "Dachshund" },
//     { value: "Great Dane", label: "Great Dane" },
//     { value: "Shih Tzu", label: "Shih Tzu" },
//     { value: "Doberman Pinscher", label: "Doberman Pinscher" },
//     { value: "Pomeranian", label: "Pomeranian" },
//     { value: "Chihuahua", label: "Chihuahua" },
//     { value: "Cocker Spaniel", label: "Cocker Spaniel" },
//     { value: "Maltese", label: "Maltese" },
//     { value: "Indie / Indie-Dog", label: "Indie / Indie-Dog" },
//     { value: "Other Dog Breed", label: "Other" },
//   ],
//   Cat: [
//     { value: "Persian", label: "Persian" },
//     { value: "Siamese", label: "Siamese" },
//     { value: "Maine Coon", label: "Maine Coon" },
//     { value: "Bengal", label: "Bengal" },
//     { value: "Ragdoll", label: "Ragdoll" },
//     { value: "British Shorthair", label: "British Shorthair" },
//     { value: "Sphynx", label: "Sphynx" },
//     { value: "Abyssinian", label: "Abyssinian" },
//     { value: "Scottish Fold", label: "Scottish Fold" },
//     { value: "Burmese", label: "Burmese" },
//     { value: "Russian Blue", label: "Russian Blue" },
//     { value: "American Shorthair", label: "American Shorthair" },
//     { value: "Birman", label: "Birman" },
//     { value: "Himalayan", label: "Himalayan" },
//     { value: "Bombay", label: "Bombay" },
//     { value: "Munchkin", label: "Munchkin" },
//     { value: "Turkish Angora", label: "Turkish Angora" },
//     { value: "Exotic Shorthair", label: "Exotic Shorthair" },
//     { value: "Indian Billi", label: "Indian Billi" },
//     { value: "Other Cat Breed", label: "Other" },
//   ],
//   Other: [{ value: "Other Breed", label: "Other Breed" }],
// };

// const AddPetForm = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
  
//   const [petType, setPetType] = useState("");
//   const [serviceCategory, setServiceCategory] = useState("");
//   const [gender, setGender] = useState("");
//   const [breed, setBreed] = useState("");
//   const [ageRange, setAgeRange] = useState("");
//   const [price, setPrice] = useState("");

//   const [location, setLocation] = useState("");
//   const [stateName, setStateName] = useState("");

//   const [serviceDate, setServiceDate] = useState("");
//   const [serviceTime, setServiceTime] = useState("");
//   const [description, setDescription] = useState("");
//   const [vaccination, setVaccination] = useState("");
//   const [medicalCondition, setMedicalCondition] = useState("");
//   const [medicalNotes, setMedicalNotes] = useState("");
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [publishing, setPublishing] = useState(false);

//   // Extra Meeting state fields
//   const [bloodline, setBloodline] = useState("KCI Certified / Pure Breed");

//   const steps = [
//     "Basic Info",
//     "Details",
//     "Health Info",
//     "Upload Images",
//     "Publish",
//   ];

//   const handlePetTypeChange = (e) => {
//     setPetType(e.target.value);
//     setBreed(""); 
//   };

//   const validateStep = (stepToCheck = currentStep) => {
//     if (stepToCheck === 1) {
//       if (!petType) return alert("Please select a Pet Type"), false;
//       if (!serviceCategory) return alert("Please select a Service Category"), false;
//       if (!breed) return alert("Please select a Breed"), false;
//       if (!ageRange) return alert("Please select an Age"), false;
//       if (!gender) return alert("Please select a Gender"), false;
//     }

//     if (stepToCheck === 2) {
//       const parsedPrice = Number(price);
//       if (!price || Number.isNaN(parsedPrice) || parsedPrice < 0) {
//         return alert("Price must be 0 or greater"), false;
//       }
//       if (!location.trim()) return alert("Location (City) is required"), false;
//       if (!stateName.trim()) return alert("State is required"), false;
      
//       if (serviceCategory !== "sell") {
//         if (!serviceDate) return alert("Please select a Service Date"), false;
//         if (!serviceTime) return alert("Please select a Service Time"), false;
//       }
//     }

//     if (stepToCheck === 3) {
//       if (!vaccination) return alert("Please select Vaccination status"), false;
//       if (!medicalCondition) return alert("Please select Medical Condition"), false;
//     }

//     if (stepToCheck === 4) {
//       if (!uploadedImages || uploadedImages.length === 0) {
//         return alert("Please upload at least one image of the pet"), false;
//       }
//     }

//     return true;
//   };

//   const validateAllSteps = () => {
//     for (let i = 1; i <= 4; i++) {
//       if (!validateStep(i)) return false;
//     }
//     return true;
//   };

//   const goNext = () => {
//     if (validateStep()) {
//       setCurrentStep((prev) => Math.min(prev + 1, 5));
//     }
//   };

//   const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

//   const handlePublish = async () => {
//     if (!validateAllSteps()) return;

//     try {
//       setPublishing(true);
      
//       const parsedAge = parseInt(ageRange, 10) || 0;
//       const parsedPrice = Number(price);

//       const listingTypeMap = {
//         sell: "sell",
//         day_care: "buy",
//         meeting: "mating", 
//       };

//       const finalDescription = [
//         description,
//         serviceCategory === "meeting" ? `Meeting Fee: INR ${parsedPrice}` : "",
//         serviceCategory === "meeting" ? `Bloodline Info: ${bloodline}` : "",
//         serviceCategory !== "sell" ? `Preferred Date: ${serviceDate}` : "",
//         serviceCategory !== "sell" ? `Preferred Time: ${serviceTime}` : "",
//       ]
//         .filter(Boolean)
//         .join(" | ");

//       const payload = {
//         title: `${breed || petType} ${serviceCategory === "meeting" ? "Mating Request" : "Listing"}`,
//         petType,
//         breed: breed || `${petType} Breed`,
//         age: parsedAge,
//         gender,
//         description: finalDescription,
//         listingType: listingTypeMap[serviceCategory] || "sell",
//         price: parsedPrice,
//         matingFee: parsedPrice, 
//         mating_fee: parsedPrice,
//         bloodline: bloodline,   
//         bloodline_info: bloodline, 
//         city: location.trim(),
//         state: stateName.trim(),
//         healthInfo: [vaccination, medicalCondition, medicalNotes]
//           .filter(Boolean)
//           .join(" | "),
//         image: uploadedImages?.[0]?.file || null,
//       };

//       console.log("Submitting Adjusted Payload: ", payload);

//       await listingService.createListing(payload);

//       alert("Listing submitted successfully for admin review!");
//       navigate("/vendor/pets", { replace: true });
//     } catch (error) {
//       console.error("Submission Error Details:", error);
//       alert(error?.response?.data?.message || error?.message || "Failed to publish listing.");
//     } finally {
//       setPublishing(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F8F9FD] text-slate-800 font-sans">
//       <main className="flex-1 flex flex-col">
//         <Header />

//         <div className="w-full mx-auto px-4 sm:px-6 lg:px-10 py-12">
//           <div className="mb-10">
//             <h2 className="text-xl font-bold text-slate-800">
//               Add New Pet Listing
//             </h2>
//             <p className="text-slate-500 text-sm">
//               Create listing in 5 quick steps.
//             </p>
//           </div>

//           <div className="flex items-center justify-between mb-10">
//             {steps.map((step, i) => (
//               <div key={step} className="text-xs font-bold">
//                 <span className={i + 1 <= currentStep ? "text-indigo-600" : "text-gray-400"}>
//                   {step}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <div className="bg-white rounded-3xl p-6 border border-gray-100 mb-8">
//             {currentStep === 1 && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 ">
//                 <SelectField
//                   label="Pet Type"
//                   value={petType}
//                   onChange={handlePetTypeChange}
//                   options={[
//                     { value: "", label: "-- Select Pet Type --" },
//                     { value: "Dog", label: "Dog" },
//                     { value: "Cat", label: "Cat" },
//                     { value: "Other", label: "Other" },
//                   ]}
//                 />

//                 <SelectField
//                   label="Service Category"
//                   value={serviceCategory}
//                   onChange={(e) => setServiceCategory(e.target.value)}
//                   options={[
//                     { value: "", label: "-- Select Service Category --" },
//                     { value: "sell", label: "Sell" },
//                     { value: "day_care", label: "Day Care" },
//                     { value: "meeting", label: "Meeting (Mating)" },
//                   ]}
//                 />

//                 <SelectField
//                   label="Breed"
//                   value={breed}
//                   onChange={(e) => setBreed(e.target.value)}
//                   options={[
//                     { value: "", label: "-- Select Breed --" },
//                     ...(breedData[petType] || [])
//                   ]}
//                   disabled={!petType}
//                 />

//                 <SelectField
//                   label="Age"
//                   value={ageRange}
//                   onChange={(e) => setAgeRange(e.target.value)}
//                   options={[
//                     { value: "", label: "-- Select Age --" },
//                     { value: "1", label: "1 Year" },
//                     { value: "2", label: "2 Years" },
//                     { value: "3", label: "3 Years" },
//                     { value: "4", label: "4 Years" },
//                     { value: "5", label: "5 Years" },
//                     { value: "6", label: "6 Years" },
//                     { value: "7", label: "7 Years" },
//                     { value: "8", label: "8 Years" },
//                     { value: "9", label: "9 Years" },
//                     { value: "10", label: "10 Years" },
//                     { value: "11", label: "11 Years" },
//                     { value: "12", label: "12 Years" },
//                     { value: "13", label: "13 Years" },
//                     { value: "14", label: "14 Years" },
//                     { value: "15", label: "15 Years" },
//                     { value: "16", label: "16 Years" },
//                   ]}
//                 />

//                 <SelectField
//                   label="Gender"
//                   value={gender}
//                   onChange={(e) => setGender(e.target.value)}
//                   options={[
//                     { value: "", label: "-- Select Gender --" },
//                     { value: "Male", label: "Male" },
//                     { value: "Female", label: "Female" },
//                   ]}
//                 />
//               </div>
//             )}

//             {currentStep === 2 && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <InputField
//                   label={serviceCategory === "meeting" ? "Meeting / Mating Fee" : "Price"}
//                   value={price}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (value === "") { setPrice(""); return; }
//                     if (Number(value) >= 0 && Number(value) <= 999999) { setPrice(value); }
//                   }}
//                   placeholder={serviceCategory === "meeting" ? "5000" : "15000"}
//                   type="number"
//                   min="0"
//                 />
                
//                 <InputField
//                   label="Location (City)"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   placeholder="e.g. Noida"
//                 />

//                 <InputField
//                   label="State"
//                   value={stateName}
//                   onChange={(e) => setStateName(e.target.value)}
//                   placeholder="e.g. UP"
//                 />

//                 {serviceCategory === "meeting" && (
//                   <InputField
//                     label="Bloodline Certifications"
//                     value={bloodline}
//                     onChange={(e) => setBloodline(e.target.value)}
//                     placeholder="e.g. KCI Registered Champion Line"
//                   />
//                 )}

//                 {serviceCategory !== "sell" && serviceCategory !== "" && (
//                   <>
//                     <InputField
//                       label="Preferred Service Date"
//                       value={serviceDate}
//                       onChange={(e) => setServiceDate(e.target.value)}
//                       type="date"
//                     />
//                     <InputField
//                       label="Preferred Service Time"
//                       value={serviceTime}
//                       onChange={(e) => setServiceTime(e.target.value)}
//                       type="time"
//                     />
//                     <div className="sm:col-span-2">
//                       <InputField
//                         label="Additional Mating/Service Details"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         placeholder="Describe pet temperament or mating preferences..."
//                       />
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}

//             {currentStep === 3 && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <SelectField 
//                   label="Validation / Vaccination"
//                   value={vaccination}
//                   onChange={(e) => setVaccination(e.target.value)}
//                   options={[
//                     { value: "", label: "-- Select Status --" },
//                     { value: "Yes", label: "Yes" },
//                     { value: "No", label: "No" },
//                   ]}
//                 />

//                 <SelectField
//                   label="Medical Condition"
//                   value={medicalCondition}
//                   onChange={(e) => setMedicalCondition(e.target.value)}
//                   options={[
//                     { value: "", label: "-- Select Condition --" },
//                     { value: "skin_allergy", label: "Skin Allergy" },
//                     { value: "injury", label: "Injury" },
//                     { value: "fever", label: "Fever" },
//                     { value: "disabled", label: "Disabled" },
//                     { value: "healthy", label: "Healthy" },
//                   ]}
//                 />

//                 <div className="sm:col-span-2">
//                   <label className="text-sm font-bold text-slate-700">
//                     Medical Notes / Pedigree Details
//                   </label>
//                   <textarea
//                     value={medicalNotes}
//                     onChange={(e) => setMedicalNotes(e.target.value)}
//                     className="mt-2 w-full p-3 rounded-xl bg-gray-50 focus:outline-indigo-500 text-sm font-medium"
//                     rows={4}
//                   />
//                 </div>
//               </div>
//             )}

//             {currentStep === 4 && (
//               <UploadImagesStep
//                 isEmbedded
//                 images={uploadedImages}
//                 onImagesChange={setUploadedImages}
//               />
//             )}

//             {currentStep === 5 && (
//               <div className="text-sm text-slate-600 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
//                 <strong>Review Meeting Request Setup:</strong> This listing will be sent directly to admin for approval under the mating category setup.
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
//             <button
//               onClick={currentStep === 1 ? () => navigate("/vendor/pets") : goBack}
//               className="flex items-center gap-2 text-sm font-bold text-gray-500 animate-none"
//             >
//               <ArrowLeft size={14} /> {currentStep === 1 ? "Cancel" : "Back"}
//             </button>

//             {currentStep < 5 ? (
//               <button
//                 onClick={goNext}
//                 className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center gap-2"
//               >
//                 Next <ChevronRight size={14} />
//               </button>
//             ) : (
//               <button
//                 onClick={handlePublish}
//                 disabled={publishing}
//                 className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center gap-2 disabled:opacity-60"
//               >
//                 {publishing ? "Publishing..." : "Publish"} <Rocket size={14} />
//               </button>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// const InputField = ({ label, value, onChange, placeholder, type = "text" }) => (
//   <div className="space-y-2">
//     <label className="text-sm font-bold text-slate-700">{label}</label>
//     <input
//       type={type}
//       value={value ?? ""}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="w-full p-3 bg-gray-50 rounded-xl font-medium focus:outline-indigo-500 text-sm"
//     />
//   </div>
// );

// // Updated SelectField Component with Right Side Padding and Dropdown Icon Space
// const SelectField = ({ label, value, onChange, options = [], disabled = false }) => (
//   <div className="space-y-2">
//     <label className="text-sm font-bold text-slate-700">{label}</label>
//     <div className="relative">
//       <select
//         value={value}
//         onChange={onChange}
//         disabled={disabled}
//         className="w-full p-3 pr-12 bg-gray-50 rounded-xl font-medium focus:outline-indigo-500 disabled:opacity-60 appearance-none cursor-pointer text-sm"
//       >
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
      
//       {/* Custom Right-Aligned Arrow Icon layout */}
//       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
//         <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//         </svg>
//       </div>
//     </div>
//   </div>
// );

// export default AddPetForm;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Rocket } from "lucide-react";
import Header from "../Components/Header";
import UploadImagesStep from "./UploadImagesStep";
import { listingService } from "../../../services";

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // Returns "2026-05-21" etc.
};

// 20 Dog and 20 Cat breeds data helper
const breedData = {
  Dog: [
    { value: "Labrador Retriever", label: "Labrador Retriever" },
    { value: "German Shepherd", label: "German Shepherd" },
    { value: "Golden Retriever", label: "Golden Retriever" },
    { value: "French Bulldog", label: "French Bulldog" },
    { value: "Beagle", label: "Beagle" },
    { value: "Poodle", label: "Poodle" },
    { value: "Rottweiler", label: "Rottweiler" },
    { value: "Pug", label: "Pug" },
    { value: "Boxer", label: "Boxer" },
    { value: "Siberian Husky", label: "Siberian Husky" },
    { value: "Dachshund", label: "Dachshund" },
    { value: "Great Dane", label: "Great Dane" },
    { value: "Shih Tzu", label: "Shih Tzu" },
    { value: "Doberman Pinscher", label: "Doberman Pinscher" },
    { value: "Pomeranian", label: "Pomeranian" },
    { value: "Chihuahua", label: "Chihuahua" },
    { value: "Cocker Spaniel", label: "Cocker Spaniel" },
    { value: "Maltese", label: "Maltese" },
    { value: "Indie / Indie-Dog", label: "Indie / Indie-Dog" },
    { value: "Other Dog Breed", label: "Other" },
  ],
  Cat: [
    { value: "Persian", label: "Persian" },
    { value: "Siamese", label: "Siamese" },
    { value: "Maine Coon", label: "Maine Coon" },
    { value: "Bengal", label: "Bengal" },
    { value: "Ragdoll", label: "Ragdoll" },
    { value: "British Shorthair", label: "British Shorthair" },
    { value: "Sphynx", label: "Sphynx" },
    { value: "Abyssinian", label: "Abyssinian" },
    { value: "Scottish Fold", label: "Scottish Fold" },
    { value: "Burmese", label: "Burmese" },
    { value: "Russian Blue", label: "Russian Blue" },
    { value: "American Shorthair", label: "American Shorthair" },
    { value: "Birman", label: "Birman" },
    { value: "Himalayan", label: "Himalayan" },
    { value: "Bombay", label: "Bombay" },
    { value: "Munchkin", label: "Munchkin" },
    { value: "Turkish Angora", label: "Turkish Angora" },
    { value: "Exotic Shorthair", label: "Exotic Shorthair" },
    { value: "Indian Billi", label: "Indian Billi" },
    { value: "Other Cat Breed", label: "Other" },
  ],
  Other: [{ value: "Other Breed", label: "Other Breed" }],
};

const AddPetForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [petType, setPetType] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [price, setPrice] = useState("");

  const [location, setLocation] = useState("");
  const [stateName, setStateName] = useState("");

  const [serviceDate, setServiceDate] = useState("");
  const [serviceTime, setServiceTime] = useState("");
  const [description, setDescription] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [publishing, setPublishing] = useState(false);

  // Extra Meeting state fields
  const [bloodline, setBloodline] = useState("KCI Certified / Pure Breed");

  const steps = [
    "Basic Info",
    "Details",
    "Health Info",
    "Upload Images",
    "Publish",
  ];

  const handlePetTypeChange = (e) => {
    setPetType(e.target.value);
    setBreed(""); 
  };

  const validateStep = (stepToCheck = currentStep) => {
    if (stepToCheck === 1) {
      if (!petType) return alert("Please select a Pet Type"), false;
      if (!serviceCategory) return alert("Please select a Service Category"), false;
      if (!breed) return alert("Please select a Breed"), false;
      if (!ageRange) return alert("Please select an Age"), false;
      if (!gender) return alert("Please select a Gender"), false;
    }

    if (stepToCheck === 2) {
      const parsedPrice = Number(price);
      if (!price || Number.isNaN(parsedPrice) || parsedPrice < 0) {
        return alert("Price must be 0 or greater"), false;
      }
      if (!location.trim()) return alert("Location (City) is required"), false;
      if (!stateName.trim()) return alert("State is required"), false;
      
      if (serviceCategory !== "sell") {
        if (!serviceDate) return alert("Please select a Service Date"), false;
        if (!serviceTime) return alert("Please select a Service Time"), false;
      }
    }

    if (stepToCheck === 3) {
      if (!vaccination) return alert("Please select Vaccination status"), false;
      if (!medicalCondition) return alert("Please select Medical Condition"), false;
    }

    if (stepToCheck === 4) {
      if (!uploadedImages || uploadedImages.length === 0) {
        return alert("Please upload at least one image of the pet"), false;
      }
    }

    return true;
  };

  const validateAllSteps = () => {
    for (let i = 1; i <= 4; i++) {
      if (!validateStep(i)) return false;
    }
    return true;
  };

  const goNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handlePublish = async () => {
    if (!validateAllSteps()) return;

    try {
      setPublishing(true);
      
      const parsedAge = parseInt(ageRange, 10) || 0;
      const parsedPrice = Number(price);

      const listingTypeMap = {
        sell: "sell",
        day_care: "buy",
        meeting: "mating", 
      };

      const finalDescription = [
        description,
        serviceCategory === "meeting" ? `Meeting Fee: INR ${parsedPrice}` : "",
        serviceCategory === "meeting" ? `Bloodline Info: ${bloodline}` : "",
        serviceCategory !== "sell" ? `Preferred Date: ${serviceDate}` : "",
        serviceCategory !== "sell" ? `Preferred Time: ${serviceTime}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      const payload = {
        title: `${breed || petType} ${serviceCategory === "meeting" ? "Mating Request" : "Listing"}`,
        petType,
        breed: breed || `${petType} Breed`,
        age: parsedAge,
        gender,
        description: finalDescription,
        listingType: listingTypeMap[serviceCategory] || "sell",
        price: parsedPrice,
        matingFee: parsedPrice, 
        mating_fee: parsedPrice,
        bloodline: bloodline,   
        bloodline_info: bloodline, 
        city: location.trim(),
        state: stateName.trim(),
        healthInfo: [vaccination, medicalCondition, medicalNotes]
          .filter(Boolean)
          .join(" | "),
        image: uploadedImages?.[0]?.file || null,
      };

      console.log("Submitting Adjusted Payload: ", payload);

      await listingService.createListing(payload);

      alert("Listing submitted successfully for admin review!");
      navigate("/vendor/pets", { replace: true });
    } catch (error) {
      console.error("Submission Error Details:", error);
      alert(error?.response?.data?.message || error?.message || "Failed to publish listing.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FD] text-slate-800 font-sans">
      <main className="flex-1 flex flex-col">
        <Header />

        <div className="w-full mx-auto px-2 sm:px-2 lg:px-10 py-12">
          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-800">
              Add New Pet Listing
            </h2>
            <p className="text-slate-500 text-sm">
              Create listing in 5 quick steps.
            </p>
          </div>

          <div className="flex items-center justify-between mb-10">
            {steps.map((step, i) => (
              <div key={step} className="text-xs font-bold">
                <span className={i + 1 <= currentStep ? "text-indigo-600" : "text-gray-400"}>
                  {step}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 mb-8">
            {currentStep === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 ">
                <SelectField
                  label="Pet Type"
                  value={petType}
                  onChange={handlePetTypeChange}
                  options={[
                    { value: "", label: "-- Select Pet Type --" },
                    { value: "Dog", label: "Dog" },
                    { value: "Cat", label: "Cat" },
                    { value: "Other", label: "Other" },
                  ]}
                />

                <SelectField
                  label="Service Category"
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  options={[
                    { value: "", label: "-- Select Service Category --" },
                    { value: "sell", label: "Sell" },
                    { value: "day_care", label: "Day Care" },
                    { value: "meeting", label: "Meeting (Mating)" },
                  ]}
                />

                <SelectField
                  label="Breed"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  options={[
                    { value: "", label: "-- Select Breed --" },
                    ...(breedData[petType] || [])
                  ]}
                  disabled={!petType}
                />

                <SelectField
                  label="Age"
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  options={[
                    { value: "", label: "-- Select Age --" },
                    { value: "1", label: "1 Year" },
                    { value: "2", label: "2 Years" },
                    { value: "3", label: "3 Years" },
                    { value: "4", label: "4 Years" },
                    { value: "5", label: "5 Years" },
                    { value: "6", label: "6 Years" },
                    { value: "7", label: "7 Years" },
                    { value: "8", label: "8 Years" },
                    { value: "9", label: "9 Years" },
                    { value: "10", label: "10 Years" },
                    { value: "11", label: "11 Years" },
                    { value: "12", label: "12 Years" },
                    { value: "13", label: "13 Years" },
                    { value: "14", label: "14 Years" },
                    { value: "15", label: "15 Years" },
                    { value: "16", label: "16 Years" },
                  ]}
                />

                <SelectField
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  options={[
                    { value: "", label: "-- Select Gender --" },
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                  ]}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label={serviceCategory === "meeting" ? "Meeting / Mating Fee" : "Price"}
                  value={price}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") { setPrice(""); return; }
                    if (Number(value) >= 0 && Number(value) <= 999999) { setPrice(value); }
                  }}
                  placeholder={serviceCategory === "meeting" ? "5000" : "15000"}
                  type="number"
                  min="0"
                />
                
                <InputField
                  label="Location (City)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Noida"
                />

                <InputField
                  label="State"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  placeholder="e.g. UP"
                />

                {serviceCategory === "meeting" && (
                  <InputField
                    label="Bloodline Certifications"
                    value={bloodline}
                    onChange={(e) => setBloodline(e.target.value)}
                    placeholder="e.g. KCI Registered Champion Line"
                  />
                )}

                {serviceCategory !== "sell" && serviceCategory !== "" && (
                  <>
                    <InputField
                      label="Preferred Service Date"
                      value={serviceDate}
                      onChange={(e) => setServiceDate(e.target.value)}
                      type="date"
                      min={getTodayDateString()} // Restricted back-dates here
                    />
                    <InputField
                      label="Preferred Service Time"
                      value={serviceTime}
                      onChange={(e) => setServiceTime(e.target.value)}
                      type="time"
                    />
                    <div className="sm:col-span-2">
                      <InputField
                        label="Additional Mating/Service Details"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe pet temperament or mating preferences..."
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField 
                  label="Validation / Vaccination"
                  value={vaccination}
                  onChange={(e) => setVaccination(e.target.value)}
                  options={[
                    { value: "", label: "-- Select Status --" },
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" },
                  ]}
                />

                <SelectField
                  label="Medical Condition"
                  value={medicalCondition}
                  onChange={(e) => setMedicalCondition(e.target.value)}
                  options={[
                    { value: "", label: "-- Select Condition --" },
                    { value: "skin_allergy", label: "Skin Allergy" },
                    { value: "injury", label: "Injury" },
                    { value: "fever", label: "Fever" },
                    { value: "disabled", label: "Disabled" },
                    { value: "healthy", label: "Healthy" },
                  ]}
                />

                <div className="sm:col-span-2">
                  <label className="text-sm font-bold text-slate-700">
                    Medical Notes / Pedigree Details
                  </label>
                  <textarea
                    value={medicalNotes}
                    onChange={(e) => setMedicalNotes(e.target.value)}
                    className="mt-2 w-full p-3 rounded-xl bg-gray-50 focus:outline-indigo-500 text-sm font-medium"
                    rows={4}
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <UploadImagesStep
                isEmbedded
                images={uploadedImages}
                onImagesChange={setUploadedImages}
              />
            )}

            {currentStep === 5 && (
              <div className="text-sm text-slate-600 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                <strong>Review Meeting Request Setup:</strong> This listing will be sent directly to admin for approval under the mating category setup.
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              onClick={currentStep === 1 ? () => navigate("/vendor/pets") : goBack}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 animate-none"
            >
              <ArrowLeft size={14} /> {currentStep === 1 ? "Cancel" : "Back"}
            </button>

            {currentStep < 5 ? (
              <button
                onClick={goNext}
                className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center gap-2"
              >
                Next <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center gap-2 disabled:opacity-60"
              >
                {publishing ? "Publishing..." : "Publish"} <Rocket size={14} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const InputField = ({ label, value, onChange, placeholder, type = "text", min }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    <input
      type={type}
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      min={min} // Dynamic min attribute handled here
      className="w-full p-3 bg-gray-50 rounded-xl font-medium focus:outline-indigo-500 text-sm"
    />
  </div>
);

const SelectField = ({ label, value, onChange, options = [], disabled = false }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full p-3 pr-12 bg-gray-50 rounded-xl font-medium focus:outline-indigo-500 disabled:opacity-60 appearance-none cursor-pointer text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

export default AddPetForm;