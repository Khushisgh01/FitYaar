import React from 'react';
import { ShieldCheckIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

// Helper component for displaying checked items (Accepted Insurance)
const CheckboxItem = ({ label }) => (
    <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
        <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
        <span className="text-gray-700">{label}</span>
    </div>
);

const InsuranceCostsContent = () => {
    // Data extracted from image_b0e5f7.png, image_b0e632.png, image_b0e654.png
    const acceptedInsurances = [
        'Aetna',
        'Blue Cross Blue Shield',
        'Cigna',
        'UnitedHealth',
        'Kaiser Permanente',
        'Humana',
        'Anthem',
        'Medicaid',
        'Medicare',
        'Out of Network'
    ];

    const sessionCosts = [
        { type: 'Individual Therapy', cost: '$100-200' },
        { type: 'Couples Therapy', cost: '$150-250' },
        { type: 'Group Therapy', cost: '$50-100' },
        { type: 'Initial Consultation', cost: '$150-300' }
    ];

    const paymentOptions = [
        'Insurance copay (typically $20-50)',
        'Health Savings Account (HSA)',
        'Flexible Spending Account (FSA)',
        'Sliding scale fees (income-based)',
        'Employee Assistance Programs (EAP)',
        'Self-pay with super bill for reimbursement'
    ];
    
    const insuranceTips = [
        'Check your annual mental health benefits limit',
        'Verify if you need a referral from your primary care doctor',
        'Ask about out-of-network benefits for better therapist choice',
        'Many therapists offer a free 15-minute consultation call'
    ];


    return (
        <div className="space-y-8">
            
            {/* Accepted Insurance Providers Section */}
            <div className='p-6 bg-white rounded-xl shadow-lg border border-gray-100'>
                <div className="flex items-center gap-3 mb-4">
                    <ShieldCheckIcon className="w-6 h-6 text-violet-600" />
                    <h3 className="text-xl font-bold text-gray-800">Insurance & Payment Options</h3>
                </div>
                
                <h4 className="font-semibold text-gray-700 mb-2">Accepted Insurance Providers</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mt-2">
                    {acceptedInsurances.slice(0, 6).map(insurance => (
                        <CheckboxItem key={insurance} label={insurance} />
                    ))}
                </div>
                {/* Continuing the list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mt-4 border-t border-gray-200 pt-4">
                    {acceptedInsurances.slice(6).map(insurance => (
                        <CheckboxItem key={insurance} label={insurance} />
                    ))}
                </div>
            </div>

            {/* Costs and Payment Options */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Typical Session Costs */}
                <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Typical Session Costs</h4>
                    <div className="space-y-3">
                        {sessionCosts.map(item => (
                            <div key={item.type} className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="font-medium text-gray-700">{item.type}</span>
                                <span className="text-gray-600 font-semibold">{item.cost}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Options */}
                <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Payment Options</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        {paymentOptions.map((option, index) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* Insurance Tips Section */}
            <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                    <AcademicCapIcon className="w-6 h-6 text-blue-600" />
                    <h4 className="text-lg font-bold text-blue-800">Insurance Tips</h4>
                </div>
                <ul className="list-disc list-inside space-y-2 text-blue-800 ml-4 text-sm">
                    {insuranceTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InsuranceCostsContent;