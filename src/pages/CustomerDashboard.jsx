import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import JobCard from '../components/JobCard';
import { Plus, Briefcase, Clock, MapPin, Users } from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { getJobsByCustomer } = useData();

  if (!user) return null;

  const myJobs = getJobsByCustomer(user.id);
  const openJobs = myJobs.filter(job => job.status === 'open');
  const assignedJobs = myJobs.filter(job => job.status === 'assigned');
  const completedJobs = myJobs.filter(job => job.status === 'completed');

  const handleContactLabourer = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600 mt-1">Manage your job postings and find skilled workers</p>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/post-job"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Post New Job</span>
              </Link>
              <Link
                to="/browse-labourers"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Users className="h-4 w-4" />
                <span>Browse Workers</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-lg font-semibold text-gray-900">{myJobs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Open Jobs</p>
                <p className="text-lg font-semibold text-gray-900">{openJobs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-lg font-semibold text-gray-900">{assignedJobs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-lg font-semibold text-gray-900">{completedJobs.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/post-job"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Plus className="h-6 w-6 text-blue-600" />
                <span className="font-medium">Post New Job</span>
              </div>
            </Link>
            <Link
              to="/browse-labourers"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-green-600" />
                <span className="font-medium">Browse Workers</span>
              </div>
            </Link>
            <Link
              to="/profile"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-orange-600" />
                <span className="font-medium">Update Profile</span>
              </div>
            </Link>
          </div>
        </div>

        {/* My Jobs */}
        <div className="space-y-8">
          {/* Open Jobs */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Jobs</h2>
            {openJobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No open jobs. Post your first job to get started!</p>
                <Link
                  to="/post-job"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Post Job</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {openJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onContact={handleContactLabourer}
                    showActions={false}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Assigned Jobs */}
          {assignedJobs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Jobs in Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignedJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onContact={handleContactLabourer}
                    showActions={false}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed Jobs */}
          {completedJobs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Jobs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onContact={handleContactLabourer}
                    showActions={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;