import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapPin, IndianRupee, Calendar, ShieldCheck, ArrowLeft } from "lucide-react";
import { listingService } from "../../../services";

const fallbackImage =
  "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=1200";

const getPetTypeCategory = (value) => {
  const raw = String(value || "").toLowerCase().trim();
  if (raw.includes("dog") || raw.includes("puppy") || raw.includes("canine")) return "Dog";
  if (raw.includes("cat") || raw.includes("kitten") || raw.includes("feline")) return "Cat";
  return "Others";
};

const getListingTypeCategory = (value) => {
  const raw = String(value || "").toLowerCase().trim();
  if (raw === "buy" || raw.includes("day care") || raw.includes("daycare")) return "Buy";
  if (raw === "sell") return "Sell";
  if (raw === "meeting" || raw === "mating") return "Meeting";
  return "Sell";
};

const DogDetails = () => {
  const { identifier } = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setError("");
        const isNumericId = /^\d+$/.test(String(identifier || ""));
        const { data } = isNumericId
          ? await listingService.getListingById(identifier)
          : await listingService.getListingBySlug(identifier);
        if (!mounted) return;
        setDog(data?.listing || null);
      } catch (err) {
        if (!mounted) return;
        setDog(null);
        setError(err?.response?.data?.message || "Failed to load dog details");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [identifier]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FE] pt-24 px-4 md:px-10">
        <div className="max-w-5xl mx-auto text-slate-500">Loading details...</div>
      </div>
    );
  }

  if (error || !dog) {
    return (
      <div className="min-h-screen bg-[#F8F9FE] pt-24 px-4 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-rose-600">{error || "Dog details not found."}</p>
          <Link to="/" className="inline-flex items-center gap-2 mt-4 text-indigo-600 font-bold">
            <ArrowLeft size={16} /> Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const image = dog.images?.[0] ? `${import.meta.env.VITE_BASE_URL}${dog.images[0]}` : fallbackImage;
  const isApproved = Boolean(dog.is_approved);
  const petTypeCategory = getPetTypeCategory(dog.pet_type);
  const listingTypeCategory = getListingTypeCategory(dog.listing_type);

  return (
    <div className="min-h-screen bg-[#F8F9FE] pt-24 pb-12 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-6"
        >
          <ArrowLeft size={16} /> Back to Listings
        </button>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="aspect-[4/3] lg:aspect-auto bg-slate-100">
            <img src={image} alt={dog.title || "Dog"} className="w-full h-full object-cover" />
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">
              {dog.title || dog.breed || "Dog Listing"}
            </h1>
            <p className="text-slate-500 mt-2">{dog.description || "No description available."}</p>

            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <p className="flex items-center gap-2">
                <IndianRupee size={16} className="text-indigo-600" />
                <span className="font-bold">Price:</span> {dog.price ? `INR ${dog.price}` : "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={16} className="text-indigo-600" />
                <span className="font-bold">Age:</span> {dog.age || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-indigo-600" />
                <span className="font-bold">Location:</span> {dog.city || "N/A"}, {dog.state || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck size={16} className={isApproved ? "text-emerald-600" : "text-amber-600"} />
                <span className="font-bold">Status:</span> {isApproved ? "Approved" : "Pending"}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-bold">Pet Type:</span> {petTypeCategory}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-bold">Listing Type:</span> {listingTypeCategory}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {[petTypeCategory, listingTypeCategory, dog.breed]
                .filter(Boolean)
                .map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md font-bold uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogDetails;
