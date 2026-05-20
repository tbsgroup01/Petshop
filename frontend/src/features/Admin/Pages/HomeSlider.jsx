import React, { useEffect, useState } from 'react';
import { homeSliderService } from '../../../services';

export default function HomepageBanners() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    order: '0',
    image: null,
    imagePreview: null,
  });

  const loadSliders = async () => {
    try {
      setError('');
      const { data } = await homeSliderService.getHomeSliders();
      setSliders(data?.sliders || []);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch sliders');
      setSliders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchLive = async () => {
      if (!mounted) return;
      await loadSliders();
    };

    fetchLive();
    const interval = setInterval(fetchLive, 15000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      link: '',
      order: '0',
      image: null,
      imagePreview: null,
    });
  };

  const startEdit = (slider) => {
    setEditingId(slider.id);
    setFormData({
      title: slider.title || '',
      link: slider.link || '',
      order: String(slider.order ?? 0),
      image: null,
      imagePreview: slider.image_url ? `${import.meta.env.VITE_BASE_URL}${slider.image_url}` : null,
    });
  };

  const handleSubmitSlider = async () => {
    if (!formData.title.trim() || !formData.link.trim()) {
      alert('Please fill title and link');
      return;
    }
    if (!editingId && !formData.image) {
      alert('Please upload an image');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title.trim(),
        order: Number(formData.order || 0),
        link: formData.link.trim(),
      };
      if (formData.image) payload.image = formData.image;

      if (editingId) {
        await homeSliderService.updateHomeSlider(editingId, payload);
      } else {
        await homeSliderService.addHomeSlider(payload);
      }

      resetForm();
      await loadSliders();
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to save slider');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSlider = async (id) => {
    if (!window.confirm('Delete this slider?')) return;
    try {
      await homeSliderService.deleteHomeSlider(id);
      if (editingId === id) resetForm();
      await loadSliders();
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to delete slider');
    }
  };

  const isEditing = Boolean(editingId);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, image: file, imagePreview: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-10">
      <div className="mx-auto ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Homepage Banners</h1>
          <p className="mt-2 text-gray-600">Upload main hero banners for the public homepage.</p>
          <p className="mt-1 text-xs text-gray-500">
            {loading ? 'Loading sliders...' : lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : ''}
          </p>
          {error && <p className="mt-2 text-xs font-semibold text-rose-600">{error}</p>}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Optional headline" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <input type="number" name="order" value={formData.order} onChange={handleInputChange} placeholder="0" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
                <input type="url" name="link" value={formData.link} required onChange={handleInputChange} placeholder="Enter CTA URL" className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3" />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">Slider image</label>
                <label className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <span className="text-sm font-medium text-gray-700">Choose Image</span>
                </label>
              </div>

              {formData.imagePreview && (
                <div className="mb-6">
                  <p className="block text-sm font-medium text-gray-700 mb-2">Preview</p>
                  <img src={formData.imagePreview} alt="Preview" className="max-h-48 w-full rounded-lg object-cover border border-gray-200" />
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={handleSubmitSlider} disabled={isSubmitting} className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-medium disabled:opacity-60">
                  {isSubmitting ? 'Saving...' : isEditing ? 'Update Slider' : 'Upload Slider'}
                </button>
                {isEditing && (
                  <button onClick={resetForm} type="button" className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Current slider items</h2>
              {sliders.length === 0 ? (
                <div className="text-center py-12"><p className="mt-3 text-sm text-gray-500">No sliders added yet</p></div>
              ) : (
                <div className="space-y-4">
                  {sliders.map((slider) => (
                    <div key={slider.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <img src={`${import.meta.env.VITE_BASE_URL}${slider.image_url}`} alt={slider.title} className="w-full h-20 object-cover rounded mb-3 border border-gray-200" />
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{slider.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-2">Link</span>
                        <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">Order {slider.order}</span>
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button onClick={() => startEdit(slider)} className="w-full rounded bg-slate-100 text-slate-700 hover:bg-slate-200 py-2 text-xs font-medium">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteSlider(slider.id)} className="w-full rounded text-red-600 hover:bg-red-50 py-2 text-xs font-medium">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
