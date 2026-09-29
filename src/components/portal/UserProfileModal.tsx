import React, { useState, useEffect } from 'react';
import {
  User as UserIcon,
  Mail,
  Phone,
  Building,
  Lock,
  Bell,
  ShieldCheck,
  AlertTriangle,
  LogOut,
  CheckCircle2,
  RefreshCw,
  Trash2,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { logAction } from '../../utils/logger';

export const UserProfileModal: React.FC = () => {
  const {
    isProfileModalOpen,
    setIsProfileModalOpen,
    currentUser,
    updateUserProfileData,
    changeUserPassword,
    resendEmailVerification,
    deleteUserAccount,
    logout,
    firebaseUser
  } = useStudio();

  // Profile Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  // Notification settings
  const [notifyUpdates, setNotifyUpdates] = useState(true);
  const [notifyInvoices, setNotifyInvoices] = useState(true);
  const [notifyMarketing, setNotifyMarketing] = useState(false);

  // Delete account confirmation
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [deletePass, setDeletePass] = useState('');

  // Feedback messages
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [verifyMsg, setVerifyMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setPhone(currentUser.phone || '');
      setCompany(currentUser.company || '');
      setNotifyUpdates(currentUser.notifyUpdates ?? true);
      setNotifyInvoices(currentUser.notifyInvoices ?? true);
      setNotifyMarketing(currentUser.notifyMarketing ?? false);
    }
  }, [currentUser, isProfileModalOpen]);

  if (!isProfileModalOpen || !currentUser) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    setIsUpdating(true);

    try {
      const res = await updateUserProfileData({
        name: name.trim(),
        phone: phone.trim() || undefined,
        company: company.trim() || undefined,
        notifyUpdates,
        notifyInvoices,
        notifyMarketing
      });

      if (res.success) {
        setProfileMsg({ type: 'success', text: 'Profile information updated successfully!' });
      } else {
        setProfileMsg({ type: 'error', text: res.error || 'Failed to update profile.' });
      }
    } catch (err: any) {
      setProfileMsg({ type: 'error', text: err.message || 'Error saving changes.' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (!currentPassword || !newPassword) {
      setPasswordMsg({ type: 'error', text: 'Please fill in both current and new passwords.' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    setIsUpdating(true);
    try {
      const res = await changeUserPassword(currentPassword, newPassword);
      if (res.success) {
        setPasswordMsg({ type: 'success', text: 'Password successfully updated!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setPasswordMsg({ type: 'error', text: res.error || 'Could not change password.' });
      }
    } catch (err: any) {
      setPasswordMsg({ type: 'error', text: err.message || 'Password update failed.' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleResendVerification = async () => {
    setVerifyMsg(null);
    const res = await resendEmailVerification();
    setVerifyMsg({ type: res.success ? 'success' : 'error', text: res.message });
  };

  const handleDeleteAccount = async () => {
    setIsUpdating(true);
    try {
      const res = await deleteUserAccount(deletePass || undefined);
      if (res.success) {
        setIsProfileModalOpen(false);
      } else {
        setProfileMsg({ type: 'error', text: res.error || 'Failed to delete account.' });
      }
    } catch (err: any) {
      setProfileMsg({ type: 'error', text: err.message });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    setIsProfileModalOpen(false);
    await logout();
  };

  return (
    <Modal
      isOpen={isProfileModalOpen}
      onClose={() => setIsProfileModalOpen(false)}
      title="Account Settings & Profile"
      subtitle="Manage your identity, security credentials, and notifications"
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* User Identity Header */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-white text-base">{currentUser.name}</h4>
                <span
                  className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-mono font-semibold ${
                    currentUser.role === 'owner'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">{currentUser.email}</p>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={handleLogout}
            actionName="Profile Modal Sign Out"
            iconLeft={<LogOut className="w-3.5 h-3.5" />}
            className="text-rose-400 border-rose-500/30 hover:bg-rose-950/40"
          >
            Sign Out
          </Button>
        </div>

        {/* Email Verification Banner */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Email Status:</span>
            {currentUser.emailVerified || firebaseUser?.emailVerified ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" /> Unverified
              </span>
            )}
          </div>

          {!(currentUser.emailVerified || firebaseUser?.emailVerified) && (
            <button
              type="button"
              onClick={handleResendVerification}
              className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
            >
              Resend Verification
            </button>
          )}
        </div>

        {verifyMsg && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              verifyMsg.type === 'success'
                ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-950/60 border border-rose-500/30 text-rose-300'
            }`}
          >
            {verifyMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
            <span>{verifyMsg.text}</span>
          </div>
        )}

        {/* Section 1: Edit Profile Details */}
        <form onSubmit={handleUpdateProfile} className="space-y-4 pt-2 border-t border-slate-800">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Contact & Identity Details</span>
          </h5>

          {profileMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                profileMsg.type === 'success'
                  ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-950/60 border border-rose-500/30 text-rose-300'
              }`}
            >
              {profileMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
              <span>{profileMsg.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Company / Organization</label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Optional"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Phone / WhatsApp Number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+234..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
              />
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="pt-2 space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-cyan-400" />
              <span>Notification Preferences</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyUpdates}
                  onChange={e => setNotifyUpdates(e.target.checked)}
                  className="rounded text-cyan-400 focus:ring-cyan-400"
                />
                <span>Project Updates</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyInvoices}
                  onChange={e => setNotifyInvoices(e.target.checked)}
                  className="rounded text-cyan-400 focus:ring-cyan-400"
                />
                <span>Invoices & Receipts</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyMarketing}
                  onChange={e => setNotifyMarketing(e.target.checked)}
                  className="rounded text-cyan-400 focus:ring-cyan-400"
                />
                <span>Studio Releases</span>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            size="sm"
            variant="primary"
            disabled={isUpdating}
            actionName="Save Profile Changes"
            iconRight={isUpdating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : undefined}
          >
            Save Profile Preferences
          </Button>
        </form>

        {/* Section 2: Change Password */}
        <form onSubmit={handleChangePassword} className="space-y-4 pt-4 border-t border-slate-800">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Change Account Password</span>
          </h5>

          {passwordMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                passwordMsg.type === 'success'
                  ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-950/60 border border-rose-500/30 text-rose-300'
              }`}
            >
              {passwordMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
              <span>{passwordMsg.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Current Password</label>
              <input
                type={showPass ? 'text' : 'password'}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">New Password</label>
              <input
                type={showPass ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Confirm New</label>
              <input
                type={showPass ? 'text' : 'password'}
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
            >
              {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPass ? 'Hide Passwords' : 'Show Passwords'}</span>
            </button>

            <Button
              type="submit"
              size="sm"
              variant="outline"
              disabled={isUpdating}
              actionName="Submit Change Password"
            >
              Update Password
            </Button>
          </div>
        </form>

        {/* Section 3: Danger Zone - Account Deletion */}
        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h6 className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Delete Account & Erase Records</span>
              </h6>
              <p className="text-[11px] text-slate-400">Permanently delete your account and personal details from Firebase.</p>
            </div>

            {!isConfirmingDelete ? (
              <Button
                size="sm"
                variant="danger"
                onClick={() => setIsConfirmingDelete(true)}
                actionName="Request Account Deletion"
              >
                Delete Account
              </Button>
            ) : null}
          </div>

          {isConfirmingDelete && (
            <div className="p-3 rounded-xl bg-slate-950 border border-rose-500/40 space-y-2">
              <p className="text-xs text-rose-300 font-semibold">Are you certain you wish to delete your account? This action cannot be reversed.</p>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Confirm Current Password to Proceed:</label>
                <input
                  type="password"
                  value={deletePass}
                  onChange={e => setDeletePass(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Button
                  size="sm"
                  variant="danger"
                  onClick={handleDeleteAccount}
                  actionName="Confirm Final Delete Account"
                >
                  Yes, Permanently Delete
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => { setIsConfirmingDelete(false); setDeletePass(''); }}
                  actionName="Cancel Delete Account"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
