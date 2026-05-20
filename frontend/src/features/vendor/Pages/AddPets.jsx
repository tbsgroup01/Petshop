import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Rocket } from "lucide-react";
import Header from "../Components/Header";
import UploadImagesStep from "./UploadImagesStep";
import { listingService } from "../../../services";

const AddPetForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [petType, setPetType] = useState("Dog");
  const [serviceCategory, setServiceCategory] = useState("sell");
  const [gender, setGender] = useState("Male");
  const [breed, setBreed] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [serviceTime, setServiceTime] = useState("");
  const [description, setDescription] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [deworming, setDeworming] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [publishing, setPublishing] = useState(false);

  const steps = [
    "Basic Info",
    "Details",
    "Health Info",
    "Upload Images",
    "Publish",
  ];

  const goNext = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handlePublish = async () => {
    try {
      setPublishing(true);
      const parsedAge = parseInt(String(ageRange).replace(/[^\d]/g, ""), 10);
      const parsedPrice = Number(price);

      if (!breed.trim()) {
        alert("Breed is required");
        return;
      }

      if (!Number.isInteger(parsedAge) || parsedAge <= 0) {
        alert("Age must be a valid number (example: 1 or 2)");
        return;
      }

      if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
        alert("Price must be greater than 0");
        return;
      }

      if (serviceCategory !== "sell" && (!serviceDate || !serviceTime)) {
        alert("Please select service date and time for Day Care or Meeting.");
        return;
      }

      const [city = "Mumbai", state = "MH"] = (location || "Mumbai, MH")
        .split(",")
        .map((item) => item.trim());

      const listingTypeMap = {
        sell: "sell",
        day_care: "buy",
        meeting: "mating",
      };

      await listingService.createListing({
        title: `${breed || petType} Listing`,
        petType,
        breed: breed || `${petType} Breed`,
        age: parsedAge,
        gender,
        description: [
          description,
          serviceCategory !== "sell" ? `Preferred Date: ${serviceDate}` : "",
          serviceCategory !== "sell" ? `Preferred Time: ${serviceTime}` : "",
        ]
          .filter(Boolean)
          .join(" | "),
        listingType: listingTypeMap[serviceCategory] || "sell",
        price: parsedPrice,
        city,
        state,
        healthInfo: [vaccination, deworming, medicalNotes]
          .filter(Boolean)
          .join(" | "),
        image: uploadedImages?.[0]?.file || null,
      });

      alert(
        "Listing submitted for admin approval. It will be shown on main UI after approval.",
      );
      navigate("/vendor/pets", { replace: true });
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to publish listing");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FD] text-slate-800 font-sans">
      <main className="flex-1 flex flex-col">
        <Header />

        <div className="w-full mx-auto px-4 sm:px-6 lg:px-10 py-12">
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
                <span
                  className={
                    i + 1 <= currentStep ? "text-indigo-600" : "text-gray-400"
                  }
                >
                  {step}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 mb-8">
            {currentStep === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label="Pet Type"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  options={[
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
                    { value: "sell", label: "Sell" },
                    { value: "day_care", label: "Day Care" },
                    { value: "meeting", label: "Meeting" },
                  ]}
                />
                <InputField
                  label="Breed"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="Golden Retriever"
                />
                <InputField
                  label="Age"
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  placeholder="1-3 years"
                  type="number"
                  min="0"
                />

                <SelectField
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="15000"
                  type="number"
                  min="0"
                  max="1000000"
                />
                <InputField
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Mumbai, MH"
                />
                {serviceCategory !== "sell" && (
                  <>
                    <InputField
                      label="Service Date"
                      value={serviceDate}
                      onChange={(e) => setServiceDate(e.target.value)}
                      placeholder="YYYY-MM-DD"
                      type="date"
                    />
                    <InputField
                      label="Service Time"
                      value={serviceTime}
                      onChange={(e) => setServiceTime(e.target.value)}
                      placeholder="HH:MM"
                      type="time"
                    />

                    <InputField
                      label="Additional Details"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Any specific requirements or notes for the service"
                      className="sm:col-span-2 h-auto "
                    />
                  </>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label="Vaccination"
                  value={vaccination}
                  onChange={(e) => setVaccination(e.target.value)}
                  options={[
                    { value: "up_to_date", label: "Up to Date" },
                    { value: "not_vaccinated", label: "Not Vaccinated" },
                    { value: "unknown", label: "Unknown" },
                  ]}
                />
                <SelectField
                  label="Deworming"
                  value={deworming}
                  onChange={(e) => setDeworming(e.target.value)}
                  options={[
                    { value: "completed", label: "Completed" },
                    { value: "not_done", label: "Not Done" },
                    { value: "unknown", label: "Unknown" },
                  ]}
                />
                <div className="sm:col-span-2">
                  <label className="text-sm font-bold text-slate-700">
                    Medical Notes
                  </label>
                  <textarea
                    value={medicalNotes}
                    onChange={(e) => setMedicalNotes(e.target.value)}
                    className="mt-2 w-full p-3 rounded-xl bg-gray-50"
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
              <div className="text-sm text-slate-600">
                Review complete. This listing will be sent to admin for approval
                and shown on main UI after approval.
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              onClick={
                currentStep === 1 ? () => navigate("/vendor/pets") : goBack
              }
              className="flex items-center gap-2 text-sm font-bold text-gray-500"
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

const InputField = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 bg-gray-50 rounded-xl"
    />
  </div>
);

const SelectField = ({ label, value, onChange, options = [] }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full p-3 bg-gray-50 rounded-xl"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default AddPetForm;
