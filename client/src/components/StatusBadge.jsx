import React from 'react';

const StatusBadge = ({ status, className = '' }) => {
    const styles = {
        'New': 'bg-blue-100 text-blue-700 border-blue-200',
        'Processing': 'bg-yellow-100 text-yellow-700 border-yellow-200',
        'Action Required': 'bg-red-100 text-red-700 border-red-200',
        'Ready': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]} ${className}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
