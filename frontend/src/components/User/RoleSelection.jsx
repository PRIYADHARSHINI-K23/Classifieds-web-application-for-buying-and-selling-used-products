import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';

const RoleSelection = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('');

    const handleRoleSelection = () => {
        if (selectedRole === 'Customer') {
            navigate('/register/customer');
        } else if (selectedRole === 'Doctor') {
            navigate('/register/doctor');
        }
    };

    return (
        <>
            <MetaData title="Select Role | MedStore" />
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex">
                        <FormSidebar
                            title="Welcome to MedStore!"
                            tag="Choose your role to get started"
                        />

                        <div className="flex-1 p-8 sm:p-12">
                            <div className="max-w-lg mx-auto text-center">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Select Your Role</h2>
                                <p className="text-gray-600 mb-8">Choose how you want to use our platform</p>

                                <div className="space-y-4">
                                    <div 
                                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                            selectedRole === 'Customer' 
                                                ? 'border-blue-500 bg-blue-50' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => setSelectedRole('Customer')}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="text-4xl">👤</div>
                                            <div className="text-left">
                                                <h3 className="text-xl font-semibold text-gray-800">Customer</h3>
                                                <p className="text-gray-600">Browse and purchase medical products</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div 
                                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                            selectedRole === 'Doctor' 
                                                ? 'border-blue-500 bg-blue-50' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => setSelectedRole('Doctor')}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="text-4xl">👨‍⚕️</div>
                                            <div className="text-left">
                                                <h3 className="text-xl font-semibold text-gray-800">Doctor</h3>
                                                <p className="text-gray-600">Professional medical practitioner account</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleRoleSelection}
                                    disabled={!selectedRole}
                                    className={`w-full mt-8 py-3 px-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                                        selectedRole 
                                            ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    Continue
                                </button>

                                <div className="mt-6">
                                    <p className="text-gray-600">
                                        Already have an account?{' '}
                                        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default RoleSelection;