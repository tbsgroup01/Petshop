import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  ImagePlus,
  Lock,
  RotateCcw,
  Save,
  Settings as SettingsIcon,
} from "lucide-react";
import { authService, settingService } from "../../../services";
import { getStoredUser } from "../../../utils/auth";

const TabButton = ({ id, label, icon: Icon, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex items-center gap-2 border-b-2 px-6 py-4 text-sm font-bold transition-all ${
      activeTab === id
        ? "border-[#4d41df] bg-purple-50/30 text-[#4d41df]"
        : "border-transparent text-slate-400 hover:bg-slate-50/50 hover:text-slate-600"
    }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

const InputGroup = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-slate-700">{label}</label>

    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-600 outline-none transition-all placeholder:text-slate-300 focus:border-[#4d41df] focus:ring-2 focus:ring-[#4d41df]/20"
    />
  </div>
);

const UploadCard = ({ label, value, onFileChange, helper }) => (
  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
    <div className="mb-3 flex items-center gap-2">
      <ImagePlus size={16} className="text-slate-500" />

      <p className="text-sm font-semibold text-slate-700">{label}</p>
    </div>

    {value ? (
      <img
        src={value}
        alt={label}
        className="mb-3 h-16 w-auto rounded-lg border border-slate-200 bg-white object-contain p-2"
      />
    ) : (
      <div className="mb-3 flex h-16 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-400">
        No file selected
      </div>
    )}

    <input
      type="file"
      accept="image/*"
      onChange={onFileChange}
      className="w-full text-xs font-medium text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
    />

    {helper && <p className="mt-2 text-xs text-slate-400">{helper}</p>}
  </div>
);

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [settingId, setSettingId] = useState(null);
  const [general, setGeneral] = useState({
    site_title: "",
    brand_name: "",
    site_email: "",
    support_email: "",
    logo_url: "",
    // favicon_url: "",
    logo_file: null,
    // favicon_file: null,
  });

  const [payment, setPayment] = useState({
    razorpay_enabled: false,
    qr_enabled: false,
    razorpay_public_key: "",
    razorpay_secret_key: "",
    qr_code_url: "",
    qr_code_file: null,
    qr_payee_name: "",
    qr_instructions: "",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const isSecurityTab = activeTab === "security";

  const actionLabel = useMemo(() => {
    if (activeTab === "general") return "Save General Settings";

    if (activeTab === "payment") return "Save Payment Settings";

    return "Update Password";
  }, [activeTab]);

  const handleImageChange = (field, file) => {
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (activeTab === "general") {
      const urlField = field === "logo_file" ? "logo_url" : "";

      setGeneral((current) => ({
        ...current,
        [field]: file,
        [urlField]: previewUrl,
      }));

      return;
    }

    setPayment((current) => ({
      ...current,
      [field]: file,
      qr_code_url: previewUrl,
    }));
  };
// save handler (for demo, it just shows a success message and resets security form)
  const handleSave = async () => {
    try {
      setSaving(true);
      if (activeTab === "general") {
        const payload = {
          site_title: general.site_title,
          brand_name: general.brand_name,
          site_email: general.site_email,
          support_email: general.support_email,
          image: general.logo_file,
        };

        const response = settingId
          ? await settingService.updateSetting(settingId, payload)
          : await settingService.addSetting(payload);

        const currentId = response?.data?.data?.id || response?.data?.id || settingId;
        if (currentId) setSettingId(currentId);
      } else if (activeTab === "security") {
        if (security.newPassword !== security.confirmPassword) {
          throw new Error("New password and confirm password do not match");
        }
        const user = getStoredUser();
        await authService.updatePassword({
          email: user?.email,
          currentPassword: security.currentPassword,
          newPassword: security.newPassword,
        });
      }

      setMessage({ type: "success", text: "Settings saved successfully" });

      if (activeTab === "security") {
        setSecurity({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: error?.response?.data?.message || "Failed to save settings" });
    } finally {
      setSaving(false);
    }
  };
// Reset form to initial values (for demo, it just clears the form)
  const handleResetTab = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-8 p-4 sm:p-10 bg-gray-50 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Settings</h2>

        <p className="text-slate-500">
          Configure branding, payment methods, and admin security
        </p>
      </div>

      {message.text && (
        <div
          className={`rounded-xl border px-4 py-3 ${
            message.type === "error"
              ? "border-rose-200 bg-rose-50 text-rose-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex overflow-x-auto border-b border-slate-100">
          <TabButton
            id="general"
            label="General"
            icon={SettingsIcon}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <TabButton
            id="payment"
            label="Payment Gateway"
            icon={CreditCard}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <TabButton
            id="security"
            label="Security"
            icon={Lock}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="p-8">
          {loading ? (
            <div className="py-10 text-center text-sm font-medium text-slate-500">
              Loading settings...
            </div>
          ) : (
            <>
              {/* GENERAL */}
              {activeTab === "general" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      White Label Settings
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Control site title, emails, and brand assets.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <InputGroup
                      label="Site Title"
                      value={general.site_title}
                      onChange={(event) =>
                        setGeneral((current) => ({
                          ...current,
                          site_title: event.target.value,
                        }))
                      }
                    />

                    <InputGroup
                      label="Brand Name"
                      value={general.brand_name}
                      onChange={(event) =>
                        setGeneral((current) => ({
                          ...current,
                          brand_name: event.target.value,
                        }))
                      }
                    />

                    <InputGroup
                      label="Site Email"
                      type="email"
                      value={general.site_email}
                      onChange={(event) =>
                        setGeneral((current) => ({
                          ...current,
                          site_email: event.target.value,
                        }))
                      }
                    />

                    <InputGroup
                      label="Support Email"
                      type="email"
                      value={general.support_email}
                      onChange={(event) =>
                        setGeneral((current) => ({
                          ...current,
                          support_email: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <UploadCard
                      label="Logo"
                      value={general.logo_url}
                      onFileChange={(event) =>
                        handleImageChange(
                          "logo_file",
                          event.target.files?.[0]
                        )
                      }
                      helper="Used in navbar and footer branding."
                    />
                  </div>
                </div>
              )}

              {/* PAYMENT */}
              {activeTab === "payment" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Payment Controls
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Configure payment methods and QR details.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4 text-amber-700">
                    <AlertTriangle size={20} className="shrink-0" />

                    <p className="text-xs font-medium">
                      Configure razorpay and QR payment details here.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Enable razorpay
                        </p>

                        <p className="text-xs text-slate-500">
                          Users can choose razorpay payment.
                        </p>
                      </div>

                      <input
                        type="checkbox"
                        checked={payment.razorpay_enabled}
                        onChange={(event) =>
                          setPayment((current) => ({
                            ...current,
                            razorpay_enabled: event.target.checked,
                          }))
                        }
                        className="h-4 w-4 accent-[#4d41df]"
                      />
                    </label>

                    <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Enable QR Payment
                        </p>

                        <p className="text-xs text-slate-500">
                          Users can upload QR payment proof.
                        </p>
                      </div>

                      <input
                        type="checkbox"
                        checked={payment.qr_enabled}
                        onChange={(event) =>
                          setPayment((current) => ({
                            ...current,
                            qr_enabled: event.target.checked,
                          }))
                        }
                        className="h-4 w-4 accent-[#4d41df]"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <InputGroup
                      label="razorpay Public Key"
                      value={payment.razorpay_public_key}
                      onChange={(event) =>
                        setPayment((current) => ({
                          ...current,
                          razorpay_public_key: event.target.value,
                        }))
                      }
                      placeholder="pk_test_..."
                    />

                    <InputGroup
                      label="razorpay Secret Key"
                      type="password"
                      value={payment.razorpay_secret_key}
                      onChange={(event) =>
                        setPayment((current) => ({
                          ...current,
                          razorpay_secret_key: event.target.value,
                        }))
                      }
                      placeholder="sk_test_..."
                    />

                    <InputGroup
                      label="QR Payee Name"
                      value={payment.qr_payee_name}
                      onChange={(event) =>
                        setPayment((current) => ({
                          ...current,
                          qr_payee_name: event.target.value,
                        }))
                      }
                    />

                    <InputGroup
                      label="QR Instructions"
                      value={payment.qr_instructions}
                      onChange={(event) =>
                        setPayment((current) => ({
                          ...current,
                          qr_instructions: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <UploadCard
                    label="QR Code"
                    value={payment.qr_code_url}
                    onFileChange={(event) =>
                      handleImageChange(
                        "qr_code_file",
                        event.target.files?.[0]
                      )
                    }
                    helper="This QR will appear on payment page."
                  />
                </div>
              )}

              {/* SECURITY */}
              {activeTab === "security" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Security Settings
                    </h3>

                    <p className="text-sm text-slate-500">
                      Update your password.
                    </p>
                  </div>

                  <div className="max-w-md space-y-6">
                    <InputGroup
                      label="Current Password"
                      type="password"
                      value={security.currentPassword}
                      onChange={(event) =>
                        setSecurity((current) => ({
                          ...current,
                          currentPassword: event.target.value,
                        }))
                      }
                    />

                    <InputGroup
                      label="New Password"
                      type="password"
                      value={security.newPassword}
                      onChange={(event) =>
                        setSecurity((current) => ({
                          ...current,
                          newPassword: event.target.value,
                        }))
                      }
                    />

                    <InputGroup
                      label="Confirm New Password"
                      type="password"
                      value={security.confirmPassword}
                      onChange={(event) =>
                        setSecurity((current) => ({
                          ...current,
                          confirmPassword: event.target.value,
                        }))
                      }
                    />

                    <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
                      <CheckCircle2
                        size={14}
                        className="text-emerald-500"
                      />

                      Use at least 8 characters for a stronger password.
                    </div>
                  </div>
                </div>
              )}

              {/* ACTIONS */}
              <div className="mt-10 flex items-center gap-4 border-t border-slate-100 pt-6">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-[#4d41df] px-4 py-2 font-bold text-white transition-all hover:bg-[#3a32c9] disabled:opacity-60"
                >
                  <Save size={18} />

                  {saving ? "Saving..." : actionLabel}
                </button>

                <button
                  onClick={handleResetTab}
                  disabled={saving || isSecurityTab}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2.5 font-bold text-slate-600 transition-all hover:bg-slate-50 disabled:opacity-40"
                >
                  <RotateCcw size={18} />
                  Reset
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
