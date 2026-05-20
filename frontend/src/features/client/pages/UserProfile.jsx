import React from "react";
import { getStoredUser } from "../../../utils/auth";

const UserProfile = () => {
  const user = getStoredUser();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-28">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="mt-1 text-sm text-slate-500">Your account information</p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Name</p>
            <p className="mt-1 font-semibold text-slate-800">{user?.name || "-"}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</p>
            <p className="mt-1 font-semibold text-slate-800">{user?.email || "-"}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Phone</p>
            <p className="mt-1 font-semibold text-slate-800">{user?.phone || "-"}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Role</p>
            <p className="mt-1 font-semibold capitalize text-slate-800">{user?.role || "user"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
