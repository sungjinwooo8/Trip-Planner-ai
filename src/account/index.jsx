import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, User, Mail, Save, Camera, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AccountSettings = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    picture: '',
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const getUser = () => {
      try {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
      } catch (e) {
        console.error('Error parsing user:', e);
        return null;
      }
    };

    const currentUser = getUser();
    if (!currentUser) {
      navigate('/auth/login');
      return;
    }

    setUser(currentUser);
    setFormData({
      name: currentUser.name || '',
      email: currentUser.email || '',
      picture: currentUser.picture || currentUser.picture_url || '',
    });
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasChanges(true);
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallback = e.target.nextSibling;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  const handleSave = () => {
    setLoading(true);
    
    // Update user data in localStorage
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      picture: formData.picture,
      picture_url: formData.picture,
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Dispatch event to update Header and other components
    window.dispatchEvent(new Event('userUpdated'));
    
    setTimeout(() => {
      setLoading(false);
      setHasChanges(false);
      setUser(updatedUser);
      toast.toast({
        title: 'Profile Updated',
        description: 'Your account information has been saved successfully.',
      });
    }, 500);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </h2>

          {/* Profile Picture Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">Profile Picture</label>
            <div className="flex items-center gap-6">
              <div className="relative">
                {(formData.picture || user.picture || user.picture_url) ? (
                  <img
                    src={formData.picture || user.picture || user.picture_url}
                    alt={user.name || 'User'}
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                    onError={handleImageError}
                  />
                ) : null}
                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-4 border-gray-200 shadow-lg ${(formData.picture || user.picture || user.picture_url) ? 'hidden' : ''}`}
                >
                  {formData.name ? (
                    <span className="text-white text-2xl font-bold">
                      {formData.name.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <Input
                  type="url"
                  name="picture"
                  placeholder="Enter image URL"
                  value={formData.picture}
                  onChange={handleInputChange}
                  className="mb-2"
                />
                <p className="text-xs text-gray-500">
                  Enter a URL to your profile picture. Make sure the image is publicly accessible.
                </p>
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              className="h-12"
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="h-12"
            />
            <p className="text-xs text-gray-500 mt-2">
              Your email is used for account notifications and trip updates.
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setFormData({
                  name: user.name || '',
                  email: user.email || '',
                  picture: user.picture || user.picture_url || '',
                });
                setHasChanges(false);
              }}
              disabled={!hasChanges || loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || loading}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="loader"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Account Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600">Account Type</span>
              <span className="text-sm font-medium text-gray-900">
                {user.verified_email ? 'Verified Account' : 'Standard Account'}
              </span>
            </div>
            {user.id && (
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-600">User ID</span>
                <span className="text-sm font-mono text-gray-500">{user.id}</span>
              </div>
            )}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Member Since</span>
              <span className="text-sm font-medium text-gray-900">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

