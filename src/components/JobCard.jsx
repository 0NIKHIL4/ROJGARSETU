import React from 'react';
import { Clock, MapPin, DollarSign, User, Phone } from 'lucide-react';

const JobCard = ({ 
  job, 
  onAccept, 
  onContact, 
  showActions = true, 
  isLabourer = false 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAccept = () => {
    if (onAccept) {
      onAccept(job.id);
    }
  };

  const handleContact = () => {
    if (onContact) {
      onContact(job.customerPhone);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{job.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-700">{job.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-700">{new Date(job.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-900">₹{job.wage}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-700">{job.skillRequired}</span>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Posted by:</span>
            <span className="text-sm font-medium text-gray-900">{job.customerName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">{job.customerPhone}</span>
          </div>
        </div>
        
        {showActions && (
          <div className="mt-4 flex space-x-3">
            {job.status === 'open' && isLabourer && (
              <button
                onClick={handleAccept}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Accept Job
              </button>
            )}
            <button
              onClick={handleContact}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Contact Customer
            </button>
          </div>
        )}
        
        {job.status === 'assigned' && job.assignedLabourerName && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-md">
            <p className="text-sm text-yellow-800">
              Assigned to: <span className="font-medium">{job.assignedLabourerName}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;