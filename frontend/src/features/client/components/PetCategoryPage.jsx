import React, { useEffect, useMemo, useState } from "react";
import { HeartPulse, ShieldCheck, Sparkles, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { listingService } from "../../../services";
import { getPetPath } from "../../../utils/slug";

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const PetCategoryPage = ({
  heroImage,
  ctaImage,
  fallbackImage,
  heroTitleLine2,
  heroDescription,
  searchButtonLabel,
  liveResultsLabel,
  availableTitle,
  emptyStateText,
  lifestyleDescription,
  handbookTitle,
  ctaImageAlt,
  filterRegex,
  listingTypeRegex = /.*/i,
  trustBreedText,
  lifestyleCards,
}) => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [sellRes, meetingRes, dayCareRes] = await Promise.all([
          listingService.searchListings({ type: "sell", limit: 80 }),
          listingService.searchListings({ type: "meeting", limit: 80 }),
          listingService.searchListings({ type: "day care", limit: 80 }),
        ]);

        const merged = [
          ...(sellRes?.data?.listings || []),
          ...(meetingRes?.data?.listings || []),
          ...(dayCareRes?.data?.listings || []),
        ];

        const deduped = Array.from(new Map(merged.map((item) => [item.id, item])).values()).sort(
          (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0),
        );

        if (!mounted) return;
        setListings(deduped);
        setError("");
      } catch (err) {
        if (!mounted) return;
        setListings([]);
        setError(err?.response?.data?.message || "Failed to load listings");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    const timer = setInterval(load, 15000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const filteredListings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return listings
      .filter((item) => listingTypeRegex.test(String(item.listing_type || "")))
      .filter((item) =>
        filterRegex.test(String(item.pet_type || item.petType || item.title || item.breed || "")),
      )
      .filter((item) => {
        if (!normalizedQuery) return true;
        const source = [item.title, item.breed, item.city, item.state, item.pet_type]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return source.includes(normalizedQuery);
      });
  }, [listings, query, filterRegex, listingTypeRegex]);

  const trustCards = [
    {
      icon: ShieldCheck,
      title: "Health Certified",
      text: "Vaccinated and vet checked",
      tone: "bg-indigo-50 text-indigo-700",
    },
    {
      icon: Sparkles,
      title: "Pure Breeds",
      text: trustBreedText,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      icon: HeartPulse,
      title: "Lifetime Support",
      text: "Post adoption guidance",
      tone: "bg-rose-50 text-rose-700",
    },
  ];

  return (
    <div className="min-h-screen bg-[#ECEEF5] pt-20">
      <section className="w-full">
        <div className="relative overflow-hidden  min-h-[500px] border border-white/30 shadow-2xl">
          <img src={heroImage} alt="Pet hero" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#eef2ff]/95 via-[#eef2ff]/70 to-[#0f172a]/50" />

          <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-2xl">
            <p className="text-[11px] tracking-[0.25em] font-extrabold text-indigo-600 uppercase">Find your perfect pet</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-black text-slate-900 leading-[1.02]">
              Find Your New
              <span className="block text-indigo-600">{heroTitleLine2}</span>
            </h1>
            <p className="mt-5 text-slate-600 text-base md:text-lg">{heroDescription}</p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl shadow-lg max-w-xl">
              <div className="flex items-center gap-2 px-3 flex-1">
                <Search size={16} className="text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search breeds, city, state..."
                  className="w-full py-2 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                />
              </div>
              <button
                onClick={() => window.scrollTo({ top: 620, behavior: "smooth" })}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl"
              >
                {searchButtonLabel}
              </button>
            </div>

            <p className="mt-4 text-xs font-semibold text-slate-600">
              Live results: {filteredListings.length} {liveResultsLabel}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-4 md:px-8 lg:px-10 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trustCards.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
                <div className={`h-11 w-11 rounded-xl grid place-items-center ${item.tone}`}>
                  <Icon size={19} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="w-full px-4 md:px-8 lg:px-10 mt-12 pb-12">
        <div className="flex items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">{availableTitle}</h2>
            <p className="text-slate-500 mt-2">Live listings auto-refresh every 15 seconds.</p>
          </div>
          <span className="text-xs bg-white text-slate-500 border border-slate-200 rounded-full px-3 py-2 font-semibold">
            {filteredListings.length} results
          </span>
        </div>

        {error && <p className="mb-4 text-sm text-rose-600">{error}</p>}
        {loading && <p className="mb-4 text-sm text-slate-500">Loading listings...</p>}

        {!loading && !filteredListings.length && (
          <div className="rounded-3xl bg-white border border-slate-100 p-8 text-slate-600">
            {emptyStateText}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredListings.map((pet) => {
            const image = pet.images?.[0] ? `${import.meta.env.VITE_BASE_URL}${pet.images[0]}` : fallbackImage;
            const amount = Number(pet.price ?? pet.mating_fee ?? 0);
            const location = [pet.city, pet.state].filter(Boolean).join(", ") || "Location unavailable";

            return (
              <article
                key={pet.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(getPetPath(pet))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(getPetPath(pet));
                  }
                }}
                className="group bg-white rounded-[28px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="relative h-60 overflow-hidden">
                  <div
                    role="img"
                    aria-label={pet.title || pet.breed || "Pet image"}
                    className="w-full h-full bg-center bg-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url("${image}")` }}
                  />
                  <span className="absolute top-3 right-3 text-[10px] font-black px-3 py-1 rounded-full bg-white text-indigo-600">VERIFIED</span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-black text-xl text-slate-900 line-clamp-1">{pet.title || pet.breed || "Pet Listing"}</h3>
                    <span className="font-black text-indigo-600 text-base">{amount > 0 ? formatINR(amount) : "N/A"}</span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500 font-semibold uppercase tracking-wide">
                    {(pet.breed || "Breed") + " • " + (pet.age ? `${pet.age} months` : "Age N/A")}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {(pet.badges?.length ? pet.badges : ["Friendly", "Healthy"]).slice(0, 2).map((tag) => (
                      <span key={`${pet.id}-${tag}`} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin size={13} className="text-rose-400" /> {location}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[#0A1535] py-16">
        <div className="w-full px-4 md:px-8 lg:px-10">
          <h2 className="text-white text-3xl md:text-5xl font-black text-center">Browse by Lifestyle</h2>
          <p className="text-slate-300 text-center mt-2">{lifestyleDescription}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {lifestyleCards.map((item) => (
              <article key={item.title} className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <span className={`h-1.5 w-12 rounded-full block ${item.accent}`} />
                <h3 className="mt-6 text-2xl font-extrabold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.subtitle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 md:px-8 lg:px-10 py-16">
        <div className="bg-white rounded-[36px] border border-slate-100 shadow-xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              New owner handbook
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl leading-tight font-black text-slate-900">{handbookTitle}</h2>
            <p className="mt-4 text-slate-500 max-w-lg">
              We provide a complete starter checklist and quick support for every new adoption from this listing page.
            </p>
            <button className="mt-7 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl">
              Contact Experts
            </button>
          </div>

          <div className="rounded-[28px] overflow-hidden min-h-[320px]">
            <img src={ctaImage} alt={ctaImageAlt} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetCategoryPage;
