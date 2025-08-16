import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [labourers, setLabourers] = useState([]);

  useEffect(() => {
    // Load initial data
    const savedJobs = localStorage.getItem('jobs');
    const savedLabourers = localStorage.getItem('labourers');
    
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      // Initialize with sample data
      const sampleJobs = [
        {
          id: '1',
          title: 'House Painting',
          description: 'Need to paint 2 rooms in my house',
          skillRequired: 'Painter',
          wage: 1500,
          date: '2024-01-15',
          location: 'Delhi',
          customerId: 'customer1',
          customerName: 'Rajesh Kumar',
          customerPhone: '+91 9876543210',
          status: 'open',
          postedAt: '2024-01-10T10:00:00Z'
        },
        {
          id: '2',
          title: 'Plumbing Repair',
          description: 'Fix kitchen sink and bathroom pipe',
          skillRequired: 'Plumber',
          wage: 800,
          date: '2024-01-14',
          location: 'Mumbai',
          customerId: 'customer2',
          customerName: 'Priya Sharma',
          customerPhone: '+91 9876543211',
          status: 'open',
          postedAt: '2024-01-10T11:00:00Z'
        }
      ];
      setJobs(sampleJobs);
      localStorage.setItem('jobs', JSON.stringify(sampleJobs));
    }
    
    if (savedLabourers) {
      setLabourers(JSON.parse(savedLabourers));
    } else {
      // Initialize with sample data
      const sampleLabourers = [
        {
          id: '1',
          name: 'Ravi Kumar',
          phone: '+91 9876543220',
          location: 'Delhi',
          skills: ['Painter', 'Helper'],
          available: true,
          rating: 4.5,
          completedJobs: 25
        },
        {
          id: '2',
          name: 'Suresh Yadav',
          phone: '+91 9876543221',
          location: 'Mumbai',
          skills: ['Plumber', 'Electrician'],
          available: true,
          rating: 4.7,
          completedJobs: 18
        }
      ];
      setLabourers(sampleLabourers);
      localStorage.setItem('labourers', JSON.stringify(sampleLabourers));
    }
  }, []);

  const addJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Date.now().toString(),
      postedAt: new Date().toISOString()
    };
    
    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  const assignJob = (jobId, labourerId, labourerName) => {
    const updatedJobs = jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: 'assigned', assignedTo: labourerId, assignedLabourerName: labourerName }
        : job
    );
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  const updateJobStatus = (jobId, status) => {
    const updatedJobs = jobs.map(job => 
      job.id === jobId ? { ...job, status } : job
    );
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  const getJobsByCustomer = (customerId) => {
    return jobs.filter(job => job.customerId === customerId);
  };

  const getJobsBySkill = (skill) => {
    return jobs.filter(job => job.skillRequired === skill && job.status === 'open');
  };

  const getJobsByLocation = (location) => {
    return jobs.filter(job => job.location.toLowerCase().includes(location.toLowerCase()));
  };

  const getLabourersBySkill = (skill) => {
    return labourers.filter(labourer => 
      labourer.skills.includes(skill) && labourer.available
    );
  };

  const getLabourersByLocation = (location) => {
    return labourers.filter(labourer => 
      labourer.location.toLowerCase().includes(location.toLowerCase()) && labourer.available
    );
  };

  const updateLabourerAvailability = (labourerId, available) => {
    const updatedLabourers = labourers.map(labourer => 
      labourer.id === labourerId ? { ...labourer, available } : labourer
    );
    setLabourers(updatedLabourers);
    localStorage.setItem('labourers', JSON.stringify(updatedLabourers));
  };

  return (
    <DataContext.Provider value={{
      jobs,
      labourers,
      addJob,
      assignJob,
      updateJobStatus,
      getJobsByCustomer,
      getJobsBySkill,
      getJobsByLocation,
      getLabourersBySkill,
      getLabourersByLocation,
      updateLabourerAvailability
    }}>
      {children}
    </DataContext.Provider>
  );
};